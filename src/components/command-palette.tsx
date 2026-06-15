'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Search, X, FileText, CreditCard, Target, CheckSquare, BookOpen, Calendar, Brain, BarChart3, Sparkles, Clock, ArrowRight, Command } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/lib/store'
import Fuse from 'fuse.js'
import Link from 'next/link'

const ALL_COMMANDS = [
  { id: 'dashboard', label: 'Go to Dashboard', icon: BarChart3, href: '/dashboard', category: 'Navigation' },
  { id: 'notes', label: 'Go to Notes', icon: FileText, href: '/notes', category: 'Navigation' },
  { id: 'ai-tutor', label: 'Go to AI Tutor', icon: Brain, href: '/ai-tutor', category: 'Navigation' },
  { id: 'flashcards', label: 'Go to Flashcards', icon: CreditCard, href: '/flashcards', category: 'Navigation' },
  { id: 'quiz', label: 'Go to Quiz Generator', icon: Target, href: '/quiz', category: 'Navigation' },
  { id: 'planner', label: 'Go to Planner', icon: Calendar, href: '/planner', category: 'Navigation' },
  { id: 'tasks', label: 'Go to Tasks', icon: CheckSquare, href: '/tasks', category: 'Navigation' },
  { id: 'analytics', label: 'Go to Analytics', icon: BarChart3, href: '/analytics', category: 'Navigation' },
  { id: 'exam-hub', label: 'Go to Exam Hub', icon: Target, href: '/exam-hub', category: 'Navigation' },
  { id: 'pdf-ai', label: 'PDF Intelligence', icon: FileText, href: '/pdf-ai', category: 'Navigation' },
  { id: 'new-note', label: 'Create New Note', icon: FileText, href: '/notes', category: 'Actions', shortcut: 'Ctrl+N' },
  { id: 'new-quiz', label: 'Generate Quiz', icon: Target, href: '/quiz', category: 'Actions' },
  { id: 'start-pomodoro', label: 'Start Pomodoro', icon: Clock, href: '/pomodoro', category: 'Actions' },
  { id: 'ask-ai', label: 'Ask AI Tutor', icon: Brain, href: '/ai-tutor', category: 'Actions' },
  { id: 'revision', label: 'Smart Revision', icon: BookOpen, href: '/revision', category: 'Study Tools' },
  { id: 'voice-tutor', label: 'Voice Tutor', icon: Sparkles, href: '/voice-tutor', category: 'Study Tools' },
  { id: 'whiteboard', label: 'Whiteboard', icon: BookOpen, href: '/whiteboard', category: 'Study Tools' },
  { id: 'gamification', label: 'Achievements & XP', icon: Sparkles, href: '/gamification', category: 'Study Tools' },
]

const fuse = new Fuse(ALL_COMMANDS, {
  keys: ['label', 'category'],
  threshold: 0.4,
})

export function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette } = useUIStore()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = query.trim()
    ? fuse.search(query).map((r) => r.item)
    : ALL_COMMANDS.slice(0, 8)

  useEffect(() => {
    if (commandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setQuery('')
      setSelectedIndex(0)
    }
  }, [commandPaletteOpen])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
      if (!commandPaletteOpen) return
      if (e.key === 'Escape') toggleCommandPalette()
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [commandPaletteOpen, results.length, toggleCommandPalette])

  useEffect(() => setSelectedIndex(0), [query])

  const grouped = results.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, typeof ALL_COMMANDS>)

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          className="cmd-palette"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={toggleCommandPalette}
        >
          <motion.div
            className="cmd-palette-box mx-4"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
              <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, actions, notes..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-white/40 text-sm outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="text-white/40 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              )}
              <kbd className="px-1.5 py-0.5 rounded text-xs text-white/30 border border-white/10">ESC</kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2 scrollbar-hide">
              {Object.entries(grouped).map(([category, items]) => (
                <div key={category} className="mb-2">
                  <p className="px-2 py-1 text-xs font-medium text-white/30 uppercase tracking-wider">{category}</p>
                  {items.map((cmd, i) => {
                    const globalIndex = results.indexOf(cmd)
                    const isSelected = globalIndex === selectedIndex
                    return (
                      <Link key={cmd.id} href={cmd.href} onClick={toggleCommandPalette}>
                        <div
                          className={cn(
                            'flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-150',
                            isSelected
                              ? 'bg-indigo-500/20 text-white'
                              : 'text-white/70 hover:bg-white/5 hover:text-white'
                          )}
                          onMouseEnter={() => setSelectedIndex(globalIndex)}
                        >
                          <div className={cn(
                            'w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0',
                            isSelected ? 'bg-indigo-500/30' : 'bg-white/5'
                          )}>
                            <cmd.icon className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-sm font-medium flex-1">{cmd.label}</span>
                          {cmd.shortcut && (
                            <kbd className="text-xs text-white/30 border border-white/10 px-1.5 py-0.5 rounded">{cmd.shortcut}</kbd>
                          )}
                          {isSelected && <ArrowRight className="w-3.5 h-3.5 text-white/40" />}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              ))}
              {results.length === 0 && (
                <div className="flex flex-col items-center gap-2 py-8 text-white/40">
                  <Search className="w-8 h-8" />
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/05 text-xs text-white/30">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1"><kbd className="border border-white/10 px-1 rounded">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="border border-white/10 px-1 rounded">↵</kbd> Open</span>
              </div>
              <span className="flex items-center gap-1">
                <Command className="w-3 h-3" /> K to toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
