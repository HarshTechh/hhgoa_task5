import React, { useState } from 'react';
import { X, Receipt, Check, CheckCircle2 } from 'lucide-react';
import { SAMPLE_BILL_SCENARIOS, SampleBillScenario } from '../../data/mockScenarios';
import { AIBillItem, MealType } from '../../types';
import { useFitness } from '../../context/FitnessContext';

interface BillScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

export const BillScannerModal: React.FC<BillScannerModalProps> = ({
  isOpen,
  onClose,
  defaultMealType = 'dinner'
}) => {
  const { addFoodLog, triggerCelebration } = useFitness();
  const [billScenario] = useState<SampleBillScenario>(SAMPLE_BILL_SCENARIOS[0]);
  const [targetMeal, setTargetMeal] = useState<MealType>(defaultMealType);
  const [items, setItems] = useState<AIBillItem[]>(SAMPLE_BILL_SCENARIOS[0].extractedItems);

  if (!isOpen) return null;

  const handleToggleItem = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;
      const newQty = Math.max(1, item.quantity + delta);
      const ratio = newQty / item.quantity;
      return {
        ...item,
        quantity: newQty,
        estimatedCalories: Math.round(item.estimatedCalories * ratio),
        estimatedProteinG: Number((item.estimatedProteinG * ratio).toFixed(1)),
        estimatedCarbsG: Number((item.estimatedCarbsG * ratio).toFixed(1)),
        estimatedFatG: Number((item.estimatedFatG * ratio).toFixed(1)),
        estimatedFiberG: Number((item.estimatedFiberG * ratio).toFixed(1))
      };
    }));
  };

  const selectedItems = items.filter(i => i.selected);
  const totalCalories = selectedItems.reduce((acc, i) => acc + i.estimatedCalories, 0);
  const totalProtein = selectedItems.reduce((acc, i) => acc + i.estimatedProteinG, 0);

  const handleConfirmBill = () => {
    selectedItems.forEach(item => {
      addFoodLog({
        mealType: targetMeal,
        foodId: item.matchedFood?.id,
        name: item.extractedName,
        quantity: item.quantity,
        servingUnit: `${item.quantity} serving`,
        weightG: item.quantity * 150,
        calories: item.estimatedCalories,
        proteinG: item.estimatedProteinG,
        carbsG: item.estimatedCarbsG,
        fatG: item.estimatedFatG,
        fiberG: item.estimatedFiberG,
        source: 'ai_bill_ocr',
        confidence: item.confidence
      });
    });

    triggerCelebration();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white rounded-4xl border border-black/[0.06] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#06b6d4]/10 text-[#06b6d4] flex items-center justify-center">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#111215]">Restaurant Bill OCR Scanner</h3>
              <p className="text-[11px] text-[#8e8e93]">Item extraction from receipt bill</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8e8e93] hover:text-[#111215] hover:bg-[#eaebef]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          <div className="p-3.5 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#06b6d4] uppercase">Detected Receipt</span>
              <h4 className="text-xs font-bold text-[#111215] mt-0.5">{billScenario.restaurantName}</h4>
              <p className="text-[10px] text-[#8e8e93]">{billScenario.billDate} • Total ₹{billScenario.billTotal}</p>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#8e8e93]">Meal:</span>
              <select
                value={targetMeal}
                onChange={(e) => setTargetMeal(e.target.value as MealType)}
                className="px-2 py-1 rounded-xl bg-white border border-black/[0.06] text-xs font-bold text-[#111215]"
              >
                <option value="dinner">Dinner</option>
                <option value="lunch">Lunch</option>
                <option value="breakfast">Breakfast</option>
                <option value="snack">Snack</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-2 ${
                  item.selected ? 'bg-[#f8f9fb] border-[#06b6d4]/40' : 'bg-white border-black/[0.04] opacity-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    onClick={() => handleToggleItem(item.id)}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center cursor-pointer ${
                      item.selected ? 'bg-[#06b6d4] border-[#06b6d4] text-white' : 'border-gray-300 bg-white'
                    }`}
                  >
                    {item.selected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-[#111215]">{item.extractedName}</h4>
                    <p className="text-[10px] text-[#8e8e93]">
                      {item.estimatedCalories} kcal • {item.estimatedProteinG}g protein
                    </p>
                  </div>
                </div>

                {item.selected && (
                  <div className="flex items-center bg-white rounded-xl border border-black/[0.06] px-1 py-0.5">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="w-5 h-5 text-xs text-[#8e8e93] hover:text-[#111215]"
                    >
                      -
                    </button>
                    <span className="px-1.5 text-xs font-bold text-[#111215]">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="w-5 h-5 text-xs text-[#8e8e93] hover:text-[#111215]"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/[0.05] flex items-center justify-between bg-[#f8f9fb]">
          <div className="text-xs font-black text-[#111215]">
            Total: {totalCalories} kcal • {totalProtein}g protein
          </div>

          <button
            onClick={handleConfirmBill}
            disabled={selectedItems.length === 0}
            className="px-5 py-2 rounded-full bg-[#06b6d4] text-white font-bold text-xs shadow-sm hover:bg-[#0891b2] transition-all disabled:opacity-50"
          >
            Log Selected Items
          </button>
        </div>
      </div>
    </div>
  );
};
