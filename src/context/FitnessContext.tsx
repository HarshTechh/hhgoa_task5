import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  UserProfile,
  DailyTargets,
  FoodLogEntry,
  WorkoutSession,
  DailyActivity,
  WaterLog,
  SleepLog,
  WeightLog,
  DailyScoreBreakdown,
  CoachMessage,
  StreakData,
  MealType,
  FoodItem,
  Recommendation
} from '../types';
import { calculatePersonalizedTargets } from '../lib/calculators/targets';
import { calculateDailyFitnessScore } from '../lib/calculators/fitnessScore';
import { calculateDailyGaps, generateContextualRecommendations } from '../lib/calculators/gapEngine';
import { VERIFIED_FOOD_DATABASE } from '../data/foodDatabase';

const STORAGE_KEY = 'fitent_fitness_os_v1';

// Default Profile for immediate demo readiness
export const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: 'user_default',
  name: 'Arjun Sharma',
  age: 26,
  sex: 'male',
  heightCm: 178,
  currentWeightKg: 78,
  targetWeightKg: 72,
  timelineWeeks: 12,
  primaryGoal: 'lose_weight',
  secondaryGoal: 'Build lean muscle',
  activityLevel: 'moderately_active',
  dailyMovementHours: {
    sitting: 6,
    standing: 2
  },
  exerciseDaysPerWeek: 4,
  avgWorkoutDurationMin: 50,
  trainingTypes: ['Strength', 'Cardio / HIIT'],
  dietType: 'vegetarian',
  cuisinePreferences: ['Indian', 'North Indian', 'Maharashtrian'],
  allergies: [],
  foodsAvoided: [],
  mealsPerDay: 4,
  sleepTargetHours: 8,
  waterTargetLiters: 3.2,
  createdAt: new Date().toISOString()
};

// Initial Sample Day Food Logs
export const INITIAL_FOOD_LOGS: FoodLogEntry[] = [
  {
    id: 'log_1',
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast',
    foodId: 'food_poha',
    name: 'Kanda Poha (Flattened Rice with Peanuts)',
    quantity: 1,
    servingUnit: '1 medium plate (approx 180g)',
    weightG: 180,
    calories: 250,
    proteinG: 5.5,
    carbsG: 44,
    fatG: 6.5,
    fiberG: 2.8,
    source: 'verified_db',
    confidence: 'high',
    timestamp: '08:30 AM'
  },
  {
    id: 'log_2',
    date: new Date().toISOString().split('T')[0],
    mealType: 'breakfast',
    foodId: 'food_curd_dahi',
    name: 'Fresh Plain Curd / Dahi',
    quantity: 1,
    servingUnit: '1 bowl (150g)',
    weightG: 150,
    calories: 100,
    proteinG: 5.5,
    carbsG: 7.0,
    fatG: 5.5,
    fiberG: 0.0,
    source: 'verified_db',
    confidence: 'high',
    timestamp: '08:30 AM'
  },
  {
    id: 'log_3',
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch',
    foodId: 'food_roti',
    name: 'Whole Wheat Roti / Chapati',
    quantity: 2,
    servingUnit: '2 medium (80g)',
    weightG: 80,
    calories: 220,
    proteinG: 7.0,
    carbsG: 44,
    fatG: 2.0,
    fiberG: 6.4,
    source: 'ai_photo_estimate',
    confidence: 'high',
    timestamp: '01:30 PM'
  },
  {
    id: 'log_4',
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch',
    foodId: 'food_dal_tadka',
    name: 'Yellow Dal Tadka (Toor / Moong)',
    quantity: 1,
    servingUnit: '1 katori (180g)',
    weightG: 180,
    calories: 150,
    proteinG: 8.5,
    carbsG: 20,
    fatG: 4.2,
    fiberG: 4.5,
    source: 'ai_photo_estimate',
    confidence: 'high',
    timestamp: '01:30 PM'
  },
  {
    id: 'log_5',
    date: new Date().toISOString().split('T')[0],
    mealType: 'lunch',
    foodId: 'food_paneer_bhurji',
    name: 'Paneer Bhurji (Scrambled Paneer)',
    quantity: 1,
    servingUnit: '1 bowl (150g)',
    weightG: 150,
    calories: 275,
    proteinG: 17.5,
    carbsG: 6.0,
    fatG: 20.0,
    fiberG: 1.8,
    source: 'ai_photo_estimate',
    confidence: 'high',
    timestamp: '01:30 PM'
  }
];

