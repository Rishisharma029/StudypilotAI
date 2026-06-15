'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import {
  Code2, Play, RotateCcw, Copy, Download, Terminal, ChevronDown,
  BookOpen, CheckCircle, Trophy, Target, Briefcase, FileText, User,
  Star, Zap, Clock, Filter, Search, Plus, X, Check, Eye, EyeOff,
  GitBranch, Edit, Trash2
} from 'lucide-react'
import { Github } from '@/components/brand-icons'
import { cn } from '@/lib/utils'

// Mock problems
const mockProblems = [
  {
    id: 'p1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Arrays', 'Hash Table'],
    desc: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' }
    ],
    starterCode: {
      python: 'class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass',
      javascript: 'function twoSum(nums, target) {\n    // Write your code here\n};',
    }
  },
  {
    id: 'p2',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    tags: ['String', 'Stack'],
    desc: 'Given a string s containing just the characters \'(\', \')\', \'{\', \'}\', \'[\' and \']\', determine if the input string is valid.',
    examples: [
      { input: 's = "()[]{}"', output: 'true', explanation: '' }
    ],
    starterCode: {
      python: 'class Solution:\n    def isValid(self, s: str) -> bool:\n        # Write code here\n        pass',
      javascript: 'function isValid(s) {\n    // Write code here\n};',
    }
  }
]

export default function CodingPage() {
  const [activeProblem, setActiveProblem] = useState(mockProblems[0])
  const [language, setLanguage] = useState<'python' | 'javascript'>('python')
  const [code, setCode] = useState(activeProblem.starterCode.python)
  const [consoleOutput, setConsoleOutput] = useState('Console ready. Run code to see evaluations.')
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<'problem' | 'tracker'>('problem')

  const handleLanguageChange = (lang: 'python' | 'javascript') => {
    setLanguage(lang)
    setCode(activeProblem.starterCode[lang])
  }

  const handleProblemChange = (prob: typeof mockProblems[0]) => {
    setActiveProblem(prob)
    setCode(prob.starterCode[language])
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setConsoleOutput('Running tests...')
    setTimeout(() => {
      setIsRunning(false)
      setConsoleOutput('✓ All Tests Passed!\n\nTest Case 1: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExpected: [0,1]\n\nRuntime: 45ms (Beats 92% of Python3 submissions)')
    }, 1200)
  }

  const handleResetCode = () => {
    setCode(activeProblem.starterCode[language])
    setConsoleOutput('Console reset.')
  }

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
      {/* Coding Header Bar */}
      <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">CS Coding Workspace</h2>
            <p className="text-[10px] text-slate-400">DSA coding practice platform and LeetCode tracker</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5">
            <button
              onClick={() => setActiveTab('problem')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded transition-colors",
                activeTab === 'problem' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
              )}
            >
              Workspace
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={cn(
                "px-3 py-1.5 text-xs font-bold rounded transition-colors",
                activeTab === 'tracker' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
              )}
            >
              LeetCode Tracker
            </button>
          </div>

          {activeTab === 'problem' && (
            <>
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value as any)}
                className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900 text-xs text-white font-medium focus:outline-none"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (ES6)</option>
              </select>

              {/* Action Buttons */}
              <button 
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-white" /> Run Tests
              </button>
            </>
          )}
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'problem' ? (
          <>
            {/* Split View Left: Monaco-like Text Editor & Problem Statement */}
            <div className="w-[45%] border-r border-white/5 bg-slate-900/10 flex flex-col justify-between overflow-y-auto p-5 space-y-6">
              {/* Problem Select Dropdown */}
              <div className="space-y-1.5">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">Select Problem</span>
                <select
                  value={activeProblem.id}
                  onChange={(e) => {
                    const matched = mockProblems.find(p => p.id === e.target.value)
                    if (matched) handleProblemChange(matched)
                  }}
                  className="w-full px-3 py-2 rounded bg-slate-950 border border-white/5 text-xs text-white focus:outline-none"
                >
                  {mockProblems.map(p => (
                    <option key={p.id} value={p.id}>{p.title} ({p.difficulty})</option>
                  ))}
                </select>
              </div>

              {/* Problem details */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{activeProblem.title}</h3>
                  <span className={cn(
                    "text-[9px] font-bold px-2 py-0.5 rounded",
                    activeProblem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  )}>
                    {activeProblem.difficulty}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-line">
                  {activeProblem.desc}
                </p>

                {/* Example */}
                {activeProblem.examples.map((ex, idx) => (
                  <div key={idx} className="p-3 bg-slate-950/40 border border-white/5 rounded-xl text-xs space-y-2">
                    <span className="font-bold text-slate-400 uppercase tracking-widest text-[9px] block">Example {idx + 1}</span>
                    <p className="font-mono text-slate-300">Input: {ex.input}</p>
                    <p className="font-mono text-slate-300">Output: {ex.output}</p>
                    {ex.explanation && <p className="text-[10px] text-slate-500 leading-normal">Explanation: {ex.explanation}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Split View Right: Code Editor & Console Output */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 bg-slate-950/60 p-4 font-mono text-xs flex gap-3 relative">
                {/* Simulated Editor Line Numbers */}
                <div className="text-slate-600 text-right select-none pr-2 border-r border-white/5 space-y-1">
                  {Array.from({ length: 15 }).map((_, idx) => (
                    <div key={idx}>{idx + 1}</div>
                  ))}
                </div>
                {/* Editor Textarea */}
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 h-full bg-transparent text-slate-300 border-none focus:outline-none resize-none leading-relaxed placeholder:text-slate-700"
                />
              </div>

              {/* Console Output area */}
              <div className="h-44 border-t border-white/5 bg-slate-950 flex flex-col">
                <div className="p-3 border-b border-white/5 bg-slate-900/40 flex items-center justify-between shrink-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Output Console
                  </span>
                  <button 
                    onClick={handleResetCode}
                    className="text-[10px] text-slate-500 hover:text-white transition-colors"
                  >
                    Reset
                  </button>
                </div>
                <div className="flex-1 p-4 overflow-y-auto font-mono text-[10px] text-slate-300 leading-normal whitespace-pre-line">
                  {consoleOutput}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* LeetCode Tracker view */
          <div className="flex-1 p-8 overflow-y-auto space-y-6 max-w-4xl mx-auto">
            {/* KPI Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Solved Problems</span>
                <h3 className="text-2xl font-extrabold text-white mt-1">142 / 2,500</h3>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mt-3">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '5.68%' }} />
                </div>
              </div>

              <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Easy Problems</span>
                <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">89 Solved</h3>
                <span className="text-[10px] text-slate-500 block mt-2">Target: 200 Easy</span>
              </div>

              <div className="p-5 bg-slate-900/40 rounded-2xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Medium Problems</span>
                <h3 className="text-2xl font-extrabold text-amber-400 mt-1">48 Solved</h3>
                <span className="text-[10px] text-slate-500 block mt-2">Target: 300 Medium</span>
              </div>
            </div>

            {/* GitHub integration placeholder */}
            <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/20 text-center space-y-4">
              <Github className="w-10 h-10 text-white mx-auto mb-1.5" />
              <h3 className="text-md font-bold text-white">GitHub Code Syncing</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Sync solutions directly into a dedicated repository on your GitHub account as you complete problems on StudyPilot.
              </p>
              <button className="px-4 py-2 bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold rounded-xl flex items-center gap-1.5 mx-auto transition-colors">
                <GitBranch className="w-4 h-4" /> Connect GitHub Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
