'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Trophy, Star, Flame, Zap, Users, Medal, Crown, Lock, Check, Gift,
  Target, Calendar, Clock, ChevronLeft, ChevronRight, Plus, Edit,
  Sparkles, Award, Coins, BookOpen, AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock achievements
const achievements = [
  { id: 1, name: 'Night Owl', desc: 'Study for 2+ hours after 10 PM', xp: 150, rarity: 'Common', unlocked: true, category: 'Study', icon: '🌙' },
  { id: 2, name: 'Kinematics Master', desc: 'Score 90%+ in a Physics quiz', xp: 300, rarity: 'Rare', unlocked: true, category: 'Quiz', icon: '⚡' },
  { id: 3, name: 'Streak Flame', desc: 'Maintain a study streak for 7 days', xp: 500, rarity: 'Epic', unlocked: true, category: 'Streak', icon: '🔥' },
  { id: 4, name: 'Perfect Score', desc: 'Get 100% correct in any quiz', xp: 1000, rarity: 'Legendary', unlocked: false, category: 'Special', icon: '🏆' },
  { id: 5, name: 'Code Warrior', desc: 'Solve 10 programming issues', xp: 250, rarity: 'Common', unlocked: true, category: 'Study', icon: '💻' },
  { id: 6, name: 'Library Explorer', desc: 'Read 5 study notes completely', xp: 150, rarity: 'Common', unlocked: true, category: 'Study', icon: '📚' },
  { id: 7, name: 'Note Builder', desc: 'Create 15 structured study notes', xp: 300, rarity: 'Rare', unlocked: false, category: 'Study', icon: '📝' },
  { id: 8, name: 'Voice Practitioner', desc: 'Interact with Voice tutor for 30m', xp: 500, rarity: 'Epic', unlocked: false, category: 'Special', icon: '🎙️' },
]

