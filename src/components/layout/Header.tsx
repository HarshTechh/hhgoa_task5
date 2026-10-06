import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Header: React.FC = () => {
  const { userProfile, streakData, setActiveTab } = useFitness();

  return (
    <header className="px-2 pt-3 pb-1 flex items-center justify-between max-w-md mx-auto">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-[#fa6348]/10 text-[#fa6348] border border-[#fa6348]/20 flex items-center justify-center font-bold text-xs">
          {userProfile.name.charAt(0)}
        </div>
        <div>
          <h2 className="text-xs font-bold text-[#111215] tracking-tight">
            {userProfile.name}
          </h2>
          <p className="text-[10px] text-[#8e8e93]">
            {userProfile.primaryGoal.replace('_', ' ')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Streak Indicator */}
        <div
          onClick={() => setActiveTab('progress')}
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fa6348]/10 text-[#fa6348] text-xs font-bold cursor-pointer hover:bg-[#fa6348]/20 transition-all"
        >
          <Flame className="w-3.5 h-3.5 fill-[#fa6348]" />
          <span>{streakData.currentStreak}d</span>
        </div>

        {/* AI Coach Fast Button */}
        <button
          onClick={() => setActiveTab('coach')}
          className="p-1.5 rounded-full bg-white border border-black/[0.05] text-[#8e8e93] hover:text-[#111215] shadow-sm transition-all"
          title="AI Coach"
        >
          <Sparkles className="w-4 h-4 text-[#fa6348]" />
        </button>
      </div>
    </header>
  );
};
