'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  GraduationCap, TrendingUp, Calculator, BookOpen, Award, Target,
  Plus, Trash2, Edit, ChevronDown, ChevronRight, Check, X, Info
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

// Mock CGPA data
const initialSemesters = [
  {
    id: 1,
    semester: 'Semester 1',
    sgpa: 8.2,
    credits: 22,
    courses: [
      { id: 'c11', name: 'Engineering Physics', credits: 4, grade: 'A', points: 9 },
      { id: 'c12', name: 'Calculus & Algebra', credits: 4, grade: 'A+', points: 10 },
      { id: 'c13', name: 'Basic CS Programming', credits: 3, grade: 'B', points: 7 },
      { id: 'c14', name: 'Mechanics Lab', credits: 2, grade: 'A', points: 9 },
      { id: 'c15', name: 'Environmental Science', credits: 3, grade: 'A+', points: 10 },
      { id: 'c16', name: 'English Communication', credits: 6, grade: 'B+', points: 8 },
    ]
  },
  {
    id: 2,
    semester: 'Semester 2',
    sgpa: 8.5,
    credits: 20,
    courses: [
      { id: 'c21', name: 'Engineering Chemistry', credits: 4, grade: 'A', points: 9 },
      { id: 'c22', name: 'Differential Equations', credits: 4, grade: 'A', points: 9 },
      { id: 'c23', name: 'Data Structures in C++', credits: 4, grade: 'A+', points: 10 },
      { id: 'c24', name: 'Chemistry Lab', credits: 2, grade: 'A+', points: 10 },
      { id: 'c25', name: 'Electrical Engineering', credits: 6, grade: 'B', points: 7 },
    ]
  },
  {
    id: 3,
    semester: 'Semester 3',
    sgpa: 8.7,
    credits: 24,
    courses: [
      { id: 'c31', name: 'Discrete Mathematics', credits: 4, grade: 'A+', points: 10 },
      { id: 'c32', name: 'Database Management', credits: 4, grade: 'A', points: 9 },
      { id: 'c33', name: 'Computer Organization', credits: 4, grade: 'B+', points: 8 },
      { id: 'c34', name: 'Object Oriented Java', credits: 4, grade: 'A+', points: 10 },
      { id: 'c35', name: 'Data Structures Lab', credits: 2, grade: 'A+', points: 10 },
      { id: 'c36', name: 'Economics for Engineers', credits: 6, grade: 'B+', points: 8 },
    ]
  }
]

const sgpaChartData = [
  { name: 'Sem 1', sgpa: 8.2, cgpa: 8.2 },
  { name: 'Sem 2', sgpa: 8.5, cgpa: 8.34 },
  { name: 'Sem 3', sgpa: 8.7, cgpa: 8.47 },
]