// Mock Leaderboard
const leaderboardUsers = [
  { rank: 1, name: 'Aarav Mehta', xp: 5420, level: 9, avatar: 'https://ui-avatars.com/api/?name=Aarav+Mehta&background=f59e0b&color=fff' },
  { rank: 2, name: 'Priya Sharma', xp: 4890, level: 8, avatar: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=a855f7&color=fff' },
  { rank: 3, name: 'Rohan Gupta', xp: 4120, level: 7, avatar: 'https://ui-avatars.com/api/?name=Rohan+Gupta&background=06b6d4&color=fff' },
  { rank: 4, name: 'Rishi Sharma (You)', xp: 3750, level: 7, avatar: 'https://ui-avatars.com/api/?name=Rishi+Sharma&background=6366f1&color=fff', isUser: true },
  { rank: 5, name: 'Sneha Patel', xp: 3200, level: 6, avatar: 'https://ui-avatars.com/api/?name=Sneha+Patel&background=ec4899&color=fff' },
]

export default function GamificationPage() {
  const [activeTab, setActiveTab] = useState<'weekly' | 'monthly' | 'all'>('weekly')
  const [missions, setMissions] = useState([
    { id: 1, text: 'Study 2 hours total', progress: 1.5, target: 2, reward: 100, claimed: false },
    { id: 2, text: 'Complete 10 flashcards', progress: 10, target: 10, reward: 150, claimed: false },
    { id: 3, text: 'Complete 1 MCQ Quiz', progress: 0, target: 1, reward: 200, claimed: false },
  ])

  const claimMissionReward = (id: number) => {
    setMissions(missions.map(m => m.id === id ? { ...m, claimed: true } : m))
  }

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-16 h-16 rounded-full border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center text-3xl">
            🏆
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-1.5">
              Gamification Hub
            </h1>
            <p className="text-xs text-slate-400">Level up your study routine, earn coins and compete on the leaderboards</p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-xs font-semibold">
            <Flame className="w-4 h-4 fill-orange-500" />
            <span>Streak: 12 Days</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-400 text-xs font-semibold">
            <Coins className="w-4 h-4" />
            <span>1,240 Coins</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Missions, Achievements & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Column 1 & 2: Daily Missions & Achievements (Wide) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Missions */}
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-400" /> Daily Missions
            </h3>

            <div className="space-y-3">
              {missions.map((mission) => {
                const isComplete = mission.progress >= mission.target
                const progressPercent = Math.round((mission.progress / mission.target) * 100)
                return (
                  <div key={mission.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-white">{mission.text}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">{mission.progress}/{mission.target} completed</span>
                        <div className="w-20 h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${progressPercent}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-bold text-indigo-400 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> +{mission.reward} XP
                      </span>

                      {mission.claimed ? (
                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          ✓ Claimed
                        </span>
                      ) : (
                        <button
                          onClick={() => claimMissionReward(mission.id)}
                          disabled={!isComplete}
                          className={cn(
                            "px-3.5 py-1.5 rounded text-[10px] font-semibold flex items-center gap-1 transition-all",
                            isComplete 
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer" 
                              : "bg-slate-800 text-slate-500 cursor-not-allowed"
                          )}
                        >
                          Claim Reward
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-purple-400" /> Badges & Achievements
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((ach) => (
                <div 
                  key={ach.id} 
                  className={cn(
                    "p-4 rounded-xl border flex gap-3.5 transition-all relative overflow-hidden",
                    ach.unlocked 
                      ? "border-purple-500/20 bg-purple-500/5" 
                      : "border-white/5 bg-slate-950/20 opacity-50"
                  )}
                >
                  <span className="text-3xl shrink-0 select-none">{ach.icon}</span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-white">{ach.name}</h4>
                      <span className={cn(
                        "text-[8px] font-bold px-1.5 py-0.5 rounded",
                        ach.rarity === 'Legendary' ? 'bg-amber-500/10 text-amber-400' :
                        ach.rarity === 'Epic' ? 'bg-purple-500/10 text-purple-400' : 'bg-slate-800 text-slate-400'
                      )}>
                        {ach.rarity}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-snug">{ach.desc}</p>
                    <span className="text-[9px] font-semibold text-purple-400 block pt-1">+{ach.xp} XP Reward</span>
                  </div>
                  {!ach.unlocked && (
                    <div className="absolute top-2 right-2 text-slate-600">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Leaderboard (Right Sidebar) */}
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-[520px]">
          <div className="space-y-4 flex-1">
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Weekly Leaderboard
            </h3>

            <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5 text-center">
              {(['weekly', 'monthly'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={cn(
                    "flex-1 py-1 text-[10px] font-bold rounded transition-colors capitalize",
                    activeTab === t ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              {leaderboardUsers.map((lb) => (
                <div 
                  key={lb.rank} 
                  className={cn(
                    "p-3 rounded-xl border flex items-center justify-between gap-3 text-xs",
                    lb.isUser 
                      ? "border-indigo-500/30 bg-indigo-500/10" 
                      : "border-white/5 bg-slate-950/20"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px]",
                      lb.rank === 1 ? "bg-yellow-500/20 text-yellow-400" :
                      lb.rank === 2 ? "bg-slate-400/20 text-slate-300" :
                      lb.rank === 3 ? "bg-amber-600/20 text-amber-500" : "text-slate-500"
                    )}>
                      {lb.rank}
                    </span>
                    <img src={lb.avatar} alt="" className="w-7 h-7 rounded-full border border-white/10" />
                    <div>
                      <h4 className="font-bold text-white line-clamp-1">{lb.name}</h4>
                      <span className="text-[9px] text-slate-500">Level {lb.level}</span>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-indigo-400">{lb.xp} XP</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 text-center text-[10px] text-slate-500">
            Leaderboard updates every Sunday at 12:00 AM
          </div>
        </div>
      </div>
    </div>
  )
}
