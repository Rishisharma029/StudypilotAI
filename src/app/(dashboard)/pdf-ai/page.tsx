'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect, useCallback } from 'react'
import {
  FileText, Upload, Mic, MicOff, Play, Pause, Volume2, VolumeX,
  Brain, BookOpen, Trophy, Target, RefreshCw, Zap, Clock, Star,
  Download, Copy, ChevronDown, Plus, X, Check, ChevronRight,
  Sparkles, MessageSquare, Link, Quote, FileSearch, Globe
} from 'lucide-react'
import { cn, formatFileSize, generateId } from '@/lib/utils'

// ─── Types ───────────────────────────────────────────────────────────────────
interface UploadedFile {
  id: string
  name: string
  size: number
  type: 'pdf' | 'docx' | 'pptx' | 'image'
  pages?: number
  active: boolean
  processingDone: boolean
}

interface ChatMessage {
  id: string
  role: 'user' | 'ai'
  content: string
  sources?: string[]
  timestamp: Date
}

interface FlashCard {
  front: string
  back: string
  flipped: boolean
}

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_SUMMARY = `This document provides a comprehensive analysis of **Quantum Mechanics** and its modern applications. The research covers foundational principles including wave-particle duality, the uncertainty principle, and quantum entanglement.

**Key findings** demonstrate that quantum computing systems can achieve computational advantages over classical systems for specific problem classes, particularly in cryptography, optimization, and simulation of quantum systems.

The paper concludes with implications for next-generation technologies including quantum communication networks and fault-tolerant quantum computers expected by 2030.`

const MOCK_KEY_POINTS = [
  'Wave-particle duality is a fundamental property of quantum systems, demonstrated by the double-slit experiment',
  "Heisenberg's uncertainty principle states that position and momentum cannot both be precisely known simultaneously",
  'Quantum entanglement allows instant correlation between particles regardless of distance, violating classical locality',
  'Schrödinger equation describes the time evolution of quantum states with perfect mathematical precision',
  'Quantum superposition enables qubits to represent both 0 and 1 simultaneously, enabling exponential speedup',
  "Bell's theorem proves that no local hidden variable theory can reproduce all quantum predictions",
  'Quantum decoherence explains why macroscopic objects do not exhibit quantum behavior in ordinary conditions',
  'Quantum tunneling allows particles to pass through energy barriers classically forbidden regions',
  'The Copenhagen interpretation remains the most widely adopted framework among physicists worldwide',
  'Topological quantum computing uses anyons to achieve inherently fault-tolerant quantum gates',
]

const MOCK_FLASHCARDS: FlashCard[] = [
  { front: 'What is quantum entanglement?', back: 'A quantum phenomenon where two particles become correlated such that measurement of one instantly affects the other, regardless of distance.', flipped: false },
  { front: "State Heisenberg's Uncertainty Principle", back: 'ΔxΔp ≥ ℏ/2 — The product of uncertainties in position and momentum is always at least ℏ/2.', flipped: false },
  { front: 'Define superposition in quantum mechanics', back: 'A quantum system exists in multiple states simultaneously until measured, at which point it collapses to a definite state.', flipped: false },
  { front: 'What is quantum decoherence?', back: 'The process by which a quantum system loses its quantum properties through interaction with the environment, transitioning to classical behavior.', flipped: false },
]

const MOCK_QUIZ = [
  {
    question: 'Which experiment first demonstrated wave-particle duality?',
    options: ['Rutherford scattering', 'Double-slit experiment', 'Photoelectric effect', 'Stern-Gerlach experiment'],
    correct: 1,
    selected: null as number | null,
  },
  {
    question: 'What does a qubit represent in quantum computing?',
    options: ['A classical bit', 'A superposition of 0 and 1', 'An entangled state', 'A quantum gate'],
    correct: 1,
    selected: null as number | null,
  },
  {
    question: 'Which interpretation of quantum mechanics uses many parallel universes?',
    options: ['Copenhagen', 'Pilot Wave', 'Many-Worlds', 'Relational'],
    correct: 2,
    selected: null as number | null,
  },
]

const MOCK_CHAT: ChatMessage[] = [
  {
    id: '1',
    role: 'ai',
    content: 'Hello! I\'ve analyzed your documents. You can ask me anything about the content across all uploaded files. I\'ll cite specific sources for each answer.',
    timestamp: new Date(),
  },
]

