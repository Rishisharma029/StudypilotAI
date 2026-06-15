// StudyPilot AI — Complete Type Definitions

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'student' | 'admin'
  plan: 'free' | 'pro' | 'elite'
  xp: number
  level: number
  coins: number
  streak: number
  rank: 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond'
  joinedAt: string
  subjects: string[]
  targetExam?: string
  cgpa?: number
}

export interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  folderId?: string
  isPinned: boolean
  isFavorite: boolean
  isArchived: boolean
  color?: string
  createdAt: string
  updatedAt: string
  wordCount: number
  subject?: string
  aiSummary?: string
}

export interface Folder {
  id: string
  name: string
  color: string
  icon: string
  parentId?: string
  noteCount: number
  createdAt: string
}

export interface Flashcard {
  id: string
  deckId: string
  front: string
  back: string
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  interval: number
  dueDate: string
  timesReviewed: number
  correctCount: number
  subject?: string
  image?: string
  isAIGenerated: boolean
  createdAt: string
}

export interface Deck {
  id: string
  name: string
  description: string
  subject: string
  cardCount: number
  dueCount: number
  masteredCount: number
  color: string
  isPublic: boolean
  createdAt: string
  lastStudied?: string
}

export interface Quiz {
  id: string
  title: string
  subject: string
  difficulty: 'easy' | 'medium' | 'hard'
  questions: Question[]
  timeLimit?: number
  isAIGenerated: boolean
  createdAt: string
  attempts: QuizAttempt[]
}

export interface Question {
  id: string
  type: 'mcq' | 'fill-blank' | 'true-false' | 'short-answer'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  difficulty: 'easy' | 'medium' | 'hard'
  subject?: string
  points: number
}

export interface QuizAttempt {
  id: string
  quizId: string
  score: number
  maxScore: number
  percentage: number
  timeTaken: number
  answers: Record<string, string>
  completedAt: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  dueDate?: string
  subject?: string
  tags: string[]
  isRecurring: boolean
  recurringInterval?: 'daily' | 'weekly' | 'monthly'
  subtasks: Subtask[]
  completedAt?: string
  createdAt: string
}

export interface Subtask {
  id: string
  title: string
  completed: boolean
}

export interface Exam {
  id: string
  name: string
  subject: string
  date: string
  duration: number
  syllabus: string[]
  preparationLevel: number
  notes?: string
  isCompleted: boolean
  score?: number
  createdAt: string
}

export interface StudySession {
  id: string
  type: 'pomodoro' | 'free' | 'quiz' | 'flashcards'
  subject?: string
  duration: number
  focusScore: number
  date: string
  notes?: string
  mood?: 'great' | 'good' | 'okay' | 'bad'
}

export interface PomodoroSession {
  id: string
  mode: 'focus' | 'short-break' | 'long-break'
  duration: number
  completed: boolean
  subject?: string
  date: string
}

export interface CGPARecord {
  id: string
  semester: number
  year: string
  courses: Course[]
  sgpa: number
  cgpa: number
  totalCredits: number
}

export interface Course {
  id: string
  name: string
  code: string
  credits: number
  grade: string
  gradePoints: number
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'study' | 'quiz' | 'streak' | 'social' | 'special'
  xpReward: number
  coinReward: number
  isUnlocked: boolean
  unlockedAt?: string
  progress?: number
  maxProgress?: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  subject?: string
  isLoading?: boolean
  attachments?: string[]
}

export interface ChatSession {
  id: string
  title: string
  subject: string
  messages: ChatMessage[]
  createdAt: string
  updatedAt: string
  mode: 'teacher' | 'beginner' | 'exam' | 'interview'
}

export interface UploadedFile {
  id: string
  name: string
  type: 'pdf' | 'docx' | 'pptx' | 'txt' | 'image' | 'audio' | 'video'
  size: number
  url: string
  summary?: string
  keyPoints?: string[]
  flashcards?: Flashcard[]
  quiz?: Quiz
  transcription?: string
  uploadedAt: string
  folderId?: string
  tags: string[]
}

export interface AnalyticsData {
  studyHours: DailyData[]
  quizScores: DailyData[]
  subjectDistribution: SubjectData[]
  weeklyProductivity: WeeklyData[]
  streakHistory: DailyData[]
  focusScores: DailyData[]
  bestStudyTimes: HourlyData[]
}

export interface DailyData {
  date: string
  value: number
}

export interface SubjectData {
  subject: string
  hours: number
  color: string
  percentage: number
}

export interface WeeklyData {
  week: string
  hours: number
  score: number
  tasks: number
}

export interface HourlyData {
  hour: number
  score: number
  label: string
}

export interface Bookmark {
  id: string
  title: string
  url: string
  type: 'youtube' | 'article' | 'pdf' | 'website'
  thumbnail?: string
  tags: string[]
  folderId?: string
  notes?: string
  createdAt: string
}

export interface HabitEntry {
  id: string
  habit: 'sleep' | 'exercise' | 'water' | 'reading' | 'meditation'
  value: number
  unit: string
  date: string
  note?: string
}

export interface MoodEntry {
  id: string
  mood: 'amazing' | 'good' | 'neutral' | 'bad' | 'terrible'
  energy: number
  note?: string
  date: string
}

export interface ExamHubEntry {
  id: string
  exam: 'JEE' | 'NEET' | 'UPSC' | 'CUET' | 'BCA' | 'College'
  subject: string
  topic: string
  subtopics: string[]
  completed: boolean
  difficulty: 'easy' | 'medium' | 'hard'
  pyqCount: number
  mockTestScore?: number
}

export interface Notification {
  id: string
  type: 'reminder' | 'achievement' | 'deadline' | 'revision' | 'social'
  title: string
  message: string
  isRead: boolean
  timestamp: string
  action?: { label: string; href: string }
}

export interface SidebarItem {
  id: string
  label: string
  icon: string
  href: string
  badge?: number | string
  children?: SidebarItem[]
  isNew?: boolean
  isPro?: boolean
}

export interface DashboardWidget {
  id: string
  type: string
  col: number
  row: number
  colSpan: number
  rowSpan: number
}
