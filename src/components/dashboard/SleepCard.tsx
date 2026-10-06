import React from 'react';
import { Moon, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const SleepCard: React.FC = () => {
  const { sleepLog, userProfile } = useFitness();

  const hours = Math.floor(sleepLog.durationMinutes / 60);
  const minutes = sleepLog.durationMinutes % 60;
  const targetHours = userProfile.sleepTargetHours || 8;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-dark-border flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Sleep & Recovery</h3>
            <p className="text-[11px] text-dark-textMuted">Circadian rhythm & muscle repair</p>
          </div>
        </div>

        <span className="text-xs uppercase px-2 py-0.5 rounded-full font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 capitalize">
          {sleepLog.quality}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
        <div className="flex items-baseline justify-between mb-1">
          <span className="text-2xl font-black text-white">
            {hours}h {minutes}m
          </span>
          <span className="text-xs text-dark-textMuted">Target: {targetHours}h</span>
        </div>

        <div className="flex items-center gap-4 text-xs text-dark-textMuted mt-3 pt-2 border-t border-dark-border/60">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Bed: <strong className="text-white">{sleepLog.bedTime}</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Wake: <strong className="text-white">{sleepLog.wakeTime}</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};