const TABS = ['Summary', 'Key Points', 'Flashcards', 'Quiz', 'Mind Map', 'Citations'] as const
type Tab = typeof TABS[number]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function FlipCardComponent({ card, index }: { card: FlashCard; index: number }) {
  const [flipped, setFlipped] = useState(false)
  return (
    <motion.div
      className="flip-card h-40 cursor-pointer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setFlipped(f => !f)}
    >
      <div className={cn('flip-card-inner w-full h-full', flipped && 'flipped')}
           style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d', transition: 'transform 0.6s', position: 'relative' }}>
        <div className="flip-card-front glass-card p-4 flex flex-col items-center justify-center text-center h-full" style={{ backfaceVisibility: 'hidden', position: 'absolute', inset: 0 }}>
          <BookOpen className="w-6 h-6 text-indigo-400 mb-2" />
          <p className="text-sm font-medium text-white/90">{card.front}</p>
          <p className="text-xs text-white/40 mt-2">Click to reveal</p>
        </div>
        <div className="flip-card-back glass-card p-4 flex flex-col items-center justify-center text-center h-full"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', position: 'absolute', inset: 0, background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)' }}>
          <p className="text-sm text-white/90 leading-relaxed">{card.back}</p>
        </div>
      </div>
    </motion.div>
  )
}

