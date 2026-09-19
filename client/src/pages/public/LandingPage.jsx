import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Target, TrendingUp, BookOpen, Zap, BarChart2, Shield, ChevronRight,
  CheckCircle, ArrowRight, Users, Award, Brain, Map, Database
} from 'lucide-react';
import { Button } from '../../components/ui';

function clsx(...args) { return args.filter(Boolean).join(' '); }

const STATS = [
  { label: 'Government Learners', value: '10,000+', icon: Users },
  { label: 'Competency Domains', value: '12+', icon: Target },
  { label: 'Learning Resources', value: '500+', icon: BookOpen },
  { label: 'AI-Generated Questions', value: '25,000+', icon: Brain },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Create Your Profile', desc: 'Register and complete a structured onboarding to capture your current skills, role, department, and learning goals.', icon: Users },
  { step: '02', title: 'AI Competency Assessment', desc: 'Take adaptive assessments that evaluate your proficiency across statistical domains, data management, and analysis skills.', icon: Brain },
  { step: '03', title: 'Identify Skill Gaps', desc: 'The AI engine compares your current competency against role requirements and generates a detailed gap analysis with priority areas.', icon: Target },
  { step: '04', title: 'Personalized Learning Path', desc: 'Receive curated learning recommendations from both internal content and the iGOT Karmayogi ecosystem based on your specific gaps.', icon: Map },
  { step: '05', title: 'Learn & Take Quizzes', desc: 'Engage with courses, documents, and AI-generated MCQ quizzes built from actual learning material to reinforce understanding.', icon: BookOpen },
  { step: '06', title: 'Measure Improvement', desc: 'Re-assess regularly to track competency growth, close gaps, and see your learning journey reflected in an updated profile.', icon: TrendingUp },
];

const FEATURES = [
  {
    icon: Brain,
    title: 'AI Competency Assessment',
    desc: 'Adaptive assessments covering statistical sciences, data management, survey methodology, and policy analysis — mapped to your specific role.',
    color: 'text-primary-600 bg-primary-50',
  },
  {
    icon: Target,
    title: 'Intelligent Skill-Gap Analysis',
    desc: 'Real-time comparison of current competency against role requirements with severity ratings, priority indicators, and AI-generated explanations.',
    color: 'text-sky-600 bg-sky-50',
  },
  {
    icon: Zap,
    title: 'Personalized Recommendations',
    desc: 'The recommendation engine considers your role, gaps, performance history, and interests to suggest the most impactful next learning steps.',
    color: 'text-warning-600 bg-warning-50',
  },
  {
    icon: Database,
    title: 'AI MCQ Generation',
    desc: 'Administrators upload PDF/DOCX documents and the AI engine generates contextually accurate MCQs for the question bank — with mandatory human review.',
    color: 'text-success-600 bg-success-50',
  },
  {
    icon: BarChart2,
    title: 'Learning Analytics',
    desc: 'Comprehensive dashboards for learners tracking competency growth and for administrators monitoring organization-wide skill development trends.',
    color: 'text-navy-900 bg-navy-50',
  },
  {
    icon: Shield,
    title: 'iGOT Karmayogi Integration',
    desc: 'Abstraction layer for seamless integration with the iGOT ecosystem — internal content and official government learning resources in one platform.',
    color: 'text-primary-700 bg-primary-50',
  },
];

const FAQ_ITEMS = [
  { q: 'What is KarmaSiksha?', a: 'KarmaSiksha is an AI-enabled competency development platform built for India\'s Official Statistical System. It assesses competencies, identifies skill gaps, recommends personalized learning, and transforms content into assessments.' },
  { q: 'How does the AI skill-gap analysis work?', a: 'The AI engine compares your self-assessment and verified assessment scores against the competency requirements of your role. It returns structured gap data with severity, priority, and specific recommended actions.' },
  { q: 'What is the AI MCQ generation workflow?', a: 'Administrators upload a PDF or document. The platform extracts text, sends it to the AI service, and generates MCQs. All generated questions receive AI_GENERATED status and require admin review and approval before being published to the question bank.' },
  { q: 'How is the iGOT integration handled?', a: 'KarmaSiksha includes an integration abstraction layer for the iGOT Karmayogi ecosystem. When official API credentials are available, real iGOT courses are fetched. In development, clearly-labeled mock iGOT content is shown.' },
  { q: 'How are competency levels defined?', a: 'The platform uses a configurable five-level scale: Foundation → Beginner → Intermediate → Advanced → Expert. Administrators can define required levels for each skill at each role level.' },
  { q: 'Is the admin role determination done in the frontend?', a: 'No. Role-based access control is enforced entirely on the backend. The frontend only redirects for UX purposes — every protected API is independently verified on the server.' },
];

