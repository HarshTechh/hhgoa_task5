import React from 'react';
import { FitnessGoal, DietType } from '../../types';
import { useFitness } from '../../context/FitnessContext';
import { Settings, RefreshCw } from 'lucide-react';
import { calculatePersonalizedTargets } from '../../lib/calculators/targets';

export const SettingsView: React.FC = () => {
  const { userProfile, updateUserProfile, updateDailyTargets, resetOnboarding, triggerCelebration } = useFitness();

  const handleGoalChange = (newGoal: FitnessGoal) => {
    updateUserProfile({ primaryGoal: newGoal });
    triggerCelebration();
  };

  const handleRecalculateTargets = () => {
    const freshTargets = calculatePersonalizedTargets(userProfile);
    updateDailyTargets(freshTargets);
    triggerCelebration();
  };

  const loadPresetPersona = (name: string, goal: FitnessGoal, diet: DietType, weight: number, targetWeight: number) => {
    const newProf = {
      name,
      primaryGoal: goal,
      dietType: diet,
      currentWeightKg: weight,
      targetWeightKg: targetWeight
    };
    updateUserProfile(newProf);
    const updated = { ...userProfile, ...newProf };
    updateDailyTargets(calculatePersonalizedTargets(updated));
    triggerCelebration();
  };

  return (
    <div className="space-y-4 pb-28">
      <div className="ios-card p-5">
        <h2 className="text-base font-extrabold text-[#111215]">Profile & Parameters</h2>
        <p className="text-xs text-[#8e8e93] mt-0.5">Manage goals and calculation rules</p>
      </div>

      <div className="ios-card p-5 space-y-4">
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-[#111215] mb-1">User Name</label>
            <input
              type="text"
              value={userProfile.name}
              onChange={(e) => updateUserProfile({ name: e.target.value })}
              className="w-full px-3.5 py-2 bg-[#f8f9fb] border border-black/[0.06] rounded-xl text-xs font-bold text-[#111215]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111215] mb-1">Fitness Goal</label>
            <select
              value={userProfile.primaryGoal}
              onChange={(e) => handleGoalChange(e.target.value as FitnessGoal)}
              className="w-full px-3.5 py-2 bg-[#f8f9fb] border border-black/[0.06] rounded-xl text-xs font-bold text-[#111215] capitalize"
            >
              <option value="lose_weight">Lose Weight (-500 kcal)</option>
              <option value="build_muscle">Build Muscle (+300 kcal)</option>
              <option value="maintain_weight">Maintain Weight</option>
              <option value="improve_fitness">General Fitness</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-[#111215] mb-1">Current Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={userProfile.currentWeightKg}
                onChange={(e) => updateUserProfile({ currentWeightKg: Number(e.target.value) })}
                className="w-full px-3.5 py-2 bg-[#f8f9fb] border border-black/[0.06] rounded-xl text-xs font-bold text-[#111215]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#111215] mb-1">Diet Type</label>
              <select
                value={userProfile.dietType}
                onChange={(e) => updateUserProfile({ dietType: e.target.value as DietType })}
                className="w-full px-3.5 py-2 bg-[#f8f9fb] border border-black/[0.06] rounded-xl text-xs font-bold text-[#111215] capitalize"
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non_vegetarian">Non-Vegetarian</option>
                <option value="eggetarian">Eggetarian</option>
                <option value="vegan">Vegan</option>
              </select>
            </div>
          </div>
        </div>

        <button
          onClick={handleRecalculateTargets}
          className="w-full py-2.5 rounded-full bg-[#fa6348]/10 text-[#fa6348] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#fa6348]/20 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Recalculate Daily Targets</span>
        </button>
      </div>

      {/* Demo Switcher */}
      <div className="ios-card p-5 space-y-3">
        <h3 className="font-bold text-xs text-[#111215]">Quick Demo Personas</h3>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => loadPresetPersona('Arjun', 'lose_weight', 'vegetarian', 78, 72)}
            className="p-2.5 rounded-2xl bg-[#f8f9fb] text-left hover:border-gray-300 border border-transparent"
          >
            <span className="text-base">🏃‍♂️</span>
            <span className="text-xs font-bold block text-[#111215] mt-0.5">Arjun</span>
            <span className="text-[10px] text-[#8e8e93]">Fat Loss</span>
          </button>

          <button
            onClick={() => loadPresetPersona('Priya', 'build_muscle', 'non_vegetarian', 62, 65)}
            className="p-2.5 rounded-2xl bg-[#f8f9fb] text-left hover:border-gray-300 border border-transparent"
          >
            <span className="text-base">🏋️‍♀️</span>
            <span className="text-xs font-bold block text-[#111215] mt-0.5">Priya</span>
            <span className="text-[10px] text-[#8e8e93]">Muscle</span>
          </button>

          <button
            onClick={() => loadPresetPersona('Rohan', 'improve_fitness', 'vegan', 70, 70)}
            className="p-2.5 rounded-2xl bg-[#f8f9fb] text-left hover:border-gray-300 border border-transparent"
          >
            <span className="text-base">🧘‍♂️</span>
            <span className="text-xs font-bold block text-[#111215] mt-0.5">Rohan</span>
            <span className="text-[10px] text-[#8e8e93]">Endurance</span>
          </button>
        </div>
      </div>

      <div className="ios-card p-4 flex items-center justify-between">
        <span className="text-xs font-bold text-[#111215]">Reset Questionnaire</span>
        <button
          onClick={resetOnboarding}
          className="text-xs text-rose-500 font-bold px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100"
        >
          Restart
        </button>
      </div>
    </div>
  );
};
