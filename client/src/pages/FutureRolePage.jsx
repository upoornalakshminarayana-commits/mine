import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Compass,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Sparkles,
  Target,
  Clock,
  BookOpen,
  FlaskConical,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { FUTURE_ROLE_DATA } from '../data/portalData';

export default function FutureRolePage() {
  const { employee, departmentConfig, domainFutureRoles, gapAnalysis } = useStream();

  const primaryRole = domainFutureRoles?.[0] || {
    title: departmentConfig?.roleConfig?.targetRoleTitle || 'Senior Officer',
    readinessScore: 68,
    status: 'Primary Promotion Target',
    eligibility: '3 years regular service + benchmark score ≥75%',
    mandatoryCompetencies: ['Core Domain Specialization (≥80%)'],
    description: 'Leads departmental analytical execution and approves official statistical releases.',
  };

  const readinessScore = primaryRole.readinessScore || employee?.futureRoleReadiness || 68;

  // Derive competencies from gapAnalysis or departmentConfig
  const comps = gapAnalysis?.competencyBreakdown || departmentConfig?.competencies?.map(c => ({
    name: c.name,
    current: 55,
    required: c.requiredProficiency,
    category: 'developing',
    notes: `Official benchmark required for elevation to ${primaryRole.title}.`,
  })) || [];

  return (
    <div className="space-y-6 w-full">
      {/* ── Header Strip ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Compass size={12} />
              <span>Career Transition & Cadre Succession · {departmentConfig?.shortName || 'Department'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Future Role Readiness & Promotion Pathway
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Track your competency readiness against the official civil service qualification framework for your next designated rank in <strong>{departmentConfig?.name}</strong>.
            </p>
          </div>

          {/* Role Readiness Score */}
          <div className="bg-white/10 border border-white/20 p-5 rounded-gov-md backdrop-blur-xs text-center shrink-0 min-w-[200px]">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Future Role Readiness</span>
            <span className="text-4xl font-black text-gov-saffron">{readinessScore}%</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-1">
              Target: {primaryRole.title}
            </span>
          </div>
        </div>
      </div>

      {/* ── Career Transition Ladder Visualizer ──────────────────────────────── */}
      <div className="gov-card p-6 border-2 border-gov-blue/30 shadow-xs bg-white">
        <h2 className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target size={15} className="text-gov-blue" />
          Cadre Promotion Ladder & Progression · {departmentConfig?.roleConfig?.cadre || 'Civil Service Cadre'}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gov-off-white rounded-gov border border-gov-gray-200">
          {/* Current Role */}
          <div className="text-center md:text-left flex-1">
            <span className="badge-gov-info text-[9px] uppercase font-bold">Current Designation</span>
            <h3 className="text-base font-bold text-gov-navy mt-1">{departmentConfig?.roleConfig?.title || employee?.designation}</h3>
            <p className="text-xs text-gov-gray-500 font-mono">{departmentConfig?.roleConfig?.payLevel || 'Level 7'} · {departmentConfig?.name}</p>
          </div>

          {/* Flow Arrow */}
          <div className="flex items-center gap-2 text-gov-saffron font-bold text-xs bg-white px-3 py-1.5 rounded-full border border-gov-gray-200 shadow-xs">
            <span>Promotion Transition</span>
            <ArrowRight size={14} />
          </div>

          {/* Target Role */}
          <div className="text-center md:text-right flex-1">
            <span className="badge-gov-saffron text-[9px] uppercase font-bold">Target Next Role</span>
            <h3 className="text-base font-bold text-gov-navy mt-1">{primaryRole.title}</h3>
            <p className="text-xs text-gov-gray-500 font-mono">{departmentConfig?.roleConfig?.targetPayLevel || 'Level 8'} · Gazetted Rank</p>
          </div>
        </div>

        <p className="text-[11px] text-gov-gray-500 mt-3 flex items-center gap-1.5">
          <Clock size={12} className="text-gov-gray-400" />
          <span>Eligibility Requirement: {primaryRole.eligibility}</span>
        </p>
      </div>

      {/* ── Department Future Roles Pathways ─────────────────────────────────── */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-gov-navy">
          Recognized Career Pathways in {departmentConfig?.name}
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {(domainFutureRoles || []).map((role, idx) => (
            <div
              key={role.id || idx}
              className={`gov-card p-4.5 border-t-4 ${
                idx === 0
                  ? 'border-t-gov-saffron bg-gradient-to-b from-gov-saffron-light/20 to-white'
                  : 'border-t-gov-blue bg-white'
              } space-y-3`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-gov-gray-400">
                    {role.status}
                  </span>
                  <h3 className="text-sm font-black text-gov-navy mt-0.5">{role.title}</h3>
                  <p className="text-[11px] text-gov-blue font-semibold">{role.payScale}</p>
                </div>
                <span className="badge-gov-info text-xs font-bold shrink-0">
                  {role.readinessScore}%
                </span>
              </div>
              <p className="text-xs text-gov-gray-600 leading-relaxed">
                {role.description}
              </p>
              <div className="pt-2 border-t border-gov-gray-100">
                <span className="text-[10px] font-bold uppercase text-gov-gray-400 block mb-1">
                  Mandatory Competencies
                </span>
                <div className="flex flex-wrap gap-1">
                  {role.mandatoryCompetencies?.map(mc => (
                    <span key={mc} className="badge-gov-neutral text-[10px]">
                      {mc}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Required Competencies Checklist ─────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gov-navy">
              Target Role Competency Requirements Breakdown
            </h2>
            <p className="text-xs text-gov-gray-400">
              Official competency benchmarks required for elevation to {primaryRole.title}.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-gov-green font-semibold">✓ Met</span>
            <span className="flex items-center gap-1 text-gov-amber font-semibold">⚠ Developing</span>
            <span className="flex items-center gap-1 text-gov-red font-semibold">🔴 Critical Gap</span>
          </div>
        </div>

        <div className="space-y-3">
          {comps.map((comp) => {
            const isMet = comp.current >= comp.required;
            const isCritical = (comp.required - comp.current) >= 25 || comp.current < 50;

            return (
              <div
                key={comp.name}
                className={`gov-card p-4.5 border-l-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isMet
                    ? 'border-l-gov-green bg-gov-green-light/20'
                    : isCritical
                    ? 'border-l-gov-red bg-gov-red-light/20'
                    : 'border-l-gov-amber bg-gov-amber-light/20'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gov-navy">{comp.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      isMet
                        ? 'bg-gov-green text-white'
                        : isCritical
                        ? 'bg-gov-red text-white'
                        : 'bg-gov-amber text-white'
                    }`}>
                      {isMet ? 'Requirement Met ✓' : isCritical ? 'Critical Gap 🔴' : 'Developing ⚠️'}
                    </span>
                  </div>
                  <p className="text-xs text-gov-gray-600">
                    {isMet
                      ? `Proficiency benchmark satisfied for ${primaryRole.title}.`
                      : `A gap of ${Math.max(0, comp.required - comp.current)}% must be remediated through approved coursework.`}
                  </p>
                </div>

                {/* Scores & Progress */}
                <div className="flex items-center gap-6 text-xs shrink-0 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Current / Required</span>
                    <strong className="text-sm font-bold text-gov-navy">{comp.current}% / {comp.required}%</strong>
                  </div>

                  <Link
                    to={isMet ? '/explore-learning' : '/skill-gaps'}
                    className={`btn-gov-${isMet ? 'ghost' : 'secondary'} text-xs py-1.5 px-3`}
                  >
                    <span>{isMet ? 'View Courses' : 'Remediate Gap'}</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
