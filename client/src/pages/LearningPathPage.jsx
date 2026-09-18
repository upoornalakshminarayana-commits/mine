import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Map,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  FlaskConical,
  ClipboardCheck,
  Award,
  ArrowRight,
  Sparkles,
  Play,
  RotateCcw
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function LearningPathPage() {
  const { employee, selectedStream } = useStream();

  // Step-by-step personalized learning path sequence
  const pathSteps = [
    {
      step: 1,
      title: 'Skill Gap Identified',
      subtitle: 'Survey Sampling (42% vs required 75%)',
      desc: 'Diagnostic assessment identified 33% gap in stratified probability allocation.',
      status: 'completed',
      icon: AlertTriangle,
      badge: 'Completed 16 Sep',
      actionLabel: 'View Diagnostic',
      actionPath: '/skill-gaps',
    },
    {
      step: 2,
      title: 'Fundamentals Learning',
      subtitle: 'Fundamentals of Survey Sampling (iGOT)',
      desc: 'Core probability distributions, sampling frames, and sampling error formulas.',
      status: 'completed',
      icon: BookOpen,
      badge: 'Completed 18 Sep',
      actionLabel: 'Review Notes',
      actionPath: '/explore-learning',
    },
    {
      step: 3,
      title: 'Intermediate Coursework',
      subtitle: 'Stratification & Cluster Sampling (Module 3-4)',
      desc: 'Optimal allocation techniques and non-sampling error handling.',
      status: 'active',
      icon: Sparkles,
      badge: 'Current Step (65% Progress)',
      actionLabel: 'Resume Course',
      actionPath: '/explore-learning',
    },
    {
      step: 4,
      title: 'Virtual Lab Practice',
      subtitle: 'District Survey Analysis Lab',
      desc: 'Hands-on practice: clean survey CSV dataset, calculate CV, and draft official summary.',
      status: 'completed',
      icon: FlaskConical,
      badge: 'Score: 69%',
      actionLabel: 'View Evaluation',
      actionPath: '/virtual-labs',
    },
    {
      step: 5,
      title: 'Practical Lab Assessment',
      subtitle: 'Sampling Simulator & Error Verification',
      desc: 'Scenario-based evaluation of design effects and sample weights.',
      status: 'upcoming',
      icon: ClipboardCheck,
      badge: 'Next Step',
      actionLabel: 'Open Lab',
      actionPath: '/virtual-labs',
    },
    {
      step: 6,
      title: 'Official Re-Assessment',
      subtitle: 'Survey Sampling Competency Re-Evaluation',
      desc: 'Formal 15-question proctored re-assessment to certify 75%+ threshold.',
      status: 'locked',
      icon: RotateCcw,
      badge: 'Scheduled for 23 Sep',
      actionLabel: 'View Schedule',
      actionPath: '/assessments',
    },
    {
      step: 7,
      title: 'Skill Gap Closed & Certified',
      subtitle: 'MoSPI Certified Survey Specialist Badge',
      desc: 'Official digital credential issued to your iGOT profile; qualifies for SSO promotion.',
      status: 'locked',
      icon: Award,
      badge: 'Target Milestone',
      actionLabel: 'View Certificate Criteria',
      actionPath: '/certificates',
    },
  ];

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Map size={12} />
              <span>Personalized Remediation Roadmap</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Visual Personalized Learning Path
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Step-by-step pathway to systematically close your priority skill gap in <strong>Survey Sampling & Design</strong> through blended learning, virtual labs, and verified re-assessments.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-gov-md backdrop-blur-xs text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Path Progress</span>
            <span className="text-3xl font-black text-gov-saffron">3 / 7</span>
            <span className="text-[10px] text-white/80 block mt-0.5">Steps Accomplished</span>
          </div>
        </div>
      </div>

      {/* ── Path Summary Ribbon ─────────────────────────────────────────────── */}
      <div className="gov-card p-4 bg-gov-off-white border border-gov-gray-200 overflow-x-auto">
        <div className="flex items-center min-w-[700px] justify-between text-xs font-bold text-gov-navy">
          <span className="text-gov-green flex items-center gap-1">✓ Skill Gap</span>
          <span>→</span>
          <span className="text-gov-green flex items-center gap-1">✓ Fundamentals</span>
          <span>→</span>
          <span className="text-gov-blue flex items-center gap-1">▶ Intermediate Learning</span>
          <span>→</span>
          <span className="text-gov-green flex items-center gap-1">✓ Virtual Lab</span>
          <span>→</span>
          <span className="text-gov-gray-500">Assessment</span>
          <span>→</span>
          <span className="text-gov-gray-400">Reassessment</span>
          <span>→</span>
          <span className="text-gov-gray-400">Skill Gap Closed</span>
        </div>
      </div>

      {/* ── Detailed Timeline Steps ─────────────────────────────────────────── */}
      <div className="space-y-4">
        {pathSteps.map((step, idx) => {
          const isDone = step.status === 'completed';
          const isActive = step.status === 'active';
          const isLocked = step.status === 'locked';
          const Icon = step.icon;

          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`gov-card p-5 border-l-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isActive
                  ? 'border-l-gov-saffron bg-gov-saffron-light/20 shadow-md ring-1 ring-gov-saffron/30'
                  : isDone
                  ? 'border-l-gov-green bg-gov-green-light/20'
                  : isLocked
                  ? 'border-l-gov-gray-300 bg-gov-off-white opacity-70'
                  : 'border-l-gov-blue bg-white'
              }`}
            >
              <div className="flex items-start gap-3.5 flex-1">
                {/* Step indicator circle */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                    isDone
                      ? 'bg-gov-green text-white shadow-xs'
                      : isActive
                      ? 'bg-gov-saffron text-white shadow-md animate-pulse'
                      : isLocked
                      ? 'bg-gov-gray-200 text-gov-gray-500'
                      : 'bg-gov-blue text-white'
                  }`}
                >
                  {isDone ? '✓' : step.step}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-bold text-gov-navy">{step.title}</span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-gov-green text-white'
                          : isActive
                          ? 'bg-gov-saffron text-white'
                          : isLocked
                          ? 'bg-gov-gray-200 text-gov-gray-600'
                          : 'bg-gov-blue text-white'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-gov-navy/80">{step.subtitle}</p>
                  <p className="text-xs text-gov-gray-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>

              {/* Action Button */}
              <div className="shrink-0 w-full sm:w-auto flex justify-end">
                <Link
                  to={step.actionPath}
                  className={`btn-gov-${isActive ? 'saffron' : isDone ? 'secondary' : 'ghost'} text-xs py-2 px-4 shadow-xs`}
                >
                  <span>{step.actionLabel}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
