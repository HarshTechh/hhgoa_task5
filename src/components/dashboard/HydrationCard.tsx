import React from 'react';
import { Droplets, Plus } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const HydrationCard: React.FC = () => {
  const { waterLog, dailyTargets, addWaterMl } = useFitness();

  const targetMl = dailyTargets.waterLiters * 1000;
  const currentMl = waterLog.totalMl;
  const percent = Math.min(100, Math.round((currentMl / targetMl) * 100));

  return (
    <div className="glass-panel rounded-3xl p-6 border border-dark-border flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
            <Droplets className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Hydration</h3>
            <p className="text-[11px] text-dark-textMuted">Electrolytes & fluid balance</p>
          </div>
        </div>

        <span className="text-sm font-black text-cyan-400">{percent}%</span>
      </div>

      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border mb-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-2xl font-black text-white">
            {(currentMl / 1000).toFixed(2)} <span className="text-xs text-dark-textMuted font-normal">/ {dailyTargets.waterLiters} L</span>
          </span>
          <span className="text-[11px] text-dark-textMuted">
            {Math.max(0, targetMl - currentMl)} ml remaining
          </span>
        </div>

        <div className="w-full h-2.5 rounded-full bg-dark-cardMuted overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Quick Tap Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          id="btn-quick-water-250"
          onClick={() => addWaterMl(250)}
          className="flex items-center justify-center gap-1 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 text-cyan-300 text-xs font-bold transition-all active:scale-95"
        >
          <Plus className="w-3 h-3" />
          <span>250 ml</span>
        </button>

        <button
          id="btn-quick-water-500"
          onClick={() => addWaterMl(500)}
          className="flex items-center justify-center gap-1 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all active:scale-95"
        >
          <Plus className="w-3 h-3" />
          <span>500 ml</span>
        </button>

        <button
          id="btn-quick-water-750"
          onClick={() => addWaterMl(750)}
          className="flex items-center justify-center gap-1 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all active:scale-95"
        >
          <Plus className="w-3 h-3" />
          <span>750 ml</span>
        </button>
      </div>
    </div>
  );
};
