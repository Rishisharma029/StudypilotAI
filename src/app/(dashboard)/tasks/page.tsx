'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import {
  CheckSquare, Plus, GripVertical, Clock, ChevronDown, MoreVertical, Trash2,
  Edit, ArrowRight, Star, Flame, Target, LayoutGrid, List, Calendar,
  X, Check, AlertCircle, Tag, BookOpen, ChevronUp, Filter, Search
} from 'lucide-react'
import { cn, formatDate, generateId } from '@/lib/utils'
import { useTasksStore } from '@/lib/store'
import type { Task } from '@/types'

// ─── Constants ────────────────────────────────────────────────────────────────

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', dot: 'bg-blue-400', badge: 'bg-blue-500/20 text-blue-300' },
  { id: 'in-progress', label: 'In Progress', color: 'from-yellow-500/20 to-orange-500/10', border: 'border-yellow-500/30', dot: 'bg-yellow-400', badge: 'bg-yellow-500/20 text-yellow-300' },
  { id: 'done', label: 'Done', color: 'from-green-500/20 to-emerald-500/10', border: 'border-green-500/30', dot: 'bg-green-400', badge: 'bg-green-500/20 text-green-300' },
] as const

const PRIORITY_CONFIG = {
  low:    { label: 'Low',    color: 'bg-green-500/20 text-green-300 border-green-500/30',    dot: 'bg-green-400' },
  medium: { label: 'Medium', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', dot: 'bg-yellow-400' },
  high:   { label: 'High',   color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', dot: 'bg-orange-400' },
  urgent: { label: 'Urgent', color: 'bg-red-500/20 text-red-300 border-red-500/30',          dot: 'bg-red-400' },
}

const SUBJECTS = ['Math', 'Physics', 'Chemistry', 'Computer Science', 'Biology', 'English', 'History', 'Economics']

const VIEWS = [
  { id: 'kanban', label: 'Kanban', icon: LayoutGrid },
  { id: 'list', label: 'List', icon: List },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
] as const

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } },
}

// ─── Add/Edit Task Modal ───────────────────────────────────────────────────────

interface ModalProps {
  open: boolean
  onClose: () => void
  editTask?: Task | null
  defaultStatus?: Task['status']
}

