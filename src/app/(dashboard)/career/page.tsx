'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Briefcase, FileText, Star, Clock, Target, Plus, Check, Play,
  ChevronRight, Award, Compass, Sparkles, Download, ArrowRight, User
} from 'lucide-react'
import { cn } from '@/lib/utils'

const resumeTemplates = [
  { id: 'modern', name: 'Modern Tech', desc: 'Sleek dark layout for developers.' },
  { id: 'classic', name: 'Executive Classic', desc: 'Standard business outline.' },
]

export default function CareerPage() {
  const [activeTab, setActiveTab] = useState<'resume' | 'interview' | 'aptitude'>('resume')

  // Resume builder state
  const [resumeScore, setResumeScore] = useState(78)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([
    'Increase action verbs in Project 1 description.',
    'Add your target CGPA directly in the Education details block.'
  ])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Interview Prep state
  const [selectedCompany, setSelectedCompany] = useState('Google')
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({})

  const mockInterviewQuestions = [
    { id: 1, q: "How would you design a system to handle 10,000 requests per second?", a: "To handle high traffic: 1. Deploy load balancers (e.g., Nginx, AWS ALB). 2. Integrate redis caching layers. 3. Partition database (sharding). 4. Use horizontal auto-scaling nodes." },
    { id: 2, q: "What is the difference between a process and a thread?", a: "A process is an execution program with dedicated resource space (memory, file descriptors). A thread is a lightweight execution unit inside a process that shares memory and resource registers with sibling threads." }
  ]

  const handleRunAiResumeReview = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setResumeScore(89)
      setAiSuggestions([
        'Excellent! Adding GPA and LeetCode link boosted the technical visibility.',
        'Consider aligning experience descriptions in reverse chronological format.'
      ])
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" /> Career Preparation
          </h1>
          <p className="text-xs text-slate-400">Optimize resumes, practice mock technical evaluations, and review interviews</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-0.5 bg-slate-950 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('resume')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'resume' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Resume Builder
          </button>
          <button
            onClick={() => setActiveTab('interview')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'interview' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Interview Prep
          </button>
          <button
            onClick={() => setActiveTab('aptitude')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'aptitude' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Aptitude Practice
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'resume' && (
          <motion.div 
            key="resume"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Template Selector & Input Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-400" /> Resume Template Selection
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resumeTemplates.map((temp) => (
                    <div key={temp.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 hover:bg-slate-950/80 transition-colors cursor-pointer space-y-2">
                      <span className="text-lg">📁</span>
                      <h4 className="text-xs font-bold text-white">{temp.name}</h4>
                      <p className="text-[10px] text-slate-500 leading-snug">{temp.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form details mock */}
              <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-bold text-white">Resume Information Sections</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-950/40 border border-white/5 rounded-lg">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Education</span>
                    <p className="font-semibold text-white mt-1">Bachelor of Computer Science</p>
                    <p className="text-[10px] text-slate-500">Studypilot Institute • CGPA: 8.4</p>
                  </div>
                  <div className="p-3 bg-slate-950/40 border border-white/5 rounded-lg">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Key Skillsets</span>
                    <p className="font-semibold text-white mt-1">React, Next.js, Python, TypeScript</p>
                    <p className="text-[10px] text-slate-500">Zustand, Tailwind CSS v4</p>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Resume Analyzer Sidebar */}
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-[360px]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-purple-400" /> AI Resume Review
                  </h3>
                  <span className="text-[10px] bg-purple-500/10 text-purple-400 font-bold px-2 py-0.5 rounded">AUTO</span>
                </div>

                <div className="flex justify-between items-center bg-slate-950/50 p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Score Projection</span>
                    <span className="text-2xl font-extrabold text-white">{resumeScore} / 100</span>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center font-bold text-indigo-400 text-sm">
                    {resumeScore >= 80 ? 'A' : 'B'}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Suggestions</span>
                  <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1">
                    {aiSuggestions.map((sug, idx) => (
                      <p key={idx} className="text-[10px] text-slate-300 leading-relaxed">• {sug}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-white/5">
                <button 
                  onClick={handleRunAiResumeReview}
                  disabled={isAnalyzing}
                  className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  {isAnalyzing ? 'Analyzing...' : 'Re-Run AI Assessment'}
                </button>
                <button className="w-full py-1.5 rounded-lg border border-white/5 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Download as PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'interview' && (
          <motion.div 
            key="interview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6 max-w-xl mx-auto"
          >
            {/* Interview Prep widgets */}
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <Target className="w-4 h-4 text-indigo-400" /> Interactive Company Mock
                </h3>

                <select
                  value={selectedCompany}
                  onChange={(e) => setSelectedCompany(e.target.value)}
                  className="px-3 py-1 rounded bg-slate-950 border border-white/5 text-xs text-white"
                >
                  <option value="Google">Google</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Microsoft">Microsoft</option>
                </select>
              </div>

              <div className="space-y-4">
                {mockInterviewQuestions.map((q) => (
                  <div key={q.id} className="p-4 bg-slate-950/40 rounded-xl border border-white/5 space-y-3">
                    <h4 className="text-xs font-bold text-white">Q: {q.q}</h4>
                    
                    {showAnswer[q.id] ? (
                      <p className="text-xs text-slate-300 leading-relaxed p-3 rounded-lg bg-indigo-500/5 border border-indigo-500/10">
                        {q.a}
                      </p>
                    ) : (
                      <button 
                        onClick={() => setShowAnswer(prev => ({ ...prev, [q.id]: true }))}
                        className="text-xs font-bold text-indigo-400 hover:underline"
                      >
                        Reveal Solution
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'aptitude' && (
          <motion.div 
            key="aptitude"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl text-center space-y-6 max-w-md mx-auto"
          >
            <Award className="w-12 h-12 text-yellow-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Logical & Verbal Aptitude Tests</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Practice quantitative evaluation tests structured under standard time constraints to prepare for corporate placements.
              </p>
            </div>
            <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 mx-auto transition-colors">
              Start Practice Test <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
