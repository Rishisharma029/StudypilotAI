'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Trophy, Target, BookOpen, CheckCircle, Clock, TrendingUp, BarChart3,
  Play, Download, Star, ChevronDown, ChevronRight, Zap, Award, Brain,
  Calculator, Atom, FlaskConical, Check, Circle, HelpCircle
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { cn } from '@/lib/utils'

// Mock difficulty analysis distribution
const difficultyAnalysisData = [
  { name: 'Easy', value: 40, color: '#10b981' },
  { name: 'Medium', value: 45, color: '#eab308' },
  { name: 'Hard', value: 15, color: '#f43f5e' },
]

// Mock PYQs
const mockPYQs = [
  { year: 2023, name: 'JEE Main Phase 1', questions: 90, status: 'Completed', score: '245/300' },
  { year: 2022, name: 'JEE Main Phase 2', questions: 90, status: 'Available', score: '--' },
  { year: 2021, name: 'JEE Main Full Set', questions: 90, status: 'In Progress', score: '--' },
]

// Mock Syllabus Chapters
const initialChapters = [
  { id: 'ch1', name: 'Mechanics', completed: 12, total: 15, subject: 'Physics' },
  { id: 'ch2', name: 'Thermodynamics', completed: 8, total: 12, subject: 'Physics' },
  { id: 'ch3', name: 'Calculus', completed: 18, total: 20, subject: 'Mathematics' },
  { id: 'ch4', name: 'Electrostatics', completed: 5, total: 10, subject: 'Physics' },
]

export default function ExamHubPage() {
  const [activeExam, setActiveExam] = useState('JEE')
  const [percentile, setPercentile] = useState(98.5)
  const [chapters, setChapters] = useState(initialChapters)
  const [daysLeft, setDaysLeft] = useState(84)

  useEffect(() => {
    if (activeExam === 'JEE') {
      setDaysLeft(84)
    } else if (activeExam === 'NEET') {
      setDaysLeft(125)
    } else {
      setDaysLeft(190)
    }
  }, [activeExam])

  const toggleChapter = (id: string) => {
    setChapters(chapters.map(ch => {
      if (ch.id === id) {
        const newCompleted = ch.completed === ch.total ? 0 : ch.total
        return { ...ch, completed: newCompleted }
      }
      return ch
    }))
  }

  // Predict Rank formula simulation
  const predictRank = () => {
    const totalStudents = activeExam === 'JEE' ? 1200000 : activeExam === 'NEET' ? 2000000 : 800000
    const rank = Math.round((1 - percentile / 100) * totalStudents)
    return rank > 0 ? rank : 1
  }

  return (
    <div className="space-y-6">
      {/* Top Selector row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Trophy className="w-6 h-6 text-indigo-400" /> National Exam Hub
          </h1>
          <p className="text-xs text-slate-400">Mock papers, rank estimators, syllabus maps, and countdown metrics</p>
        </div>

        <div className="flex p-0.5 bg-slate-950 rounded-xl border border-white/5 self-start md:self-auto">
          {['JEE', 'NEET', 'UPSC', 'CUET'].map((exam) => (
            <button
              key={exam}
              onClick={() => setActiveExam(exam)}
              className={cn(
                "px-4 py-1.5 text-xs font-bold rounded-md transition-colors",
                activeExam === exam ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
              )}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Countdown, Prep Score & Syllabus Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Countdown Box */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-48 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Exam Countdown</span>
          <div className="py-2 flex items-baseline gap-1">
            <span className="text-5xl font-extrabold text-rose-500 font-mono">{daysLeft}</span>
            <span className="text-slate-400 text-sm font-semibold">Days Left</span>
          </div>
          <span className="text-xs text-slate-400">Estimated date: {new Date(Date.now() + daysLeft * 86400000).toLocaleDateString()}</span>
        </div>

        {/* Circular Gauge Preparation score */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-center h-48 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-4 left-4">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Preparation Index</span>
          </div>
          <div className="relative w-28 h-28 flex items-center justify-center mt-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="8" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="#6366f1" 
                strokeWidth="8" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - 0.68)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-extrabold text-white">68%</span>
              <span className="text-[9px] text-slate-500 font-bold uppercase">Ready</span>
            </div>
          </div>
        </div>

        {/* Rank Predictor widget */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-48">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">AI Rank Estimator</span>
            <div className="flex items-center gap-3 mt-3">
              <input 
                type="number" 
                step="0.1"
                min="50"
                max="100"
                value={percentile}
                onChange={(e) => setPercentile(Number(e.target.value))}
                className="w-20 px-2 py-1 bg-slate-950 border border-white/5 text-sm text-white font-bold rounded focus:outline-none"
              />
              <span className="text-xs text-slate-400 font-medium">Percentile Projection</span>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Estimated Rank</span>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">~{predictRank().toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Syllabus Maps & Question distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Syllabus Checklists */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <div>
            <h2 className="text-md font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-indigo-400" /> Exam Syllabus Completion
            </h2>
            <p className="text-xs text-slate-400">Chapters and topics marked for active revision</p>
          </div>

          <div className="space-y-3">
            {chapters.map((ch) => {
              const pct = Math.round((ch.completed / ch.total) * 100)
              return (
                <div key={ch.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => toggleChapter(ch.id)}
                      className={cn(
                        "w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                        pct === 100 ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-700 hover:border-slate-500"
                      )}
                    >
                      {pct === 100 && <Check className="w-3.5 h-3.5" />}
                    </button>
                    <div>
                      <h4 className="text-xs font-bold text-white">{ch.name}</h4>
                      <span className="text-[9px] text-indigo-400 font-semibold">{ch.subject}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-400">{ch.completed}/{ch.total} topics</span>
                    <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-xs font-bold text-white w-8 text-right">{pct}%</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Difficulty Distribution Chart */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-80">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-2">
            <BarChart3 className="w-4 h-4 text-purple-400" /> Syllabus Difficulty Split
          </h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyAnalysisData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {difficultyAnalysisData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center mt-2 text-[10px] text-slate-400">
            {difficultyAnalysisData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name} ({s.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PYQ Papers Available */}
      <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
        <div>
          <h3 className="text-md font-bold text-white flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" /> Past Years Papers (PYQs)
          </h3>
          <p className="text-xs text-slate-400">Practice full-length previous years evaluations under simulated exam timers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockPYQs.map((paper) => (
            <div key={paper.year} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-3 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-indigo-400">{paper.year}</span>
                <h4 className="text-sm font-bold text-white mt-1">{paper.name}</h4>
                <p className="text-[10px] text-slate-500 mt-1">{paper.questions} Questions • 180 Minutes</p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-2">
                <span className={cn(
                  "text-[10px] font-bold",
                  paper.status === 'Completed' ? "text-emerald-400" : paper.status === 'In Progress' ? "text-amber-400" : "text-slate-500"
                )}>
                  {paper.status} {paper.score !== '--' && `(${paper.score})`}
                </span>
                <button className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors">
                  <Play className="w-2.5 h-2.5 fill-white" /> Practice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
