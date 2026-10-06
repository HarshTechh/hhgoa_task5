import React, { useState } from 'react';
import { X, Mic, CheckCircle2 } from 'lucide-react';
import { MealType } from '../../types';
import { useFitness } from '../../context/FitnessContext';

interface VoiceLoggerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

export const VoiceLoggerModal: React.FC<VoiceLoggerModalProps> = ({
  isOpen,
  onClose,
  defaultMealType = 'breakfast'
}) => {
  const { addFoodLog, triggerCelebration } = useFitness();
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('I had 2 boiled eggs and 1 bowl of oatmeal with milk');
  const [targetMeal, setTargetMeal] = useState<MealType>(defaultMealType);
  const [parsedItems, setParsedItems] = useState<{ name: string; quantity: number; unit: string; calories: number; protein: number; carbs: number; fat: number }[]>([
    { name: 'Boiled Egg (Large)', quantity: 2, unit: 'whole eggs', calories: 148, protein: 12.6, carbs: 0.8, fat: 10.0 },
    { name: 'Rolled Oats with Milk & Almonds', quantity: 1, unit: 'bowl (220g)', calories: 290, protein: 12.5, carbs: 42.0, fat: 8.0 }
  ]);

  if (!isOpen) return null;

  const handleSimulateListen = (sampleText: string) => {
    setIsListening(true);
    setTimeout(() => {
      setTranscript(sampleText);
      setIsListening(false);
      if (sampleText.toLowerCase().includes('roti') || sampleText.toLowerCase().includes('paneer')) {
        setParsedItems([
          { name: 'Whole Wheat Roti / Chapati', quantity: 2, unit: 'medium', calories: 220, protein: 7.0, carbs: 44.0, fat: 2.0 },
          { name: 'Paneer Bhurji (Scrambled Paneer)', quantity: 1, unit: 'bowl (150g)', calories: 275, protein: 17.5, carbs: 6.0, fat: 20.0 }
        ]);
      } else if (sampleText.toLowerCase().includes('biryani')) {
        setParsedItems([
          { name: 'Chicken Dum Biryani', quantity: 1, unit: 'plate (350g)', calories: 560, protein: 34.0, carbs: 68.0, fat: 17.0 },
          { name: 'Coca Cola Regular Can', quantity: 1, unit: 'can (330ml)', calories: 140, protein: 0.0, carbs: 35.0, fat: 0.0 }
        ]);
      } else {
        setParsedItems([
          { name: 'Boiled Egg (Large)', quantity: 2, unit: 'whole eggs', calories: 148, protein: 12.6, carbs: 0.8, fat: 10.0 },
          { name: 'Rolled Oats with Milk & Almonds', quantity: 1, unit: 'bowl (220g)', calories: 290, protein: 12.5, carbs: 42.0, fat: 8.0 }
        ]);
      }
    }, 1000);
  };

  const handleConfirmVoice = () => {
    parsedItems.forEach(item => {
      addFoodLog({
        mealType: targetMeal,
        name: item.name,
        quantity: item.quantity,
        servingUnit: item.unit,
        weightG: item.quantity * 100,
        calories: item.calories,
        proteinG: item.protein,
        carbsG: item.carbs,
        fatG: item.fat,
        fiberG: 2.0,
        source: 'voice_input',
        confidence: 'high'
      });
    });

    triggerCelebration();
    onClose();
  };

  const totalCalories = parsedItems.reduce((acc, i) => acc + i.calories, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-4xl border border-black/[0.06] overflow-hidden shadow-2xl">
        <div className="p-5 border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#111215]">Voice Food Logger</h3>
              <p className="text-[11px] text-[#8e8e93]">Speak naturally to log meals in seconds</p>
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
          <div className="flex flex-col items-center justify-center py-2">
            <button
              onClick={() => handleSimulateListen("I had 2 rotis and 1 bowl of paneer bhurji for dinner")}
              className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? 'bg-rose-500 text-white animate-ping'
                  : 'bg-[#8b5cf6] text-white shadow-lg hover:scale-105 active:scale-95'
              }`}
            >
              <Mic className="w-6 h-6" />
            </button>
            <p className="text-xs font-bold text-[#111215] mt-2">
              {isListening ? 'Listening...' : 'Tap to speak'}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 justify-center">
            {[
              "I had 2 boiled eggs and oatmeal",
              "2 rotis and paneer bhurji",
              "1 chicken biryani and a coke"
            ].map((preset) => (
              <button
                key={preset}
                onClick={() => handleSimulateListen(preset)}
                className="px-2.5 py-1 rounded-full bg-[#f8f9fb] border border-black/[0.05] text-[10px] text-[#636366] hover:text-[#111215]"
              >
                "{preset}"
              </button>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04]">
            <span className="text-[10px] font-bold text-[#8b5cf6] uppercase">Transcript</span>
            <p className="text-xs text-[#111215] font-medium mt-0.5">"{transcript}"</p>
          </div>

          <div className="space-y-1.5">
            {parsedItems.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-[#f8f9fb] border border-black/[0.04] flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#111215]">{item.name}</h4>
                  <p className="text-[10px] text-[#8e8e93]">{item.quantity} × {item.unit}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-[#111215]">{item.calories} kcal</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-black/[0.05] flex items-center justify-between bg-[#f8f9fb]">
          <span className="text-xs font-bold text-[#111215]">Total: {totalCalories} kcal</span>
          <button
            onClick={handleConfirmVoice}
            className="px-5 py-2 rounded-full bg-[#8b5cf6] text-white font-bold text-xs shadow-sm hover:bg-[#7c3aed] transition-all"
          >
            Confirm & Log
          </button>
        </div>
      </div>
    </div>
  );
};
