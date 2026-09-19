import { motion } from 'framer-motion';
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Award,
  BookOpen,
  ArrowRight,
  TrendingUp,
  Target,
  Sparkles,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  BarChart3,
  Clock,
  Star,
  Layers,
  AlertCircle,
  MapPin,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { ROLE_BLUEPRINTS } from '../data/roleBlueprints';
import PreDashboardLayout from '../components/layout/PreDashboardLayout';

export default function GapAnalysisPage({ onEnterDashboard, onRetake }) {
  const { gapAnalysis, selectedStream, currentRole, employee } = useStream();

  const empId = employee?.id || 'demo-employee-01';
  const roleBlueprint = ROLE_BLUEPRINTS[empId] || null;

  const {
    overallScore = 65,
    benchmark = 75,
    correctCount = 0,
    totalQuestions = 10,
    competencyBreakdown = [],
    criticalGaps = [],
    developingGaps = [],
    strongAreas = [],
    recommendedCourses = [],
    learningPath = [],
    aiSummary = '',
  } = gapAnalysis || {};

  const isAboveBenchmark = overallScore >= benchmark;
  const roleTitleDisplay = roleBlueprint?.roleTitle || employee?.designation || currentRole?.role || 'Statistical Investigator';
  const deptDisplay = roleBlueprint?.departmentName || employee?.department || currentRole?.department || 'MoSPI / National Statistical Office';

  const diagnosticHeader = (
    <div className="bg-gov-navy text-white w-full shadow-xs">
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green w-full" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
            <span className="text-[9px] font-bold text-gov-saffron leading-none">iGOT</span>
          </div>
          <div>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">
              Government of India · Role-Aware Competency Intelligence
            </p>
            <p className="text-xs sm:text-sm font-bold text-white">
              {roleTitleDisplay} — Diagnostic Assessment & Skill Gap Report
            </p>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="hidden sm:flex items-center gap-2">
          {[
            { n: 1, label: 'Role Profile', done: true },
            { n: 2, label: 'Assessment', done: true },
            { n: 3, label: 'Diagnostic', active: true },
            { n: 4, label: 'Dashboard Unlocked', active: false },
          ].map(({ n, label, active, done }) => (
            <div key={n} className="flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
                ${done ? 'bg-gov-green text-white border-gov-green'
                  : active ? 'bg-gov-saffron text-white border-gov-saffron'
                  : 'bg-white/10 text-white/40 border-white/20'}`}
              >
                {done ? '✓' : n}
              </div>
              <span className={`text-[10px] ${active ? 'text-white font-semibold' : 'text-white/50'}`}>{label}</span>
              {n < 4 && <div className="w-4 h-px bg-white/20 mx-0.5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <PreDashboardLayout header={diagnosticHeader}>
      {/* Main Diagnostic Body */}
      <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Top Summary Banner: Overall Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="gov-card p-6 sm:p-8 bg-gradient-to-br from-gov-navy via-[#0f2e54] to-gov-navy-dark text-white relative overflow-hidden"
        >
          {/* Subtle watermark seal */}
          <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none text-[160px] font-serif font-black">
            GOV
          </div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-gov-saffron">
                <ShieldCheck size={14} /> Official Competency Diagnostic Report
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white tracking-tight">
                Your Competency Profile
              </h1>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                Role evaluated: <strong>{roleTitleDisplay}</strong> ({deptDisplay}).
                Performance calibrated against the 5 official role blueprint domains.
              </p>
            </div>

            {/* Score pill */}
            <div className="flex items-center gap-4 bg-white/10 border border-white/20 p-4 sm:p-5 rounded-gov-md backdrop-blur-xs shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">Overall Assessment</span>
                <span className="text-3xl sm:text-4xl font-black text-white">{overallScore}%</span>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <span className="text-[10px] text-white/60 uppercase tracking-wider block">Benchmark</span>
                <span className="text-2xl font-bold text-gov-saffron">{benchmark}%</span>
              </div>
            </div>
          </div>

          {/* Status pill strip */}
          <div className="mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-white/80">
                <Target size={14} className="text-gov-blue-light" />
                <span>Questions Scored: <strong>{totalQuestions} Diagnostic Items</strong></span>
              </span>
              <span className="flex items-center gap-1.5 text-white/80">
                <Award size={14} className={isAboveBenchmark ? 'text-gov-green' : 'text-gov-amber'} />
                <span>Status: <strong className={isAboveBenchmark ? 'text-green-300' : 'text-amber-300'}>
                  {isAboveBenchmark ? 'Role Benchmark Achieved' : 'Targeted Capacity Building Required'}
                </strong></span>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRetake}
                className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors"
              >
                <RotateCcw size={13} /> Retake Assessment
              </button>
            </div>
          </div>
        </motion.div>

        {/* AI Insight Diagnostic Summary */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="gov-card p-5 border-l-4 border-l-gov-blue bg-gov-blue-light/40 flex items-start gap-3.5"
        >
          <div className="p-2 rounded-gov bg-gov-blue text-white shrink-0 mt-0.5">
            <Sparkles size={18} />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-gov-navy">AI Competency Diagnostic Summary</h2>
            <p className="text-xs sm:text-sm text-gov-gray-700 leading-relaxed">
              {aiSummary || `Evaluation for ${roleTitleDisplay} (${deptDisplay}) complete. Personalized learning pathways mapped to your specific competency gaps below.`}
            </p>
          </div>
        </motion.div>

        {/* ── 1. COMPETENCY CARDS BREAKDOWN ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gov-navy flex items-center gap-2">
                <BarChart3 size={18} className="text-gov-blue" />
                <span>Competency Performance Cards</span>
              </h2>
              <p className="text-xs text-gov-gray-500 mt-0.5">
                Evaluation across all 5 blueprint competencies required for {roleTitleDisplay}.
              </p>
            </div>

            {/* Category tags legend */}
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 text-gov-green font-medium">
                <CheckCircle size={13} /> Strong / Proficient (≥ 70%)
              </span>
              <span className="flex items-center gap-1 text-gov-amber font-medium">
                <AlertTriangle size={13} /> Developing (55-69%)
              </span>
              <span className="flex items-center gap-1 text-gov-red font-medium">
                <XCircle size={13} /> Critical Gap (&lt; 55%)
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {competencyBreakdown.map((item) => {
              const isStrong = item.category === 'strong';
              const isCritical = item.category === 'critical';

              return (
                <div
                  key={item.id || item.name}
                  className={`gov-card p-4 sm:p-5 border-2 transition-all flex flex-col justify-between ${
                    isCritical
                      ? 'border-red-200 bg-gov-red-light/30 shadow-xs'
                      : isStrong
                      ? 'border-green-200 bg-gov-green-light/30'
                      : 'border-amber-200 bg-gov-amber-light/30'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm inline-block
                        ${isCritical
                          ? 'bg-gov-red text-white'
                          : isStrong
                          ? 'bg-gov-green text-white'
                          : 'bg-gov-amber text-white'
                        }`}
                      >
                        {item.statusText || (isCritical ? 'Critical Gap' : isStrong ? 'Strong' : 'Developing')}
                      </span>
                      <span className="badge-gov-neutral text-[10px] font-semibold">
                        {item.proficiencyLabel || 'Proficient'}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-gov-navy leading-snug">{item.name}</h3>
                      <p className="text-[11px] text-gov-gray-500 mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gov-gray-100 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-black text-gov-navy">{item.current}%</span>
                      <span className="text-[11px] text-gov-gray-500 font-medium">Target: {item.required}%</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-track h-2">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.current}%`,
                          backgroundColor: item.color || (isCritical ? '#B91C1C' : isStrong ? '#15803D' : '#D97706'),
                        }}
                      />
                    </div>

                    <div className="text-[11px] text-right">
                      {item.gap > 0 ? (
                        <strong className="text-gov-red">-{item.gap}% Gap</strong>
                      ) : (
                        <strong className="text-gov-green">Benchmark Met ✓</strong>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ── 2. PRIORITY SKILL GAPS ───────────────────────────────────────── */}
        {criticalGaps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="gov-card p-5 sm:p-6 border-l-4 border-l-gov-red bg-red-50/40 space-y-4"
          >
            <div className="flex items-center gap-2 text-gov-red">
              <AlertTriangle size={18} />
              <h2 className="text-base font-bold text-gov-navy">Priority Skill Gaps Requiring Capacity Building</h2>
            </div>
            <p className="text-xs text-gov-gray-600">
              The diagnostic assessment flagged the following competency deficits that fall significantly below the benchmark for {roleTitleDisplay}.
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {criticalGaps.map((gap) => (
                <div key={gap.id} className="bg-white p-3.5 rounded-gov border border-red-200 flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-gov-navy">{gap.name}</h4>
                    <p className="text-[10px] text-gov-gray-500 mt-0.5">Required: {gap.required}% | Score: {gap.current}%</p>
                    <span className="badge-gov-saffron text-[9px] mt-1 inline-block">Deficit: -{gap.gap}%</span>
                  </div>
                  <span className="text-xs font-bold text-gov-red px-2 py-1 bg-red-50 rounded">
                    CRITICAL
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 3. RECOMMENDED LEARNING ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-gov-navy flex items-center gap-2">
                <BookOpen size={18} className="text-gov-blue" />
                <span>Recommended Learning Modules</span>
              </h2>
              <p className="text-xs text-gov-gray-500 mt-0.5">
                Curated modules mapped directly from iGOT Karmayogi and National Training Academies to close your specific gaps.
              </p>
            </div>
            <span className="badge-gov-info text-xs">
              {recommendedCourses.length} Courses Mapped
            </span>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommendedCourses.map((course) => (
              <div key={course.id} className="gov-card p-5 flex flex-col justify-between hover:shadow-gov-card-hover transition-all">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="badge-gov-saffron text-[10px]">
                      {course.badge}
                    </span>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded
                      ${course.priority === 'High'
                        ? 'bg-gov-red text-white'
                        : 'bg-gov-amber text-white'
                      }`}
                    >
                      {course.priority} Priority
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-gov-navy leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-gov-gray-400 mt-0.5">{course.provider}</p>
                  </div>

                  <p className="text-xs text-gov-gray-600 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>

                  <div className="text-[11px] bg-gov-off-white p-2 rounded border border-gov-gray-100 text-gov-gray-700">
                    <strong className="text-gov-navy font-semibold">Target Gap:</strong> {course.targetGap}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gov-gray-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-gov-gray-500 text-[11px]">
                    <Clock size={12} />
                    <span>{course.duration}</span>
                  </div>

                  <span className="text-[11px] font-semibold text-gov-blue flex items-center gap-1">
                    iGOT Karmayogi <ExternalLink size={11} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 4. PERSONALIZED LEARNING PATH (STEP 12) ──────────────────────── */}
        {learningPath.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-gov-navy flex items-center gap-2">
                  <Compass size={18} className="text-gov-blue" />
                  <span>Your Personalized Learning Path</span>
                </h2>
                <p className="text-xs text-gov-gray-500 mt-0.5">
                  Sequential capacity-building roadmap systematically prioritized by your highest competency deficits.
                </p>
              </div>
              <span className="badge-gov-saffron text-xs font-bold">
                {learningPath.length} Structured Milestones
              </span>
            </div>

            <div className="space-y-3">
              {learningPath.map((step) => (
                <div
                  key={step.stepNumber}
                  className="gov-card p-5 border-l-4 border-l-gov-blue bg-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:shadow-gov-card-hover transition-all"
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <div className="w-8 h-8 rounded-full bg-gov-navy text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {step.stepNumber}
                    </div>

                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${step.badgeClass}`}>
                          {step.priority}
                        </span>
                        <span className="badge-gov-info text-[10px]">
                          Competency: {step.competency}
                        </span>
                        <span className="text-[11px] text-gov-gray-400">
                          {step.courseDuration}
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-gov-navy">
                        {step.title}
                      </h3>
                      <p className="text-xs text-gov-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                      <p className="text-[11px] text-gov-gray-500">
                        Mapped Module: <strong className="text-gov-navy">{step.courseTitle}</strong> ({step.provider})
                      </p>
                    </div>
                  </div>

                  {/* Level Transition Pill */}
                  <div className="bg-gov-off-white px-3.5 py-2.5 rounded-gov border border-gov-gray-200 text-xs text-right shrink-0">
                    <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Proficiency Goal</span>
                    <div className="flex items-center gap-1.5 font-bold text-gov-navy mt-0.5">
                      <span className="text-gov-amber">{step.currentLevel}</span>
                      <ArrowRight size={12} className="text-gov-gray-400" />
                      <span className="text-gov-green">{step.targetLevel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── 5. UNLOCK EMPLOYEE DASHBOARD CTA BANNER (STEP 13) ─────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="gov-card p-6 sm:p-8 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md"
        >
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs font-semibold text-gov-saffron">
              <CheckCircle2 size={14} className="text-gov-green" /> Initial Diagnostic Verified
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Unlock Your Full Employee Portal & Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-white/80 max-w-xl">
              Your competency scores, skill gap radar, and personalized learning path have been established for <strong>{roleTitleDisplay}</strong> ({deptDisplay}).
            </p>
          </div>

          <button
            onClick={onEnterDashboard}
            className="btn-gov-saffron px-8 py-3.5 text-sm font-bold shadow-lg shrink-0 flex items-center gap-2 hover:scale-[1.02] transition-transform"
          >
            <span>Unlock Dashboard & Enter Portal</span>
            <ArrowRight size={18} />
          </button>
        </motion.div>

      </main>
    </PreDashboardLayout>
  );
}
