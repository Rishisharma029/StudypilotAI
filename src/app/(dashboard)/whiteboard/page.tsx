'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import {
  Pen, Eraser, Type, Square, Circle, ArrowRight, Image, StickyNote,
  ZoomIn, ZoomOut, Grid, Undo, Redo, Palette, Layers, Share2,
  MousePointer, Minus, Plus, X, Sparkles, AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MockSticky {
  id: number
  x: number
  y: number
  text: string
  color: string
}

export default function WhiteboardPage() {
  const [activeTool, setActiveTool] = useState('select')
  const [activeColor, setActiveColor] = useState('#eab308')
  const [isGridActive, setIsGridActive] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [stickies, setStickies] = useState<MockSticky[]>([
    { id: 1, x: 80, y: 120, text: "Newton's 3 Laws of Motion", color: 'bg-yellow-500/20 border-yellow-500 text-yellow-400' },
    { id: 2, x: 340, y: 120, text: "F = ma: Force = mass × acceleration", color: 'bg-indigo-500/20 border-indigo-500 text-indigo-400' }
  ])

  const [mindmapInput, setMindmapInput] = useState('')

  const handleAddSticky = () => {
    setStickies([
      ...stickies,
      {
        id: Date.now(),
        x: 150 + Math.random() * 80,
        y: 150 + Math.random() * 80,
        text: 'Double click to edit sticky note content.',
        color: 'bg-purple-500/20 border-purple-500 text-purple-400'
      }
    ])
  }

  const handleGenerateMindmap = (e: React.FormEvent) => {
    e.preventDefault()
    if (!mindmapInput.trim()) return

    setStickies([
      ...stickies,
      {
        id: Date.now(),
        x: 200,
        y: 200,
        text: `🧠 Mindmap: ${mindmapInput}\n\n• Concept 1\n• Concept 2\n• Concept 3`,
        color: 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
      }
    ])
    setMindmapInput('')
  }

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden relative">
      
      {/* Grid Pattern Background */}
      {isGridActive && (
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03]" 
          style={{ 
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', 
            backgroundSize: '20px 20px' 
          }} 
        />
      )}

      {/* Top Floating Toolbar */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-1.5 p-2 rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <button 
          onClick={() => setActiveTool('select')}
          className={cn("p-2 rounded-xl transition-colors", activeTool === 'select' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white")}
          title="Select (V)"
        >
          <MousePointer className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setActiveTool('pen')}
          className={cn("p-2 rounded-xl transition-colors", activeTool === 'pen' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white")}
          title="Pen (P)"
        >
          <Pen className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setActiveTool('eraser')}
          className={cn("p-2 rounded-xl transition-colors", activeTool === 'eraser' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white")}
          title="Eraser (E)"
        >
          <Eraser className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setActiveTool('text')}
          className={cn("p-2 rounded-xl transition-colors", activeTool === 'text' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white")}
          title="Text (T)"
        >
          <Type className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setActiveTool('rect')}
          className={cn("p-2 rounded-xl transition-colors", activeTool === 'rect' ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-white")}
          title="Rectangle (R)"
        >
          <Square className="w-4 h-4" />
        </button>
        <span className="w-[1px] h-6 bg-white/10 mx-1" />
        
        {/* Colors selector */}
        {['#eab308', '#6366f1', '#a855f7', '#ec4899', '#10b981'].map((c) => (
          <button 
            key={c}
            onClick={() => setActiveColor(c)}
            className={cn("w-5 h-5 rounded-full transition-transform", activeColor === c ? "scale-110 ring-2 ring-white/20" : "hover:scale-105")}
            style={{ backgroundColor: c }}
          />
        ))}
      </div>

      {/* Floating Canvas Side actions (Zoom, grid, Undo/Redo) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 p-2 rounded-xl border border-white/10 bg-slate-900/80 backdrop-blur-xl shadow-lg">
        <button onClick={() => setZoom(z => Math.max(50, z - 10))} className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white"><ZoomOut className="w-4 h-4" /></button>
        <span className="text-[10px] font-mono text-slate-400 font-bold px-1">{zoom}%</span>
        <button onClick={() => setZoom(z => Math.min(150, z + 10))} className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white"><ZoomIn className="w-4 h-4" /></button>
        <span className="w-[1px] h-4 bg-white/10 mx-1" />
        <button onClick={() => setIsGridActive(!isGridActive)} className={cn("p-1.5 rounded hover:bg-white/5 text-slate-400", isGridActive && "text-indigo-400")} title="Toggle Grid"><Grid className="w-4 h-4" /></button>
      </div>

      {/* Left panel: Mindmap generator tool */}
      <div className="absolute top-4 left-4 w-60 z-20 p-4 rounded-2xl border border-white/10 bg-slate-900/85 backdrop-blur-xl shadow-2xl flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Mind Map Generator
          </h3>
          <p className="text-[10px] text-slate-500 leading-snug">Generate structured concept branches automatically</p>
        </div>

        <form onSubmit={handleGenerateMindmap} className="space-y-2">
          <input 
            type="text"
            placeholder="Concept or Topic..."
            value={mindmapInput}
            onChange={(e) => setMindmapInput(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-white/5 bg-slate-950 text-white placeholder:text-slate-600 focus:outline-none"
          />
          <button 
            type="submit"
            className="w-full py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-bold transition-colors"
          >
            Generate Nodes
          </button>
        </form>

        <span className="w-full h-[1px] bg-white/5" />

        <button 
          onClick={handleAddSticky}
          className="w-full py-1.5 rounded-lg border border-white/10 bg-slate-950 text-slate-400 hover:text-white text-[10px] font-bold transition-colors flex items-center justify-center gap-1.5"
        >
          <StickyNote className="w-3.5 h-3.5" /> Add Sticky Note
        </button>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 h-full relative overflow-hidden" style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}>
        
        {/* Connection line helper using SVG */}
        <svg className="absolute inset-0 pointer-events-none w-full h-full">
          <line x1="180" y1="160" x2="340" y2="160" stroke="#6366f1" strokeWidth="2" strokeDasharray="5 5" />
        </svg>

        {/* Render sticky notes */}
        {stickies.map((st) => (
          <div
            key={st.id}
            className={cn(
              "absolute w-52 p-4 rounded-xl border cursor-move shadow-2xl leading-normal text-xs font-medium backdrop-blur-xl whitespace-pre-wrap",
              st.color
            )}
            style={{ left: st.x, top: st.y }}
          >
            {st.text}
          </div>
        ))}
      </div>
    </div>
  )
}