export default function CgpaPage() {
  const [semesters, setSemesters] = useState(initialSemesters)
  const [expandedSemId, setExpandedSemId] = useState<number | null>(3)
  const [targetCgpa, setTargetCgpa] = useState(9.0)
  
  // Grade Calculator helper state
  const [calculatorCourses, setCalculatorCourses] = useState<Array<{ name: string; credits: number; grade: string }>>([
    { name: 'Course 1', credits: 4, grade: 'A+' },
    { name: 'Course 2', credits: 4, grade: 'A' },
    { name: 'Course 3', credits: 3, grade: 'B+' },
  ])

  // CGPA Predictor state
  const [targetSemSgpa, setTargetSemSgpa] = useState(9.2)

  const getPointsFromGrade = (grade: string): number => {
    const table: Record<string, number> = {
      'A+': 10, 'A': 9, 'B+': 8, 'B': 7, 'C+': 6, 'C': 5, 'D': 4, 'F': 0
    }
    return table[grade] || 0
  }

  const handleCalculateSgpa = () => {
    let totalCredits = 0
    let totalPoints = 0
    calculatorCourses.forEach(c => {
      totalCredits += Number(c.credits)
      totalPoints += Number(c.credits) * getPointsFromGrade(c.grade)
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const handleAddCalculatorCourse = () => {
    setCalculatorCourses([...calculatorCourses, { name: `Course ${calculatorCourses.length + 1}`, credits: 3, grade: 'A' }])
  }

  const handleRemoveCalculatorCourse = (idx: number) => {
    setCalculatorCourses(calculatorCourses.filter((_, i) => i !== idx))
  }

  const handleUpdateCalculatorCourse = (idx: number, field: string, val: any) => {
    setCalculatorCourses(calculatorCourses.map((c, i) => i === idx ? { ...c, [field]: val } : c))
  }

  // Calculate current overall CGPA
  const calculateCurrentCgpa = () => {
    let totalCredits = 0
    let totalPoints = 0
    semesters.forEach(s => {
      totalCredits += s.credits
      totalPoints += s.credits * s.sgpa
    })
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00'
  }

  const currentCgpa = Number(calculateCurrentCgpa())

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-indigo-400" /> CGPA & Academic Tracker
          </h1>
          <p className="text-xs text-slate-400">Track semester SGPAs, calculate grades, and predict future milestones</p>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Current CGPA</span>
          <h3 className="text-3xl font-extrabold text-indigo-400 mt-2">{currentCgpa}</h3>
          <p className="text-xs text-slate-400 mt-2">Calculated across 3 semesters ({semesters.reduce((acc, s) => acc + s.credits, 0)} credits)</p>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Target CGPA</span>
          <h3 className="text-3xl font-extrabold text-purple-400 mt-2">{targetCgpa}</h3>
          <div className="flex items-center gap-2 mt-2">
            <input 
              type="number" 
              step="0.1" 
              min="0.1" 
              max="10" 
              value={targetCgpa} 
              onChange={(e) => setTargetCgpa(Number(e.target.value))}
              className="w-16 bg-slate-950 border border-white/5 text-xs text-white p-1 rounded focus:outline-none"
            />
            <span className="text-[10px] text-slate-400">Click to edit goal</span>
          </div>
        </div>

        <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Required Next SGPA</span>
          <h3 className="text-3xl font-extrabold text-emerald-400 mt-2">
            {((targetCgpa * 4 - currentCgpa * 3)).toFixed(2)}
          </h3>
          <p className="text-xs text-slate-400 mt-2">Estimated SGPA needed in Semester 4 to reach {targetCgpa} target</p>
        </div>
      </div>

      {/* Main Grid: Trend Chart & Semester Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* CGPA Trend Chart (Wide) */}
        <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" /> Academic Trajectory
              </h2>
              <p className="text-xs text-slate-400">SGPA vs CGPA progression trend over semesters</p>
            </div>
          </div>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sgpaChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 10]} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                <Line type="monotone" dataKey="sgpa" stroke="#a78bfa" strokeWidth={2.5} name="SGPA" />
                <Line type="monotone" dataKey="cgpa" stroke="#6366f1" strokeWidth={2.5} name="CGPA" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Semester cards list */}
        <div className="space-y-4 overflow-y-auto max-h-[320px]">
          {semesters.map((sem) => {
            const isExpanded = sem.id === expandedSemId
            return (
              <div key={sem.id} className="p-4 rounded-xl border border-white/5 bg-slate-900/30 space-y-3">
                <div 
                  onClick={() => setExpandedSemId(isExpanded ? null : sem.id)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white">{sem.semester}</h3>
                    <p className="text-[10px] text-slate-500">{sem.credits} credits • {sem.courses.length} courses</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-indigo-400">SGPA: {sem.sgpa}</span>
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-slate-400" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden pt-2 border-t border-white/5 space-y-2"
                    >
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className="text-slate-500">
                            <th className="pb-1 font-semibold">Course</th>
                            <th className="pb-1 font-semibold text-center">Credits</th>
                            <th className="pb-1 font-semibold text-right">Grade</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {sem.courses.map((course) => (
                            <tr key={course.id} className="text-slate-300">
                              <td className="py-1.5 truncate max-w-[120px]">{course.name}</td>
                              <td className="py-1.5 text-center font-mono">{course.credits}</td>
                              <td className="py-1.5 text-right font-bold text-indigo-400">{course.grade}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Grade Calculator Section */}
      <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" /> SGPA Calculator
          </h2>
          <span className="text-xs bg-indigo-500/10 text-indigo-400 px-2.5 py-1 rounded-full font-bold">
            Projected SGPA: {handleCalculateSgpa()}
          </span>
        </div>

        <div className="space-y-4">
          {calculatorCourses.map((c, idx) => (
            <div key={idx} className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-slate-950/40 p-3 rounded-xl border border-white/5">
              <input 
                type="text" 
                value={c.name}
                onChange={(e) => handleUpdateCalculatorCourse(idx, 'name', e.target.value)}
                className="flex-1 min-w-[150px] bg-transparent border-none text-xs text-white focus:outline-none"
              />
              
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Credits:</span>
                <select
                  value={c.credits}
                  onChange={(e) => handleUpdateCalculatorCourse(idx, 'credits', Number(e.target.value))}
                  className="bg-slate-900 border border-white/5 text-xs text-white p-1 rounded focus:outline-none"
                >
                  {[1,2,3,4,6].map(cr => <option key={cr} value={cr}>{cr}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-500 font-bold uppercase">Grade:</span>
                <select
                  value={c.grade}
                  onChange={(e) => handleUpdateCalculatorCourse(idx, 'grade', e.target.value)}
                  className="bg-slate-900 border border-white/5 text-xs text-white p-1 rounded focus:outline-none"
                >
                  {['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'F'].map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              <button 
                onClick={() => handleRemoveCalculatorCourse(idx)}
                className="p-1 rounded hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-colors ml-auto"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          
          <button
            onClick={handleAddCalculatorCourse}
            className="text-xs font-semibold text-indigo-400 hover:underline flex items-center gap-1"
          >
            + Add Course Row
          </button>
        </div>
      </div>
    </div>
  )
}
