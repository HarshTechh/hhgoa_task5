# Fitent — AI Fitness OS

> A personalized, AI-powered personal fitness operating system that combines smart food logging, workout routines, vital updates, and an intelligent fitness companion.

---

## Project Overview

**Fitent** is designed to be more than just a calorie counter—it acts as an end-to-end daily fitness companion. It understands your profile, computes personalized daily calorie & macronutrient targets, tracks daily activities, and provides actionable recommendations to keep you on track.

---

## Key Features

- **Dynamic Daily Dashboard**:
  - Streak tracking with milestone badges
  - Quick-toggle daily view for Calories, Distance, and Active Time
  - Daily vitals updates (Oxygen saturation, Heart Rate pulse waveform)
  
- **Nutrition & Food Logging**:
  - Macro breakdown (Calories, Protein, Carbs, Fats)
  - Multimodal food logging: AI Photo Scanner, Restaurant Bill Scanner, Voice Logger, and Manual Search
  - Meal breakdowns (Breakfast, Lunch, Dinner, Snacks)

- **Workout OS**:
  - Exercise routines and AI-generated split recommendations
  - Set, rep, and weight trackers with rest timers
  - Estimated calorie burn calculations

- **Analytics & Progress Hub**:
  - Weekly calorie adherence charts
  - Weight trends and recovery metrics
  - Habit and streak tracking

- **Built-in AI Fitness Coach**:
  - Real-time suggestions on what is missing in your day
  - Personalized action items (e.g., hydration reminders, protein booster meals)

---

## Tech Stack

- **Frontend Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Micro-interactions**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or above) installed.

### Installation

1. **Clone or navigate to the repository**:
   ```bash
   git clone <repository-url>
   cd hhgoa_task5
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## Project Structure

```text
├── src/
│   ├── components/
│   │   ├── activity/       # Health & vitals components
│   │   ├── analytics/      # Progress charts and metrics
│   │   ├── coach/          # AI Coach drawer & insights
│   │   ├── dashboard/      # Main overview dashboard
│   │   ├── layout/         # Navigation & header components
│   │   ├── nutrition/      # Food diary & AI scanner modals
│   │   ├── onboarding/     # Initial profile setup wizard
│   │   ├── settings/       # App preferences & profile settings
│   │   └── workout/        # Workout tracker & AI routine generator
│   ├── context/            # Fitness state & context providers
│   ├── data/               # Mock data & initial datasets
│   ├── lib/                # Utility helpers
│   ├── types/              # TypeScript interfaces & types
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # App entry point
│   └── index.css           # Global Tailwind CSS styles
├── public/                 # Static assets
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## License

This project is licensed under the [MIT License](LICENSE).
