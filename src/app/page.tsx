'use client'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import {
  Sparkles, BookOpen, Brain, Target, FileText, Calendar, Mic, Trophy, BarChart3,
  ChevronDown, ChevronRight, Star, Check, X, ArrowRight, Play, Zap, Users, TrendingUp,
  Shield, Clock, Globe, Menu,
  FlaskConical, Calculator, Atom, Code2, BookMarked, GraduationCap
} from 'lucide-react'
import { Github, Twitter, Linkedin, Instagram, Youtube } from '@/components/brand-icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'

// ─── Animation Variants ────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-all duration-500',
          scrolled ? 'glass-nav shadow-2xl shadow-black/20' : 'bg-transparent'
        )}
      >
        <div className="container-narrow flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <span className="text-white text-sm font-bold">✦</span>
            </div>
            <span className="font-bold text-lg gradient-text">StudyPilot AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="nav-link">{link.label}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="btn-ghost text-sm px-4 py-2 rounded-lg text-center font-semibold text-white/80 hover:text-white">
              Login
            </Link>
            <Link href="/signup" className="btn-primary text-sm px-4 py-2 rounded-lg flex items-center gap-1.5 font-semibold">
              Get Started Free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {mobileOpen ? <X className="w-4 h-4 text-white/80" /> : <Menu className="w-4 h-4 text-white/80" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 glass-nav border-t border-white/5 md:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-ghost text-sm py-2.5 rounded-lg text-center font-semibold text-white/80 hover:text-white">
                  Login
                </Link>
                <Link href="/signup" onClick={() => setMobileOpen(false)} className="flex-1 btn-primary text-sm py-2.5 rounded-lg text-center font-semibold">
                  Get Started Free
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── HERO SECTION ─────────────────────────────────────────────────────────

function HeroSection() {
  const particles = [
    { id: 0, size: 120, x: 10, y: 15, color: 'rgba(99,102,241,0.12)', duration: 8, delay: 0 },
    { id: 1, size: 80, x: 85, y: 10, color: 'rgba(139,92,246,0.10)', duration: 12, delay: 2 },
    { id: 2, size: 200, x: 20, y: 70, color: 'rgba(6,182,212,0.08)', duration: 10, delay: 4 },
    { id: 3, size: 100, x: 75, y: 80, color: 'rgba(99,102,241,0.08)', duration: 14, delay: 1 },
    { id: 4, size: 160, x: 40, y: 40, color: 'rgba(139,92,246,0.12)', duration: 9, delay: 3 },
    { id: 5, size: 90, x: 90, y: 55, color: 'rgba(6,182,212,0.10)', duration: 11, delay: 5 },
  ]

  const stats = [
    { value: '50K+', label: 'Students', icon: <Users className="w-4 h-4" /> },
    { value: '1M+', label: 'Flashcards', icon: <BookOpen className="w-4 h-4" /> },
    { value: '99.2%', label: 'Accuracy', icon: <Target className="w-4 h-4" /> },
    { value: '4.9★', label: 'Rating', icon: <Star className="w-4 h-4" /> },
  ]

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16">
      <div className="absolute inset-0 mesh-bg opacity-80" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full opacity-20 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.4) 0%, rgba(139,92,246,0.2) 40%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.4) 0%, transparent 70%)' }} />

      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: p.size, height: p.size,
            left: `${p.x}%`, top: `${p.y}%`,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            filter: 'blur(1px)',
          }}
          animate={{ y: [0, -30, 0], x: [0, 15, 0], opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

      <div className="relative z-10 container-narrow px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center gap-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="badge-indigo"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Trusted by 50,000+ students across India
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col items-center gap-2"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none text-white">
            Your Ultimate
          </h1>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none gradient-text">
            AI Study Companion
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-lg sm:text-xl text-white/50 max-w-2xl leading-relaxed"
        >
          Revolutionize the way you study with AI-powered flashcards, instant explanations,
          smart quizzes, and personalized study plans — all in StudyPilot AI Beta, completely free.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link href="/signup" className="btn-primary flex items-center gap-2 text-base px-7 py-3.5 rounded-xl font-semibold">
            <Zap className="w-4 h-4" />
            Get Started Free
          </Link>
          <Link href="/dashboard" className="btn-ghost border border-white/10 hover:bg-white/5 flex items-center gap-2 text-base px-7 py-3.5 rounded-xl font-semibold text-white">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            View Dashboard Demo
          </Link>
          <a href="#features" className="text-white/60 hover:text-white text-sm font-semibold flex items-center gap-1.5 transition-colors px-4 py-2">
            Watch Demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-4 flex flex-col items-center gap-1 rounded-2xl">
              <div className="text-indigo-400 mb-1">{s.icon}</div>
              <span className="text-2xl font-black gradient-text">{s.value}</span>
              <span className="text-xs text-white/40 font-medium">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Mock App Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="w-full max-w-4xl mt-4"
        >
          <div className="glass-card rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 40px 120px rgba(0,0,0,0.5), 0 0 60px rgba(99,102,241,0.1)' }}>
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5"
              style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="flex-1 mx-4 h-6 rounded-lg flex items-center px-3"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xs text-white/25 font-mono">app.studypilot.ai/dashboard</span>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-0" style={{ minHeight: '320px' }}>
              {/* Sidebar */}
              <div className="col-span-2 p-3 border-r border-white/5 flex flex-col gap-1"
                style={{ background: 'rgba(0,0,0,0.2)' }}>
                {[
                  { icon: <Brain className="w-3.5 h-3.5" />, label: 'AI Tutor', active: true },
                  { icon: <BookOpen className="w-3.5 h-3.5" />, label: 'Flashcards' },
                  { icon: <Target className="w-3.5 h-3.5" />, label: 'Quizzes' },
                  { icon: <Calendar className="w-3.5 h-3.5" />, label: 'Planner' },
                  { icon: <BarChart3 className="w-3.5 h-3.5" />, label: 'Analytics' },
                ].map((item) => (
                  <div key={item.label} className={cn(
                    'flex items-center gap-2 px-2 py-2 rounded-lg text-xs cursor-pointer transition-all',
                    item.active
                      ? 'bg-indigo-500/15 text-indigo-400 border border-indigo-500/20'
                      : 'text-white/30 hover:text-white/50'
                  )}>
                    {item.icon}
                    <span className="hidden sm:block font-medium">{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="col-span-10 p-4 grid grid-cols-3 gap-3">
                <div className="col-span-2 flex flex-col gap-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                      <Brain className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-white/70">AI Tutor</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-auto" />
                  </div>

                  <div className="chat-bubble-ai rounded-2xl rounded-tl-sm p-3">
                    <p className="text-xs text-white/70 leading-relaxed">
                      Sure! Newton's Second Law states that <span className="text-indigo-400 font-semibold">F = ma</span>.
                      The net force on an object equals its mass times acceleration. Let me give you an example...
                    </p>
                  </div>

                  <div className="chat-bubble-user rounded-2xl rounded-tr-sm p-3 ml-auto">
                    <p className="text-xs text-white/90 leading-relaxed">
                      Explain Newton's Second Law with a JEE example
                    </p>
                  </div>

                  <div className="chat-bubble-ai rounded-2xl rounded-tl-sm p-3">
                    <div className="flex gap-1 items-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="glass rounded-xl p-3 flex flex-col gap-2">
                    <span className="text-xs text-white/40 font-medium">Today's Progress</span>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold gradient-text">78%</span>
                      <TrendingUp className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '78%' }} />
                    </div>
                  </div>

                  <div className="glass rounded-xl p-3 flex flex-col gap-1.5">
                    <span className="text-xs text-white/40 font-medium">XP Points</span>
                    <span className="text-lg font-bold text-purple-400">2,450</span>
                    <div className="xp-bar">
                      <div className="xp-fill" style={{ width: '65%' }} />
                    </div>
                  </div>

                  <div className="glass rounded-xl p-3 flex flex-col gap-1.5">
                    <span className="text-xs text-white/40 font-medium">Streak</span>
                    <span className="text-lg font-bold text-orange-400">14 days 🔥</span>
                    <span className="text-xs text-white/30">Personal best!</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-16 -mt-4 mx-8 rounded-b-3xl opacity-30 blur-xl"
            style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.3), transparent)' }} />
        </motion.div>
      </div>
    </section>
  )
}

