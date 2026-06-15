'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-8" style={{ background: 'hsl(222,47%,6%)' }}>
      {/* Mesh background */}
      <div className="absolute inset-0 mesh-bg opacity-30 pointer-events-none" aria-hidden />

      {/* Logo & pulse circle */}
      <div className="relative flex flex-col items-center gap-3 z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              '0 0 20px rgba(99,102,241,0.2)',
              '0 0 35px rgba(99,102,241,0.5)',
              '0 0 20px rgba(99,102,241,0.2)',
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
        <motion.p
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-bold text-white tracking-wider uppercase mt-2"
        >
          Loading StudyPilot AI
        </motion.p>
      </div>

      {/* Shimmer skeleton grid */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 z-10 relative">
        {/* Shimmer CSS is preloaded via standard class layout-glass */}
        {[1, 2, 3].map((card) => (
          <div
            key={card}
            className="glass-card p-6 rounded-2xl border border-white/5 space-y-4 overflow-hidden relative"
            style={{ minHeight: '160px' }}
          >
            {/* Shimmer overlay */}
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5" />
              <div className="h-4 bg-white/10 rounded-full w-24" />
            </div>

            <div className="space-y-2 pt-2">
              <div className="h-3 bg-white/5 rounded-full w-full" />
              <div className="h-3 bg-white/5 rounded-full w-5/6" />
              <div className="h-3 bg-white/5 rounded-full w-4/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
