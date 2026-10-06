import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import { Scale, Trophy, Flame } from 'lucide-react';
import { useFitness } from '../../context/FitnessContext';

export const ProgressHub: React.FC = () => {
  const { weightHistory, streakData, userProfile, dailyTargets, logWeight } = useFitness();
  const [newWeight, setNewWeight] = useState<string>('');

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWeight) return;
    logWeight(Number(newWeight));
    setNewWeight('');
  };

  const macroWeeklyData = [
    { day: 'Mon', protein: 128 },
    { day: 'Tue', protein: 140 },
    { day: 'Wed', protein: 122 },
    { day: 'Thu', protein: 135 },
    { day: 'Fri', protein: 145 },
    { day: 'Sat', protein: 118 },
    { day: 'Sun', protein: 132 }
  ];

  return (
    <div className="space-y-4 pb-28">
      {/* Weight Trend */}
      <div className="ios-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-sm text-[#111215]">Weight Progress</h3>
            <p className="text-xs text-[#8e8e93]">
              {userProfile.currentWeightKg} kg → Target {userProfile.targetWeightKg} kg
            </p>
          </div>

          <form onSubmit={handleAddWeight} className="flex items-center gap-1.5">
            <input
              type="number"
              step="0.1"
              placeholder="kg"
              value={newWeight}
              onChange={(e) => setNewWeight(e.target.value)}
              className="w-16 px-2.5 py-1 bg-[#f8f9fb] border border-black/[0.06] rounded-xl text-xs font-bold text-[#111215]"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-xl bg-[#fa6348] text-white font-bold text-xs"
            >
              Log
            </button>
          </form>
        </div>

        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weightHistory} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaebef" vertical={false} />
              <XAxis dataKey="date" stroke="#8e8e93" fontSize={10} tickLine={false} />
              <YAxis stroke="#8e8e93" fontSize={10} domain={['dataMin - 1', 'dataMax + 1']} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#eaebef', borderRadius: '16px', fontSize: '11px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
              />
              <Line
                type="monotone"
                dataKey="weightKg"
                stroke="#fa6348"
                strokeWidth={3}
                dot={{ fill: '#fa6348', r: 4 }}
                name="Weight (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Protein Compliance */}
      <div className="ios-card p-5 space-y-3">
        <h3 className="font-bold text-sm text-[#111215]">7-Day Protein Intake (g)</h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={macroWeeklyData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eaebef" vertical={false} />
              <XAxis dataKey="day" stroke="#8e8e93" fontSize={10} tickLine={false} />
              <YAxis stroke="#8e8e93" fontSize={10} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#ffffff', borderColor: '#eaebef', borderRadius: '16px', fontSize: '11px' }}
              />
              <Bar dataKey="protein" fill="#fa6348" radius={[6, 6, 0, 0]} name="Protein (g)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Milestones */}
      <div className="ios-card p-5 space-y-3">
        <h3 className="font-bold text-sm text-[#111215]">Achievements</h3>
        <div className="grid grid-cols-2 gap-2">
          {streakData.achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-3 rounded-2xl border ${
                ach.isUnlocked
                  ? 'bg-[#f8f9fb] border-[#fa6348]/20'
                  : 'bg-white border-black/[0.04] opacity-50'
              }`}
            >
              <span className="text-xl">{ach.icon}</span>
              <h4 className="text-xs font-bold text-[#111215] mt-1">{ach.title}</h4>
              <p className="text-[10px] text-[#8e8e93]">{ach.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
