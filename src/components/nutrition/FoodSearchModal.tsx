import React, { useState } from 'react';
import { X, Search, Plus, Filter } from 'lucide-react';
import { FoodItem, MealType } from '../../types';
import { searchFoodDatabase } from '../../data/foodDatabase';
import { useFitness } from '../../context/FitnessContext';

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMealType?: MealType;
}

export const FoodSearchModal: React.FC<FoodSearchModalProps> = ({
  isOpen,
  onClose,
  defaultMealType = 'lunch'
}) => {
  const { addFoodLog, triggerCelebration } = useFitness();
  const [query, setQuery] = useState('');
  const [dietFilter, setDietFilter] = useState<string>('all');
  const [targetMeal, setTargetMeal] = useState<MealType>(defaultMealType);
  const [quantity, setQuantity] = useState<number>(1);

  if (!isOpen) return null;

  const searchResults = searchFoodDatabase(query, dietFilter);

  const handleLogFood = (food: FoodItem) => {
    addFoodLog({
      mealType: targetMeal,
      foodId: food.id,
      name: food.name,
      quantity,
      servingUnit: food.servingUnit,
      weightG: food.servingWeightG * quantity,
      calories: Math.round(food.calories * quantity),
      proteinG: Number((food.proteinG * quantity).toFixed(1)),
      carbsG: Number((food.carbsG * quantity).toFixed(1)),
      fatG: Number((food.fatG * quantity).toFixed(1)),
      fiberG: Number((food.fiberG * quantity).toFixed(1)),
      source: 'verified_db',
      confidence: 'high'
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
            <div className="w-9 h-9 rounded-2xl bg-[#fa6348]/10 text-[#fa6348] flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-[#111215]">Search Food Database</h3>
              <p className="text-[11px] text-[#8e8e93]">250+ verified foods with accurate macros</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#8e8e93] hover:text-[#111215] hover:bg-[#eaebef]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input & Filters */}
        <div className="p-4 space-y-3 border-b border-black/[0.05]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8e8e93] absolute left-3.5 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Roti, Paneer, Chicken Biryani, Eggs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-2xl text-xs font-medium text-[#111215] focus:outline-none focus:border-[#fa6348]"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1">
              {['all', 'vegetarian', 'non_vegetarian', 'vegan'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDietFilter(d)}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold capitalize transition-all border ${
                    dietFilter === d
                      ? 'bg-[#fa6348] border-[#fa6348] text-white shadow-sm'
                      : 'bg-[#f8f9fb] border-black/[0.05] text-[#636366]'
                  }`}
                >
                  {d.replace('_', ' ')}
                </button>
              ))}
            </div>

            <select
              value={targetMeal}
              onChange={(e) => setTargetMeal(e.target.value as MealType)}
              className="px-2.5 py-1 rounded-xl bg-[#f8f9fb] border border-black/[0.06] text-xs font-bold text-[#111215]"
            >
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-2 flex-1">
          {searchResults.map((food) => (
            <div
              key={food.id}
              className="p-3 rounded-2xl bg-[#f8f9fb] border border-black/[0.04] flex items-center justify-between gap-2 hover:border-gray-300 transition-all"
            >
              <div>
                <h4 className="text-xs font-bold text-[#111215]">{food.name}</h4>
                <p className="text-[10px] text-[#8e8e93]">
                  {food.calories} kcal • {food.proteinG}g P • {food.carbsG}g C • {food.fatG}g F <span className="text-gray-400 font-mono">({food.servingUnit})</span>
                </p>
              </div>

              <button
                onClick={() => handleLogFood(food)}
                className="px-3 py-1.5 rounded-full bg-[#fa6348] text-white font-bold text-xs shadow-coral-glow hover:bg-[#e8492c] transition-all flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
