import { UserProfile, DailyTargets } from '../../types';
import { calculateBMR } from './bmr';
import { calculateTDEE } from './tdee';

/**
 * Calculates complete daily targets deterministically based on user profile.
 */
export function calculatePersonalizedTargets(profile: Partial<UserProfile>): DailyTargets {
  const weight = profile.currentWeightKg || 70;
  const height = profile.heightCm || 170;
  const age = profile.age || 25;
  const sex = profile.sex || 'male';
  const goal = profile.primaryGoal || 'lose_weight';
  const activity = profile.activityLevel || 'moderately_active';

  // 1. Calculate BMR & TDEE
  const bmr = calculateBMR(weight, height, age, sex);
  const tdee = calculateTDEE(bmr, activity);

  // 2. Goal-based Caloric Adjustment
  let calorieTarget = tdee;
  let proteinRatioGPerKg = 1.6;

  switch (goal) {
    case 'lose_weight':
      calorieTarget = tdee - 500; // standard 500 kcal deficit
      proteinRatioGPerKg = 2.0; // preserve lean mass
      break;
    case 'build_muscle':
      calorieTarget = tdee + 300; // lean surplus
      proteinRatioGPerKg = 2.0;
      break;
    case 'gain_weight':
      calorieTarget = tdee + 500;
      proteinRatioGPerKg = 1.8;
      break;
    case 'endurance':
      calorieTarget = tdee;
      proteinRatioGPerKg = 1.6;
      break;
    case 'strength':
      calorieTarget = tdee + 200;
      proteinRatioGPerKg = 2.2;
      break;
    case 'maintain_weight':
    case 'improve_fitness':
    default:
      calorieTarget = tdee;
      proteinRatioGPerKg = 1.6;
      break;
  }

  // Safety floor: 1200 kcal for female, 1500 kcal for male
  const minFloor = sex === 'female' ? 1200 : 1500;
  calorieTarget = Math.max(minFloor, Math.round(calorieTarget));

  // 3. Protein Target (g)
  let proteinGrams = Math.round(weight * proteinRatioGPerKg);
  const proteinCalories = proteinGrams * 4;

  // 4. Fat Target (25-30% of total calories or 0.8g/kg)
  const fatCalories = calorieTarget * 0.28;
  let fatGrams = Math.round(fatCalories / 9);

  // 5. Carbohydrates Target (fills remainder)
  const remainingCalories = Math.max(0, calorieTarget - (proteinCalories + fatGrams * 9));
  let carbsGrams = Math.round(remainingCalories / 4);

  // 6. Fiber Target (14g per 1000 kcal)
  let fiberGrams = Math.round((calorieTarget / 1000) * 14);

  // 7. Water Target (35ml/kg baseline + workout additions)
  const workoutAddMl = (profile.avgWorkoutDurationMin || 45) > 30 ? 500 : 250;
  let waterLiters = Number(((weight * 35 + workoutAddMl) / 1000).toFixed(1));
  waterLiters = Math.max(2.0, Math.min(5.0, waterLiters));

  // 8. Steps & Active Minutes Targets
  let stepsTarget = 10000;
  let activeMinutesTarget = 45;

  if (activity === 'sedentary') {
    stepsTarget = 7500;
    activeMinutesTarget = 30;
  } else if (activity === 'lightly_active') {
    stepsTarget = 8500;
    activeMinutesTarget = 40;
  } else if (activity === 'moderately_active') {
    stepsTarget = 10000;
    activeMinutesTarget = 50;
  } else if (activity === 'very_active' || activity === 'extremely_active') {
    stepsTarget = 12500;
    activeMinutesTarget = 65;
  }

  return {
    bmr,
    tdee,
    calorieTarget,
    proteinGrams,
    carbsGrams,
    fatGrams,
    fiberGrams,
    waterLiters,
    stepsTarget,
    activeMinutesTarget,
    customized: false
  };
}
