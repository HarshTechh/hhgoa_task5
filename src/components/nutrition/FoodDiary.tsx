import React from 'react';
import { Trash2, Plus, Camera, Receipt, Mic } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';
import { MealType, FoodLogEntry } from '../../types';

interface FoodDiaryProps {
  onOpenScanner: () => void;
  onOpenBillScanner: () => void;
  onOpenVoiceLogger: () => void;
  onOpenFoodSearch: (mealType?: MealType) => void;
}

export const FoodDiary: React.FC<FoodDiaryProps> = ({
  onOpenScanner,
  onOpenBillScanner,
  onOpenVoiceLogger,
  onOpenFoodSearch
}) => {
  const { foodLogs, removeFoodLog, dailyTargets } = useFitness();

  const mealSlots: { type: MealType; title: string; icon: string; time: string }[] = [
    { type: 'breakfast', title: 'Breakfast', icon: '🍳', time: '08:00 - 10:00 AM' },
    { type: 'lunch', title: 'Lunch', icon: '🍛', time: '01:00 - 02:30 PM' },
    { type: 'dinner', title: 'Dinner', icon: '🍽️', time: '07:30 - 09:30 PM' },
    { type: 'snack', title: 'Snacks', icon: '🍎', time: 'Anytime' }
  ];

  const getMealLogs = (type: MealType) => foodLogs.filter(f => f.mealType === type);

  const getMealTotals = (logs: FoodLogEntry[]) => {
    return {
      calories: logs.reduce((acc, f) => acc + f.calories, 0),
      protein: logs.reduce((acc, f) => acc + f.proteinG, 0),
      carbs: logs.reduce((acc, f) => acc + f.carbsG, 0),
      fat: logs.reduce((acc, f) => acc + f.fatG, 0)
    };
  };

  const totalCalories = foodLogs.reduce((acc, f) => acc + f.calories, 0);
  const totalProtein = Math.round(foodLogs.reduce((acc, f) => acc + f.proteinG, 0));
  const totalCarbs = Math.round(foodLogs.reduce((acc, f) => acc + f.carbsG, 0));

  return (
    <div className="space-y-4 pb-28">
      {/* Top Banner */}
      <div className="ios-card p-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#111215]">Food Diary</h2>
            <p className="text-xs text-[#8e8e93] mt-0.5">
              Logged: <strong className="text-[#111215]">{totalCalories} kcal</strong> • <strong className="text-[#fa6348]">{totalProtein}g protein</strong> • <strong className="text-[#8b5cf6]">{totalCarbs}g carbs</strong>
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenScanner}
              className="p-2 rounded-2xl bg-[#fa6348]/10 text-[#fa6348] hover:bg-[#fa6348]/20 transition-all"
              title="AI Photo Scan"
            >
              <Camera className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenBillScanner}
              className="p-2 rounded-2xl bg-[#06b6d4]/10 text-[#06b6d4] hover:bg-[#06b6d4]/20 transition-all"
              title="Bill OCR"
            >
              <Receipt className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenVoiceLogger}
              className="p-2 rounded-2xl bg-[#8b5cf6]/10 text-[#8b5cf6] hover:bg-[#8b5cf6]/20 transition-all"
              title="Voice Log"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Meal Slots */}
      <div className="space-y-3.5">
        {mealSlots.map((slot) => {
          const logs = getMealLogs(slot.type);
          const totals = getMealTotals(logs);

          return (
            <div key={slot.type} className="ios-card p-4 space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-black/[0.04]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{slot.icon}</span>
                  <div>
                    <h3 className="font-bold text-xs text-[#111215]">{slot.title}</h3>
                    <p className="text-[10px] text-[#8e8e93]">
                      {totals.calories} kcal • {Math.round(totals.protein)}g P • {Math.round(totals.carbs)}g C
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenFoodSearch(slot.type)}
                  className="px-2.5 py-1 rounded-full bg-[#fa6348]/10 text-[#fa6348] hover:bg-[#fa6348]/20 font-bold text-[11px] flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" />
                  <span>Log</span>
                </button>
              </div>

              {logs.length > 0 ? (
                <div className="divide-y divide-black/[0.04]">
                  {logs.map((item) => (
                    <div key={item.id} className="py-2 flex items-center justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-semibold text-xs text-[#111215]">{item.name}</h4>
                          <span className="text-[9px] text-[#8e8e93]">
                            ({item.quantity} × {item.servingUnit})
                          </span>
                        </div>
                        <p className="text-[10px] text-[#8e8e93]">
                          {item.calories} kcal | {item.proteinG}g P | {item.carbsG}g C | {item.fatG}g F
                        </p>
                      </div>

                      <button
                        onClick={() => removeFoodLog(item.id)}
                        className="p-1 text-[#8e8e93] hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-2 text-center text-[11px] text-[#8e8e93]">
                  No foods logged
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
