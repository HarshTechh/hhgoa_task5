import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sliders,
  ShieldCheck,
  Flame,
  Dumbbell,
  HeartPulse,
  Scale
} from 'lucide-react';
import { UserProfile, DailyTargets, BiologicalSex, FitnessGoal, ActivityLevel, DietType, CuisineType } from '../../types';
import { calculatePersonalizedTargets } from '../../lib/calculators/targets';
import { useFitness } from '../../context/FitnessContext';

export const OnboardingWizard: React.FC = () => {
  const { completeOnboarding } = useFitness();
  const [step, setStep] = useState<number>(1);

  // Form State
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: 'Arjun',
    age: 26,
    sex: 'male',
    heightCm: 178,
    currentWeightKg: 78,
    targetWeightKg: 72,
    timelineWeeks: 12,
    primaryGoal: 'lose_weight',
    activityLevel: 'moderately_active',
    dailyMovementHours: { sitting: 6, standing: 2 },
    exerciseDaysPerWeek: 4,
    avgWorkoutDurationMin: 50,
    trainingTypes: ['Strength', 'Cardio / HIIT'],
    dietType: 'vegetarian',
    cuisinePreferences: ['Indian', 'North Indian', 'Maharashtrian'],
    allergies: [],
    foodsAvoided: [],
    mealsPerDay: 4,
    sleepTargetHours: 8
  });

  // Calculated Targets State
  const [calculatedTargets, setCalculatedTargets] = useState<DailyTargets>(() => {
    return calculatePersonalizedTargets(formData);
  });

  const [isCustomizing, setIsCustomizing] = useState<boolean>(false);
  const [customTargets, setCustomTargets] = useState<DailyTargets>(calculatedTargets);

  const handleNextStep = () => {
    if (step === 4) {
      const targets = calculatePersonalizedTargets(formData);
      setCalculatedTargets(targets);
      setCustomTargets(targets);
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleFinish = () => {
    const finalProfile: UserProfile = {
      ...(formData as UserProfile),
      id: 'user_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    completeOnboarding(finalProfile, isCustomizing ? customTargets : calculatedTargets);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#111215] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="w-full max-w-lg bg-white rounded-4xl p-6 sm:p-8 shadow-ios-card relative z-10 border border-black/[0.04]">
        {/* Header Indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#fa6348] flex items-center justify-center font-black text-white text-xs shadow-coral-glow">
              ⚡
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#fa6348]">FITENT OS</span>
              <h2 className="text-sm font-bold text-[#111215] leading-tight">Personalized Fitness Onboarding</h2>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step ? 'w-6 bg-[#fa6348]' : s < step ? 'w-2.5 bg-[#fa6348]/40' : 'w-2 bg-[#eaebef]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Step 1: Basic & Body Information */}
        {step === 1 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-extrabold text-[#111215] tracking-tight">Tell us about yourself</h3>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Your body measurements calibrate the baseline metabolic engine.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Your Name</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold focus:outline-none focus:border-[#fa6348]"
                  placeholder="e.g. Arjun"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age || 25}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold focus:outline-none focus:border-[#fa6348]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Biological Sex</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['male', 'female'] as BiologicalSex[]).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFormData({ ...formData, sex: s })}
                      className={`py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                        formData.sex === s
                          ? 'bg-[#fa6348] border-[#fa6348] text-white shadow-coral-glow'
                          : 'bg-[#f8f9fb] border-black/[0.06] text-[#636366]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={formData.heightCm || 175}
                  onChange={(e) => setFormData({ ...formData, heightCm: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold focus:outline-none focus:border-[#fa6348]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#111215] mb-1">Current Weight (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.currentWeightKg || 75}
                  onChange={(e) => setFormData({ ...formData, currentWeightKg: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold focus:outline-none focus:border-[#fa6348]"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Primary Goal */}
        {step === 2 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-extrabold text-[#111215] tracking-tight">What is your primary goal?</h3>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Dictates calorie balance and protein synthesis ratios.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'lose_weight', title: 'Lose Weight / Fat', desc: '500 kcal deficit + lean retention', icon: Flame },
                { id: 'build_muscle', title: 'Build Muscle', desc: 'Caloric surplus + high protein', icon: Dumbbell },
                { id: 'maintain_weight', title: 'Maintain & Recompose', desc: 'Energy balance + body recomposition', icon: Scale },
                { id: 'improve_fitness', title: 'General Fitness', desc: 'Endurance & active lifestyle', icon: HeartPulse }
              ].map((g) => {
                const Icon = g.icon;
                const isSelected = formData.primaryGoal === g.id;
                return (
                  <div
                    key={g.id}
                    onClick={() => setFormData({ ...formData, primaryGoal: g.id as FitnessGoal })}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-[#fa6348]/10 border-[#fa6348] text-[#111215] shadow-sm'
                        : 'bg-[#f8f9fb] border-black/[0.04] text-[#636366] hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#fa6348] text-white' : 'bg-white text-gray-500'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-[#111215]">{g.title}</h4>
                        <p className="text-[10px] text-[#8e8e93]">{g.desc}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Target Weight (kg)</label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.targetWeightKg || 70}
                  onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#111215] mb-1">Timeline (Weeks)</label>
                <input
                  type="number"
                  value={formData.timelineWeeks || 12}
                  onChange={(e) => setFormData({ ...formData, timelineWeeks: Number(e.target.value) })}
                  className="w-full px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-[#111215] text-xs font-semibold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Activity & Exercise */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-extrabold text-[#111215] tracking-tight">Activity Profile</h3>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Calibrates Total Daily Energy Expenditure (TDEE).
              </p>
            </div>

            <div className="space-y-2">
              {[
                { id: 'sedentary', label: 'Sedentary', sub: 'Desk job, little regular exercise' },
                { id: 'lightly_active', label: 'Lightly Active', sub: 'Light movement / 1-3 days exercise' },
                { id: 'moderately_active', label: 'Moderately Active', sub: 'Exercise 3-5 days/week (Recommended)' },
                { id: 'very_active', label: 'Very Active', sub: 'Heavy exercise 6-7 days/week' }
              ].map((act) => (
                <div
                  key={act.id}
                  onClick={() => setFormData({ ...formData, activityLevel: act.id as ActivityLevel })}
                  className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    formData.activityLevel === act.id
                      ? 'bg-[#fa6348]/10 border-[#fa6348] text-[#111215]'
                      : 'bg-[#f8f9fb] border-black/[0.04] text-[#636366]'
                  }`}
                >
                  <div>
                    <span className="text-xs font-bold text-[#111215]">{act.label}</span>
                    <p className="text-[10px] text-[#8e8e93]">{act.sub}</p>
                  </div>
                  {formData.activityLevel === act.id && <CheckCircle2 className="w-4 h-4 text-[#fa6348]" />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Nutrition Profile */}
        {step === 4 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div>
              <h3 className="text-xl font-extrabold text-[#111215] tracking-tight">Diet & Nutrition</h3>
              <p className="text-xs text-[#8e8e93] mt-0.5">
                Matches AI food suggestions to your dietary preferences.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111215] mb-2">Diet Type</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'vegetarian', label: '🥬 Vegetarian' },
                  { id: 'non_vegetarian', label: '🍗 Non-Veg' },
                  { id: 'eggetarian', label: '🥚 Eggetarian' },
                  { id: 'vegan', label: '🌱 Vegan' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, dietType: d.id as DietType })}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                      formData.dietType === d.id
                        ? 'bg-[#fa6348] border-[#fa6348] text-white shadow-coral-glow'
                        : 'bg-[#f8f9fb] border-black/[0.04] text-[#636366]'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Target Review */}
        {step === 5 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#fa6348] block">
                  Deterministic Math Engine
                </span>
                <h3 className="text-xl font-extrabold text-[#111215]">Your Daily Plan</h3>
              </div>

              <button
                type="button"
                onClick={() => setIsCustomizing(!isCustomizing)}
                className="flex items-center gap-1 text-xs font-bold text-[#fa6348] px-2.5 py-1 rounded-lg bg-[#fa6348]/10"
              >
                <Sliders className="w-3 h-3" />
                <span>{isCustomizing ? 'Reset' : 'Customize'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-[10px] font-bold text-[#8e8e93] uppercase">Calories</span>
                <div className="text-lg font-black text-[#111215] mt-0.5">
                  {calculatedTargets.calorieTarget} kcal
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-[10px] font-bold text-[#fa6348] uppercase">Protein</span>
                <div className="text-lg font-black text-[#111215] mt-0.5">
                  {calculatedTargets.proteinGrams}g
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-[10px] font-bold text-amber-500 uppercase">Carbs</span>
                <div className="text-lg font-black text-[#111215] mt-0.5">
                  {calculatedTargets.carbsGrams}g
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04]">
                <span className="text-[10px] font-bold text-rose-500 uppercase">Fat</span>
                <div className="text-lg font-black text-[#111215] mt-0.5">
                  {calculatedTargets.fatGrams}g
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] text-xs space-y-1 text-[#636366]">
              <div className="flex items-center gap-1.5 font-bold text-[#111215]">
                <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                <span>Verified Scientific Equations</span>
              </div>
              <p className="text-[11px]">
                Calculated via <strong>Mifflin-St Jeor BMR</strong> + activity multiplier + safe {formData.primaryGoal === 'lose_weight' ? '-500 kcal deficit' : 'target adjustment'}.
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-black/[0.05]">
          {step > 1 ? (
            <button
              type="button"
              onClick={handlePrevStep}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#636366] hover:text-[#111215]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#fa6348] text-white font-extrabold text-xs shadow-coral-glow hover:bg-[#e8492c] transition-all ml-auto"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#fa6348] text-white font-black text-xs shadow-coral-glow hover:bg-[#e8492c] transition-all ml-auto"
            >
              <span>Launch Fitent OS 🚀</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
