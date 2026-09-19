import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  HelpCircle,
  BookOpen,
  FlaskConical,
  X,
  Target,
  ShieldCheck,
  CheckCircle
} from 'lucide-react';
import { useStream } from '../context/StreamContext';

export default function NextBestActionCard() {
  const { domainNextBestAction, employee, departmentConfig, gapAnalysis, currentRole } = useStream();
  const [whyThisModalOpen, setWhyThisModalOpen] = useState(false);

  const topCriticalGap = gapAnalysis?.criticalGaps?.[0] || { name: domainNextBestAction?.competencyName || 'Core Competency' };
  const actionTitle = domainNextBestAction?.actionTitle || 'Strengthen Core Competency';
  const currentVal = domainNextBestAction?.currentLevel || 45;
  const requiredVal = domainNextBestAction?.requiredLevel || 75;
  const gapVal = domainNextBestAction?.gapPoints || (requiredVal - currentVal);
  const recommendedCourseTitle = domainNextBestAction?.recommendedCourseTitle || 'Civil Service Competency Course';
  const provider = domainNextBestAction?.provider || 'iGOT Karmayogi';
  const roleName = currentRole?.role || employee?.designation || 'Civil Service Officer';

  return (
    <>
      <div className="gov-card p-6 border-2 border-gov-saffron/40 bg-gradient-to-r from-gov-saffron-light/40 via-white to-gov-blue-light/30 shadow-gov-card hover:shadow-gov-card-hover transition-all relative overflow-hidden">
        {/* Background Emblem Accent */}
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-6 opacity-5 pointer-events-none text-9xl font-serif font-black text-gov-navy">
          iGOT
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            {/* Header Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gov-saffron text-white text-[11px] font-bold shadow-xs">
              <Sparkles size={13} />
              <span>Your Next Best Action</span>
            </div>

            {/* Main Action Title & Description */}
            <div>
              <h2 className="text-lg sm:text-xl font-black text-gov-navy tracking-tight">
                {actionTitle}
              </h2>
              <p className="text-xs sm:text-sm text-gov-gray-700 mt-1">
                "Your current competency is <strong>{currentVal}%</strong>, while your role requires <strong>{requiredVal}%</strong>."
              </p>
            </div>

            {/* Metrics Pill Grid */}
            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs">
              <div className="bg-white border border-gov-gray-200 px-3 py-1.5 rounded-gov shadow-xs">
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Current Level</span>
                <span className="text-sm font-bold text-gov-navy">{currentVal}%</span>
              </div>
              <div className="bg-white border border-gov-gray-200 px-3 py-1.5 rounded-gov shadow-xs">
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Required Level</span>
                <span className="text-sm font-bold text-gov-blue">{requiredVal}%</span>
              </div>
              <div className="bg-white border border-red-200 px-3 py-1.5 rounded-gov shadow-xs bg-gov-red-light/40">
                <span className="text-[10px] text-gov-red uppercase font-bold block">Competency Gap</span>
                <span className="text-sm font-bold text-gov-red">-{gapVal} percentage points</span>
              </div>
            </div>

            {/* Recommendation details */}
            <div className="pt-2 flex items-center gap-2 text-xs text-gov-gray-600">
              <span className="font-semibold text-gov-navy">Recommended Learning:</span>
              <span className="text-gov-blue font-medium underline">"{recommendedCourseTitle}"</span>
              <span className="text-gov-gray-400">·</span>
              <span className="badge-gov-info text-[10px]">Provider: {provider}</span>
            </div>
          </div>

          {/* Action CTA Buttons */}
          <div className="flex sm:flex-col items-center gap-2.5 shrink-0 w-full sm:w-auto">
            <Link
              to="/explore-learning"
              className="btn-gov-primary w-full sm:w-44 py-2.5 text-xs font-bold shadow-xs flex items-center justify-center gap-2"
            >
              <BookOpen size={14} />
              <span>Start Learning</span>
              <ArrowRight size={14} />
            </Link>

            <button
              type="button"
              onClick={() => setWhyThisModalOpen(true)}
              className="btn-gov-secondary w-full sm:w-44 py-2 text-xs font-semibold border-gov-gray-300 hover:bg-gov-gray-100 flex items-center justify-center gap-1.5"
            >
              <HelpCircle size={14} className="text-gov-gray-500" />
              <span>Why this?</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── 'Why this?' AI Recommendation Modal ────────────────────────────── */}
      <AnimatePresence>
        {whyThisModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg shadow-2xl border border-gov-gray-200 max-w-lg w-full overflow-hidden"
            >
              <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-gov-saffron" />
                  <h3 className="text-sm font-bold">AI Rationale: Next Best Action</h3>
                </div>
                <button
                  onClick={() => setWhyThisModalOpen(false)}
                  className="p-1 rounded text-white/70 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <div className="bg-gov-blue-light/50 border border-blue-200 p-3 rounded-gov space-y-1">
                  <p className="font-bold text-gov-navy">Competency Gap Identified: {topCriticalGap.name}</p>
                  <p className="text-gov-gray-700 leading-relaxed">
                    During your Diagnostic Assessment, questions testing practical stratified weight allocation and non-sampling error handling scored lower than the {requiredVal}% threshold benchmarked for <strong>{roleName}</strong>.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-bold text-gov-navy uppercase tracking-wider text-[10px]">Why Prioritize This Now?</p>
                  <ul className="space-y-2 text-gov-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-gov-green shrink-0 mt-0.5" />
                      <span><strong>Critical Role Requirement:</strong> Survey sampling accuracy directly impacts district statistical deliverables and NSS publications.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-gov-green shrink-0 mt-0.5" />
                      <span><strong>High Leverage:</strong> Closing this 33% gap will raise your overall competency from 63% to over 74%.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-gov-green shrink-0 mt-0.5" />
                      <span><strong>Interactive Practice Ready:</strong> A dedicated Virtual Lab ("District Survey Analysis") is ready for immediate practical application.</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3 border-t border-gov-gray-200 flex items-center justify-between">
                  <Link
                    to="/virtual-labs"
                    onClick={() => setWhyThisModalOpen(false)}
                    className="btn-gov-ghost text-gov-blue flex items-center gap-1"
                  >
                    <FlaskConical size={14} />
                    <span>Practice in Virtual Lab</span>
                  </Link>
                  <Link
                    to="/explore-learning"
                    onClick={() => setWhyThisModalOpen(false)}
                    className="btn-gov-primary text-xs"
                  >
                    <span>Start Course</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
