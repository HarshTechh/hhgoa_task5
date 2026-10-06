import React, { useState } from 'react';
import { Sparkles, Send, Bot, User } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const AICoachDrawer: React.FC = () => {
  const { coachMessages, sendCoachMessage, recommendations, applyRecommendation, userProfile, dailyScore } = useFitness();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendCoachMessage(inputText.trim());
    setInputText('');
  };

  const quickPrompts = [
    "What am I missing today?",
    "What should I eat tonight for dinner?",
    "Suggest a high-protein snack",
    "How can I hit my step goal?"
  ];

  return (
    <div className="space-y-4 pb-28">
      {/* Header */}
      <div className="ios-card p-5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-[#fa6348]/10 text-[#fa6348] flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#111215]">AI Coach Assistant</h2>
            <p className="text-[11px] text-[#8e8e93]">Live daily gap awareness</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="ios-card p-5 space-y-3 min-h-[380px] flex flex-col justify-between">
        <div className="space-y-3 overflow-y-auto max-h-[320px] pr-1">
          {coachMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3.5 rounded-3xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-[#fa6348] text-white font-medium'
                    : 'bg-[#f8f9fb] text-[#111215] border border-black/[0.04]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-black/[0.04] space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => sendCoachMessage(prompt)}
                className="px-2.5 py-1 rounded-full bg-[#f8f9fb] hover:bg-gray-200 text-[10px] text-[#636366] transition-all"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask AI coach anything..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#f8f9fb] border border-black/[0.06] rounded-full text-xs text-[#111215] focus:outline-none focus:border-[#fa6348]"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-[#fa6348] text-white shadow-coral-glow hover:bg-[#e8492c]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
