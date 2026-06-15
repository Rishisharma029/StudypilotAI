'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Eye, EyeOff, Brain, Sparkles, BookOpen, Target, Trophy, ArrowRight,
  Check, Mail, Lock, User, AlertCircle, Loader2,
  Flame, GraduationCap, Zap, Star
} from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { cn } from '@/lib/utils'
import { enableDemoSession } from '@/lib/demo-session'

// ─────────────────────────────────────────────
// Types / constants
// ─────────────────────────────────────────────

const SUBJECTS = [
  { id: 'math', label: 'Math', emoji: '📐' },
  { id: 'physics', label: 'Physics', emoji: '⚛️' },
  { id: 'chemistry', label: 'Chemistry', emoji: '🧪' },
  { id: 'cs', label: 'CS', emoji: '💻' },
  { id: 'biology', label: 'Biology', emoji: '🧬' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'economics', label: 'Economics', emoji: '📈' },
]

const EXAMS = [
  { id: 'jee', label: 'JEE', color: '#6366f1' },
  { id: 'neet', label: 'NEET', color: '#10b981' },
  { id: 'upsc', label: 'UPSC', color: '#f59e0b' },
  { id: 'cuet', label: 'CUET', color: '#8b5cf6' },
  { id: 'college', label: 'College', color: '#06b6d4' },
]

type PasswordStrength = 'none' | 'weak' | 'fair' | 'good' | 'strong'

interface StrengthInfo {
  level: PasswordStrength
  label: string
  color: string
  bars: number
}

// ─────────────────────────────────────────────
// Password strength calculator
// ─────────────────────────────────────────────
function getStrength(password: string): StrengthInfo {
  if (!password) return { level: 'none', label: '', color: '', bars: 0 }

  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++

  if (score <= 1) return { level: 'weak', label: 'Weak', color: '#ef4444', bars: 1 }
  if (score === 2) return { level: 'fair', label: 'Fair', color: '#f97316', bars: 2 }
  if (score === 3) return { level: 'good', label: 'Good', color: '#eab308', bars: 3 }
  return { level: 'strong', label: 'Strong', color: '#22c55e', bars: 4 }
}

