'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import {
  Plus, RotateCcw, ChevronLeft, ChevronRight, Shuffle, Timer,
  Star, CheckCircle, XCircle, Trophy, Brain, Zap, ArrowRight,
  Play, Pause, BookOpen, Layers, BarChart3, Clock, Award,
  ChevronDown, Loader2, Check, X, HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock initial decks
const initialDecks = [
  { id: 'deck_1', name: 'Physics Mechanics', count: 12, due: 4, mastered: 8, color: 'from-indigo-500 to-blue-500' },
  { id: 'deck_2', name: 'Calculus Integrals', count: 8, due: 2, mastered: 6, color: 'from-purple-500 to-pink-500' },
  { id: 'deck_3', name: 'Data Structures & Algorithms', count: 20, due: 8, mastered: 12, color: 'from-cyan-500 to-teal-500' },
  { id: 'deck_4', name: 'Organic Chemistry', count: 15, due: 5, mastered: 10, color: 'from-rose-500 to-orange-500' },
]

// Mock flashcards
const sampleFlashcards = [
  { id: 'fc_1', deckId: 'deck_1', question: "What is Newton's Second Law?", answer: "F = ma: Force equals mass times acceleration. It states that the acceleration of an object as produced by a net force is directly proportional to the magnitude of the net force, in the same direction as the net force, and inversely proportional to the mass of the object.", hint: "F = ...", subject: "Physics" },
  { id: 'fc_2', deckId: 'deck_2', question: "What is the derivative of sin(x)?", answer: "cos(x)", hint: "Trigonometric shift", subject: "Math" },
  { id: 'fc_3', deckId: 'deck_3', question: "What is the Big O time complexity of a binary search?", answer: "O(log n) because the search space is cut in half at each step of the algorithm.", hint: "Halving the search space", subject: "CS" },
  { id: 'fc_4', deckId: 'deck_4', question: "What is the atomic number of Carbon?", answer: "6 (This means it has 6 protons in its nucleus).", hint: "Basic organic building block", subject: "Chemistry" },
  { id: 'fc_5', deckId: 'deck_1', question: "What is the formula for kinetic energy?", answer: "KE = ½mv² where m is mass and v is velocity.", hint: "Mass and velocity square", subject: "Physics" },
]