function TaskModal({ open, onClose, editTask, defaultStatus = 'todo' }: ModalProps) {
  const { addTask, updateTask } = useTasksStore()
  const [title, setTitle] = useState(editTask?.title ?? '')
  const [description, setDescription] = useState(editTask?.description ?? '')
  const [priority, setPriority] = useState<Task['priority']>(editTask?.priority ?? 'medium')
  const [subject, setSubject] = useState(editTask?.subject ?? '')
  const [dueDate, setDueDate] = useState(editTask?.dueDate ? editTask.dueDate.split('T')[0] : '')
  const [status, setStatus] = useState<Task['status']>(editTask?.status ?? defaultStatus)
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>(editTask?.subtasks ?? [])
  const [newSubtask, setNewSubtask] = useState('')

  function handleSubmit() {
    if (!title.trim()) return
    const data: Partial<Task> = {
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      subject: subject || undefined,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
      status,
      subtasks,
    }
    if (editTask) {
      updateTask(editTask.id, data)
    } else {
      addTask(data)
    }
    onClose()
  }

  function addSubtask() {
    if (!newSubtask.trim()) return
    setSubtasks(prev => [...prev, { id: generateId(), title: newSubtask.trim(), completed: false }])
    setNewSubtask('')
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative w-full max-w-lg glass-card p-6 z-10 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold gradient-text">{editTask ? 'Edit Task' : 'New Task'}</h2>
              <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Task Title *</label>
                <input
                  className="input-glass w-full"
                  placeholder="What needs to be done?"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Description</label>
                <textarea
                  className="input-glass w-full resize-none"
                  placeholder="Add details..."
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Priority</label>
                  <select className="input-glass w-full" value={priority} onChange={e => setPriority(e.target.value as Task['priority'])}>
                    {(['low', 'medium', 'high', 'urgent'] as const).map(p => (
                      <option key={p} value={p}>{PRIORITY_CONFIG[p].label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Status</label>
                  <select className="input-glass w-full" value={status} onChange={e => setStatus(e.target.value as Task['status'])}>
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Subject</label>
                  <select className="input-glass w-full" value={subject} onChange={e => setSubject(e.target.value)}>
                    <option value="">No Subject</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-white/60 mb-1.5 block">Due Date</label>
                  <input type="date" className="input-glass w-full" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="text-sm text-white/60 mb-1.5 block">Subtasks</label>
                <div className="space-y-2 mb-2">
                  {subtasks.map((st, i) => (
                    <div key={st.id} className="flex items-center gap-2 group">
                      <button
                        onClick={() => setSubtasks(prev => prev.map((s, j) => j === i ? { ...s, completed: !s.completed } : s))}
                        className={cn('w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors',
                          st.completed ? 'bg-indigo-500 border-indigo-500' : 'border-white/30')}
                      >
                        {st.completed && <Check className="w-3 h-3 text-white" />}
                      </button>
                      <span className={cn('text-sm flex-1', st.completed && 'line-through text-white/40')}>{st.title}</span>
                      <button onClick={() => setSubtasks(prev => prev.filter((_, j) => j !== i))} className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-all">
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    className="input-glass flex-1 text-sm py-2"
                    placeholder="Add subtask..."
                    value={newSubtask}
                    onChange={e => setNewSubtask(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addSubtask()}
                  />
                  <button onClick={addSubtask} className="btn-ghost px-3 py-2">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={onClose} className="btn-ghost flex-1">Cancel</button>
              <button onClick={handleSubmit} disabled={!title.trim()} className="btn-primary flex-1">
                {editTask ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── Task Card ────────────────────────────────────────────────────────────────

function TaskCard({ task, onEdit }: { task: Task; onEdit: (task: Task) => void }) {
  const { deleteTask, moveTask, toggleSubtask } = useTasksStore()
  const [menuOpen, setMenuOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const p = PRIORITY_CONFIG[task.priority]
  const completedSubs = task.subtasks.filter(s => s.completed).length
  const totalSubs = task.subtasks.length
  const daysLeft = task.dueDate ? Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / 86400000) : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
      whileHover={{ y: -2 }}
      className="glass-card p-4 cursor-default group relative"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="w-4 h-4 text-white/20 mt-0.5 flex-shrink-0 cursor-grab" />
        <div className="flex-1 min-w-0">
          <p className={cn('text-sm font-medium leading-snug', task.status === 'done' && 'line-through text-white/50')}>
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-white/40 mt-0.5 truncate">{task.description}</p>
          )}
        </div>
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-white/10 transition-all"
          >
            <MoreVertical className="w-4 h-4 text-white/60" />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -5 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -5 }}
                className="absolute right-0 top-8 z-20 glass-card p-1 min-w-[160px]"
              >
                <button onClick={() => { onEdit(task); setMenuOpen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
                {task.status !== 'todo' && <button onClick={() => { moveTask(task.id, 'todo'); setMenuOpen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors text-blue-300"><ArrowRight className="w-3.5 h-3.5" /> Move to Todo</button>}
                {task.status !== 'in-progress' && <button onClick={() => { moveTask(task.id, 'in-progress'); setMenuOpen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors text-yellow-300"><ArrowRight className="w-3.5 h-3.5" /> In Progress</button>}
                {task.status !== 'done' && <button onClick={() => { moveTask(task.id, 'done'); setMenuOpen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-white/10 rounded-lg transition-colors text-green-300"><Check className="w-3.5 h-3.5" /> Mark Done</button>}
                <div className="my-1 border-t border-white/10" />
                <button onClick={() => { deleteTask(task.id); setMenuOpen(false) }} className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mt-3">
        <span className={cn('text-[10px] font-semibold px-2 py-0.5 rounded-full border', p.color)}>{p.label}</span>
        {task.subject && <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">{task.subject}</span>}
        {task.isRecurring && <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">🔁 Recurring</span>}
      </div>

      <div className="flex items-center justify-between mt-3">
        {task.dueDate && (
          <div className={cn('flex items-center gap-1 text-[11px]',
            daysLeft !== null && daysLeft < 0 ? 'text-red-400' : daysLeft !== null && daysLeft <= 1 ? 'text-orange-400' : 'text-white/40')}>
            <Clock className="w-3 h-3" />
            {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : daysLeft !== null && daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : formatDate(task.dueDate)}
          </div>
        )}
        {totalSubs > 0 && (
          <button onClick={() => setExpanded(v => !v)} className="ml-auto flex items-center gap-1 text-[11px] text-white/50 hover:text-white/80 transition-colors">
            <CheckSquare className="w-3 h-3" />
            {completedSubs}/{totalSubs}
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>
        )}
      </div>

      {totalSubs > 0 && (
        <div className="mt-2">
          <div className="progress-bar h-1">
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${(completedSubs / totalSubs) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}

      <AnimatePresence>
        {expanded && totalSubs > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-1.5 border-t border-white/10 pt-3">
              {task.subtasks.map(st => (
                <button key={st.id} onClick={() => toggleSubtask(task.id, st.id)} className="flex items-center gap-2 w-full text-left group/st">
                  <div className={cn('w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center transition-colors',
                    st.completed ? 'bg-indigo-500 border-indigo-500' : 'border-white/30')}>
                    {st.completed && <Check className="w-2.5 h-2.5 text-white" />}
                  </div>
                  <span className={cn('text-xs', st.completed ? 'line-through text-white/30' : 'text-white/70')}>{st.title}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ─── Kanban Column ────────────────────────────────────────────────────────────

function KanbanColumn({ col, tasks, onAdd, onEdit }: {
  col: typeof COLUMNS[number]
  tasks: Task[]
  onAdd: (status: Task['status']) => void
  onEdit: (task: Task) => void
}) {
  return (
    <motion.div
      variants={itemVariants}
      className={cn('flex flex-col gap-3 min-h-[400px] rounded-2xl p-4 bg-gradient-to-b border', col.color, col.border)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-2 h-2 rounded-full', col.dot)} />
          <span className="font-semibold text-sm">{col.label}</span>
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-bold', col.badge)}>{tasks.length}</span>
        </div>
        <button onClick={() => onAdd(col.id as Task['status'])} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/50 hover:text-white">
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col gap-3 flex-1">
        <AnimatePresence>
          {tasks.map(task => <TaskCard key={task.id} task={task} onEdit={onEdit} />)}
        </AnimatePresence>

        {tasks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3">
              <CheckSquare className="w-6 h-6 text-white/20" />
            </div>
            <p className="text-sm text-white/30">No tasks here</p>
            <button onClick={() => onAdd(col.id as Task['status'])} className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
              <Plus className="w-3 h-3" /> Add task
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

// ─── List View ────────────────────────────────────────────────────────────────

function ListView({ tasks, onEdit }: { tasks: Task[]; onEdit: (t: Task) => void }) {
  const { deleteTask, moveTask } = useTasksStore()
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate' | 'status' | 'title'>('priority')
  const [filterStatus, setFilterStatus] = useState<Task['status'] | 'all'>('all')
  const priorityOrder: Record<string, number> = { urgent: 0, high: 1, medium: 2, low: 3 }

  const filtered = tasks
    .filter(t => filterStatus === 'all' || t.status === filterStatus)
    .sort((a, b) => {
      if (sortBy === 'priority') return (priorityOrder[a.priority] ?? 9) - (priorityOrder[b.priority] ?? 9)
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      if (sortBy === 'status') return a.status.localeCompare(b.status)
      if (sortBy === 'dueDate') {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      return 0
    })

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-3">
      <div className="glass-card p-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1 flex-wrap">
          <span className="text-xs text-white/40 mr-1">Sort:</span>
          {(['priority', 'dueDate', 'status', 'title'] as const).map(f => (
            <button key={f} onClick={() => setSortBy(f)} className={cn('text-xs px-3 py-1.5 rounded-lg transition-colors capitalize', sortBy === f ? 'bg-indigo-500/30 text-indigo-300' : 'text-white/40 hover:text-white/70')}>
              {f === 'dueDate' ? 'Due Date' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-1 flex-wrap">
          <span className="text-xs text-white/40 mr-1">Filter:</span>
          {(['all', 'todo', 'in-progress', 'done'] as const).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} className={cn('text-xs px-3 py-1.5 rounded-lg transition-colors', filterStatus === s ? 'bg-indigo-500/30 text-indigo-300' : 'text-white/40 hover:text-white/70')}>
              {s === 'all' ? 'All' : s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-xs text-white/40 font-medium px-4 py-3">Task</th>
              <th className="text-left text-xs text-white/40 font-medium px-4 py-3 hidden sm:table-cell">Subject</th>
              <th className="text-left text-xs text-white/40 font-medium px-4 py-3">Priority</th>
              <th className="text-left text-xs text-white/40 font-medium px-4 py-3 hidden md:table-cell">Due</th>
              <th className="text-left text-xs text-white/40 font-medium px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.map((task, i) => {
                const p = PRIORITY_CONFIG[task.priority]
                const col = COLUMNS.find(c => c.id === task.status)!
                const daysLeft = task.dueDate ? Math.ceil((new Date(task.dueDate).getTime() - Date.now()) / 86400000) : null
                return (
                  <motion.tr key={task.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ delay: i * 0.03 }} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => moveTask(task.id, task.status === 'done' ? 'todo' : 'done')} className={cn('w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-colors', task.status === 'done' ? 'bg-green-500 border-green-500' : 'border-white/30 hover:border-green-400')}>
                          {task.status === 'done' && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <span className={cn('text-sm font-medium', task.status === 'done' && 'line-through text-white/40')}>{task.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">{task.subject && <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">{task.subject}</span>}</td>
                    <td className="px-4 py-3"><span className={cn('text-xs px-2 py-0.5 rounded-full border font-medium', p.color)}>{p.label}</span></td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {task.dueDate && <span className={cn('text-xs', daysLeft !== null && daysLeft < 0 ? 'text-red-400' : daysLeft !== null && daysLeft <= 1 ? 'text-orange-400' : 'text-white/50')}>
                        {daysLeft === 0 ? 'Today' : daysLeft === 1 ? 'Tomorrow' : daysLeft !== null && daysLeft < 0 ? `${Math.abs(daysLeft)}d overdue` : formatDate(task.dueDate)}
                      </span>}
                    </td>
                    <td className="px-4 py-3"><span className={cn('text-xs px-2 py-0.5 rounded-full', col.badge)}>{col.label}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => onEdit(task)} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"><Edit className="w-3.5 h-3.5 text-white/60" /></button>
                        <button onClick={() => deleteTask(task.id)} className="p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5 text-red-400" /></button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </AnimatePresence>
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-3"><CheckSquare className="w-8 h-8 text-white/20" /></div>
            <p className="text-white/40">No tasks match the filter</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ─── Calendar View ────────────────────────────────────────────────────────────

function CalendarView({ tasks }: { tasks: Task[] }) {
  const today = new Date()
  const [month, setMonth] = useState(today.getMonth())
  const [year, setYear] = useState(today.getFullYear())

  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const weeks: (number | null)[][] = []
  let week: (number | null)[] = Array(firstDay).fill(null)
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d)
    if (week.length === 7) { weeks.push(week); week = [] }
  }
  if (week.length > 0) weeks.push([...week, ...Array(7 - week.length).fill(null)])

  const tasksByDay = tasks.reduce<Record<number, Task[]>>((acc, t) => {
    if (!t.dueDate) return acc
    const d = new Date(t.dueDate)
    if (d.getMonth() === month && d.getFullYear() === year) {
      const day = d.getDate()
      acc[day] = [...(acc[day] ?? []), t]
    }
    return acc
  }, {})

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

  function prevMonth() { if (month === 0) { setMonth(11); setYear(y => y - 1) } else setMonth(m => m - 1) }
  function nextMonth() { if (month === 11) { setMonth(0); setYear(y => y + 1) } else setMonth(m => m + 1) }

  return (
    <motion.div variants={itemVariants} initial="hidden" animate="visible" className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold">{MONTHS[month]} {year}</h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="btn-ghost px-4 py-2 text-sm">←</button>
          <button onClick={nextMonth} className="btn-ghost px-4 py-2 text-sm">→</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d => (
          <div key={d} className="text-center text-xs text-white/40 py-2 font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weeks.flat().map((day, i) => {
          const dayTasks = day ? (tasksByDay[day] ?? []) : []
          const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear()
          return (
            <div key={i} className={cn('min-h-[80px] rounded-xl p-2 text-xs transition-colors', day ? 'hover:bg-white/5 cursor-pointer' : '', isToday ? 'bg-indigo-500/20 border border-indigo-500/40' : 'border border-transparent')}>
              {day && (
                <>
                  <span className={cn('font-medium', isToday ? 'text-indigo-300' : 'text-white/60')}>{day}</span>
                  <div className="mt-1 space-y-0.5">
                    {dayTasks.slice(0, 2).map(t => (
                      <div key={t.id} className={cn('text-[10px] px-1.5 py-0.5 rounded truncate', PRIORITY_CONFIG[t.priority].color)}>
                        {t.title}
                      </div>
                    ))}
                    {dayTasks.length > 2 && <div className="text-[10px] text-white/30">+{dayTasks.length - 2} more</div>}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TasksPage() {
  const { tasks } = useTasksStore()
  const [view, setView] = useState<'kanban' | 'list' | 'calendar'>('kanban')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState<Task | null>(null)
  const [defaultStatus, setDefaultStatus] = useState<Task['status']>('todo')
  const [search, setSearch] = useState('')

  const todayStr = new Date().toISOString().split('T')[0]
  const completedToday = tasks.filter(t => t.completedAt && t.completedAt.startsWith(todayStr)).length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const highPriority = tasks.filter(t => t.priority === 'high' || t.priority === 'urgent').length

  const filteredTasks = search
    ? tasks.filter(t => t.title.toLowerCase().includes(search.toLowerCase()) || t.subject?.toLowerCase().includes(search.toLowerCase()))
    : tasks

  const stats = [
    { label: 'Total Tasks', value: tasks.length, icon: CheckSquare, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
    { label: 'Completed Today', value: completedToday, icon: Check, color: 'text-green-400', bg: 'bg-green-500/10' },
    { label: 'In Progress', value: inProgress, icon: AlertCircle, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'High Priority', value: highPriority, icon: Flame, color: 'text-red-400', bg: 'bg-red-500/10' },
  ]

  function openAddModal(status: Task['status'] = 'todo') {
    setDefaultStatus(status)
    setEditTask(null)
    setModalOpen(true)
  }

  function openEditModal(task: Task) {
    setEditTask(task)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-7xl mx-auto space-y-6">

        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold gradient-text">Task Manager</h1>
            <p className="text-white/50 text-sm mt-1">Stay organized, stay ahead 🎯</p>
          </div>
          <div className="sm:ml-auto flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input className="input-glass pl-9 pr-4 py-2 text-sm w-48" placeholder="Search tasks..." value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => openAddModal()} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} whileHover={{ scale: 1.02, y: -2 }} className="glass-card p-4 flex items-center gap-4">
              <div className={cn('p-3 rounded-xl', stat.bg)}>
                <stat.icon className={cn('w-5 h-5', stat.color)} />
              </div>
              <div>
                <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-xs text-white/50">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View Toggle */}
        <motion.div variants={itemVariants} className="flex items-center gap-1 p-1 rounded-xl bg-white/5 w-fit">
          {VIEWS.map(v => (
            <button key={v.id} onClick={() => setView(v.id)} className={cn('flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all', view === v.id ? 'bg-indigo-500/30 text-indigo-300 shadow-lg shadow-indigo-500/10' : 'text-white/50 hover:text-white/80')}>
              <v.icon className="w-4 h-4" />
              {v.label}
            </button>
          ))}
        </motion.div>

        {/* Views */}
        <AnimatePresence mode="wait">
          {view === 'kanban' && (
            <motion.div key="kanban" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {COLUMNS.map(col => <KanbanColumn key={col.id} col={col} tasks={filteredTasks.filter(t => t.status === col.id)} onAdd={openAddModal} onEdit={openEditModal} />)}
            </motion.div>
          )}
          {view === 'list' && (
            <motion.div key="list" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <ListView tasks={filteredTasks} onEdit={openEditModal} />
            </motion.div>
          )}
          {view === 'calendar' && (
            <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}>
              <CalendarView tasks={filteredTasks} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <TaskModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null) }}
        editTask={editTask}
        defaultStatus={defaultStatus}
      />
    </div>
  )
}
