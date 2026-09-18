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
  const { employee, selectedStream } = useStream();

  const data = FUTURE_ROLE_DATA;

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Header Strip ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Compass size={12} />
              <span>Career Transition & Succession Planning</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Future Role Readiness & Promotion Pathway
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Track your competency readiness against the official qualification framework for your next designated career rank in the civil service.
            </p>
          </div>

          {/* Role Readiness Score */}
          <div className="bg-white/10 border border-white/20 p-5 rounded-gov-md backdrop-blur-xs text-center shrink-0 min-w-[200px]">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Future Role Readiness</span>
            <span className="text-4xl font-black text-gov-saffron">{data.readinessScore}%</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-1">
              Near Ready (1 Critical Gap)
            </span>
          </div>
        </div>
      </div>

      {/* ── Career Transition Ladder Visualizer ──────────────────────────────── */}
      <div className="gov-card p-6 border-2 border-gov-blue/30 shadow-xs bg-white">
        <h2 className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target size={15} className="text-gov-blue" />
          Cadre Promotion Ladder & Progression
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 bg-gov-off-white rounded-gov border border-gov-gray-200">
          {/* Current Role */}
          <div className="text-center md:text-left flex-1">
            <span className="badge-gov-info text-[9px] uppercase font-bold">Current Designation</span>
            <h3 className="text-base font-bold text-gov-navy mt-1">{data.currentRole}</h3>
            <p className="text-xs text-gov-gray-500 font-mono">{data.currentRoleCode} · {data.department}</p>
          </div>

          {/* Flow Arrow */}
          <div className="flex items-center gap-2 text-gov-saffron font-bold text-xs bg-white px-3 py-1.5 rounded-full border border-gov-gray-200 shadow-xs">
            <span>Promotion Transition</span>
            <ArrowRight size={14} />
          </div>

          {/* Target Role */}
          <div className="text-center md:text-right flex-1">
            <span className="badge-gov-saffron text-[9px] uppercase font-bold">Target Next Role</span>
            <h3 className="text-base font-bold text-gov-navy mt-1">{data.targetRole}</h3>
            <p className="text-xs text-gov-gray-500 font-mono">{data.targetRoleCode} · Gazetted</p>
          </div>
        </div>

        <p className="text-[11px] text-gov-gray-500 mt-3 flex items-center gap-1.5">
          <Clock size={12} className="text-gov-gray-400" />
          <span>{data.promotionTimeline}</span>
        </p>
      </div>

      {/* ── Required Competencies Checklist ─────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-gov-navy">
              Target Role Competency Requirements Breakdown
            </h2>
            <p className="text-xs text-gov-gray-400">
              Official competency benchmarks required for elevation to {data.targetRole}.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-gov-green font-semibold">✓ Met</span>
            <span className="flex items-center gap-1 text-gov-amber font-semibold">⚠ Developing</span>
            <span className="flex items-center gap-1 text-gov-red font-semibold">🔴 Critical Gap</span>
          </div>
        </div>

        <div className="space-y-3">
          {data.requiredCompetencies.map((comp) => {
            const isMet = comp.status === 'met';
            const isCritical = comp.status === 'critical';

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
                  <p className="text-xs text-gov-gray-600">{comp.note}</p>
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
                    <span>{isMet ? 'View Advanced' : 'Close Gap'}</span>
                    <ChevronRight size={12} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Structured Promotion Roadmap Steps ───────────────────────────────── */}
      <div className="gov-card p-6 space-y-4">
        <h2 className="text-sm font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
          <Sparkles size={16} className="text-gov-saffron" />
          Official Roadmap to Reach 80%+ Readiness
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {data.milestones.map((m) => (
            <div
              key={m.step}
              className={`p-4 rounded-gov border space-y-2 ${
                m.status === 'in_progress'
                  ? 'bg-gov-blue-light/40 border-blue-300'
                  : m.status === 'locked'
                  ? 'bg-gov-gray-100 border-gov-gray-200 opacity-70'
                  : 'bg-gov-off-white border-gov-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-gov-navy uppercase tracking-wider">
                  Step {m.step} · {m.due}
                </span>
                <span className={`badge-gov-${m.status === 'in_progress' ? 'info' : 'neutral'} text-[9px]`}>
                  {m.status === 'in_progress' ? 'Active Focus' : m.status === 'locked' ? 'Locked' : 'Scheduled'}
                </span>
              </div>
              <h4 className="text-xs font-bold text-gov-navy">{m.title}</h4>
              <p className="text-[11px] text-gov-gray-600 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