function MindMapNode({ label, children, depth = 0 }: { label: string; children?: { label: string; children?: { label: string }[] }[]; depth?: number }) {
  const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b']
  const color = colors[depth % colors.length]
  return (
    <div className="flex items-start gap-3">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full mt-1.5 flex-shrink-0" style={{ background: color, boxShadow: `0 0 8px ${color}80` }} />
        {children && <div className="w-px flex-1 mt-1" style={{ background: `${color}40`, minHeight: '24px' }} />}
      </div>
      <div className="flex-1 pb-2">
        <div className="glass-card px-3 py-1.5 inline-block mb-2" style={{ borderColor: `${color}40` }}>
          <span className="text-sm font-medium" style={{ color }}>{label}</span>
        </div>
        {children && (
          <div className="ml-4 border-l pl-4" style={{ borderColor: `${color}30` }}>
            {children.map((child, i) => (
              <MindMapNode key={i} label={child.label} children={child.children as any} depth={depth + 1} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PDFAIPage() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [activeFileId, setActiveFileId] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<Tab>('Summary')
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(MOCK_CHAT)
  const [chatInput, setChatInput] = useState('')
  const [quizState, setQuizState] = useState(MOCK_QUIZ)
  const [copiedCitation, setCopiedCitation] = useState<string | null>(null)
  const [citationForm, setCitationForm] = useState({ title: 'Quantum Mechanics: Principles and Applications', author: 'Griffiths, D.J.', year: '2023', publisher: 'Cambridge University Press' })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatEndRef = useRef<HTMLDivElement>(null)

  const activeFile = files.find(f => f.id === activeFileId)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const processFile = useCallback((file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() as UploadedFile['type']
    const typeMap: Record<string, UploadedFile['type']> = { pdf: 'pdf', docx: 'docx', pptx: 'pptx', png: 'image', jpg: 'image', jpeg: 'image' }
    const newFile: UploadedFile = {
      id: generateId(),
      name: file.name,
      size: file.size,
      type: typeMap[ext] ?? 'pdf',
      pages: Math.floor(Math.random() * 40) + 5,
      active: true,
      processingDone: false,
    }
    setFiles(prev => [...prev, newFile])
    setIsProcessing(true)
    setTimeout(() => {
      setFiles(prev => prev.map(f => f.id === newFile.id ? { ...f, processingDone: true } : f))
      setActiveFileId(newFile.id)
      setIsProcessing(false)
    }, 1800)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    Array.from(e.dataTransfer.files).forEach(processFile)
  }, [processFile])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) Array.from(e.target.files).forEach(processFile)
  }

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id))
    if (activeFileId === id) setActiveFileId(files.find(f => f.id !== id)?.id ?? null)
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    const userMsg: ChatMessage = { id: generateId(), role: 'user', content: chatInput, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMsg])
    setChatInput('')
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: generateId(), role: 'ai',
        content: `Based on your uploaded documents, I found relevant information about "${chatInput}". The concept appears in the main document on pages 12-15, where the author discusses the quantum entanglement phenomenon and its implications for modern physics research.`,
        sources: [activeFile?.name ?? 'Document 1', 'Page 12-15'],
        timestamp: new Date(),
      }
      setChatMessages(prev => [...prev, aiMsg])
    }, 1200)
  }

  const handleQuizAnswer = (qIdx: number, oIdx: number) => {
    setQuizState(prev => prev.map((q, i) => i === qIdx ? { ...q, selected: oIdx } : q))
  }

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopiedCitation(key)
    setTimeout(() => setCopiedCitation(null), 2000)
  }

  const generateCitations = () => ({
    apa: `${citationForm.author} (${citationForm.year}). ${citationForm.title}. ${citationForm.publisher}.`,
    mla: `${citationForm.author}. ${citationForm.title}. ${citationForm.publisher}, ${citationForm.year}.`,
    chicago: `${citationForm.author}. ${citationForm.year}. "${citationForm.title}." ${citationForm.publisher}.`,
  })

  const fileTypeColor = (t: UploadedFile['type']) => ({ pdf: 'badge-orange', docx: 'badge-indigo', pptx: 'badge-purple', image: 'badge-cyan' }[t])

  return (
    <div className="min-h-screen p-6">
      {/* ── Header ── */}
      <motion.div className="page-header mb-6" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="page-title flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <FileSearch className="w-5 h-5 text-white" />
            </span>
            PDF Intelligence
          </h1>
          <p className="text-sm text-white/50 mt-1">Upload documents and let AI extract insights, generate quizzes, flashcards & citations</p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button className="btn-ghost flex items-center gap-2 text-sm py-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Download className="w-4 h-4" /> Export All
          </motion.button>
          <motion.button className="btn-primary flex items-center gap-2 text-sm py-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Sparkles className="w-4 h-4" /> AI Analyze
          </motion.button>
        </div>
      </motion.div>

      <div className="flex gap-6">
        {/* ── Left Sidebar: Files ── */}
        <motion.div className="w-72 flex-shrink-0 flex flex-col gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <div className="glass-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-white/80">Documents</span>
              <span className="badge-indigo">{files.length} files</span>
            </div>
            <AnimatePresence>
              {files.length === 0 ? (
                <p className="text-xs text-white/30 text-center py-4">No files uploaded yet</p>
              ) : (
                <div className="flex flex-col gap-2">
                  {files.map(file => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      onClick={() => setActiveFileId(file.id)}
                      className={cn(
                        'flex items-center gap-2 p-3 rounded-xl cursor-pointer transition-all duration-200 group',
                        activeFileId === file.id
                          ? 'bg-indigo-500/15 border border-indigo-500/30'
                          : 'hover:bg-white/5 border border-transparent'
                      )}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: activeFileId === file.id ? 'rgba(99,102,241,0.2)' : 'rgba(255,255,255,0.06)' }}>
                        <FileText className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/90 truncate">{file.name}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={cn(fileTypeColor(file.type), 'text-[10px] px-1.5 py-0.5')}>
                            {file.type.toUpperCase()}
                          </span>
                          <span className="text-[10px] text-white/30">{formatFileSize(file.size)}</span>
                        </div>
                        {!file.processingDone && (
                          <div className="progress-bar mt-1">
                            <motion.div className="progress-fill" animate={{ width: ['20%', '90%'] }} transition={{ duration: 1.6, ease: 'easeOut' }} />
                          </div>
                        )}
                      </div>
                      <button onClick={e => { e.stopPropagation(); removeFile(file.id) }}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
            <motion.button
              className="mt-3 w-full btn-ghost text-xs py-2 flex items-center justify-center gap-2"
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-3.5 h-3.5" /> Add More Files
            </motion.button>
          </div>

          {/* OCR Section */}
          <div className="glass-card p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileSearch className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white/80">OCR Scanner</span>
            </div>
            <p className="text-xs text-white/40 mb-3">Extract text from handwritten notes or images</p>
            <div className="border border-dashed border-white/15 rounded-xl p-4 text-center cursor-pointer hover:border-cyan-500/40 transition-colors">
              <Upload className="w-5 h-5 text-white/30 mx-auto mb-1" />
              <p className="text-xs text-white/30">Drop image here</p>
            </div>
          </div>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="flex-1 flex flex-col gap-5">
          {/* Upload Zone */}
          <AnimatePresence>
            {files.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'relative cursor-pointer rounded-3xl p-16 flex flex-col items-center justify-center text-center transition-all duration-300',
                  isDragging ? 'scale-[1.02]' : ''
                )}
                style={{
                  background: isDragging ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                  border: `2px dashed ${isDragging ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.12)'}`,
                  boxShadow: isDragging ? '0 0 40px rgba(99,102,241,0.15) inset' : 'none',
                }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.2))', border: '1px solid rgba(99,102,241,0.3)' }}
                >
                  <FileText className="w-10 h-10 text-indigo-400" />
                </motion.div>
                <h3 className="text-xl font-bold gradient-text mb-2">Drop your documents here</h3>
                <p className="text-white/50 text-sm mb-6">PDFs, DOCX, PPTX, images — or click to browse</p>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  {['PDF', 'DOCX', 'PPTX', 'PNG', 'JPG'].map(fmt => (
                    <span key={fmt} className="badge-indigo">{fmt}</span>
                  ))}
                </div>
                <p className="text-xs text-white/30 mt-4">Multi-file upload supported • Max 50MB per file</p>
                {isDragging && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="absolute inset-0 rounded-3xl flex items-center justify-center"
                    style={{ background: 'rgba(99,102,241,0.05)' }}>
                    <p className="text-indigo-300 font-bold text-xl">Release to upload</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Upload area (compact) when files exist */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-2xl p-4 flex items-center gap-4 transition-all duration-300"
              style={{
                background: isDragging ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px dashed ${isDragging ? 'rgba(99,102,241,0.6)' : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
                <Upload className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white/70">Drop more files or click to browse</p>
                <p className="text-xs text-white/30">PDF, DOCX, PPTX, images supported</p>
              </div>
              {isProcessing && (
                <div className="ml-auto flex items-center gap-2">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                    <RefreshCw className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                  <span className="text-xs text-indigo-400">Processing…</span>
                </div>
              )}
            </motion.div>
          )}

          {/* Analysis tabs */}
          <AnimatePresence>
            {files.some(f => f.processingDone) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden">
                {/* Tab bar */}
                <div className="flex border-b border-white/08 overflow-x-auto scrollbar-hide">
                  {TABS.map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={cn(
                        'px-5 py-3.5 text-sm font-medium whitespace-nowrap transition-all duration-200 relative',
                        activeTab === tab ? 'text-indigo-300' : 'text-white/40 hover:text-white/70'
                      )}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                          style={{ background: 'linear-gradient(90deg,#6366f1,#8b5cf6)' }} />
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  <AnimatePresence mode="wait">
                    {/* SUMMARY */}
                    {activeTab === 'Summary' && (
                      <motion.div key="summary" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="w-5 h-5 text-indigo-400" />
                          <span className="font-semibold gradient-text">AI-Generated Summary</span>
                          <span className="badge-green ml-auto"><Check className="w-3 h-3" /> Verified</span>
                        </div>
                        <div className="glass p-5 rounded-2xl leading-relaxed text-sm text-white/80 space-y-3"
                          style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
                          {MOCK_SUMMARY.split('\n\n').map((para, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>') }} />
                          ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button className="btn-ghost text-xs py-2 flex items-center gap-2"><Copy className="w-3.5 h-3.5" /> Copy</button>
                          <button className="btn-ghost text-xs py-2 flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export PDF</button>
                          <button className="btn-ghost text-xs py-2 flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Export DOCX</button>
                          <button className="btn-ghost text-xs py-2 flex items-center gap-2"><Download className="w-3.5 h-3.5" /> Markdown</button>
                        </div>
                      </motion.div>
                    )}

                    {/* KEY POINTS */}
                    {activeTab === 'Key Points' && (
                      <motion.div key="keypoints" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Zap className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold gradient-text">Key Insights</span>
                          <span className="badge-purple ml-auto">{MOCK_KEY_POINTS.length} points</span>
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {MOCK_KEY_POINTS.map((point, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/04 transition-colors group"
                            >
                              <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold"
                                style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>{i + 1}</div>
                              <p className="text-sm text-white/75 leading-relaxed flex-1">{point}</p>
                              <button className="opacity-0 group-hover:opacity-100 p-1 transition-opacity" onClick={() => copyToClipboard(point, `kp-${i}`)}>
                                {copiedCitation === `kp-${i}` ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                              </button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* FLASHCARDS */}
                    {activeTab === 'Flashcards' && (
                      <motion.div key="flashcards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-4">
                          <BookOpen className="w-5 h-5 text-cyan-400" />
                          <span className="font-semibold gradient-text">Generated Flashcards</span>
                          <span className="badge-cyan ml-auto">{MOCK_FLASHCARDS.length} cards</span>
                        </div>
                        <p className="text-xs text-white/40 mb-4">Click any card to flip and reveal the answer</p>
                        <div className="grid grid-cols-2 gap-4">
                          {MOCK_FLASHCARDS.map((card, i) => (
                            <FlipCardComponent key={i} card={card} index={i} />
                          ))}
                        </div>
                        <div className="flex gap-3 mt-4">
                          <button className="btn-primary text-xs py-2 flex items-center gap-2"><Play className="w-3.5 h-3.5" /> Start Study Session</button>
                          <button className="btn-ghost text-xs py-2 flex items-center gap-2"><Plus className="w-3.5 h-3.5" /> Generate More</button>
                        </div>
                      </motion.div>
                    )}

                    {/* QUIZ */}
                    {activeTab === 'Quiz' && (
                      <motion.div key="quiz" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Trophy className="w-5 h-5 text-yellow-400" />
                          <span className="font-semibold gradient-text">Auto-Generated Quiz</span>
                          <span className="badge-orange ml-auto">{MOCK_QUIZ.length} questions</span>
                        </div>
                        <div className="space-y-6">
                          {quizState.map((q, qi) => (
                            <motion.div key={qi} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: qi * 0.1 }}
                              className="glass rounded-2xl p-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                              <p className="text-sm font-semibold text-white/90 mb-4">
                                <span className="badge-indigo mr-2">Q{qi + 1}</span>{q.question}
                              </p>
                              <div className="grid grid-cols-2 gap-2">
                                {q.options.map((opt, oi) => (
                                  <button key={oi} onClick={() => handleQuizAnswer(qi, oi)}
                                    className={cn('quiz-option',
                                      q.selected !== null && oi === q.correct && 'correct',
                                      q.selected === oi && oi !== q.correct && 'incorrect',
                                    )}>
                                    <span className="font-semibold mr-2 opacity-60">{String.fromCharCode(65 + oi)}.</span>{opt}
                                  </button>
                                ))}
                              </div>
                              {q.selected !== null && (
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={cn('text-xs mt-3', q.selected === q.correct ? 'text-green-400' : 'text-red-400')}>
                                  {q.selected === q.correct ? '✓ Correct! Well done.' : `✗ Incorrect. The correct answer is ${q.options[q.correct]}.`}
                                </motion.p>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* MIND MAP */}
                    {activeTab === 'Mind Map' && (
                      <motion.div key="mindmap" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-4">
                          <Brain className="w-5 h-5 text-purple-400" />
                          <span className="font-semibold gradient-text">Concept Mind Map</span>
                        </div>
                        <div className="glass rounded-2xl p-6 overflow-auto" style={{ borderColor: 'rgba(139,92,246,0.2)' }}>
                          <MindMapNode label="Quantum Mechanics" children={[
                            { label: 'Foundational Principles', children: [
                              { label: 'Wave-Particle Duality' }, { label: 'Uncertainty Principle' }, { label: 'Superposition' },
                            ]},
                            { label: 'Mathematical Framework', children: [
                              { label: 'Schrödinger Equation' }, { label: 'Hilbert Space' }, { label: 'Operators' },
                            ]},
                            { label: 'Quantum Phenomena', children: [
                              { label: 'Entanglement' }, { label: 'Tunneling' }, { label: 'Decoherence' },
                            ]},
                            { label: 'Applications', children: [
                              { label: 'Quantum Computing' }, { label: 'Quantum Cryptography' }, { label: 'Quantum Sensing' },
                            ]},
                          ]} />
                        </div>
                      </motion.div>
                    )}

                    {/* CITATIONS */}
                    {activeTab === 'Citations' && (
                      <motion.div key="citations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                        <div className="flex items-center gap-2 mb-5">
                          <Quote className="w-5 h-5 text-indigo-400" />
                          <span className="font-semibold gradient-text">Citation Generator</span>
                        </div>
                        {/* Form */}
                        <div className="glass rounded-2xl p-4 mb-5" style={{ borderColor: 'rgba(99,102,241,0.2)' }}>
                          <p className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Book Details</p>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { label: 'Title', key: 'title' },
                              { label: 'Author (Lastname, F.)', key: 'author' },
                              { label: 'Year', key: 'year' },
                              { label: 'Publisher', key: 'publisher' },
                            ].map(({ label, key }) => (
                              <div key={key}>
                                <label className="text-xs text-white/40 mb-1 block">{label}</label>
                                <input className="input-glass text-xs py-2"
                                  value={citationForm[key as keyof typeof citationForm]}
                                  onChange={e => setCitationForm(f => ({ ...f, [key]: e.target.value }))}
                                  placeholder={label}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Generated citations */}
                        {Object.entries(generateCitations()).map(([fmt, text]) => (
                          <motion.div key={fmt} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                            className="glass rounded-2xl p-4 mb-3 flex items-start gap-3" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                            <div className="w-16 flex-shrink-0">
                              <span className={cn(fmt === 'apa' ? 'badge-indigo' : fmt === 'mla' ? 'badge-purple' : 'badge-cyan', 'uppercase')}>
                                {fmt}
                              </span>
                            </div>
                            <p className="text-xs text-white/70 flex-1 leading-relaxed font-mono">{text}</p>
                            <button onClick={() => copyToClipboard(text, fmt)}
                              className="flex-shrink-0 p-2 rounded-lg hover:bg-white/08 transition-colors">
                              {copiedCitation === fmt ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5 text-white/40" />}
                            </button>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat with PDF */}
          <AnimatePresence>
            {files.some(f => f.processingDone) && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="glass-card overflow-hidden">
                <div className="p-4 border-b border-white/08 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#06b6d4,#6366f1)' }}>
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white/90">Chat with Documents</p>
                    <p className="text-xs text-white/40">Ask questions across all {files.length} uploaded file{files.length !== 1 ? 's' : ''}</p>
                  </div>
                  <span className="badge-cyan ml-auto"><Globe className="w-3 h-3" /> Multi-doc</span>
                </div>
                <div className="h-52 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide">
                  {chatMessages.map(msg => (
                    <motion.div key={msg.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className={cn('flex', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
                      <div className={msg.role === 'ai' ? 'chat-bubble-ai' : 'chat-bubble-user'}>
                        <p>{msg.content}</p>
                        {msg.sources && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {msg.sources.map((s, i) => (
                              <span key={i} className="tag flex items-center gap-1"><Link className="w-2.5 h-2.5" />{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div ref={chatEndRef} />
                </div>
                {/* Quick queries */}
                <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide">
                  {['Which document mentions quantum entanglement?', 'Summarize key differences', 'What are the main conclusions?'].map(q => (
                    <button key={q} onClick={() => setChatInput(q)}
                      className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50 hover:border-indigo-500/40 hover:text-indigo-300 transition-all">
                      {q}
                    </button>
                  ))}
                </div>
                <div className="p-3 border-t border-white/08 flex gap-2">
                  <input className="input-glass text-sm py-2 flex-1"
                    placeholder="Ask anything about your documents…"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendChat()}
                  />
                  <motion.button onClick={sendChat} className="btn-primary text-sm py-2 px-4 flex items-center gap-2"
                    whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Sparkles className="w-4 h-4" /> Ask
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state (no files, no chat) */}
          {files.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
              className="glass-card p-8">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-indigo-400" />
                <span className="font-semibold gradient-text">What PDF Intelligence can do</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: Brain, label: 'Smart Summary', desc: 'AI extracts the essence of any document in seconds', color: '#6366f1' },
                  { icon: BookOpen, label: 'Auto Flashcards', desc: 'Converts key concepts into study-ready flashcards', color: '#8b5cf6' },
                  { icon: Trophy, label: 'Quiz Generator', desc: 'Creates MCQs and short-answer questions automatically', color: '#f59e0b' },
                  { icon: MessageSquare, label: 'Chat with PDF', desc: 'Ask questions and get cited answers from your docs', color: '#06b6d4' },
                  { icon: Quote, label: 'Citation Generator', desc: 'APA, MLA, Chicago citations generated instantly', color: '#10b981' },
                  { icon: FileSearch, label: 'OCR Scanner', desc: 'Extracts text from handwritten notes and images', color: '#ec4899' },
                ].map(({ icon: Icon, label, desc, color }) => (
                  <div key={label} className="glass rounded-2xl p-4 hover:bg-white/05 transition-colors">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <p className="text-sm font-semibold text-white/90 mb-1">{label}</p>
                    <p className="text-xs text-white/40 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Hidden file input */}
      <input ref={fileInputRef} type="file" multiple accept=".pdf,.docx,.pptx,.png,.jpg,.jpeg" className="hidden" onChange={handleFileInput} />
    </div>
  )
}
