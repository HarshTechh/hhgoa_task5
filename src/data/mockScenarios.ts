import { AIDetectedItem, AIBillItem } from '../types';
import { VERIFIED_FOOD_DATABASE } from './foodDatabase';

export interface SampleFoodPhotoScenario {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  detectedItems: AIDetectedItem[];
}

export interface SampleBillScenario {
  id: string;
  restaurantName: string;
  billDate: string;
  billTotal: number;
  extractedItems: AIBillItem[];
}

export const SAMPLE_FOOD_SCENARIOS: SampleFoodPhotoScenario[] = [
  {
    id: 'thali_lunch',
    title: 'Traditional Indian Thali (Lunch)',
    category: 'Indian Home Meal',
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?w=800&auto=format&fit=crop&q=80',
    detectedItems: [
      {
        id: 'det_1',
        detectedName: '2 Whole Wheat Roti',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_roti'),
        quantity: 2,
        servingUnit: 'roti (approx 80g)',
        estimatedWeightG: 80,
        estimatedCalories: 220,
        estimatedProteinG: 7.0,
        estimatedCarbsG: 44.0,
        estimatedFatG: 2.0,
        estimatedFiberG: 6.4,
        confidence: 'high',
        confidenceScore: 0.94,
        portionConfidence: 'high',
        boundingDetails: 'Circular flatbreads on left side of plate'
      },
      {
        id: 'det_2',
        detectedName: 'Yellow Dal Tadka',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_dal_tadka'),
        quantity: 1,
        servingUnit: '1 katori (180g)',
        estimatedWeightG: 180,
        estimatedCalories: 150,
        estimatedProteinG: 8.5,
        estimatedCarbsG: 20.0,
        estimatedFatG: 4.2,
        estimatedFiberG: 4.5,
        confidence: 'high',
        confidenceScore: 0.91,
        portionConfidence: 'medium',
        boundingDetails: 'Golden lentil soup in top stainless steel bowl'
      },
      {
        id: 'det_3',
        detectedName: 'Methi Bhaji (Fenugreek Sabzi)',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_methi_bhaji'),
        quantity: 1,
        servingUnit: '1 small bowl (150g)',
        estimatedWeightG: 150,
        estimatedCalories: 125,
        estimatedProteinG: 4.2,
        estimatedCarbsG: 12.0,
        estimatedFatG: 6.5,
        estimatedFiberG: 4.8,
        confidence: 'medium',
        confidenceScore: 0.82,
        portionConfidence: 'medium',
        boundingDetails: 'Cooked leafy greens in right bowl'
      },
      {
        id: 'det_4',
        detectedName: 'Fresh Garden Salad',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_green_salad'),
        quantity: 1,
        servingUnit: '1 portion (150g)',
        estimatedWeightG: 150,
        estimatedCalories: 35,
        estimatedProteinG: 1.5,
        estimatedCarbsG: 7.0,
        estimatedFatG: 0.3,
        estimatedFiberG: 2.6,
        confidence: 'high',
        confidenceScore: 0.96,
        portionConfidence: 'high',
        boundingDetails: 'Sliced cucumbers, carrots, and onions'
      }
    ]
  },
  {
    id: 'high_protein_gym',
    title: 'High-Protein Fitness Meal',
    category: 'Muscle Building',
    imageUrl: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&auto=format&fit=crop&q=80',
    detectedItems: [
      {
        id: 'det_hp_1',
        detectedName: 'Grilled Chicken Breast',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_chicken_breast_grilled'),
        quantity: 1,
        servingUnit: '150g breast fillet',
        estimatedWeightG: 150,
        estimatedCalories: 245,
        estimatedProteinG: 46.0,
        estimatedCarbsG: 0.0,
        estimatedFatG: 5.5,
        estimatedFiberG: 0.0,
        confidence: 'high',
        confidenceScore: 0.97,
        portionConfidence: 'high',
        boundingDetails: 'Seared seasoned chicken breast center plate'
      },
      {
        id: 'det_hp_2',
        detectedName: 'Steamed Basmati Rice',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_steamed_rice'),
        quantity: 1,
        servingUnit: '1 bowl (150g)',
        estimatedWeightG: 150,
        estimatedCalories: 195,
        estimatedProteinG: 4.1,
        estimatedCarbsG: 43.0,
        estimatedFatG: 0.5,
        estimatedFiberG: 0.9,
        confidence: 'high',
        confidenceScore: 0.93,
        portionConfidence: 'high',
        boundingDetails: 'White rice scoop'
      }
    ]
  },
  {
    id: 'south_indian_breakfast',
    title: 'South Indian Breakfast (Idli + Sambar)',
    category: 'Breakfast',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
    detectedItems: [
      {
        id: 'det_si_1',
        detectedName: 'Steamed Idli (2 pcs)',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_idli'),
        quantity: 1,
        servingUnit: '2 medium idlis (100g)',
        estimatedWeightG: 100,
        estimatedCalories: 140,
        estimatedProteinG: 4.2,
        estimatedCarbsG: 29.0,
        estimatedFatG: 0.5,
        estimatedFiberG: 1.8,
        confidence: 'high',
        confidenceScore: 0.96,
        portionConfidence: 'high'
      },
      {
        id: 'det_si_2',
        detectedName: 'Vegetable Sambar',
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_sambar'),
        quantity: 1,
        servingUnit: '1 bowl (180g)',
        estimatedWeightG: 180,
        estimatedCalories: 110,
        estimatedProteinG: 4.8,
        estimatedCarbsG: 18.0,
        estimatedFatG: 2.5,
        estimatedFiberG: 4.0,
        confidence: 'high',
        confidenceScore: 0.92,
        portionConfidence: 'medium'
      }
    ]
  }
];

