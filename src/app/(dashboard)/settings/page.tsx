'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Settings, User, Bell, Shield, Palette,
  Save, Trash2, ShieldCheck, ChevronRight, Check,
  Globe, Eye, Monitor, Accessibility, Info, Camera, EyeOff, Moon, Sun
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/lib/store'

const categories = [
  { id: 'profile', name: 'Profile Settings', icon: User },
  { id: 'appearance', name: 'Appearance', icon: Palette },
  { id: 'notifications', name: 'Notifications', icon: Bell },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'accessibility', name: 'Accessibility', icon: Accessibility },
  { id: 'language', name: 'Language', icon: Globe },
  { id: 'privacy', name: 'Privacy & Data', icon: ShieldCheck },
]

export default function SettingsPage() {
  const { user, updateUser } = useUserStore()
  const [activeCat, setActiveCat] = useState('profile')

  // Profile Form state
  const [name, setName] = useState(user.name)
  const [bio, setBio] = useState('Passionate student prepping for national exams')
  const [targetExam, setTargetExam] = useState(user.targetExam || 'JEE')

  // Appearance state
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [accentColor, setAccentColor] = useState('indigo')
  const [compactMode, setCompactMode] = useState(false)

  // Notifications state
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(true)

  // Security state
  const [tfa, setTfa] = useState(false)

  // Accessibility state
  const [screenReader, setScreenReader] = useState(false)
  const [highContrast, setHighContrast] = useState(false)
  const [fontSizeScale, setFontSizeScale] = useState(100)

  // Language state
  const [langCode, setLangCode] = useState('en-IN')
  const [speechSpeed, setSpeechSpeed] = useState(1)

  // Privacy state
  const [shareStats, setShareStats] = useState(false)

  const handleSaveProfile = () => {
    updateUser({ name, targetExam })
    alert('Settings saved successfully!')
  }

  const handleClearLocalData = () => {
    if (confirm('Are you sure you want to clear your local database? This will reset your notes and streak.')) {
      localStorage.clear()
      window.location.href = '/'
    }
  }

  return (
    <div className="h-[calc(100vh-120px)] flex rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden m-6">
      {/* Settings Navigation Sidebar */}
      <div className="w-64 border-r border-white/5 bg-slate-900/30 flex flex-col justify-between shrink-0 p-4 space-y-4">
        <div className="space-y-1">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Settings</h3>
          {categories.map((cat) => {
            const IconComp = cat.icon
            const isActive = activeCat === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={cn(
                  "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-semibold transition-colors",
                  isActive ? "bg-white/5 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <IconComp className="w-4 h-4 text-indigo-400 shrink-0" />
                <span>{cat.name}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="flex-1 p-8 overflow-y-auto bg-slate-950/20">
        <AnimatePresence mode="wait">
          {activeCat === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Profile Settings</h2>
                <p className="text-xs text-slate-400">Update your account information, profile pictures and academic targets</p>
              </div>

              {/* Avatar upload */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-white/10 group cursor-pointer">
                  <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Upload New Photo</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Supports PNG or JPG. Max file size: 2MB.</p>
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-widest block">Full Name</label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-widest block">Academic Bio</label>
                  <textarea 
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full h-20 px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-widest block">Target Exam</label>
                  <select
                    value={targetExam}
                    onChange={(e) => setTargetExam(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="JEE">JEE Mains / Advanced</option>
                    <option value="NEET">NEET Medical Exam</option>
                    <option value="UPSC">UPSC Civil Services</option>
                    <option value="CUET">CUET Entrance Test</option>
                  </select>
                </div>
              </div>

              <button 
                onClick={handleSaveProfile}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </motion.div>
          )}

          {activeCat === 'appearance' && (
            <motion.div 
              key="appearance"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Appearance</h2>
                <p className="text-xs text-slate-400">Tailor accent themes, layouts and visual metrics</p>
              </div>

              {/* Theme selectors */}
              <div className="space-y-3">
                <span className="font-bold text-slate-400 uppercase tracking-widest block">Theme Mode</span>
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setTheme('dark')}
                    className={cn(
                      "p-4 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-2 transition-all",
                      theme === 'dark' ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-white/5 bg-slate-950/40 text-slate-400 hover:text-white"
                    )}
                  >
                    <Moon className="w-5 h-5 text-indigo-400" />
                    <span>Dark Mode</span>
                  </button>
                  <button 
                    onClick={() => setTheme('light')}
                    className={cn(
                      "p-4 rounded-xl border text-center font-bold flex flex-col items-center justify-center gap-2 transition-all",
                      theme === 'light' ? "border-indigo-500 bg-indigo-500/10 text-white" : "border-white/5 bg-slate-950/40 text-slate-400 hover:text-white"
                    )}
                  >
                    <Sun className="w-5 h-5 text-indigo-400" />
                    <span>Light Mode</span>
                  </button>
                </div>
              </div>

              {/* Accent Picker */}
              <div className="space-y-3">
                <span className="font-bold text-slate-400 uppercase tracking-widest block">Accent Swatches</span>
                <div className="flex gap-2.5">
                  {['indigo', 'purple', 'cyan', 'rose', 'amber', 'emerald'].map((col) => {
                    const colors: Record<string, string> = {
                      indigo: 'bg-indigo-500',
                      purple: 'bg-purple-500',
                      cyan: 'bg-cyan-500',
                      rose: 'bg-rose-500',
                      amber: 'bg-amber-500',
                      emerald: 'bg-emerald-500'
                    }
                    const isSelected = accentColor === col
                    return (
                      <button
                        key={col}
                        onClick={() => setAccentColor(col)}
                        className={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center transition-all",
                          isSelected ? "border-white scale-110" : "border-transparent hover:scale-105"
                        )}
                      >
                        <span className={cn("w-6 h-6 rounded-full block", colors[col])} />
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Compact Mode Switch */}
              <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white">Compact Layout Mode</h4>
                  <p className="text-[10px] text-slate-500">Decreases card spacers and navigation dimensions</p>
                </div>
                <button 
                  onClick={() => setCompactMode(!compactMode)}
                  className={cn(
                    "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                    compactMode ? "bg-indigo-600" : "bg-slate-800"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", compactMode ? "translate-x-4" : "translate-x-0")} />
                </button>
              </div>
            </motion.div>
          )}

          {activeCat === 'notifications' && (
            <motion.div 
              key="notifications"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Notifications</h2>
                <p className="text-xs text-slate-400">Configure what triggers alerts and communication channels</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">Email Digest Alerts</h4>
                    <p className="text-[10px] text-slate-500">Send calendar highlights and overdue tasks digests</p>
                  </div>
                  <button 
                    onClick={() => setEmailNotif(!emailNotif)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                      emailNotif ? "bg-indigo-600" : "bg-slate-800"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", emailNotif ? "translate-x-4" : "translate-x-0")} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">Browser Push Warnings</h4>
                    <p className="text-[10px] text-slate-500">Daily reminders before Pomodoro focus intervals expire</p>
                  </div>
                  <button 
                    onClick={() => setPushNotif(!pushNotif)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                      pushNotif ? "bg-indigo-600" : "bg-slate-800"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", pushNotif ? "translate-x-4" : "translate-x-0")} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeCat === 'security' && (
            <motion.div 
              key="security"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Security Settings</h2>
                <p className="text-xs text-slate-400">Lock down credentials and configure multi-factor authentications</p>
              </div>

              {/* TFA Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                <div className="space-y-0.5">
                  <h4 className="font-bold text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-[10px] text-slate-500">Requires authentication codes on login attempts</p>
                </div>
                <button 
                  onClick={() => setTfa(!tfa)}
                  className={cn(
                    "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                    tfa ? "bg-indigo-600" : "bg-slate-800"
                  )}
                >
                  <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", tfa ? "translate-x-4" : "translate-x-0")} />
                </button>
              </div>

              {tfa && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-slate-900 border border-white/5 rounded-xl text-center space-y-3"
                >
                  <span className="text-3xl block">🔑</span>
                  <h4 className="font-bold text-white">Scan Authenticator QR</h4>
                  <p className="text-[10px] text-slate-400 max-w-xs mx-auto">Use Google Authenticator or Duo to scan and register security tokens.</p>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeCat === 'accessibility' && (
            <motion.div 
              key="accessibility"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Accessibility</h2>
                <p className="text-xs text-slate-400">Configure screen readers, font scale, and motion settings</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">High Contrast Mode</h4>
                    <p className="text-[10px] text-slate-500">Increases visibility contrasts across dashboard layouts</p>
                  </div>
                  <button 
                    onClick={() => setHighContrast(!highContrast)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                      highContrast ? "bg-indigo-600" : "bg-slate-800"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", highContrast ? "translate-x-4" : "translate-x-0")} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">Text-to-Speech Output</h4>
                    <p className="text-[10px] text-slate-500">Narrates key actions and tutorial responses aloud</p>
                  </div>
                  <button 
                    onClick={() => setScreenReader(!screenReader)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                      screenReader ? "bg-indigo-600" : "bg-slate-800"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", screenReader ? "translate-x-4" : "translate-x-0")} />
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">Font Scaling ({fontSizeScale}%)</span>
                  <input 
                    type="range"
                    min="80"
                    max="140"
                    step="10"
                    value={fontSizeScale}
                    onChange={(e) => setFontSizeScale(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>80% (Small)</span>
                    <span>100% (Default)</span>
                    <span>140% (Large)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeCat === 'language' && (
            <motion.div 
              key="language"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Language</h2>
                <p className="text-xs text-slate-400">Select display and tutoring speech languages</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-400 uppercase tracking-widest block">System Language</label>
                  <select
                    value={langCode}
                    onChange={(e) => setLangCode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/5 bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="en-IN">English (India)</option>
                    <option value="en-US">English (United States)</option>
                    <option value="hi-IN">Hindi (हिन्दी)</option>
                    <option value="te-IN">Telugu (తెలుగు)</option>
                    <option value="ta-IN">Tamil (தமிழ்)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <span className="font-bold text-slate-400 uppercase tracking-widest block">Speech Synthesis Speed ({speechSpeed}x)</span>
                  <input 
                    type="range"
                    min="0.8"
                    max="1.5"
                    step="0.1"
                    value={speechSpeed}
                    onChange={(e) => setSpeechSpeed(Number(e.target.value))}
                    className="w-full accent-indigo-500 bg-slate-900 rounded-lg appearance-none h-1.5 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0.8x (Slow)</span>
                    <span>1.0x (Normal)</span>
                    <span>1.5x (Fast)</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeCat === 'privacy' && (
            <motion.div 
              key="privacy"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-6 max-w-xl text-xs"
            >
              <div>
                <h2 className="text-lg font-bold text-white">Privacy & Data Control</h2>
                <p className="text-xs text-slate-400">Manage what data is shared or stored locally on this machine</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-950/40 rounded-xl border border-white/5">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-white">Share Anonymized Stats</h4>
                    <p className="text-[10px] text-slate-500">Share study speeds anonymously to help build leaderboards</p>
                  </div>
                  <button 
                    onClick={() => setShareStats(!shareStats)}
                    className={cn(
                      "w-10 h-6 rounded-full p-1 transition-colors relative shrink-0",
                      shareStats ? "bg-indigo-600" : "bg-slate-800"
                    )}
                  >
                    <div className={cn("w-4 h-4 rounded-full bg-white transition-transform", shareStats ? "translate-x-4" : "translate-x-0")} />
                  </button>
                </div>

                <div className="p-4 rounded-xl border border-rose-500/10 bg-rose-500/5 space-y-3">
                  <h4 className="font-bold text-rose-400">Reset Local Database</h4>
                  <p className="text-[11px] text-slate-400">This action resets the localStorage container database, deleting all mock flashcards, notes, logs, and resetting progress scores.</p>
                  <button 
                    onClick={handleClearLocalData}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold transition-colors"
                  >
                    Reset All Data
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
