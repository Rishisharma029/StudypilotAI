'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import {
  LayoutDashboard, Brain, FileText, CreditCard, Target, Calendar, CheckSquare,
  Timer, Trophy, GraduationCap, FileSearch, Video, Mic, PenTool, RefreshCw,
  BarChart3, Bookmark, FolderOpen, Code2, Briefcase, Users, Gamepad2,
  Settings, HelpCircle, ChevronLeft, ChevronRight, Bell, Search, LogOut,
  User, Sparkles, Flame, Star, Zap, ChevronDown, Plus, Command, X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore, useUserStore, useNotificationsStore } from '@/lib/store'
import { getXPProgress, getXPForNextLevel } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
  badge?: number | string
  isNew?: boolean
}

interface NavSection {
  title: string
  items: NavItem[]
}

// ─── Navigation Config ────────────────────────────────────────────────────────

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'MAIN',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'AI Tutor', href: '/ai-tutor', icon: Brain, isNew: true },
      { label: 'Notes', href: '/notes', icon: FileText },
      { label: 'Flashcards', href: '/flashcards', icon: CreditCard },
      { label: 'Quiz', href: '/quiz', icon: Target },
    ],
  },
  {
    title: 'STUDY TOOLS',
    items: [
      { label: 'Planner', href: '/planner', icon: Calendar },
      { label: 'Tasks', href: '/tasks', icon: CheckSquare },
      { label: 'Pomodoro', href: '/pomodoro', icon: Timer },
      { label: 'Exam Hub', href: '/exam-hub', icon: Trophy },
      { label: 'CGPA', href: '/cgpa', icon: GraduationCap },
    ],
  },
  {
    title: 'AI TOOLS',
    items: [
      { label: 'PDF Intelligence', href: '/pdf-ai', icon: FileSearch, badge: 'AI' },
      { label: 'Lecture AI', href: '/lecture-ai', icon: Video, badge: 'BETA' },
      { label: 'Voice Tutor', href: '/voice-tutor', icon: Mic, isNew: true },
      { label: 'Whiteboard', href: '/whiteboard', icon: PenTool },
      { label: 'Revision', href: '/revision', icon: RefreshCw },
    ],
  },
  {
    title: 'PRODUCTIVITY',
    items: [
      { label: 'Analytics', href: '/analytics', icon: BarChart3 },
      { label: 'Bookmarks', href: '/bookmarks', icon: Bookmark },
      { label: 'File Manager', href: '/files', icon: FolderOpen },
      { label: 'Coding', href: '/coding', icon: Code2 },
      { label: 'Career', href: '/career', icon: Briefcase },
    ],
  },
  {
    title: 'COMMUNITY',
    items: [
      { label: 'Social', href: '/social', icon: Users },
      { label: 'Gamification', href: '/gamification', icon: Gamepad2 },
      { label: 'Leaderboard', href: '/leaderboard', icon: Trophy, badge: '#4' },
    ],
  },
  {
    title: 'SETTINGS',
    items: [
      { label: 'Settings', href: '/settings', icon: Settings },
      { label: 'Help', href: '/help', icon: HelpCircle },
    ],
  },
]

// ─── Page Title Map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/ai-tutor': 'AI Tutor',
  '/notes': 'Notes',
  '/flashcards': 'Flashcards',
  '/quiz': 'Quiz',
  '/planner': 'Study Planner',
  '/tasks': 'Tasks',
  '/pomodoro': 'Pomodoro Timer',
  '/exam-hub': 'Exam Hub',
  '/cgpa': 'CGPA Calculator',
  '/pdf-ai': 'PDF Intelligence',
  '/lecture-ai': 'Lecture AI',
  '/voice-tutor': 'Voice Tutor',
  '/whiteboard': 'Whiteboard',
  '/revision': 'Revision',
  '/analytics': 'Analytics',
  '/bookmarks': 'Bookmarks',
  '/files': 'File Manager',
  '/coding': 'Coding',
  '/career': 'Career',
  '/social': 'Social',
  '/gamification': 'Gamification',
  '/leaderboard': 'Leaderboard',
  '/settings': 'Settings',
  '/help': 'Help & Support',
}

// ─── Sidebar Component ────────────────────────────────────────────────────────

