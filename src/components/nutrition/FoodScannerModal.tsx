import React, { useState } from 'react';
import { X, Sparkles, Camera, CheckCircle2, Sliders, Trash2 } from 'lucide-react';
import { SAMPLE_FOOD_SCENARIOS, SampleFoodPhotoScenario } from '../../data/mockScenarios';
import { AIDetectedItem, MealType } from '../../types';
import { useFitness } from '../../context/FitnessContext';

interface FoodScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

export const FoodScannerModal: React.FC<FoodScannerModalProps> = ({
  isOpen,
  onClose,
  defaultMealType = 'lunch'
}) => {
  const { addFoodLog, triggerCelebration } = useFitness();
  const [selectedScenario, setSelectedScenario] = useState<SampleFoodPhotoScenario>(SAMPLE_FOOD_SCENARIOS[0]);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analyzed, setAnalyzed] = useState<boolean>(false);
  const [targetMeal, setTargetMeal] = useState<MealType>(defaultMealType);
  const [detectedItems, setDetectedItems] = useState<AIDetectedItem[]>(SAMPLE_FOOD_SCENARIOS[0].detectedItems);

  if (!isOpen) return null;

  const handleSelectScenario = (sc: SampleFoodPhotoScenario) => {
    setSelectedScenario(sc);
    setIsScanning(true);
    setAnalyzed(false);
    setTimeout(() => {
      setDetectedItems(JSON.parse(JSON.stringify(sc.detectedItems)));
      setIsScanning(false);
      setAnalyzed(true);
    }, 1200);
  };

  const handleUpdateQuantity = (itemId: string, multiplier: number) => {
    setDetectedItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      const baseFood = item.matchedFood;
      const newQty = Math.max(0.5, Number((item.quantity + multiplier).toFixed(1)));
      const baseCalories = baseFood ? baseFood.calories : item.estimatedCalories / item.quantity;
      const baseProtein = baseFood ? baseFood.proteinG : item.estimatedProteinG / item.quantity;
      const baseCarbs = baseFood ? baseFood.carbsG : item.estimatedCarbsG / item.quantity;
      const baseFat = baseFood ? baseFood.fatG : item.estimatedFatG / item.quantity;
      const baseFiber = baseFood ? baseFood.fiberG : item.estimatedFiberG / item.quantity;

      return {
        ...item,
        quantity: newQty,
        estimatedCalories: Math.round(baseCalories * newQty),
        estimatedProteinG: Number((baseProtein * newQty).toFixed(1)),
        estimatedCarbsG: Number((baseCarbs * newQty).toFixed(1)),
        estimatedFatG: Number((baseFat * newQty).toFixed(1)),
        estimatedFiberG: Number((baseFiber * newQty).toFixed(1))
      };
    }));
  };

  const handleRemoveItem = (itemId: string) => {
    setDetectedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const totalCalories = detectedItems.reduce((acc, it) => acc + it.estimatedCalories, 0);
  const totalProtein = detectedItems.reduce((acc, it) => acc + it.estimatedProteinG, 0);

  const handleConfirmAndLog = () => {
    detectedItems.forEach(item => {
      addFoodLog({
        mealType: targetMeal,
        foodId: item.matchedFood?.id,
        name: item.detectedName,
        quantity: item.quantity,
        servingUnit: item.servingUnit,
        weightG: item.estimatedWeightG * item.quantity,
        calories: item.estimatedCalories,
        proteinG: item.estimatedProteinG,
        carbsG: item.estimatedCarbsG,
        fatG: item.estimatedFatG,
        fiberG: item.estimatedFiberG,
        source: 'ai_photo_estimate',
        confidence: item.confidence,
        photoUrl: selectedScenario.imageUrl
      });
    });

    triggerCelebration();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-xl bg-white rounded-4xl border border-black/[0.06] max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-black/[0.05] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#fa6348]/10 text-[#fa6348] flex items-center justify-center">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#111215]">AI Food Photo Scanner</h3>
              <p className="text-[11px] text-[#8e8e93]">Vision recognition with portion estimation</p>
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
          {/* Sample Photos */}
          <div>
            <label className="block text-xs font-semibold text-[#111215] mb-1.5">Sample Meals</label>
            <div className="grid grid-cols-3 gap-2">
              {SAMPLE_FOOD_SCENARIOS.map((sc) => (
                <div
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-1.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedScenario.id === sc.id
                      ? 'border-[#fa6348] ring-2 ring-[#fa6348]/20 bg-[#fa6348]/5'
                      : 'border-black/[0.06] hover:border-gray-300'
                  }`}
                >
                  <img
                    src={sc.imageUrl}
                    alt={sc.title}
                    className="w-full h-16 object-cover rounded-xl mb-1"
                  />
                  <h4 className="text-[10px] font-bold text-[#111215] truncate">{sc.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Photo Preview with Laser Line */}
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.06] h-44 bg-[#f8f9fb] flex items-center justify-center">
            <img
              src={selectedScenario.imageUrl}
              alt="Meal Preview"
              className="w-full h-full object-cover"
            />
            {isScanning && (
              <div className="absolute inset-0 bg-[#fa6348]/10 flex flex-col justify-center">
                <div className="w-full h-1 bg-[#fa6348] shadow-coral-glow animate-scan" />
              </div>
            )}
          </div>

          {/* Detected Items */}
          {!isScanning && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#111215]">
                  AI Identified ({detectedItems.length})
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-[#8e8e93]">Meal:</span>
                  <select
                    value={targetMeal}
                    onChange={(e) => setTargetMeal(e.target.value as MealType)}
                    className="px-2 py-1 rounded-xl bg-[#f8f9fb] border border-black/[0.06] text-xs font-bold text-[#111215]"
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {detectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] flex items-center justify-between gap-2"
                  >
                    <div>
                      <h4 className="text-xs font-bold text-[#111215]">{item.detectedName}</h4>
                      <p className="text-[10px] text-[#8e8e93]">
                        {item.estimatedCalories} kcal • {item.estimatedProteinG}g protein
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center bg-white rounded-xl border border-black/[0.06] px-1 py-0.5">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, -0.5)}
                          className="w-5 h-5 text-xs text-[#8e8e93] hover:text-[#111215]"
                        >
                          -
                        </button>
                        <span className="px-1.5 text-xs font-bold text-[#111215]">{item.quantity}</span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, 0.5)}
                          className="w-5 h-5 text-xs text-[#8e8e93] hover:text-[#111215]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-1 text-[#8e8e93] hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/[0.05] flex items-center justify-between bg-[#f8f9fb]">
          <div className="text-xs font-black text-[#111215]">
            Total: {totalCalories} kcal • {totalProtein}g protein
          </div>

          <button
            onClick={handleConfirmAndLog}
            disabled={isScanning || detectedItems.length === 0}
            className="px-5 py-2 rounded-full bg-[#fa6348] text-white font-bold text-xs shadow-coral-glow hover:bg-[#e8492c] transition-all disabled:opacity-50"
          >
            Confirm & Log
          </button>
        </div>
      </div>
    </div>
  );
};
