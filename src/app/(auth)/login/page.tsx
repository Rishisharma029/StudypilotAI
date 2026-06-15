'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Eye, EyeOff, Brain, Sparkles, BookOpen, Target, Trophy, ArrowRight,
  Check, Mail, Lock, AlertCircle, Loader2,
  Flame, GraduationCap, Zap, Star
} from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { cn } from '@/lib/utils'
import { enableDemoSession } from '@/lib/demo-session'

// ─────────────────────────────────────────────
// Helpers / sub-components
// ─────────────────────────────────────────────

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Tutoring',
    desc: 'Get instant explanations, summaries & personalized quizzes',
    color: 'from-indigo-500 to-violet-500',
    glow: 'rgba(99,102,241,0.35)',
  },
  {
    icon: Target,
    title: 'Smart Study Plans',
    desc: 'Adaptive schedules built around your exam goals & pace',
    color: 'from-violet-500 to-fuchsia-500',
    glow: 'rgba(139,92,246,0.35)',
  },
  {
    icon: Trophy,
    title: 'Gamified Progress',
    desc: 'Earn XP, unlock achievements and climb leaderboards',
    color: 'from-cyan-500 to-indigo-500',
    glow: 'rgba(6,182,212,0.35)',
  },
]

const statItems = [
  { label: 'Study Streak', value: '24 days', icon: Flame, color: '#f97316' },
  { label: 'XP Earned', value: '4,820', icon: Zap, color: '#818cf8' },
  { label: 'Cards Reviewed', value: '312', icon: BookOpen, color: '#22d3ee' },
  { label: 'Quiz Score', value: '94%', icon: Star, color: '#facc15' },
]

// Container variants for staggered children
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

// ─────────────────────────────────────────────
// Left panel
// ─────────────────────────────────────────────
function BrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-12 relative overflow-hidden">
      {/* Ambient blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10"
          style={{
            background:
              'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 flex items-center gap-3"
      >
        <div
          className="w-11 h-11 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
        >
          <GraduationCap className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-white font-bold text-xl tracking-tight">StudyPilot AI</p>
          <p className="text-white/40 text-xs">Your Ultimate Study Companion</p>
        </div>
      </motion.div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col gap-10">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white mb-3">
            Study smarter,{' '}
            <span className="gradient-text">not harder.</span>
          </h1>
          <p className="text-white/50 text-lg leading-relaxed max-w-md">
            AI that understands your curriculum, adapts to your pace, and helps
            you ace every exam — from JEE to UPSC.
          </p>
        </motion.div>

        {/* Feature list */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {features.map((f) => (
            <motion.div key={f.title} variants={itemVariants}>
              <div className="flex items-start gap-4 group">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110',
                    `bg-gradient-to-br ${f.color}`
                  )}
                  style={{ boxShadow: `0 0 20px ${f.glow}` }}
                >
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{f.title}</p>
                  <p className="text-white/45 text-xs mt-0.5 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Floating dashboard stats card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card p-5"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderColor: 'rgba(99,102,241,0.2)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-widest">
              Dashboard Preview
            </p>
            <span className="badge-indigo text-[10px]">
              <Sparkles className="w-2.5 h-2.5" /> Live
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {statItems.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.08, duration: 0.45 }}
                className="rounded-xl p-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <s.icon className="w-3.5 h-3.5" style={{ color: s.color }} />
                  <p className="text-white/40 text-[10px] font-medium">{s.label}</p>
                </div>
                <p className="text-white font-bold text-lg">{s.value}</p>
              </motion.div>
            ))}
          </div>
          {/* XP bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-white/40 text-[10px]">Level 12 Progress</p>
              <p className="text-indigo-400 text-[10px] font-semibold">4,820 / 5,000 XP</p>
            </div>
            <div className="xp-bar">
              <motion.div
                className="xp-fill"
                initial={{ width: '0%' }}
                animate={{ width: '96%' }}
                transition={{ delay: 1.1, duration: 1.2, ease: 'easeOut' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Testimonial */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="relative z-10"
      >
        <div
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-white/70 text-sm leading-relaxed italic">
            &ldquo;StudyPilot AI completely transformed my JEE prep. I went from
            struggling with concepts to scoring in the 99th percentile. The AI
            tutor feels like having a personal mentor 24/7.&rdquo;
          </p>
          <div className="flex items-center gap-3 mt-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              AK
            </div>
            <div>
              <p className="text-white/80 text-xs font-semibold">Arjun Kumar</p>
              <p className="text-white/35 text-[10px]">JEE Advanced 2025 · AIR 47</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Google "G" SVG
// ─────────────────────────────────────────────
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

// ─────────────────────────────────────────────
// Login Page
// ─────────────────────────────────────────────
export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [shakeKey, setShakeKey] = useState(0)

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
    if (!email || !password) {
      setError('Please fill in all fields.')
      setShakeKey((k) => k + 1)
      return
    }
    await handleDemoRedirect()
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden" style={{ background: 'hsl(222,47%,6%)' }}>
      {/* Global mesh background */}
      <div className="absolute inset-0 mesh-bg pointer-events-none" aria-hidden />

      {/* Moving grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}
        aria-hidden
      />

      {/* ─── Left branding panel ─── */}
      <div className="w-full lg:w-1/2 xl:w-[55%] relative">
        <BrandPanel />
      </div>

      {/* ─── Right form panel ─── */}
      <div className="w-full lg:w-1/2 xl:w-[45%] flex items-center justify-center p-6 lg:p-12 relative">
        {/* Subtle vertical divider on lg+ */}
        <div
          className="hidden lg:block absolute left-0 top-1/4 bottom-1/4 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.25), transparent)' }}
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
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
            >
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-lg">StudyPilot AI</span>
          </motion.div>

          {/* Card */}
          <div
            className="glass-card p-8 lg:p-10"
            style={{ borderColor: 'rgba(99,102,241,0.15)' }}
          >
            {/* Heading */}
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-8">
              <h2 className="text-3xl font-extrabold text-white mb-1.5">
                Welcome back{' '}
                <span className="gradient-text">👋</span>
              </h2>
              <p className="text-white/45 text-sm">
                Sign in to continue your learning journey.
              </p>
            </motion.div>

            {/* OAuth buttons */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-3 mb-6"
            >
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
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
              <span className="text-white/30 text-xs font-medium whitespace-nowrap">
                or continue with email
              </span>
              <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.08)' }} />
            </motion.div>

            {/* Form */}
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

              {/* Password */}
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-glass pl-10 pr-10"
                  autoComplete="current-password"
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

              {/* Forgot */}
              <div className="flex justify-end -mt-1">
                <Link
                  href="#"
                  className="text-indigo-400 hover:text-indigo-300 text-xs font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2 mt-1 font-semibold"
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
                      Signing in…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex items-center gap-2"
                    >
                      Sign In
                      <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </motion.form>

            {/* Sign up link */}
            <motion.p
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-center text-sm text-white/40 mt-6"
            >
              Don&apos;t have an account?{' '}
              <Link
                href="/signup"
                className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
              >
                Sign up free
              </Link>
            </motion.p>
          </div>

          {/* Footer note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center text-white/20 text-xs mt-6"
          >
            By signing in, you agree to our{' '}
            <span className="underline cursor-pointer hover:text-white/40 transition-colors">Terms</span>{' '}
            &amp;{' '}
            <span className="underline cursor-pointer hover:text-white/40 transition-colors">Privacy Policy</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
