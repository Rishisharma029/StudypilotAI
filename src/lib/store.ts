import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, Note, Flashcard, Deck, Task, StudySession, ChatSession, Notification } from '@/types'
import { generateId } from './utils'
import { mockUser } from './mock-session'

// ─── User Store ───────────────────────────────────────────────────────────────

interface UserStore {
  user: User
  updateUser: (updates: Partial<User>) => void
  addXP: (amount: number) => void
  addCoins: (amount: number) => void
  incrementStreak: () => void
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: mockUser,
      updateUser: (updates) => set((s) => ({ user: { ...s.user, ...updates } })),
      addXP: (amount) => set((s) => ({ user: { ...s.user, xp: s.user.xp + amount } })),
      addCoins: (amount) => set((s) => ({ user: { ...s.user, coins: s.user.coins + amount } })),
      incrementStreak: () => set((s) => ({ user: { ...s.user, streak: s.user.streak + 1 } })),
    }),
    { name: 'studypilot-user' }
  )
)

// ─── UI Store ─────────────────────────────────────────────────────────────────

interface UIStore {
  sidebarCollapsed: boolean
  commandPaletteOpen: boolean
  notificationsOpen: boolean
  activeModal: string | null
  theme: 'dark' | 'light'
  toggleSidebar: () => void
  toggleCommandPalette: () => void
  toggleNotifications: () => void
  openModal: (id: string) => void
  closeModal: () => void
  setTheme: (theme: 'dark' | 'light') => void
}

export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      commandPaletteOpen: false,
      notificationsOpen: false,
      activeModal: null,
      theme: 'dark',
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
      toggleNotifications: () => set((s) => ({ notificationsOpen: !s.notificationsOpen })),
      openModal: (id) => set({ activeModal: id }),
      closeModal: () => set({ activeModal: null }),
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'studypilot-ui' }
  )
)

// ─── Notes Store ──────────────────────────────────────────────────────────────

interface NotesStore {
  notes: Note[]
  activeNoteId: string | null
  addNote: (note: Partial<Note>) => Note
  updateNote: (id: string, updates: Partial<Note>) => void
  deleteNote: (id: string) => void
  pinNote: (id: string) => void
  favoriteNote: (id: string) => void
  setActiveNote: (id: string | null) => void
}

