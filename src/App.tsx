import React, { useState } from 'react';
import { useFitness, FitnessProvider } from './context/FitnessContext';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Navbar } from './components/layout/Navbar';
import { Header } from './components/layout/Header';
import { QuickActionFAB } from './components/layout/QuickActionFAB';
import { DashboardView } from './components/dashboard/DashboardView';
import { FoodDiary } from './components/nutrition/FoodDiary';
import { WorkoutTracker } from './components/workout/WorkoutTracker';
import { ActivityView } from './components/activity/ActivityView';
import { ProgressHub } from './components/analytics/ProgressHub';
import { AICoachDrawer } from './components/coach/AICoachDrawer';
import { SettingsView } from './components/settings/SettingsView';

// Modals
import { FoodScannerModal } from './components/nutrition/FoodScannerModal';
import { BillScannerModal } from './components/nutrition/BillScannerModal';
import { VoiceLoggerModal } from './components/nutrition/VoiceLoggerModal';
import { FoodSearchModal } from './components/nutrition/FoodSearchModal';
import { AIWorkoutPlanner } from './components/workout/AIWorkoutPlanner';
import { MealType } from './types';

const MainAppContent: React.FC = () => {
  const { isOnboarded, activeTab, addWaterMl, setActiveTab } = useFitness();

  // Modal Visibility States
  const [isFoodScannerOpen, setIsFoodScannerOpen] = useState(false);
  const [isBillScannerOpen, setIsBillScannerOpen] = useState(false);
  const [isVoiceLoggerOpen, setIsVoiceLoggerOpen] = useState(false);
  const [isFoodSearchOpen, setIsFoodSearchOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [selectedMealSlot, setSelectedMealSlot] = useState<MealType>('lunch');

  if (!isOnboarded) {
    return <OnboardingWizard />;
  }

  const handleOpenFoodSearch = (meal: MealType = 'lunch') => {
    setSelectedMealSlot(meal);
    setIsFoodSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f3f4f7] text-[#111215] flex flex-col relative selection:bg-[#fa6348] selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main App Container */}
      <div className="flex-1 w-full max-w-lg mx-auto px-4 flex flex-col">
        <Header />

        {/* Dynamic Tab Router */}
        <main className="flex-1 mt-1">
          {activeTab === 'dashboard' && (
            <DashboardView
              onOpenFoodScanner={() => setIsFoodScannerOpen(true)}
              onOpenFoodSearch={() => handleOpenFoodSearch('lunch')}
            />
          )}

          {activeTab === 'nutrition' && (
            <FoodDiary
              onOpenScanner={() => setIsFoodScannerOpen(true)}
              onOpenBillScanner={() => setIsBillScannerOpen(true)}
              onOpenVoiceLogger={() => setIsVoiceLoggerOpen(true)}
              onOpenFoodSearch={handleOpenFoodSearch}
            />
          )}

          {activeTab === 'workout' && (
            <WorkoutTracker
              onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
            />
          )}

          {activeTab === 'activity' && <ActivityView />}

          {activeTab === 'progress' && <ProgressHub />}

          {activeTab === 'coach' && <AICoachDrawer />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Floating Action Button (FAB) */}
      <QuickActionFAB
        onOpenFoodScanner={() => setIsFoodScannerOpen(true)}
        onOpenBillScanner={() => setIsBillScannerOpen(true)}
        onOpenVoiceLogger={() => setIsVoiceLoggerOpen(true)}
        onOpenFoodSearch={() => handleOpenFoodSearch('lunch')}
        onOpenWorkout={() => setActiveTab('workout')}
        onQuickWater={() => addWaterMl(250)}
      />

      {/* Global Ingestion & Feature Modals */}
      <FoodScannerModal
        isOpen={isFoodScannerOpen}
        onClose={() => setIsFoodScannerOpen(false)}
        defaultMealType={selectedMealSlot}
      />

      <BillScannerModal
        isOpen={isBillScannerOpen}
        onClose={() => setIsBillScannerOpen(false)}
        defaultMealType={selectedMealSlot}
      />

      <VoiceLoggerModal
        isOpen={isVoiceLoggerOpen}
        onClose={() => setIsVoiceLoggerOpen(false)}
        defaultMealType={selectedMealSlot}
      />

      <FoodSearchModal
        isOpen={isFoodSearchOpen}
        onClose={() => setIsFoodSearchOpen(false)}
        defaultMealType={selectedMealSlot}
      />

      <AIWorkoutPlanner
        isOpen={isAIPlannerOpen}
        onClose={() => setIsAIPlannerOpen(false)}
      />
    </div>
  );
};

export function App() {
  return (
    <FitnessProvider>
      <MainAppContent />
    </FitnessProvider>
  );
}

export default App;
