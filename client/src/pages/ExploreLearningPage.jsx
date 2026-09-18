import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  Star,
  Clock,
  CheckCircle,
  ExternalLink,
  Tag,
  Sparkles,
  Layers,
  ChevronRight,
  X
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function ExploreLearningPage() {
  const { courses, toggleCourseEnrollment, selectedStream } = useStream();

  const [searchQuery, setSearchQuery] = useState('');
  const [providerFilter, setProviderFilter] = useState('all'); // all | igot | tpac
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // all | Beginner | Intermediate | Advanced
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = searchQuery.trim() === ''
      || course.title.toLowerCase().includes(searchQuery.toLowerCase())
      || course.competency.toLowerCase().includes(searchQuery.toLowerCase())
      || course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProvider = providerFilter === 'all'
      || (providerFilter === 'igot' && course.providerType === 'igot')
      || (providerFilter === 'tpac' && course.providerType === 'tpac');

    const matchesDifficulty = difficultyFilter === 'all'
      || course.difficulty.toLowerCase() === difficultyFilter.toLowerCase();

    return matchesSearch && matchesProvider && matchesDifficulty;
  });

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <BookOpen size={12} />
              <span>National Civil Services Learning Catalog</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Explore Learning Ecosystem
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Browse approved e-learning courses, micro-modules, and masterclasses from iGOT Karmayogi, TPAC, and affiliated administrative academies.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-gov text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Available Modules</span>
            <span className="text-2xl font-black text-white">{courses.length} Courses</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Government Certified</span>
          </div>
        </div>
      </div>

      {/* ── Search & Filter Controls ────────────────────────────────────────── */}
      <div className="gov-card p-4 bg-white border border-gov-gray-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
            <input
              type="text"
              placeholder="Search by topic, competency (e.g. Sampling, Python, Budget, GFR)..."
              className="gov-input pl-8 py-2 text-xs"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Provider Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gov-gray-500 font-bold text-[10px] uppercase">Provider:</span>
            <select
              value={providerFilter}
              onChange={e => setProviderFilter(e.target.value)}
              className="gov-input py-1.5 text-xs w-36"
            >
              <option value="all">All Providers</option>
              <option value="igot">iGOT Karmayogi</option>
              <option value="tpac">TPAC / Academies</option>
            </select>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-2">
            <span className="text-gov-gray-500 font-bold text-[10px] uppercase">Level:</span>
            <select
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(e.target.value)}
              className="gov-input py-1.5 text-xs w-36"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* ── Course Cards Grid ───────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map(course => (
          <motion.div
            key={course.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="gov-card p-5 flex flex-col justify-between hover:shadow-gov-card-hover transition-all border border-gov-gray-200"
          >
            <div className="space-y-3">
              {/* Header Badges */}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  course.providerType === 'igot'
                    ? 'bg-gov-saffron text-white'
                    : 'bg-gov-blue text-white'
                }`}>
                  {course.provider}
                </span>

                <span className="badge-gov-neutral text-[10px]">
                  {course.difficulty}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-gov-navy leading-snug">{course.title}</h3>
                <p className="text-[11px] text-gov-gray-400 mt-0.5">Competency: <strong className="text-gov-navy">{course.competency}</strong></p>
              </div>

              <p className="text-xs text-gov-gray-600 leading-relaxed line-clamp-3">
                {course.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {course.tags.slice(0, 3).map(t => (
                  <span key={t} className="badge-gov-neutral text-[9px]">{t}</span>
                ))}
              </div>

              {/* Rating & Duration */}
              <div className="pt-2 flex items-center justify-between text-xs text-gov-gray-500 border-t border-gov-gray-100">
                <span className="flex items-center gap-1 font-semibold text-gov-navy">
                  <Clock size={12} className="text-gov-gray-400" />
                  {course.duration} ({course.modulesCount || 5} modules)
                </span>

                <span className="flex items-center gap-1 text-gov-saffron font-bold">
                  <Star size={12} className="fill-gov-saffron text-gov-saffron" />
                  {course.rating} ({course.enrolledCount?.toLocaleString()} learners)
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-gov-gray-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedCourse(course)}
                className="btn-gov-ghost text-xs p-0 text-gov-blue font-semibold hover:underline"
              >
                View Syllabus
              </button>

              <button
                onClick={() => toggleCourseEnrollment(course.id)}
                className={`btn-gov-${course.isEnrolled ? 'secondary' : 'primary'} text-xs py-1.5 px-3`}
              >
                {course.isEnrolled ? 'Enrolled (In Progress)' : 'Enroll on iGOT'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Syllabus Preview Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg shadow-2xl border border-gov-gray-200 max-w-lg w-full overflow-hidden"
            >
              <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
                <div>
                  <span className="badge-gov-info text-[9px] font-bold uppercase">{selectedCourse.provider}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">{selectedCourse.title}</h3>
                </div>
                <button onClick={() => setSelectedCourse(null)} className="p-1 text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <p className="text-gov-gray-700 leading-relaxed">{selectedCourse.description}</p>

                <div className="space-y-2">
                  <h4 className="font-bold text-gov-navy uppercase tracking-wider text-[10px]">
                    Detailed Curriculum Modules:
                  </h4>
                  <div className="space-y-1.5">
                    {selectedCourse.syllabus ? (
                      selectedCourse.syllabus.map((mod, i) => (
                        <div key={i} className="p-2.5 bg-gov-off-white border border-gov-gray-200 rounded-gov flex items-center gap-2">
                          <CheckCircle size={13} className="text-gov-blue shrink-0" />
                          <span className="font-medium text-gov-navy">{mod}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-gov-gray-400 italic">Full syllabus available on official iGOT Karmayogi node.</p>
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-gov-gray-200 flex items-center justify-between">
                  <span className="text-gov-gray-500 font-semibold">{selectedCourse.duration} Self-Paced</span>
                  <button
                    onClick={() => {
                      toggleCourseEnrollment(selectedCourse.id);
                      setSelectedCourse(null);
                    }}
                    className="btn-gov-primary text-xs"
                  >
                    {selectedCourse.isEnrolled ? 'Resume Course on iGOT' : 'Enroll Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
