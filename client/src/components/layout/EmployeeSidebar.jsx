import { Link, useLocation } from 'react-router-dom';
import { useStream } from '../../context/StreamContext';
import {
  LayoutDashboard,
  User,
  Target,
  AlertTriangle,
  Map,
  BookOpen,
  FlaskConical,
  ClipboardCheck,
  MessageSquare,
  Trophy,
  Compass,
  Sparkles,
  Clock,
  Award,
  ChevronRight,
  X
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { to: '/profile', label: 'My Profile', icon: User },
  { to: '/competencies', label: 'Competencies', icon: Target },
  { to: '/skill-gaps', label: 'Skill Gaps', icon: AlertTriangle, badge: '3' },
  { to: '/learning-path', label: 'Learning Path', icon: Map },
  { to: '/explore-learning', label: 'Explore Learning', icon: BookOpen },
  { to: '/virtual-labs', label: 'Virtual Labs', icon: FlaskConical, badge: 'New' },
  { to: '/assessments', label: 'Assessments', icon: ClipboardCheck },
  { to: '/discussions', label: 'Discussions', icon: MessageSquare },
  { to: '/leaderboard', label: 'Leaderboard', icon: Trophy },
  { to: '/future-role', label: 'Future Role', icon: Compass },
  { to: '/ai-assistant', label: 'AI Virtual Assistant', icon: Sparkles, isAction: true },
  { to: '/progress', label: 'Progress History', icon: Clock },
  { to: '/certificates', label: 'Certificates', icon: Award },
];

export default function EmployeeSidebar({ mobile = false, onClose }) {
  const location = useLocation();
  const { employee, setIsAIAssistantOpen, selectedStream } = useStream();

  const isActive = (to) => {
    if (to === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(to);
  };

  return (
    <aside
      className={`bg-white border-r border-gov-gray-200 flex flex-col h-full select-none ${
        mobile
          ? 'fixed inset-y-0 left-0 z-50 w-72 shadow-2xl animate-in slide-in-from-left duration-200'
          : 'w-64 shrink-0'
      }`}
    >
      {/* Mobile Top Header */}
      {mobile && (
        <div className="p-4 border-b border-gov-gray-200 flex items-center justify-between bg-gov-navy text-white">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-gov-saffron flex items-center justify-center font-bold text-xs text-white">
              iG
            </div>
            <div>
              <p className="text-xs font-bold leading-none">iGOT Karmayogi</p>
              <p className="text-[10px] text-white/60 leading-tight">Employee Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Portal Brand Tag (Desktop) */}
      {!mobile && (
        <div className="px-4 py-3 border-b border-gov-gray-200 bg-gov-off-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gov-navy flex items-center justify-center text-white text-[10px] font-bold">
              GOV
            </div>
            <div>
              <p className="text-[11px] font-bold text-gov-navy uppercase tracking-wider">Employee Portal</p>
              <p className="text-[10px] text-gov-gray-400">{selectedStream?.name || 'Statistics'}</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-gov-green animate-pulse" title="System Active" />
        </div>
      )}

      {/* Navigation Links (14 items) */}
      <nav className="flex-1 overflow-y-auto py-3 px-2.5 space-y-0.5 text-xs">
        {navItems.map(({ to, label, icon: Icon, badge, isAction }) => {
          const active = isActive(to);

          if (isAction) {
            return (
              <button
                key={to}
                type="button"
                onClick={() => {
                  setIsAIAssistantOpen(true);
                  if (mobile && onClose) onClose();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-gov font-medium text-gov-blue hover:bg-gov-blue-light transition-colors text-left"
              >
                <Icon size={15} className="text-gov-saffron shrink-0" />
                <span className="flex-1 truncate font-semibold">{label}</span>
                <span className="badge-gov-warning text-[9px] px-1.5 py-0.2">AI</span>
              </button>
            );
          }

          return (
            <Link
              key={to}
              to={to}
              onClick={mobile ? onClose : undefined}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-gov font-medium transition-all duration-150 ${
                active
                  ? 'bg-gov-blue text-white shadow-xs font-semibold'
                  : 'text-gov-gray-600 hover:text-gov-navy hover:bg-gov-gray-100'
              }`}
            >
              <Icon
                size={15}
                className={`shrink-0 ${active ? 'text-white' : 'text-gov-gray-400'}`}
              />
              <span className="flex-1 truncate">{label}</span>
              {badge && (
                <span
                  className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    active
                      ? 'bg-white/20 text-white'
                      : badge === 'New'
                      ? 'bg-gov-green text-white'
                      : 'bg-gov-red-light text-gov-red border border-red-200'
                  }`}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: Employee Profile Card with Online/Active Indicator */}
      <div className="p-3 border-t border-gov-gray-200 bg-gov-off-white">
        <Link
          to="/profile"
          onClick={mobile ? onClose : undefined}
          className="flex items-center gap-3 p-2 rounded-gov hover:bg-white border border-transparent hover:border-gov-gray-200 transition-all"
        >
          {/* Avatar with active green dot */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gov-navy text-white font-bold text-xs flex items-center justify-center border border-white shadow-xs">
              {employee.avatarInitials || 'AS'}
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-gov-green border-2 border-white rounded-full"
              title="Online / Active"
            />
          </div>

          {/* Employee Metadata */}
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-gov-navy truncate leading-tight">
              {employee.name || 'Arjun Sharma'}
            </p>
            <p className="text-[10px] text-gov-gray-400 truncate leading-tight mt-0.5">
              {employee.designation || 'Statistical Investigator'}
            </p>
          </div>

          <ChevronRight size={14} className="text-gov-gray-400 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}
