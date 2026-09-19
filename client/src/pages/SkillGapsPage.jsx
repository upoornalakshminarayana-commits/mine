import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Target,
  BookOpen,
  FlaskConical,
  MessageSquare,
  ClipboardCheck,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function SkillGapsPage() {
  const { gapAnalysis, employee, departmentConfig, domainCourses, domainTasks } = useStream();
  const [filterSeverity, setFilterSeverity] = useState('all');

  const roleTitle = departmentConfig?.roleConfig?.title || employee?.designation || 'Civil Service Officer';
  const courses = domainCourses || [];
  const tasks = domainTasks || [];

  // Dynamically derive all gaps from role-specific gapAnalysis
  const allGaps = (gapAnalysis?.criticalGaps || gapAnalysis?.developingGaps)
    ? [
        ...(gapAnalysis.criticalGaps || []).map((g, idx) => {
          const matchedCourse = courses.find(c => (c.competencyName || c.competency || '').toLowerCase() === (g.name || '').toLowerCase()) || courses[0];
          const matchedTask = tasks.find(t => (t.competencyTarget || t.targetCompetency || '').toLowerCase() === (g.name || '').toLowerCase()) || tasks[0];
          return {
            id: `crit-gap-${idx}`,
            skill: g.name,
            severity: 'CRITICAL',
            current: g.current,
            required: g.required,
            gap: g.gap,
            reason: `Mandatory operational competency for ${roleTitle} in ${departmentConfig?.name || 'Department'}. A gap of ${g.gap}% must be remediated to meet benchmark.`,
            recommendedCourse: matchedCourse?.title || 'Core Competency Course',
            courseProvider: matchedCourse?.provider || 'iGOT Karmayogi',
            relatedLab: matchedTask?.title || 'Departmental Simulation Lab',
            relatedDiscussion: `Best practices for ${g.name} field implementation`,
            reassessmentStatus: 'Available after Coursework Completion',
            reassessmentUnlocked: true,
            estimatedWeeks: Math.max(2, Math.ceil(g.gap / 10)),
          };
        }),
        ...(gapAnalysis.developingGaps || []).map((g, idx) => {
          const matchedCourse = courses.find(c => (c.competencyName || c.competency || '').toLowerCase() === (g.name || '').toLowerCase()) || courses[idx % courses.length];
          const matchedTask = tasks.find(t => (t.competencyTarget || t.targetCompetency || '').toLowerCase() === (g.name || '').toLowerCase()) || tasks[idx % tasks.length];
          return {
            id: `dev-gap-${idx}`,
            skill: g.name,
            severity: g.gap > 15 ? 'HIGH' : 'MEDIUM',
            current: g.current,
            required: g.required,
            gap: g.gap,
            reason: `Operational competency for ${roleTitle}. Requires ongoing skill enhancement to reach advanced proficiency.`,
            recommendedCourse: matchedCourse?.title || 'Advanced Methodology Course',
            courseProvider: matchedCourse?.provider || 'iGOT / TPAC',
            relatedLab: matchedTask?.title || 'Departmental Simulation Lab',
            relatedDiscussion: `Practical guidelines for ${g.name}`,
            reassessmentStatus: 'Ready for Re-Assessment',
            reassessmentUnlocked: true,
            estimatedWeeks: Math.max(1, Math.ceil(g.gap / 10)),
          };
        }),
      ]
    : [
        {
          id: 'gap-default-1',
          skill: departmentConfig?.competencies[0]?.name || 'Core Domain Competency',
          severity: 'CRITICAL',
          current: 45,
          required: 80,
          gap: 35,
          reason: `Mandatory operational competency for ${roleTitle} under ${departmentConfig?.name || 'Department'}.`,
          recommendedCourse: courses[0]?.title || 'Fundamentals Course',
          courseProvider: 'iGOT Karmayogi',
          relatedLab: tasks[0]?.title || 'Simulation Lab',
          relatedDiscussion: 'Handling field inconsistencies',
          reassessmentStatus: 'Available Now',
          reassessmentUnlocked: true,
          estimatedWeeks: 3,
        }
      ];

  const criticalCount = allGaps.filter(g => g.severity === 'CRITICAL').length;
  const highCount = allGaps.filter(g => g.severity === 'HIGH').length;
  const mediumCount = allGaps.filter(g => g.severity === 'MEDIUM').length;

  const filteredGaps = filterSeverity === 'all'
    ? allGaps
    : allGaps.filter(g => g.severity.toLowerCase() === filterSeverity.toLowerCase());

  return (
    <div className="space-y-6 w-full">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <AlertTriangle size={12} />
              <span>AI Diagnostic & Gap Remediation · {departmentConfig?.shortName || 'Department'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Identified Skill Gaps & Action Plans
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Prioritized competency gaps derived from your {departmentConfig?.name} diagnostic assessment. Each gap links directly to recommended courses, interactive simulation labs, and peer discussions.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 border border-white/20 p-4 rounded-gov-md backdrop-blur-xs text-center shrink-0">
            <div>
              <span className="text-[10px] text-white/60 uppercase font-bold block">Critical</span>
              <span className="text-2xl font-black text-red-300">{criticalCount}</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <span className="text-[10px] text-white/60 uppercase font-bold block">High</span>
              <span className="text-2xl font-black text-amber-300">{highCount}</span>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div>
              <span className="text-[10px] text-white/60 uppercase font-bold block">Medium</span>
              <span className="text-2xl font-black text-blue-200">{mediumCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Severity Filters ─────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gov-gray-500 font-bold uppercase tracking-wider text-[10px] mr-1">
          Severity Filter:
        </span>
        {[
          { id: 'all', label: 'All Skill Gaps (3)' },
          { id: 'critical', label: 'Critical Only (1)', color: 'text-gov-red' },
          { id: 'high', label: 'High Priority (1)', color: 'text-gov-amber' },
          { id: 'medium', label: 'Medium Priority (1)', color: 'text-gov-blue' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterSeverity(tab.id)}
            className={`px-3 py-1.5 rounded-gov font-semibold transition-all ${
              filterSeverity === tab.id
                ? 'bg-gov-blue text-white shadow-xs'
                : 'bg-white border border-gov-gray-200 text-gov-gray-600 hover:bg-gov-gray-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Detailed Skill Gap Cards ────────────────────────────────────────── */}
      <div className="space-y-5">
        {filteredGaps.map(gap => {
          const isCrit = gap.severity === 'CRITICAL';
          const isHigh = gap.severity === 'HIGH';

          return (
            <motion.div
              key={gap.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`gov-card p-6 border-l-4 transition-all shadow-xs ${
                isCrit
                  ? 'border-l-gov-red bg-gov-red-light/10'
                  : isHigh
                  ? 'border-l-gov-amber bg-gov-amber-light/10'
                  : 'border-l-gov-blue bg-gov-blue-light/10'
              }`}
            >
              <div className="space-y-4">
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-gov-gray-200 pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      isCrit
                        ? 'bg-gov-red text-white'
                        : isHigh
                        ? 'bg-gov-amber text-white'
                        : 'bg-gov-blue text-white'
                    }`}>
                      {gap.severity} GAP
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-gov-navy">{gap.skill}</h2>
                  </div>

                  {/* Numerical Indicators */}
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-gov-gray-400 block font-semibold">Current / Target</span>
                      <strong className="text-sm font-bold text-gov-navy">{gap.current}% / {gap.required}%</strong>
                    </div>
                    <div className="h-6 w-px bg-gov-gray-200" />
                    <div>
                      <span className="text-[10px] text-gov-red block font-semibold">Deficit</span>
                      <strong className="text-sm font-bold text-gov-red">-{gap.gap}% Gap</strong>
                    </div>
                  </div>
                </div>

                {/* Reason Explanation */}
                <div className="space-y-1 text-xs">
                  <p className="font-bold text-gov-navy uppercase tracking-wider text-[10px]">Operational Justification:</p>
                  <p className="text-gov-gray-700 leading-relaxed bg-white p-3 rounded-gov border border-gov-gray-200">
                    {gap.reason}
                  </p>
                </div>

                {/* Connected Remediation Grid (Prompt Requirement: Connected Ecosystem) */}
                <div className="grid sm:grid-cols-3 gap-3 text-xs pt-1">
                  
                  {/* 1. Recommended Course */}
                  <div className="p-3.5 bg-white border border-gov-gray-200 rounded-gov flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gov-saffron uppercase tracking-wider flex items-center gap-1">
                        <BookOpen size={11} /> Recommended Course
                      </span>
                      <p className="font-bold text-gov-navy leading-snug">{gap.recommendedCourse}</p>
                      <p className="text-[10px] text-gov-gray-400">{gap.courseProvider}</p>
                    </div>
                    <Link
                      to="/explore-learning"
                      className="btn-gov-ghost text-gov-blue text-xs p-0 flex items-center gap-1 font-semibold hover:underline"
                    >
                      <span>Start Learning</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* 2. Related Virtual Lab */}
                  <div className="p-3.5 bg-white border border-gov-gray-200 rounded-gov flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gov-green uppercase tracking-wider flex items-center gap-1">
                        <FlaskConical size={11} /> Practice in Lab
                      </span>
                      <p className="font-bold text-gov-navy leading-snug">{gap.relatedLab}</p>
                      <p className="text-[10px] text-gov-gray-400">Interactive Scenario Workspace</p>
                    </div>
                    <Link
                      to="/virtual-labs"
                      className="btn-gov-ghost text-gov-green text-xs p-0 flex items-center gap-1 font-semibold hover:underline"
                    >
                      <span>Launch Lab</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* 3. Related Peer Discussion */}
                  <div className="p-3.5 bg-white border border-gov-gray-200 rounded-gov flex flex-col justify-between space-y-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-gov-blue uppercase tracking-wider flex items-center gap-1">
                        <MessageSquare size={11} /> Peer Discussions
                      </span>
                      <p className="font-bold text-gov-navy leading-snug truncate">{gap.relatedDiscussion}</p>
                      <p className="text-[10px] text-gov-gray-400">Community Answers Available</p>
                    </div>
                    <Link
                      to="/discussions"
                      className="btn-gov-ghost text-gov-blue text-xs p-0 flex items-center gap-1 font-semibold hover:underline"
                    >
                      <span>Join Forum</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>

                {/* Bottom Re-Assessment Status Strip */}
                <div className="pt-2 border-t border-gov-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gov-gray-500 font-medium">Reassessment Eligibility:</span>
                    <span className={`badge-gov-${gap.reassessmentUnlocked ? 'success' : 'neutral'} text-[10px] font-bold`}>
                      {gap.reassessmentStatus}
                    </span>
                  </div>

                  <Link
                    to="/assessments"
                    className="btn-gov-secondary text-xs py-1.5 px-3 flex items-center gap-1 font-semibold"
                  >
                    <ClipboardCheck size={13} />
                    <span>View Re-assessment Schedule</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
