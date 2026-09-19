import { useState } from 'react';
import { motion } from 'framer-motion';
import LearningRecommendation from '../components/LearningRecommendation';
import IGOTStatus from '../components/IGOTStatus';
import { recommendations, igotData } from '../data/mockData';
import { Filter, Search, BookOpen, ExternalLink, ChevronRight } from 'lucide-react';

const FILTERS = ['All', 'High Priority', 'iGOT', 'TPAC', 'Enrolled'];

export default function LearningPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = recommendations.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === 'iGOT') return r.providerType === 'igot';
    if (filter === 'TPAC') return r.providerType === 'tpac';
    if (filter === 'Enrolled') return r.enrolled;
    if (filter === 'High Priority') return r.priority === 'high';
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-gov-navy">Learning</h1>
        <p className="text-sm text-gov-gray-400 mt-1">Curated courses from iGOT Karmayogi and TPAC to address your skill gaps.</p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Search & Filter */}
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="gov-card p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search courses..."
                  className="gov-input pl-8"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter size={14} className="text-gov-gray-400 shrink-0" />
                <div className="flex gap-1.5 flex-wrap">
                  {FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                      className={`px-2.5 py-1 rounded text-xs font-medium transition-colors border
                        ${filter === f ? 'bg-gov-blue text-white border-gov-blue' : 'bg-white text-gov-gray-600 border-gov-gray-200 hover:border-gov-blue'}`}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recommendations */}
          <section>
            <div className="border-l-4 border-l-gov-saffron pl-3 mb-4">
              <h2 className="text-base font-semibold text-gov-navy">Recommended for Your Skill Gaps</h2>
              <p className="text-xs text-gov-gray-400">{filtered.length} course{filtered.length !== 1 ? 's' : ''} found</p>
            </div>
            {filtered.length === 0 ? (
              <div className="gov-card p-10 text-center">
                <BookOpen size={32} className="text-gov-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gov-gray-400">No courses match your filter.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((course, i) => (
                  <LearningRecommendation key={course.id} course={course} index={i} />
                ))}
              </div>
            )}
          </section>

          {/* iGOT Catalogue link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="gov-card p-5 flex items-center justify-between gap-4 bg-gov-off-white border border-gov-gray-200">
            <div>
              <p className="text-sm font-semibold text-gov-navy">Explore the full iGOT Karmayogi Catalogue</p>
              <p className="text-xs text-gov-gray-400 mt-0.5">Access thousands of government learning resources on the official iGOT platform.</p>
            </div>
            <a href="https://www.igot.gov.in" target="_blank" rel="noreferrer"
              className="btn-gov-primary text-xs py-2 px-4 shrink-0">
              <ExternalLink size={12} /> iGOT Platform
            </a>
          </motion.div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          <IGOTStatus />

          {/* Learning roadmap */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="gov-card p-5">
            <h3 className="text-sm font-semibold text-gov-navy mb-4">Your Learning Roadmap</h3>
            <div className="space-y-3">
              {[
                { step: 1, label: 'Complete Python course', status: 'pending', priority: 'HIGH' },
                { step: 2, label: 'Data Visualization course', status: 'pending', priority: 'MEDIUM' },
                { step: 3, label: 'Survey Methodology (enrolled)', status: 'active', priority: 'LOW' },
                { step: 4, label: 'Re-take Competency Assessment', status: 'locked', priority: null },
              ].map(({ step, label, status, priority }) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${status === 'active' ? 'bg-gov-blue text-white' : status === 'locked' ? 'bg-gov-gray-200 text-gov-gray-400' : 'bg-gov-off-white border border-gov-gray-300 text-gov-gray-500'}`}>
                    {step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs ${status === 'locked' ? 'text-gov-gray-400' : 'text-gov-gray-700'} leading-snug`}>{label}</p>
                  </div>
                  {priority && (
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border shrink-0
                      ${priority === 'HIGH' ? 'badge-gov-danger' : priority === 'MEDIUM' ? 'badge-gov-warning' : 'badge-gov-neutral'}`}>
                      {priority}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
