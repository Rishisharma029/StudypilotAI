'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Bookmark, Link as LinkIcon, Tag, Folder, Grid, List, Plus, X, Search, Filter,
  Share2, Trash2, Globe, FileText, ExternalLink
} from 'lucide-react'
import { Youtube } from '@/components/brand-icons'
import { cn } from '@/lib/utils'

const initialBookmarks = [
  { id: 1, title: '3Blue1Brown - Calculus Made Easy', url: 'https://youtube.com', type: 'YouTube', collection: 'Math', date: '2024-11-20', tags: ['calculus', 'math'] },
  { id: 2, title: 'Understanding Quantum Entanglement', url: 'https://nature.com', type: 'Article', collection: 'Physics', date: '2024-11-18', tags: ['physics', 'quantum'] },
  { id: 3, title: 'JEE 2023 Phase 1 Question Paper', url: 'https://jeemain.nta.nic.in', type: 'PDF', collection: 'Physics', date: '2024-11-15', tags: ['exam', 'pyq'] },
  { id: 4, title: 'Khan Academy - Physics electrostatics', url: 'https://khanacademy.org', type: 'Website', collection: 'Physics', date: '2024-11-10', tags: ['physics', 'tutorial'] },
]

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState(initialBookmarks)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [activeFilter, setActiveFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [activeCollection, setActiveCollection] = useState('All')
  const [showAddModal, setShowAddModal] = useState(false)
  
  // Form state
  const [newUrl, setNewUrl] = useState('')
  const [newTitle, setNewTitle] = useState('')
  const [newCollection, setNewCollection] = useState('General')

  const handleDelete = (id: number) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  const handleAddBookmark = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newUrl.trim() || !newTitle.trim()) return

    setBookmarks([
      ...bookmarks,
      {
        id: Date.now(),
        title: newTitle,
        url: newUrl,
        type: newUrl.includes('youtube.com') || newUrl.includes('youtu.be') ? 'YouTube' : 'Website',
        collection: newCollection,
        date: new Date().toISOString().split('T')[0],
        tags: [newCollection.toLowerCase()]
      }
    ])
    setNewUrl('')
    setNewTitle('')
    setShowAddModal(false)
  }

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(search.toLowerCase()) || b.url.toLowerCase().includes(search.toLowerCase())
    if (!matchesSearch) return false

    if (activeFilter !== 'All' && b.type !== activeFilter) return false
    if (activeCollection !== 'All' && b.collection !== activeCollection) return false
    return true
  })

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
      {/* Sidebar Collections */}
      <div className="w-64 border-r border-white/5 bg-slate-900/30 flex flex-col justify-between shrink-0 p-4 space-y-4">
        <div className="space-y-4 flex-1 overflow-y-auto">
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" /> Quick Add Bookmark
          </button>

          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2">Collections</h3>
            <button
              onClick={() => setActiveCollection('All')}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-colors",
                activeCollection === 'All' ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <Folder className="w-4 h-4 text-indigo-400" />
              <span>All Collections</span>
            </button>
            {['Physics', 'Math', 'CS', 'Chemistry'].map(col => (
              <button
                key={col}
                onClick={() => setActiveCollection(col)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm font-medium transition-colors",
                  activeCollection === col ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <Folder className="w-4 h-4 text-purple-400" />
                <span>{col}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/20">
        {/* Controls row */}
        <div className="p-4 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 bg-slate-900/40 shrink-0">
          <div className="flex items-center gap-3 flex-1 min-w-[200px]">
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search bookmarks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-white/5 bg-slate-950/50 text-white focus:outline-none"
              />
            </div>

            <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5">
              {['All', 'YouTube', 'Article', 'PDF', 'Website'].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={cn(
                    "px-3 py-1.5 text-[9px] font-bold rounded transition-colors",
                    activeFilter === type ? "bg-white/5 text-white" : "text-slate-500 hover:text-white"
                  )}
                >
                  {type === 'Article' ? 'Articles' : type === 'Website' ? 'Websites' : type === 'YouTube' ? 'Videos' : type}
                </button>
              ))}
            </div>
          </div>

          {/* View toggle */}
          <div className="flex p-0.5 bg-slate-950 rounded-lg border border-white/5 shrink-0">
            <button 
              onClick={() => setView('grid')} 
              className={cn("p-1.5 rounded", view === 'grid' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white")}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setView('list')} 
              className={cn("p-1.5 rounded", view === 'list' ? "bg-white/5 text-white" : "text-slate-500 hover:text-white")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bookmarks Grid / List */}
        <div className="flex-1 overflow-y-auto p-6">
          {view === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBookmarks.map((bookmark) => (
                <motion.div 
                  key={bookmark.id}
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-white/5 bg-slate-900/30 overflow-hidden flex flex-col justify-between h-44 p-4 relative group"
                >
                  <div className="flex justify-between items-start">
                    <span className={cn(
                      "text-[9px] px-2 py-0.5 rounded font-bold uppercase",
                      bookmark.type === 'YouTube' ? 'bg-rose-500/10 text-rose-400' :
                      bookmark.type === 'Article' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'
                    )}>
                      {bookmark.type}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a href={bookmark.url} target="_blank" rel="noreferrer" className="p-1 rounded hover:bg-white/5 text-slate-400 hover:text-white">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button onClick={() => handleDelete(bookmark.id)} className="p-1 rounded hover:bg-rose-500/15 text-slate-400 hover:text-rose-400">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-bold text-white line-clamp-2 leading-relaxed">{bookmark.title}</h3>
                    <p className="text-[10px] text-slate-500 truncate">{bookmark.url}</p>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-3 text-[9px] text-slate-500 font-semibold uppercase">
                    <span>Folder: {bookmark.collection}</span>
                    <span>{bookmark.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredBookmarks.map((bookmark) => (
                <div key={bookmark.id} className="p-3.5 rounded-xl border border-white/5 bg-slate-900/20 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-lg">🔖</span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{bookmark.title}</h4>
                      <p className="text-[10px] text-slate-500 truncate">{bookmark.url}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <span className="text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-bold uppercase">{bookmark.type}</span>
                    <button onClick={() => handleDelete(bookmark.id)} className="p-1 rounded hover:bg-rose-500/15 text-slate-500 hover:text-rose-400">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Bookmark Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-md w-full p-6 rounded-2xl border border-white/5 bg-slate-900 relative space-y-4 shadow-2xl"
            >
              <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-500 hover:text-slate-300">
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-md font-bold text-white">Add Bookmark</h3>

              <form onSubmit={handleAddBookmark} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">URL Link</span>
                  <input 
                    type="text" 
                    placeholder="https://..."
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-white/5 text-white"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">Title</span>
                  <input 
                    type="text" 
                    placeholder="Calculate limits tutorials..."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded bg-slate-950 border border-white/5 text-white"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors"
                >
                  Save Bookmark
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
