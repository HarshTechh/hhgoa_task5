// User Profile & Onboarding
export type BiologicalSex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
export type FitnessGoal = 
  | 'lose_weight' 
  | 'maintain_weight' 
  | 'build_muscle' 
  | 'gain_weight' 
  | 'improve_fitness' 
  | 'endurance' 
  | 'strength';

export type DietType = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian' | 'other';
export type CuisineType = 'Indian' | 'Maharashtrian' | 'North Indian' | 'South Indian' | 'Western' | 'Mixed';

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  sex: BiologicalSex;
  heightCm: number;
  currentWeightKg: number;
  targetWeightKg: number;
  timelineWeeks: number;
  primaryGoal: FitnessGoal;
  secondaryGoal?: string;
  activityLevel: ActivityLevel;
  dailyMovementHours: {
    sitting: number;
    standing: number;
  };
  exerciseDaysPerWeek: number;
  avgWorkoutDurationMin: number;
  trainingTypes: string[];
  dietType: DietType;
  cuisinePreferences: CuisineType[];
  allergies: string[];
  foodsAvoided: string[];
  mealsPerDay: number;
  sleepTargetHours: number;
  waterTargetLiters?: number;
  createdAt: string;
}

// Daily Targets calculated by deterministic engine
export interface DailyTargets {
  bmr: number;
  tdee: number;
  calorieTarget: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  fiberGrams: number;
  waterLiters: number;
  stepsTarget: number;
  activeMinutesTarget: number;
  customized?: boolean;
}

// Food Database & Logs
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type FoodSource = 'verified_db' | 'standard_db' | 'ai_photo_estimate' | 'ai_bill_ocr' | 'voice_input' | 'user_custom';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface FoodItem {
  id: string;
  name: string;
  aliases?: string[];
  cuisine: string;
  servingUnit: string;
  servingWeightG: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  sugarG?: number;
  sodiumMg?: number;
  dietType: DietType;
  source: FoodSource;
  confidence: ConfidenceLevel;
}

export interface FoodLogEntry {
  id: string;
  date: string; // YYYY-MM-DD
  mealType: MealType;
  foodId?: string;
  name: string;
  quantity: number;
  servingUnit: string;
  weightG: number;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
  source: FoodSource;
  confidence: ConfidenceLevel;
  notes?: string;
  photoUrl?: string;
  timestamp: string;
}

// AI Food Detection Payload
export interface AIDetectedItem {
  id: string;
  detectedName: string;
  matchedFood?: FoodItem;
  quantity: number;
  servingUnit: string;
  estimatedWeightG: number;
  estimatedCalories: number;
  estimatedProteinG: number;
  estimatedCarbsG: number;
  estimatedFatG: number;
  estimatedFiberG: number;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0 - 1
  portionConfidence: ConfidenceLevel;
  boundingDetails?: string;
}

// Bill Scanner OCR Extracted Item
export interface AIBillItem {
  id: string;
  rawText: string;
  extractedName: string;
  quantity: number;
  unitPrice?: number;
  matchedFood?: FoodItem;
  estimatedCalories: number;
  estimatedProteinG: number;
  estimatedCarbsG: number;
  estimatedFatG: number;
  estimatedFiberG: number;
  confidence: ConfidenceLevel;
  selected: boolean;
}

// Workout & Exercises
export type MuscleGroup = 'chest' | 'back' | 'legs' | 'shoulders' | 'arms' | 'core' | 'cardio' | 'full_body';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  equipment: string;
  instructions: string;
  thumbnail?: string;
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
  rpe?: number;
}

export interface LoggedExercise {
  id: string;
  exerciseId: string;
  exerciseName: string;
  muscleGroup: MuscleGroup;
  sets: WorkoutSet[];
  notes?: string;
}

export interface WorkoutSession {
  id: string;
  date: string;
  name: string;
  durationMinutes: number;
  exercises: LoggedExercise[];
  totalVolumeKg: number;
  completedAt?: string;
  notes?: string;
}

// Activity & Habits
export interface DailyActivity {
  date: string;
  steps: number;
  distanceKm: number;
  activeCalories: number;
  activeMinutes: number;
}

export interface WaterLog {
  date: string;
  totalMl: number;
  logs: { id: string; amountMl: number; timestamp: string }[];
}

export interface SleepLog {
  date: string;
  durationMinutes: number;
  bedTime: string;
  wakeTime: string;
  quality: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface WeightLog {
  id: string;
  date: string;
  weightKg: number;
  waistCm?: number;
  chestCm?: number;
  armsCm?: number;
  notes?: string;
}

// Daily Score & Aggregation
export interface DailyScoreBreakdown {
  totalScore: number; // 0-100
  nutritionScore: number;
  stepsScore: number;
  workoutScore: number;
  waterScore: number;
  sleepScore: number;
  consistencyScore: number;
}

// AI Coach & Recommendations
export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'food' | 'activity' | 'hydration' | 'workout' | 'recovery';
  actionLabel?: string;
  actionPayload?: any;
  macros?: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
  };
}

export interface CoachMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  recommendations?: Recommendation[];
  chartData?: any;
}

export interface StreakData {
  currentStreak: number;
  bestStreak: number;
  lastActiveDate: string;
  achievements: {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
    isUnlocked: boolean;
  }[];
}
