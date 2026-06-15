import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}m` : `${h}h`
}

export function getRelativeTime(date: string): string {
  const now = new Date()
  const then = new Date(date)
  const diff = now.getTime() - then.getTime()
  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (seconds < 60) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return formatDate(date)
}

export function getDaysUntil(date: string): number {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getGradePoints(grade: string): number {
  const gradeMap: Record<string, number> = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'D': 4, 'F': 0,
    'S': 10, 'S+': 10, 'A1': 10, 'A2': 9, 'B1': 8, 'B2': 7, 'C1': 6, 'C2': 5,
  }
  return gradeMap[grade] ?? 0
}

export function calculateSGPA(courses: { credits: number; gradePoints: number }[]): number {
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0)
  const totalPoints = courses.reduce((sum, c) => sum + c.credits * c.gradePoints, 0)
  return totalCredits > 0 ? Math.round((totalPoints / totalCredits) * 100) / 100 : 0
}

export function calculateCGPA(semesters: { sgpa: number; credits: number }[]): number {
  const totalCredits = semesters.reduce((sum, s) => sum + s.credits, 0)
  const totalWeighted = semesters.reduce((sum, s) => sum + s.sgpa * s.credits, 0)
  return totalCredits > 0 ? Math.round((totalWeighted / totalCredits) * 100) / 100 : 0
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function getXPForNextLevel(level: number): number {
  return level * level * 100
}

export function getXPProgress(xp: number): number {
  const level = getLevelFromXP(xp)
  const currentLevelXP = (level - 1) * (level - 1) * 100
  const nextLevelXP = getXPForNextLevel(level)
  return Math.round(((xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100)
}

export function getRankFromLevel(level: number): 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' {
  if (level < 10) return 'bronze'
  if (level < 25) return 'silver'
  if (level < 50) return 'gold'
  if (level < 100) return 'platinum'
  return 'diamond'
}

export function getSubjectColor(subject: string): string {
  const colors: Record<string, string> = {
    'Math': '#6366f1',
    'Physics': '#06b6d4',
    'Chemistry': '#10b981',
    'Biology': '#f59e0b',
    'Computer Science': '#8b5cf6',
    'History': '#ef4444',
    'English': '#ec4899',
    'Economics': '#84cc16',
    'Geography': '#f97316',
    'Psychology': '#a78bfa',
  }
  return colors[subject] ?? '#6366f1'
}

export function truncate(str: string, length: number): string {
  return str.length > length ? str.slice(0, length) + '...' : str
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}

export function shuffle<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const group = String(item[key])
    return { ...groups, [group]: [...(groups[group] || []), item] }
  }, {} as Record<string, T[]>)
}

export function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0)
}

export function average(arr: number[]): number {
  return arr.length > 0 ? sum(arr) / arr.length : 0
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  return 'Good evening'
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

export function getFileIcon(type: string): string {
  const icons: Record<string, string> = {
    pdf: '📄',
    docx: '📝',
    pptx: '📊',
    txt: '📋',
    image: '🖼️',
    audio: '🎵',
    video: '🎥',
  }
  return icons[type] ?? '📁'
}

export function getDifficultyColor(difficulty: string): string {
  const colors: Record<string, string> = {
    easy: 'text-green-400',
    medium: 'text-yellow-400',
    hard: 'text-red-400',
  }
  return colors[difficulty] ?? 'text-white'
}

export function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-400'
  if (score >= 60) return 'text-yellow-400'
  if (score >= 40) return 'text-orange-400'
  return 'text-red-400'
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return 'from-green-500 to-emerald-400'
  if (progress >= 60) return 'from-indigo-500 to-violet-500'
  if (progress >= 40) return 'from-yellow-500 to-orange-400'
  return 'from-red-500 to-pink-500'
}

export function isToday(date: string): boolean {
  const today = new Date()
  const d = new Date(date)
  return (
    today.getFullYear() === d.getFullYear() &&
    today.getMonth() === d.getMonth() &&
    today.getDate() === d.getDate()
  )
}

export function getWeekDates(): Date[] {
  const today = new Date()
  const day = today.getDay()
  const diff = today.getDate() - day + (day === 0 ? -6 : 1)
  const monday = new Date(today.setDate(diff))
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(monday)
    date.setDate(monday.getDate() + i)
    return date
  })
}

export function generateHeatmapData(months: number = 6): { date: string; level: number }[] {
  const data = []
  const today = new Date()
  for (let i = months * 30; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(today.getDate() - i)
    data.push({
      date: date.toISOString().split('T')[0],
      level: Math.random() > 0.3 ? Math.floor(Math.random() * 5) + 1 : 0,
    })
  }
  return data
}

export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
