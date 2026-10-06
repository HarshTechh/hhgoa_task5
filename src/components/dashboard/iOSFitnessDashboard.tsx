import React, { useState } from 'react';
import {
  MapPin,
  Dumbbell,
  Sparkles,
  Flame,
  Droplets,
  Camera,
  Receipt,
  Plus,
  ArrowUpRight,
  TrendingDown,
  TrendingUp,
  Activity,
  Heart
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface iOSFitnessDashboardProps {
  onOpenFoodScanner: () => void;
  onOpenFoodSearch: () => void;
}

export const IOSFitnessDashboard: React.FC<iOSFitnessDashboardProps> = ({
  onOpenFoodScanner,
  onOpenFoodSearch
}) => {
  const {
    activity,
    dailyTargets,
    foodLogs,
    dailyScore,
    userProfile,
    setActiveTab,
    addWaterMl
  } = useFitness();

  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(2); // Default to Wednesday 12
  const [activeSegment, setActiveSegment] = useState<'nutrition' | 'activity'>('activity');

  const days = [
    { name: 'Mon', num: 10 },
    { name: 'Tue', num: 11 },
    { name: 'Wed', num: 12 },
    { name: 'Thu', num: 13 },
    { name: 'Fri', num: 14 }
  ];

  const totalCaloriesConsumed = foodLogs.reduce((acc, f) => acc + f.calories, 0);
  const activeCalories = activity.activeCalories || 420;
  const displayCalories = activeSegment === 'activity' ? activeCalories : totalCaloriesConsumed;

  return (
    <div className="w-full max-w-md mx-auto space-y-5 pb-28 pt-2">
      {/* 1. Top Weekday Calendar Strip */}
      <div className="flex items-center justify-between px-2 pt-2">
        {days.map((day, idx) => {
          const isSelected = selectedDayIndex === idx;
          return (
            <button
              key={day.num}
              onClick={() => setSelectedDayIndex(idx)}
              className={`flex flex-col items-center justify-center transition-all ${
                isSelected
                  ? 'text-[#111215] scale-110'
                  : 'text-[#8e8e93] hover:text-[#555]'
              }`}
            >
              <span className={`text-xs ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {day.name}
              </span>
              <span
                className={`text-xl leading-none mt-1 tracking-tight ${
                  isSelected ? 'font-black text-2xl text-[#111215]' : 'font-semibold text-lg'
                }`}
              >
                {day.num}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2. Pill Segmented Control: Nutrition / Activity */}
      <div className="flex justify-center pt-2">
        <div className="bg-[#eaebef] p-1 rounded-full flex items-center gap-1 shadow-inner">
          <button
            onClick={() => setActiveSegment('nutrition')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSegment === 'nutrition'
                ? 'bg-white text-[#111215] shadow-sm font-bold'
                : 'text-[#636366] hover:text-[#111215]'
            }`}
          >
            Nutrition
          </button>
          <button
            onClick={() => setActiveSegment('activity')}
            className={`px-5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeSegment === 'activity'
                ? 'bg-white text-[#111215] shadow-sm font-bold'
                : 'text-[#636366] hover:text-[#111215]'
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      {/* 3. Hero Metric Display */}
      <div className="text-center py-2">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-[#111215] tracking-tight font-sans">
          {displayCalories.toLocaleString()}
        </h1>
        <p className="text-base font-semibold text-[#111215] mt-0.5">
          Calories
        </p>
      </div>

      {/* 4. Top Twin Cards: Distance & Active Time */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Card 1: Distance */}
        <div
          onClick={() => setActiveTab('activity')}
          className="ios-card p-5 flex flex-col justify-between items-center text-center cursor-pointer min-h-[140px]"
        >
          <div className="p-2 text-[#111215]">
            <MapPin className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs text-[#8e8e93] font-medium">Distance</span>
            <div className="text-xl font-extrabold text-[#111215] tracking-tight">
              {activity.distanceKm > 0 ? `${activity.distanceKm} km` : '6.7 km'}
            </div>
          </div>
        </div>

        {/* Card 2: Active Time */}
        <div
          onClick={() => setActiveTab('workout')}
          className="ios-card p-5 flex flex-col justify-between items-center text-center cursor-pointer min-h-[140px]"
        >
          <div className="p-2 text-[#111215]">
            <Dumbbell className="w-5 h-5 stroke-[2.2]" />
          </div>
          <div className="space-y-0.5">
            <span className="text-xs text-[#8e8e93] font-medium">Active Time</span>
            <div className="text-xl font-extrabold text-[#111215] tracking-tight">
              {activity.activeMinutes > 0 ? `${Math.floor(activity.activeMinutes / 60)}h ${activity.activeMinutes % 60}m` : '1h 12m'}
            </div>
          </div>
        </div>
      </div>

      {/* 5. Daily Updates Header */}
      <div className="pt-2">
        <h2 className="text-lg font-bold text-[#111215] tracking-tight">
          Daily Updates
        </h2>
      </div>

      {/* 6. Middle Row Cards: Oxygen & Heart Rate */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Card A: Oxygen */}
        <div className="ios-card p-4 flex flex-col justify-between min-h-[175px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111215]">Oxygen</span>
              <span className="text-[11px] font-semibold text-[#8e8e93]">+2%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
              <span className="text-[10px] font-medium text-[#8e8e93]">Normal</span>
            </div>
            <div className="text-2xl font-extrabold text-[#111215] tracking-tight mt-1">
              84,3 <span className="text-sm font-semibold">%</span>
            </div>
          </div>

          {/* Dot Matrix Visualization in Coral Dots */}
          <div className="flex items-end justify-between gap-1 pt-3">
            {[
              [2, 3],
              [1, 2],
              [2, 3, 4],
              [1, 2],
              [3, 4, 5],
              [2, 3],
              [1, 2, 3],
              [3, 4, 5],
              [2, 3, 4]
            ].map((col, cIdx) => (
              <div key={cIdx} className="flex flex-col gap-1 items-center">
                {col.map((dot, dIdx) => (
                  <span
                    key={dIdx}
                    className="w-1.5 h-1.5 rounded-full bg-[#fa6348]"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Card B: Heart Rate */}
        <div className="ios-card p-4 flex flex-col justify-between min-h-[175px]">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#111215]">Heart Rate</span>
              <span className="text-[11px] font-semibold text-[#8e8e93]">-7%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#fa6348]"></span>
              <span className="text-[10px] font-medium text-[#8e8e93]">Normal</span>
            </div>
            <div className="text-2xl font-extrabold text-[#111215] tracking-tight mt-1">
              102 <span className="text-xs font-semibold text-[#8e8e93]">bpm</span>
            </div>
          </div>

          {/* Coral Animated ECG Waveform */}
          <div className="w-full h-10 flex items-center justify-center pt-2">
            <svg className="w-full h-full" viewBox="0 0 120 36" fill="none">
              <path
                d="M 0 18 L 25 18 L 32 14 L 38 24 L 46 6 L 52 30 L 58 18 L 75 18 L 82 13 L 88 23 L 95 2 L 102 34 L 108 18 L 120 18"
                stroke="#fa6348"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-ecg"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 7. Bottom Card: Health Improvement Score */}
      <div className="ios-card p-5 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#111215]">
              Health Improvement Score
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]"></span>
              <span className="text-[11px] font-medium text-[#8e8e93]">Normal</span>
            </div>
          </div>

          <div className="text-3xl font-extrabold text-[#111215] tracking-tight">
            {dailyScore.totalScore > 0 ? `${dailyScore.totalScore}%` : '54%'}
          </div>
        </div>

        <p className="text-[11px] text-[#8e8e93] leading-relaxed pt-1 border-t border-black/[0.04]">
          This indicator is based on continuous daily analysis of your nutrition, steps, workouts, and sleep markers to provide an objective assessment of your fitness progress.
        </p>
      </div>

      {/* 8. Quick Action Shortcut Pills */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={onOpenFoodScanner}
          className="flex-1 py-3 px-3 rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:shadow text-xs font-bold text-[#111215] flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Camera className="w-4 h-4 text-[#fa6348]" />
          <span>AI Scan</span>
        </button>

        <button
          onClick={onOpenFoodSearch}
          className="flex-1 py-3 px-3 rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:shadow text-xs font-bold text-[#111215] flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 text-[#111215]" />
          <span>Log Food</span>
        </button>

        <button
          onClick={() => addWaterMl(250)}
          className="flex-1 py-3 px-3 rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:shadow text-xs font-bold text-[#111215] flex items-center justify-center gap-1.5 transition-all active:scale-95"
        >
          <Droplets className="w-4 h-4 text-[#06b6d4]" />
          <span>+250ml</span>
        </button>
      </div>
    </div>
  );
};
