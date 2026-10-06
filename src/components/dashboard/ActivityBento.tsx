import React from 'react';
import { Footprints, Dumbbell, Timer, Flame, CheckCircle2 } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ActivityBento: React.FC = () => {
  const { activity, dailyTargets, currentWorkout, workoutHistory, setActiveTab, addSteps } = useFitness();

  const stepPercent = Math.min(100, Math.round((activity.steps / dailyTargets.stepsTarget) * 100));
  const latestWorkout = workoutHistory[0];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-dark-border space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white">Activity & Training</h3>
            <p className="text-[11px] text-dark-textMuted">Steps, active burn & workout logs</p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('workout')}
          className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold hover:bg-purple-500/25 transition-all"
        >
          <Dumbbell className="w-3.5 h-3.5" />
          <span>Workouts</span>
        </button>
      </div>

      {/* Steps Tracking */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-dark-textMuted">Daily Step Count</span>
            <div className="text-xl font-black text-white mt-0.5">
              {activity.steps.toLocaleString()} <span className="text-xs text-dark-textMuted font-normal">/ {dailyTargets.stepsTarget.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex gap-1.5">
            <button
              onClick={() => addSteps(500)}
              className="px-2 py-1 rounded-lg bg-dark-cardMuted hover:bg-dark-card border border-dark-border text-[11px] font-bold text-gray-300"
            >
              +500
            </button>
            <button
              onClick={() => addSteps(1000)}
              className="px-2 py-1 rounded-lg bg-dark-cardMuted hover:bg-dark-card border border-dark-border text-[11px] font-bold text-gray-300"
            >
              +1K
            </button>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-dark-cardMuted overflow-hidden mb-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-400 transition-all duration-700"
            style={{ width: `${stepPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs pt-1">
          <div className="flex items-center gap-1.5 text-dark-textMuted">
            <span>📍</span>
            <span>Distance: <strong className="text-white">{activity.distanceKm} km</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-dark-textMuted">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <span>Active Burn: <strong className="text-white">{activity.activeCalories} kcal</strong></span>
          </div>
        </div>
      </div>

      {/* Workout Status */}
      <div className="p-4 rounded-2xl bg-dark-card border border-dark-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`p-2 rounded-xl ${currentWorkout ? 'bg-orange-500/20 text-orange-400 animate-pulse' : 'bg-green-500/20 text-green-400'}`}>
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">
                {currentWorkout ? currentWorkout.name : latestWorkout ? `${latestWorkout.name} (Done)` : "Today's Workout Planned"}
              </h4>
              <p className="text-[10px] text-dark-textMuted">
                {currentWorkout 
                  ? 'Session in progress...' 
                  : latestWorkout 
                  ? `${latestWorkout.durationMinutes} min • ${latestWorkout.totalVolumeKg.toLocaleString()} kg volume` 
                  : 'Ready to start today’s split'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('workout')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
              currentWorkout
                ? 'bg-orange-500 text-black shadow-glow-amber'
                : 'bg-dark-cardMuted border border-dark-border text-white hover:bg-dark-card'
            }`}
          >
            {currentWorkout ? 'Resume' : 'Open'}
          </button>
        </div>
      </div>
    </div>
  );
};
