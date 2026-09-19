import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ClipboardCheck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Lock,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  X,
  Target,
  FlaskConical,
  ShieldCheck
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { STREAM_QUESTIONS } from '../data/streamData';

export default function AssessmentsPage() {
  const {
    gapAnalysis,
    selectedStream,
    currentRole,
    labSubmissions,
    submitAssessment,
  } = useStream();

  const [activeTestModal, setActiveTestModal] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  const streamId = selectedStream?.id || 'stats';
  const questions = STREAM_QUESTIONS[streamId] || STREAM_QUESTIONS.stats;

  const assessmentsList = [
    {
      id: 'initial',
      title: 'Role-Specific Diagnostic Competency Assessment',
      type: 'Diagnostic Benchmark',
      description: 'Comprehensive baseline assessment across all 5 core blueprint competencies mapped to your department and current role.',
      duration: '20 mins',
      status: 'completed',
      score: `${gapAnalysis?.overallScore || 63}%`,
      badge: '✓ Evaluated',
      badgeClass: 'badge-gov-success',
      actionLabel: 'Diagnostic Report',
      actionPath: '/diagnostic',
      secondaryActionLabel: 'Launch Role Test',
      secondaryActionPath: '/assessment',
    },
    {
      id: 'skill-gap',
      title: 'Targeted Skill Gap Assessment: Survey Sampling',
      type: 'Adaptive Skill Test',
      description: 'Focused evaluation testing stratified random sampling formulas, optimum allocation, and NSS design weights.',
      duration: '15 mins',
      status: 'available',
      score: 'Available',
      badge: '▶ Available',
      badgeClass: 'badge-gov-info',
      actionLabel: 'Take Test Now',
      isInteractive: true,
    },
    {
      id: 'virtual-lab-eval',
      title: 'Virtual Lab Practical Evaluation: District Survey Analysis',
      type: 'Practical Scenario',
      description: 'Evaluates hands-on dataset cleaning, anomaly detection, coefficient of variation, and official reporting.',
      duration: '30 mins',
      status: labSubmissions?.['lab-stats-01'] ? 'completed' : 'available',
      score: labSubmissions?.['lab-stats-01'] ? `${labSubmissions['lab-stats-01'].results.overallPracticalScore}%` : 'Not Taken',
      badge: labSubmissions?.['lab-stats-01'] ? '✓ Evaluated' : '▶ Available',
      badgeClass: labSubmissions?.['lab-stats-01'] ? 'badge-gov-success' : 'badge-gov-info',
      actionLabel: labSubmissions?.['lab-stats-01'] ? 'Review Practical Lab' : 'Start Virtual Lab',
      actionPath: '/virtual-labs',
    },
    {
      id: 'reassessment',
      title: 'Official Competency Re-Assessment & SSO Certification',
      type: 'Formal Promotion Re-Assessment',
      description: 'Final certification assessment required to officially elevate your competency benchmark to 80%+ for Senior Statistical Officer elevation.',
      duration: '45 mins',
      status: 'locked',
      score: 'Locked',
      badge: '🔒 Locked',
      badgeClass: 'badge-gov-neutral',
      actionLabel: 'Locked (Complete iGOT Coursework)',
      lockedNote: 'Unlocks after completing 100% of "Fundamentals of Survey Sampling" and submitting Virtual Lab findings.',
    },
  ];

  // Start Interactive Quiz
  const handleStartTest = () => {
    setActiveQuestionIndex(0);
    setSelectedAnswers({});
    setTestResult(null);
    setActiveTestModal(true);
  };

  // Submit Interactive Quiz
  const handleFinishQuiz = () => {
    let correct = 0;
    const testQuestions = questions.slice(0, 5);
    testQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) correct++;
    });

    const calculatedScore = Math.round((correct / testQuestions.length) * 100);
    setTestResult({
      correct,
      total: testQuestions.length,
      score: calculatedScore,
    });
  };

  return (
    <div className="space-y-6 w-full">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <ClipboardCheck size={12} />
              <span>National Competency Evaluation Node</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Assessments & Diagnostic Hub
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Track initial baseline diagnostics, targeted skill gap tests, interactive practical lab evaluations, and official promotion re-assessments.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 p-4 rounded-gov text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Current Score</span>
            <span className="text-3xl font-black text-gov-saffron">{gapAnalysis?.overallScore || 63}%</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Benchmark: 80%</span>
          </div>
        </div>
      </div>

      {/* ── Assessment Status Summary ────────────────────────────────────────── */}
      <div className="grid sm:grid-cols-3 gap-4 text-xs">
        <div className="gov-card p-4 border-l-4 border-l-gov-green bg-gov-green-light/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gov-green uppercase">Completed</span>
            <p className="text-lg font-black text-gov-navy">1 Diagnostic + 1 Lab</p>
          </div>
          <CheckCircle size={24} className="text-gov-green" />
        </div>

        <div className="gov-card p-4 border-l-4 border-l-gov-blue bg-gov-blue-light/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gov-blue uppercase">Available Now</span>
            <p className="text-lg font-black text-gov-navy">1 Skill Gap Test</p>
          </div>
          <Play size={24} className="text-gov-blue" />
        </div>

        <div className="gov-card p-4 border-l-4 border-l-gov-amber bg-gov-amber-light/20 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-gov-amber uppercase">Upcoming / Reassessment</span>
            <p className="text-lg font-black text-gov-navy">Target 80% Threshold</p>
          </div>
          <RotateCcw size={24} className="text-gov-amber" />
        </div>
      </div>

      {/* ── Assessments Cards List ───────────────────────────────────────────── */}
      <div className="space-y-4">
        {assessmentsList.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`gov-card p-5 border-l-4 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
              item.status === 'completed'
                ? 'border-l-gov-green bg-white'
                : item.status === 'available'
                ? 'border-l-gov-blue bg-gov-blue-light/10'
                : 'border-l-gov-gray-300 bg-gov-off-white/80 opacity-75'
            }`}
          >
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={item.badgeClass}>{item.badge}</span>
                <span className="badge-gov-neutral text-[10px]">{item.type}</span>
                <span className="text-[11px] text-gov-gray-400 flex items-center gap-1">
                  <Clock size={11} /> {item.duration}
                </span>
              </div>

              <h3 className="text-base font-bold text-gov-navy">{item.title}</h3>
              <p className="text-xs text-gov-gray-600 leading-relaxed">{item.description}</p>

              {item.lockedNote && (
                <p className="text-[11px] text-gov-amber font-medium flex items-center gap-1 pt-1">
                  <Lock size={12} /> {item.lockedNote}
                </p>
              )}
            </div>

            {/* Action Side */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gov-gray-100">
              <div className="text-left sm:text-right">
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Evaluation Score</span>
                <strong className="text-sm font-bold text-gov-navy">{item.score}</strong>
              </div>

              {item.isInteractive ? (
                <button
                  onClick={handleStartTest}
                  className="btn-gov-primary text-xs py-2 px-4 shadow-xs flex items-center gap-1.5"
                >
                  <Play size={13} />
                  <span>{item.actionLabel}</span>
                </button>
              ) : item.actionPath ? (
                <div className="flex items-center gap-2 flex-wrap">
                  <Link
                    to={item.actionPath}
                    className="btn-gov-secondary text-xs py-2 px-3 shadow-xs flex items-center gap-1"
                  >
                    <span>{item.actionLabel}</span>
                    <ChevronRight size={13} />
                  </Link>
                  {item.secondaryActionPath && (
                    <Link
                      to={item.secondaryActionPath}
                      className="btn-gov-saffron text-xs py-2 px-3 shadow-xs flex items-center gap-1 font-semibold"
                    >
                      <RotateCcw size={12} />
                      <span>{item.secondaryActionLabel}</span>
                    </Link>
                  )}
                </div>
              ) : (
                <button
                  disabled
                  className="btn-gov-ghost text-xs py-2 px-4 text-gov-gray-400 cursor-not-allowed border border-gov-gray-200"
                >
                  <Lock size={12} className="mr-1" />
                  <span>Locked</span>
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Interactive Mini Test Modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {activeTestModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gov-navy/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-gov-lg shadow-2xl border border-gov-gray-200 max-w-xl w-full overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 bg-gov-navy text-white flex items-center justify-between">
                <div>
                  <span className="badge-gov-saffron text-[9px] font-bold uppercase">Skill Gap Test</span>
                  <h3 className="text-sm font-bold text-white mt-0.5">Survey Sampling & Design (5 Questions)</h3>
                </div>
                <button onClick={() => setActiveTestModal(false)} className="p-1 text-white/70 hover:text-white">
                  <X size={18} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4 text-xs">
                {!testResult ? (
                  <>
                    <div className="flex items-center justify-between text-[11px] text-gov-gray-500 border-b border-gov-gray-200 pb-2">
                      <span>Question {activeQuestionIndex + 1} of 5</span>
                      <span>Competency: {questions[activeQuestionIndex]?.competency}</span>
                    </div>

                    <p className="text-sm font-bold text-gov-navy leading-snug">
                      {questions[activeQuestionIndex]?.text}
                    </p>

                    <div className="space-y-2 pt-2">
                      {questions[activeQuestionIndex]?.options.map(opt => (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedAnswers(prev => ({ ...prev, [activeQuestionIndex]: opt.id }))}
                          className={`w-full p-3 rounded-gov border text-left flex items-center gap-3 transition-all ${
                            selectedAnswers[activeQuestionIndex] === opt.id
                              ? 'bg-gov-blue-light border-gov-blue font-bold text-gov-blue'
                              : 'bg-gov-off-white border-gov-gray-200 text-gov-gray-700 hover:border-gov-blue'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                            selectedAnswers[activeQuestionIndex] === opt.id
                              ? 'bg-gov-blue text-white border-gov-blue'
                              : 'border-gov-gray-300 text-gov-gray-500'
                          }`}>
                            {opt.id}
                          </span>
                          <span>{opt.text}</span>
                        </button>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-gov-gray-200 flex items-center justify-between">
                      <button
                        disabled={activeQuestionIndex === 0}
                        onClick={() => setActiveQuestionIndex(prev => prev - 1)}
                        className="btn-gov-secondary text-xs py-1.5 px-3 disabled:opacity-30"
                      >
                        Previous
                      </button>

                      {activeQuestionIndex < 4 ? (
                        <button
                          disabled={!selectedAnswers[activeQuestionIndex]}
                          onClick={() => setActiveQuestionIndex(prev => prev + 1)}
                          className="btn-gov-primary text-xs py-1.5 px-4"
                        >
                          Next Question →
                        </button>
                      ) : (
                        <button
                          disabled={!selectedAnswers[activeQuestionIndex]}
                          onClick={handleFinishQuiz}
                          className="btn-gov-saffron text-xs py-1.5 px-4 font-bold"
                        >
                          Submit Test
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4 space-y-4">
                    <div className="w-14 h-14 rounded-full bg-gov-green-light border-2 border-gov-green mx-auto flex items-center justify-center text-gov-green">
                      <CheckCircle size={28} />
                    </div>

                    <div>
                      <h4 className="text-base font-black text-gov-navy">Test Evaluation Complete</h4>
                      <p className="text-2xl font-black text-gov-blue mt-1">{testResult.score}%</p>
                      <p className="text-xs text-gov-gray-600 mt-1">
                        You answered {testResult.correct} of {testResult.total} questions correctly.
                      </p>
                    </div>

                    <div className="p-3 bg-gov-blue-light/50 rounded-gov text-xs text-gov-navy text-left space-y-1">
                      <p className="font-bold text-gov-saffron">Competency Update Notice:</p>
                      <p className="text-gov-gray-700 leading-relaxed">
                        Your performance shows improvement in stratified allocation! Practice the District Survey Virtual Lab to solidify your practical application skills.
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveTestModal(false)}
                      className="btn-gov-primary text-xs w-full py-2.5"
                    >
                      Close & Return to Assessments
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
