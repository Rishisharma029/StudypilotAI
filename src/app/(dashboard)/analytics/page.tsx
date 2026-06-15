'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Trophy, Target, BookOpen, Clock, TrendingUp, BarChart3,
  Calendar, Zap, Award, Brain, ArrowUpRight, Flame, Sparkles
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { cn } from '@/lib/utils'

// Mock Data
const studyHoursData = [
  { name: 'Mon', Planned: 4, Actual: 3.5 },
  { name: 'Tue', Planned: 4, Actual: 4.8 },
  { name: 'Wed', Planned: 4, Actual: 2.2 },
  { name: 'Thu', Planned: 4, Actual: 5.5 },
  { name: 'Fri', Planned: 4, Actual: 6.0 },
  { name: 'Sat', Planned: 4, Actual: 4.0 },
  { name: 'Sun', Planned: 4, Actual: 7.2 },
]

const subjectDistributionData = [
  { name: 'Mathematics', value: 35, color: '#6366f1' },
  { name: 'Physics', value: 25, color: '#06b6d4' },
  { name: 'Computer Science', value: 25, color: '#8b5cf6' },
  { name: 'Chemistry', value: 15, color: '#ec4899' },
]

const productivityTrendData = Array.from({ length: 30 }, (_, idx) => ({
  day: idx + 1,
  score: Math.floor(Math.random() * 20) + 70 + (idx / 2)
}))

const subjectAccuracyData = [
  { name: 'Math', Accuracy: 84 },
  { name: 'Physics', Accuracy: 78 },
  { name: 'CS', Accuracy: 90 },
  { name: 'Chemistry', Accuracy: 62 },
]

// Heatmap data helper: generates calendar days for the last 24 weeks
const generateHeatmapGrid = () => {
  const grid = []
  for (let week = 0; week < 24; week++) {
    const weekDays = []
    for (let day = 0; day < 7; day++) {
      // Random study intensity level: 0 to 4
      weekDays.push(Math.floor(Math.random() * 5))
    }
    grid.push(weekDays)
  }
  return grid
}

const heatmapGrid = generateHeatmapGrid()

export default function AnalyticsPage() {
  const [range, setRange] = useState<'week' | 'month' | '3month' | 'year'>('week')

  return (
    <div className="space-y-6">
      {/* Header bar with Date Range selectors */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" /> Study Analytics
          </h1>
          <p className="text-xs text-slate-400">Examine study patterns, focus metrics, and topic correctness over time</p>
        </div>

        <div className="flex p-0.5 bg-slate-950 rounded-xl border border-white/5 self-start md:self-auto">
          {(['week', 'month', '3month', 'year'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded-md transition-colors capitalize",
                range === r ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
              )}
            >
              {r === '3month' ? '3 Months' : r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Study Hours</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-white">47.2h</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Total focus time this week</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Average Focus</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-indigo-400">82%</span>
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +5%
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Based on Pomodoro biofeedback</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Quiz Accuracy</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-purple-400">78%</span>
            <span className="text-xs text-slate-500 font-semibold">• Stable</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Across 12 testing modules</span>
        </div>

        <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Streak Badge</span>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-extrabold text-orange-400 flex items-center gap-1.5">
              🔥 12 Days
            </span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-1">Active studying checklist active</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Study Hours Comparison Chart (Wide) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <div>
            <h2 className="text-md font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" /> Study Hours Comparison
            </h2>
            <p className="text-xs text-slate-400">Planned calendar limits vs actual clock hours</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyHoursData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="Planned" stroke="#8b5cf6" strokeWidth={2} fillOpacity={1} fill="url(#colorPlanned)" />
                <Area type="monotone" dataKey="Actual" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorActual)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Time Allocation (Donut Chart) */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-80">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-2">
            <Zap className="w-4 h-4 text-purple-400" /> Subject Focus Allocation
          </h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {subjectDistributionData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center mt-2 text-[10px] text-slate-400">
            {subjectDistributionData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name} ({s.value}%)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Productivity score 30 days Trend (Wide) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <div>
            <h2 className="text-md font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" /> 30-Day Productivity Index
            </h2>
            <p className="text-xs text-slate-400">Trend showing focus score stability over calendar days</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={productivityTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[60, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject accuracy performance bar chart */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" /> Accuracy per Subject
            </h3>
            <p className="text-xs text-slate-400">Average MCQ test score percentage</p>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectAccuracyData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Bar dataKey="Accuracy" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Revision Heatmap grid */}
      <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
        <div>
          <h2 className="text-md font-bold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" /> Study Heatmap (Last 24 Weeks)
          </h2>
          <p className="text-xs text-slate-400">Grid cells represent daily study intensity based on hours logged</p>
        </div>

        <div className="flex overflow-x-auto gap-1 pb-2">
          {heatmapGrid.map((week, wIdx) => (
            <div key={wIdx} className="flex flex-col gap-1 shrink-0">
              {week.map((level, dIdx) => (
                <div 
                  key={dIdx}
                  className={cn(
                    "w-3.5 h-3.5 rounded-sm transition-all",
                    level === 0 && "bg-slate-950/80 border border-white/5",
                    level === 1 && "bg-indigo-950",
                    level === 2 && "bg-indigo-800",
                    level === 3 && "bg-indigo-600",
                    level === 4 && "bg-indigo-400 shadow-md shadow-indigo-500/20"
                  )}
                  title={`Week ${wIdx + 1}, Day ${dIdx + 1}: Intensity level ${level}`}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 text-[10px] text-slate-500 justify-end pt-1">
          <span>Less</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-slate-950 border border-white/5" />
          <div className="w-2.5 h-2.5 rounded-sm bg-indigo-950" />
          <div className="w-2.5 h-2.5 rounded-sm bg-indigo-800" />
          <div className="w-2.5 h-2.5 rounded-sm bg-indigo-600" />
          <div className="w-2.5 h-2.5 rounded-sm bg-indigo-400" />
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
