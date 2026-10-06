import React from 'react';
import { Sparkles, Trophy, Flame } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const DailyProgressHero: React.FC = () => {
  const { dailyScore, dailyTargets, foodLogs, activity, waterLog } = useFitness();

  const consumedCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const caloriePercent = Math.min(100, Math.round((consumedCalories / dailyTargets.calorieTarget) * 100));
  const stepsPercent = Math.min(100, Math.round((activity.steps / dailyTargets.stepsTarget) * 100));
  const waterPercent = Math.min(100, Math.round((waterLog.totalMl / (dailyTargets.waterLiters * 1000)) * 100));

  // Circular progress stroke calculation
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (dailyScore.totalScore / 100) * circumference;

  return (
    <div className="glass-panel rounded-3xl p-6 lg:p-8 relative overflow-hidden border border-dark-border/80">
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Score Ring */}
        <div className="flex items-center gap-6">
          <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-dark-cardMuted stroke-current"
                strokeWidth="12"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="text-brand-400 stroke-current transition-all duration-1000 ease-out"
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-black text-white tracking-tight leading-none">
                {dailyScore.totalScore}%
              </span>
              <span className="text-[10px] uppercase font-extrabold text-brand-400 tracking-wider mt-1">
                Daily Score
              </span>
            </div>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/15 border border-brand-500/30 text-brand-300 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
              {dailyScore.totalScore >= 80 ? 'Optimal Rhythm' : 'In Progress'}
            </div>
            <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight">
              {dailyScore.totalScore >= 85 ? "You're crushing today's plan!" : "Keep going, stay on track!"}
            </h2>
            <p className="text-xs text-dark-textMuted mt-1 max-w-sm">
              Holistic score calculated across nutrition compliance, step count, active training, and hydration.
            </p>
          </div>
        </div>

        {/* Right Sub-metrics Badges */}
        <div className="grid grid-cols-3 gap-3 w-full md:w-auto">
          <div className="p-3 rounded-2xl bg-dark-card border border-dark-border flex flex-col items-center text-center min-w-[95px]">
            <Flame className="w-4 h-4 text-brand-400 mb-1" />
            <span className="text-base font-black text-white">{caloriePercent}%</span>
            <span className="text-[10px] text-dark-textMuted">Calories</span>
          </div>

          <div className="p-3 rounded-2xl bg-dark-card border border-dark-border flex flex-col items-center text-center min-w-[95px]">
            <Trophy className="w-4 h-4 text-purple-400 mb-1" />
            <span className="text-base font-black text-white">{stepsPercent}%</span>
            <span className="text-[10px] text-dark-textMuted">Steps</span>
          </div>

          <div className="p-3 rounded-2xl bg-dark-card border border-dark-border flex flex-col items-center text-center min-w-[95px]">
            <span className="text-cyan-400 text-sm mb-1">💧</span>
            <span className="text-base font-black text-white">{waterPercent}%</span>
            <span className="text-[10px] text-dark-textMuted">Hydration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
