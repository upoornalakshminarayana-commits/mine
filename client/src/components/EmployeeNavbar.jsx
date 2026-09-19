import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Target, ClipboardCheck, BookOpen, TrendingUp, Award, HelpCircle,
  Bell, User, ChevronDown, Menu, X, LogOut, Settings, Shield
} from 'lucide-react';
import { employee, notifications } from '../data/mockData';

const navLinks = [
  { to: '/dashboard',      label: 'Home',            icon: Home },
  { to: '/competencies',   label: 'My Competencies', icon: Target },
  { to: '/assessment',     label: 'Skill Assessment', icon: ClipboardCheck },
  { to: '/learning',       label: 'Learning',         icon: BookOpen },
  { to: '/progress',       label: 'My Progress',      icon: TrendingUp },
  { to: '/certificates',   label: 'Certificates',     icon: Award },
  { to: '/help',           label: 'Help',             icon: HelpCircle },
];

export default function EmployeeNavbar({ onLogout }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (to) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="bg-white border-b border-gov-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14 gap-4">

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-gov transition-all duration-150
                  ${isActive(to)
                    ? 'text-gov-blue bg-gov-blue-light border-b-2 border-gov-blue rounded-b-none'
                    : 'text-gov-gray-600 hover:text-gov-blue hover:bg-gov-gray-100'
                  }`}
              >
                <Icon size={14} strokeWidth={2} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setNotifOpen(!notifOpen); setProfileOpen(false); }}
                className="relative p-2 text-gov-gray-600 hover:text-gov-blue hover:bg-gov-gray-100 rounded-gov transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-gov-saffron text-white text-[9px] font-bold rounded-full flex items-center justify-center">
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
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-white border border-gov-gray-200 rounded-gov-md shadow-gov-dropdown z-40"
                    >
                      <div className="px-4 py-3 border-b border-gov-gray-200 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gov-navy">Notifications</h3>
                        {unreadCount > 0 && <span className="badge-gov-info">{unreadCount} new</span>}
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className={`px-4 py-3 border-b border-gov-gray-100 last:border-0 ${!n.read ? 'bg-gov-blue-light/40' : ''}`}>
                            <div className="flex items-start gap-2">
                              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.type === 'warning' ? 'bg-gov-saffron' : n.type === 'success' ? 'bg-gov-green' : 'bg-gov-blue'}`} />
                              <div>
                                <p className="text-xs font-semibold text-gov-navy">{n.title}</p>
                                <p className="text-xs text-gov-gray-400 mt-0.5">{n.message}</p>
                                <p className="text-[10px] text-gov-gray-400 mt-1">{n.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => { setProfileOpen(!profileOpen); setNotifOpen(false); }}
                className="flex items-center gap-2 px-2.5 py-1.5 hover:bg-gov-gray-100 rounded-gov transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gov-blue flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {employee.name.charAt(0)}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-gov-navy leading-none">{employee.name.split(' ')[0]}</p>
                  <p className="text-[10px] text-gov-gray-400 leading-none mt-0.5 max-w-[120px] truncate">{employee.role.split('(')[0].trim()}</p>
                </div>
                <ChevronDown size={14} className="text-gov-gray-400 hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-60 bg-white border border-gov-gray-200 rounded-gov-md shadow-gov-dropdown z-40"
                    >
                      <div className="px-4 py-3 border-b border-gov-gray-200 bg-gov-off-white">
                        <p className="text-sm font-semibold text-gov-navy">{employee.name}</p>
                        <p className="text-xs text-gov-gray-400">{employee.id}</p>
                        <p className="text-xs text-gov-gray-400 mt-0.5 truncate">{employee.role}</p>
                      </div>
                      {[
                        { icon: User, label: 'My Profile', action: null },
                        { icon: Shield, label: 'iGOT Account', action: null },
                        { icon: Settings, label: 'Settings', action: null },
                      ].map(({ icon: Icon, label, action }) => (
                        <button key={label} onClick={action}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gov-gray-600 hover:bg-gov-gray-100 hover:text-gov-blue transition-colors">
                          <Icon size={14} />
                          {label}
                        </button>
                      ))}
                      <div className="my-1 border-t border-gov-gray-200" />
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gov-red hover:bg-gov-red-light transition-colors"
                      >
                        <LogOut size={14} />
                        Sign Out
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 text-gov-gray-600 hover:text-gov-blue hover:bg-gov-gray-100 rounded-gov transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-gov-gray-200 bg-white"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-gov transition-colors
                    ${isActive(to) ? 'bg-gov-blue-light text-gov-blue' : 'text-gov-gray-600 hover:bg-gov-gray-100'}`}
                >
                  <Icon size={16} strokeWidth={2} />
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