export const INITIAL_STREAKS: StreakData = {
  currentStreak: 14,
  bestStreak: 21,
  lastActiveDate: new Date().toISOString().split('T')[0],
  achievements: [
    {
      id: 'first_10k',
      title: 'First 10K Steps',
      description: 'Reached 10,000 steps in a single day',
      icon: '🏆',
      isUnlocked: true,
      unlockedAt: '2026-09-20'
    },
    {
      id: 'streak_7',
      title: '7 Day Discipline',
      description: 'Logged goals for 7 consecutive days',
      icon: '🔥',
      isUnlocked: true,
      unlockedAt: '2026-09-27'
    },
    {
      id: 'protein_master',
      title: 'Macro Precision',
      description: 'Hit daily protein target within 5% error',
      icon: '🥩',
      isUnlocked: true,
      unlockedAt: '2026-10-01'
    },
    {
      id: 'streak_30',
      title: '30 Day Titan',
      description: 'Complete 30 consecutive days in Fitent OS',
      icon: '👑',
      isUnlocked: false
    }
  ]
};

interface FitnessContextType {
  isOnboarded: boolean;
  userProfile: UserProfile;
  dailyTargets: DailyTargets;
  foodLogs: FoodLogEntry[];
  currentWorkout: WorkoutSession | null;
  workoutHistory: WorkoutSession[];
  activity: DailyActivity;
  waterLog: WaterLog;
  sleepLog: SleepLog;
  weightHistory: WeightLog[];
  dailyScore: DailyScoreBreakdown;
  streakData: StreakData;
  coachMessages: CoachMessage[];
  recommendations: Recommendation[];
  activeTab: 'dashboard' | 'nutrition' | 'workout' | 'activity' | 'progress' | 'coach' | 'settings';
  
  // Actions
  setActiveTab: (tab: 'dashboard' | 'nutrition' | 'workout' | 'activity' | 'progress' | 'coach' | 'settings') => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  updateDailyTargets: (targets: Partial<DailyTargets>) => void;
  completeOnboarding: (profile: UserProfile, customTargets?: DailyTargets) => void;
  resetOnboarding: () => void;
  
  // Food Actions (Calories, Protein, Carbs, Fat, Fiber)
  addFoodLog: (entry: Omit<FoodLogEntry, 'id' | 'date' | 'timestamp'>) => void;
  removeFoodLog: (id: string) => void;
  clearMealLogs: (mealType: MealType) => void;
  
  // Workout Actions
  startWorkout: (name: string, exerciseList?: string[]) => void;
  updateWorkoutSet: (exerciseId: string, setId: string, weightKg: number, reps: number, completed: boolean) => void;
  addWorkoutSet: (exerciseId: string) => void;
  finishWorkout: () => void;
  cancelWorkout: () => void;
  
  // Habit & Health Actions (Water Intake, Steps, Sleep, Weight)
  addWaterMl: (amountMl: number) => void;
  resetWater: () => void;
  setSteps: (steps: number) => void;
  addSteps: (steps: number) => void;
  resetSteps: () => void;
  updateSleep: (durationMinutes: number, quality: SleepLog['quality']) => void;
  logWeight: (weightKg: number, waistCm?: number, notes?: string) => void;
  
  // AI Coach Actions
  sendCoachMessage: (text: string) => void;
  applyRecommendation: (rec: Recommendation) => void;
  triggerCelebration: () => void;
}

const FitnessContext = createContext<FitnessContextType | undefined>(undefined);

