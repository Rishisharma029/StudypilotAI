'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Video, Mic, Upload, Clock, BookOpen, Layers,
  MessageSquare, Brain, Star, Zap, PlayCircle, ChevronRight,
  Search, Filter, CheckCircle, AlertCircle, X, HelpCircle, RefreshCw
} from 'lucide-react'
import { Youtube } from '@/components/brand-icons'
import { cn } from '@/lib/utils'

const mockTranscript = [
  { time: '0:12', text: 'Welcome everyone. Today we are exploring the foundational concepts of electrostatics.' },
  { time: '0:45', text: 'Let\'s write down Coulomb\'s law: Force is equal to k times q1 times q2 divided by r squared.' },
  { time: '1:30', text: 'This means that the force decreases rapidly as the distance between charges increases.' },
  { time: '2:15', text: 'Next week, we will discuss electrical fields and potential differences.' },
]

export default function LectureAiPage() {
  const [urlInput, setUrlInput] = useState('')
  const [status, setStatus] = useState<'upload' | 'processing' | 'results'>('upload')
  const [activeTab, setActiveTab] = useState<'transcript' | 'notes' | 'summary' | 'flashcards'>('transcript')
  const [stepIndex, setStepIndex] = useState(0)

  const steps = [
    'Transcribing audio...',
    'Extracting key concepts...',
    'Generating notes...',
    'Creating flashcards...'
  ]

  const handleStartAnalysis = () => {
    setStatus('processing')
    setStepIndex(0)
    
    // Simulate processing steps sequentially
    const interval = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1
        } else {
          clearInterval(interval)
          setStatus('results')
          return prev
        }
      })
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Video className="w-6 h-6 text-indigo-400" /> Lecture Intelligence
        </h1>
        <p className="text-xs text-slate-400">Convert lecture recordings or YouTube URLs into structured study notes and quizzes</p>
      </div>

      <AnimatePresence mode="wait">
        {status === 'upload' && (
          <motion.div 
            key="upload"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Drag and Drop Zone */}
            <div className="p-8 rounded-2xl border border-dashed border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-colors flex flex-col items-center justify-center text-center space-y-4 min-h-[280px]">
              <Upload className="w-10 h-10 text-indigo-400 animate-bounce" />
              <div className="space-y-1.5">
                <h3 className="text-sm font-bold text-white">Upload Audio / Video Recording</h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">Drag and drop MP3, MP4, or WAV files here, or click to browse files.</p>
              </div>
              <button 
                onClick={handleStartAnalysis}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors"
              >
                Browse Files
              </button>
            </div>

            {/* YouTube link import */}
            <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between min-h-[280px]">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Youtube className="w-5 h-5 text-rose-500" />
                  <h3 className="text-sm font-bold text-white">Paste YouTube Link</h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Provide any educational lecture link from YouTube, and we will translate and transcribe it using AI.
                </p>
                <input 
                  type="text" 
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-xs focus:outline-none"
                />
              </div>

              <button 
                onClick={handleStartAnalysis}
                disabled={!urlInput.trim()}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold disabled:opacity-50 transition-opacity"
              >
                Import & Analyze Video
              </button>
            </div>
          </motion.div>
        )}

        {status === 'processing' && (
          <motion.div 
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl text-center space-y-6 max-w-md mx-auto"
          >
            <RefreshCw className="w-10 h-10 text-indigo-400 mx-auto animate-spin" />
            
            <div className="space-y-2">
              <h3 className="text-md font-bold text-white">{steps[stepIndex]}</h3>
              <p className="text-xs text-slate-400">Please wait. AI is transcribing and structuring your lecture notes...</p>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase">
                <span>Progress</span>
                <span>{Math.round(((stepIndex + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full transition-all duration-500" style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }} />
              </div>
            </div>
          </motion.div>
        )}

        {status === 'results' && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Header control */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <button 
                onClick={() => setStatus('upload')}
                className="text-xs font-bold text-slate-500 hover:text-white"
              >
                ← Analyze another video
              </button>
              
              <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5">
                {(['transcript', 'notes', 'summary', 'flashcards'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTab(t)}
                    className={cn(
                      "px-3 py-1.5 text-[10px] font-bold rounded transition-colors capitalize",
                      activeTab === t ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Render Tab Contents */}
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl min-h-[250px]">
              {activeTab === 'transcript' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white">Interactive Lecture Transcript</h3>
                  <div className="space-y-3">
                    {mockTranscript.map((tr, idx) => (
                      <div key={idx} className="flex gap-4 items-start text-xs leading-relaxed">
                        <span className="font-mono text-indigo-400 font-bold shrink-0 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                          {tr.time}
                        </span>
                        <p className="text-slate-300">{tr.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <div className="space-y-4 text-xs leading-relaxed text-slate-300">
                  <h3 className="text-sm font-bold text-white">AI-Generated Study Notes</h3>
                  <div className="space-y-3 font-mono p-4 rounded-xl border border-white/5 bg-slate-950/40">
                    <p className="font-bold text-white"># Electrostatics Introduction</p>
                    <p>• Electrostatics deals with static electric charges and their interactions.</p>
                    <p className="font-bold text-white">## Coulomb's Law Formula</p>
                    <p>• Mathematically: F = k * (q1 * q2) / r²</p>
                    <p>• F represents force, q represents charges, and r represents distance.</p>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="space-y-3 text-xs leading-relaxed text-slate-300 max-w-xl">
                  <h3 className="text-sm font-bold text-white">AI Executive Summary</h3>
                  <p>
                    This lecture covered the fundamentals of electrostatics, prioritizing Coulomb's Law and distance variables. The equations predict how forces expand or decay across different dimensions. Focus metrics show high alignment with test queries in JEE.
                  </p>
                </div>
              )}

              {activeTab === 'flashcards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-center space-y-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">PHYSICS</span>
                    <h4 className="text-xs font-bold text-white">What is Coulomb's Law?</h4>
                    <p className="text-[10px] text-slate-500">F = k * q1 * q2 / r²</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 text-center space-y-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold">PHYSICS</span>
                    <h4 className="text-xs font-bold text-white">How does force decay with distance?</h4>
                    <p className="text-[10px] text-slate-500">Inversely proportional to distance squared (1/r²)</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