export default function LandingPage() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div>
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-primary-900 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
        </div>

        <div className="w-full px-4 sm:px-6 lg:px-8 relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium">MoSPI · DIID · Smart Education Initiative</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 text-balance">
              Build Skills.{' '}
              <span className="text-primary-300">Close Gaps.</span>{' '}
              Keep Growing.
            </h1>

            <p className="text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mb-10 text-balance leading-relaxed">
              An intelligent learning platform that assesses competencies, identifies skill gaps, 
              recommends personalized learning, and transforms learning content into meaningful assessments.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {isAuthenticated ? (
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="btn-xl btn-primary bg-white text-primary-700 hover:bg-slate-100"
                >
                  Go to Dashboard <ArrowRight size={18} />
                </Link>
              ) : (
                <>
                  <Link to="/register" className="btn-xl btn-primary bg-white text-primary-700 hover:bg-slate-100">
                    Start Your Learning Journey <ArrowRight size={18} />
                  </Link>
                  <Link to="/how-it-works" className="btn-xl btn-secondary border-white/30 text-white hover:bg-white/10">
                    Explore the Platform
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <Icon size={20} className="text-primary-300 mx-auto mb-2" />
                <p className="text-2xl font-bold text-white">{value}</p>
                <p className="text-xs text-slate-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY COMPETENCY-BASED LEARNING ────────────────────────────────── */}
      <section className="section bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge-primary text-xs mb-4 inline-block">Why Competency-Based Learning</span>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                From "trained" to genuinely competent
              </h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Traditional training programs measure attendance. Competency-based learning measures 
                what matters: whether a learner can actually apply knowledge in their role.
              </p>
              <ul className="space-y-3">
                {[
                  'Identify precise skill gaps — not general training needs',
                  'Recommend learning that directly addresses performance gaps',
                  'Measure actual competency improvement — not just hours logged',
                  'Build a continuous learning culture driven by data',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-success-500 mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-6 text-center">The Competency Loop</h3>
              {[
                { label: 'User Profile', color: 'bg-primary-600' },
                { label: 'Competency Assessment', color: 'bg-sky-600' },
                { label: 'AI Skill-Gap Analysis', color: 'bg-warning-500' },
                { label: 'Personalized Learning Path', color: 'bg-success-600' },
                { label: 'Course & Content', color: 'bg-primary-600' },
                { label: 'AI-Generated Quiz', color: 'bg-sky-600' },
                { label: 'Updated Competency Profile', color: 'bg-success-600' },
              ].map((step, i) => (
                <div key={step.label} className="flex items-center gap-3 mb-2">
                  <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0', step.color)}>
                    {i + 1}
                  </div>
                  <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700">
                    {step.label}
                  </div>
                  {i < 6 && <ChevronRight size={14} className="text-slate-400 shrink-0 rotate-90" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="section bg-slate-50">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-primary text-xs mb-4 inline-block">How It Works</span>
            <h2 className="text-3xl font-bold text-slate-900">From profile to progress in six steps</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">A systematic, AI-driven approach to closing competency gaps in India's statistical workforce.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="card card-body group hover:shadow-card-hover transition-shadow duration-200">
                <div className="flex items-start gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400">{step}</span>
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mt-1 group-hover:bg-primary-100 transition-colors">
                      <Icon size={20} className="text-primary-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">{title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="section bg-white">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="badge-primary text-xs mb-4 inline-block">Platform Features</span>
            <h2 className="text-3xl font-bold text-slate-900">Everything you need for competency development</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card card-body hover:shadow-card-hover transition-shadow duration-200">
                <div className={clsx('w-10 h-10 rounded-xl flex items-center justify-center mb-4', color)}>
                  <Icon size={20} />
                </div>
                <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="section bg-slate-50">
        <div className="w-full px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <span className="badge-primary text-xs mb-4 inline-block">FAQ</span>
            <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map(({ q, a }) => (
              <details key={q} className="card group open:shadow-card">
                <summary className="flex items-center justify-between p-5 cursor-pointer font-medium text-slate-800 hover:text-primary-700 transition-colors list-none">
                  {q}
                  <ChevronRight size={16} className="shrink-0 text-slate-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="section bg-primary-900 text-white">
        <div className="w-full px-4 sm:px-6 lg:px-8 text-center">
          <Award size={40} className="text-primary-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-white mb-3">Ready to start your learning journey?</h2>
          <p className="text-primary-200 mb-8 max-w-xl mx-auto">
            Join government officers across India in building the competencies that matter for the Official Statistical System.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/register" className="btn-xl btn-primary bg-white text-primary-700 hover:bg-slate-100">
              Get Started Today <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-xl btn-secondary border-white/30 text-white hover:bg-white/10">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