export const SAMPLE_BILL_SCENARIOS: SampleBillScenario[] = [
  {
    id: 'punjabi_dhaba_bill',
    restaurantName: 'Grand Punjab Spice & Grill',
    billDate: 'Today, 8:15 PM',
    billTotal: 865,
    extractedItems: [
      {
        id: 'bill_item_1',
        rawText: '1x CHICKEN BIRYANI HYDERABADI',
        extractedName: 'Chicken Dum Biryani',
        quantity: 1,
        unitPrice: 380,
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_chicken_biryani'),
        estimatedCalories: 560,
        estimatedProteinG: 34.0,
        estimatedCarbsG: 68.0,
        estimatedFatG: 17.0,
        estimatedFiberG: 3.8,
        confidence: 'high',
        selected: true
      },
      {
        id: 'bill_item_2',
        rawText: '2x BUTTER NAAN TANDOOR',
        extractedName: 'Butter Naan',
        quantity: 2,
        unitPrice: 70,
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_butter_naan'),
        estimatedCalories: 580,
        estimatedProteinG: 15.0,
        estimatedCarbsG: 90.0,
        estimatedFatG: 19.0,
        estimatedFiberG: 4.2,
        confidence: 'high',
        selected: true
      },
      {
        id: 'bill_item_3',
        rawText: '1x PANEER TIKKA DRY',
        extractedName: 'Grilled Paneer Tikka (Tandoori)',
        quantity: 1,
        unitPrice: 280,
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_paneer_tikka'),
        estimatedCalories: 285,
        estimatedProteinG: 19.5,
        estimatedCarbsG: 8.0,
        estimatedFatG: 19.0,
        estimatedFiberG: 2.2,
        confidence: 'high',
        selected: true
      },
      {
        id: 'bill_item_4',
        rawText: '1x COCA COLA CAN 330ML',
        extractedName: 'Coca Cola Regular Can',
        quantity: 1,
        unitPrice: 65,
        matchedFood: VERIFIED_FOOD_DATABASE.find(f => f.id === 'food_coke_can'),
        estimatedCalories: 140,
        estimatedProteinG: 0.0,
        estimatedCarbsG: 35.0,
        estimatedFatG: 0.0,
        estimatedFiberG: 0.0,
        confidence: 'high',
        selected: true
      }
    ]
  }
];
