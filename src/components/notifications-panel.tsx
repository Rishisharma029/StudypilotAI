'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Bell, X, Check, CheckCheck, Trophy, BookOpen, Clock, AlertTriangle } from 'lucide-react'
import { cn, getRelativeTime } from '@/lib/utils'
import { useNotificationsStore, useUIStore } from '@/lib/store'

const typeIcons = {
  reminder: Clock,
  achievement: Trophy,
  deadline: AlertTriangle,
  revision: BookOpen,
  social: Bell,
}

const typeColors = {
  reminder: 'text-blue-400',
  achievement: 'text-yellow-400',
  deadline: 'text-red-400',
  revision: 'text-green-400',
  social: 'text-purple-400',
}

export function NotificationsPanel() {
  const { notificationsOpen, toggleNotifications } = useUIStore()
  const { notifications, unreadCount, markRead, markAllRead, remove } = useNotificationsStore()

  return (
    <AnimatePresence>
      {notificationsOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={toggleNotifications} />
          <motion.div
            className="absolute right-0 top-12 w-80 rounded-2xl overflow-hidden z-50 shadow-2xl"
            style={{
              background: 'rgba(10, 10, 20, 0.98)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/08">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-white/70" />
                <span className="text-sm font-semibold text-white">Notifications</span>
                {unreadCount > 0 && (
                  <span className="badge-indigo text-xs px-1.5 py-0.5">{unreadCount}</span>
                )}
              </div>
              <button
                onClick={markAllRead}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <CheckCheck className="w-3 h-3" /> Mark all read
              </button>
            </div>

            {/* Notifications list */}
            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-10 text-white/40">
                  <Bell className="w-8 h-8" />
                  <p className="text-sm">No notifications</p>
                </div>
              ) : (
                notifications.map((notif) => {
                  const Icon = typeIcons[notif.type]
                  const iconColor = typeColors[notif.type]
                  return (
                    <motion.div
                      key={notif.id}
                      layout
                      className={cn(
                        'flex gap-3 px-4 py-3 border-b border-white/04 hover:bg-white/03 transition-colors cursor-pointer',
                        !notif.isRead && 'bg-indigo-500/04'
                      )}
                      onClick={() => markRead(notif.id)}
                    >
                      <div className={cn(
                        'w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5',
                        'bg-white/06'
                      )}>
                        <Icon className={cn('w-4 h-4', iconColor)} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className={cn('text-sm font-medium leading-tight', notif.isRead ? 'text-white/70' : 'text-white')}>
                            {notif.title}
                          </p>
                          <button
                            onClick={(e) => { e.stopPropagation(); remove(notif.id) }}
                            className="text-white/20 hover:text-white/60 flex-shrink-0 mt-0.5"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-xs text-white/50 mt-0.5 leading-relaxed">{notif.message}</p>
                        <p className="text-xs text-white/30 mt-1">{getRelativeTime(notif.timestamp)}</p>
                      </div>
                      {!notif.isRead && (
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      )}
                    </motion.div>
                  )
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-white/06 text-center">
              <button className="text-xs text-indigo-400 hover:text-indigo-300">
                View all notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
