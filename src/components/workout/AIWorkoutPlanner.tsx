import React, { useState } from 'react';
import { X, Sparkles, Play } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

interface AIWorkoutPlannerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIWorkoutPlanner: React.FC<AIWorkoutPlannerProps> = ({ isOpen, onClose }) => {
  const { startWorkout } = useFitness();
  const [targetSplit, setTargetSplit] = useState<string>('push');
  const [duration] = useState<number>(45);

  if (!isOpen) return null;

  const generatedRoutines: Record<string, { title: string; exercises: string[]; notes: string }> = {
    push: {
      title: 'Hypertrophy Push (Chest, Delts, Triceps)',
      exercises: [
        'Barbell Flat Bench Press (3 sets × 8-10)',
        'Incline Dumbbell Press (3 sets × 10-12)',
        'Dumbbell Lateral Raise (4 sets × 15)',
        'Cable Tricep Pushdown (3 sets × 12-15)'
      ],
      notes: 'Focus on explosive concentric and 2-second controlled lowering.'
    },
    pull: {
      title: 'Power Pull (Back, Rear Delts, Biceps)',
      exercises: [
        'Bent-Over Barbell Row (4 sets × 8)',
        'Wide-Grip Lat Pulldown (3 sets × 10-12)',
        'Rope Cable Face Pulls (3 sets × 15)',
        'Standing Dumbbell Bicep Curl (3 sets × 10)'
      ],
      notes: 'Drive with elbows and retract scapula at peak contraction.'
    },
    legs: {
      title: 'Lower Body Strength & Hypertrophy',
      exercises: [
        'Barbell Back Squat (4 sets × 6-8)',
        '45-Degree Leg Press (3 sets × 12)',
        'Dumbbell Romanian Deadlift (3 sets × 10)',
        'Standing Calf Raise (4 sets × 15)'
      ],
      notes: 'Full depth on squats; maintain neutral spine on Romanian deadlifts.'
    },
    hiit: {
      title: 'High-Intensity Metabolic Conditioning',
      exercises: [
        'Bodyweight Push-Ups (4 sets × 15)',
        'Dumbbell Walking Lunges (3 sets × 20 steps)',
        'Forearm Plank Hold (3 sets × 60 sec)',
        'Incline Treadmill Walk (15 mins interval)'
      ],
      notes: 'Minimal rest (30s) between sets to maximize calorie burn.'
    }
  };

  const currentRoutine = generatedRoutines[targetSplit] || generatedRoutines.push;

  const handleLaunchRoutine = () => {
    const rawNames = currentRoutine.exercises.map(e => e.split(' (')[0]);
    startWorkout(currentRoutine.title, rawNames);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-4xl border border-black/[0.06] overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#fa6348]/10 text-[#fa6348] flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#111215]">AI Workout Routine Planner</h3>
              <p className="text-[11px] text-[#8e8e93]">Custom split generator tailored to your goal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8e8e93] hover:text-[#111215] hover:bg-[#eaebef]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div className="grid grid-cols-4 gap-1.5">
            {[
              { id: 'push', label: 'Push' },
              { id: 'pull', label: 'Pull' },
              { id: 'legs', label: 'Legs' },
              { id: 'hiit', label: 'HIIT' }
            ].map((split) => (
              <button
                key={split.id}
                onClick={() => setTargetSplit(split.id)}
                className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all ${
                  targetSplit === split.id
                    ? 'bg-[#fa6348] border-[#fa6348] text-white shadow-coral-glow'
                    : 'bg-[#f8f9fb] border-black/[0.05] text-[#636366]'
                }`}
              >
                {split.label}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-3xl bg-[#f8f9fb] border border-black/[0.04] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-[#111215]">{currentRoutine.title}</h4>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#fa6348]/10 text-[#fa6348] font-bold">
                ~{duration} mins
              </span>
            </div>

            <div className="space-y-1.5 pt-1">
              {currentRoutine.exercises.map((ex, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-[#111215]">
                  <div className="w-4 h-4 rounded-full bg-white border border-black/[0.06] flex items-center justify-center text-[9px] font-bold text-[#fa6348]">
                    {idx + 1}
                  </div>
                  <span>{ex}</span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8e8e93] italic pt-1 border-t border-black/[0.04]">
              💡 {currentRoutine.notes}
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-black/[0.05] flex items-center justify-between bg-[#f8f9fb]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#8e8e93] hover:text-[#111215]"
          >
            Cancel
          </button>

          <button
            onClick={handleLaunchRoutine}
            className="flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#fa6348] text-white font-extrabold text-xs shadow-coral-glow hover:bg-[#e8492c] transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Launch Workout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
