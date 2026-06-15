'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Brain, Mic, MicOff, Send, Paperclip, ChevronDown, Plus, History,
  BookOpen, FlaskConical, Calculator, Atom, Code2, Globe, User, Sparkles,
  Volume2, VolumeX, Copy, ThumbsUp, ThumbsDown, RefreshCw, X, Square
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useChatStore, useUserStore } from '@/lib/store'

export default function AiTutorPage() {
  const { sessions, activeSessionId, isLoading, addSession, addMessage, setActiveSession, setLoading } = useChatStore()
  const { user } = useUserStore()
  
  const [inputText, setInputText] = useState('')
  const [activeSubject, setActiveSubject] = useState('Physics')
  const [activeMode, setActiveMode] = useState<'teacher' | 'beginner' | 'exam' | 'interview'>('teacher')
  const [isVoiceActive, setIsVoiceActive] = useState(false)
  const [voiceWaveform, setVoiceWaveform] = useState<number[]>([10, 25, 40, 25, 10])

  const chatContainerRef = useRef<HTMLDivElement>(null)
  
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0]

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [activeSession?.messages, isLoading])

  // Waveform animation loop
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isVoiceActive) {
      interval = setInterval(() => {
        setVoiceWaveform(Array.from({ length: 8 }, () => Math.floor(Math.random() * 35) + 5))
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isVoiceActive])

  const handleSend = () => {
    if (!inputText.trim() || !activeSession) return

    // Add user message
    addMessage(activeSession.id, {
      role: 'user',
      content: inputText
    })
    const userText = inputText
    setInputText('')
    setLoading(true)

    // Simulate AI response
    setTimeout(() => {
      setLoading(false)
      let replyContent = "I've analyzed your question. "
      
      if (activeSubject === 'Physics') {
        replyContent += `In Physics, understanding this requires looking at the conservation of energy. If we apply the formula $E = mc^2$ or the kinetic energy relation $KE = \\frac{1}{2}mv^2$, we can see that the variables are directly proportional. For example, doubling the mass doubles the total energy.`
      } else if (activeSubject === 'Math') {
        replyContent += `Let's solve this step by step:
$$\\int x e^x dx$$
Using integration by parts formula:
$$\\int u dv = uv - \\int v du$$
1. Let $u = x \\implies du = dx$
2. Let $dv = e^x dx \\implies v = e^x$
Applying the formula:
$$= x e^x - \\int e^x dx = x e^x - e^x + C$$`
      } else {
        replyContent += `Here is a structured explanation of the concept under **${activeSubject}** in **${activeMode}** mode. It is fundamental to core exams and features frequently in mock evaluations.`
      }

      addMessage(activeSession.id, {
        role: 'assistant',
        content: replyContent
      })
    }, 1500)
  }

  const handleQuickPrompt = (prompt: string) => {
    setInputText(prompt)
  }

  const toggleVoiceMode = () => {
    setIsVoiceActive(!isVoiceActive)
  }

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
      {/* Session History Sidebar */}
      <div className="w-64 border-r border-white/5 bg-slate-900/30 flex flex-col justify-between shrink-0 p-4 space-y-4">
        <div className="space-y-4 flex-1 overflow-y-auto">
          <button 
            onClick={() => addSession(activeSubject, activeMode)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Study Session
          </button>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">History</h3>
            <div className="space-y-1.5">
              {sessions.map((sess) => {
                const isActive = sess.id === activeSession?.id
                return (
                  <button
                    key={sess.id}
                    onClick={() => setActiveSession(sess.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-colors",
                      isActive ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <History className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span className="truncate">{sess.title}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-indigo-500/10 bg-indigo-500/5 text-center">
          <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-1.5" />
          <h4 className="text-xs font-bold text-white">Advanced AI Tutor</h4>
          <p className="text-[10px] text-slate-400 mt-1">Multi-turn capability with exam prioritization active.</p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/20">
        {/* Chat Header Bar */}
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">StudyPilot AI Tutor</h2>
              <p className="text-[10px] text-slate-400">Personalized study support active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Subject Selector */}
            <select
              value={activeSubject}
              onChange={(e) => setActiveSubject(e.target.value)}
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900 text-xs text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="Physics">Physics</option>
              <option value="Math">Mathematics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
              <option value="History">History</option>
            </select>

            {/* Mode Selector */}
            <select
              value={activeMode}
              onChange={(e) => setActiveMode(e.target.value as any)}
              className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900 text-xs text-white font-medium focus:outline-none focus:border-indigo-500"
            >
              <option value="teacher">👨‍🏫 Teacher Mode</option>
              <option value="beginner">👶 Beginner Mode</option>
              <option value="exam">📚 Exam Mode</option>
              <option value="interview">🎯 Interview Mode</option>
            </select>

            <button 
              onClick={toggleVoiceMode}
              className={cn(
                "p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-all",
                isVoiceActive 
                  ? "border-rose-500/30 bg-rose-500/15 text-rose-400 animate-pulse" 
                  : "border-white/5 bg-slate-900 text-slate-400 hover:text-white"
              )}
            >
              {isVoiceActive ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              <span>Voice</span>
            </button>
          </div>
        </div>

        {/* Chat Messages Log */}
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6">
          {activeSession?.messages.map((msg) => {
            const isAI = msg.role === 'assistant'
            return (
              <div key={msg.id} className={cn("flex gap-3", isAI ? "justify-start" : "justify-end")}>
                {isAI && (
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4" />
                  </div>
                )}
                <div className="max-w-[75%] space-y-1">
                  <div className={cn(
                    "p-4 rounded-2xl text-sm leading-relaxed",
                    isAI 
                      ? "border border-white/5 bg-slate-900/50 text-slate-300 rounded-tl-none font-normal" 
                      : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-tr-none font-medium"
                  )}>
                    {msg.content.split('\n\n').map((para, pIdx) => (
                      <p key={pIdx} className={cn(pIdx > 0 && "mt-2")}>{para}</p>
                    ))}
                  </div>
                  <span className="text-[9px] text-slate-500 block px-1">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                {!isAI && (
                  <div className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            )
          })}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl border border-white/5 bg-slate-900/50 text-slate-300 rounded-tl-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}
        </div>

        {/* Voice Waveform Overlay (when Voice is active) */}
        {isVoiceActive && (
          <div className="px-6 py-3 border-t border-white/5 bg-rose-500/5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs text-rose-400 font-semibold uppercase">Listening to voice inputs...</span>
            </div>
            <div className="flex items-end gap-1 h-6">
              {voiceWaveform.map((val, idx) => (
                <div 
                  key={idx} 
                  className="w-1 bg-rose-500 rounded-t-full transition-all duration-100" 
                  style={{ height: `${val}px` }} 
                />
              ))}
            </div>
          </div>
        )}

        {/* Bottom Inputs and Prompt Chips */}
        <div className="p-4 border-t border-white/5 bg-slate-900/20 space-y-3">
          {/* Quick Prompts Chips */}
          <div className="flex flex-wrap gap-2 overflow-x-auto pb-1 max-w-full">
            <button 
              onClick={() => handleQuickPrompt('Explain Heisenberg Uncertainty Principle.')}
              className="text-[11px] px-3 py-1 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              💡 Explain Concept
            </button>
            <button 
              onClick={() => handleQuickPrompt('Give me a simple everyday example of Newton\'s Third Law.')}
              className="text-[11px] px-3 py-1 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              🔍 Give Example
            </button>
            <button 
              onClick={() => handleQuickPrompt('Write a 3-question MCQ quiz on Kinematics.')}
              className="text-[11px] px-3 py-1 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              🎯 Make a Quiz
            </button>
            <button 
              onClick={() => handleQuickPrompt('Summarize the main equations of electrostatics.')}
              className="text-[11px] px-3 py-1 rounded-full border border-white/5 bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              📚 Summarize formulas
            </button>
          </div>

          {/* Text Input Row */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-xl border border-white/5 bg-slate-900 text-slate-400 hover:text-white shrink-0">
              <Paperclip className="w-4 h-4" />
            </button>
            
            <input
              type="text"
              placeholder={`Ask anything about ${activeSubject}...`}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 px-4 py-2.5 text-sm rounded-xl border border-white/5 bg-slate-950/60 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            />

            <button 
              onClick={handleSend}
              className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-95 transition-opacity shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