// ─── FEATURES SECTION ────────────────────────────────────────────────────

function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'AI Tutor',
      description: 'Get instant, personalized explanations for any concept. Our AI tutor adapts to your learning style and answers follow-up questions with precision.',
      color: 'rgba(99,102,241,0.2)', textColor: '#818cf8',
      badgeClass: 'badge-indigo', badgeText: 'GPT-4 Powered', span: 'md:col-span-2',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Smart Flashcards',
      description: 'AI-generated flashcards with spaced repetition. Never forget what you learn.',
      color: 'rgba(139,92,246,0.2)', textColor: '#a78bfa',
      badgeClass: 'badge-purple', badgeText: 'Spaced Repetition', span: '',
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Quiz Generator',
      description: 'Instantly generate MCQs, assertion-reason, and match-the-column from any topic or PDF.',
      color: 'rgba(6,182,212,0.2)', textColor: '#22d3ee',
      badgeClass: 'badge-cyan', badgeText: 'Auto-Generated', span: '',
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'PDF Intelligence',
      description: 'Upload any PDF and chat with it. Extract key points, generate summaries, and create quizzes instantly.',
      color: 'rgba(34,197,94,0.2)', textColor: '#4ade80',
      badgeClass: 'badge-green', badgeText: 'RAG Technology', span: '',
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Study Planner',
      description: 'AI-crafted study schedules aligned to your exam date. Smart reminders keep you on track.',
      color: 'rgba(249,115,22,0.2)', textColor: '#fb923c',
      badgeClass: 'badge-orange', badgeText: 'Smart Scheduling', span: '',
    },
    {
      icon: <Mic className="w-6 h-6" />,
      title: 'Voice Tutor',
      description: 'Learn hands-free. Talk to your AI tutor and get spoken explanations for concepts on the go.',
      color: 'rgba(236,72,153,0.2)', textColor: '#f472b6',
      badgeClass: 'badge-purple', badgeText: 'Whisper AI', span: '',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Exam Hub',
      description: 'JEE, NEET, UPSC, CUET — curated previous year questions, mock tests, and performance analysis.',
      color: 'rgba(234,179,8,0.2)', textColor: '#facc15',
      badgeClass: 'badge-indigo', badgeText: '15+ Exams', span: '',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Analytics Dashboard',
      description: 'Deep insights into your performance. Track weak areas, study streaks, and predicted scores with beautiful charts.',
      color: 'rgba(59,130,246,0.2)', textColor: '#60a5fa',
      badgeClass: 'badge-cyan', badgeText: 'Real-time Insights', span: 'md:col-span-2',
    },
  ]

  return (
    <section id="features" className="section-padding">
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="flex flex-col items-center text-center gap-4 mb-16"
        >
          <motion.div variants={fadeUp} className="badge-indigo">
            <Zap className="w-3.5 h-3.5" />
            Powerful Features
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Everything You Need to{' '}
            <span className="gradient-text">Ace Your Exams</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 max-w-xl text-lg">
            A complete AI-powered ecosystem designed specifically for Indian competitive exam aspirants.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={scaleIn}
              className={cn('feature-card', f.span)}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between">
                <div className="feature-icon" style={{ background: f.color, color: f.textColor }}>
                  {f.icon}
                </div>
                <span className={cn('text-xs font-semibold px-2 py-0.5 rounded-full', f.badgeClass)}>
                  {f.badgeText}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{f.description}</p>
              </div>
              <div className="mt-auto flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-300"
                style={{ color: f.textColor }}>
                <span className="text-xs font-semibold">Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── EXAM SUPPORT SECTION ────────────────────────────────────────────────

function ExamSection() {
  const exams = [
    { label: 'JEE Mains & Advanced', icon: <Calculator className="w-5 h-5" />, color: 'rgba(99,102,241,0.15)', text: '#818cf8' },
    { label: 'NEET UG', icon: <FlaskConical className="w-5 h-5" />, color: 'rgba(34,197,94,0.15)', text: '#4ade80' },
    { label: 'UPSC CSE', icon: <Globe className="w-5 h-5" />, color: 'rgba(249,115,22,0.15)', text: '#fb923c' },
    { label: 'CUET', icon: <GraduationCap className="w-5 h-5" />, color: 'rgba(6,182,212,0.15)', text: '#22d3ee' },
    { label: 'BCA / MCA', icon: <Code2 className="w-5 h-5" />, color: 'rgba(139,92,246,0.15)', text: '#a78bfa' },
    { label: 'Board Exams', icon: <BookMarked className="w-5 h-5" />, color: 'rgba(236,72,153,0.15)', text: '#f472b6' },
  ]

  const highlights = [
    { icon: <BookOpen className="w-5 h-5" />, title: 'PYQ Bank', desc: '10+ years of previous year questions with solutions and pattern analysis.' },
    { icon: <Target className="w-5 h-5" />, title: 'Mock Tests', desc: 'Full-length, timed mock tests that simulate real exam conditions perfectly.' },
    { icon: <TrendingUp className="w-5 h-5" />, title: 'Score Predictor', desc: 'AI predicts your rank and score based on your practice performance trends.' },
  ]

  return (
    <section id="exams" className="section-padding"
      style={{ background: 'linear-gradient(to bottom, transparent, rgba(99,102,241,0.03), transparent)' }}>
      <div className="container-narrow">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="flex flex-col gap-8">
            <motion.div variants={fadeUp} className="flex flex-col gap-4">
              <div className="badge-purple w-fit">
                <Trophy className="w-3.5 h-3.5" />
                Exam Coverage
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                Built for <span className="gradient-text-purple">Every Exam</span>
              </h2>
              <p className="text-white/50 text-lg leading-relaxed">
                Whether you're cracking JEE, NEET, or the UPSC, StudyPilot AI has tailored
                content, strategies, and AI assistance built specifically for your exam.
              </p>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {exams.map((e) => (
                <motion.div
                  key={e.label}
                  variants={scaleIn}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="glass-card p-4 flex flex-col items-center gap-2 text-center cursor-pointer rounded-2xl"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: e.color, color: e.text }}>
                    {e.icon}
                  </div>
                  <span className="text-xs font-semibold text-white/70">{e.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={staggerContainer} className="flex flex-col gap-4">
            {highlights.map((h) => (
              <motion.div
                key={h.title}
                variants={fadeUp}
                whileHover={{ x: 6 }}
                className="glass-card p-6 flex items-start gap-5 rounded-2xl cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                  {h.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{h.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{h.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────

function TestimonialsSection() {
  const testimonials = [
    { name: 'Arjun Sharma', exam: 'JEE Advanced 2024', rank: 'AIR 847', rating: 5, avatar: 'AS', color: '#6366f1', quote: 'StudyPilot AI completely changed how I prepared for JEE. The AI tutor explained concepts better than any YouTube video, and the spaced repetition flashcards were a game-changer.' },
    { name: 'Priya Nair', exam: 'NEET 2024', rank: '680/720', rating: 5, avatar: 'PN', color: '#8b5cf6', quote: 'I went from struggling with organic chemistry to scoring 95% in it. The PDF chat feature helped me extract key reactions instantly. Absolutely worth every rupee!' },
    { name: 'Rahul Gupta', exam: 'UPSC Prelims', rank: 'Cleared', rating: 5, avatar: 'RG', color: '#06b6d4', quote: 'The UPSC-specific content and current affairs integration is incredible. My revision time dropped by 50% with the AI-generated summaries.' },
    { name: 'Sneha Patel', exam: 'CUET 2024', rank: '99.8 percentile', rating: 5, avatar: 'SP', color: '#10b981', quote: 'Got into my dream college! The mock test platform is so similar to the actual exam. The score predictor was off by only 2 marks from my actual score.' },
    { name: 'Vikram Singh', exam: 'JEE Mains', rank: '99.4 percentile', rating: 5, avatar: 'VS', color: '#f59e0b', quote: 'The gamification system kept me motivated throughout my preparation. 200+ day streak! The achievement badges made studying genuinely fun.' },
    { name: 'Ananya Roy', exam: 'NEET PG', rank: 'AIR 312', rating: 5, avatar: 'AR', color: '#ec4899', quote: 'As a medical student, I needed something that could handle complex biochemistry. StudyPilot AI\'s explanations are incredibly detailed yet easy to understand.' },
    { name: 'Karan Mehta', exam: 'JEE Advanced 2023', rank: 'AIR 1,204', rating: 5, avatar: 'KM', color: '#6366f1', quote: 'The voice tutor feature is underrated. I used it during my evening walks to revise physics. Scored 89 in physics — my weakest subject previously!' },
    { name: 'Divya Krishnan', exam: 'NEET 2023', rank: '672/720', rating: 5, avatar: 'DK', color: '#8b5cf6', quote: 'The AI-generated quiz explanations are perfect for understanding why a wrong option is wrong. That detail made all the difference.' },
    { name: 'Rohan Joshi', exam: 'CUET 2023', rank: '99.5 percentile', rating: 5, avatar: 'RJ', color: '#06b6d4', quote: 'Started using StudyPilot 3 months before CUET. The study planner optimized my schedule perfectly. Made it to Delhi University with a full scholarship!' },
    { name: 'Kavya Reddy', exam: 'Board Exams', rank: '97.2%', rating: 5, avatar: 'KR', color: '#10b981', quote: 'Board exam resources are top-notch. The chapter summaries and important question banks saved so much time. My school toppers all use StudyPilot now!' },
  ]

  const row1 = testimonials.slice(0, 5)
  const row2 = testimonials.slice(5)

  function MarqueeRow({ items, reverse = false }: { items: typeof testimonials; reverse?: boolean }) {
    return (
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-4"
          animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
          transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
          style={{ width: 'max-content' }}
        >
          {[...items, ...items].map((t, i) => (
            <div key={`${t.name}-${i}`} className="testimonial-card flex-shrink-0">
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-white/60 leading-relaxed flex-1">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                  style={{ background: `${t.color}40`, border: `1px solid ${t.color}40` }}>
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.exam} · <span style={{ color: t.color }}>{t.rank}</span></p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <section id="testimonials" className="section-padding overflow-hidden">
      <div className="container-narrow mb-16">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4"
        >
          <motion.div variants={fadeUp} className="badge-green">
            <Star className="w-3.5 h-3.5 fill-green-400" />
            Student Reviews
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Loved by <span className="gradient-text-cyan">50,000+ Students</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 max-w-xl text-lg">
            Real results from real students. Join thousands who've already transformed their study game.
          </motion.p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, hsl(222,47%,6%), transparent)' }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, hsl(222,47%,6%), transparent)' }} />
        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1} />
          <MarqueeRow items={row2} reverse />
        </div>
      </div>
    </section>
  )
}

// ─── FAQ SECTION ──────────────────────────────────────────────────────────

function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const faqs = [
    {
      q: 'How does the AI Tutor work?',
      a: 'Our AI Tutor is powered by GPT-4 and fine-tuned on Indian curriculum content. You can ask questions in natural language, upload PDFs, and get step-by-step explanations with relevant examples from JEE/NEET/UPSC syllabi. It remembers context within a session for follow-up questions.',
    },
    {
      q: 'Is StudyPilot AI good for JEE and NEET preparation?',
      a: 'Absolutely! StudyPilot AI was built with JEE and NEET aspirants in mind. We have 10+ years of PYQs, topic-wise mock tests, AI-generated flashcards for formulas and reactions, and a score predictor calibrated on JEE/NEET patterns. Over 20,000 JEE/NEET students use StudyPilot daily.',
    },
    {
      q: 'Can I use it on my phone?',
      a: 'Yes! StudyPilot AI is fully responsive and works beautifully on mobile browsers. We also have native iOS and Android apps (coming soon) for an even smoother experience, including offline flashcard revision.',
    },
    {
      q: 'How accurate is the Quiz Generator?',
      a: 'Our quiz generator has a 99.2% accuracy rate verified by subject matter experts. It generates questions from verified sources and cross-checks answers with our knowledge base. Each explanation is reviewed by our AI safety system to ensure correctness.',
    },
    {
      q: 'Is StudyPilot AI free?',
      a: 'Yes. During beta, all features are completely free and available to everyone.',
    },
    {
      q: 'Can I cancel my subscription anytime?',
      a: "Yes, absolutely. You can cancel your subscription at any time from your account settings. Your access continues until the end of your current billing period. We don't believe in lock-in contracts — we earn your loyalty through quality.",
    },
    {
      q: 'Is my data secure?',
      a: 'We take data security very seriously. All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We never sell your data to third parties. Your notes and study materials are private by default. We are SOC 2 Type II compliant.',
    },
    {
      q: 'Do you offer discounts for coaching institutes or schools?',
      a: 'Yes! We offer institutional pricing for coaching centres, schools, and colleges. Contact our team at institutions@studypilot.ai for custom pricing. We have special packages for batch licensing with admin dashboards for teachers.',
    },
  ]

  return (
    <section id="faq" className="section-padding">
      <div className="container-narrow max-w-3xl">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center gap-4 mb-14"
        >
          <motion.div variants={fadeUp} className="badge-purple">
            <BookOpen className="w-3.5 h-3.5" />
            FAQ
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-black tracking-tight text-white">
            Questions? <span className="gradient-text-purple">Answered.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-white/50 text-lg">
            Everything you need to know before getting started.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="flex items-center justify-between p-5 gap-4">
                <h3 className={cn('text-base font-semibold transition-colors', openIdx === i ? 'text-white' : 'text-white/70')}>
                  {faq.q}
                </h3>
                <motion.div
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={cn('w-5 h-5 transition-colors', openIdx === i ? 'text-indigo-400' : 'text-white/30')} />
                </motion.div>
              </div>
              <AnimatePresence initial={false}>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <div className="h-px w-full bg-white/5 mb-4" />
                      <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── CTA SECTION ──────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center flex flex-col items-center gap-8"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,92,246,0.12) 50%, rgba(6,182,212,0.08) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
              style={{ background: 'linear-gradient(to right, transparent, rgba(99,102,241,0.5), rgba(139,92,246,0.5), transparent)' }} />
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.8) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-15"
              style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }} />
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 max-w-2xl">
            <div className="badge-indigo">
              <Sparkles className="w-3.5 h-3.5" />
              Start Your Journey Today
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Ready to Transform
              <br />
              <span className="gradient-text">Your Studies?</span>
            </h2>
            <p className="text-lg text-white/50 max-w-lg">
              Join 50,000+ students already using StudyPilot AI to crack their dream exams.
              It's free to start — no credit card required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Link href="/signup" className="btn-primary flex items-center gap-2 text-base px-8 py-4 rounded-xl font-semibold">
                <Zap className="w-5 h-5" />
                Start Studying Free
              </Link>
              <a href="#features" className="btn-ghost flex items-center gap-2 text-base px-8 py-4 rounded-xl border border-white/10 hover:bg-white/5 text-white font-semibold">
                Explore Features
                <ChevronRight className="w-4 h-4" />
              </a>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/30">
              {[
                'No credit card required',
                'Free plan forever',
                'Cancel anytime',
              ].map((text, i) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-green-400" />
                  {text}
                  {i < 2 && <div className="hidden sm:block w-1 h-1 rounded-full bg-white/10 ml-4" />}
                </div>
              ))}
            </div>
          </div>

          {/* Social proof avatars */}
          <div className="relative z-10 flex items-center gap-2">
            {[
              { initials: 'AS', from: '#6366f1', to: '#8b5cf6' },
              { initials: 'PN', from: '#8b5cf6', to: '#a78bfa' },
              { initials: 'RG', from: '#06b6d4', to: '#22d3ee' },
              { initials: 'SP', from: '#10b981', to: '#34d399' },
              { initials: 'VS', from: '#f59e0b', to: '#fbbf24' },
            ].map((avatar, i) => (
              <div
                key={avatar.initials}
                className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white ring-2 ring-black/20"
                style={{
                  background: `linear-gradient(135deg, ${avatar.from}, ${avatar.to})`,
                  marginLeft: i > 0 ? '-8px' : '0',
                  zIndex: 5 - i,
                }}
              >
                {avatar.initials}
              </div>
            ))}
            <span className="ml-3 text-sm text-white/50">+49,995 students</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      title: 'Product',
      links: ['AI Tutor', 'Smart Flashcards', 'Quiz Generator', 'PDF Intelligence', 'Study Planner', 'Voice Tutor', 'Analytics'],
    },
    {
      title: 'Exams',
      links: ['JEE Preparation', 'NEET Preparation', 'UPSC CSE', 'CUET Prep', 'Board Exams', 'BCA / MCA', 'GATE'],
    },
    {
      title: 'Resources',
      links: ['Roadmap', 'Documentation', 'GitHub', 'Feedback', 'Blog'],
    },
    {
      title: 'Company',
      links: ['About Us', 'Careers', 'Press Kit', 'Privacy Policy', 'Terms of Service', 'Contact Us'],
    },
  ]

  const socials = [
    { icon: <Twitter className="w-4 h-4" />, label: 'Twitter', href: '#' },
    { icon: <Linkedin className="w-4 h-4" />, label: 'LinkedIn', href: '#' },
    { icon: <Instagram className="w-4 h-4" />, label: 'Instagram', href: '#' },
    { icon: <Youtube className="w-4 h-4" />, label: 'YouTube', href: '#' },
    { icon: <Github className="w-4 h-4" />, label: 'GitHub', href: '#' },
  ]

  return (
    <footer className="border-t border-white/5 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="container-narrow">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                <span className="text-white font-bold">✦</span>
              </div>
              <span className="font-bold text-xl gradient-text">StudyPilot AI</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed max-w-xs">
              India's most advanced AI-powered study platform. Built to help you crack your dream exam with confidence.
            </p>
            <div className="flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-white/80 transition-all hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <h4 className="text-sm font-semibold text-white/80">{col.title}</h4>
              <div className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <a key={link} href="#" className="text-sm text-white/35 hover:text-white/70 transition-colors">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5">
          <p className="text-sm text-white/25">
            © 2025 StudyPilot AI. All rights reserved.
          </p>
          <p className="text-sm text-white/25 flex items-center gap-1">
            Made with <span className="text-red-400/70">♥</span> in India 🇮🇳
          </p>
        </div>
      </div>
    </footer>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ExamSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </main>
  )
}
