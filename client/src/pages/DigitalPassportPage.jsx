import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Target,
  Sparkles,
  TrendingUp,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Compass,
  AlertTriangle,
  QrCode,
  Calendar,
  Building2,
  FileCheck2,
  Flame,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { buildDigitalPassportData } from '../services/digitalPassportService';

export default function DigitalPassportPage() {
  const navigate = useNavigate();
  const {
    employee,
    gapAnalysis,
    departmentConfig,
    domainNextBestAction,
    domainFutureRoles,
  } = useStream();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'dna' | 'skills' | 'experience' | 'future'
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);

  // Build complete dynamic passport dataset
  const passport = useMemo(() => {
    return buildDigitalPassportData({
      employee,
      gapAnalysis,
      departmentConfig,
      domainNextBestAction,
      domainFutureRoles,
    });
  }, [employee, gapAnalysis, departmentConfig, domainNextBestAction, domainFutureRoles]);

  const handleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 3500);
  };

  const {
    passportId,
    verifiedStatus,
    environmentBadge,
    issuedDate,
    lastUpdated,
    maturity,
    overallCompScore,
    overallPassportScore,
    readinessScore,
    competencyDNA,
    evolutionEvents,
    skills,
    experienceTimeline,
    achievements,
    learningJourney,
    developmentAreas,
    primaryFutureRole,
    futureRolesList,
    domainNextBestAction: nextAction,
    aiInsight,
  } = passport;

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-16">
      
      {/* ── 1. Page Header & Action Bar ─────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-gov-saffron-light text-gov-saffron border border-orange-200">
              <ShieldCheck size={13} />
              <span>Digital Professional Identity</span>
            </span>
            <span className="text-xs text-gov-gray-400 font-medium">
              iGOT Karmayogi Competency Ecosystem
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-gov-navy tracking-tight mt-1">
            Digital Professional Passport
          </h1>
          <p className="text-xs text-gov-gray-600">
            A verified competency record, continuous learning portfolio, and career pathway credential.
          </p>
        </div>

        {/* Download & Share Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-gov-md bg-white border border-gov-gray-200 hover:border-gov-gray-400 text-gov-navy text-xs font-bold shadow-xs hover:bg-gov-gray-50 transition-all"
            title="Export / Print Digital Passport as PDF"
          >
            <Download size={14} className="text-gov-blue" />
            <span>Download Passport</span>
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-gov-md bg-gov-blue hover:bg-gov-navy text-white text-xs font-bold shadow-xs transition-all"
          >
            <Share2 size={14} />
            <span>Share Profile</span>
          </button>
        </div>
      </div>

      {/* Temporary Share Toast Notice */}
      {shareNotice && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 bg-gov-blue-light border border-gov-blue text-gov-navy rounded-gov text-xs flex items-center justify-between"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-gov-blue shrink-0" />
            <span>
              Public professional passport link copied to clipboard. Only verified professional credentials and competencies are shared.
            </span>
          </div>
          <span className="text-[10px] font-bold text-gov-blue uppercase">Privacy Guard Active</span>
        </motion.div>
      )}

      {/* ── 2. The Signature Digital Passport Hero & Identity Card ──────────── */}
      <div className="bg-white rounded-gov-lg border border-gov-gray-200 shadow-gov-card overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Vertical "Passport Spine" Concept */}
          <div className="hidden lg:flex flex-col items-center justify-between py-6 px-3.5 bg-gradient-to-b from-gov-navy to-[#0f2e54] text-white border-r border-gov-gray-200 select-none relative">
            <div className="w-6 h-6 rounded-full bg-gov-saffron flex items-center justify-center font-bold text-[9px]">
              GOV
            </div>

            {/* Vertical spine label */}
            <div className="writing-vertical text-[10px] font-black tracking-[0.3em] text-white/70 uppercase">
              DIGITAL PASSPORT
            </div>

            <div className="w-2 h-2 rounded-full bg-gov-green animate-pulse" title="Profile Active" />
          </div>

          {/* Main Passport Identity Body */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              
              {/* Left Side: Avatar + Details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
                {/* Avatar with Government Ring */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gov-navy to-gov-blue text-white flex items-center justify-center text-xl sm:text-2xl font-black border-4 border-white shadow-md ring-2 ring-gov-saffron">
                    {passport.employee.initials}
                  </div>
                  <span
                    className="absolute bottom-1 right-1 w-5 h-5 bg-gov-green border-2 border-white rounded-full flex items-center justify-center"
                    title="Active Civil Service Profile"
                  >
                    <BadgeCheck size={12} className="text-white" />
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-gov-navy">
                      {passport.employee.name}
                    </h2>
                    <span className="badge-gov-success text-[10px] font-black uppercase tracking-wider">
                      {verifiedStatus}
                    </span>
                    <span className="badge-gov-warning text-[9px] font-bold">
                      {environmentBadge}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-gov-blue">
                    {passport.employee.role}
                  </p>

                  <p className="text-xs text-gov-gray-600">
                    {passport.employee.department} · {passport.employee.ministry}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-[11px] text-gov-gray-500">
                    <span><strong>Cadre:</strong> {passport.employee.cadre}</span>
                    <span>•</span>
                    <span><strong>Station:</strong> {passport.employee.station}</span>
                    <span>•</span>
                    <span><strong>Tenure:</strong> {passport.employee.experience}</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Passport ID + QR Representation */}
              <div className="bg-gov-off-white/80 p-4 rounded-gov-md border border-gov-gray-200 shrink-0 flex items-center gap-4 self-start">
                {/* Subtle QR-style verification mark */}
                <div className="w-16 h-16 rounded bg-white border border-gov-gray-300 p-1 flex flex-col items-center justify-center text-center shadow-xs">
                  <QrCode size={36} className="text-gov-navy" />
                  <span className="text-[7px] text-gov-gray-400 font-bold uppercase tracking-tighter mt-0.5">
                    SCAN VERIFY
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                    Digital Passport ID
                  </span>
                  <strong className="text-xs font-mono font-bold text-gov-navy block">
                    {passportId}
                  </strong>
                  <span className="text-[10px] text-gov-gray-500 block">
                    iGOT ID: {passport.employee.igotId}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-gov-green font-semibold pt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gov-green" />
                    <span>{passport.employee.igotStatus}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Passport Quick Metrics Strip */}
            <div className="mt-6 pt-6 border-t border-gov-gray-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-2.5 rounded-gov bg-gov-off-white/60">
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
                  Professional Maturity
                </span>
                <span className="text-sm font-black text-gov-navy mt-0.5 block">
                  {maturity.band}
                </span>
                <span className="text-[10px] text-gov-gray-500">{maturity.label}</span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white/60">
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
                  Competency DNA Index
                </span>
                <span className="text-sm font-black text-gov-blue mt-0.5 block">
                  {overallCompScore}%
                </span>
                <span className="text-[10px] text-gov-green font-semibold">+18% vs Baseline</span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white/60">
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
                  Future Role Readiness
                </span>
                <span className="text-sm font-black text-gov-saffron mt-0.5 block">
                  {readinessScore}%
                </span>
                <span className="text-[10px] text-gov-gray-500">Target: {passport.employee.targetRole}</span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white/60">
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block">
                  Passport Composite
                </span>
                <span className="text-sm font-black text-gov-green mt-0.5 block">
                  {overallPassportScore}%
                </span>
                <span className="text-[10px] text-gov-gray-400">Demo Readiness Indicator</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. AI Professional Insight Banner ────────────────────────────────── */}
      <div className="bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white rounded-gov-lg p-5 sm:p-6 shadow-gov-card relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gov-saffron text-white">
              <Sparkles size={12} />
              <span>AI Professional Guidance · MoE Engine</span>
            </div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Strategic Career & Capability Insight
            </h2>
            <p className="text-xs text-white/80 leading-relaxed">
              Your strongest capability is <strong className="text-amber-300">{aiInsight.strongestCompetency}</strong>. Your largest growth opportunity is <strong className="text-orange-300">{aiInsight.largestOpportunity}</strong>. Improving this area will accelerate your readiness for <strong className="text-white">{primaryFutureRole.title}</strong> from {readinessScore}% to over 80%.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-auto">
            <Link
              to="/skill-gaps"
              className="px-3 py-1.5 rounded-gov text-xs font-bold bg-white text-gov-navy hover:bg-gov-gray-100 shadow-xs transition-all"
            >
              View Skill Gap
            </Link>
            <Link
              to="/explore-learning"
              className="px-3 py-1.5 rounded-gov text-xs font-bold bg-gov-saffron text-white hover:bg-orange-600 shadow-xs transition-all"
            >
              Recommended Learning
            </Link>
            <Link
              to="/future-role"
              className="px-3 py-1.5 rounded-gov text-xs font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all"
            >
              Explore Roles
            </Link>
          </div>
        </div>
      </div>

      {/* ── 4. Main 2-Column Professional Passport Workspace ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* ── LEFT 2 COLUMNS: Competencies, Evolution, Skills, Experience ────── */}
        <div className="lg:col-span-2 space-y-6">

          {/* Section: MY COMPETENCY DNA */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 sm:p-6 shadow-gov-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-black text-gov-navy flex items-center gap-2">
                  <Target size={17} className="text-gov-blue" />
                  <span>MY COMPETENCY DNA</span>
                </h2>
                <p className="text-xs text-gov-gray-500 mt-0.5">
                  A living view of capabilities developed throughout your civil service career.
                </p>
              </div>
              <span className="text-[11px] font-bold text-gov-gray-400 bg-gov-off-white px-2.5 py-1 rounded-full border border-gov-gray-200 self-start">
                Domain: {passport.employee.domain}
              </span>
            </div>

            {/* Competency DNA Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {competencyDNA.map((comp) => {
                const isAdvanced = comp.status === 'Advanced';
                const isDeveloping = comp.status === 'Developing';

                return (
                  <div
                    key={comp.id}
                    className="p-3.5 rounded-gov-md border border-gov-gray-200 bg-gov-off-white/40 hover:bg-white hover:shadow-xs transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gov-navy truncate max-w-[180px]">
                        {comp.name}
                      </span>
                      <span
                        className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          isAdvanced
                            ? 'bg-gov-green-light text-gov-green border border-green-200'
                            : isDeveloping
                            ? 'bg-amber-50 text-amber-800 border border-amber-200'
                            : 'bg-gov-blue-light text-gov-blue border border-blue-200'
                        }`}
                      >
                        {comp.status} ({comp.current}%)
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="space-y-1">
                      <div className="w-full h-2 bg-gov-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${comp.current}%`,
                            backgroundColor: comp.color || '#1D5F9E',
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-gov-gray-500">
                        <span>Current: {comp.current}%</span>
                        <span>Role Benchmark: {comp.required}%</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Competency Evolution Timeline */}
            <div className="mt-6 pt-5 border-t border-gov-gray-200">
              <span className="text-[11px] font-bold text-gov-gray-500 uppercase tracking-wider block mb-3">
                Competency Evolution Over Time
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {evolutionEvents.map((evt, idx) => (
                  <div key={idx} className="bg-gov-off-white p-3 rounded-gov border border-gov-gray-200 text-center">
                    <span className="text-[10px] text-gov-gray-400 font-semibold block uppercase truncate">
                      {evt.stage}
                    </span>
                    <span className="text-lg font-black text-gov-navy block mt-0.5">
                      {evt.score}%
                    </span>
                    <span className="text-[10px] text-gov-green font-bold block">
                      {evt.delta !== '0' ? `${evt.delta} pts` : 'Baseline'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section: MY SKILLS MATRIX */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 sm:p-6 shadow-gov-card">
            <div className="mb-4">
              <h2 className="text-sm sm:text-base font-black text-gov-navy flex items-center gap-2">
                <Layers size={17} className="text-gov-blue" />
                <span>MY SKILLS MATRIX</span>
              </h2>
              <p className="text-xs text-gov-gray-500 mt-0.5">
                Multi-dimensional skill taxonomy verified through civil service tasks and coursework.
              </p>
            </div>

            <div className="space-y-3.5">
              {/* Core Skills */}
              <div>
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block mb-1.5">
                  Core Foundational Skills
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.core.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-gov text-xs font-semibold bg-gov-off-white text-gov-navy border border-gov-gray-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block mb-1.5">
                  Technical & Tooling Capabilities
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.technical.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-gov text-xs font-semibold bg-gov-blue-light/60 text-gov-blue border border-blue-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Domain Specific Skills */}
              <div>
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block mb-1.5">
                  Domain & Official Cadre Skills ({passport.employee.domain})
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.domain.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-gov text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Professional Skills */}
              <div>
                <span className="text-[10px] font-bold text-gov-gray-500 uppercase tracking-wider block mb-1.5">
                  Professional & Governance Leadership
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {skills.professional.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-gov text-xs font-semibold bg-gov-gray-100 text-gov-gray-700 border border-gov-gray-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section: PROFESSIONAL EXPERIENCE */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 sm:p-6 shadow-gov-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-sm sm:text-base font-black text-gov-navy flex items-center gap-2">
                  <Briefcase size={17} className="text-gov-blue" />
                  <span>PROFESSIONAL EXPERIENCE & POSTINGS</span>
                </h2>
                <p className="text-xs text-gov-gray-500 mt-0.5">
                  Cadre tenure, operational round deployments, and field assignments.
                </p>
              </div>
              <span className="badge-gov-neutral text-[9px] font-bold">DEMO EXPERIENCE</span>
            </div>

            {/* Experience Timeline */}
            <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gov-gray-200">
              {experienceTimeline.map((item, idx) => (
                <div key={idx} className="relative group">
                  <span className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-white border-2 border-gov-blue group-hover:bg-gov-blue transition-colors" />

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black text-gov-navy">
                        {item.role}
                      </span>
                      <span className="text-[10px] font-bold text-gov-blue bg-gov-blue-light px-2 py-0.2 rounded">
                        {item.type}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-gov-gray-600">
                      {item.organization} · <span className="text-gov-gray-400 font-normal">{item.date}</span>
                    </p>

                    <p className="text-xs text-gov-gray-600 leading-relaxed pt-0.5">
                      {item.description}
                    </p>

                    {item.skills && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {item.skills.map((sk, sIdx) => (
                          <span key={sIdx} className="text-[10px] text-gov-gray-500 bg-gov-off-white px-2 py-0.5 rounded border border-gov-gray-200">
                            {sk}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: ACHIEVEMENTS & MILESTONES */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 sm:p-6 shadow-gov-card">
            <div className="mb-4">
              <h2 className="text-sm sm:text-base font-black text-gov-navy flex items-center gap-2">
                <Award size={17} className="text-gov-saffron" />
                <span>ACHIEVEMENTS & VERIFIED MILESTONES</span>
              </h2>
              <p className="text-xs text-gov-gray-500 mt-0.5">
                Official recognitions, completed labs, and competency benchmarks recorded on iGOT.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.id}
                  className="p-3 rounded-gov-md border border-gov-gray-200 bg-gov-off-white/40 flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-50 text-gov-saffron flex items-center justify-center shrink-0 border border-amber-200 mt-0.5">
                    <CheckCircle2 size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold text-gov-navy truncate">
                      {ach.title}
                    </h3>
                    <p className="text-[11px] text-gov-green font-semibold">
                      {ach.status}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-gov-gray-400 mt-0.5">
                      <span>{ach.category}</span>
                      <span>•</span>
                      <span>{ach.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT 1 COLUMN: Learning Journey, Next Move, Gaps, Future Roles ── */}
        <div className="space-y-6">

          {/* Section: MY LEARNING JOURNEY */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 shadow-gov-card">
            <h2 className="text-xs font-black text-gov-navy uppercase tracking-wider flex items-center gap-2 mb-3">
              <BookOpen size={15} className="text-gov-blue" />
              <span>MY LEARNING JOURNEY</span>
            </h2>

            <div className="grid grid-cols-2 gap-2.5 text-center">
              <div className="p-2.5 rounded-gov bg-gov-off-white border border-gov-gray-200">
                <span className="text-xl font-black text-gov-navy block">
                  {learningJourney.coursesCompleted}
                </span>
                <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider">
                  Courses Done
                </span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white border border-gov-gray-200">
                <span className="text-xl font-black text-gov-saffron block">
                  {learningJourney.learningHours}h
                </span>
                <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider">
                  Verified Hours
                </span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white border border-gov-gray-200">
                <span className="text-xl font-black text-gov-blue block">
                  {learningJourney.assessmentsCompleted}
                </span>
                <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider">
                  Assessments
                </span>
              </div>

              <div className="p-2.5 rounded-gov bg-gov-off-white border border-gov-gray-200">
                <span className="text-xl font-black text-gov-green block">
                  {learningJourney.competenciesImproved}
                </span>
                <span className="text-[10px] text-gov-gray-500 font-semibold uppercase tracking-wider">
                  Competencies
                </span>
              </div>
            </div>
          </div>

          {/* Section: YOUR NEXT BEST MOVE */}
          <div className="bg-gradient-to-br from-amber-50/70 to-white rounded-gov-lg border-2 border-amber-300 p-5 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-gov-saffron animate-pulse" />
              <span className="text-[10px] font-black text-gov-saffron uppercase tracking-wider">
                YOUR NEXT BEST MOVE
              </span>
            </div>

            <h3 className="text-sm font-black text-gov-navy">
              {nextAction?.actionTitle || 'Strengthen Survey Sampling'}
            </h3>

            <p className="text-xs text-gov-gray-600 mt-1 leading-relaxed">
              Current proficiency: <strong>{nextAction?.currentLevel || 61}%</strong> vs Benchmark <strong>{nextAction?.requiredLevel || 80}%</strong> ({nextAction?.gapPoints || 19} pt gap).
            </p>

            <div className="mt-3 p-2.5 rounded-gov bg-white border border-amber-200 space-y-1">
              <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                Recommended Course
              </span>
              <p className="text-xs font-bold text-gov-navy">
                {nextAction?.recommendedCourseTitle || 'Survey Sampling Fundamentals'}
              </p>
              <p className="text-[10px] text-gov-gray-500">
                Provider: {nextAction?.provider || 'iGOT Karmayogi'}
              </p>
            </div>

            <Link
              to="/explore-learning"
              className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-gov text-xs font-bold bg-gov-saffron text-white hover:bg-orange-600 shadow-xs transition-all"
            >
              <span>START NEXT LEARNING</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Section: PRIORITY DEVELOPMENT AREAS */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 shadow-gov-card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-black text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={14} className="text-gov-saffron" />
                <span>Priority Development Areas</span>
              </h2>
              <Link to="/skill-gaps" className="text-[11px] font-bold text-gov-blue hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {developmentAreas.map((area, idx) => (
                <div key={idx} className="p-3 rounded-gov border border-gov-gray-200 bg-gov-off-white/50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gov-navy truncate">
                      {area.name}
                    </span>
                    <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-gov-red-light text-gov-red border border-red-200">
                      {area.gap} pt gap
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gov-gray-500">
                    <span>Current: {area.current}%</span>
                    <span>Target: {area.target}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: YOUR FUTURE PROFESSIONAL PATH */}
          <div className="bg-white rounded-gov-lg border border-gov-gray-200 p-5 shadow-gov-card">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-black text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                <Compass size={15} className="text-gov-blue" />
                <span>FUTURE PROFESSIONAL PATH</span>
              </h2>
              <Link to="/future-role" className="text-[11px] font-bold text-gov-blue hover:underline">
                Explore Roles
              </Link>
            </div>

            <div className="p-3.5 rounded-gov border border-gov-gray-200 bg-gov-off-white/60 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                  Primary Promotion Target
                </span>
                <h4 className="text-sm font-black text-gov-navy mt-0.5">
                  {primaryFutureRole.title}
                </h4>
                <p className="text-[11px] text-gov-gray-500 mt-0.5">
                  {primaryFutureRole.cadre}
                </p>
              </div>

              {/* Future Role Readiness Gauge */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-gov-gray-600">Promotion Readiness</span>
                  <span className="text-gov-saffron">{readinessScore}%</span>
                </div>
                <div className="w-full h-2 bg-gov-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-gov-blue to-gov-saffron rounded-full"
                    style={{ width: `${readinessScore}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-gov-gray-400 pt-0.5">
                  <span>5/8 Competencies Ready</span>
                  <span>Benchmark ≥75%</span>
                </div>
              </div>

              <Link
                to="/future-role"
                className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-gov text-xs font-bold bg-white border border-gov-gray-300 text-gov-navy hover:bg-gov-gray-50 transition-all"
              >
                <span>View Promotion Pathway</span>
                <ChevronRight size={13} />
              </Link>
            </div>

            {/* Alternative Roles Available */}
            {futureRolesList.length > 1 && (
              <div className="mt-3 pt-3 border-t border-gov-gray-200 space-y-2">
                <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                  Alternative Career Tracks
                </span>
                {futureRolesList.slice(1, 3).map((r, rIdx) => (
                  <div key={rIdx} className="flex items-center justify-between text-xs p-2 rounded bg-gov-off-white">
                    <div className="truncate mr-2">
                      <p className="font-bold text-gov-navy truncate">{r.title}</p>
                      <p className="text-[10px] text-gov-gray-400">{r.cadre}</p>
                    </div>
                    <span className="text-xs font-bold text-gov-blue shrink-0">
                      {r.readinessScore || 64}% ready
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section: VERIFY PASSPORT NOTICE */}
          <div className="p-4 rounded-gov-md bg-gov-off-white border border-gov-gray-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
              Government Digital Identity Notice
            </span>
            <p className="text-[11px] text-gov-gray-500 leading-relaxed">
              This Digital Professional Passport is an internal credential generated by the iGOT Karmayogi Competency Intelligence Platform. It reflects verified competency assessments, learning completions, and official postings.
            </p>
            <div className="text-[10px] text-gov-navy font-mono font-bold pt-1">
              Doc: {passportId} · Synced
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
