import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  TrendingUp,
  Target,
  BookOpen,
  FlaskConical,
  MessageSquare,
  Compass,
  Award,
  ChevronRight,
  CheckCircle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import DashboardSummaryCards from '../components/DashboardSummaryCards';
import NextBestActionCard from '../components/NextBestActionCard';
import DailyLearningStreakCard from '../components/DailyLearningStreakCard';
import CompetencyRadar from '../components/CompetencyRadar';
import GrowthChart from '../components/GrowthChart';
import { serviceImages } from '../data/mockData';

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.35 },
};

function SectionHeader({ title, subtitle, link, linkLabel }) {
  return (
    <div className="flex items-start justify-between mb-3.5">
      <div className="section-divider">
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {link && (
        <Link to={link} className="text-xs text-gov-blue hover:text-gov-navy font-semibold flex items-center gap-0.5 transition-colors">
          {linkLabel || 'View All'} <ChevronRight size={12} />
        </Link>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    employee,
    selectedStream,
    departmentConfig,
    domainTasks,
    domainRecommendedCourses,
    currentRole,
    gapAnalysis,
    virtualLabs,
    discussions,
    courses,
    progressTimeline,
    setOnboardingStep,
  } = useStream();

  // Dynamic greeting based on time of day
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const displayName = employee?.name || 'Officer';

  const overallScore = gapAnalysis?.overallScore || employee?.overallCompetency || 63;
  const targetLab = (domainTasks && domainTasks[0]) ? {
    id: domainTasks[0].id,
    title: domainTasks[0].title,
    badge: domainTasks[0].category || 'Core Departmental Scenario',
    scenario: domainTasks[0].scenario,
  } : virtualLabs[0] || {
    id: 'lab-stats-01',
    title: 'District Survey Analysis',
    badge: 'Core Statistical Scenario',
    scenario: 'Analyze Varanasi household survey data, resolve missing values, compute CV, and submit findings.',
  };

  const recommendedCoursesList = (domainRecommendedCourses && domainRecommendedCourses.length > 0)
    ? domainRecommendedCourses.slice(0, 3)
    : courses.filter(c => c.isEnrolled || c.badge.includes('Recommended') || c.badge.includes('Priority')).slice(0, 3);
  const recentDiscussions = discussions.slice(0, 2);

  return (
    <div className="space-y-7 w-full">
      
      {/* ── 0. COMPACT EMPLOYEE CONTEXT BANNER (PHASE 2 REQUIREMENT) ─── */}
      <motion.div
        {...fadeUp}
        className="gov-card p-4 sm:p-5 bg-white border-2 border-gov-blue/20 rounded-gov-md shadow-xs space-y-3"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gov-gray-100">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-gov-saffron-light border border-orange-200 text-gov-saffron text-[10px] font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-gov-saffron animate-pulse" />
              <span>DEMO / TEST ACCOUNT</span>
            </div>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h2 className="text-base sm:text-lg font-black text-gov-navy">
                {employee?.id === 'demo-employee-01' ? 'Employee 01' :
                 employee?.id === 'demo-employee-02' ? 'Employee 02' :
                 employee?.id === 'demo-employee-03' ? 'Employee 03' :
                 employee?.id === 'demo-employee-04' ? 'Employee 04' :
                 employee?.id === 'demo-employee-05' ? 'Employee 05' : 'Demo Employee'}
                <span className="font-normal text-gov-gray-500 text-sm ml-1.5">({employee?.name || 'Officer'})</span>
              </h2>
              <span className="text-gov-gray-400">·</span>
              <span className="text-xs font-semibold text-gov-navy">{employee?.department || 'Department'}</span>
              <span className="text-gov-gray-400">·</span>
              <span className="text-xs font-bold text-gov-blue">{employee?.designation || 'Statistical Investigator'}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setOnboardingStep('assessment');
              navigate('/employee/diagnostic');
            }}
            className="btn-gov-saffron px-4 py-2 text-xs font-bold shrink-0 shadow-xs flex items-center gap-1.5 hover:scale-[1.02] transition-transform"
            title="Launch personalized diagnostic assessment for this role"
          >
            <Sparkles size={14} />
            <span>Start Competency Assessment</span>
          </button>
        </div>

        {/* Competency Areas */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-0.5">
          <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider shrink-0">
            Competency Areas:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {(employee?.competenciesFocus || ['Survey Sampling', 'Statistical Methods', 'Data Analysis', 'Survey Operations', 'Data Quality']).map((c) => (
              <span key={c} className="badge-gov-info text-[11px] px-2.5 py-0.5 font-medium border border-blue-200">
                {c}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── 1. WELCOME & ROLE GREETING BANNER ───────────────────────────────── */}
      <motion.div
        {...fadeUp}
        className="gov-card p-6 sm:p-7 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white rounded-gov-md shadow-md relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-gov-saffron text-[10px] font-bold">
                {departmentConfig?.icon || selectedStream?.icon || '🏛️'} {departmentConfig?.name || selectedStream?.name} · {departmentConfig?.domain || selectedStream?.domain || 'Official Domain'}
              </span>
              <span className="text-white/40">·</span>
              <span className="text-xs text-white/80 font-semibold">{employee?.department || 'Department'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {timeGreeting}, {displayName}
            </h1>

            {/* Official Designation & Career Path Transition */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="text-white/60">Current Role:</span>
                <strong className="text-white">{employee?.designation || 'Statistical Investigator'}</strong>
              </div>

              <span className="text-white/40 hidden sm:inline">|</span>

              <div className="flex items-center gap-1.5 text-gov-saffron">
                <span className="text-white/60">Career Path:</span>
                <strong className="text-gov-saffron flex items-center gap-1">
                  <span>{employee?.designation || 'Investigator'}</span>
                  <ArrowRight size={12} />
                  <span>{employee?.targetRole || 'Senior Statistical Officer'}</span>
                </strong>
              </div>
            </div>
          </div>

          {/* Right Status Badge */}
          <div className="flex items-center gap-3 bg-white/10 border border-white/20 px-4 py-3 rounded-gov-md backdrop-blur-xs shrink-0">
            <div className="w-10 h-10 rounded-full bg-gov-green/30 border border-gov-green flex items-center justify-center text-green-300">
              <CheckCircle size={20} />
            </div>
            <div>
              <p className="text-xs font-bold text-white leading-none">Assessment Completed</p>
              <p className="text-[10px] text-white/70 mt-1">iGOT Synced: {employee?.igotId || 'iGOT-2026-ACTIVE'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── 2. DASHBOARD SUMMARY CARDS (Animated Counters) ─────────────────── */}
      <motion.section {...fadeUp} transition={{ delay: 0.05 }}>
        <DashboardSummaryCards />
      </motion.section>

      {/* ── 2.1 COMPACT DAILY LEARNING STREAK BAR ─────────────────────────── */}
      <motion.section {...fadeUp} transition={{ delay: 0.08 }}>
        <DailyLearningStreakCard compact />
      </motion.section>

      {/* ── 3. "YOUR NEXT BEST ACTION" (Large Highlighted Card) ─────────────── */}
      <motion.section {...fadeUp} transition={{ delay: 0.1 }}>
        <NextBestActionCard />
      </motion.section>

      {/* ── 4 & 5. MAIN TWO-COLUMN DASHBOARD GRID ───────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left (2/3 Column) */}
        <div className="lg:col-span-2 space-y-7">
          
          {/* Competency Profile & Radar Breakdown */}
          <motion.section {...fadeUp} transition={{ delay: 0.15 }}>
            <SectionHeader
              title="Competency Profile & Benchmark Levels"
              subtitle={`Current proficiency against ${employee.targetRole || 'target cadre'} role requirements`}
              link="/competencies"
              linkLabel="Full Radar & Details"
            />
            
            <div className="grid sm:grid-cols-2 gap-3.5">
              {(gapAnalysis?.competencyBreakdown || []).slice(0, 4).map((c, i) => (
                <div
                  key={c.name}
                  className={`gov-card p-4 border-l-4 transition-all ${
                    c.category === 'critical'
                      ? 'border-l-gov-red bg-gov-red-light/20'
                      : c.category === 'strong'
                      ? 'border-l-gov-green bg-gov-green-light/20'
                      : 'border-l-gov-amber bg-gov-amber-light/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        c.category === 'critical' ? 'bg-gov-red text-white' : c.category === 'strong' ? 'bg-gov-green text-white' : 'bg-gov-amber text-white'
                      }`}>
                        {c.statusText}
                      </span>
                      <h3 className="text-xs font-bold text-gov-navy mt-1">{c.name}</h3>
                    </div>
                    <span className="text-base font-black text-gov-navy">{c.current}%</span>
                  </div>

                  <div className="space-y-1">
                    <div className="progress-track h-2">
                      <div className="h-full rounded-full" style={{ width: `${c.current}%`, backgroundColor: c.color }} />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-gov-gray-500">
                      <span>Target: {c.required}%</span>
                      <span>{c.gap > 0 ? <strong className="text-gov-red">-{c.gap}% Gap</strong> : <strong className="text-gov-green">Met ✓</strong>}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Virtual Lab Recommendation Card */}
          <motion.section {...fadeUp} transition={{ delay: 0.2 }}>
            <SectionHeader
              title="Featured Virtual Lab: Practice Scenario"
              subtitle="Interactive hands-on simulation linked to your survey sampling gap"
              link="/virtual-labs"
              linkLabel="All Virtual Labs"
            />
            
            <div className="gov-card p-5 bg-gradient-to-r from-gov-blue-light/30 via-white to-gov-green-light/20 border-2 border-gov-blue/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="badge-gov-saffron text-[10px] font-bold">{targetLab.badge}</span>
                  <span className="text-xs text-gov-gray-500 font-mono">Dataset: district_survey.csv</span>
                </div>
                <h3 className="text-base font-bold text-gov-navy flex items-center gap-2">
                  <FlaskConical size={18} className="text-gov-blue" />
                  <span>{targetLab.title}</span>
                </h3>
                <p className="text-xs text-gov-gray-600 leading-relaxed">
                  {targetLab.scenario}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-gov-gray-500 pt-1">
                  <span>• Missing values detection</span>
                  <span>• CV estimation</span>
                  <span>• Anomaly visualization</span>
                </div>
              </div>

              <Link
                to="/virtual-labs"
                className="btn-gov-primary text-xs px-5 py-2.5 shrink-0 shadow-xs flex items-center gap-1.5"
              >
                <FlaskConical size={14} />
                <span>Launch Workspace</span>
              </Link>
            </div>
          </motion.section>

          {/* Recommended Learning from iGOT / TPAC */}
          <motion.section {...fadeUp} transition={{ delay: 0.22 }}>
            <SectionHeader
              title="Recommended Learning for Your Skill Gaps"
              subtitle="Curated from iGOT Karmayogi and TPAC based on identified deficits"
              link="/explore-learning"
              linkLabel="All Courses"
            />

            <div className="space-y-3">
              {recommendedCoursesList.map((course) => (
                <div
                  key={course.id}
                  className="gov-card p-4 hover:shadow-gov-card-hover transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                        course.providerType === 'igot' ? 'bg-gov-saffron text-white' : 'bg-gov-blue text-white'
                      }`}>
                        {course.provider}
                      </span>
                      <span className="badge-gov-neutral text-[9px]">{course.difficulty}</span>
                    </div>

                    <h4 className="text-sm font-bold text-gov-navy leading-snug">{course.title}</h4>
                    <p className="text-xs text-gov-gray-600 line-clamp-1">{course.description}</p>

                    <div className="flex items-center gap-3 text-[11px] text-gov-gray-400 pt-1">
                      <span className="flex items-center gap-1"><Clock size={11} /> {course.duration}</span>
                      <span>·</span>
                      <span className="text-gov-navy font-semibold">Target: {course.competency}</span>
                    </div>
                  </div>

                  <Link
                    to="/explore-learning"
                    className="btn-gov-secondary text-xs py-1.5 px-3 shrink-0"
                  >
                    <span>{course.isEnrolled ? 'Continue Course' : 'Start Course'}</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Public Service Visuals */}
          <motion.section {...fadeUp} transition={{ delay: 0.25 }}>
            <SectionHeader title="Civil Services Excellence in Public Administration" />
            <div className="grid sm:grid-cols-3 gap-3">
              {serviceImages.map((img, i) => (
                <div key={i} className="rounded-gov-md overflow-hidden border border-gov-gray-200 shadow-xs">
                  <img src={img.url} alt={img.caption} className="w-full h-24 object-cover" loading="lazy" />
                  <div className="p-2 bg-gov-off-white border-t border-gov-gray-200">
                    <p className="text-[10px] text-gov-gray-500 leading-tight">{img.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

        </div>

        {/* Right (1/3 Column) */}
        <div className="space-y-6">
          
          {/* Future Role Readiness Widget */}
          <motion.div {...fadeUp} transition={{ delay: 0.12 }} className="gov-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={14} className="text-gov-saffron" />
                Future Role Transition
              </h3>
              <Link to="/future-role" className="text-[11px] text-gov-blue font-semibold hover:underline">
                View Roadmap
              </Link>
            </div>

            <div className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-gov-gray-500">Target Role:</span>
                <strong className="text-gov-navy">{employee?.targetRole || 'Senior Statistical Officer'}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gov-gray-500">Role Readiness:</span>
                <strong className="text-gov-saffron font-bold">66% (Near Ready)</strong>
              </div>
              <div className="progress-track h-2 mt-1">
                <div className="h-full rounded-full bg-gov-saffron" style={{ width: '66%' }} />
              </div>
            </div>

            <p className="text-[11px] text-gov-gray-600 leading-relaxed">
              Elevating your {gapAnalysis?.criticalGaps?.[0]?.name || employee?.competenciesFocus?.[0] || 'core competency'} score satisfies official promotion benchmark criteria.
            </p>
          </motion.div>

          {/* Competency Growth Chart */}
          <motion.div {...fadeUp} transition={{ delay: 0.16 }}>
            <GrowthChart />
          </motion.div>

          {/* Community Discussions Activity */}
          <motion.div {...fadeUp} transition={{ delay: 0.2 }} className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare size={14} className="text-gov-blue" />
                Active Peer Discussions
              </h3>
              <Link to="/discussions" className="text-[11px] text-gov-blue font-semibold hover:underline">
                Community
              </Link>
            </div>

            <div className="space-y-2.5">
              {recentDiscussions.map(d => (
                <Link
                  key={d.id}
                  to="/discussions"
                  className="block p-3 bg-gov-off-white hover:bg-gov-blue-light/40 border border-gov-gray-200 rounded-gov transition-colors text-xs space-y-1"
                >
                  <p className="font-bold text-gov-navy leading-snug line-clamp-2">{d.title}</p>
                  <div className="flex items-center justify-between text-[10px] text-gov-gray-400 pt-0.5">
                    <span>{d.author.name}</span>
                    <span>{d.repliesCount} replies</span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Progress Timeline Preview */}
          <motion.div {...fadeUp} transition={{ delay: 0.24 }} className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                <Clock size={14} className="text-gov-navy" />
                Recent Progress Activity
              </h3>
              <Link to="/progress" className="text-[11px] text-gov-blue font-semibold hover:underline">
                Audit Trail
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {progressTimeline.slice(0, 3).map((item) => (
                <div key={item.id} className="p-2.5 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-gov-gray-500 font-semibold">{item.date}</span>
                    <span className="badge-gov-info text-[9px]">{item.badge}</span>
                  </div>
                  <p className="font-bold text-gov-navy">{item.title}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
