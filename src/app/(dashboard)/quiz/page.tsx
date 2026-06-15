'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  CreditCard, Plus, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Timer,
  Star, CheckCircle, XCircle, Trophy, Target, Brain, Zap, ArrowRight,
  Play, Pause, BookOpen, Layers, BarChart3, Clock, Award,
  ChevronDown, Loader2, Check, X
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock Physics questions
const sampleQuestions = [
  {
    id: 1,
    question: "What is the speed of light in a vacuum?",
    options: ["3×10⁸ m/s", "3×10⁶ m/s", "3×10⁴ m/s", "3×10² m/s"],
    correct: "3×10⁸ m/s",
    explanation: "The speed of light in a vacuum is exactly 299,792,458 meters per second, which is commonly rounded to 3×10⁸ m/s."
  },
  {
    id: 2,
    question: "Which of Newton's laws states that for every action, there is an equal and opposite reaction?",
    options: ["First Law", "Second Law", "Third Law", "Law of Gravitation"],
    correct: "Third Law",
    explanation: "Newton's Third Law states that when one body exerts a force on a second body, the second body simultaneously exerts a force equal in magnitude and opposite in direction on the first body."
  },
  {
    id: 3,
    question: "What is the unit of electric resistance?",
    options: ["Ampere", "Volt", "Ohm", "Watt"],
    correct: "Ohm",
    explanation: "Electric resistance is measured in Ohms, represented by the Greek letter Omega (Ω)."
  },
  {
    id: 4,
    question: "What is the acceleration due to gravity on Earth's surface?",
    options: ["9.8 m/s²", "8.9 m/s²", "10.5 m/s²", "7.4 m/s²"],
    correct: "9.8 m/s²",
    explanation: "The standard acceleration due to gravity on Earth is approximately 9.80665 m/s² (commonly simplified to 9.8 m/s²)."
  },
  {
    id: 5,
    question: "Which particle is responsible for carrying a negative electric charge?",
    options: ["Proton", "Neutron", "Electron", "Positron"],
    correct: "Electron",
    explanation: "Electrons are subatomic particles with a negative elementary electric charge."
  }
]

