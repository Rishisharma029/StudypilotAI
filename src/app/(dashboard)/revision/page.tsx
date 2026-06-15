'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  RefreshCw, Zap, Clock, Star, Brain, BookOpen, Trophy, 
  Target, Check, ChevronRight, AlertCircle, Compass
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts'

// Mock forgetting curve data
const forgettingCurveData = [
  { day: 0, retention: 100, noRevision: 100 },
  { day: 1, retention: 90, noRevision: 65 }, // Revise 1
  { day: 2, retention: 95, noRevision: 50 },
  { day: 4, retention: 88, noRevision: 35 }, // Revise 2
  { day: 7, retention: 92, noRevision: 22 }, // Revise 3
  { day: 14, retention: 90, noRevision: 10 },
]

// Mock Spaced Repetition queue
const mockQueue = [
  { id: 'q1', topic: 'Calculus Integration by Parts', subject: 'Mathematics', status: 'Overdue', interval: '1 day', difficulty: 'Hard' },
  { id: 'q2', topic: 'Kinematics Mechanics Equations', subject: 'Physics', status: 'Due Today', interval: '3 days', difficulty: 'Medium' },
  { id: 'q3', topic: 'Data Structures Binary Trees', subject: 'Computer Science', status: 'Due Tomorrow', interval: '7 days', difficulty: 'Easy' },
  { id: 'q4', topic: 'Organic Chemistry Alkynes', subject: 'Chemistry', status: 'This Week', interval: '14 days', difficulty: 'Medium' },
]

export default function RevisionPage() {
  const [activeQueue, setActiveQueue] = useState(mockQueue)

  const handleReview = (id: string) => {
    setActiveQueue(activeQueue.filter(item => item.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <RefreshCw className="w-6 h-6 text-indigo-400" /> Smart Revision Engine
          </h1>
          <p className="text-xs text-slate-400">Optimize study retention using Spaced Repetition (Forgetting Curve) scheduling</p>
        </div>
      </div>

      {/* Overview stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-40">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Active Revision Queue</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 font-bold uppercase">URGENT</span>
          </div>
          <div>
            <h3 className="text-3xl font-extrabold text-white">15 Items</h3>
            <p className="text-xs text-slate-400 mt-1">Estimated review time: 35 minutes</p>
          </div>
          <button className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
            Start Today's Review Cycle
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-40">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Daily Target Accomplished</span>
          <div>
            <h3 className="text-3xl font-extrabold text-indigo-400">4 / 5 Done</h3>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
          <span className="text-xs text-slate-400">Streak multipliers active</span>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-40">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Weak Concept Priority</span>
          <div>
            <h3 className="text-2xl font-extrabold text-pink-400">Chemistry (Organic)</h3>
            <p className="text-xs text-slate-400 mt-1">Review intervals increased to 24 hours.</p>
          </div>
          <span className="text-xs text-slate-400">Auto-prioritized by AI</span>
        </div>
      </div>

      {/* Line Chart: Forgetting Curve Retention */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forgetting Curve Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <div>
            <h2 className="text-md font-bold text-white flex items-center gap-2">
              <Brain className="w-4 h-4 text-indigo-400" /> Forgetting Curve & Memory Retention
            </h2>
            <p className="text-xs text-slate-400">Comparison showing retention rate with periodic reviews vs no reviews</p>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forgettingCurveData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="day" label={{ value: 'Days Passed', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: '10px' }} stroke="#64748b" fontSize={11} />
                <YAxis label={{ value: 'Retention %', angle: -90, position: 'insideLeft', offset: 10, fill: '#64748b', fontSize: '10px' }} stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="retention" stroke="#6366f1" strokeWidth={2.5} name="With Spaced Repetition" />
                <Line type="monotone" dataKey="noRevision" stroke="#f43f5e" strokeWidth={2} name="Without Revision" strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Priority Topics list */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-[360px]">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Target className="w-4 h-4 text-purple-400" /> AI Priority Weak Areas
            </h3>
            <p className="text-xs text-slate-400">Topics needing immediate calibration</p>
          </div>

          <div className="space-y-4 my-auto">
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Kinematics Physics</span>
                <span className="text-indigo-400 font-semibold">62% Mastery</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Organic Chemistry</span>
                <span className="text-pink-400 font-semibold">45% Mastery</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-pink-500 rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-white font-medium">Calculus Integrals</span>
                <span className="text-purple-400 font-semibold">68% Mastery</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: '68%' }} />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 text-center text-xs text-slate-500">
            Click any topic to spawn active flashcard review
          </div>
        </div>
      </div>

      {/* Revision Queue List */}
      <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-400" /> Pending Spaced Repetition Items
          </h3>
          <p className="text-xs text-slate-400">Review items scheduled by custom forgetting curve decay algorithm</p>
        </div>

        <div className="space-y-3">
          {activeQueue.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white">{item.topic}</h4>
                <span className="text-[10px] text-slate-500 font-medium">{item.subject} • Next Interval: {item.interval}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className={cn(
                  "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                  item.status === 'Overdue' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                )}>
                  {item.status}
                </span>

                <button 
                  onClick={() => handleReview(item.id)}
                  className="px-3.5 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <Check className="w-3 h-3" /> Mark Reviewed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
