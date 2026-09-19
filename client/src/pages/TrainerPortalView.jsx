import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  BookOpen,
  FileText,
  Sparkles,
  CheckCircle2,
  Upload,
  Plus,
  ArrowRight,
  Clock,
  Layers,
  ChevronLeft,
  Filter,
  Eye,
  Check,
  X
} from 'lucide-react';
import GovernmentHeader from '../components/GovernmentHeader';
import GovernmentFooter from '../components/GovernmentFooter';
import PreDashboardLayout from '../components/layout/PreDashboardLayout';

export default function TrainerPortalView({ onBackToPortals }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview | courses | materials | questions

  const trainerStats = [
    { title: 'PUBLISHED COURSES', value: '6', sub: 'iGOT Karmayogi Synced', icon: BookOpen, color: 'text-gov-blue', border: 'border-l-gov-blue' },
    { title: 'TRAINING MATERIALS', value: '14', sub: 'PDF & DOCX Parsed', icon: FileText, color: 'text-gov-saffron', border: 'border-l-gov-saffron' },
    { title: 'AI-GENERATED MCQS', value: '48', sub: 'Ready for Review', icon: Sparkles, color: 'text-purple-600', border: 'border-l-purple-600' },
    { title: 'APPROVED QUESTIONS', value: '124', sub: 'Active in Bank', icon: CheckCircle2, color: 'text-gov-green', border: 'border-l-gov-green' },
  ];

  const recentMaterials = [
    { id: 'mat-01', title: 'National Sample Survey 78th Round - Operational Manual.pdf', size: '4.2 MB', pages: 64, date: '16 Sep 2026', status: 'PROCESSED', questionsCount: 15 },
    { id: 'mat-02', title: 'Guidelines on Consumer Price Index Revision.docx', size: '1.8 MB', pages: 28, date: '14 Sep 2026', status: 'PROCESSED', questionsCount: 10 },
    { id: 'mat-03', title: 'Data Quality Auditing in District Surveys.pdf', size: '3.1 MB', pages: 42, date: '10 Sep 2026', status: 'PROCESSED', questionsCount: 12 },
  ];

  const questionsForReview = [
    {
      id: 'q-rev-1',
      question: 'Which sampling technique is most appropriate when district population strata exhibit high internal variance?',
      source: 'NSS 78th Round Operational Manual (Page 18)',
      difficulty: 'Intermediate',
      competency: 'Survey Sampling',
      status: 'AI_GENERATED',
    },
    {
      id: 'q-rev-2',
      question: 'Under MoSPI guidelines, how are missing values in urban household consumption expenditure treated before computing CV?',
      source: 'Data Quality Auditing in District Surveys (Page 12)',
      difficulty: 'Advanced',
      competency: 'Data Quality & Validation',
      status: 'AI_GENERATED',
    },
  ];

  const trainerHeader = (
    <header className="bg-gov-navy text-white text-xs border-b border-white/10 w-full shadow-xs">
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green w-full" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gov-saffron flex items-center justify-center font-bold text-white text-xs shadow-xs">
            <GraduationCap size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white leading-tight">Trainer & Faculty Portal</h1>
              <span className="badge-gov-saffron text-[9px] font-bold">NSSTA / iGOT Karmayogi Studio</span>
            </div>
            <p className="text-[10px] text-white/70">Course Management, Material Upload & AI Question Generation</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortals}
            className="flex items-center gap-1 text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded text-xs font-semibold border border-white/20 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back to Portals</span>
          </button>
        </div>
      </div>
    </header>
  );

  const trainerFooter = (
    <footer className="w-full bg-white border-t border-gov-gray-200 py-3 px-4 sm:px-6 lg:px-8 text-center text-xs text-gov-gray-500 shrink-0">
      <p>© {new Date().getFullYear()} National Statistical Systems Training Academy (NSSTA) & iGOT Karmayogi</p>
    </footer>
  );

  return (
    <PreDashboardLayout header={trainerHeader} footer={trainerFooter}>
      {/* ── Main Trainer Workspace ────────────────────────────────────────── */}
      <main className="w-full flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gov-gray-200 pb-3">
          {[
            { id: 'overview', label: 'Faculty Overview', icon: GraduationCap },
            { id: 'courses', label: 'Course Management', icon: BookOpen },
            { id: 'materials', label: 'Training Materials & Upload', icon: FileText },
            { id: 'questions', label: 'AI Question Bank & Approval', icon: Sparkles },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-gov text-xs font-bold transition-all ${
                  active
                    ? 'bg-gov-navy text-white shadow-xs'
                    : 'bg-white text-gov-gray-600 hover:bg-gov-gray-100 border border-gov-gray-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trainerStats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.title} className={`gov-card p-4 border-l-4 ${st.border} flex items-start justify-between`}>
                <div>
                  <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider">{st.title}</span>
                  <p className="text-2xl font-black text-gov-navy mt-1">{st.value}</p>
                  <p className="text-xs text-gov-gray-500 mt-0.5">{st.sub}</p>
                </div>
                <div className="w-8 h-8 rounded-gov bg-gov-off-white flex items-center justify-center">
                  <Icon size={16} className={st.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left 2 Cols: Material Upload & AI Question Generation */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Upload Zone */}
            <div className="gov-card p-6 border-2 border-dashed border-gov-blue/40 bg-gov-blue-light/20 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-gov-blue-light flex items-center justify-center text-gov-blue shadow-xs">
                <Upload size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-gov-navy">Upload Learning Material for AI Question Generation</h3>
                <p className="text-xs text-gov-gray-600 mt-1">Supports PDF and Word (.docx) documents up to 25MB</p>
              </div>
              <div className="flex items-center gap-3">
                <label className="btn-gov-primary text-xs py-2 px-4 cursor-pointer">
                  <span>Browse Document</span>
                  <input type="file" className="hidden" accept=".pdf,.docx,.doc" />
                </label>
                <span className="text-xs text-gov-gray-400">or drop file here</span>
              </div>
            </div>

            {/* Uploaded Materials Table */}
            <div className="gov-card overflow-hidden">
              <div className="p-4 border-b border-gov-gray-200 flex items-center justify-between bg-gov-off-white">
                <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
                  <FileText size={15} className="text-gov-saffron" />
                  Processed Training Materials
                </h3>
                <span className="text-xs text-gov-gray-500">{recentMaterials.length} Documents</span>
              </div>

              <div className="divide-y divide-gov-gray-200">
                {recentMaterials.map((mat) => (
                  <div key={mat.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gov-gray-50 transition-colors">
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-xs font-bold text-gov-navy truncate">{mat.title}</p>
                      <div className="flex items-center gap-3 text-[11px] text-gov-gray-400">
                        <span>{mat.size}</span>
                        <span>·</span>
                        <span>{mat.pages} Pages</span>
                        <span>·</span>
                        <span className="badge-gov-success text-[9px]">{mat.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-semibold text-gov-blue">{mat.questionsCount} MCQs Generated</span>
                      <button className="btn-gov-secondary text-xs py-1 px-2.5">
                        <Eye size={12} />
                        <span>Review</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Col: AI Questions Pending Approval */}
          <div className="space-y-6">
            <div className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
                <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} className="text-purple-600" />
                  AI MCQs Pending Approval
                </h3>
                <span className="badge-gov-saffron text-[9px]">Review Gate</span>
              </div>

              <p className="text-xs text-gov-gray-600 leading-relaxed">
                In adherence to government standards, all AI-generated questions require trainer review and approval before entering the active question bank.
              </p>

              <div className="space-y-3">
                {questionsForReview.map((q) => (
                  <div key={q.id} className="p-3 bg-gov-off-white rounded-gov border border-gov-gray-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="badge-gov-info text-[9px]">{q.competency}</span>
                      <span className="text-gov-gray-400">{q.difficulty}</span>
                    </div>
                    <p className="font-semibold text-gov-navy leading-snug">{q.question}</p>
                    <p className="text-[10px] text-gov-gray-400 italic">Source: {q.source}</p>
                    <div className="flex items-center gap-2 pt-1">
                      <button className="flex-1 py-1 bg-gov-green text-white rounded text-[11px] font-bold flex items-center justify-center gap-1">
                        <Check size={12} /> Approve
                      </button>
                      <button className="py-1 px-2.5 bg-gov-red/10 hover:bg-gov-red/20 text-gov-red rounded text-[11px] font-bold">
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </main>
    </PreDashboardLayout>
  );
}
