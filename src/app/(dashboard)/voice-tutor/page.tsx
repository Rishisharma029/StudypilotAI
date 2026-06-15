'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {
  Mic, MicOff, Volume2, VolumeX, Play, Pause, Brain, 
  Sparkles, Globe, Compass, RefreshCw, X, ChevronRight, Settings
} from 'lucide-react'
import { cn } from '@/lib/utils'

const modes = [
  { id: 'teacher', name: 'Teacher Mode', emoji: '👨‍🏫', desc: 'Explains concepts comprehensively like a professor.' },
  { id: 'beginner', name: 'Beginner Mode', emoji: '👶', desc: 'Uses simple language, metaphors and analogies.' },
  { id: 'exam', name: 'Exam Mode', emoji: '📚', desc: 'Offers rapid definitions and revision bullets.' },
  { id: 'interview', name: 'Interview Mode', emoji: '🎯', desc: 'Simulates interactive Q&A evaluations.' },
]

const voices = [
  { id: 'alex', name: 'Professor Alex (UK)' },
  { id: 'priya', name: 'Dr. Priya (IN)' },
  { id: 'sarah', name: 'Sarah (US)' },
]

export default function VoiceTutorPage() {
  const [activeMode, setActiveMode] = useState('teacher')
  const [activeSubject, setActiveSubject] = useState('Physics')
  const [language, setLanguage] = useState('English')
  const [isListening, setIsListening] = useState(false)
  const [speechSpeed, setSpeechSpeed] = useState(1.0)
  const [selectedVoice, setSelectedVoice] = useState('priya')
  const [ambientNoise, setAmbientNoise] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponseText, setAiResponseText] = useState('')
  const [history, setHistory] = useState<Array<{ id: number; role: 'user' | 'assistant'; text: string; duration?: string }>>([
    { id: 1, role: 'user', text: 'Explain Heisenberg\'s uncertainty principle in simple terms.' },
    { id: 2, role: 'assistant', text: 'Think of it like photographing a fast car: you can either snap a clear picture of its position, or blur it to show motion, but never both at once.', duration: '0:14' }
  ])

  // Waveform state
  const [waveHeights, setWaveHeights] = useState([12, 28, 42, 28, 12])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isListening) {
      interval = setInterval(() => {
        setWaveHeights(Array.from({ length: 6 }, () => Math.floor(Math.random() * 40) + 10))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isListening])

  const handleStartListening = () => {
    setIsListening(true)
    setTranscript('Listening to voice...')
    setAiResponseText('')

    setTimeout(() => {
      setIsListening(false)
      const mockUserQuery = "What is the speed of light?"
      setTranscript(mockUserQuery)
      
      // Add user speech to history
      setHistory(prev => [...prev, { id: Date.now(), role: 'user', text: mockUserQuery }])

      // AI generating response
      setTimeout(() => {
        const reply = "The speed of light in vacuum is exactly 299,792,458 meters per second. That is approximately 300,000 kilometers per second, or 186,000 miles per second!"
        setAiResponseText(reply)
        setHistory(prev => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply, duration: '0:10' }])
      }, 1200)

    }, 3000)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {/* Column 1 & 2: Main Voice Portal */}
      <div className="lg:col-span-2 space-y-6">
        {/* Modes selectors */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {modes.map((mode) => {
            const isActive = activeMode === mode.id
            return (
              <button
                key={mode.id}
                onClick={() => setActiveMode(mode.id)}
                className={cn(
                  "p-4 rounded-xl border text-left flex flex-col justify-between h-32 transition-all relative group",
                  isActive 
                    ? "border-indigo-500 bg-indigo-500/10 text-white" 
                    : "border-white/5 bg-slate-900/30 text-slate-400 hover:text-white"
                )}
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{mode.emoji}</span>
                <div>
                  <h4 className="text-xs font-bold text-white">{mode.name}</h4>
                  <p className="text-[9px] text-slate-500 mt-1 line-clamp-2 leading-snug">{mode.desc}</p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Pulsing Voice Sphere */}
        <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 min-h-[340px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Glowing Animated Button */}
          <div className="relative flex items-center justify-center">
            <AnimatePresence>
              {isListening && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                  exit={{ opacity: 0 }}
                  transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                  className="absolute w-28 h-28 bg-rose-500/20 rounded-full"
                />
              )}
            </AnimatePresence>

            <button
              onClick={handleStartListening}
              disabled={isListening}
              className={cn(
                "relative z-10 w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all",
                isListening 
                  ? "bg-rose-600 text-white shadow-rose-500/20" 
                  : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-95 shadow-indigo-500/20"
              )}
            >
              {isListening ? (
                <Mic className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <div className="text-center space-y-1.5 z-10">
            <h3 className="text-md font-bold text-white">
              {isListening ? 'Listening...' : 'Tap Mic to Start Speaking'}
            </h3>
            <p className="text-xs text-slate-400">Tutor responds in real-time vocal synthesized speech</p>
          </div>

          {/* Transcript Area */}
          {(transcript || aiResponseText) && (
            <div className="w-full max-w-md bg-slate-950/40 border border-white/5 p-4 rounded-xl space-y-3 text-xs leading-relaxed text-slate-300">
              {transcript && (
                <div>
                  <span className="text-indigo-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">You said:</span>
                  <p className="italic">"{transcript}"</p>
                </div>
              )}
              {aiResponseText && (
                <div className="pt-2 border-t border-white/5">
                  <span className="text-purple-400 font-bold block uppercase tracking-wider text-[9px] mb-0.5">Tutor:</span>
                  <p>{aiResponseText}</p>
                </div>
              )}
            </div>
          )}

          {/* Custom voice bars */}
          {isListening && (
            <div className="flex items-end gap-1.5 h-10">
              {waveHeights.map((val, idx) => (
                <div 
                  key={idx} 
                  className="w-1.5 bg-rose-500 rounded-t-full transition-all duration-100" 
                  style={{ height: `${val}px` }} 
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Column 3: Settings & Speech History */}
      <div className="space-y-6">
        {/* Settings Panel */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-purple-400" /> Vocal Configuration
          </h3>

          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-widest block">Voice Accent</span>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full p-2 rounded bg-slate-950 border border-white/5 text-white"
              >
                {voices.map(voice => (
                  <option key={voice.id} value={voice.id}>{voice.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold text-slate-400 uppercase tracking-widest block">Language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 rounded bg-slate-950 border border-white/5 text-white"
              >
                {['English', 'Hindi', 'Tamil', 'Telugu', 'Bengali'].map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-400 uppercase tracking-widest">
                <span>Speed Rate</span>
                <span className="text-indigo-400">{speechSpeed}x</span>
              </div>
              <input 
                type="range" 
                min={0.7} 
                max={2.0} 
                step={0.1}
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Vocal Sessions History */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-emerald-400" /> Exchange History
          </h3>

          <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
            {history.map((hist, idx) => (
              <div key={hist.id} className="p-3 bg-slate-950/40 rounded-xl border border-white/5 text-xs">
                <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                  <span>{hist.role === 'user' ? 'You' : 'Tutor'}</span>
                  {hist.duration && <span>{hist.duration}</span>}
                </div>
                <p className="text-slate-300 leading-relaxed">{hist.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
