import { BiologicalSex } from '../../types';

/**
 * Calculates Basal Metabolic Rate (BMR) using the Mifflin-St Jeor equation.
 * - Male: (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5
 * - Female: (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161
 */
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: BiologicalSex
): number {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) return 0;
  
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = sex === 'male' ? base + 5 : base - 161;
  return Math.round(Math.max(800, bmr));
}