// ─────────────────────────────────────────────
// Animations
// ─────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// ─────────────────────────────────────────────
// Google icon
// ─────────────────────────────────────────────
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Left branding panel (signup variant)
// ─────────────────────────────────────────────
function SignupBrandPanel() {
  const perks = [
    { icon: Brain, text: 'AI-generated notes, flashcards & quizzes from any PDF' },
    { icon: Target, text: 'Personalized study plans for JEE, NEET, UPSC & more' },
    { icon: Trophy, text: 'Gamified XP, streaks & achievement unlocks' },
    { icon: Zap, text: 'Real-time AI tutor available 24/7, any subject' },
  ]

  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-12 relative overflow-hidden">
      {/* Blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 -right-20 w-[450px] h-[450px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)' }} />
        <div className="absolute bottom-10 -left-20 w-[350px] h-[350px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }} />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center gap-3"
      >
        <div className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-xl tracking-tight">StudyPilot AI</p>
          <p className="text-white/40 text-xs">Your Ultimate Study Companion</p>
        </div>
      </motion.div>

      {/* Body */}
      <div className="relative z-10 flex flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="badge-indigo mb-4 w-fit">
            <Sparkles className="w-3 h-3" />
            Free forever plan available
          </div>
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white mb-3">
            Join <span className="gradient-text">50,000+</span>{' '}
            students acing their exams
          </h1>
          <p className="text-white/50 text-base leading-relaxed max-w-sm">
            Set up your account in 60 seconds and start studying smarter today.
          </p>
        </motion.div>

        {/* Perks */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-3"
        >
          {perks.map((p) => (
            <motion.div key={p.text} variants={itemVariants} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}>
                <Check className="w-3.5 h-3.5 text-indigo-400" />
              </div>
              <p className="text-white/60 text-sm leading-snug">{p.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="glass-card p-5"
          style={{ borderColor: 'rgba(99,102,241,0.18)' }}
        >
          <div className="flex items-center gap-3 mb-3">
            {/* Stacked avatars */}
            <div className="flex -space-x-2.5">
              {['AK', 'PR', 'SM', 'RV'].map((initials, i) => (
                <div
                  key={initials}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2"
                  style={{
                    background: `hsl(${240 + i * 30},70%,55%)`,
                    borderColor: 'hsl(222,47%,6%)',
                    zIndex: 4 - i,
                  }}
                >
                  {initials}
                </div>
              ))}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white/60 border-2"
                style={{ background: 'rgba(255,255,255,0.08)', borderColor: 'hsl(222,47%,6%)' }}
              >
                +49k
              </div>
            </div>
            <div>
              <p className="text-white font-semibold text-sm">50,000+ students</p>
              <div className="flex gap-0.5 mt-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white/40 text-[10px] ml-1">4.9/5</span>
              </div>
            </div>
          </div>
          <p className="text-white/45 text-xs leading-relaxed">
            &ldquo;The best study app I&apos;ve ever used. My marks jumped from 65% to 92% in one semester.&rdquo;
            <span className="text-indigo-400 font-medium ml-1">— Priya R, NEET 2025</span>
          </p>
        </motion.div>
      </div>

      {/* Bottom stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10 grid grid-cols-3 gap-4"
      >
        {[
          { value: '50K+', label: 'Students' },
          { value: '2M+', label: 'Flashcards' },
          { value: '99%', label: 'Satisfaction' },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-white font-extrabold text-xl gradient-text">{s.value}</p>
            <p className="text-white/35 text-xs">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Strength meter component
// ─────────────────────────────────────────────
function StrengthMeter({ strength }: { strength: StrengthInfo }) {
  if (!strength.bars) return null
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="overflow-hidden"
    >
      <div className="flex gap-1.5 mt-1.5 items-center">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              background: bar <= strength.bars ? strength.color : 'rgba(255,255,255,0.08)',
              boxShadow: bar <= strength.bars ? `0 0 6px ${strength.color}66` : 'none',
            }}
          />
        ))}
        <span className="text-[10px] font-semibold ml-1" style={{ color: strength.color }}>
          {strength.label}
        </span>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────
// Signup Page
// ─────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [targetExam, setTargetExam] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shakeKey, setShakeKey] = useState(0)

  const strength = useMemo(() => getStrength(password), [password])

  function toggleSubject(id: string) {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  async function handleDemoRedirect() {
    setError('')
    setLoading(true)
    enableDemoSession()
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    router.push('/dashboard')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) {
      setError('Please fill in all required fields.')
      setShakeKey((k) => k + 1)
      return
    }
    if (!agreeTerms) {
      setError('Please agree to the Terms & Privacy Policy.')
      setShakeKey((k) => k + 1)
      return
    }
    if (strength.level === 'weak') {
      setError('Please choose a stronger password.')
      setShakeKey((k) => k + 1)
      return
    }
    await handleDemoRedirect()
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'hsl(222,47%,6%)' }}>
      {/* Mesh bg */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" aria-hidden />
      {/* Grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden
      />

      {/* ─── Left panel ─── */}
      <div className="w-full lg:w-1/2 xl:w-[52%] relative">
        <SignupBrandPanel />
      </div>

      {/* ─── Right form panel ─── */}
      <div className="w-full lg:w-1/2 xl:w-[48%] flex items-start justify-center p-6 lg:p-10 py-10 overflow-y-auto relative">
        {/* Divider */}
        <div
          className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(139,92,246,0.25), transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex lg:hidden items-center gap-2.5 mb-8"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">StudyPilot AI</span>
          </motion.div>

          {/* Card */}
          <div className="glass-card p-8 lg:p-9" style={{ borderColor: 'rgba(99,102,241,0.15)' }}>

            {/* Heading */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-7">
              <h2 className="text-3xl font-extrabold text-white mb-1.5">
                Create your account
                <span className="gradient-text-purple">✨</span>
              </h2>
              <p className="text-white/40 text-sm">
                Free StudyPilot AI Beta Access · No credit card required
              </p>
            </motion.div>

            {/* OAuth */}
            <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible" className="flex flex-col gap-3 mb-6">
              <button
                type="button"
                onClick={handleDemoRedirect}
                className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm text-gray-800 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <GoogleIcon className="w-5 h-5" />
                Continue with Google
              </button>
              <button
                type="button"
                onClick={handleDemoRedirect}
                className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: '#161b22',
                  border: '1px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
                }}
              >
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
            </motion.div>

            {/* Divider */}
            <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible" className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="text-white/30 text-xs font-medium whitespace-nowrap">or register with email</span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </motion.div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  key={shakeKey}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: 1,
                    x: [0, -10, 10, -8, 8, -4, 4, 0],
                    transition: { duration: 0.5 },
                  }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2.5 p-3 rounded-xl mb-5 text-sm"
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.25)',
                    color: '#f87171',
                  }}
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <motion.form
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              {/* Full name */}
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-glass pl-10"
                  autoComplete="name"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-glass pl-10"
                  autoComplete="email"
                  required
                />
              </div>

              {/* Password + strength meter */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-glass pl-10 pr-10"
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <AnimatePresence>
                  {password && <StrengthMeter strength={strength} />}
                </AnimatePresence>
              </div>

              {/* ─── Subject chips ─── */}
              <div className="mt-1">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2.5">
                  Your Subjects <span className="text-white/25 normal-case font-normal">(pick all that apply)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {SUBJECTS.map((s) => {
                    const active = selectedSubjects.includes(s.id)
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => toggleSubject(s.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
                          active
                            ? 'text-white'
                            : 'text-white/50 hover:text-white/80'
                        )}
                        style={
                          active
                            ? {
                                background: 'rgba(99,102,241,0.2)',
                                border: '1px solid rgba(99,102,241,0.5)',
                                boxShadow: '0 0 12px rgba(99,102,241,0.2)',
                              }
                            : {
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }
                        }
                      >
                        <span>{s.emoji}</span>
                        {s.label}
                        <AnimatePresence>
                          {active && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check className="w-3 h-3 text-indigo-400" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* ─── Target exam ─── */}
              <div>
                <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2.5">
                  Target Exam <span className="text-white/25 normal-case font-normal">(optional)</span>
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXAMS.map((ex) => {
                    const active = targetExam === ex.id
                    return (
                      <motion.button
                        key={ex.id}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setTargetExam(active ? '' : ex.id)}
                        className={cn(
                          'px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-200',
                          active ? 'text-white' : 'text-white/50 hover:text-white/80'
                        )}
                        style={
                          active
                            ? {
                                background: `${ex.color}22`,
                                border: `1px solid ${ex.color}66`,
                                boxShadow: `0 0 14px ${ex.color}33`,
                                color: ex.color,
                              }
                            : {
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }
                        }
                      >
                        {ex.label}
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* ─── Terms ─── */}
              <div className="flex items-start gap-3 mt-1">
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={cn(
                    'w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200',
                    agreeTerms
                      ? 'bg-indigo-500 border-indigo-500'
                      : 'border border-white/20 bg-transparent hover:border-indigo-500/50'
                  )}
                >
                  <AnimatePresence>
                    {agreeTerms && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
                <p className="text-white/40 text-xs leading-relaxed">
                  I agree to StudyPilot AI&apos;s{' '}
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">
                    Terms of Service
                  </span>{' '}
                  and{' '}
                  <span className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors">
                    Privacy Policy
                  </span>
                  .
                </p>
              </div>

              {/* ─── Submit ─── */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-2 font-semibold"
                style={{ height: '48px' }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Creating your account…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Create Account — It&apos;s Free
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.form>

            {/* Sign in link */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center text-sm text-white/40 mt-6"
            >
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors">
                Sign in
              </Link>
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-white/20 text-xs mt-5"
          >
            🔒 Your data is encrypted and saved locally.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
