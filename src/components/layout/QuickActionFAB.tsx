import React, { useState } from 'react';
import {
  Plus,
  Camera,
  Receipt,
  Mic,
  Search,
  Dumbbell,
  Droplets,
  X
} from 'lucide-react';

interface QuickActionFABProps {
  onOpenFoodScanner: () => void;
  onOpenBillScanner: () => void;
  onOpenVoiceLogger: () => void;
  onOpenFoodSearch: () => void;
  onOpenWorkout: () => void;
  onQuickWater: () => void;
}

export const QuickActionFAB: React.FC<QuickActionFABProps> = ({
  onOpenFoodScanner,
  onOpenBillScanner,
  onOpenVoiceLogger,
  onOpenFoodSearch,
  onOpenWorkout,
  onQuickWater
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-40">
      {/* Floating expanded menu */}
      {isOpen && (
        <div className="flex flex-col items-end gap-2 mb-3 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <button
            onClick={() => { setIsOpen(false); onOpenFoodScanner(); }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-black/[0.06] shadow-ios-card hover:bg-[#f8f9fb] transition-all scale-100 hover:scale-105"
          >
            <span className="text-xs font-bold text-[#111215]">📸 AI Food Scanner</span>
            <div className="w-7 h-7 rounded-xl bg-[#fa6348]/10 flex items-center justify-center text-[#fa6348]">
              <Camera className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            onClick={() => { setIsOpen(false); onOpenBillScanner(); }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-black/[0.06] shadow-ios-card hover:bg-[#f8f9fb] transition-all scale-100 hover:scale-105"
          >
            <span className="text-xs font-bold text-[#111215]">🧾 Scan Bill OCR</span>
            <div className="w-7 h-7 rounded-xl bg-[#06b6d4]/10 flex items-center justify-center text-[#06b6d4]">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            onClick={() => { setIsOpen(false); onOpenVoiceLogger(); }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-black/[0.06] shadow-ios-card hover:bg-[#f8f9fb] transition-all scale-100 hover:scale-105"
          >
            <span className="text-xs font-bold text-[#111215]">🎤 Voice Log</span>
            <div className="w-7 h-7 rounded-xl bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6]">
              <Mic className="w-3.5 h-3.5" />
            </div>
          </button>

          <button
            onClick={() => { setIsOpen(false); onOpenFoodSearch(); }}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white border border-black/[0.06] shadow-ios-card hover:bg-[#f8f9fb] transition-all scale-100 hover:scale-105"
          >
            <span className="text-xs font-bold text-[#111215]">🔍 Food Database</span>
            <div className="w-7 h-7 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
              <Search className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      )}

      {/* Main trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-coral-glow transition-all duration-300 ${
          isOpen
            ? 'bg-black text-white rotate-90'
            : 'bg-[#fa6348] text-white hover:scale-105 active:scale-95'
        }`}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-6 h-6 stroke-[2.5]" />}
      </button>
    </div>
  );
};
