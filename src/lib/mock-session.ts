import type { User } from '@/types'

export const mockUser: User = {
  id: "demo-user",
  name: "Rishi Sharma",
  email: "demo@studypilot.ai",
  avatar: "https://ui-avatars.com/api/?name=Rishi+Sharma&background=6366f1&color=fff&size=128",
  role: 'student',
  plan: 'free', // 'free' acts as internal mapping for beta
  xp: 3750,
  level: 7,
  coins: 1240,
  streak: 12,
  rank: 'silver',
  joinedAt: '2024-08-15',
  subjects: ['Math', 'Physics', 'Computer Science', 'Chemistry'],
  targetExam: 'JEE',
  cgpa: 8.4
};
