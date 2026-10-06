import React, { useState, useEffect } from 'react';
import { Play, Check, Plus, Dumbbell, Timer, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface WorkoutTrackerProps {
  onOpenAIPlanner: () => void;
}

export const WorkoutTracker: React.FC<WorkoutTrackerProps> = ({ onOpenAIPlanner }) => {
  const {
    currentWorkout,
    workoutHistory,
    startWorkout,
    updateWorkoutSet,
    addWorkoutSet,
    finishWorkout,
    cancelWorkout
  } = useFitness();

  const [restSeconds, setRestSeconds] = useState<number>(0);
  const [isResting, setIsResting] = useState<boolean>(false);

  useEffect(() => {
    let interval: any = null;
    if (isResting && restSeconds > 0) {
      interval = setInterval(() => {
        setRestSeconds((prev) => prev - 1);
      }, 1000);
    } else if (restSeconds === 0) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restSeconds]);

  const startRestTimer = (seconds: number = 60) => {
    setRestSeconds(seconds);
    setIsResting(true);
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Header Banner */}
      <div className="ios-card p-5 flex items-center justify-between">
        <div>
          <h2 className="text-base font-extrabold text-[#111215]">Workout & Gym Tracking</h2>
          <p className="text-xs text-[#8e8e93] mt-0.5">Track sets, volume, and progressive overload</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAIPlanner}
            className="p-2 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 transition-all text-xs font-bold flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">AI Split</span>
          </button>

          {!currentWorkout && (
            <button
              onClick={() => startWorkout('Chest & Delts Hypertrophy')}
              className="px-4 py-2 rounded-full bg-[#fa6348] text-white text-xs font-bold shadow-coral-glow hover:bg-[#e8492c] transition-all flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start</span>
            </button>
          )}
        </div>
      </div>

      {/* Quick Routine Presets when not in active workout */}
      {!currentWorkout && (
        <div className="grid grid-cols-2 gap-2">
          {[
            { name: 'Chest & Delts', exercises: ['Barbell Flat Bench Press', 'Incline Dumbbell Press', 'Standing Cable Chest Fly'] },
            { name: 'Back & Lats', exercises: ['Wide-Grip Lat Pulldown', 'Bent-Over Barbell Row', 'Seated Cable Row'] },
            { name: 'Leg Hypertrophy', exercises: ['Barbell Back Squat', '45-Degree Leg Press', 'Dumbbell Romanian Deadlift (RDL)'] },
            { name: 'Arms & Shoulders', exercises: ['Standing Dumbbell Bicep Curl', 'Cable Tricep Pushdown', 'Dumbbell Lateral Raise'] }
          ].map((preset, idx) => (
            <button
              key={idx}
              onClick={() => startWorkout(preset.name, preset.exercises)}
              className="p-3 rounded-2xl bg-white border border-black/[0.04] shadow-sm hover:border-[#fa6348]/30 text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111215] group-hover:text-[#fa6348] transition-colors">{preset.name}</span>
                <Play className="w-3 h-3 text-[#fa6348]" />
              </div>
              <p className="text-[10px] text-[#8e8e93] mt-0.5 truncate">{preset.exercises.join(', ')}</p>
            </button>
          ))}
        </div>
      )}

      {/* Rest Timer */}
      {isResting && (
        <div className="p-4 rounded-3xl bg-white border border-[#fa6348]/30 shadow-ios-card flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-[#fa6348]" />
            <span className="text-xs font-bold text-[#111215]">Rest Interval</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-lg font-black text-[#fa6348]">{restSeconds}s</span>
            <button
              onClick={() => setIsResting(false)}
              className="text-xs text-[#8e8e93] hover:text-[#111215]"
            >
              Skip
            </button>
          </div>
        </div>
      )}

      {/* Active Workout Tracker */}
      {currentWorkout ? (
        <div className="ios-card p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#fa6348] uppercase mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fa6348] animate-ping" />
                Live Session
              </div>
              <h3 className="text-sm font-bold text-[#111215]">{currentWorkout.name}</h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-[#8e8e93] block">Volume</span>
                <span className="text-xs font-black text-[#111215]">{currentWorkout.totalVolumeKg} kg</span>
              </div>

              <button
                onClick={finishWorkout}
                className="px-4 py-1.5 rounded-full bg-[#fa6348] text-white font-bold text-xs shadow-coral-glow hover:bg-[#e8492c]"
              >
                Finish ✓
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {currentWorkout.exercises.map((exercise) => (
              <div key={exercise.id} className="p-3.5 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#111215]">{exercise.exerciseName}</span>
                  <button
                    onClick={() => addWorkoutSet(exercise.id)}
                    className="text-[11px] font-bold text-[#fa6348] flex items-center gap-0.5"
                  >
                    <Plus className="w-3 h-3" /> Set
                  </button>
                </div>

                <div className="space-y-1.5">
                  {exercise.sets.map((s) => (
                    <div
                      key={s.id}
                      className={`grid grid-cols-12 gap-2 items-center p-2 rounded-xl border transition-all ${
                        s.completed ? 'bg-white border-[#fa6348]/40 shadow-sm' : 'bg-white border-black/[0.04]'
                      }`}
                    >
                      <div className="col-span-2 text-[11px] font-bold text-[#8e8e93] pl-1">
                        #{s.setNumber}
                      </div>

                      <div className="col-span-4">
                        <input
                          type="number"
                          value={s.weightKg}
                          onChange={(e) => updateWorkoutSet(exercise.id, s.id, Number(e.target.value), s.reps, s.completed)}
                          className="w-full bg-[#f8f9fb] border border-black/[0.06] rounded-lg px-2 py-0.5 text-xs font-bold text-[#111215]"
                        />
                      </div>

                      <div className="col-span-4">
                        <input
                          type="number"
                          value={s.reps}
                          onChange={(e) => updateWorkoutSet(exercise.id, s.id, s.weightKg, Number(e.target.value), s.completed)}
                          className="w-full bg-[#f8f9fb] border border-black/[0.06] rounded-lg px-2 py-0.5 text-xs font-bold text-[#111215]"
                        />
                      </div>

                      <div className="col-span-2 flex justify-center">
                        <button
                          onClick={() => {
                            const newCompleted = !s.completed;
                            updateWorkoutSet(exercise.id, s.id, s.weightKg, s.reps, newCompleted);
                            if (newCompleted) startRestTimer(60);
                          }}
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                            s.completed
                              ? 'bg-[#fa6348] border-[#fa6348] text-white'
                              : 'bg-white border-gray-300 text-transparent'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={cancelWorkout}
              className="text-[11px] text-rose-500 font-bold hover:underline"
            >
              Discard Session
            </button>
          </div>
        </div>
      ) : (
        <div className="ios-card p-5 space-y-3">
          <h3 className="font-bold text-xs text-[#111215]">Workout History</h3>
          <div className="space-y-2">
            {workoutHistory.map((hist) => (
              <div key={hist.id} className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-[#111215]">{hist.name}</h4>
                  <p className="text-[10px] text-[#8e8e93]">
                    {hist.completedAt || hist.date} • {hist.durationMinutes} mins • {hist.totalVolumeKg} kg volume
                  </p>
                </div>
                <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-2 py-0.5 rounded-full">
                  ✓ Done
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
