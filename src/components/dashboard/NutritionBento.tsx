import React from 'react';
import { Flame, ChevronRight, Plus } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface NutritionBentoProps {
  onAddFood: () => void;
  onOpenScanner: () => void;
}

export const NutritionBento: React.FC<NutritionBentoProps> = ({ onAddFood, onOpenScanner }) => {
  const { dailyTargets, foodLogs, setActiveTab } = useFitness();

  const consumedCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const consumedProtein = foodLogs.reduce((acc, item) => acc + item.proteinG, 0);
  const consumedCarbs = foodLogs.reduce((acc, item) => acc + item.carbsG, 0);
  const consumedFat = foodLogs.reduce((acc, item) => acc + item.fatG, 0);
  const consumedFiber = foodLogs.reduce((acc, item) => acc + item.fiberG, 0);

  const remainingCalories = Math.max(0, dailyTargets.calorieTarget - consumedCalories);

  const macros = [
    {
      label: 'Protein',
      consumed: consumedProtein,
      target: dailyTargets.proteinGrams,
      unit: 'g',
      color: 'bg-brand-500',
      text: 'text-brand-400',
      border: 'border-brand-500/20'
    },
    {
      label: 'Carbs',
      consumed: consumedCarbs,
      target: dailyTargets.carbsGrams,
      unit: 'g',
      color: 'bg-amber-500',
      text: 'text-amber-400',
      border: 'border-amber-500/20'
    },
    {
      label: 'Fat',
      consumed: consumedFat,
      target: dailyTargets.fatGrams,
      unit: 'g',
      color: 'bg-rose-500',
      text: 'text-rose-400',
      border: 'border-rose-500/20'
    },
    {
      label: 'Fiber',
      consumed: consumedFiber,
      target: dailyTargets.fiberGrams,
      unit: 'g',
      color: 'bg-purple-500',
      text: 'text-purple-400',
      border: 'border-purple-500/20'
    }
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-dark-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-brand-500/20 text-brand-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Daily Nutrition & Macros</h3>
            <p className="text-[11px] text-dark-textMuted">Deterministic real-time aggregation</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenScanner}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold hover:bg-brand-500/25 transition-all"
          >
            📸 <span>AI Scan</span>
          </button>
          <button
            onClick={onAddFood}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-dark-cardMuted border border-dark-border text-white text-xs font-bold hover:bg-dark-card transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Food</span>
          </button>
        </div>
      </div>

      {/* Calories Overview Banner */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border mb-5 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">Energy Balance</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-2xl font-black text-white">{consumedCalories.toLocaleString()}</span>
            <span className="text-xs text-dark-textMuted">/ {dailyTargets.calorieTarget.toLocaleString()} kcal</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">Remaining</span>
          <div className="text-2xl font-black text-brand-300">{remainingCalories.toLocaleString()} kcal</div>
        </div>
      </div>

      {/* Macro Linear Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {macros.map((macro) => {
          const percent = Math.min(100, Math.round((macro.consumed / macro.target) * 100));
          const remaining = Math.max(0, macro.target - macro.consumed);
          return (
            <div key={macro.label} className={`p-3.5 rounded-2xl bg-dark-card border ${macro.border}`}>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold ${macro.text}`}>{macro.label}</span>
                <span className="text-xs font-black text-white">
                  {macro.consumed}{macro.unit} <span className="text-dark-textMuted font-normal">/ {macro.target}{macro.unit}</span>
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-dark-cardMuted overflow-hidden mb-1.5">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${macro.color}`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] text-dark-textMuted">
                <span>{percent}% completed</span>
                <span>{remaining > 0 ? `${remaining}${macro.unit} left` : 'Goal met ✓'}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-dark-border flex justify-end">
        <button
          onClick={() => setActiveTab('nutrition')}
          className="flex items-center gap-1 text-xs font-bold text-brand-400 hover:text-brand-300"
        >
          <span>Open Full Food Diary</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
