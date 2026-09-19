import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Play,
  CheckCircle,
  Clock,
  Target,
  Sparkles,
  BookOpen,
  Filter,
  ArrowRight,
  ShieldAlert,
  Search,
  RefreshCw,
  LayoutDashboard,
  Layers,
  Award
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import VirtualLabWorkspace from '../components/VirtualLabWorkspace';
import VirtualLabsErrorBoundary from '../components/VirtualLabsErrorBoundary';
import { getDepartmentVirtualLabs, getVirtualLabById } from '../data/departmentVirtualLabs';

function VirtualLabsContent() {
  const { virtualLabs, labSubmissions, departmentConfig, domainTasks, employee } = useStream();
  const { labId } = useParams();
  const navigate = useNavigate();

  const [selectedLab, setSelectedLab] = useState(null);
  const [streamFilter, setStreamFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState(null);

  // 1. Department-aware prototype labs tailored to active employee
  const currentDeptLabs = getDepartmentVirtualLabs(employee?.id || 'demo-employee-01') || [];

  // 2. Department practical simulation tasks from domainTasks (if any additional)
  const deptSimulations = (domainTasks && domainTasks.length > 0)
    ? domainTasks.map(t => ({
        id: t.id,
        title: t.title,
        badge: `${departmentConfig?.shortName || 'Gov'} Simulation`,
        duration: `${t.estimatedMinutes || 25} mins`,
        datasetName: t.datasetName || 'department_survey_frame.csv',
        scenario: t.scenario,
        targetCompetency: t.competencyTarget,
        competencies: [t.competencyTarget],
        relatedCourse: `${t.competencyTarget} Core Modules`,
        totalTasks: 4,
        difficulty: t.difficulty || 'Intermediate',
        deliverables: t.deliverables,
        sampleDataset: currentDeptLabs[0]?.sampleDataset || [],
        defaultEvaluation: currentDeptLabs[0]?.defaultEvaluation || {
          dataCleaning: 80,
          statisticalReasoning: 75,
          dataInterpretation: 78,
          visualization: 80,
          reportWriting: 80,
          overallPracticalScore: 78,
          keyGapTakeaway: 'Practical execution is consistent with departmental benchmarks.',
        },
      }))
    : [];

  // Combine unique labs safely
  const rawLabs = [...currentDeptLabs];
  // Add any legacy or custom labs that do not conflict
  for (const sim of deptSimulations) {
    if (!rawLabs.some(l => l.id === sim.id)) {
      rawLabs.push(sim);
    }
  }
  for (const vLab of (virtualLabs || [])) {
    if (!rawLabs.some(l => l.id === vLab.id)) {
      rawLabs.push(vLab);
    }
  }

  // Handle direct URL /:labId or route params
  useEffect(() => {
    if (labId) {
      const match = rawLabs.find(l => l.id === labId) || getVirtualLabById(labId);
      if (match) {
        setSelectedLab(match);
      }
    } else {
      setSelectedLab(null);
    }
  }, [labId, rawLabs]);

  // Filter labs by stream category and search text
  const filteredLabs = rawLabs.filter(lab => {
    // Stream filter
    if (streamFilter !== 'all') {
      const matchesStream =
        lab.streamId === streamFilter ||
        (streamFilter === 'stats' && (lab.competencies?.some(c => c.toLowerCase().includes('stat') || c.toLowerCase().includes('survey')) || lab.targetCompetency?.toLowerCase().includes('stat'))) ||
        (streamFilter === 'it' && (lab.streamId === 'it' || lab.targetCompetency?.toLowerCase().includes('cyber') || lab.targetCompetency?.toLowerCase().includes('it'))) ||
        (streamFilter === 'finance' && (lab.streamId === 'finance' || lab.targetCompetency?.toLowerCase().includes('budget') || lab.targetCompetency?.toLowerCase().includes('audit')));

      if (!matchesStream) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchTitle = lab.title?.toLowerCase().includes(query);
      const matchScenario = lab.scenario?.toLowerCase().includes(query);
      const matchCompetency = lab.targetCompetency?.toLowerCase().includes(query) || lab.competencies?.some(c => c.toLowerCase().includes(query));
      const matchDataset = lab.datasetName?.toLowerCase().includes(query);
      if (!matchTitle && !matchScenario && !matchCompetency && !matchDataset) {
        return false;
      }
    }

    return true;
  });

  // Action: Launch a Lab Workspace
  const handleLaunchLab = (lab) => {
    setSelectedLab(lab);
    navigate(`/virtual-labs/${lab.id}`);
  };

  // Action: Exit Lab Workspace back to catalog
  const handleBackToLabs = () => {
    setSelectedLab(null);
    navigate('/virtual-labs');
  };

  // ── Error State (Section 15) ────────────────────────────────────────────────
  if (loadError) {
    return (
      <div className="w-full min-h-[360px] flex items-center justify-center p-6 bg-gov-off-white">
        <div className="gov-card max-w-md w-full p-8 text-center bg-white border border-gov-gray-200 shadow-gov-card rounded-gov-lg space-y-4">
          <div className="w-14 h-14 rounded-full bg-gov-red/10 text-gov-red flex items-center justify-center mx-auto ring-8 ring-gov-red/5">
            <ShieldAlert size={28} />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-black text-gov-navy">Unable to load Virtual Labs</h2>
            <p className="text-xs text-gov-gray-600 leading-relaxed">
              The learning laboratory service is currently unavailable. Please try again.
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setLoadError(null)}
              className="btn-gov-primary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>Retry</span>
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="btn-gov-secondary px-4 py-2 text-xs flex items-center gap-1.5"
            >
              <LayoutDashboard size={13} />
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Loading Skeleton State (Section 13) ──────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6 w-full animate-pulse">
        <div className="gov-card p-6 bg-gov-navy/10 rounded-gov-md h-36 flex flex-col justify-center">
          <div className="h-4 bg-gov-navy/20 rounded w-1/4 mb-3"></div>
          <div className="h-6 bg-gov-navy/20 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gov-navy/20 rounded w-2/3"></div>
        </div>
        <div className="text-center py-4">
          <p className="text-xs font-semibold text-gov-blue">
            Virtual Labs: Loading your personalized laboratories...
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="gov-card p-5 h-64 bg-white border border-gov-gray-200 rounded-gov-md space-y-4">
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              <div className="h-5 bg-gray-200 rounded w-3/4"></div>
              <div className="h-12 bg-gray-100 rounded w-full"></div>
              <div className="h-10 bg-gray-100 rounded w-full"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── If a lab is actively open in workspace mode (Section 16 & 17) ────────────
  if (selectedLab) {
    return (
      <VirtualLabWorkspace
        lab={selectedLab}
        onBack={handleBackToLabs}
      />
    );
  }

  // ── Virtual Labs Catalog View ───────────────────────────────────────────────
  return (
    <div className="space-y-6 w-full">
      {/* ── Page Header ──────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden shadow-gov-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-gov-saffron text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide">
              <Sparkles size={12} />
              <span>Personalized Laboratory Environment · {departmentConfig?.name || 'Department of Official Statistics'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Virtual Competency Labs
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Interactive workplace simulations with authentic domain datasets, diagnostic analysis tools, and AI evaluation calibrated for <strong>{employee?.designation || departmentConfig?.roleConfig?.title || 'Civil Service Cadre'}</strong>.
            </p>
          </div>

          <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-gov text-center shrink-0 backdrop-blur-xs">
            <span className="text-[10px] text-white/70 uppercase font-bold block tracking-wider">Completed Labs</span>
            <span className="text-2xl font-black text-white">{Object.keys(labSubmissions || {}).length}</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Practical Evaluated</span>
          </div>
        </div>
      </div>

      {/* ── Controls: Filters & Search ───────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Stream Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
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

        {/* Search Box */}
        <div className="relative min-w-[240px]">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gov-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search labs, datasets, skills..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-gov-gray-200 rounded-gov text-gov-navy placeholder-gov-gray-400 focus:outline-hidden focus:border-gov-blue focus:ring-1 focus:ring-gov-blue"
          />
        </div>
      </div>

      {/* ── Empty State (Section 14) ─────────────────────────────────────────── */}
      {filteredLabs.length === 0 ? (
        <div className="gov-card p-12 text-center bg-white border border-gov-gray-200 shadow-xs rounded-gov-md space-y-4">
          <div className="w-14 h-14 rounded-full bg-gov-blue-light/30 text-gov-blue flex items-center justify-center mx-auto">
            <FlaskConical size={28} />
          </div>
          <div className="space-y-1 max-w-md mx-auto">
            <h3 className="text-base font-bold text-gov-navy">No Virtual Labs Available</h3>
            <p className="text-xs text-gov-gray-600 leading-relaxed">
              There are currently no laboratories matching your selected filter. Explore your recommended learning path or reset the filter.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-center gap-2">
            <button
              onClick={() => { setStreamFilter('all'); setSearchQuery(''); }}
              className="btn-gov-secondary text-xs px-4 py-2"
            >
              Reset Filters
            </button>
            <button
              onClick={() => navigate('/learning-path')}
              className="btn-gov-primary text-xs px-4 py-2 flex items-center gap-1.5"
            >
              <span>Explore Learning Path</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      ) : (
        /* ── Labs Cards Grid (Section 10 & 11) ───────────────────────────────── */
        <div className="grid md:grid-cols-2 gap-5">
          {filteredLabs.map(lab => {
            const submission = labSubmissions?.[lab.id];
            const isSelectedDepartment = lab.departmentId === departmentConfig?.id;

            return (
              <motion.div
                key={lab.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`gov-card p-5 flex flex-col justify-between hover:shadow-gov-card-hover transition-all border-2 bg-white rounded-gov-md ${
                  isSelectedDepartment ? 'border-gov-blue/30 bg-gradient-to-b from-gov-blue-light/5 to-transparent' : 'border-gov-gray-200'
                }`}
              >
                <div className="space-y-3">
                  {/* Badges strip */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="badge-gov-saffron text-[10px] font-bold">
                      {lab.badge || `${departmentConfig?.shortName || 'Cadre'} Lab`}
                    </span>
                    {submission ? (
                      <span className="badge-gov-success text-[10px] flex items-center gap-1 font-bold">
                        <CheckCircle size={12} /> Evaluated: {submission.results?.overallPracticalScore}%
                      </span>
                    ) : (
                      <span className="badge-gov-info text-[10px] flex items-center gap-1">
                        <Clock size={11} /> {lab.duration || '30 mins'}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gov-navy leading-snug">{lab.title}</h3>
                    <p className="text-[11px] text-gov-gray-500 mt-0.5">
                      Dataset: <strong className="font-mono text-gov-navy">{lab.datasetName}</strong>
                      {lab.difficulty && (
                        <span className="ml-2 text-gov-gray-400">· Difficulty: <span className="font-semibold text-gov-navy">{lab.difficulty}</span></span>
                      )}
                    </p>
                  </div>

                  <p className="text-xs text-gov-gray-600 leading-relaxed line-clamp-3">
                    {lab.scenario || lab.description}
                  </p>

                  {/* Target Competency & Linked Resources */}
                  <div className="p-3 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-gov-gray-500 font-medium">Target Competency:</span>
                      <span className="font-bold text-gov-navy">{lab.targetCompetency}</span>
                    </div>
                    {lab.relatedCourse && (
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-gov-gray-500">Related Course:</span>
                        <span className="text-gov-blue font-semibold truncate max-w-[220px]">{lab.relatedCourse}</span>
                      </div>
                    )}
                    {lab.competencies?.length > 1 && (
                      <div className="flex items-center gap-1 pt-1 flex-wrap">
                        {lab.competencies.map((comp, cIdx) => (
                          <span key={cIdx} className="px-2 py-0.5 bg-white border border-gov-gray-200 rounded text-[10px] text-gov-gray-600 font-medium">
                            {comp}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-5 pt-3 border-t border-gov-gray-100 flex items-center justify-between">
                  <span className="text-[11px] text-gov-gray-400 font-medium">
                    {lab.tasks?.length || lab.totalTasks || 4} interactive tasks
                  </span>

                  <button
                    onClick={() => handleLaunchLab(lab)}
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
      )}
    </div>
  );
}

export default function VirtualLabsPage() {
  return (
    <VirtualLabsErrorBoundary>
      <VirtualLabsContent />
    </VirtualLabsErrorBoundary>
  );
}
