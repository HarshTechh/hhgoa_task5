import { DailyScoreBreakdown, DailyTargets, FoodLogEntry, DailyActivity, WorkoutSession, WaterLog, SleepLog } from '../../types';

/**
 * Calculates the holistic Daily Fitness Score (0 - 100) based on actual logs vs daily targets.
 */
export function calculateDailyFitnessScore(
  targets: DailyTargets,
  foodLogs: FoodLogEntry[],
  activity: DailyActivity,
  workoutSession: WorkoutSession | null,
  waterLog: WaterLog,
  sleepLog: SleepLog | null
): DailyScoreBreakdown {
  // 1. Nutrition Component (35% weight)
  const consumedCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const consumedProtein = foodLogs.reduce((acc, item) => acc + item.proteinG, 0);
  
  // Calorie proximity (penalty if way over or way under)
  const calRatio = targets.calorieTarget > 0 ? consumedCalories / targets.calorieTarget : 0;
  let calScore = 0;
  if (calRatio <= 1.0) {
    calScore = calRatio * 100;
  } else {
    calScore = Math.max(0, 100 - (calRatio - 1.0) * 150);
  }

  // Protein completion
  const proteinRatio = targets.proteinGrams > 0 ? Math.min(1.0, consumedProtein / targets.proteinGrams) : 0;
  const proteinScore = proteinRatio * 100;

  const nutritionScore = Math.round(calScore * 0.5 + proteinScore * 0.5);

  // 2. Steps Component (20% weight)
  const stepsRatio = targets.stepsTarget > 0 ? Math.min(1.0, activity.steps / targets.stepsTarget) : 0;
  const stepsScore = Math.round(stepsRatio * 100);

  // 3. Workout Component (20% weight)
  let workoutScore = 0;
  if (workoutSession && workoutSession.completedAt) {
    workoutScore = 100;
  } else if (workoutSession && workoutSession.exercises.length > 0) {
    workoutScore = 60;
  } else if (activity.activeMinutes >= targets.activeMinutesTarget) {
    workoutScore = 80;
  } else if (activity.activeMinutes > 0) {
    workoutScore = Math.round((activity.activeMinutes / targets.activeMinutesTarget) * 60);
  }

  // 4. Water Component (15% weight)
  const targetWaterMl = targets.waterLiters * 1000;
  const waterRatio = targetWaterMl > 0 ? Math.min(1.0, waterLog.totalMl / targetWaterMl) : 0;
  const waterScore = Math.round(waterRatio * 100);

  // 5. Sleep Component (10% weight)
  let sleepScore = 70; // default baseline if not logged
  if (sleepLog) {
    const sleepHours = sleepLog.durationMinutes / 60;
    if (sleepHours >= 7 && sleepHours <= 9) {
      sleepScore = 100;
    } else if (sleepHours >= 6 && sleepHours < 7) {
      sleepScore = 80;
    } else if (sleepHours > 9) {
      sleepScore = 85;
    } else {
      sleepScore = Math.max(30, Math.round((sleepHours / 7) * 75));
    }
  }

  // 6. Consistency Component
  const consistencyScore = Math.round(
    (nutritionScore + stepsScore + (workoutScore > 0 ? 100 : 50) + waterScore) / 4
  );

  // Weighted total: Nutrition (35%), Steps (20%), Workout (20%), Water (15%), Sleep (10%)
  const totalScore = Math.round(
    nutritionScore * 0.35 +
    stepsScore * 0.20 +
    workoutScore * 0.20 +
    waterScore * 0.15 +
    sleepScore * 0.10
  );

  return {
    totalScore: Math.min(100, Math.max(0, totalScore)),
    nutritionScore,
    stepsScore,
    workoutScore,
    waterScore,
    sleepScore,
    consistencyScore
  };
}
