'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Sparkles, Flame, CheckSquare, Trophy, Brain, BarChart3, 
  Clock, ArrowRight, Play, Zap, Calendar, GraduationCap, 
  Settings, ChevronRight, Award, Activity, Star, Coins, X
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { useUserStore, useTasksStore } from '@/lib/store'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data for charts
const studyHoursData = [
  { name: 'Mon', hours: 3.5, target: 4 },
  { name: 'Tue', hours: 4.8, target: 4 },
  { name: 'Wed', hours: 2.2, target: 4 },
  { name: 'Thu', hours: 5.5, target: 4 },
  { name: 'Fri', hours: 6.0, target: 4 },
  { name: 'Sat', hours: 4.0, target: 4 },
  { name: 'Sun', hours: 7.2, target: 4 },
]

const quizScoresData = [
  { name: 'Q1', score: 80 },
  { name: 'Q2', score: 65 },
  { name: 'Q3', score: 90 },
  { name: 'Q4', score: 75 },
  { name: 'Q5', score: 85 },
]

const recentActivities = [
  { id: 1, type: 'quiz', text: 'Scored 90% in Physics Kinematics Quiz', time: '2 hours ago', icon: Trophy, color: 'text-amber-400 bg-amber-500/10' },
  { id: 2, type: 'note', text: 'Created note: "Quantum Wave Functions"', time: '4 hours ago', icon: Brain, color: 'text-indigo-400 bg-indigo-500/10' },
  { id: 3, type: 'pomodoro', text: 'Completed 2 Focus Sessions (Physics)', time: 'Yesterday', icon: Clock, color: 'text-rose-400 bg-rose-500/10' },
  { id: 4, type: 'task', text: 'Completed "Review Chemistry Notes"', time: 'Yesterday', icon: CheckSquare, color: 'text-emerald-400 bg-emerald-500/10' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } }
}

