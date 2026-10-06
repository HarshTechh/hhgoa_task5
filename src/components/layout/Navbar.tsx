import React from 'react';
import {
  Calendar,
  Home,
  User,
  UtensilsCrossed,
  Dumbbell,
  Sparkles,
  Settings,
  Flame
} from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab } = useFitness();

  return (
    <>
      {/* Desktop Top Header / Nav Bar */}
      <nav aria-label="Main Navigation" className="hidden lg:flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-black/[0.05]">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => setActiveTab('dashboard')}
        >
          <div className="w-9 h-9 rounded-2xl bg-[#fa6348] flex items-center justify-center text-white font-black shadow-coral-glow">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base text-[#111215] tracking-tight">FITENT</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-[#fa6348]/10 text-[#fa6348]">OS</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-[#eaebef]/70 p-1 rounded-full">
          {[
            { id: 'dashboard', label: 'Home' },
            { id: 'nutrition', label: 'Nutrition' },
            { id: 'workout', label: 'Workouts' },
            { id: 'activity', label: 'Activity' },
            { id: 'progress', label: 'Progress' },
            { id: 'coach', label: 'AI Coach' },
            { id: 'settings', label: 'Profile' }
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-[#111215] font-bold shadow-sm'
                    : 'text-[#636366] hover:text-[#111215]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Bottom Pill Dock from Screenshot */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white rounded-full px-6 py-2 shadow-ios-dock border border-black/[0.05] flex items-center gap-8">
          {/* 1. Calendar Tab */}
          <button
            id="dock-btn-calendar"
            onClick={() => setActiveTab('progress')}
            className={`p-2 transition-all ${
              activeTab === 'progress' ? 'text-[#111215]' : 'text-[#8e8e93] hover:text-[#111215]'
            }`}
            title="Calendar & Progress"
          >
            <Calendar className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* 2. Center Highlighted Coral Home Button */}
          <button
            id="dock-btn-home"
            onClick={() => setActiveTab('dashboard')}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
              activeTab === 'dashboard'
                ? 'bg-[#fa6348] text-white shadow-coral-glow scale-105'
                : 'bg-[#fa6348]/90 text-white hover:bg-[#fa6348]'
            }`}
            title="Home Dashboard"
          >
            <Home className="w-5 h-5 stroke-[2.4]" />
          </button>

          {/* 3. Profile / Settings Tab */}
          <button
            id="dock-btn-profile"
            onClick={() => setActiveTab('settings')}
            className={`p-2 transition-all ${
              activeTab === 'settings' ? 'text-[#111215]' : 'text-[#8e8e93] hover:text-[#111215]'
            }`}
            title="Profile & Settings"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>
      </div>
    </>
  );
};
