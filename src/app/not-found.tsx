'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { BookOpen, Star, Sparkles, Home, ArrowRight } from 'lucide-react'

export default function NotFound() {
  // Config for floating stars
  const stars = [
    { id: 0, size: 8, x: 15, y: 20, delay: 0.2 },
    { id: 1, size: 12, x: 80, y: 15, delay: 0.5 },
    { id: 2, size: 10, x: 25, y: 75, delay: 0.8 },
    { id: 3, size: 14, x: 75, y: 70, delay: 0.1 },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ background: 'hsl(222,47%,6%)' }}>
      {/* Mesh background */}
      <div className="absolute inset-0 mesh-bg opacity-40 pointer-events-none" aria-hidden />

      {/* Floating Stars */}
      {stars.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-yellow-400 opacity-60 pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 4,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Star className="fill-yellow-400" style={{ width: s.size, height: s.size }} />
        </motion.div>
      ))}

      <div className="relative z-10 text-center max-w-md px-6 flex flex-col items-center">
        {/* Animated Stack of Books */}
        <div className="relative w-32 h-32 flex items-center justify-center mb-8">
          {/* Bottom book */}
          <motion.div
            initial={{ y: 20, rotate: 5, opacity: 0 }}
            animate={{ y: 0, rotate: 12, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="absolute w-24 h-5 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-md border border-indigo-400/30 flex items-center px-2 shadow-lg"
          >
            <div className="w-full h-[2px] bg-indigo-300/40 rounded" />
          </motion.div>

          {/* Middle book */}
          <motion.div
            initial={{ y: 20, rotate: -5, opacity: 0 }}
            animate={{ y: -8, rotate: -8, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="absolute w-22 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-md border border-purple-400/30 flex items-center px-2 shadow-lg"
          >
            <div className="w-full h-[2px] bg-purple-300/40 rounded" />
          </motion.div>

          {/* Top open book */}
          <motion.div
            initial={{ y: 20, scale: 0.8, opacity: 0 }}
            animate={{ y: -24, scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3, type: 'spring', stiffness: 100 }}
            className="absolute w-20 h-14 flex items-center justify-center text-indigo-300 drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]"
          >
            <BookOpen className="w-16 h-16 stroke-[1.5]" />
          </motion.div>

          {/* Sparkles */}
          <motion.div
            animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-4 right-2 text-cyan-400"
          >
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </div>

        {/* 404 Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-7xl font-black text-white leading-none tracking-tight mb-2"
        >
          404
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-lg font-bold text-white mb-2"
        >
          Lost in your study journey?
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-xs text-white/40 mb-8 max-w-xs leading-relaxed"
        >
          The page you are looking for doesn't exist, has been moved, or resides in a future update release.
        </motion.p>

        {/* Redirect Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link href="/dashboard" className="btn-primary flex items-center gap-2 text-sm px-6 py-3 rounded-xl font-semibold">
            <Home className="w-4 h-4" />
            Return to Dashboard
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