export const FitnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_onboarded');
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [activeTab, setActiveTab] = useState<'dashboard' | 'nutrition' | 'workout' | 'activity' | 'progress' | 'coach' | 'settings'>('dashboard');

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_profile');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_PROFILE;
  });

  const [dailyTargets, setDailyTargets] = useState<DailyTargets>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_targets');
    return saved ? JSON.parse(saved) : calculatePersonalizedTargets(DEFAULT_DEMO_PROFILE);
  });

  const [foodLogs, setFoodLogs] = useState<FoodLogEntry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_food_logs');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_LOGS;
  });

  const [currentWorkout, setCurrentWorkout] = useState<WorkoutSession | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_active_workout');
    return saved ? JSON.parse(saved) : null;
  });

  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_workout_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'hist_1',
        date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
        name: 'Upper Body Hypertrophy',
        durationMinutes: 52,
        totalVolumeKg: 7850,
        completedAt: 'Yesterday, 6:45 PM',
        exercises: [
          {
            id: 'e1',
            exerciseId: 'ex_bench_press',
            exerciseName: 'Barbell Flat Bench Press',
            muscleGroup: 'chest',
            sets: [
              { id: 's1', setNumber: 1, weightKg: 70, reps: 10, completed: true },
              { id: 's2', setNumber: 2, weightKg: 75, reps: 8, completed: true },
              { id: 's3', setNumber: 3, weightKg: 80, reps: 6, completed: true }
            ]
          },
          {
            id: 'e2',
            exerciseId: 'ex_lat_pulldown',
            exerciseName: 'Wide-Grip Lat Pulldown',
            muscleGroup: 'back',
            sets: [
              { id: 's4', setNumber: 1, weightKg: 55, reps: 12, completed: true },
              { id: 's5', setNumber: 2, weightKg: 60, reps: 10, completed: true },
              { id: 's6', setNumber: 3, weightKg: 65, reps: 8, completed: true }
            ]
          }
        ]
      }
    ];
  });

  const [activity, setActivity] = useState<DailyActivity>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_activity');
    return saved ? JSON.parse(saved) : {
      date: new Date().toISOString().split('T')[0],
      steps: 8420,
      distanceKm: 6.3,
      activeCalories: 420,
      activeMinutes: 52
    };
  });

  const [waterLog, setWaterLog] = useState<WaterLog>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_water');
    return saved ? JSON.parse(saved) : {
      date: new Date().toISOString().split('T')[0],
      totalMl: 2250,
      logs: [
        { id: 'w1', amountMl: 500, timestamp: '08:00 AM' },
        { id: 'w2', amountMl: 500, timestamp: '11:30 AM' },
        { id: 'w3', amountMl: 750, timestamp: '02:15 PM' },
        { id: 'w4', amountMl: 500, timestamp: '05:00 PM' }
      ]
    };
  });

  const [sleepLog, setSleepLog] = useState<SleepLog>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_sleep');
    return saved ? JSON.parse(saved) : {
      date: new Date().toISOString().split('T')[0],
      durationMinutes: 452, // 7h 32m
      bedTime: '11:15 PM',
      wakeTime: '06:47 AM',
      quality: 'good'
    };
  });

  const [weightHistory, setWeightHistory] = useState<WeightLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_weight_history');
    return saved ? JSON.parse(saved) : [
      { id: 'wh_1', date: '2026-09-04', weightKg: 80.2, waistCm: 91 },
      { id: 'wh_2', date: '2026-09-11', weightKg: 79.5, waistCm: 90 },
      { id: 'wh_3', date: '2026-09-18', weightKg: 78.9, waistCm: 89 },
      { id: 'wh_4', date: '2026-09-25', weightKg: 78.4, waistCm: 88.5 },
      { id: 'wh_5', date: '2026-10-02', weightKg: 78.0, waistCm: 87.8 }
    ];
  });

  const [streakData, setStreakData] = useState<StreakData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY + '_streaks');
    return saved ? JSON.parse(saved) : INITIAL_STREAKS;
  });

  const [coachMessages, setCoachMessages] = useState<CoachMessage[]>(() => [
    {
      id: 'msg_welcome',
      sender: 'coach',
      text: "Good afternoon Arjun! You're making solid progress today with 8,420 steps and 2.2L of water. To lock in today's goals, you need about 44g more protein and 1,580 steps.",
      timestamp: 'Just now'
    }
  ]);

  // Persistent storage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + '_onboarded', JSON.stringify(isOnboarded));
    localStorage.setItem(STORAGE_KEY + '_profile', JSON.stringify(userProfile));
    localStorage.setItem(STORAGE_KEY + '_targets', JSON.stringify(dailyTargets));
    localStorage.setItem(STORAGE_KEY + '_food_logs', JSON.stringify(foodLogs));
    localStorage.setItem(STORAGE_KEY + '_active_workout', JSON.stringify(currentWorkout));
    localStorage.setItem(STORAGE_KEY + '_workout_history', JSON.stringify(workoutHistory));
    localStorage.setItem(STORAGE_KEY + '_activity', JSON.stringify(activity));
    localStorage.setItem(STORAGE_KEY + '_water', JSON.stringify(waterLog));
    localStorage.setItem(STORAGE_KEY + '_sleep', JSON.stringify(sleepLog));
    localStorage.setItem(STORAGE_KEY + '_weight_history', JSON.stringify(weightHistory));
    localStorage.setItem(STORAGE_KEY + '_streaks', JSON.stringify(streakData));
  }, [isOnboarded, userProfile, dailyTargets, foodLogs, currentWorkout, workoutHistory, activity, waterLog, sleepLog, weightHistory, streakData]);

  // Derived Daily Fitness Score
  const dailyScore = useMemo(() => {
    return calculateDailyFitnessScore(
      dailyTargets,
      foodLogs,
      activity,
      currentWorkout,
      waterLog,
      sleepLog
    );
  }, [dailyTargets, foodLogs, activity, currentWorkout, waterLog, sleepLog]);

  // Derived Gaps & Smart Recommendations
  const recommendations = useMemo(() => {
    const gaps = calculateDailyGaps(dailyTargets, foodLogs, activity, currentWorkout, waterLog);
    return generateContextualRecommendations(gaps, userProfile.dietType);
  }, [dailyTargets, foodLogs, activity, currentWorkout, waterLog, userProfile.dietType]);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const updateUserProfile = (profileUpdate: Partial<UserProfile>) => {
    const updated = { ...userProfile, ...profileUpdate };
    setUserProfile(updated);
    if (!dailyTargets.customized) {
      setDailyTargets(calculatePersonalizedTargets(updated));
    }
  };

  const updateDailyTargets = (targetsUpdate: Partial<DailyTargets>) => {
    setDailyTargets(prev => ({ ...prev, ...targetsUpdate, customized: true }));
  };

  const completeOnboarding = (profile: UserProfile, customTargets?: DailyTargets) => {
    setUserProfile(profile);
    const targets = customTargets || calculatePersonalizedTargets(profile);
    setDailyTargets(targets);
    setIsOnboarded(true);
    setActiveTab('dashboard');
    triggerCelebration();
  };

  const resetOnboarding = () => {
    setIsOnboarded(false);
  };

  // Food Logging
  const addFoodLog = (entry: Omit<FoodLogEntry, 'id' | 'date' | 'timestamp'>) => {
    const newEntry: FoodLogEntry = {
      ...entry,
      id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      date: new Date().toISOString().split('T')[0],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setFoodLogs(prev => [...prev, newEntry]);
  };

  const removeFoodLog = (id: string) => {
    setFoodLogs(prev => prev.filter(item => item.id !== id));
  };

  const clearMealLogs = (mealType: MealType) => {
    setFoodLogs(prev => prev.filter(item => item.mealType !== mealType));
  };

  // Workout Actions
  const startWorkout = (name: string, exerciseNames?: string[]) => {
    const initialExercises = (exerciseNames && exerciseNames.length > 0)
      ? exerciseNames.map((ename, idx) => ({
          id: 'wex_' + idx + '_' + Date.now(),
          exerciseId: 'custom_' + idx,
          exerciseName: ename,
          muscleGroup: 'chest' as const,
          sets: [
            { id: 's_1', setNumber: 1, weightKg: 50, reps: 10, completed: false },
            { id: 's_2', setNumber: 2, weightKg: 50, reps: 10, completed: false },
            { id: 's_3', setNumber: 3, weightKg: 50, reps: 10, completed: false }
          ]
        }))
      : [
          {
            id: 'wex_1',
            exerciseId: 'ex_bench_press',
            exerciseName: 'Barbell Flat Bench Press',
            muscleGroup: 'chest' as const,
            sets: [
              { id: 's_1', setNumber: 1, weightKg: 60, reps: 10, completed: false },
              { id: 's_2', setNumber: 2, weightKg: 65, reps: 8, completed: false },
              { id: 's_3', setNumber: 3, weightKg: 70, reps: 6, completed: false }
            ]
          },
          {
            id: 'wex_2',
            exerciseId: 'ex_incline_db_press',
            exerciseName: 'Incline Dumbbell Press',
            muscleGroup: 'chest' as const,
            sets: [
              { id: 's_4', setNumber: 1, weightKg: 22, reps: 10, completed: false },
              { id: 's_5', setNumber: 2, weightKg: 24, reps: 8, completed: false }
            ]
          }
        ];

    const session: WorkoutSession = {
      id: 'session_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      name,
      durationMinutes: 0,
      exercises: initialExercises,
      totalVolumeKg: 0
    };
    setCurrentWorkout(session);
  };

  const updateWorkoutSet = (exerciseId: string, setId: string, weightKg: number, reps: number, completed: boolean) => {
    if (!currentWorkout) return;
    setCurrentWorkout(prev => {
      if (!prev) return null;
      const updatedExercises = prev.exercises.map(ex => {
        if (ex.id !== exerciseId) return ex;
        const updatedSets = ex.sets.map(s => {
          if (s.id !== setId) return s;
          return { ...s, weightKg, reps, completed };
        });
        return { ...ex, sets: updatedSets };
      });

      // Recalculate total volume
      let totalVolume = 0;
      updatedExercises.forEach(ex => {
        ex.sets.forEach(s => {
          if (s.completed) {
            totalVolume += s.weightKg * s.reps;
          }
        });
      });

      return {
        ...prev,
        exercises: updatedExercises,
        totalVolumeKg: totalVolume
      };
    });
  };

  const addWorkoutSet = (exerciseId: string) => {
    if (!currentWorkout) return;
    setCurrentWorkout(prev => {
      if (!prev) return null;
      return {
        ...prev,
        exercises: prev.exercises.map(ex => {
          if (ex.id !== exerciseId) return ex;
          const lastSet = ex.sets[ex.sets.length - 1];
          const newSet = {
            id: 's_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
            setNumber: ex.sets.length + 1,
            weightKg: lastSet ? lastSet.weightKg : 40,
            reps: lastSet ? lastSet.reps : 10,
            completed: false
          };
          return { ...ex, sets: [...ex.sets, newSet] };
        })
      };
    });
  };

  const finishWorkout = () => {
    if (!currentWorkout) return;
    const completedSession: WorkoutSession = {
      ...currentWorkout,
      completedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      durationMinutes: 48
    };

    setWorkoutHistory(prev => [completedSession, ...prev]);
    setCurrentWorkout(null);
    setActivity(prev => ({
      ...prev,
      activeCalories: prev.activeCalories + 380,
      activeMinutes: prev.activeMinutes + 48
    }));
    triggerCelebration();
  };

  const cancelWorkout = () => {
    setCurrentWorkout(null);
  };

  // Habits
  const addWaterMl = (amountMl: number) => {
    const entry = {
      id: 'w_' + Date.now(),
      amountMl,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setWaterLog(prev => ({
      ...prev,
      totalMl: prev.totalMl + amountMl,
      logs: [...prev.logs, entry]
    }));
  };

  const resetWater = () => {
    setWaterLog({
      date: new Date().toISOString().split('T')[0],
      totalMl: 0,
      logs: []
    });
  };

  const setSteps = (steps: number) => {
    setActivity(prev => ({
      ...prev,
      steps,
      distanceKm: Number((steps * 0.00075).toFixed(2)),
      activeCalories: Math.round(steps * 0.04) + 150
    }));
  };

  const addSteps = (steps: number) => {
    setActivity(prev => {
      const newSteps = prev.steps + steps;
      return {
        ...prev,
        steps: newSteps,
        distanceKm: Number((newSteps * 0.00075).toFixed(2)),
        activeCalories: Math.round(newSteps * 0.04) + 150
      };
    });
  };

  const resetSteps = () => {
    setActivity(prev => ({
      ...prev,
      steps: 0,
      distanceKm: 0,
      activeCalories: 0,
      activeMinutes: 0
    }));
  };

  const updateSleep = (durationMinutes: number, quality: SleepLog['quality']) => {
    setSleepLog({
      date: new Date().toISOString().split('T')[0],
      durationMinutes,
      bedTime: '11:00 PM',
      wakeTime: '06:30 AM',
      quality
    });
  };

  const logWeight = (weightKg: number, waistCm?: number, notes?: string) => {
    const newLog: WeightLog = {
      id: 'w_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      weightKg,
      waistCm,
      notes
    };
    setWeightHistory(prev => [...prev, newLog]);
    setUserProfile(prev => ({ ...prev, currentWeightKg: weightKg }));
  };

  // AI Coach
  const sendCoachMessage = (text: string) => {
    const userMsg: CoachMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setCoachMessages(prev => [...prev, userMsg]);

    // Intelligent context response generator
    setTimeout(() => {
      const gaps = calculateDailyGaps(dailyTargets, foodLogs, activity, currentWorkout, waterLog);
      let replyText = '';
      const q = text.toLowerCase();

      if (q.includes('missing') || q.includes('need') || q.includes('today')) {
        replyText = `Based on your logs today, you have **${gaps.remainingCalories} kcal** and **${gaps.remainingProteinG}g protein** remaining. You are also ${gaps.remainingSteps.toLocaleString()} steps away from your daily movement goal.`;
      } else if (q.includes('eat') || q.includes('dinner') || q.includes('food') || q.includes('snack')) {
        replyText = `To hit your remaining ${gaps.remainingProteinG}g protein while staying under your ${gaps.remainingCalories} kcal limit, I recommend **150g grilled Paneer/Chicken** or a **Greek yogurt bowl with chia seeds**.`;
      } else if (q.includes('workout') || q.includes('gym') || q.includes('exercise')) {
        replyText = currentWorkout 
          ? `You have an active workout in progress (${currentWorkout.name}). Finish your logged sets and log the session!` 
          : `For your goal (${userProfile.primaryGoal.replace('_', ' ')}), a 45-minute Push / Upper Body workout with compound presses and lateral raises is optimal today.`;
      } else {
        replyText = `You're currently at a **${dailyScore.totalScore}/100 Daily Fitness Score**. Keep hydrating and ensure your dinner prioritizes protein to hit your daily target!`;
      }

      const coachReply: CoachMessage = {
        id: 'msg_reply_' + Date.now(),
        sender: 'coach',
        text: replyText,
        timestamp: 'Just now'
      };
      setCoachMessages(prev => [...prev, coachReply]);
    }, 600);
  };

  const applyRecommendation = (rec: Recommendation) => {
    if (rec.type === 'food' && rec.macros) {
      addFoodLog({
        mealType: 'dinner',
        name: rec.title,
        quantity: 1,
        servingUnit: '1 recommended serving',
        weightG: 150,
        calories: rec.macros.calories,
        proteinG: rec.macros.proteinG,
        carbsG: rec.macros.carbsG,
        fatG: rec.macros.fatG,
        fiberG: 2.0,
        source: 'ai_photo_estimate',
        confidence: 'high'
      });
      triggerCelebration();
    } else if (rec.type === 'hydration') {
      addWaterMl(500);
    } else if (rec.type === 'activity') {
      addSteps(1500);
    } else if (rec.type === 'workout') {
      setActiveTab('workout');
    }
  };

  return (
    <FitnessContext.Provider
      value={{
        isOnboarded,
        userProfile,
        dailyTargets,
        foodLogs,
        currentWorkout,
        workoutHistory,
        activity,
        waterLog,
        sleepLog,
        weightHistory,
        dailyScore,
        streakData,
        coachMessages,
        recommendations,
        activeTab,
        setActiveTab,
        updateUserProfile,
        updateDailyTargets,
        completeOnboarding,
        resetOnboarding,
        addFoodLog,
        removeFoodLog,
        clearMealLogs,
        startWorkout,
        updateWorkoutSet,
        addWorkoutSet,
        finishWorkout,
        cancelWorkout,
        addWaterMl,
        resetWater,
        setSteps,
        addSteps,
        resetSteps,
        updateSleep,
        logWeight,
        sendCoachMessage,
        applyRecommendation,
        triggerCelebration
      }}
    >
      {children}
    </FitnessContext.Provider>
  );
};

export const useFitness = () => {
  const context = useContext(FitnessContext);
  if (!context) {
    throw new Error('useFitness must be used within a FitnessProvider');
  }
  return context;
};
