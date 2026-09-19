import { motion } from 'framer-motion';
import CompetencyCard from '../components/CompetencyCard';
import CompetencyRadar from '../components/CompetencyRadar';
import SkillGapCard from '../components/SkillGapCard';
import AIInsightCard from '../components/AIInsightCard';
import GrowthChart from '../components/GrowthChart';
import { competencies as defaultCompetencies, skillGaps as defaultGaps, employee } from '../data/mockData';
import { useStream } from '../context/StreamContext';
import { CheckCircle, AlertTriangle, XCircle, Download, RefreshCw, RotateCcw } from 'lucide-react';

const STATUS_COUNTS = (comps) => ({
  achieved: comps.filter(c => c.status === 'achieved').length,
  developing: comps.filter(c => c.status === 'developing').length,
  gap: comps.filter(c => c.status === 'gap').length,
});

export default function CompetenciesPage() {
  let streamCtx = null;
  try {
    streamCtx = useStream();
  } catch {
    // fallback
  }

  const selectedStream = streamCtx?.selectedStream;
  const departmentConfig = streamCtx?.departmentConfig;
  const gapAnalysis = streamCtx?.gapAnalysis;
  const roleInfo = streamCtx?.currentRole || {
    role: streamCtx?.employee?.designation || employee.role,
    department: streamCtx?.employee?.department || employee.department,
  };

  // Dynamic competencies formatted for CompetencyCard
  const dynamicCompetencies = gapAnalysis?.competencyBreakdown ? gapAnalysis.competencyBreakdown.map((c, idx) => ({
    id: `comp-${idx}`,
    name: c.name,
    current: c.current,
    required: c.required,
    status: c.category === 'strong' ? 'achieved' : c.category === 'critical' ? 'gap' : 'developing',
    trend: c.gap > 0 ? +4 : +7,
    lastUpdated: '2026-09-16',
  })) : defaultCompetencies;

  // Dynamic skill gaps
  const dynamicGaps = gapAnalysis?.criticalGaps && gapAnalysis?.developingGaps ? [
    ...gapAnalysis.criticalGaps.map((g, idx) => ({
      id: `gap-crit-${idx}`,
      skill: g.name,
      current: g.current,
      required: g.required,
      gap: g.gap,
      severity: 'high',
      reason: `Mandatory competency for ${roleInfo.role}. Required to achieve full operational proficiency under standard government guidelines.`,
      recommendedCourses: 2,
      estimatedWeeks: 4,
    })),
    ...gapAnalysis.developingGaps.map((g, idx) => ({
      id: `gap-dev-${idx}`,
      skill: g.name,
      current: g.current,
      required: g.required,
      gap: g.gap,
      severity: 'medium',
      reason: `Important developmental competency to enhance speed and precision in departmental deliverables.`,
      recommendedCourses: 1,
      estimatedWeeks: 2,
    })),
  ] : defaultGaps;

  const counts = STATUS_COUNTS(dynamicCompetencies);

  return (
    <div className="w-full space-y-8">
      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-gov-saffron text-xs">
                {departmentConfig?.icon || '🏛️'} {departmentConfig?.name || selectedStream?.name} · {departmentConfig?.competenciesContext || 'Official Blueprint'}
              </span>
            </div>
            <h1 className="text-xl font-bold text-gov-navy">My Competency Profile</h1>
            <p className="text-sm text-gov-gray-400 mt-1">
              Understand your current competency level across {departmentConfig?.competenciesContext || 'role competencies'} against the requirements of your role.
            </p>
            <p className="text-xs text-gov-gray-400 mt-0.5">
              Role: <strong className="text-gov-navy">{roleInfo.role}</strong> ·
              Department: <strong className="text-gov-navy">{roleInfo.department}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => streamCtx?.setOnboardingStep('stream_selection')}
              className="btn-gov-ghost text-xs py-1.5 px-3"
            >
              <RotateCcw size={12} /> Change Stream
            </button>
            <button className="btn-gov-secondary text-xs py-1.5 px-3">
              <Download size={12} /> Download Report
            </button>
          </div>
        </div>
      </motion.div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-3 gap-3"
      >
        {[
          { icon: CheckCircle, label: 'Achieved / Strong', count: counts.achieved, color: 'text-gov-green', bg: 'bg-gov-green-light border-green-200' },
          { icon: AlertTriangle, label: 'Developing', count: counts.developing, color: 'text-gov-amber', bg: 'bg-gov-amber-light border-amber-200' },
          { icon: XCircle, label: 'Critical Gaps', count: counts.gap, color: 'text-gov-red', bg: 'bg-gov-red-light border-red-200' },
        ].map(({ icon: Icon, label, count, color, bg }) => (
          <div key={label} className={`gov-card border ${bg} p-4 flex items-center gap-3`}>
            <div className={`w-9 h-9 rounded-gov ${bg} flex items-center justify-center`}>
              <Icon size={18} className={color} />
            </div>
            <div>
              <p className="text-xl font-bold text-gov-navy">{count}</p>
              <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">{label}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Radar + Growth charts */}
      <div className="grid md:grid-cols-2 gap-5">
        <CompetencyRadar />
        <GrowthChart />
      </div>

      {/* All competency cards */}
      <section>
        <div className="border-l-4 border-l-gov-saffron pl-3 mb-5">
          <h2 className="text-base font-semibold text-gov-navy">All Competencies ({dynamicCompetencies.length})</h2>
          <p className="text-xs text-gov-gray-400">Detailed view of each competency domain for {selectedStream?.name || 'your stream'}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dynamicCompetencies.map((c, i) => (
            <CompetencyCard key={c.id} competency={c} index={i} />
          ))}
        </div>
      </section>

      {/* Skill Gaps */}
      <section>
        <div className="border-l-4 border-l-gov-red pl-3 mb-5">
          <h2 className="text-base font-semibold text-gov-navy">Identified Skill Gaps ({dynamicGaps.length})</h2>
          <p className="text-xs text-gov-gray-400">Priority areas where your current level is below role requirements</p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {dynamicGaps.map((gap, i) => (
            <SkillGapCard key={gap.id} gap={gap} index={i} />
          ))}
        </div>
      </section>

      {/* AI Insight */}
      <section>
        <div className="border-l-4 border-l-gov-blue pl-3 mb-5">
          <h2 className="text-base font-semibold text-gov-navy">AI Competency Insight</h2>
          <p className="text-xs text-gov-gray-400">Automated diagnostic analysis for {selectedStream?.name || 'your stream'}</p>
        </div>
        <AIInsightCard />
      </section>
    </div>
  );
}
