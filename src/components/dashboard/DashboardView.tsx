import React from 'react';
import { IOSFitnessDashboard } from './iOSFitnessDashboard';

interface DashboardViewProps {
  onOpenFoodScanner: () => void;
  onOpenFoodSearch: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onOpenFoodScanner,
  onOpenFoodSearch
}) => {
  return (
    <IOSFitnessDashboard
      onOpenFoodScanner={onOpenFoodScanner}
      onOpenFoodSearch={onOpenFoodSearch}
    />
  );
};
