import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  BookOpen, Bell, Search, LogOut, User, Settings, BarChart2,
  ChevronDown, Menu, X, Home, GraduationCap
} from 'lucide-react';

function clsx(...args) { return args.filter(Boolean).join(' '); }

export default function Navbar({ onMenuToggle, isMobileMenuOpen }) {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [userDropdown, setUserDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isPublic = !location.pathname.startsWith('/dashboard') &&
    !location.pathname.startsWith('/admin') &&
    !location.pathname.startsWith('/assessment') &&
    !location.pathname.startsWith('/quiz') &&
    !location.pathname.startsWith('/courses') &&
    !location.pathname.startsWith('/profile') &&
    !location.pathname.startsWith('/skill') &&
    !location.pathname.startsWith('/learning') &&
    !location.pathname.startsWith('/progress') &&
    !location.pathname.startsWith('/notifications') &&
    !location.pathname.startsWith('/settings') &&
    !location.pathname.startsWith('/results');

  if (isPublic) {
    return <PublicNavbar />;
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-4 gap-4 sticky top-0 z-30">
      {/* Mobile menu toggle */}
      <button
        className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100"
        onClick={onMenuToggle}
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Logo */}
      <Link to={isAdmin ? '/admin' : '/dashboard'} className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <GraduationCap size={18} className="text-white" />
        </div>
        <span className="font-bold text-slate-900 hidden sm:block">KarmaSiksha</span>
        {isAdmin && (
          <span className="badge-slate text-xs hidden sm:flex">Admin</span>
        )}
      </Link>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search (desktop) */}
      <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-500 transition-colors">
        <Search size={14} />
        <span>Search...</span>
        <kbd className="ml-4 text-xs bg-slate-200 px-1.5 py-0.5 rounded">⌘K</kbd>
      </button>

      {/* Notifications */}
      <button
        className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
        onClick={() => navigate('/notifications')}
      >
        <Bell size={20} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger-500 rounded-full" />
      </button>

      {/* User menu */}
      <div className="relative">
        <button
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 hover:bg-slate-100 rounded-lg transition-colors"
          onClick={() => setUserDropdown(!userDropdown)}
        >
          <div className="w-7 h-7 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-xs">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-700 max-w-[120px] truncate">
            {user?.name?.split(' ')[0]}
          </span>
          <ChevronDown size={14} className="text-slate-400" />
        </button>

        {userDropdown && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setUserDropdown(false)} />
            <div className="absolute right-0 top-full mt-1.5 w-52 bg-white border border-slate-200 rounded-xl shadow-dropdown z-20 py-1 animate-fade-in">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-sm font-semibold text-slate-800 truncate">{user?.name}</p>
                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
              </div>
              {isAdmin && (
                <DropdownItem icon={BarChart2} label="Admin Panel" to="/admin" onClick={() => setUserDropdown(false)} />
              )}
              <DropdownItem icon={Home} label="Dashboard" to="/dashboard" onClick={() => setUserDropdown(false)} />
              <DropdownItem icon={User} label="My Profile" to="/profile" onClick={() => setUserDropdown(false)} />
              <DropdownItem icon={Settings} label="Settings" to="/settings" onClick={() => setUserDropdown(false)} />
              <div className="my-1 border-t border-slate-100" />
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-danger-600 hover:bg-danger-50 transition-colors"
                onClick={handleLogout}
              >
                <LogOut size={15} />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

function DropdownItem({ icon: Icon, label, to, onClick }) {
  const navigate = useNavigate();
  return (
    <button
      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
      onClick={() => { onClick?.(); navigate(to); }}
    >
      <Icon size={15} className="text-slate-400" />
      {label}
    </button>
  );
}

// ─── PUBLIC NAVBAR ────────────────────────────────────────────────────────────
function PublicNavbar() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    { label: 'About', to: '/about' },
    { label: 'Features', to: '/features' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'FAQ', to: '/faq' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <nav className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-900">KarmaSiksha</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="text-sm text-slate-600 hover:text-primary-600 transition-colors font-medium">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <button
              className="btn-md btn-primary"
              onClick={() => navigate(isAdmin ? '/admin' : '/dashboard')}
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <Link to="/login" className="btn-md btn-secondary">Sign In</Link>
              <Link to="/register" className="btn-md btn-primary">Get Started</Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 animate-slide-up">
          {links.map(l => (
            <Link key={l.to} to={l.to} className="block py-2 text-sm text-slate-700 font-medium" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2 border-t border-slate-100">
            <Link to="/login" className="flex-1 btn-md btn-secondary text-center">Sign In</Link>
            <Link to="/register" className="flex-1 btn-md btn-primary text-center">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}