function Sidebar() {
  const pathname = usePathname()
  const { sidebarCollapsed, toggleSidebar } = useUIStore()
  const { user } = useUserStore()
  const xpProgress = getXPProgress(user.xp)
  const nextLevelXP = getXPForNextLevel(user.level)

  return (
    <motion.aside
      initial={false}
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="frosted-sidebar h-screen sticky top-0 flex flex-col z-30 flex-shrink-0 overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-white/[0.05]">
        <AnimatePresence mode="wait">
          {!sidebarCollapsed ? (
            <motion.div
              key="logo-full"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2.5"
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
              >
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="gradient-text font-bold text-lg tracking-tight">StudyPilot</span>
            </motion.div>
          ) : (
            <motion.div
              key="logo-small"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 rounded-xl flex items-center justify-center mx-auto"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {!sidebarCollapsed && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10 text-white/40 hover:text-white/80"
          >
            <ChevronLeft className="w-4 h-4" />
          </motion.button>
        )}
      </div>

      {/* User Card */}
      <div
        className={cn(
          'border-b border-white/[0.05] transition-all duration-300',
          sidebarCollapsed ? 'p-3' : 'p-4'
        )}
      >
        {sidebarCollapsed ? (
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-9 h-9 rounded-full border-2 border-indigo-500/40"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#080818]" />
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 rounded-full border-2 border-indigo-500/40"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-[#080818]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white truncate">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="badge-indigo text-[10px] px-2 py-0.5">
                    <Zap className="w-2.5 h-2.5" /> Lv {user.level}
                  </span>
                  <span className="text-[10px] text-white/40 capitalize">{user.rank}</span>
                </div>
              </div>
            </div>

            {/* XP Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-white/40 font-medium">XP Progress</span>
                <span className="text-[10px] text-indigo-400 font-semibold">
                  {user.xp.toLocaleString()} / {nextLevelXP.toLocaleString()}
                </span>
              </div>
              <div className="xp-bar">
                <motion.div
                  className="xp-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                />
              </div>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Flame className="w-3 h-3 text-orange-400" />
                <span className="text-[11px] text-white/60">{user.streak}d</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400" />
                <span className="text-[11px] text-white/60">{user.coins.toLocaleString()}</span>
              </div>
              <div className="ml-auto">
                <span className="badge-indigo text-[10px] px-2 py-0.5 font-bold">BETA ACCESS</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-3 scrollbar-hide">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title} className="mb-2">
            {!sidebarCollapsed && (
              <p className="px-4 py-1.5 text-[10px] font-bold tracking-widest text-white/25 uppercase">
                {section.title}
              </p>
            )}
            {sidebarCollapsed && <div className="my-1 mx-3 border-t border-white/[0.04]" />}

            <div className={cn('space-y-0.5', sidebarCollapsed ? 'px-2' : 'px-2')}>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href}>
                    <motion.div
                      whileHover={{ x: sidebarCollapsed ? 0 : 2 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        'sidebar-item group relative',
                        isActive && 'active',
                        sidebarCollapsed && 'justify-center px-0 py-2.5'
                      )}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute left-0 top-1 bottom-1 w-0.5 rounded-full bg-indigo-400"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}

                      <Icon
                        className={cn(
                          'flex-shrink-0 transition-colors',
                          sidebarCollapsed ? 'w-5 h-5' : 'w-4 h-4',
                          isActive
                            ? 'text-indigo-400'
                            : 'text-white/40 group-hover:text-white/70'
                        )}
                      />

                      {!sidebarCollapsed && (
                        <span className="flex-1 text-[13px]">{item.label}</span>
                      )}

                      {!sidebarCollapsed && item.badge && (
                        <span className="badge-cyan text-[10px] px-1.5 py-0.5">{item.badge}</span>
                      )}
                      {!sidebarCollapsed && item.isNew && (
                        <span className="badge-green text-[10px] px-1.5 py-0.5">NEW</span>
                      )}

                      {/* Tooltip for collapsed mode */}
                      {sidebarCollapsed && (
                        <div
                          className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg text-xs font-medium text-white whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
                          style={{
                            background: 'rgba(15,15,30,0.98)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
                          }}
                        >
                          {item.label}
                          {item.isNew && (
                            <span className="ml-1.5 text-green-400 text-[10px]">NEW</span>
                          )}
                          {item.badge && (
                            <span className="ml-1.5 text-cyan-400 text-[10px]">{item.badge}</span>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Collapse Toggle (bottom when collapsed) */}
      {sidebarCollapsed && (
        <div className="p-3 border-t border-white/[0.05]">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center py-2 rounded-xl transition-colors hover:bg-white/10 text-white/40 hover:text-white/80"
          >
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}

      {/* Beta CTA */}
      {!sidebarCollapsed && (
        <div className="p-3 border-t border-white/[0.05]">
          <div
            className="rounded-xl p-3 text-center transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05))',
              border: '1px solid rgba(99,102,241,0.1)',
            }}
          >
            <Sparkles className="w-4 h-4 text-indigo-400 mx-auto mb-1" />
            <p className="text-[11px] text-white/60 leading-tight">
              StudyPilot AI Beta
            </p>
            <p className="text-[10px] text-white/30">Free Beta Access</p>
          </div>
        </div>
      )}
    </motion.aside>
  )
}

// ─── Command Palette ──────────────────────────────────────────────────────────

function CommandPalette() {
  const { commandPaletteOpen, toggleCommandPalette } = useUIStore()
  const [query, setQuery] = useState('')

  const allItems = NAV_SECTIONS.flatMap((s) => s.items)
  const filtered = query
    ? allItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
    : allItems.slice(0, 8)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggleCommandPalette()
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        toggleCommandPalette()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [commandPaletteOpen, toggleCommandPalette])

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="cmd-palette"
          onClick={toggleCommandPalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="cmd-palette-box"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.06]">
              <Search className="w-4 h-4 text-white/40 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Search pages, tools, actions…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
              <kbd
                className="px-1.5 py-0.5 text-[10px] text-white/30 rounded-md"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="py-2 max-h-80 overflow-y-auto scrollbar-hide">
              {filtered.map((item, idx) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href} onClick={toggleCommandPalette}>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-white/[0.04] cursor-pointer group transition-colors"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.15)',
                        }}
                      >
                        <Icon className="w-3.5 h-3.5 text-indigo-400" />
                      </div>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1">
                        {item.label}
                      </span>
                      {item.isNew && (
                        <span className="badge-green text-[10px]">NEW</span>
                      )}
                      {item.badge && (
                        <span className="badge-cyan text-[10px]">{item.badge}</span>
                      )}
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/[0.06] flex items-center gap-4 text-[11px] text-white/25">
              <span className="flex items-center gap-1">
                <kbd
                  className="px-1 rounded"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd
                  className="px-1 rounded"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  ↵
                </kbd>
                Open
              </span>
              <span className="flex items-center gap-1">
                <kbd
                  className="px-1 rounded"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  ⌘K
                </kbd>
                Toggle
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Notifications Panel ──────────────────────────────────────────────────────

function NotificationsPanel() {
  const { notificationsOpen, toggleNotifications } = useUIStore()
  const { notifications, unreadCount, markRead, markAllRead, remove } = useNotificationsStore()

  const typeIcons: Record<string, string> = {
    reminder: '⏰',
    achievement: '🏆',
    deadline: '📅',
    revision: '📚',
    social: '👥',
  }

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40"
            onClick={toggleNotifications}
          />
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className="absolute top-14 right-4 w-96 z-50 rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(10,10,22,0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(99,102,241,0.08)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-400" />
                <span className="font-semibold text-sm text-white">Notifications</span>
                {unreadCount > 0 && (
                  <span className="badge-indigo text-[10px] px-1.5 py-0.5">{unreadCount} new</span>
                )}
              </div>
              <button
                onClick={markAllRead}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
              >
                Mark all read
              </button>
            </div>

            {/* List */}
            <div className="max-h-[420px] overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <div className="empty-state py-12">
                  <div className="empty-state-icon">
                    <Bell className="w-8 h-8 text-indigo-400" />
                  </div>
                  <p className="text-sm text-white/40">No notifications yet</p>
                </div>
              ) : (
                notifications.map((notif, idx) => (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      'flex gap-3 px-4 py-3.5 border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors cursor-pointer group',
                      !notif.isRead && 'bg-indigo-500/[0.03]'
                    )}
                    onClick={() => markRead(notif.id)}
                  >
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {typeIcons[notif.type] ?? '🔔'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            'text-xs font-semibold leading-tight',
                            notif.isRead ? 'text-white/60' : 'text-white'
                          )}
                        >
                          {notif.title}
                        </p>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notif.isRead && (
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              remove(notif.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white/60"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[11px] text-white/40 mt-0.5 leading-relaxed">
                        {notif.message}
                      </p>
                      <p className="text-[10px] text-white/25 mt-1">
                        {new Date(notif.timestamp).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── User Menu Dropdown ───────────────────────────────────────────────────────

function UserMenu() {
  const [open, setOpen] = useState(false)
  const { user } = useUserStore()

  const menuItems = [
    { icon: User, label: 'Profile Settings', href: '/settings' },
    { icon: Sparkles, label: 'Beta Program', href: '/settings' },
    { icon: RefreshCw, label: 'Changelog', href: '#' },
    { icon: Target, label: 'Roadmap', href: '#' },
    { icon: HelpCircle, label: 'Feedback', href: '#' },
  ]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-white/[0.06] transition-colors"
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-7 h-7 rounded-full border border-indigo-500/30"
        />
        <span className="text-sm font-medium text-white/80 hidden sm:block">
          {user.name.split(' ')[0]}
        </span>
        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-white/40 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
              className="absolute right-0 top-12 w-52 z-50 rounded-2xl overflow-hidden py-1"
              style={{
                background: 'rgba(10,10,22,0.98)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* User info */}
              <div className="px-3 py-3 border-b border-white/[0.06]">
                <p className="text-xs font-semibold text-white">{user.name}</p>
                <p className="text-[11px] text-white/40 mt-0.5">{user.email}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="badge-purple text-[10px] px-2 py-0.5">
                    BETA
                  </span>
                  <span className="badge-indigo text-[10px] px-2 py-0.5">Lv {user.level}</span>
                </div>
              </div>

              {/* Menu items */}
              <div className="py-1">
                {menuItems.map(({ icon: Icon, label, href }) => (
                  <Link key={label} href={href} onClick={() => setOpen(false)}>
                    <div className="flex items-center gap-2.5 px-3 py-2 hover:bg-white/[0.04] transition-colors cursor-pointer group">
                      <Icon className="w-3.5 h-3.5 text-white/40 group-hover:text-indigo-400 transition-colors" />
                      <span className="text-xs text-white/70 group-hover:text-white transition-colors">
                        {label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Logout */}
              <div className="border-t border-white/[0.06] py-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-red-500/[0.06] transition-colors group">
                  <LogOut className="w-3.5 h-3.5 text-white/40 group-hover:text-red-400 transition-colors" />
                  <span className="text-xs text-white/70 group-hover:text-red-400 transition-colors">
                    Log out
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Top Header Bar ───────────────────────────────────────────────────────────

function TopHeader() {
  const pathname = usePathname()
  const { toggleCommandPalette, toggleNotifications, notificationsOpen } = useUIStore()
  const { unreadCount } = useNotificationsStore()
  const { user } = useUserStore()
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')

  const pageTitle = PAGE_TITLES[pathname] ?? 'StudyPilot AI'

  useEffect(() => {
    const update = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      )
      setDate(
        now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        })
      )
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="glass-nav h-14 flex items-center gap-4 px-4 sticky top-0 z-20">
      {/* Page Title */}
      <motion.h1
        key={pageTitle}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="text-sm font-bold text-white flex-shrink-0"
      >
        {pageTitle}
      </motion.h1>

      {/* Divider */}
      <div className="w-px h-4 bg-white/10 flex-shrink-0" />

      {/* Search Bar */}
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={toggleCommandPalette}
        className="flex items-center gap-2.5 flex-1 max-w-xs px-3 py-1.5 rounded-xl text-sm text-white/40 hover:text-white/60 transition-colors"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <Search className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="text-xs">Search everything…</span>
        <div className="ml-auto flex items-center gap-1">
          <kbd
            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[10px] text-white/25"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <Command className="w-2.5 h-2.5" />K
          </kbd>
        </div>
      </motion.button>

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Date/Time */}
        <div className="hidden lg:flex items-center gap-3 mr-2 text-[11px] text-white/40">
          <span>{date}</span>
          <span className="text-white/60 font-medium tabular-nums">{time}</span>
        </div>

        {/* XP/Streak compact */}
        <div
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl mr-1"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span className="text-[11px] font-semibold text-white/70">{user.streak}d</span>
          <div className="w-px h-3 bg-white/10" />
          <Zap className="w-3.5 h-3.5 text-indigo-400" />
          <span className="text-[11px] font-semibold text-white/70">
            {(user.xp / 1000).toFixed(1)}k XP
          </span>
        </div>

        {/* New button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white transition-all"
          style={{
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
          }}
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden lg:block">New</span>
        </motion.button>

        {/* Notifications Bell */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleNotifications}
            className={cn(
              'relative w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
              notificationsOpen ? 'bg-indigo-500/20' : 'hover:bg-white/[0.06]'
            )}
          >
            <Bell
              className={cn(
                'w-4 h-4',
                notificationsOpen ? 'text-indigo-400' : 'text-white/50'
              )}
            />
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center"
                style={{
                  background: '#6366f1',
                  boxShadow: '0 0 8px rgba(99,102,241,0.6)',
                }}
              >
                {unreadCount}
              </motion.span>
            )}
          </motion.button>
          <NotificationsPanel />
        </div>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  )
}

// ─── Root Dashboard Layout ────────────────────────────────────────────────────

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader />

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="min-h-full"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Command Palette — full screen overlay */}
      <CommandPalette />

      {/* Demo Mode Watermark */}
      <div 
        className="fixed bottom-4 right-4 z-50 glass-card px-3 py-1.5 text-xs text-indigo-400 font-semibold flex items-center gap-1.5 shadow-xl select-none cursor-help hover:border-indigo-500/50 transition-all duration-300"
        title="Using local data and mock AI responses."
      >
        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
        <span>✨ Demo Mode</span>
      </div>
    </div>
  )
}