export const useNotesStore = create<NotesStore>()(
  persist(
    (set, get) => ({
      notes: [
        {
          id: 'note_1',
          title: 'Operating Systems Notes',
          content: '# Operating Systems Notes\n\nAn Operating System (OS) is software that manages computer hardware resources and provides common services for computer programs.\n\n## Key Concepts\n- **Process Management**: CPU scheduling, deadlock resolution, and synchronization.\n- **Memory Management**: Paging, segmentation, and virtual memory.\n- **File Systems**: File structures, directories, and disk allocation.',
          tags: ['cs', 'os', 'semester'],
          isPinned: true,
          isFavorite: true,
          isArchived: false,
          color: '#6366f1',
          createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
          wordCount: 120,
          subject: 'Computer Science',
          aiSummary: 'Covers process management, memory management, and file systems in OS.',
        },
        {
          id: 'note_2',
          title: 'DBMS Unit 3',
          content: '# DBMS Unit 3 — Relational Database Design\n\nThis unit covers relational database design theory, normalization, and dependency preservation.\n\n## Key Concepts\n- **Functional Dependencies (FDs)**: Constraints between attributes.\n- **Normalization Forms**: 1NF, 2NF, 3NF, and BCNF.\n- **Transaction Properties (ACID)**: Atomicity, Consistency, Isolation, and Durability.',
          tags: ['cs', 'dbms', 'normalization'],
          isPinned: false,
          isFavorite: true,
          isArchived: false,
          color: '#8b5cf6',
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          wordCount: 110,
          subject: 'Computer Science',
        },
        {
          id: 'note_3',
          title: 'Web Development',
          content: '# Web Development — Next.js & React\n\nModern full-stack web development using React, Next.js, and TypeScript.\n\n## Key Concepts\n- **React Server Components (RSC)**: Render components on the server for faster page loads.\n- **App Router**: Folder-based routing with layouts, pages, and loading states.\n- **Tailwind CSS**: Utility-first CSS styling framework.',
          tags: ['cs', 'webdev', 'nextjs'],
          isPinned: false,
          isFavorite: false,
          isArchived: false,
          color: '#06b6d4',
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
          wordCount: 95,
          subject: 'Computer Science',
        },
        {
          id: 'note_4',
          title: 'Computer Networks',
          content: '# Computer Networks — OSI Model & Protocols\n\nIntroduction to network architectures, layers, and protocols.\n\n## Key Concepts\n- **OSI 7 Layers**: Physical, Data Link, Network, Transport, Session, Presentation, Application.\n- **IP Addressing**: IPv4 and IPv6 routing and subnetting.\n- **Common Protocols**: HTTP, DNS, TCP, UDP, FTP.',
          tags: ['cs', 'networking', 'protocols'],
          isPinned: false,
          isFavorite: false,
          isArchived: false,
          color: '#10b981',
          createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
          wordCount: 140,
          subject: 'Computer Science',
        },
        {
          id: 'note_5',
          title: 'DSA Revision',
          content: '# DSA Revision — Trees & Graphs\n\nFast track revision for data structures and algorithms.\n\n## Key Concepts\n- **Binary Search Tree (BST)**: Left child < Root < Right child.\n- **Graph Traversals**: Breadth-First Search (BFS) and Depth-First Search (DFS).\n- **Complexity**: Big O analysis of common operations.',
          tags: ['cs', 'dsa', 'revision'],
          isPinned: false,
          isFavorite: false,
          isArchived: false,
          color: '#f59e0b',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          wordCount: 130,
          subject: 'Computer Science',
        },
      ],
      activeNoteId: 'note_1',
      addNote: (partial) => {
        const note: Note = {
          id: generateId(),
          title: 'Untitled Note',
          content: '',
          tags: [],
          isPinned: false,
          isFavorite: false,
          isArchived: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wordCount: 0,
          ...partial,
        }
        set((s) => ({ notes: [note, ...s.notes] }))
        return note
      },
      updateNote: (id, updates) => set((s) => ({
        notes: s.notes.map((n) => n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n),
      })),
      deleteNote: (id) => set((s) => ({ notes: s.notes.filter((n) => n.id !== id) })),
      pinNote: (id) => set((s) => ({
        notes: s.notes.map((n) => n.id === id ? { ...n, isPinned: !n.isPinned } : n),
      })),
      favoriteNote: (id) => set((s) => ({
        notes: s.notes.map((n) => n.id === id ? { ...n, isFavorite: !n.isFavorite } : n),
      })),
      setActiveNote: (id) => set({ activeNoteId: id }),
    }),
    { name: 'studypilot-notes' }
  )
)

// ─── Tasks Store ──────────────────────────────────────────────────────────────