export default function FlashcardsPage() {
  const [decks, setDecks] = useState(initialDecks)
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null)
  const [currentCardIdx, setCurrentCardIdx] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showAiModal, setShowAiModal] = useState(false)
  const [aiPrompt, setAiPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Filter cards for active deck (or show all if general)
  const activeCards = selectedDeckId 
    ? sampleFlashcards.filter(c => c.deckId === selectedDeckId)
    : sampleFlashcards

  const currentCard = activeCards[currentCardIdx] || sampleFlashcards[0]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(t => t + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  const startStudying = (deckId: string) => {
    setSelectedDeckId(deckId)
    setCurrentCardIdx(0)
    setIsFlipped(false)
    setShowHint(false)
    setTimer(0)
    setIsTimerRunning(true)
  }

  const stopStudying = () => {
    setSelectedDeckId(null)
    setIsTimerRunning(false)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setShowHint(false)
    setTimeout(() => {
      setCurrentCardIdx(prev => (prev + 1) % activeCards.length)
    }, 150)
  }

  const handlePrev = () => {
    setIsFlipped(false)
    setShowHint(false)
    setTimeout(() => {
      setCurrentCardIdx(prev => (prev - 1 + activeCards.length) % activeCards.length)
    }, 150)
  }

  const handleShuffle = () => {
    setIsFlipped(false)
    setShowHint(false)
    setTimeout(() => {
      setCurrentCardIdx(Math.floor(Math.random() * activeCards.length))
    }, 150)
  }

  const handleDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
    // Spaced repetition algorithm trigger simulation
    handleNext()
  }

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0')
    const s = (secs % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleGenerateAiCards = () => {
    if (!aiPrompt.trim()) return
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowAiModal(false)
      setDecks(prev => [
        ...prev,
        {
          id: `deck_${Date.now()}`,
          name: aiPrompt.slice(0, 20) || 'AI Generated Deck',
          count: 5,
          due: 5,
          mastered: 0,
          color: 'from-amber-500 to-rose-500'
        }
      ])
      setAiPrompt('')
    }, 2000)
  }

  return (
    <div className="space-y-6">
      {/* 3D Flip Card CSS Injection */}
      <style jsx global>{`
        .flip-card {
          background-color: transparent;
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }
        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }
        .flip-card-front, .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
      `}</style>

      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" /> Flashcards
          </h1>
          <p className="text-xs text-slate-400">Master concepts using Spaced Repetition and AI flashcard generation</p>
        </div>
        {!selectedDeckId && (
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2 text-sm font-semibold rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 transition-colors flex items-center gap-1.5"
            >
              <Brain className="w-4 h-4" /> AI Generate Decks
            </button>
            <button className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 transition-opacity flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Create Deck
            </button>
          </div>
        )}
      </div>

      {!selectedDeckId ? (
        /* Deck Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {decks.map((deck) => (
            <motion.div 
              key={deck.id}
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl overflow-hidden flex flex-col justify-between h-48 group"
            >
              <div className={cn("h-2 bg-gradient-to-r shrink-0", deck.color)} />
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-md font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{deck.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{deck.count} total cards</p>
                </div>
                <div className="flex items-center gap-4 text-xs text-slate-400 font-medium">
                  <span className="text-rose-400">{deck.due} due</span>
                  <span className="text-emerald-400">{deck.mastered} mastered</span>
                </div>
                <div className="flex gap-2 pt-2">
                  <button 
                    onClick={() => startStudying(deck.id)}
                    className="flex-1 py-1.5 rounded-lg bg-indigo-600 text-white font-semibold text-xs hover:bg-indigo-500 transition-colors"
                  >
                    Study Now
                  </button>
                  <button className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-slate-950/40 text-slate-400 hover:text-white transition-colors">
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Active Study View */
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Active study top bar */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <button 
              onClick={stopStudying}
              className="text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Decks
            </button>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/5 bg-slate-900/50 text-slate-400 text-xs font-mono">
                <Timer className="w-3.5 h-3.5" />
                <span>{formatTimer(timer)}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">{currentCardIdx + 1} of {activeCards.length}</span>
            </div>
          </div>

          {/* Flip Card Section */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={cn("flip-card w-full h-80 cursor-pointer", isFlipped && "flipped")}
          >
            <div className="flip-card-inner">
              {/* Card Front */}
              <div className="flip-card-front p-8 border border-white/5 bg-slate-900/50 backdrop-blur-xl flex flex-col justify-between text-center shadow-2xl">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 font-bold uppercase tracking-wider">
                    {currentCard.subject}
                  </span>
                  <HelpCircle className="w-4 h-4 text-slate-500" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white leading-snug">{currentCard.question}</h2>
                  {showHint ? (
                    <p className="text-xs text-amber-400 italic font-medium">Hint: {currentCard.hint}</p>
                  ) : (
                    <button 
                      onClick={(e) => { e.stopPropagation(); setShowHint(true) }}
                      className="text-xs text-indigo-400 hover:underline inline-block font-semibold"
                    >
                      Show Hint
                    </button>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">Click to Flip</span>
              </div>

              {/* Card Back */}
              <div className="flip-card-back p-8 border border-white/5 bg-slate-950 flex flex-col justify-between text-center shadow-2xl">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold uppercase tracking-wider">
                    Answer
                  </span>
                  <Star className="w-4 h-4 text-slate-500" />
                </div>
                <div className="my-auto space-y-4">
                  <h3 className="text-lg md:text-xl font-semibold text-slate-200 leading-relaxed">{currentCard.answer}</h3>
                </div>
                <div className="flex justify-center gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => handleDifficulty('easy')}
                    className="px-4 py-1.5 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-bold hover:bg-emerald-500/15"
                  >
                    Easy (Green)
                  </button>
                  <button 
                    onClick={() => handleDifficulty('medium')}
                    className="px-4 py-1.5 rounded-lg border border-amber-500/20 bg-amber-500/5 text-amber-400 text-xs font-bold hover:bg-amber-500/15"
                  >
                    Medium (Yellow)
                  </button>
                  <button 
                    onClick={() => handleDifficulty('hard')}
                    className="px-4 py-1.5 rounded-lg border border-rose-500/20 bg-rose-500/5 text-rose-400 text-xs font-bold hover:bg-rose-500/15"
                  >
                    Hard (Red)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Deck Controls */}
          <div className="flex justify-center items-center gap-4">
            <button 
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleShuffle}
              className="p-3 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
              title="Shuffle"
            >
              <Shuffle className="w-4 h-4" />
            </button>
            <button 
              onClick={handleNext}
              className="p-3 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* AI Generate Cards Modal */}
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
                  <Brain className="w-5 h-5 text-indigo-400" /> AI Flashcard Generator
                </h3>
                <p className="text-xs text-slate-400">Specify any academic topic to generate study cards automatically.</p>
              </div>

              <div className="space-y-3">
                <textarea
                  placeholder="e.g. Quantum Wave Functions, Indian Constitution Amendments, Cellular Respiration"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="w-full h-24 p-3 text-sm rounded-xl border border-white/5 bg-slate-950 text-white focus:outline-none focus:border-indigo-500"
                />

                <button
                  onClick={handleGenerateAiCards}
                  disabled={isGenerating || !aiPrompt.trim()}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    'Generate optimal deck'
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
