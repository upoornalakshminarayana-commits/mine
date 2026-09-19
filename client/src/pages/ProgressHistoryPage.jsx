import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  FlaskConical,
  BookOpen,
  ClipboardCheck,
  Award,
  Sparkles
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function ProgressHistoryPage() {
  const { progressTimeline, employee, selectedStream } = useStream();
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredTimeline = filterCategory === 'all'
    ? progressTimeline
    : progressTimeline.filter(e => e.category.toLowerCase() === filterCategory.toLowerCase());

  return (
    <div className="space-y-6 w-full">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Clock size={12} />
              <span>Audit Trail & Capacity Milestones</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Progress & Milestone History
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Chronological log of diagnostic assessments, virtual lab submissions, completed iGOT modules, and verified competency upgrades.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-gov-md backdrop-blur-xs text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Verified Milestones</span>
            <span className="text-3xl font-black text-gov-saffron">{progressTimeline.length}</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Official Audit Trail</span>
          </div>
        </div>
      </div>

      {/* ── Filters & Export Strip ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'assessment', label: 'Assessments' },
            { id: 'virtual lab', label: 'Virtual Labs' },
            { id: 'learning', label: 'iGOT Courses' },
            { id: 're-assessment', label: 'Re-Assessments' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setFilterCategory(f.id)}
              className={`px-3 py-1.5 rounded-gov font-semibold whitespace-nowrap transition-all ${
                filterCategory === f.id
                  ? 'bg-gov-blue text-white shadow-xs'
                  : 'bg-white border border-gov-gray-200 text-gov-gray-600 hover:bg-gov-gray-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => alert('Official Competency Progression Report downloaded in PDF format.')}
          className="btn-gov-secondary text-xs py-1.5 px-3 flex items-center justify-center gap-1.5 shrink-0"
        >
          <Download size={13} />
          <span>Export Progress Audit Report</span>
        </button>
      </div>

      {/* ── Timeline Display ────────────────────────────────────────────────── */}
      <div className="gov-card p-6 border border-gov-gray-200 bg-white">
        <div className="relative border-l-2 border-gov-blue/30 ml-4 sm:ml-6 space-y-8 pl-6 sm:pl-8 py-2">
          {filteredTimeline.map((item, idx) => {
            const isLab = item.category.toLowerCase().includes('lab');
            const isLearning = item.category.toLowerCase().includes('learning');
            const isAssess = item.category.toLowerCase().includes('assessment');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.06 }}
                className="relative group"
              >
                {/* Timeline node circle */}
                <div
                  className={`absolute -left-[35px] sm:-left-[43px] top-0 w-8 h-8 rounded-full border-2 border-white flex items-center justify-center shadow-xs text-white ${
                    isLab
                      ? 'bg-gov-green'
                      : isLearning
                      ? 'bg-gov-saffron'
                      : isAssess
                      ? 'bg-gov-blue'
                      : 'bg-gov-navy'
                  }`}
                >
                  {isLab ? <FlaskConical size={14} /> : isLearning ? <BookOpen size={14} /> : <ClipboardCheck size={14} />}
                </div>

                {/* Event Card */}
                <div className="p-4 bg-gov-off-white hover:bg-gov-blue-light/30 border border-gov-gray-200 rounded-gov transition-all space-y-2">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-gov-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> {item.date}
                      </span>
                      <span className="badge-gov-neutral text-[9px] uppercase font-bold">{item.category}</span>
                    </div>

                    <span className="badge-gov-info text-[10px] font-bold">
                      {item.score}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-gov-navy">{item.title}</h3>
                  <p className="text-xs text-gov-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