export default function QuizPage() {
  const [view, setView] = useState<'create' | 'active' | 'results' | 'review'>('create')
  
  // Quiz parameters
  const [subject, setSubject] = useState('Physics')
  const [topic, setTopic] = useState('')
  const [difficulty, setDifficulty] = useState('Medium')
  const [questionCount, setQuestionCount] = useState(5)
  const [source, setSource] = useState('From AI')
  const [isGenerating, setIsGenerating] = useState(false)

  // Active quiz state
  const [questions, setQuestions] = useState(sampleQuestions)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [quizTimer, setQuizTimer] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (view === 'active' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 1) {
            clearInterval(timer)
            handleFinishQuiz()
            return 0
          }
          return t - 1
        })
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [view, timeLeft])

  const handleStartQuiz = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setView('active')
      setCurrentIdx(0)
      setSelectedAnswers({})
      setTimeLeft(questionCount * 60) // 1 minute per question
    }, 1500)
  }

  const handleSelectAnswer = (option: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questions[currentIdx].id]: option
    }))
  }

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1)
    } else {
      handleFinishQuiz()
    }
  }

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1)
    }
  }

  const handleFinishQuiz = () => {
    setView('results')
  }

  const calculateScore = () => {
    let score = 0
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1
      }
    })
    return score
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const currentQuestion = questions[currentIdx]
  const score = calculateScore()
  const percentage = Math.round((score / questions.length) * 100)

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* CSS Confetti Animation helper */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10vh) rotate(0deg); }
          100% { transform: translateY(110vh) rotate(720deg); }
        }
        .confetti-piece {
          position: fixed;
          top: -10px;
          width: 8px;
          height: 15px;
          background: #6366f1;
          animation: confetti-fall 3s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-indigo-400" /> Quiz Generator
        </h1>
        <p className="text-xs text-slate-400">Evaluate your learning using custom-generated AI testing widgets</p>
      </div>

      {view === 'create' && (
        /* Quiz Configuration Screen */
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Computer Science">Computer Science</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Topic / Chapter</label>
              <input 
                type="text" 
                placeholder="e.g. Thermodynamics, Kinematics, Integration"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Difficulty</label>
              <div className="flex gap-2">
                {['Easy', 'Medium', 'Hard'].map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setDifficulty(diff)}
                    className={cn(
                      "flex-1 py-2 text-xs font-bold rounded-xl border transition-colors",
                      difficulty === diff 
                        ? "border-indigo-500/30 bg-indigo-500/10 text-indigo-400" 
                        : "border-white/5 bg-slate-950 text-slate-400 hover:text-white"
                    )}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source Material</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="From AI">AI Generated (Full Database)</option>
                <option value="From Notes">My Uploaded Notes</option>
                <option value="From PDF">My Uploaded PDFs</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
              <span>Question Count</span>
              <span className="text-indigo-400 font-bold">{questionCount} Questions</span>
            </div>
            <input 
              type="range" 
              min={5} 
              max={30} 
              step={5}
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Quiz...
              </>
            ) : (
              <>
                Start Custom Quiz <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.div>
      )}

      {view === 'active' && currentQuestion && (
        /* Active Quiz Screen */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold uppercase tracking-wider">
                {subject} — {difficulty}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-slate-900/50 text-slate-400 text-xs font-mono">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">Question {currentIdx + 1} of {questions.length}</span>
            </div>
          </div>

          <motion.div 
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-6 shadow-xl"
          >
            <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed">
              {currentIdx + 1}. {currentQuestion.question}
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {currentQuestion.options.map((option) => {
                const isSelected = selectedAnswers[currentQuestion.id] === option
                return (
                  <button
                    key={option}
                    onClick={() => handleSelectAnswer(option)}
                    className={cn(
                      "w-full text-left p-4 rounded-xl border text-sm font-semibold transition-all flex items-center justify-between group",
                      isSelected 
                        ? "border-indigo-500 bg-indigo-500/10 text-white" 
                        : "border-white/5 bg-slate-950/40 text-slate-300 hover:bg-slate-950/80 hover:border-slate-700"
                    )}
                  >
                    <span>{option}</span>
                    <span className={cn(
                      "w-4 h-4 rounded-full border flex items-center justify-center text-[10px]",
                      isSelected ? "border-indigo-500 bg-indigo-500 text-white" : "border-slate-700 group-hover:border-slate-500"
                    )}>
                      {isSelected && "✓"}
                    </span>
                  </button>
                )
              })}
            </div>
          </motion.div>

          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 rounded-xl border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors disabled:opacity-30 disabled:pointer-events-none text-xs font-bold flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={!selectedAnswers[currentQuestion.id]}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-50 disabled:pointer-events-none text-xs font-bold flex items-center gap-1"
            >
              {currentIdx === questions.length - 1 ? 'Finish Test' : 'Next'} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {view === 'results' && (
        /* Results View */
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl text-center space-y-6"
        >
          {/* Confetti simulation (CSS only) */}
          <div className="pointer-events-none">
            {Array.from({ length: 15 }).map((_, idx) => (
              <div 
                key={idx} 
                className="confetti-piece" 
                style={{ 
                  left: `${idx * 7}%`, 
                  animationDelay: `${idx * 0.15}s`, 
                  background: idx % 3 === 0 ? '#6366f1' : idx % 3 === 1 ? '#8b5cf6' : '#eab308' 
                }} 
              />
            ))}
          </div>

          <div className="space-y-2">
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-2 animate-bounce" />
            <h2 className="text-2xl font-bold text-white">Quiz Completed!</h2>
            <p className="text-xs text-slate-400">Excellent effort! Here is your performance overview.</p>
          </div>

          {/* SVG Gauge */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
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
                strokeDashoffset={251.2 * (1 - (percentage / 100))}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold text-white">{percentage}%</span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase">{score} / {questions.length} Correct</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto pt-4">
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-xs text-slate-500 block">Grade</span>
              <span className="text-lg font-bold text-white">{percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : 'C'}</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-xs text-slate-500 block">Time Taken</span>
              <span className="text-lg font-bold text-white">01:42</span>
            </div>
            <div className="p-3 bg-slate-950/40 rounded-xl border border-white/5">
              <span className="text-xs text-slate-500 block">Accuracy</span>
              <span className="text-lg font-bold text-white">{percentage}%</span>
            </div>
          </div>

          <div className="flex gap-3 pt-4 justify-center">
            <button 
              onClick={() => setView('review')}
              className="px-5 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-slate-300 font-semibold text-xs hover:text-white transition-colors"
            >
              Review Explanations
            </button>
            <button 
              onClick={() => setView('create')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors"
            >
              Create New Test
            </button>
          </div>
        </motion.div>
      )}

      {view === 'review' && (
        /* Explanations Review View */
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <button 
              onClick={() => setView('results')}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Results
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const userAnswer = selectedAnswers[q.id]
              const isCorrect = userAnswer === q.correct
              return (
                <div key={q.id} className="p-6 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Question {idx + 1}</span>
                    <span className={cn(
                      "text-[10px] px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1",
                      isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                    )}>
                      {isCorrect ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3.5 h-3.5" />}
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>

                  <h3 className="text-md font-bold text-white">{q.question}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
                      <span className="text-slate-500 block">Your Answer:</span>
                      <span className={cn("font-semibold", isCorrect ? "text-emerald-400" : "text-rose-400")}>{userAnswer || "No Answer"}</span>
                    </div>
                    {!isCorrect && (
                      <div className="p-3 bg-slate-950/40 rounded-lg border border-white/5">
                        <span className="text-slate-500 block">Correct Answer:</span>
                        <span className="font-semibold text-emerald-400">{q.correct}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-xs leading-relaxed text-slate-300">
                    <p className="font-semibold text-white mb-1">Explanation:</p>
                    {q.explanation}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