interface TasksStore {
  tasks: Task[]
  addTask: (task: Partial<Task>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void
  moveTask: (id: string, status: Task['status']) => void
  toggleSubtask: (taskId: string, subtaskId: string) => void
}

export const useTasksStore = create<TasksStore>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: 't1',
          title: 'Complete DBMS Assignment',
          description: 'Normalization exercises up to BCNF',
          status: 'in-progress',
          priority: 'high',
          dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
          subject: 'Computer Science',
          tags: ['assignment', 'urgent'],
          isRecurring: false,
          subtasks: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: 't2',
          title: 'Prepare DSA Quiz',
          description: 'Practice binary tree traversals',
          status: 'todo',
          priority: 'high',
          dueDate: new Date(Date.now() + 86400000).toISOString(),
          subject: 'Computer Science',
          tags: ['quiz', 'study'],
          isRecurring: false,
          subtasks: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: 't3',
          title: 'Maths Revision',
          description: 'Differential equations and calculus review',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(Date.now() + 86400000 * 4).toISOString(),
          subject: 'Math',
          tags: ['revision'],
          isRecurring: false,
          subtasks: [],
          createdAt: new Date().toISOString(),
        },
        {
          id: 't4',
          title: 'Finish OS Notes',
          description: 'CPU scheduling algorithms section',
          status: 'todo',
          priority: 'medium',
          dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
          subject: 'Computer Science',
          tags: ['notes'],
          isRecurring: false,
          subtasks: [],
          createdAt: new Date().toISOString(),
        },
      ],
      addTask: (partial) => set((s) => ({
        tasks: [{
          id: generateId(),
          title: 'New Task',
          status: 'todo',
          priority: 'medium',
          tags: [],
          isRecurring: false,
          subtasks: [],
          createdAt: new Date().toISOString(),
          ...partial,
        } as Task, ...s.tasks],
      })),
      updateTask: (id, updates) => set((s) => ({
        tasks: s.tasks.map((t) => t.id === id ? { ...t, ...updates } : t),
      })),
      deleteTask: (id) => set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),
      moveTask: (id, status) => set((s) => ({
        tasks: s.tasks.map((t) => t.id === id ? { ...t, status, completedAt: status === 'done' ? new Date().toISOString() : undefined } : t),
      })),
      toggleSubtask: (taskId, subtaskId) => set((s) => ({
        tasks: s.tasks.map((t) => t.id === taskId ? {
          ...t,
          subtasks: t.subtasks.map((st) => st.id === subtaskId ? { ...st, completed: !st.completed } : st),
        } : t),
      })),
    }),
    { name: 'studypilot-tasks' }
  )
)

// ─── Chat Store ───────────────────────────────────────────────────────────────

interface ChatStore {
  sessions: ChatSession[]
  activeSessionId: string | null
  isLoading: boolean
  addSession: (subject?: string, mode?: ChatSession['mode']) => ChatSession
  addMessage: (sessionId: string, message: Omit<import('@/types').ChatMessage, 'id' | 'timestamp'>) => void
  setActiveSession: (id: string | null) => void
  setLoading: (loading: boolean) => void
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      sessions: [
        {
          id: 'chat_1',
          title: 'Explain TCP vs UDP',
          subject: 'Computer Science',
          mode: 'teacher',
          messages: [
            {
              id: 'm1',
              role: 'user',
              content: 'Explain TCP vs UDP.',
              timestamp: new Date(Date.now() - 60000).toISOString(),
            },
            {
              id: 'm2',
              role: 'assistant',
              content: 'TCP is connection-oriented and guarantees delivery.\n\nUDP is connectionless, faster, and commonly used in gaming, streaming, and video calls.',
              timestamp: new Date(Date.now() - 50000).toISOString(),
            },
          ],
          createdAt: new Date(Date.now() - 60000).toISOString(),
          updatedAt: new Date(Date.now() - 50000).toISOString(),
        },
      ],
      activeSessionId: 'chat_1',
      isLoading: false,
      addSession: (subject = 'General', mode = 'teacher') => {
        const session: ChatSession = {
          id: generateId(),
          title: `${subject} Session`,
          subject,
          mode,
          messages: [{
            id: generateId(),
            role: 'assistant',
            content: `Hello! I'm your AI Tutor for **${subject}**. I'm in **${mode} mode**. How can I help you today? 🎓`,
            timestamp: new Date().toISOString(),
          }],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((s) => ({ sessions: [session, ...s.sessions], activeSessionId: session.id }))
        return session
      },
      addMessage: (sessionId, msg) => set((s) => ({
        sessions: s.sessions.map((sess) => sess.id === sessionId ? {
          ...sess,
          messages: [...sess.messages, { id: generateId(), timestamp: new Date().toISOString(), ...msg }],
          updatedAt: new Date().toISOString(),
        } : sess),
      })),
      setActiveSession: (id) => set({ activeSessionId: id }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    { name: 'studypilot-chat' }
  )
)

// ─── Pomodoro Store ───────────────────────────────────────────────────────────

interface PomodoroStore {
  mode: 'focus' | 'short-break' | 'long-break'
  timeLeft: number
  isRunning: boolean
  sessionsCompleted: number
  currentSubject: string
  ambientSound: string | null
  durations: { focus: number; shortBreak: number; longBreak: number }
  sessions: Array<{ mode: string; duration: number; date: string; subject: string }>
  setMode: (mode: PomodoroStore['mode']) => void
  setTimeLeft: (time: number) => void
  toggleRunning: () => void
  completeSession: () => void
  setSubject: (subject: string) => void
  setAmbientSound: (sound: string | null) => void
  updateDuration: (mode: keyof PomodoroStore['durations'], value: number) => void
}

export const usePomodoroStore = create<PomodoroStore>()(
  persist(
    (set) => ({
      mode: 'focus',
      timeLeft: 25 * 60,
      isRunning: false,
      sessionsCompleted: 0,
      currentSubject: 'General',
      ambientSound: null,
      durations: { focus: 25, shortBreak: 5, longBreak: 15 },
      sessions: [],
      setMode: (mode) => set((s) => ({ mode, timeLeft: s.durations[mode === 'focus' ? 'focus' : mode === 'short-break' ? 'shortBreak' : 'longBreak'] * 60, isRunning: false })),
      setTimeLeft: (timeLeft) => set({ timeLeft }),
      toggleRunning: () => set((s) => ({ isRunning: !s.isRunning })),
      completeSession: () => set((s) => ({
        sessionsCompleted: s.sessionsCompleted + 1,
        sessions: [...s.sessions, { mode: s.mode, duration: s.durations.focus, date: new Date().toISOString(), subject: s.currentSubject }],
      })),
      setSubject: (currentSubject) => set({ currentSubject }),
      setAmbientSound: (ambientSound) => set({ ambientSound }),
      updateDuration: (mode, value) => set((s) => ({ durations: { ...s.durations, [mode]: value } })),
    }),
    { name: 'studypilot-pomodoro' }
  )
)

// ─── Notifications Store ──────────────────────────────────────────────────────

interface NotificationsStore {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notif: Omit<Notification, 'id' | 'isRead' | 'timestamp'>) => void
  markRead: (id: string) => void
  markAllRead: () => void
  remove: (id: string) => void
}

