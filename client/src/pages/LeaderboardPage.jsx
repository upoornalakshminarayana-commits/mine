import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  TrendingUp,
  Award,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BookOpen,
  Target,
  Sparkles,
  Clock,
  CheckCircle2,
  Filter,
  BarChart3,
  Calendar,
  Layers,
  ArrowUpRight,
  Flame,
  ShieldCheck,
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { getLeaderboardData } from '../services/leaderboardService';

export default function LeaderboardPage() {
  const { employee, gapAnalysis, selectedStream, departmentConfig } = useStream();

  // Filter States
  const [scope, setScope] = useState('dept'); // 'dept' | 'org' | 'role'
  const [timePeriod, setTimePeriod] = useState('all'); // 'all' | 'year' | 'month'
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  // Memoized Leaderboard Data
  const leaderboard = useMemo(() => {
    return getLeaderboardData({
      currentEmployee: employee,
      gapAnalysis,
      scope,
      timePeriod,
      searchQuery,
    });
  }, [employee, gapAnalysis, scope, timePeriod, searchQuery]);

  // Reset pagination when filters change
  const handleScopeChange = (newScope) => {
    setScope(newScope);
    setCurrentPage(1);
  };

  const handleTimePeriodChange = (newPeriod) => {
    setTimePeriod(newPeriod);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Pagination Math
  const totalEmployees = leaderboard.filteredEmployees.length;
  const totalPages = Math.max(1, Math.ceil(totalEmployees / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalEmployees);
  const pagedEmployees = leaderboard.filteredEmployees.slice(startIndex, endIndex);

  // Jump to page input
  const [jumpPageInput, setJumpPageInput] = useState('');
  const handleJumpPage = (e) => {
    e.preventDefault();
    const pageNum = parseInt(jumpPageInput, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      setCurrentPage(pageNum);
      setJumpPageInput('');
    }
  };

  const {
    podium,
    currentUser,
    userRank,
    pointsToNextRank,
    nextRankNumber,
    nextRankPoints,
    progressToNextPercent,
    topPerformer,
    cohortTitle,
    departmentName,
  } = leaderboard;

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-12">
      {/* ── 1. Page Header ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 sm:p-6 shadow-gov-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gov-saffron-light text-gov-saffron border border-orange-200">
                <Trophy size={13} className="text-gov-saffron" />
                <span>Competency Intelligence</span>
              </span>
              <span className="text-xs text-gov-gray-400 font-medium">
                {departmentConfig?.name || departmentName}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-gov-navy tracking-tight">
              {cohortTitle || 'Competency Learning Leaderboard'}
            </h1>
            <p className="text-xs sm:text-sm text-gov-gray-600 max-w-3xl leading-relaxed">
              Track learning progress and competency growth across your professional community. Rankings celebrate verified skill development, course completions, and assessment gains.
            </p>
          </div>

          {/* Context Filter Tabs */}
          <div className="flex items-center bg-gov-off-white p-1 rounded-gov-md border border-gov-gray-200 shrink-0 self-start lg:self-auto">
            {[
              { id: 'dept', label: 'My Department' },
              { id: 'role', label: 'My Role' },
              { id: 'org', label: 'Overall Organization' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleScopeChange(tab.id)}
                className={`px-3 py-1.5 rounded-gov text-xs font-bold transition-all ${
                  scope === tab.id
                    ? 'bg-white text-gov-navy shadow-xs border border-gov-gray-200'
                    : 'text-gov-gray-600 hover:text-gov-navy hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Top Summary Row: Your Rank & Progress to Next Rank ───────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Your Current Rank */}
        <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-4 shadow-gov-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Your Current Rank
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-gov-navy">#{userRank}</span>
              <span className="text-xs font-bold text-gov-gray-500">of {leaderboard.totalEmployees} officers</span>
            </div>
            <p className="text-[11px] text-gov-green font-semibold mt-0.5 flex items-center gap-1">
              <TrendingUp size={12} />
              <span>+{currentUser.monthlyPointsGain || 126} pts this month</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-gov-blue-light flex items-center justify-center text-gov-blue shrink-0">
            <Award size={24} />
          </div>
        </div>

        {/* Competency Points */}
        <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-4 shadow-gov-card flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Competency Points
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-black text-gov-saffron">
                {currentUser.competencyPoints?.toLocaleString()}
              </span>
              <span className="text-xs font-semibold text-gov-gray-500">pts</span>
            </div>
            <p className="text-[11px] text-gov-gray-500 mt-0.5">
              40% Assessments · 25% Courses
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-gov-saffron shrink-0">
            <Trophy size={24} />
          </div>
        </div>

        {/* Progress to Next Rank */}
        <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-4 shadow-gov-card md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-gov-gray-500 uppercase tracking-wider block">
                Next Rank Progression
              </span>
              <p className="text-xs text-gov-gray-700 font-semibold mt-0.5">
                Target: <span className="font-bold text-gov-navy">Rank #{nextRankNumber}</span> ({nextRankPoints.toLocaleString()} pts)
              </p>
            </div>
            <span className="text-xs font-bold text-gov-blue bg-gov-blue-light px-2.5 py-1 rounded-full">
              {pointsToNextRank} pts needed
            </span>
          </div>

          <div className="mt-3 space-y-1.5">
            <div className="flex justify-between text-[11px] text-gov-gray-500 font-medium">
              <span>Your Points: {currentUser.competencyPoints?.toLocaleString()}</span>
              <span>Next Rank: {nextRankPoints.toLocaleString()}</span>
            </div>
            <div className="w-full h-2.5 bg-gov-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gov-blue to-gov-saffron rounded-full transition-all duration-500"
                style={{ width: `${progressToNextPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Top 3 Podium Section ─────────────────────────────────────────── */}
      <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-6 shadow-gov-card">
        <div className="text-center max-w-md mx-auto mb-6">
          <h2 className="text-base font-bold text-gov-navy">Top Performing Officers</h2>
          <p className="text-xs text-gov-gray-500 mt-0.5">
            Distinguished civil servants leading learning engagement in {departmentName}
          </p>
        </div>

        {/* Podium Layout: Rank 2 (Left) | Rank 1 (Center, Taller) | Rank 3 (Right) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 items-end max-w-4xl mx-auto pt-4">
          
          {/* ── Rank 2 (Silver) ────────────────────────────────────────────── */}
          {podium.rank2 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              className="order-2 sm:order-1 flex flex-col items-center"
            >
              <div className="relative mb-2 flex flex-col items-center">
                <span className="text-2xl select-none" aria-label="Silver Medal">🥈</span>
                <div className="w-16 h-16 rounded-full bg-slate-100 border-2 border-slate-300 shadow-sm flex items-center justify-center font-bold text-slate-700 text-sm mt-1">
                  {podium.rank2.initials}
                </div>
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-200 text-slate-700 border border-slate-300">
                  #2
                </span>
              </div>

              <div className="w-full text-center mt-3 bg-slate-50 border border-slate-200 rounded-gov-lg p-4 flex flex-col items-center justify-between min-h-[160px]">
                <div>
                  <h3 className="text-xs font-bold text-gov-navy truncate max-w-[180px] mx-auto">
                    {podium.rank2.name}
                  </h3>
                  <p className="text-[10px] text-gov-gray-500 truncate max-w-[180px] mx-auto mt-0.5">
                    {podium.rank2.role}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 w-full">
                  <span className="text-base font-black text-gov-navy block">
                    {podium.rank2.competencyPoints?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider block">
                    Competency Points
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gov-gray-600 font-medium">
                    <span>{podium.rank2.coursesCompleted} courses</span>
                    <span>•</span>
                    <span>{podium.rank2.assessmentScore}% score</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Rank 1 (Gold - Centered & Visually Emphasized) ──────────────── */}
          {podium.rank1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="order-1 sm:order-2 flex flex-col items-center -mt-2 sm:-mt-6"
            >
              <div className="relative mb-2 flex flex-col items-center">
                <span className="text-3xl select-none" aria-label="Gold Medal">🥇</span>
                <div className="w-20 h-20 rounded-full bg-amber-50 border-3 border-amber-400 shadow-md flex items-center justify-center font-black text-amber-900 text-base mt-1 ring-4 ring-amber-100">
                  {podium.rank1.initials}
                </div>
                <span className="absolute -bottom-2 px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-400 text-gov-navy border border-amber-500 shadow-xs">
                  #1
                </span>
              </div>

              <div className="w-full text-center mt-3 bg-amber-50/60 border-2 border-amber-300 rounded-gov-lg p-5 flex flex-col items-center justify-between min-h-[190px] shadow-xs">
                <div>
                  <div className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-200 text-amber-900 uppercase tracking-wider mb-1">
                    Top Performer
                  </div>
                  <h3 className="text-sm font-black text-gov-navy truncate max-w-[200px] mx-auto">
                    {podium.rank1.name}
                  </h3>
                  <p className="text-[11px] text-gov-gray-600 truncate max-w-[200px] mx-auto mt-0.5 font-medium">
                    {podium.rank1.role}
                  </p>
                </div>
                <div className="mt-3 pt-2.5 border-t border-amber-200 w-full">
                  <span className="text-xl font-black text-gov-saffron block">
                    {podium.rank1.competencyPoints?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gov-gray-500 font-bold uppercase tracking-wider block">
                    Competency Points
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-2 text-[11px] text-gov-navy font-semibold">
                    <span>{podium.rank1.coursesCompleted} courses</span>
                    <span>•</span>
                    <span>{podium.rank1.assessmentScore}% score</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── Rank 3 (Bronze) ────────────────────────────────────────────── */}
          {podium.rank3 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.2 }}
              className="order-3 sm:order-3 flex flex-col items-center"
            >
              <div className="relative mb-2 flex flex-col items-center">
                <span className="text-2xl select-none" aria-label="Bronze Medal">🥉</span>
                <div className="w-16 h-16 rounded-full bg-amber-100/70 border-2 border-amber-700/40 shadow-sm flex items-center justify-center font-bold text-amber-900 text-sm mt-1">
                  {podium.rank3.initials}
                </div>
                <span className="absolute -bottom-2 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-100 text-amber-900 border border-amber-700/40">
                  #3
                </span>
              </div>

              <div className="w-full text-center mt-3 bg-amber-50/30 border border-amber-700/20 rounded-gov-lg p-4 flex flex-col items-center justify-between min-h-[160px]">
                <div>
                  <h3 className="text-xs font-bold text-gov-navy truncate max-w-[180px] mx-auto">
                    {podium.rank3.name}
                  </h3>
                  <p className="text-[10px] text-gov-gray-500 truncate max-w-[180px] mx-auto mt-0.5">
                    {podium.rank3.role}
                  </p>
                </div>
                <div className="mt-3 pt-2 border-t border-amber-700/15 w-full">
                  <span className="text-base font-black text-gov-navy block">
                    {podium.rank3.competencyPoints?.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider block">
                    Competency Points
                  </span>
                  <div className="flex items-center justify-center gap-2 mt-2 text-[10px] text-gov-gray-600 font-medium">
                    <span>{podium.rank3.coursesCompleted} courses</span>
                    <span>•</span>
                    <span>{podium.rank3.assessmentScore}% score</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </div>

        {/* ── Top Performer Insight Bar ──────────────────────────────────────── */}
        {topPerformer && (
          <div className="mt-6 pt-5 border-t border-gov-gray-200 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-gov-off-white/80 p-3.5 rounded-gov-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gov-green shrink-0" />
              <span className="text-gov-gray-600">
                <strong className="text-gov-navy">{topPerformer.name}</strong> ({topPerformer.role}) leads with{' '}
                <strong>{topPerformer.competencyPoints?.toLocaleString()} Competency Points</strong>.
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] text-gov-gray-500 shrink-0">
              <span><strong>Strongest:</strong> {topPerformer.topCompetency}</span>
              <span>•</span>
              <span className="hidden md:inline"><strong>Recent:</strong> {topPerformer.recentAchievement}</span>
            </div>
          </div>
        )}
      </div>

      {/* ── 4. Learning Impact Metrics Section ───────────────────────────────── */}
      <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 shadow-gov-card">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-gov-blue" />
            <h2 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
              Cohort Learning Impact · {departmentName}
            </h2>
          </div>
          <span className="text-[11px] text-gov-gray-500">Continuous Capacity Building</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-gov-off-white p-3 rounded-gov border border-gov-gray-200">
            <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Courses Completed
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-gov-navy">
                {currentUser.coursesCompleted + 12}
              </span>
              <span className="text-[10px] text-gov-gray-500">courses</span>
            </div>
          </div>

          <div className="bg-gov-off-white p-3 rounded-gov border border-gov-gray-200">
            <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Competencies Improved
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-gov-green">
                {currentUser.competenciesImproved}
              </span>
              <span className="text-[10px] text-gov-gray-500">areas</span>
            </div>
          </div>

          <div className="bg-gov-off-white p-3 rounded-gov border border-gov-gray-200">
            <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Average Assessment
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-gov-blue">
                {currentUser.assessmentScore}%
              </span>
              <span className="text-[10px] text-gov-gray-500">mean</span>
            </div>
          </div>

          <div className="bg-gov-off-white p-3 rounded-gov border border-gov-gray-200">
            <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
              Learning Hours Logged
            </span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-lg font-black text-gov-saffron">
                {currentUser.learningHours}h
              </span>
              <span className="text-[10px] text-gov-gray-500">verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Main Ranking Table & Controls ─────────────────────────────────── */}
      <div className="bg-white rounded-gov-lg border border-gov-gray-200 shadow-gov-card overflow-hidden">
        {/* Table Filters & Search Bar */}
        <div className="p-4 sm:p-5 border-b border-gov-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gov-off-white/40">
          
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by officer name, role, or department..."
              className="w-full pl-9 pr-3 py-1.5 rounded-gov border border-gov-gray-200 text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gov-blue text-gov-navy placeholder-gov-gray-400"
            />
          </div>

          {/* Time Period Filter */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="text-xs font-bold text-gov-gray-500 flex items-center gap-1">
              <Calendar size={13} />
              <span>Time:</span>
            </span>
            <div className="inline-flex bg-white rounded-gov border border-gov-gray-200 p-0.5 text-xs">
              {[
                { id: 'all', label: 'All Time' },
                { id: 'year', label: 'This Year' },
                { id: 'month', label: 'This Month' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleTimePeriodChange(t.id)}
                  className={`px-2.5 py-1 rounded-gov font-semibold transition-all ${
                    timePeriod === t.id
                      ? 'bg-gov-blue text-white shadow-xs'
                      : 'text-gov-gray-600 hover:text-gov-navy'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Semantic Ranking Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gov-off-white text-gov-navy font-bold border-b border-gov-gray-200">
              <tr>
                <th scope="col" className="py-3 px-4 w-16 text-center">Rank</th>
                <th scope="col" className="py-3 px-4">Employee</th>
                <th scope="col" className="py-3 px-4 hidden md:table-cell">Department</th>
                <th scope="col" className="py-3 px-4 text-right">Competency Points</th>
                <th scope="col" className="py-3 px-4 text-center hidden sm:table-cell">Courses Completed</th>
                <th scope="col" className="py-3 px-4 text-center hidden lg:table-cell">Assessment Score</th>
                <th scope="col" className="py-3 px-4 text-center hidden sm:table-cell">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-gray-100">
              {pagedEmployees.length > 0 ? (
                pagedEmployees.map((emp) => {
                  const isCurrent = emp.isCurrentUser;
                  const isTop3 = emp.rank <= 3;

                  return (
                    <tr
                      key={emp.id}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-amber-50/70 hover:bg-amber-100/60 font-medium'
                          : 'hover:bg-gov-gray-50'
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center">
                          {emp.rank === 1 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-400 text-gov-navy font-black text-xs flex items-center justify-center shadow-xs">
                              🥇
                            </span>
                          ) : emp.rank === 2 ? (
                            <span className="w-7 h-7 rounded-full bg-slate-300 text-gov-navy font-black text-xs flex items-center justify-center shadow-xs">
                              🥈
                            </span>
                          ) : emp.rank === 3 ? (
                            <span className="w-7 h-7 rounded-full bg-amber-700/80 text-white font-black text-xs flex items-center justify-center shadow-xs">
                              🥉
                            </span>
                          ) : (
                            <span className={`font-bold ${isCurrent ? 'text-gov-saffron font-black text-sm' : 'text-gov-gray-500'}`}>
                              #{emp.rank}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Employee Avatar & Name */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCurrent
                                ? 'bg-gov-navy text-white ring-2 ring-gov-saffron'
                                : isTop3
                                ? 'bg-gov-blue text-white'
                                : 'bg-gov-gray-200 text-gov-gray-700'
                            }`}
                          >
                            {emp.initials}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gov-navy truncate">
                                {emp.name}
                              </span>
                              {isCurrent && (
                                <span className="inline-block px-1.5 py-0.2 text-[9px] font-black uppercase tracking-wider rounded bg-gov-saffron text-white shadow-xs">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-gov-gray-500 truncate block">
                              {emp.role}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Department */}
                      <td className="py-3 px-4 hidden md:table-cell text-gov-gray-600 truncate max-w-[200px]">
                        {emp.department}
                      </td>

                      {/* Competency Points */}
                      <td className="py-3 px-4 text-right">
                        <span className={`font-black text-sm ${isCurrent ? 'text-gov-saffron' : 'text-gov-navy'}`}>
                          {emp.competencyPoints?.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gov-gray-400 block sm:hidden">
                          {emp.coursesCompleted} courses
                        </span>
                      </td>

                      {/* Courses Completed */}
                      <td className="py-3 px-4 text-center hidden sm:table-cell font-semibold text-gov-gray-700">
                        {emp.coursesCompleted}
                      </td>

                      {/* Assessment Score */}
                      <td className="py-3 px-4 text-center hidden lg:table-cell">
                        <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-gov-blue-light text-gov-blue">
                          {emp.assessmentScore}%
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center hidden sm:table-cell">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gov-green bg-green-50 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-gov-green" />
                          <span>Active</span>
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gov-gray-500">
                    No employees matched your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ── 6. Functional Pagination Controls ────────────────────────────────── */}
        <div className="p-4 border-t border-gov-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-gov-off-white/40">
          <div className="text-gov-gray-500 text-[11px]">
            Showing <strong className="text-gov-navy">{totalEmployees > 0 ? startIndex + 1 : 0}–{endIndex}</strong> of{' '}
            <strong className="text-gov-navy">{totalEmployees}</strong> employees
          </div>

          <div className="flex items-center gap-1.5">
            {/* First Page */}
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage(1)}
              aria-label="First Page"
              className="p-1.5 rounded-gov border border-gov-gray-200 text-gov-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsLeft size={14} />
            </button>

            {/* Previous Page */}
            <button
              type="button"
              disabled={validCurrentPage <= 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              aria-label="Previous Page"
              className="p-1.5 rounded-gov border border-gov-gray-200 text-gov-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>

            {/* Numeric Page Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - validCurrentPage) <= 1)
              .map((p, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && p - prev > 1;

                return (
                  <span key={p} className="flex items-center">
                    {showEllipsis && <span className="px-1 text-gov-gray-400">…</span>}
                    <button
                      type="button"
                      onClick={() => setCurrentPage(p)}
                      className={`min-w-[28px] h-7 px-2 rounded-gov text-xs font-bold transition-all ${
                        validCurrentPage === p
                          ? 'bg-gov-blue text-white shadow-xs'
                          : 'bg-white border border-gov-gray-200 text-gov-gray-700 hover:bg-gov-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  </span>
                );
              })}

            {/* Next Page */}
            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              aria-label="Next Page"
              className="p-1.5 rounded-gov border border-gov-gray-200 text-gov-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>

            {/* Last Page */}
            <button
              type="button"
              disabled={validCurrentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              aria-label="Last Page"
              className="p-1.5 rounded-gov border border-gov-gray-200 text-gov-gray-600 hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronsRight size={14} />
            </button>

            {/* Jump to Page Form */}
            <form onSubmit={handleJumpPage} className="flex items-center gap-1 ml-2 pl-2 border-l border-gov-gray-300">
              <span className="text-[11px] text-gov-gray-500">Jump to</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={jumpPageInput}
                onChange={(e) => setJumpPageInput(e.target.value)}
                placeholder={String(validCurrentPage)}
                className="w-10 h-7 text-center border border-gov-gray-200 rounded-gov text-xs bg-white focus:outline-none focus:ring-1 focus:ring-gov-blue"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
