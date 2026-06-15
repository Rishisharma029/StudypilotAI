'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Calendar, Clock, ChevronLeft, ChevronRight, Plus, Edit,
  Sparkles, Target, Award, Info, Check, Trash2, X, AlertCircle, Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// Mock subjects distribution
const subjectAllocationData = [
  { name: 'Mathematics', value: 12, color: '#6366f1' },
  { name: 'Physics', value: 8, color: '#06b6d4' },
  { name: 'Computer Science', value: 10, color: '#8b5cf6' },
  { name: 'Chemistry', value: 6, color: '#ec4899' },
  { name: 'Breaks / Rest', value: 5, color: '#64748b' },
]

// Mock schedule events for week view
const scheduleEvents = [
  { day: 'Mon', time: '09:00 - 11:00', title: 'Math Calculus', color: 'bg-indigo-500/10 border-indigo-500 text-indigo-400' },
  { day: 'Mon', time: '14:00 - 15:30', title: 'Physics Lab', color: 'bg-cyan-500/10 border-cyan-500 text-cyan-400' },
  { day: 'Tue', time: '10:00 - 12:00', title: 'CS Coding DSA', color: 'bg-purple-500/10 border-purple-500 text-purple-400' },
  { day: 'Wed', time: '09:00 - 11:00', title: 'Math Calculus', color: 'bg-indigo-500/10 border-indigo-500 text-indigo-400' },
  { day: 'Thu', time: '11:00 - 12:30', title: 'Chemistry Organic', color: 'bg-pink-500/10 border-pink-500 text-pink-400' },
  { day: 'Thu', time: '15:00 - 17:00', title: 'Physics Kinematics', color: 'bg-cyan-500/10 border-cyan-500 text-cyan-400' },
  { day: 'Fri', time: '10:00 - 12:00', title: 'CS Algorithms', color: 'bg-purple-500/10 border-purple-500 text-purple-400' },
]

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00']

export default function PlannerPage() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('week')
  const [showAiModal, setShowAiModal] = useState(false)
  const [selectedExam, setSelectedExam] = useState('JEE')
  const [studyHours, setStudyHours] = useState(6)
  const [isGenerating, setIsGenerating] = useState(false)
  const [scheduleGenerated, setScheduleGenerated] = useState(false)

  // Goal tracker state
  const [goals, setGoals] = useState([
    { id: 1, text: 'Complete Calculus Chapter 3', completed: true },
    { id: 2, text: 'Solve 15 Physics Kinematics Problems', completed: false },
    { id: 3, text: 'Read TipTap integration guidelines', completed: false },
  ])

  const toggleGoal = (id: number) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g))
  }

  const handleGenerateAiSchedule = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setScheduleGenerated(true)
      setShowAiModal(false)
    }, 2000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Column 1 & 2: Main Study Planner Grid (Wide) */}
      <div className="lg:col-span-2 space-y-6">
        {/* Planner Header bar */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-indigo-400" /> Academic Calendar
            </h2>
            <p className="text-xs text-slate-400">Manage time slots, classes and custom study hours</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5">
              {(['day', 'week', 'month'] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={cn(
                    "px-3 py-1.5 text-xs font-bold rounded-md transition-colors capitalize",
                    view === v ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
                  )}
                >
                  {v}
                </button>
              ))}
            </div>

            <button 
              onClick={() => setShowAiModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 hover:opacity-90 text-white text-xs font-semibold flex items-center gap-1.5 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" /> AI Planner
            </button>
          </div>
        </div>

        {/* Weekly Time Grid */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5 text-[10px] text-slate-500 uppercase font-bold">
                <th className="pb-3 w-16">Time</th>
                {daysOfWeek.map((day) => (
                  <th key={day} className="pb-3 text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map((time) => (
                <tr key={time} className="border-b border-white/5">
                  <td className="py-4 text-xs font-mono text-slate-500">{time}</td>
                  {daysOfWeek.map((day) => {
                    // Find if there is an event matching this day and time slot
                    const match = scheduleEvents.find(e => {
                      const startHour = e.time.split(' - ')[0]
                      return e.day === day && startHour === time
                    })
                    return (
                      <td key={day} className="p-1 text-center h-14">
                        {match ? (
                          <div className={cn("text-[10px] font-bold py-2 px-1 rounded-lg border leading-tight h-full flex flex-col justify-center", match.color)}>
                            <span className="truncate">{match.title}</span>
                            <span className="text-[8px] opacity-80 mt-0.5 block">{match.time.split(' - ')[0]}</span>
                          </div>
                        ) : (
                          <div className="h-full rounded-lg border border-dashed border-white/5 hover:border-slate-700 hover:bg-slate-950/20 cursor-pointer flex items-center justify-center text-[10px] text-slate-700 hover:text-indigo-400 font-bold">
                            +
                          </div>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Column 3: Sidebar Details (Time allocation & Weekly Goals) */}
      <div className="space-y-6">
        {/* Weekly goals checklist */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Target className="w-4 h-4 text-emerald-400" /> Weekly Goals
          </h3>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div 
                key={goal.id} 
                onClick={() => toggleGoal(goal.id)}
                className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-slate-950/40 cursor-pointer group"
              >
                <div className={cn(
                  "w-4.5 h-4.5 rounded-md border flex items-center justify-center text-[10px] mt-0.5 shrink-0 transition-colors",
                  goal.completed 
                    ? "border-emerald-500 bg-emerald-500 text-white" 
                    : "border-slate-700 group-hover:border-slate-500"
                )}>
                  {goal.completed && "✓"}
                </div>
                <span className={cn("text-xs font-medium", goal.completed ? "line-through text-slate-500" : "text-slate-300")}>
                  {goal.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Time allocation charts */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-80">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5 mb-2">
            <Award className="w-4 h-4 text-indigo-400" /> Time Distribution
          </h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectAllocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {subjectAllocationData.map((entry, idx) => (
                    <Cell key={`cell-${idx}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1.5 justify-center mt-2 text-[10px] text-slate-400">
            {subjectAllocationData.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                <span>{s.name} ({s.value}h)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Schedule Generator Modal */}
      <AnimatePresence>
        {showAiModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-2xl border border-white/5 bg-slate-900 relative space-y-4 shadow-2xl"
            >
              <button 
                onClick={() => setShowAiModal(false)}
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> AI Schedule Optimizer
                </h3>
                <p className="text-xs text-slate-400">Configure parameters to generate a customized curriculum calendar.</p>
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">Target Exam</span>
                  <select 
                    value={selectedExam}
                    onChange={(e) => setSelectedExam(e.target.value)}
                    className="w-full p-2 rounded bg-slate-950 border border-white/5 text-white"
                  >
                    <option value="JEE">JEE Main / Advanced</option>
                    <option value="NEET">NEET Medical</option>
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="CUET">CUET College Entrance</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">Daily Study Limit</span>
                  <div className="flex items-center gap-3">
                    <input 
                      type="range" 
                      min={2} 
                      max={12} 
                      value={studyHours}
                      onChange={(e) => setStudyHours(Number(e.target.value))}
                      className="flex-1 accent-indigo-500"
                    />
                    <span className="font-bold text-indigo-400 font-mono w-12 text-right">{studyHours} hours</span>
                  </div>
                </div>

                <button
                  onClick={handleGenerateAiSchedule}
                  disabled={isGenerating}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Optimizing calendar...
                    </>
                  ) : (
                    'Generate Optimal Study Calendar'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
