import React from 'react';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const CoachBanner: React.FC = () => {
  const { recommendations, applyRecommendation, setActiveTab } = useFitness();

  if (!recommendations || recommendations.length === 0) return null;

  const topRec = recommendations[0];

  return (
    <div className="glass-panel rounded-3xl p-5 lg:p-6 border border-purple-500/30 relative overflow-hidden bg-gradient-to-r from-purple-950/20 via-dark-card to-dark-card">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start gap-3.5">
          <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-300 flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/30 text-purple-300 border border-purple-500/40">
                AI Coach Insight
              </span>
              <span className="text-xs font-bold text-white">{topRec.title}</span>
            </div>
            <p className="text-xs text-dark-textMuted max-w-2xl leading-relaxed">
              {topRec.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
          {topRec.actionLabel && (
            <button
              onClick={() => applyRecommendation(topRec)}
              className="px-4 py-2 rounded-xl bg-purple-500 text-black font-extrabold text-xs hover:bg-purple-400 transition-all shadow-glow-violet active:scale-95 flex-shrink-0"
            >
              {topRec.actionLabel}
            </button>
          )}

          <button
            onClick={() => setActiveTab('coach')}
            className="p-2 rounded-xl bg-dark-cardMuted hover:bg-dark-card border border-dark-border text-dark-textMuted hover:text-white transition-all"
            title="Open AI Coach"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
