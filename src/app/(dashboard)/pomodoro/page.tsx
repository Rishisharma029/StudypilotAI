'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {
  Play, Pause, RotateCcw, SkipForward, Clock, Volume2, 
  VolumeX, Coffee, Cloud, Waves, TreePine, Radio, Star, 
  Flame, Sparkles, Settings, ChevronRight, Award, Trash2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { usePomodoroStore } from '@/lib/store'

const ambientSounds = [
  { id: 'rain', name: 'Rain', emoji: '🌧️', url: null },
  { id: 'forest', name: 'Forest', emoji: '🌲', url: null },
  { id: 'ocean', name: 'Ocean', emoji: '🌊', url: null },
  { id: 'cafe', name: 'Cafe', emoji: '☕', url: null },
  { id: 'white', name: 'White Noise', emoji: '⚪', url: null },
  { id: 'lofi', name: 'Lo-Fi', emoji: '🎵', url: null },
]

export default function PomodoroPage() {
  const {
    mode, timeLeft, isRunning, sessionsCompleted, currentSubject,
    ambientSound, durations, sessions, setMode, setTimeLeft,
    toggleRunning, completeSession, setSubject, setAmbientSound, updateDuration
  } = usePomodoroStore()

  const [showSettings, setShowSettings] = useState(false)
  const [focusInput, setFocusInput] = useState(durations.focus)
  const [shortInput, setShortInput] = useState(durations.shortBreak)
  const [longInput, setLongInput] = useState(durations.longBreak)
  const [showConfetti, setShowConfetti] = useState(false)

  // Timer runner
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        if (timeLeft <= 1) {
          clearInterval(interval)
          handleTimerComplete()
        } else {
          setTimeLeft(timeLeft - 1)
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  const handleTimerComplete = () => {
    completeSession()
    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 5000)
    
    // Switch mode
    if (mode === 'focus') {
      setMode('short-break')
    } else {
      setMode('focus')
    }
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleReset = () => {
    setTimeLeft(durations[mode === 'focus' ? 'focus' : mode === 'short-break' ? 'shortBreak' : 'longBreak'] * 60)
    if (isRunning) toggleRunning()
  }

  const handleSaveSettings = () => {
    updateDuration('focus', focusInput)
    updateDuration('shortBreak', shortInput)
    updateDuration('longBreak', longInput)
    setShowSettings(false)
    handleReset()
  }

  // Calculate stroke dashoffset
  const totalSeconds = durations[mode === 'focus' ? 'focus' : mode === 'short-break' ? 'shortBreak' : 'longBreak'] * 60
  const progress = timeLeft / totalSeconds
  const radius = 150
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference * (1 - progress)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {/* CSS Confetti */}
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-50">
          {Array.from({ length: 15 }).map((_, idx) => (
            <div 
              key={idx} 
              className="absolute w-3 h-3 rounded-full animate-bounce bg-indigo-500"
              style={{ 
                left: `${idx * 7}%`, 
                top: `${Math.random() * 80}%`,
                background: idx % 3 === 0 ? '#6366f1' : idx % 3 === 1 ? '#8b5cf6' : '#10b981' 
              }} 
            />
          ))}
        </div>
      )}

      {/* Main Timer Section */}
      <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-between space-y-6">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-rose-500" /> Focus Timer
          </h2>

          <select 
            value={currentSubject}
            onChange={(e) => setSubject(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-950 text-xs text-white focus:outline-none"
          >
            <option value="General">General Study</option>
            <option value="Physics">Physics</option>
            <option value="Math">Mathematics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="CS">Computer Science</option>
          </select>
        </div>

        {/* Circular SVG Timer */}
        <div className="relative w-80 h-80 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 340 340">
            <circle cx="170" cy="170" r={radius} fill="transparent" stroke="#1e293b" strokeWidth="8" />
            <motion.circle 
              cx="170" 
              cy="170" 
              r={radius} 
              fill="transparent" 
              stroke="url(#timerGradient)" 
              strokeWidth="8" 
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5, ease: 'linear' }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute flex flex-col items-center justify-center space-y-1">
            <span className="text-5xl font-extrabold text-white tracking-tight font-mono">
              {formatTime(timeLeft)}
            </span>
            <span className="text-xs text-rose-400 font-bold uppercase tracking-widest mt-1">
              {mode === 'focus' ? 'Focus Session' : mode === 'short-break' ? 'Short Break' : 'Long Break'}
            </span>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex gap-2 p-1 bg-slate-950 rounded-xl border border-white/5 w-full max-w-sm">
          {(['focus', 'short-break', 'long-break'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setMode(t)}
              className={cn(
                "flex-1 py-2 text-xs font-bold rounded-lg transition-colors capitalize",
                mode === t ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
              )}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Controls Row */}
        <div className="flex items-center gap-6">
          <button 
            onClick={handleReset}
            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-slate-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          
          <button 
            onClick={toggleRunning}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 text-white flex items-center justify-center hover:opacity-95 transition-opacity shadow-lg shadow-rose-500/20"
          >
            {isRunning ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-1" />}
          </button>

          <button 
            onClick={handleTimerComplete}
            className="p-3 rounded-xl border border-white/5 bg-slate-950 text-slate-400 hover:text-white transition-colors"
            title="Skip Session"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sidebar Section: Ambient Sounds & Stats */}
      <div className="space-y-6">
        {/* Ambient Noise Selector */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-purple-400" /> Focus Sounds
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {ambientSounds.map((sound) => {
              const isActive = ambientSound === sound.id
              return (
                <button
                  key={sound.id}
                  onClick={() => setAmbientSound(isActive ? null : sound.id)}
                  className={cn(
                    "p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 group",
                    isActive 
                      ? "border-purple-500 bg-purple-500/10 text-white" 
                      : "border-white/5 bg-slate-950/40 text-slate-400 hover:text-white"
                  )}
                >
                  <span className="text-xl group-hover:scale-110 transition-transform">{sound.emoji}</span>
                  <span className="text-[11px] font-semibold">{sound.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Focus Stats widget */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-44">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" /> Today's Focus Progress
            </h3>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">Lvl 7</span>
          </div>

          <div className="flex justify-between items-center py-2">
            <div className="text-left">
              <span className="text-2xl font-bold text-white">{sessionsCompleted}</span>
              <span className="text-[10px] text-slate-500 block">Sessions Completed</span>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-white">{sessionsCompleted * durations.focus}m</span>
              <span className="text-[10px] text-slate-500 block">Total Focus Time</span>
            </div>
          </div>

          {/* Session circles */}
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex-1 h-2 rounded-full",
                  idx < sessionsCompleted ? "bg-gradient-to-r from-rose-500 to-purple-500" : "bg-slate-800"
                )} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