export const useNotificationsStore = create<NotificationsStore>()(
  persist(
    (set) => ({
      notifications: [
        {
          id: 'n1',
          type: 'reminder',
          title: 'Exam Reminder',
          message: 'Maths II exam in 4 days. Remember to practice differential equations!',
          isRead: false,
          timestamp: new Date(Date.now() - 1800000).toISOString(),
          action: { label: 'View Exams', href: '/exam-hub' },
        },
        {
          id: 'n2',
          type: 'achievement',
          title: '🏆 Achievement Unlocked!',
          message: 'You earned the "7-Day Streak" badge! +200 XP',
          isRead: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: 'n3',
          type: 'revision',
          title: '📚 Revision Time',
          message: 'DSA quiz preparation due tomorrow. Practice binary trees!',
          isRead: true,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          action: { label: 'Start Revision', href: '/flashcards' },
        },
        {
          id: 'n4',
          type: 'deadline',
          title: 'DBMS Assignment Due',
          message: 'DBMS Unit 3 assignment is due this Friday.',
          isRead: true,
          timestamp: new Date(Date.now() - 10800000).toISOString(),
        },
      ],
      unreadCount: 2,
      addNotification: (notif) => set((s) => ({
        notifications: [{ id: generateId(), isRead: false, timestamp: new Date().toISOString(), ...notif }, ...s.notifications],
        unreadCount: s.unreadCount + 1,
      })),
      markRead: (id) => set((s) => ({
        notifications: s.notifications.map((n) => n.id === id ? { ...n, isRead: true } : n),
        unreadCount: Math.max(0, s.unreadCount - 1),
      })),
      markAllRead: () => set((s) => ({
        notifications: s.notifications.map((n) => ({ ...n, isRead: true })),
        unreadCount: 0,
      })),
      remove: (id) => set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) })),
    }),
    { name: 'studypilot-notifications' }
  )
)
