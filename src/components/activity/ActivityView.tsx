import React, { useState } from 'react';
import { Footprints, Droplets, Plus, RotateCcw } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ActivityView: React.FC = () => {
  const { activity, dailyTargets, waterLog, addSteps, resetSteps, addWaterMl, resetWater } = useFitness();
  const [customStepsInput, setCustomStepsInput] = useState<string>('');
  const [customWaterInput, setCustomWaterInput] = useState<string>('');

  const stepPercent = Math.min(100, Math.round((activity.steps / dailyTargets.stepsTarget) * 100));
  const targetWaterMl = dailyTargets.waterLiters * 1000;
  const waterPercent = Math.min(100, Math.round((waterLog.totalMl / targetWaterMl) * 100));

  const handleAddCustomSteps = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customStepsInput, 10);
    if (val > 0) {
      addSteps(val);
      setCustomStepsInput('');
    }
  };

  const handleAddCustomWater = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(customWaterInput, 10);
    if (val > 0) {
      addWaterMl(val);
      setCustomWaterInput('');
    }
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Pedometer & Movement Card */}
      <div className="ios-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Footprints className="w-5 h-5 text-[#fa6348]" />
            <h3 className="font-bold text-sm text-[#111215]">Daily Steps</h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => addSteps(500)}
              className="px-2 py-1 rounded-full bg-[#f8f9fb] hover:bg-gray-200 text-[11px] font-bold text-[#111215]"
            >
              +500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2 py-1 rounded-full bg-[#fa6348]/10 text-[#fa6348] hover:bg-[#fa6348]/20 text-[11px] font-bold"
            >
              +1,000
            </button>
            <button
              onClick={() => addSteps(2500)}
              className="px-2 py-1 rounded-full bg-[#fa6348]/10 text-[#fa6348] hover:bg-[#fa6348]/20 text-[11px] font-bold"
            >
              +2,500
            </button>
            <button
              onClick={resetSteps}
              className="px-2 py-1 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-[11px] font-bold flex items-center gap-0.5 transition-all"
              title="Reset steps to 0"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-3xl font-extrabold text-[#111215]">{activity.steps.toLocaleString()}</span>
            <span className="text-xs text-[#8e8e93]">Target: {dailyTargets.stepsTarget.toLocaleString()} steps</span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#eaebef] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#fa6348] transition-all duration-700"
              style={{ width: `${stepPercent}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleAddCustomSteps} className="flex items-center gap-2 pt-0.5">
          <input
            type="number"
            placeholder="Log custom steps..."
            value={customStepsInput}
            onChange={(e) => setCustomStepsInput(e.target.value)}
            className="flex-1 bg-[#f8f9fb] border border-black/[0.06] rounded-xl px-3 py-1.5 text-xs font-bold text-[#111215] placeholder:font-normal"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-[#fa6348] text-white font-bold text-xs hover:bg-[#e8492c] transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>

        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className="p-2.5 rounded-2xl bg-[#f8f9fb]">
            <span className="text-[10px] text-[#8e8e93] block">Distance</span>
            <span className="text-sm font-bold text-[#111215]">{activity.distanceKm} km</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#f8f9fb]">
            <span className="text-[10px] text-[#8e8e93] block">Active Burn</span>
            <span className="text-sm font-bold text-[#fa6348]">{activity.activeCalories} kcal</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-[#f8f9fb]">
            <span className="text-[10px] text-[#8e8e93] block">Active Time</span>
            <span className="text-sm font-bold text-[#111215]">{activity.activeMinutes} mins</span>
          </div>
        </div>
      </div>

      {/* Hydration Card */}
      <div className="ios-card p-5 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#06b6d4]" />
            <h3 className="font-bold text-sm text-[#111215]">Water Intake</h3>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#06b6d4]">
              {(waterLog.totalMl / 1000).toFixed(2)}L / {dailyTargets.waterLiters}L ({waterPercent}%)
            </span>
            <button
              onClick={resetWater}
              className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 text-[10px] font-bold flex items-center gap-0.5 transition-all"
              title="Reset water intake to 0"
            >
              <RotateCcw className="w-2.5 h-2.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-[#eaebef] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#06b6d4] transition-all duration-700"
            style={{ width: `${waterPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => addWaterMl(250)}
            className="py-2 rounded-2xl bg-[#f8f9fb] hover:bg-[#06b6d4]/10 text-xs font-bold text-[#111215] transition-all"
          >
            +250ml
          </button>
          <button
            onClick={() => addWaterMl(500)}
            className="py-2 rounded-2xl bg-[#06b6d4]/10 text-xs font-bold text-[#06b6d4] hover:bg-[#06b6d4]/20 transition-all"
          >
            +500ml
          </button>
          <button
            onClick={() => addWaterMl(750)}
            className="py-2 rounded-2xl bg-[#f8f9fb] hover:bg-[#06b6d4]/10 text-xs font-bold text-[#111215] transition-all"
          >
            +750ml
          </button>
        </div>

        <form onSubmit={handleAddCustomWater} className="flex items-center gap-2 pt-0.5">
          <input
            type="number"
            placeholder="Log custom water (ml)..."
            value={customWaterInput}
            onChange={(e) => setCustomWaterInput(e.target.value)}
            className="flex-1 bg-[#f8f9fb] border border-black/[0.06] rounded-xl px-3 py-1.5 text-xs font-bold text-[#111215] placeholder:font-normal"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-[#06b6d4] text-white font-bold text-xs hover:bg-[#0891b2] transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </form>
      </div>
    </div>
  );
};
