import { DailyTargets, FoodLogEntry, DailyActivity, WorkoutSession, WaterLog, Recommendation } from '../../types';

export interface DailyGaps {
  remainingCalories: number;
  consumedCalories: number;
  remainingProteinG: number;
  consumedProteinG: number;
  remainingCarbsG: number;
  consumedCarbsG: number;
  remainingFatG: number;
  consumedFatG: number;
  remainingFiberG: number;
  consumedFiberG: number;
  remainingWaterMl: number;
  consumedWaterMl: number;
  remainingSteps: number;
  completedSteps: number;
  workoutCompleted: boolean;
}

export function calculateDailyGaps(
  targets: DailyTargets,
  foodLogs: FoodLogEntry[],
  activity: DailyActivity,
  workoutSession: WorkoutSession | null,
  waterLog: WaterLog
): DailyGaps {
  const consumedCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const consumedProteinG = foodLogs.reduce((acc, item) => acc + item.proteinG, 0);
  const consumedCarbsG = foodLogs.reduce((acc, item) => acc + item.carbsG, 0);
  const consumedFatG = foodLogs.reduce((acc, item) => acc + item.fatG, 0);
  const consumedFiberG = foodLogs.reduce((acc, item) => acc + item.fiberG, 0);
  const consumedWaterMl = waterLog.totalMl;
  const targetWaterMl = targets.waterLiters * 1000;

  return {
    remainingCalories: Math.max(0, targets.calorieTarget - consumedCalories),
    consumedCalories,
    remainingProteinG: Math.max(0, targets.proteinGrams - consumedProteinG),
    consumedProteinG,
    remainingCarbsG: Math.max(0, targets.carbsGrams - consumedCarbsG),
    consumedCarbsG,
    remainingFatG: Math.max(0, targets.fatGrams - consumedFatG),
    consumedFatG,
    remainingFiberG: Math.max(0, targets.fiberGrams - consumedFiberG),
    consumedFiberG,
    remainingWaterMl: Math.max(0, targetWaterMl - consumedWaterMl),
    consumedWaterMl,
    remainingSteps: Math.max(0, targets.stepsTarget - activity.steps),
    completedSteps: activity.steps,
    workoutCompleted: !!(workoutSession && workoutSession.completedAt)
  };
}

/**
 * Generates tailored recommendations based on actual gap values and user constraints.
 */
export function generateContextualRecommendations(
  gaps: DailyGaps,
  dietPreference: string = 'vegetarian'
): Recommendation[] {
  const recommendations: Recommendation[] = [];

  // 1. Protein Gap Recommendation
  if (gaps.remainingProteinG >= 15) {
    if (dietPreference === 'non_vegetarian') {
      recommendations.push({
        id: 'rec-protein-nonveg',
        title: 'High Protein Dinner / Snack',
        description: `You have ${gaps.remainingProteinG}g protein left today. 150g grilled chicken breast or 4 boiled eggs will easily fill this.`,
        type: 'food',
        actionLabel: '+ Log Grilled Chicken (38g Protein)',
        macros: { calories: 240, proteinG: 38, carbsG: 0, fatG: 5 }
      });
    } else if (dietPreference === 'vegan') {
      recommendations.push({
        id: 'rec-protein-vegan',
        title: 'Plant Protein Boost',
        description: `You have ${gaps.remainingProteinG}g protein left. 150g baked Tofu + 1 scoop plant protein shake covers ~35g protein.`,
        type: 'food',
        actionLabel: '+ Log Tofu & Protein Shake',
        macros: { calories: 260, proteinG: 34, carbsG: 8, fatG: 7 }
      });
    } else {
      recommendations.push({
        id: 'rec-protein-veg',
        title: 'Vegetarian High Protein Choice',
        description: `You have ${gaps.remainingProteinG}g protein left. 150g Paneer Bhurji / Soya chunks or 200g Greek yogurt will bridge the gap.`,
        type: 'food',
        actionLabel: '+ Log 150g Low Fat Paneer (27g Protein)',
        macros: { calories: 260, proteinG: 27, carbsG: 6, fatG: 14 }
      });
    }
  }

  // 2. Steps Gap Recommendation
  if (gaps.remainingSteps > 1000) {
    const walkMinutes = Math.round(gaps.remainingSteps / 100);
    recommendations.push({
      id: 'rec-steps',
      title: 'Close Your Step Ring',
      description: `You're ${gaps.remainingSteps.toLocaleString()} steps away from today's target. A brisk ${walkMinutes}-minute evening walk will complete it!`,
      type: 'activity',
      actionLabel: `Log ${walkMinutes} Min Walk`
    });
  }

  // 3. Hydration Gap Recommendation
  if (gaps.remainingWaterMl >= 500) {
    recommendations.push({
      id: 'rec-water',
      title: 'Hydration Target',
      description: `Drink ${(gaps.remainingWaterMl / 1000).toFixed(1)}L more water before bedtime to optimize muscle recovery and digestion.`,
      type: 'hydration',
      actionLabel: '+ Quick Drink 500ml'
    });
  }

  // 4. Workout Gap
  if (!gaps.workoutCompleted) {
    recommendations.push({
      id: 'rec-workout',
      title: "Scheduled Workout Pending",
      description: 'Your training session for today has not been logged yet. Check out today’s planned routine.',
      type: 'workout',
      actionLabel: 'Open Workout Tracker'
    });
  }

  return recommendations;
}
