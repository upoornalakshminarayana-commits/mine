import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  TrendingUp,
  Award,
  Flame,
  FlaskConical,
  ClipboardCheck,
  Filter,
  ShieldCheck,
  Target,
  Sparkles,
  Users
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { LEADERBOARD_USERS } from '../data/portalData';

export default function LeaderboardPage() {
  const { employee, selectedStream } = useStream();
  const [filterType, setFilterType] = useState('stream'); // stream | dept | org

  const filteredUsers = filterType === 'dept'
    ? LEADERBOARD_USERS.filter(u => u.department.includes('DIID') || u.department.includes('NSO'))
    : filterType === 'org'
    ? LEADERBOARD_USERS
    : LEADERBOARD_USERS;

  const currentUserData = LEADERBOARD_USERS.find(u => u.isCurrentUser) || LEADERBOARD_USERS[2];

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Trophy size={12} />
              <span>Civil Services Learning & Growth Index</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Learning & Competency Growth Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Recognizing continuous capacity building, consistent learning streaks, virtual lab practical achievements, and competency growth across departments.
            </p>
          </div>

          {/* User's Standout Badge */}
          <div className="bg-white/10 border border-white/20 p-4 rounded-gov-md backdrop-blur-xs text-center shrink-0 min-w-[200px]">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Your Position</span>
            <span className="text-3xl font-black text-gov-saffron">#{currentUserData.rank}</span>
            <div className="flex items-center justify-center gap-1 text-xs text-green-300 font-bold mt-1">
              <TrendingUp size={13} />
              <span>{currentUserData.growth} Improvement</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── User Progress Summary Highlight Card ────────────────────────────── */}
      <div className="gov-card p-5 bg-gradient-to-r from-gov-blue-light/40 via-white to-gov-saffron-light/40 border-2 border-gov-blue/30 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gov-navy text-white text-sm font-black flex items-center justify-center border-2 border-gov-saffron shadow-sm">
              {currentUserData.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-gov-navy">{currentUserData.name}</h2>
                <span className="badge-gov-success text-[10px] font-bold">You (Rank #{currentUserData.rank})</span>
              </div>
              <p className="text-xs text-gov-gray-500">{currentUserData.role} · {currentUserData.department}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="bg-white px-3 py-1.5 rounded-gov border border-gov-gray-200 shadow-xs">
              <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Competency Growth</span>
              <strong className="text-sm font-bold text-gov-green">{currentUserData.growth}</strong>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-gov border border-gov-gray-200 shadow-xs">
              <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Active Streak</span>
              <strong className="text-sm font-bold text-gov-saffron flex items-center gap-1">
                <Flame size={14} className="fill-gov-saffron" /> {currentUserData.streak} Days
              </strong>
            </div>
            <div className="bg-white px-3 py-1.5 rounded-gov border border-gov-gray-200 shadow-xs">
              <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Virtual Labs</span>
              <strong className="text-sm font-bold text-gov-blue">{currentUserData.labsCompleted} Completed</strong>
            </div>
          </div>
        </div>
      </div>

      {/* ── Filters Bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between flex-wrap gap-3 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-gov-gray-500 font-bold uppercase tracking-wider text-[10px] mr-1">
            Filter View:
          </span>
          {[
            { id: 'stream', label: `My Stream (${selectedStream?.name || 'Statistics'})` },
            { id: 'dept', label: 'My Department (DIID / NSO)' },
            { id: 'org', label: 'My Organization (MoSPI)' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-gov font-semibold transition-all ${
                filterType === f.id
                  ? 'bg-gov-blue text-white shadow-xs'
                  : 'bg-white border border-gov-gray-200 text-gov-gray-600 hover:bg-gov-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <span className="text-[11px] text-gov-gray-400">
          Rankings update weekly based on verified learning hours & practical labs.
        </span>
      </div>

      {/* ── Leaderboard Table ───────────────────────────────────────────────── */}
      <div className="gov-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-gov-off-white text-gov-navy font-bold border-b border-gov-gray-200">
              <tr>
                <th className="p-3.5 w-16 text-center">Rank</th>
                <th className="p-3.5">Officer & Designation</th>
                <th className="p-3.5">Department / Cadre</th>
                <th className="p-3.5 text-center">Learning Growth</th>
                <th className="p-3.5 text-center">Learning Hours</th>
                <th className="p-3.5 text-center">Virtual Labs</th>
                <th className="p-3.5 text-center">Consistency Streak</th>
                <th className="p-3.5">Recognition Badge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gov-gray-100">
              {filteredUsers.map((u) => {
                const isTop3 = u.rank <= 3;
                const isCurrent = u.isCurrentUser;

                return (
                  <tr
                    key={u.rank}
                    className={`transition-colors ${
                      isCurrent
                        ? 'bg-gov-blue-light/50 font-semibold'
                        : 'hover:bg-gov-gray-100/60'
                    }`}
                  >
                    {/* Rank */}
                    <td className="p-3.5 text-center">
                      <div className="flex items-center justify-center">
                        {u.rank === 1 ? (
                          <span className="w-7 h-7 rounded-full bg-amber-400 text-gov-navy font-black text-xs flex items-center justify-center shadow-xs">
                            🥇
                          </span>
                        ) : u.rank === 2 ? (
                          <span className="w-7 h-7 rounded-full bg-slate-300 text-gov-navy font-black text-xs flex items-center justify-center shadow-xs">
                            🥈
                          </span>
                        ) : u.rank === 3 ? (
                          <span className="w-7 h-7 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow-xs">
                            🥉
                          </span>
                        ) : (
                          <span className="text-gov-gray-500 font-bold">#{u.rank}</span>
                        )}
                      </div>
                    </td>

                    {/* Officer */}
                    <td className="p-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCurrent ? 'bg-gov-blue text-white' : 'bg-gov-gray-200 text-gov-gray-700'
                        }`}>
                          {u.initials}
                        </div>
                        <div>
                          <p className="font-bold text-gov-navy leading-tight">{u.name}</p>
                          <p className="text-[10px] text-gov-gray-500">{u.role}</p>
                        </div>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="p-3.5 text-gov-gray-600">{u.department}</td>

                    {/* Growth */}
                    <td className="p-3.5 text-center">
                      <span className="badge-gov-success text-xs font-bold">{u.growth}</span>
                    </td>

                    {/* Hours */}
                    <td className="p-3.5 text-center font-bold text-gov-navy">{u.learningHours} hrs</td>

                    {/* Virtual Labs */}
                    <td className="p-3.5 text-center">
                      <span className="text-gov-blue font-bold">{u.labsCompleted} Labs</span>
                    </td>

                    {/* Streak */}
                    <td className="p-3.5 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-gov-saffron">
                        <Flame size={12} className="fill-gov-saffron" /> {u.streak}d
                      </span>
                    </td>

                    {/* Badge */}
                    <td className="p-3.5">
                      <span className="badge-gov-neutral text-[10px] font-bold">
                        {u.badge}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
