import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Play,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  MessageSquare,
  Filter,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import VirtualLabWorkspace from '../components/VirtualLabWorkspace';

export default function VirtualLabsPage() {
  const { virtualLabs, selectedStream, labSubmissions } = useStream();
  const [selectedLab, setSelectedLab] = useState(null);
  const [streamFilter, setStreamFilter] = useState('all');

  const streamLabs = streamFilter === 'all'
    ? virtualLabs
    : virtualLabs.filter(l => l.streamId === streamFilter);

  // If a lab is actively open in workspace mode
  if (selectedLab) {
    return (
      <VirtualLabWorkspace
        lab={selectedLab}
        onBack={() => setSelectedLab(null)}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Page Header ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
              <Sparkles size={12} />
              <span>Realistic Work-Related Simulations</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Virtual Competency Labs
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Practice real-world government scenarios with realistic datasets, diagnostic tools, and AI evaluation. Lab performance is incorporated directly into your Competency Profile.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-gov text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Completed Labs</span>
            <span className="text-2xl font-black text-white">{Object.keys(labSubmissions).length}</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Practical Evaluated</span>
          </div>
        </div>
      </div>

      {/* ── Stream Filter Tabs ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: 'all', label: 'All Virtual Labs' },
          { id: 'stats', label: 'Statistics & Surveys', icon: '📊' },
          { id: 'it', label: 'IT & Cybersecurity', icon: '💻' },
          { id: 'finance', label: 'Finance & Audit', icon: '💰' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setStreamFilter(tab.id)}
            className={`px-3 py-2 rounded-gov font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              streamFilter === tab.id
                ? 'bg-gov-blue text-white shadow-xs'
                : 'bg-white border border-gov-gray-200 text-gov-gray-600 hover:text-gov-navy hover:bg-gov-gray-100'
            }`}
          >
            {tab.icon && <span>{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Labs Cards Grid ─────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 gap-5">
        {streamLabs.map(lab => {
          const submission = labSubmissions?.[lab.id];
          const isSelectedStream = lab.streamId === (selectedStream?.id || 'stats');

          return (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`gov-card p-5 flex flex-col justify-between hover:shadow-gov-card-hover transition-all border-2 ${
                isSelectedStream ? 'border-gov-blue/40 bg-gov-blue-light/10' : 'border-gov-gray-200'
              }`}
            >
              <div className="space-y-3">
                {/* Badges strip */}
                <div className="flex items-center justify-between gap-2">
                  <span className="badge-gov-saffron text-[10px] font-bold">{lab.badge}</span>
                  {submission ? (
                    <span className="badge-gov-success text-[10px] flex items-center gap-1 font-bold">
                      <CheckCircle size={12} /> Evaluated: {submission.results.overallPracticalScore}%
                    </span>
                  ) : (
                    <span className="badge-gov-info text-[10px] flex items-center gap-1">
                      <Clock size={11} /> {lab.duration}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-gov-navy leading-snug">{lab.title}</h3>
                  <p className="text-[11px] text-gov-gray-500 mt-0.5">
                    Dataset: <strong className="font-mono text-gov-navy">{lab.datasetName}</strong>
                  </p>
                </div>

                <p className="text-xs text-gov-gray-600 leading-relaxed">
                  {lab.scenario}
                </p>

                {/* Target Competency & Linked Resources */}
                <div className="p-3 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gov-gray-500 font-medium">Target Competency:</span>
                    <span className="font-bold text-gov-navy">{lab.targetCompetency}</span>
                  </div>
                  {lab.relatedCourse && (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gov-gray-500">Related Learning:</span>
                      <span className="text-gov-blue font-semibold truncate max-w-[200px]">{lab.relatedCourse}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-3 border-t border-gov-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gov-gray-400">
                  {lab.tasks?.length || lab.totalTasks} interactive tasks
                </span>

                <button
                  onClick={() => setSelectedLab(lab)}
                  className="btn-gov-primary text-xs px-4 py-2 flex items-center gap-1.5 shadow-xs"
                >
                  <Play size={13} />
                  <span>{submission ? 'Re-run Virtual Lab' : 'Launch Workspace'}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
