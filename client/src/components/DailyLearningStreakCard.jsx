import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Flame,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  Target,
  ExternalLink,
  ListFilter,
  X,
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import {
  calculateLearningStreak,
  getInitialEmployeeActivities,
  STREAK_MILESTONES,
  getLocalDateString,
} from '../services/streakService';

export default function DailyLearningStreakCard({ compact = false }) {
  const { employee, departmentConfig, gapAnalysis } = useStream();
  const [showActivityModal, setShowActivityModal] = useState(false);

  // Local storage activity events persisted per employee
  const empId = employee?.id || 'demo-employee-01';
  const storageKey = `ks_learning_activities_${empId}`;

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved activities', e);
      }
    }
    return getInitialEmployeeActivities(empId);
  });

  // Calculate dynamic streak metrics
  const streakData = useMemo(() => {
    return calculateLearningStreak(activities, employee);
  }, [activities, employee]);

  const {
    currentStreak,
    longestStreak,
    totalLearningDays,
    thisMonthLearningDays,
    completedToday,
    statusMessage,
    nextMilestone,
    daysToNextMilestone,
    milestoneProgress,
    weekCalendar,
  } = streakData;

  // Simulate logging a meaningful learning activity today
  const handleCompleteTodayActivity = () => {
    const todayStr = getLocalDateString();
    if (activities.some(a => a.dateStr === todayStr)) return;

    const newActivity = {
      id: `act-manual-${Date.now()}`,
      dateStr: todayStr,
      displayDate: 'Today',
      title: `Completed ${departmentConfig?.roleConfig?.title || 'Officer'} Capacity Module`,
      type: 'COURSE_LESSON',
      course: departmentConfig?.courses?.[0]?.title || 'Professional Foundations',
      competency: departmentConfig?.competencies?.[0]?.name || 'Official Competency',
      status: 'Completed',
    };

    const updated = [newActivity, ...activities];
    setActivities(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  };

  // Extract competencies improved connected to learning streak
  const supportedCompetencies = (departmentConfig?.competencies || []).slice(0, 3).map(c => c.name);

  // Compact Mode (for Dashboard)
  if (compact) {
    return (
      <div className="gov-card p-4 bg-white border border-gov-gray-200 rounded-gov-md shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-gov-saffron shrink-0">
            <Flame size={20} className="fill-gov-saffron" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gov-gray-500 uppercase tracking-wider">
                DAILY LEARNING
              </span>
              {completedToday && (
                <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-gov-green bg-green-50 px-1.5 py-0.2 rounded-full border border-green-200">
                  <CheckCircle2 size={10} />
                  <span>Logged Today</span>
                </span>
              )}
            </div>
            <p className="text-lg font-black text-gov-navy leading-tight">
              🔥 {currentStreak} Day Streak
            </p>
            <p className="text-[11px] text-gov-gray-500">
              {completedToday ? 'You kept your learning momentum alive!' : 'Complete 1 activity today to continue streak'}
            </p>
          </div>
        </div>

        <Link
          to="/profile"
          className="px-3 py-1.5 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-navy transition-colors shrink-0"
        >
          View Streak
        </Link>
      </div>
    );
  }

  // Full Mode (Inside Profile Setup)
  return (
    <div className="gov-card p-5 sm:p-6 bg-white border border-gov-gray-200 rounded-gov-lg shadow-gov-card space-y-5">
      
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gov-gray-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gov-saffron animate-pulse" />
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
              <Flame size={15} className="text-gov-saffron fill-gov-saffron" />
              <span>DAILY LEARNING STREAK</span>
            </h3>
          </div>
          <p className="text-xs text-gov-gray-500 mt-0.5">
            Build a consistent learning habit and keep your competencies growing.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setShowActivityModal(true)}
            className="text-xs font-bold text-gov-blue hover:text-gov-navy flex items-center gap-1"
          >
            <Clock size={13} />
            <span>View Learning Activity</span>
          </button>
        </div>
      </div>

      {/* ── Main Streak Showcase Banner ───────────────────────────────────── */}
      <div className="p-4 rounded-gov-md bg-gradient-to-r from-amber-50/80 via-white to-gov-blue-light/50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white border-2 border-amber-300 shadow-sm flex items-center justify-center text-gov-saffron shrink-0">
            <Flame size={30} className="fill-gov-saffron" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-gov-navy tracking-tight">
                {currentStreak} Day Streak
              </span>
              {completedToday ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-gov-green text-white shadow-xs">
                  <CheckCircle2 size={11} />
                  <span>ACTIVE TODAY</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  <span>DUE TODAY</span>
                </span>
              )}
            </div>
            <p className="text-xs text-gov-gray-600 font-medium mt-1">
              {statusMessage}
            </p>
          </div>
        </div>

        {!completedToday && (
          <button
            type="button"
            onClick={handleCompleteTodayActivity}
            className="px-3.5 py-2 rounded-gov text-xs font-bold bg-gov-saffron text-white hover:bg-orange-600 shadow-xs transition-all shrink-0 self-start sm:self-auto flex items-center gap-1.5"
            title="Records today's verified learning task completion"
          >
            <CheckCircle2 size={14} />
            <span>Complete Today's Task</span>
          </button>
        )}
      </div>

      {/* ── Weekly Streak Calendar ────────────────────────────────────────── */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gov-navy uppercase tracking-wider text-[10px] flex items-center gap-1">
            <Calendar size={13} className="text-gov-blue" />
            <span>Current Week Activity</span>
          </span>
          <span className="text-[11px] text-gov-gray-400">
            Consecutive daily activities maintain your streak
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekCalendar.map((day) => (
            <div
              key={day.dayName}
              className={`p-2.5 rounded-gov text-center flex flex-col items-center justify-between border transition-all ${
                day.isToday
                  ? 'border-2 border-gov-blue bg-gov-blue-light/30 shadow-xs'
                  : 'border-gov-gray-200 bg-gov-off-white/60'
              }`}
              title={`${day.dayName} (${day.dateNum}): ${day.isCompleted ? 'Learning Completed' : 'Incomplete'}`}
            >
              <span className={`text-[10px] font-bold block ${day.isToday ? 'text-gov-blue' : 'text-gov-gray-500'}`}>
                {day.dayName}
              </span>

              <div className="my-1.5">
                {day.isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-gov-green text-white flex items-center justify-center shadow-xs">
                    <CheckCircle2 size={14} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-gov-gray-300 bg-white flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-gov-gray-300" />
                  </div>
                )}
              </div>

              <span className="text-[10px] text-gov-gray-400 font-semibold">
                {day.dateNum}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Streak Statistics Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 text-center">
          <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
            Current Streak
          </span>
          <span className="text-lg font-black text-gov-navy mt-0.5 block">
            {currentStreak} Days
          </span>
        </div>

        <div className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 text-center">
          <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
            Longest Streak
          </span>
          <span className="text-lg font-black text-gov-saffron mt-0.5 block">
            {longestStreak} Days
          </span>
        </div>

        <div className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 text-center">
          <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
            This Month
          </span>
          <span className="text-lg font-black text-gov-blue mt-0.5 block">
            {thisMonthLearningDays} Days
          </span>
        </div>

        <div className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 text-center">
          <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
            Total Learning Days
          </span>
          <span className="text-lg font-black text-gov-green mt-0.5 block">
            {totalLearningDays} Days
          </span>
        </div>
      </div>

      {/* ── Next Milestone Progression ────────────────────────────────────── */}
      <div className="p-3.5 rounded-gov bg-gov-off-white border border-gov-gray-200 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-gov-navy flex items-center gap-1.5">
            <Award size={14} className="text-gov-saffron" />
            <span>Next Milestone: {nextMilestone.label}</span>
          </span>
          <span className="text-[11px] font-bold text-gov-blue">
            {daysToNextMilestone} {daysToNextMilestone === 1 ? 'day' : 'days'} remaining
          </span>
        </div>

        <div className="w-full h-2 bg-gov-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-gov-blue to-gov-saffron rounded-full transition-all duration-500"
            style={{ width: `${milestoneProgress}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[10px] text-gov-gray-500">
          <span>{currentStreak} of {nextMilestone.days} days completed</span>
          <span>{nextMilestone.desc}</span>
        </div>
      </div>

      {/* ── Streak + Competency Connection Impact ─────────────────────────── */}
      <div className="p-3.5 rounded-gov bg-gov-blue-light/50 border border-gov-blue/30 space-y-1.5 text-xs">
        <div className="flex items-center gap-2">
          <Target size={14} className="text-gov-blue shrink-0" />
          <strong className="text-gov-navy uppercase text-[11px] tracking-wide">
            Learning Streak Impact
          </strong>
        </div>
        <p className="text-gov-gray-600 leading-relaxed text-[11px]">
          Your consistent learning contributed to verified improvement in{' '}
          <strong className="text-gov-navy">{supportedCompetencies.join(', ')}</strong>. Maintaining your streak directly increases qualification readiness for promotional benchmark examinations.
        </p>
      </div>

      {/* ── Learning Activity History Modal ───────────────────────────────── */}
      <AnimatePresence>
        {showActivityModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg border border-gov-gray-200 shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[85vh]"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-gov-gray-200 flex items-center justify-between bg-gov-off-white">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gov-blue" />
                  <h4 className="text-sm font-bold text-gov-navy">Learning Activity History</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="p-1 rounded text-gov-gray-400 hover:text-gov-navy hover:bg-gov-gray-200"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Activity List */}
              <div className="p-4 overflow-y-auto space-y-3 divide-y divide-gov-gray-100">
                {activities.map((act) => (
                  <div key={act.id} className="pt-3 first:pt-0 space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-gov-navy">{act.title}</span>
                      <span className="text-[10px] font-black text-gov-green bg-green-50 px-1.5 py-0.2 rounded border border-green-200">
                        {act.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-gov-gray-500">
                      <span><strong>Date:</strong> {act.displayDate || act.dateStr}</span>
                      <span>•</span>
                      <span><strong>Course:</strong> {act.course}</span>
                      <span>•</span>
                      <span><strong>Competency:</strong> {act.competency}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-3 border-t border-gov-gray-200 bg-gov-off-white flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowActivityModal(false)}
                  className="px-4 py-1.5 rounded-gov text-xs font-bold bg-gov-blue text-white hover:bg-gov-navy transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
