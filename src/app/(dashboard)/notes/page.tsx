'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Plus, Search, Star, Pin, Trash2, Folder, Tag, FileText, 
  Sparkles, Bold, Italic, Heading, List, Code, BarChart, 
  ArrowRight, Check, X, RefreshCw, ChevronRight, Eye, Edit
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useNotesStore, useUserStore } from '@/lib/store'

export default function NotesPage() {
  const { notes, activeNoteId, addNote, updateNote, deleteNote, pinNote, favoriteNote, setActiveNote } = useNotesStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState<'all' | 'recent' | 'favorites' | 'pinned'>('all')
  const [editorContent, setEditorContent] = useState('')
  const [editorTitle, setEditorTitle] = useState('')
  const [editorTags, setEditorTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)
  const [aiResponse, setAiResponse] = useState('')

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0]

  useEffect(() => {
    if (activeNote) {
      setEditorTitle(activeNote.title)
      setEditorContent(activeNote.content)
      setEditorTags(activeNote.tags || [])
    }
  }, [activeNoteId, activeNote])

  const handleSave = () => {
    if (activeNote) {
      updateNote(activeNote.id, {
        title: editorTitle,
        content: editorContent,
        tags: editorTags,
        wordCount: editorContent.split(/\s+/).filter(Boolean).length
      })
    }
  }

  const handleCreateNote = () => {
    const newNote = addNote({
      title: 'Untitled Note',
      content: '# Untitled Note\n\nStart writing here...',
      tags: ['general'],
      subject: 'General'
    })
    setActiveNote(newNote.id)
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (tagInput.trim() && !editorTags.includes(tagInput.trim().toLowerCase())) {
      const updatedTags = [...editorTags, tagInput.trim().toLowerCase()]
      setEditorTags(updatedTags)
      if (activeNote) updateNote(activeNote.id, { tags: updatedTags })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = editorTags.filter(t => t !== tagToRemove)
    setEditorTags(updatedTags)
    if (activeNote) updateNote(activeNote.id, { tags: updatedTags })
  }

  const handleAiAction = async (action: string) => {
    if (!editorContent.trim()) return
    setIsAiLoading(true)
    setAiResponse('')
    
    // Simulate AI Delay
    setTimeout(() => {
      setIsAiLoading(false)
      let response = ''
      if (action === 'expand') {
        response = `\n\n### AI Expanded Insights\n\nBased on your notes above, here is an expansion of the key concepts:\n1. **Theoretical Foundations**: This concept is connected deeply to foundational studies in the subject.\n2. **Practical Applications**: In industry or research, this is used to optimize workflows and solve numerical constraints.\n3. **Extended Analysis**: Further research points towards modern models that integrate this logic with digital computing systems.`
        setEditorContent(prev => prev + response)
      } else if (action === 'simplify') {
        response = `\n\n### Simplified Explanation (AI)\n\nIn simple terms: Imagine this concept is like a post office. It takes inputs, routes them based on key addresses, and delivers outputs without needing to know what is inside the packages. It is designed to be highly modular and clean.`
        setEditorContent(prev => prev + response)
      } else if (action === 'explain') {
        response = `\n\n### AI Detailed Explanation\n\nThis subject deals with structural mapping. It works by creating a set of rules that apply across different dimensions. The key formula involves taking the derivatives of change over time and multiplying it by the constant factor of efficiency.`
        setEditorContent(prev => prev + response)
      } else if (action === 'bullets') {
        response = `\n\n### Key Takeaways (AI)\n- **Main Core**: High structural integrity and modular design.\n- **Constraint**: Must keep values below thresholds to avoid performance drops.\n- **Future Goal**: Connect this node directly to the dashboard layout.`
        setEditorContent(prev => prev + response)
      }
    }, 1500)
  }

  // Filter notes
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          note.content.toLowerCase().includes(searchTerm.toLowerCase())
    if (!matchesSearch) return false

    if (activeTab === 'favorites') return note.isFavorite
    if (activeTab === 'pinned') return note.isPinned
    return true
  })

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
      {/* Column 1: Folder Tree / Navigation Sidebar */}
      <div className="w-64 border-r border-white/5 bg-slate-900/30 flex flex-col justify-between shrink-0 p-4 space-y-6">
        <div className="space-y-4">
          <button 
            onClick={handleCreateNote}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> New Note
          </button>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Folders</h3>
            <button 
              onClick={() => setActiveTab('all')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                activeTab === 'all' ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Folder className="w-4 h-4 text-indigo-400" />
                <span>All Notes</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md font-mono">{notes.length}</span>
            </button>
            <button 
              onClick={() => setActiveTab('pinned')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                activeTab === 'pinned' ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Pin className="w-4 h-4 text-amber-400" />
                <span>Pinned</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md font-mono">
                {notes.filter(n => n.isPinned).length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('favorites')}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-colors",
                activeTab === 'favorites' ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <div className="flex items-center gap-2.5">
                <Star className="w-4 h-4 text-rose-400" />
                <span>Favorites</span>
              </div>
              <span className="text-xs bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded-md font-mono">
                {notes.filter(n => n.isFavorite).length}
              </span>
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Subjects</h3>
            {['Physics', 'Math', 'Computer Science', 'Chemistry'].map((sub, idx) => {
              const colors = ['bg-indigo-500', 'bg-purple-500', 'bg-cyan-500', 'bg-pink-500']
              return (
                <div key={sub} className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-400 hover:bg-white/5 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center gap-2.5">
                    <span className={cn("w-2 h-2 rounded-full", colors[idx])} />
                    <span>{sub}</span>
                  </div>
                  <span className="text-xs bg-slate-800/50 text-slate-500 px-1.5 py-0.5 rounded-md font-mono">
                    {notes.filter(n => n.subject === sub).length}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-indigo-500/10 bg-indigo-500/5 text-center">
          <Sparkles className="w-5 h-5 text-indigo-400 mx-auto mb-1.5" />
          <h4 className="text-xs font-bold text-white">AI Co-Writer Active</h4>
          <p className="text-[10px] text-slate-400 mt-1">Use the toolbar at the bottom to expand notes</p>
        </div>
      </div>

      {/* Column 2: Note List / Search */}
      <div className="w-80 border-r border-white/5 bg-slate-900/10 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-white/5 bg-slate-950/50 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredNotes.map((note) => {
            const isActive = note.id === activeNote?.id
            return (
              <div 
                key={note.id}
                onClick={() => setActiveNote(note.id)}
                className={cn(
                  "p-3.5 rounded-xl border transition-all cursor-pointer relative group",
                  isActive 
                    ? "border-indigo-500/30 bg-indigo-500/5 shadow-lg shadow-indigo-500/5" 
                    : "border-white/5 bg-slate-900/20 hover:bg-slate-900/40"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-white line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {note.title || 'Untitled Note'}
                  </h4>
                  <div className="flex gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={(e) => { e.stopPropagation(); pinNote(note.id) }} 
                      className={cn("p-1 rounded hover:bg-white/5", note.isPinned ? "text-amber-400" : "text-slate-500")}
                    >
                      <Pin className="w-3 h-3 fill-current" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); favoriteNote(note.id) }}
                      className={cn("p-1 rounded hover:bg-white/5", note.isFavorite ? "text-rose-400" : "text-slate-500")}
                    >
                      <Star className="w-3 h-3 fill-current" />
                    </button>
                    <button 
                      onClick={(e) => { e.stopPropagation(); deleteNote(note.id) }}
                      className="p-1 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 mt-1 font-normal">
                  {note.content.replace(/[#*`]/g, '') || 'Empty note...'}
                </p>
                <div className="flex items-center justify-between mt-3 text-[10px] text-slate-500">
                  <span>{new Date(note.updatedAt || note.createdAt).toLocaleDateString()}</span>
                  {note.subject && (
                    <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 font-semibold">{note.subject}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Column 3: Note Editor */}
      <div className="flex-1 flex flex-col justify-between bg-slate-950/20">
        {activeNote ? (
          <>
            {/* Editor Top Toolbar */}
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white" title="Bold"><Bold className="w-4 h-4" /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white" title="Italic"><Italic className="w-4 h-4" /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white" title="Heading"><Heading className="w-4 h-4" /></button>
                <span className="w-[1px] h-4 bg-white/5 mx-1" />
                <button className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white" title="Bullet List"><List className="w-4 h-4" /></button>
                <button className="p-1.5 rounded hover:bg-white/5 text-slate-400 hover:text-white" title="Code"><Code className="w-4 h-4" /></button>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-mono">{activeNote.wordCount || 0} words</span>
                <button 
                  onClick={handleSave}
                  className="px-3 py-1.5 rounded-lg border border-indigo-500/20 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Note Title & Content Editor */}
            <div className="flex-1 p-6 overflow-y-auto flex flex-col space-y-4">
              <input 
                type="text" 
                value={editorTitle}
                onChange={(e) => setEditorTitle(e.target.value)}
                className="w-full text-2xl font-bold bg-transparent text-white border-none focus:outline-none placeholder:text-slate-600"
                placeholder="Title"
              />

              {/* Tags Row */}
              <div className="flex flex-wrap items-center gap-2">
                {editorTags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border border-white/5 bg-slate-900/50 text-slate-300">
                    #{tag}
                    <button onClick={() => handleRemoveTag(tag)} className="text-slate-500 hover:text-slate-300">×</button>
                  </span>
                ))}
                <form onSubmit={handleAddTag} className="inline-block">
                  <input 
                    type="text"
                    placeholder="+ Add tag"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    className="bg-transparent text-xs text-slate-500 border-none focus:outline-none w-16"
                  />
                </form>
              </div>

              {/* Text Area */}
              <textarea 
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="flex-1 w-full bg-transparent text-slate-300 border-none focus:outline-none resize-none font-mono text-sm leading-relaxed placeholder:text-slate-700"
                placeholder="Write your note in markdown format..."
              />
            </div>

            {/* AI Assistant Toolbar */}
            <div className="p-4 border-t border-white/5 bg-slate-900/20 relative">
              <AnimatePresence>
                {isAiLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center gap-2 z-10"
                  >
                    <RefreshCw className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span className="text-xs text-slate-300 font-medium">AI is writing...</span>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span className="text-xs font-bold text-white">Ask AI:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleAiAction('expand')}
                    className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/50 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Expand Concepts
                  </button>
                  <button 
                    onClick={() => handleAiAction('simplify')}
                    className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/50 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Simplify Explanation
                  </button>
                  <button 
                    onClick={() => handleAiAction('explain')}
                    className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/50 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Explain Topic
                  </button>
                  <button 
                    onClick={() => handleAiAction('bullets')}
                    className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900/50 text-slate-300 hover:text-white text-xs font-medium transition-colors"
                  >
                    Key Takeaways
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-sm">
            <FileText className="w-8 h-8 mb-2 text-slate-600" />
            <span>Select or create a note to get started</span>
          </div>
        )}
      </div>
    </div>
  )
}
