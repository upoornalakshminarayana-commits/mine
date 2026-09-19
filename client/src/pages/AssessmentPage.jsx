import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { assessmentQuestions, upcomingAssessment } from '../data/mockData';
import { ChevronLeft, ChevronRight, ClipboardCheck, CheckCircle, Clock, AlertCircle, Flag } from 'lucide-react';

function AssessmentIntro({ assessment, onStart }) {
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
      className="w-full max-w-4xl mx-auto">
      <div className="gov-card overflow-hidden">
        <div className="bg-gov-navy px-6 py-5">
          <div className="flex items-center gap-2 text-gov-saffron text-xs font-semibold uppercase tracking-wide mb-2">
            <ClipboardCheck size={12} /> Competency Assessment
          </div>
          <h1 className="text-lg font-bold text-white">{assessment.title}</h1>
          <p className="text-sm text-white/60 mt-1">{assessment.description}</p>
        </div>
        <div className="p-6 space-y-5">
          {/* Meta */}
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { label: 'Questions', value: assessment.questions },
              { label: 'Duration', value: `${assessment.duration} min` },
              { label: 'Difficulty', value: assessment.difficulty },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gov-off-white border border-gov-gray-200 rounded-gov-md p-3">
                <p className="text-base font-bold text-gov-navy">{value}</p>
                <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>

          {/* Instructions */}
          <div className="bg-gov-blue-light border border-blue-200 rounded-gov-md p-4">
            <h3 className="text-xs font-semibold text-gov-blue uppercase tracking-wide mb-2 flex items-center gap-1.5">
              <AlertCircle size={12} /> Instructions
            </h3>
            <ul className="space-y-1.5 text-xs text-gov-gray-600">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gov-blue mt-1.5 shrink-0" />Read each question carefully before selecting your answer.</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gov-blue mt-1.5 shrink-0" />You can navigate between questions using the Previous and Next buttons.</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gov-blue mt-1.5 shrink-0" />You may flag a question for review and return to it later.</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gov-blue mt-1.5 shrink-0" />Your competency profile will be updated based on your results.</li>
            </ul>
          </div>

          {/* Competencies */}
          <div>
            <p className="text-xs font-semibold text-gov-gray-600 mb-2">Competencies Assessed:</p>
            <div className="flex flex-wrap gap-2">
              {assessment.competencies.map(c => (
                <span key={c} className="badge-gov-info">{c}</span>
              ))}
            </div>
          </div>

          <button onClick={onStart} className="btn-gov-primary w-full justify-center py-3">
            <ClipboardCheck size={16} />
            Begin Assessment
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function AssessmentResult({ answers, questions }) {
  const correct = answers.filter((a, i) => a === questions[i].correct).length;
  const score = Math.round((correct / questions.length) * 100);
  const passed = score >= 60;

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.45 }}
      className="w-full max-w-4xl mx-auto">
      <div className="gov-card overflow-hidden">
        <div className={`px-6 py-8 text-center ${passed ? 'bg-gov-green' : 'bg-gov-saffron'}`}>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
            {passed ? <CheckCircle size={32} className="text-white" /> : <AlertCircle size={32} className="text-white" />}
          </div>
          <h2 className="text-2xl font-bold text-white">{score}%</h2>
          <p className="text-white/80 text-sm mt-1">{passed ? 'Assessment Passed' : 'Assessment Completed'}</p>
          <p className="text-white/60 text-xs mt-1">{correct} of {questions.length} correct</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gov-off-white border border-gov-gray-200 rounded-gov-md p-3 text-center">
              <p className="text-lg font-bold text-gov-navy">{correct}</p>
              <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Correct</p>
            </div>
            <div className="bg-gov-red-light border border-red-200 rounded-gov-md p-3 text-center">
              <p className="text-lg font-bold text-gov-red">{questions.length - correct}</p>
              <p className="text-[10px] text-gov-gray-400 uppercase tracking-wide">Incorrect</p>
            </div>
          </div>

          <div className="bg-gov-blue-light border border-blue-200 rounded-gov p-3">
            <p className="text-xs font-semibold text-gov-blue mb-1">Next Steps</p>
            <p className="text-xs text-gov-gray-600">
              {passed
                ? 'Your competency profile has been updated. Continue with the recommended learning to further improve your score.'
                : 'Review the explanations for the questions you missed, complete the recommended learning, and re-attempt the assessment.'}
            </p>
          </div>

          {/* Question review */}
          <h3 className="text-sm font-semibold text-gov-navy">Question Review</h3>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {questions.map((q, i) => {
              const isCorrect = answers[i] === q.correct;
              return (
                <div key={q.id} className={`rounded-gov-md p-3 border ${isCorrect ? 'bg-gov-green-light border-green-200' : 'bg-gov-red-light border-red-200'}`}>
                  <div className="flex items-start gap-2">
                    {isCorrect ? <CheckCircle size={14} className="text-gov-green mt-0.5 shrink-0" /> : <AlertCircle size={14} className="text-gov-red mt-0.5 shrink-0" />}
                    <div>
                      <p className="text-xs font-medium text-gov-navy">{q.text}</p>
                      {!isCorrect && (
                        <div className="mt-1.5">
                          <p className="text-[10px] text-gov-red">Your answer: {answers[i] ? q.options.find(o => o.id === answers[i])?.text : 'Not answered'}</p>
                          <p className="text-[10px] text-gov-green">Correct: {q.options.find(o => o.id === q.correct)?.text}</p>
                          <p className="text-[10px] text-gov-gray-500 mt-1 italic">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AssessmentPage() {
  const [stage, setStage] = useState('intro'); // intro | quiz | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(upcomingAssessment.duration * 60);

  const q = assessmentQuestions[current];
  const total = assessmentQuestions.length;
  const answered = Object.keys(answers).length;

  const selectAnswer = (optId) => {
    setAnswers(prev => ({ ...prev, [current]: optId }));
  };

  const handleSubmit = () => {
    const answersArr = assessmentQuestions.map((_, i) => answers[i] || null);
    setStage('result');
  };

  if (stage === 'intro') {
    return (
      <div className="w-full py-4">
        <AssessmentIntro assessment={upcomingAssessment} onStart={() => setStage('quiz')} />
      </div>
    );
  }

  if (stage === 'result') {
    const answersArr = assessmentQuestions.map((_, i) => answers[i] || null);
    return (
      <div className="w-full py-4">
        <AssessmentResult answers={answersArr} questions={assessmentQuestions} />
      </div>
    );
  }

  return (
    <div className="w-full py-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress header */}
        <div className="gov-card px-5 py-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={14} className="text-gov-blue" />
              <span className="text-xs font-semibold text-gov-navy">Data Analysis Competency Assessment</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gov-gray-400">
              <Clock size={12} className="text-gov-saffron" />
              <span className="font-medium text-gov-saffron">{Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}</span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="progress-track h-1.5">
            <div className="h-full bg-gov-blue rounded-full transition-all duration-300" style={{ width: `${((current + 1) / total) * 100}%` }} />
          </div>
          <div className="flex justify-between text-[10px] text-gov-gray-400 mt-1">
            <span>Question {current + 1} of {total}</span>
            <span>{answered} answered · {flagged.size} flagged</span>
          </div>
        </div>

        {/* Question bubbles */}
        <div className="gov-card p-4 mb-3">
          <div className="flex flex-wrap gap-1.5">
            {assessmentQuestions.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors border
                  ${i === current ? 'bg-gov-blue text-white border-gov-blue'
                  : answers[i] ? 'bg-gov-green-light text-gov-green border-green-200'
                  : flagged.has(i) ? 'bg-gov-amber-light text-gov-amber border-amber-200'
                  : 'bg-gov-gray-100 text-gov-gray-600 border-gov-gray-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-2 text-[10px] text-gov-gray-400">
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gov-green-light border border-green-200 rounded-sm inline-block" /> Answered</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gov-amber-light border border-amber-200 rounded-sm inline-block" /> Flagged</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 bg-gov-gray-100 border border-gov-gray-200 rounded-sm inline-block" /> Not Answered</span>
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div key={current}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="gov-card p-6 mb-4"
          >
            {/* Question header */}
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge-gov-info text-[10px]">{q.competency}</span>
                  <span className="badge-gov-neutral text-[10px]">{q.difficulty}</span>
                </div>
                <p className="text-sm font-medium text-gov-navy leading-relaxed">{q.text}</p>
              </div>
              <button
                onClick={() => setFlagged(prev => {
                  const s = new Set(prev);
                  s.has(current) ? s.delete(current) : s.add(current);
                  return s;
                })}
                className={`shrink-0 p-2 rounded-gov transition-colors border ${flagged.has(current) ? 'bg-gov-amber-light border-amber-200 text-gov-amber' : 'border-gov-gray-200 text-gov-gray-400 hover:border-gov-amber'}`}
                title="Flag for review"
              >
                <Flag size={13} />
              </button>
            </div>

            {/* Options */}
            <div className="space-y-2">
              {q.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => selectAnswer(opt.id)}
                  className={`w-full text-left flex items-center gap-3 px-4 py-3 rounded-gov border text-sm transition-all duration-150
                    ${answers[current] === opt.id
                      ? 'bg-gov-blue border-gov-blue text-white shadow-sm'
                      : 'bg-white border-gov-gray-200 text-gov-gray-700 hover:border-gov-blue hover:bg-gov-blue-light'
                    }`}
                >
                  <span className={`w-6 h-6 rounded-full border text-xs font-bold flex items-center justify-center shrink-0
                    ${answers[current] === opt.id ? 'border-white/40 text-white' : 'border-gov-gray-300 text-gov-gray-500'}`}>
                    {opt.id}
                  </span>
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrent(p => Math.max(0, p - 1))}
            disabled={current === 0}
            className="btn-gov-secondary text-xs py-2 px-4 disabled:opacity-50"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          <span className="text-xs text-gov-gray-400">{current + 1} / {total}</span>

          {current < total - 1 ? (
            <button
              onClick={() => setCurrent(p => Math.min(total - 1, p + 1))}
              className="btn-gov-primary text-xs py-2 px-4"
            >
              Next <ChevronRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="btn-gov-saffron text-xs py-2 px-5"
            >
              <CheckCircle size={14} /> Submit Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
