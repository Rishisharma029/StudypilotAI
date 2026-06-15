'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Users, UserPlus, Globe, Lock, MessageCircle, ThumbsUp, Share2,
  Eye, UserCheck, Trophy, Flame, Circle, CheckCircle, AlertCircle,
  Plus, Search, Shield, HelpCircle, ChevronRight, Bookmark
} from 'lucide-react'
import { cn } from '@/lib/utils'

const studyRooms = [
  { id: 1, name: 'JEE Physics Group', topic: 'Electrostatics problems discussion', members: 4, limit: 8, time: '2:14:10', type: 'Public' },
  { id: 2, name: 'Math Problem Solving', topic: 'Integration by parts sprint', members: 3, limit: 5, time: '1:05:40', type: 'Public' },
  { id: 3, name: 'NEET Biology', topic: 'Cell structure walkthrough', members: 6, limit: 10, time: '0:42:15', type: 'Public' },
  { id: 4, name: 'CS Interview Prep', topic: 'Mock coding whiteboard challenges', members: 2, limit: 4, time: '0:15:30', type: 'Private' },
]

const forumThreads = [
  { id: 1, title: 'How to memorize Organic Chemistry equations easily?', author: 'Sneha Patel', subject: 'Chemistry', replies: 12, likes: 45, time: '2h ago', pinned: true },
  { id: 2, title: 'Foundational concepts of Quantum Physics (Notes Link)', author: 'Rohan Gupta', subject: 'Physics', replies: 8, likes: 32, time: '4h ago', pinned: false },
  { id: 3, title: 'Is binary search tree complexity always O(log n)?', author: 'Aarav Mehta', subject: 'CS', replies: 15, likes: 28, time: 'Yesterday', pinned: false },
]

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<'rooms' | 'forum' | 'friends'>('rooms')
  
  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> Collaboration Hub
          </h1>
          <p className="text-xs text-slate-400">Join real-time virtual rooms, post doubts on community boards, and sync with peers</p>
        </div>

        {/* Tab Toggle */}
        <div className="flex p-0.5 bg-slate-950 rounded-xl border border-white/5 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('rooms')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'rooms' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Study Rooms
          </button>
          <button
            onClick={() => setActiveTab('forum')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'forum' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Community
          </button>
          <button
            onClick={() => setActiveTab('friends')}
            className={cn(
              "px-3 py-1.5 text-xs font-bold rounded transition-colors",
              activeTab === 'friends' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
            )}
          >
            Friends List
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'rooms' && (
          <motion.div 
            key="rooms"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Top creation row */}
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400">Join any active study sprint session</span>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                <Plus className="w-4 h-4" /> Create Room
              </button>
            </div>

            {/* Room cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyRooms.map((room) => (
                <div key={room.id} className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between h-48 group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">{room.name}</h3>
                      <p className="text-[10px] text-slate-500 mt-0.5">{room.topic}</p>
                    </div>
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                      room.type === 'Public' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800 text-slate-400'
                    )}>
                      {room.type}
                    </span>
                  </div>

                  <div className="flex justify-between items-center border-t border-white/5 pt-4 mt-2">
                    <div className="flex flex-col text-left">
                      <span className="text-[10px] text-slate-500">Session Timer</span>
                      <span className="text-xs font-mono font-bold text-white mt-0.5">{room.time}</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-slate-400">{room.members}/{room.limit} active</span>
                      <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors">
                        Join Sprint
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'forum' && (
          <motion.div 
            key="forum"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4 max-w-2xl mx-auto"
          >
            {/* Ask Question bar */}
            <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-white/5">
              <span className="text-xs text-slate-400">Search discussions or submit questions</span>
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors">
                <Plus className="w-4 h-4" /> Ask Doubt
              </button>
            </div>

            {/* Threads lists */}
            <div className="space-y-3">
              {forumThreads.map((thr) => (
                <div key={thr.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-3">
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span className="text-indigo-400">#{thr.subject}</span>
                    <div className="flex gap-2">
                      {thr.pinned && <span className="text-amber-500">★ PINNED</span>}
                      <span>{thr.time}</span>
                    </div>
                  </div>

                  <h3 className="text-xs font-bold text-slate-200 hover:text-indigo-400 transition-colors cursor-pointer leading-relaxed">
                    {thr.title}
                  </h3>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1 text-[10px] text-slate-500">
                    <span>By: {thr.author}</span>
                    
                    <div className="flex items-center gap-4 font-semibold text-slate-400">
                      <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {thr.likes}</span>
                      <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" /> {thr.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'friends' && (
          <motion.div 
            key="friends"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl text-center space-y-6 max-w-md mx-auto"
          >
            <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">Compare Peer Analytics</h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Add friends using email addresses or level handles to compare weekly study timers and streak accomplishments.
              </p>
            </div>
            
            <div className="flex gap-2 max-w-sm mx-auto">
              <input 
                type="text" 
                placeholder="Friend's email or username..."
                className="flex-1 px-4 py-2 text-xs rounded-xl border border-white/5 bg-slate-950 text-white focus:outline-none"
              />
              <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-colors">
                Add
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
