import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Bell,
  Sparkles,
  User,
  Shield,
  Settings,
  LogOut,
  ChevronDown,
  Menu,
  ExternalLink,
  BookOpen,
  FlaskConical,
  Target,
  MessageSquare
} from 'lucide-react';
import { useStream } from '../../context/StreamContext';

export default function GovernmentTopNav({ onLogout, onMobileMenuToggle }) {
  const navigate = useNavigate();
  const {
    employee,
    currentRole,
    notifications,
    setIsAIAssistantOpen,
    courses,
    virtualLabs,
    discussions,
    gapAnalysis,
  } = useStream();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const searchRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Search Results Filtering
  const filteredCourses = searchQuery.trim()
    ? courses.filter(c => c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.competency.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredLabs = searchQuery.trim()
    ? virtualLabs.filter(l => l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.targetCompetency.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredDiscussions = searchQuery.trim()
    ? discussions.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()) || d.relatedCompetency.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];
  const filteredCompetencies = searchQuery.trim()
    ? (gapAnalysis?.competencyBreakdown || []).filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const totalResults = filteredCourses.length + filteredLabs.length + filteredDiscussions.length + filteredCompetencies.length;

  // Click outside search
  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gov-gray-200 shadow-xs">
      {/* ── 1. Top Government Emblem Strip ─────────────────────────────────── */}
      <div className="bg-gov-navy text-white text-xs border-b border-white/10">
        <div className="h-0.5 bg-gradient-to-r from-gov-saffron via-white to-gov-green" />
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-serif text-[8px] font-bold text-gov-saffron">
              GOV
            </div>
            <div>
              <span className="font-bold tracking-wide text-white">भारत सरकार · Government of India</span>
              <span className="text-white/40 mx-2 hidden md:inline">|</span>
              <span className="text-white/80 hidden md:inline">{currentRole.ministry}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-white/10 px-2 py-0.5 rounded text-[10px] border border-white/15">
              <span className="w-1.5 h-1.5 rounded-full bg-gov-saffron animate-pulse" />
              <span className="font-semibold text-white">iGOT Karmayogi Integrated</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Main Search & Utility Bar ───────────────────────────────────── */}
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        
        {/* Left: Mobile menu button & App Title */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-1.5 text-gov-gray-600 hover:text-gov-navy hover:bg-gov-gray-100 rounded-gov"
            aria-label="Toggle menu"
          >
            <Menu size={20} />
          </button>

          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gov-blue flex items-center justify-center font-bold text-white text-xs shadow-xs">
              iG
            </div>
            <div>
              <h1 className="text-sm font-bold text-gov-navy leading-tight">iGOT Karmayogi</h1>
              <p className="text-[10px] text-gov-gray-400 leading-none">Employee Competency Portal</p>
            </div>
          </Link>
        </div>

        {/* Center: Search Bar with Live Result Dropdown */}
        <div className="flex-1 max-w-xl relative" ref={searchRef}>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
            <input
              type="text"
              className="gov-input pl-9 pr-4 py-1.5 text-xs bg-gov-gray-100/70 focus:bg-white border-gov-gray-200"
              placeholder="Search competencies, learning resources, virtual labs..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchOpen(true);
              }}
              onFocus={() => setSearchOpen(true)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gov-gray-400 hover:text-gov-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Dropdown */}
          <AnimatePresence>
            {searchOpen && searchQuery.trim().length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gov-gray-200 rounded-gov-md shadow-gov-dropdown z-50 max-h-96 overflow-y-auto"
              >
                <div className="p-2 border-b border-gov-gray-100 flex items-center justify-between text-[11px] text-gov-gray-400">
                  <span>Search Results for "{searchQuery}"</span>
                  <span>{totalResults} matches</span>
                </div>

                {totalResults === 0 ? (
                  <div className="p-4 text-center text-xs text-gov-gray-400">
                    No matching resources found for "{searchQuery}".
                  </div>
                ) : (
                  <div className="p-2 space-y-3">
                    {/* Courses */}
                    {filteredCourses.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                          <BookOpen size={11} /> Courses ({filteredCourses.length})
                        </p>
                        {filteredCourses.slice(0, 3).map(c => (
                          <Link
                            key={c.id}
                            to="/explore-learning"
                            onClick={() => setSearchOpen(false)}
                            className="block px-2.5 py-1.5 rounded-gov hover:bg-gov-blue-light/50 text-xs"
                          >
                            <p className="font-semibold text-gov-navy truncate">{c.title}</p>
                            <p className="text-[10px] text-gov-gray-400">{c.provider} · {c.duration}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Virtual Labs */}
                    {filteredLabs.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                          <FlaskConical size={11} /> Virtual Labs ({filteredLabs.length})
                        </p>
                        {filteredLabs.slice(0, 2).map(l => (
                          <Link
                            key={l.id}
                            to="/virtual-labs"
                            onClick={() => setSearchOpen(false)}
                            className="block px-2.5 py-1.5 rounded-gov hover:bg-gov-green-light/50 text-xs"
                          >
                            <p className="font-semibold text-gov-navy truncate">{l.title}</p>
                            <p className="text-[10px] text-gov-gray-400">{l.targetCompetency}</p>
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Discussions */}
                    {filteredDiscussions.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider px-2 mb-1 flex items-center gap-1">
                          <MessageSquare size={11} /> Discussions ({filteredDiscussions.length})
                        </p>
                        {filteredDiscussions.slice(0, 2).map(d => (
                          <Link
                            key={d.id}
                            to="/discussions"
                            onClick={() => setSearchOpen(false)}
                            className="block px-2.5 py-1.5 rounded-gov hover:bg-gov-gray-100 text-xs"
                          >
                            <p className="font-semibold text-gov-navy truncate">{d.title}</p>
                            <p className="text-[10px] text-gov-gray-400">{d.repliesCount} replies · {d.author.name}</p>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Utility Controls */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* AI Virtual Assistant Trigger Button */}
          <button
            onClick={() => setIsAIAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gov-saffron-light hover:bg-gov-saffron text-gov-saffron hover:text-white border border-gov-saffron/30 rounded-gov text-xs font-semibold transition-all shadow-xs"
            title="Open AI Virtual Assistant"
          >
            <Sparkles size={14} className="animate-spin-slow" />
            <span className="hidden sm:inline">AI Assistant</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
              className="relative p-2 text-gov-gray-600 hover:text-gov-blue hover:bg-gov-gray-100 rounded-gov transition-colors"
              aria-label="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-gov-saffron text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setNotifOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white border border-gov-gray-200 rounded-gov-md shadow-gov-dropdown z-40"
                  >
                    <div className="px-4 py-3 border-b border-gov-gray-200 flex items-center justify-between bg-gov-off-white">
                      <div>
                        <h3 className="text-xs font-bold text-gov-navy">Notifications & Updates</h3>
                        <p className="text-[10px] text-gov-gray-400">Competency & Platform Alerts</p>
                      </div>
                      {unreadCount > 0 && (
                        <span className="badge-gov-saffron text-[10px]">{unreadCount} New</span>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto divide-y divide-gov-gray-100">
                      {notifications.map(n => (
                        <Link
                          key={n.id}
                          to={n.link || '/dashboard'}
                          onClick={() => setNotifOpen(false)}
                          className={`block p-3.5 hover:bg-gov-blue-light/30 transition-colors ${!n.read ? 'bg-gov-blue-light/40' : ''}`}
                        >
                          <div className="flex items-start gap-2.5">
                            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                              n.type === 'success' ? 'bg-gov-green' : n.type === 'warning' ? 'bg-gov-amber' : 'bg-gov-blue'
                            }`} />
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gov-navy leading-snug">{n.title}</p>
                              <p className="text-[11px] text-gov-gray-600 mt-0.5 leading-relaxed">{n.message}</p>
                              <p className="text-[9px] text-gov-gray-400 mt-1">{n.time}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Employee Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
              className="flex items-center gap-2 p-1.5 hover:bg-gov-gray-100 rounded-gov transition-colors border border-transparent hover:border-gov-gray-200"
            >
              <div className="w-7 h-7 rounded-full bg-gov-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                {employee.avatarInitials || 'AS'}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-bold text-gov-navy leading-none">{employee.name || 'Arjun Sharma'}</p>
                <p className="text-[10px] text-gov-gray-400 leading-none mt-0.5 max-w-[120px] truncate">{employee.designation}</p>
              </div>
              <ChevronDown size={13} className="text-gov-gray-400 hidden sm:block" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    className="absolute right-0 top-full mt-2 w-64 bg-white border border-gov-gray-200 rounded-gov-md shadow-gov-dropdown z-40"
                  >
                    <div className="p-3.5 border-b border-gov-gray-200 bg-gov-off-white">
                      <p className="text-xs font-bold text-gov-navy">{employee.name}</p>
                      <p className="text-[10px] text-gov-gray-500 font-mono">{employee.id}</p>
                      <p className="text-[11px] text-gov-blue font-medium mt-1 truncate">{employee.designation}</p>
                    </div>

                    <div className="p-1.5 space-y-0.5 text-xs">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-gov hover:bg-gov-gray-100 text-gov-gray-700"
                      >
                        <User size={14} className="text-gov-gray-400" />
                        <span>My Official Profile</span>
                      </Link>
                      <Link
                        to="/future-role"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-gov hover:bg-gov-gray-100 text-gov-gray-700"
                      >
                        <Target size={14} className="text-gov-gray-400" />
                        <span>Career Path & Promotion</span>
                      </Link>
                      <Link
                        to="/certificates"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-gov hover:bg-gov-gray-100 text-gov-gray-700"
                      >
                        <Shield size={14} className="text-gov-gray-400" />
                        <span>Verified Certificates</span>
                      </Link>
                    </div>

                    <div className="p-1.5 border-t border-gov-gray-200">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-gov hover:bg-gov-red-light text-gov-red text-xs font-semibold transition-colors"
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </header>
  );
}