export default function DashboardPage() {
  const { user } = useUserStore()
  const { tasks, moveTask } = useTasksStore()
  const [greeting, setGreeting] = useState('Welcome back')
  const [time, setTime] = useState('')
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const hours = new Date().getHours()
    if (hours < 12) setGreeting('Good morning')
    else if (hours < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const timer = setInterval(() => {
      const date = new Date()
      setTime(date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }, 1000)
    
    // Set initial time
    setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    // Read banner dismissal from localStorage
    const hideBanner = localStorage.getItem('hide-beta-banner')
    if (hideBanner !== 'true') {
      setShowBanner(true)
    }

    return () => clearInterval(timer)
  }, [])

  const handleDismissBanner = () => {
    localStorage.setItem('hide-beta-banner', 'true')
    setShowBanner(false)
  }

  // Filter incomplete tasks for today
  const activeTasks = tasks.filter(t => t.status !== 'done').slice(0, 3)

  return (
    <div className="space-y-6 p-6">
      {/* Dismissible Beta Banner */}
      {showBanner && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-xs flex items-center justify-between gap-4 relative overflow-hidden"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm">🚀</span>
            <div>
              <p className="font-semibold text-white">StudyPilot AI Beta</p>
              <p className="text-white/60 mt-0.5">Authentication, cloud sync and AI integrations will be enabled in future releases.</p>
            </div>
          </div>
          <button 
            onClick={handleDismissBanner}
            className="w-6 h-6 rounded-lg flex items-center justify-center text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}

      {/* Top Banner Row */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-xl relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent pointer-events-none" />
        <div className="space-y-1 relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            {greeting}, {user.name}! <span className="animate-pulse">🎯</span>
          </h1>
          <p className="text-sm text-slate-400 flex items-center gap-2">
            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' })}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span>{time}</span>
            <span className="h-1 w-1 rounded-full bg-slate-600" />
            <span className="text-indigo-400 font-medium">"Focus on the process, not the outcome."</span>
          </p>
        </div>
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-sm font-semibold">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>{user.streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Level {user.level}</span>
          </div>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {/* Study Hours Line Chart Widget (Wide) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-indigo-400" /> Study Activity
              </h2>
              <p className="text-xs text-slate-400">Hours spent studying this week vs daily target</p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">34.2h</span>
              <span className="text-xs text-emerald-400 block">+12% from last week</span>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={studyHoursData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Gamification Streak & XP */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-purple-400" /> Progress Dashboard
            </h2>
            <div className="text-indigo-400 text-xs font-semibold flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>{user.coins} Coins</span>
            </div>
          </div>

          <div className="py-6 text-center space-y-2">
            <div className="inline-block relative">
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="w-20 h-20 rounded-full border border-orange-500/20 bg-orange-500/10 flex items-center justify-center text-4xl mx-auto shadow-lg shadow-orange-500/10"
              >
                🔥
              </motion.div>
              <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                Lvl {user.level}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">{user.streak} Day Streak</h3>
              <p className="text-xs text-slate-400">Keep studying daily to keep the flame alive!</p>
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>XP: {user.xp} / 5000</span>
              <span>75% to Level 8</span>
            </div>
            <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-emerald-400" /> Today's Tasks
              </h2>
              <Link href="/tasks" className="text-xs text-indigo-400 hover:underline flex items-center">
                View All <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {activeTasks.length > 0 ? (
                activeTasks.map((task) => (
                  <div key={task.id} className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-slate-950/40">
                    <button 
                      onClick={() => moveTask(task.id, 'done')}
                      className="mt-0.5 w-4 h-4 rounded border border-slate-600 flex items-center justify-center hover:border-indigo-400 text-transparent hover:text-indigo-400"
                    >
                      ✓
                    </button>
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-white line-clamp-1">{task.title}</p>
                      <div className="flex items-center gap-2">
                        {task.subject && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-semibold">
                            {task.subject}
                          </span>
                        )}
                        {task.priority && (
                          <span className={cn(
                            "text-[10px] font-bold",
                            task.priority === 'high' ? 'text-rose-400' : 'text-slate-400'
                          )}>
                            • {task.priority.toUpperCase()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-500 text-sm">
                  🎉 No pending tasks!
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
            <span>Task Completion: 3/5</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </motion.div>

        {/* Upcoming Exams list */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-cyan-400" /> Upcoming Exams & Deadlines
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Maths II', when: 'In 4 days', desc: 'Differential Equations', type: 'Exam', color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10' },
                { title: 'DSA Quiz', when: 'Tomorrow', desc: 'Binary Trees & Graphs', type: 'Quiz', color: 'text-amber-400 border-amber-500/20 bg-amber-500/10' },
                { title: 'DBMS Assignment', when: 'This Friday', desc: 'Normalization Exercise', type: 'Assignment', color: 'text-indigo-400 border-indigo-500/20 bg-indigo-500/10' }
              ].map((exam, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-bold text-white">{exam.title}</h3>
                    <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-semibold border", exam.color)}>
                      {exam.when}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{exam.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Focus Score circular gauge */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between items-center text-center"
        >
          <div className="w-full flex items-center justify-between text-left mb-2">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-400" /> Focus Score
            </h2>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 font-bold">EXCELLENT</span>
          </div>

          <div className="relative w-36 h-36 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="8" />
              <motion.circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                stroke="url(#roseGradient)" 
                strokeWidth="8" 
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * (1 - 0.84) }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="roseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-white">84%</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold mt-0.5">Productivity</span>
            </div>
          </div>

          <p className="text-xs text-slate-400">Your focus level was 5% higher than last week.</p>
        </motion.div>

        {/* AI Insights Panel (Wide) */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Brain className="w-4 h-4 text-purple-400" /> AI-Generated Study Insights
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-indigo-500/10 bg-indigo-500/5 hover:bg-indigo-500/10 transition-colors">
                <span className="text-lg font-bold text-indigo-400">9-11 PM</span>
                <h4 className="text-xs font-semibold text-white mt-1">Peak Concentration</h4>
                <p className="text-[11px] text-slate-400 mt-1">Your focus score is 20% higher during late evenings.</p>
              </div>
              <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                <span className="text-lg font-bold text-rose-400">Chemistry</span>
                <h4 className="text-xs font-semibold text-white mt-1">Focus Area</h4>
                <p className="text-[11px] text-slate-400 mt-1">Your quiz score here averages 45%. Spend more revision time.</p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 transition-colors">
                <span className="text-lg font-bold text-emerald-400">90%+</span>
                <h4 className="text-xs font-semibold text-white mt-1">Exam Projection</h4>
                <p className="text-[11px] text-slate-400 mt-1">On track to score 92% based on current study trajectory.</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs text-slate-400">Insights updated 2 hours ago</span>
            <button className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-semibold">
              Generate Detailed Report <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>

        {/* Subject Progress */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-amber-400" /> Syllabus Progress
            </h2>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">Mathematics</span>
                  <span className="text-indigo-400 font-semibold">78%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '78%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">Physics</span>
                  <span className="text-purple-400 font-semibold">65%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">Chemistry</span>
                  <span className="text-pink-400 font-semibold">45%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-pink-500 rounded-full" style={{ width: '45%' }} />
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-white font-medium">Computer Science</span>
                  <span className="text-cyan-400 font-semibold">92%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quiz Performance sparkline */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" /> Recent Quiz Performance
            </h2>
            <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={quizScoresData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                  />
                  <Bar dataKey="score" fill="#eab308" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="pt-2 text-center text-xs text-slate-400">
            Average accuracy: <span className="text-white font-bold">79%</span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-indigo-400" /> Quick Actions
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/notes" className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors text-center group">
                <span className="text-lg mb-1 group-hover:scale-110 transition-transform">📝</span>
                <span className="text-xs font-semibold text-white">New Note</span>
              </Link>
              <Link href="/quiz" className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors text-center group">
                <span className="text-lg mb-1 group-hover:scale-110 transition-transform">🎯</span>
                <span className="text-xs font-semibold text-white">Start Quiz</span>
              </Link>
              <Link href="/ai-tutor" className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors text-center group">
                <span className="text-lg mb-1 group-hover:scale-110 transition-transform">🤖</span>
                <span className="text-xs font-semibold text-white">Ask AI</span>
              </Link>
              <Link href="/pomodoro" className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors text-center group">
                <span className="text-lg mb-1 group-hover:scale-110 transition-transform">⏱️</span>
                <span className="text-xs font-semibold text-white">Pomodoro</span>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          variants={itemVariants}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between"
        >
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-emerald-400" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((act) => {
                const IconComp = act.icon
                return (
                  <div key={act.id} className="flex gap-3">
                    <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center shrink-0", act.color)}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-medium text-white">{act.text}</p>
                      <span className="text-[10px] text-slate-500">{act.time}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
