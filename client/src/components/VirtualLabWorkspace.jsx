import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical,
  Database,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart2,
  PieChart as PieChartIcon,
  Play,
  RotateCcw,
  Sparkles,
  Award,
  ChevronRight,
  TrendingUp,
  Download,
  Filter,
  Layers
} from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useStream } from '../context/StreamContext';
import { VIRTUAL_LABS } from '../data/portalData';

export default function VirtualLabWorkspace({ lab, onBack }) {
  const { submitVirtualLabAnalysis, labSubmissions } = useStream();

  const fallbackLab = VIRTUAL_LABS[0] || {};
  const activeLab = lab || fallbackLab;

  const [activeTab, setActiveTab] = useState('preview'); // preview | clean | analyze | visual | report
  const [tasks, setTasks] = useState(activeLab.tasks?.length ? activeLab.tasks : (fallbackLab.tasks || []));
  const [dataset, setDataset] = useState(activeLab.sampleDataset?.length ? activeLab.sampleDataset : (fallbackLab.sampleDataset || []));
  const [cleaned, setCleaned] = useState(false);
  const [outlierFiltered, setOutlierFiltered] = useState(false);
  const [userReport, setUserReport] = useState(
    `Based on the ${activeLab.title || 'departmental laboratory'} scenario and dataset (${activeLab.datasetName || 'official frame'}), key performance indicators across the surveyed units show measurable variance. Non-response records were imputed using block-level mean calibrations, and extreme variance outliers were flagged for inspection.`
  );

  const existingSubmission = labSubmissions?.[activeLab.id];
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(existingSubmission?.results || null);

  // Complete a task
  const toggleTask = (taskId) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t));
  };

  // Tool 1: Clean Data action
  const handleCleanData = () => {
    const validNums = dataset.filter(r => r.income != null).map(r => Number(r.income));
    const avg = validNums.length ? Math.round(validNums.reduce((a, b) => a + b, 0) / validNums.length) : 34500;

    const updated = dataset.map(row => {
      if (row.income === null || row.income === undefined) {
        return { ...row, income: avg, flag: 'Imputed (Block Mean)' };
      }
      return row;
    });
    setDataset(updated);
    setCleaned(true);
    toggleTask(1);
  };

  // Tool 2: Filter outliers
  const handleFilterOutliers = () => {
    setOutlierFiltered(!outlierFiltered);
    toggleTask(3);
  };

  // Dataset displayed
  const displayDataset = outlierFiltered
    ? dataset.filter(d => d.flag !== 'Outlier')
    : dataset;

  // Compute live statistics safely
  const validIncomes = displayDataset.filter(d => d.income != null).map(d => Number(d.income));
  const meanIncome = validIncomes.length ? Math.round(validIncomes.reduce((a, b) => a + b, 0) / validIncomes.length) : 0;
  const medianIncome = validIncomes.length ? [...validIncomes].sort((a, b) => a - b)[Math.floor(validIncomes.length / 2)] : 0;
  const stdDev = validIncomes.length ? Math.round(Math.sqrt(validIncomes.map(x => Math.pow(x - meanIncome, 2)).reduce((a, b) => a + b, 0) / validIncomes.length)) : 0;
  const cvPercent = meanIncome ? Math.round((stdDev / meanIncome) * 100) : 0;

  // Dynamic block summary data
  const blockMap = {};
  displayDataset.forEach(d => {
    const b = d.block || 'Zone A';
    if (!blockMap[b]) blockMap[b] = { count: 0, total: 0 };
    blockMap[b].count += 1;
    if (d.income != null) blockMap[b].total += Number(d.income);
  });
  const blockSummaryData = Object.entries(blockMap).map(([block, info]) => ({
    block,
    avgIncome: info.count > 0 ? Math.round(info.total / info.count) : 0,
    count: info.count,
  }));

  // Chart Data
  const scatterData = displayDataset
    .filter(d => d.income != null)
    .map(d => ({
      income: Number(d.income),
      foodExp: d.foodExp != null ? Number(d.foodExp) : Math.round(Number(d.income) * 0.4),
      block: d.block || 'Zone',
      members: d.members || 1,
    }));

  // Submit Analysis
  const handleSubmitAnalysis = () => {
    setIsEvaluating(true);
    setTimeout(() => {
      const evaluation = activeLab.defaultEvaluation || {
        dataCleaning: 82,
        statisticalReasoning: 75,
        dataInterpretation: 78,
        visualization: 82,
        reportWriting: 80,
        overallPracticalScore: 80,
        keyGapTakeaway: `Practical analysis for ${activeLab.title} completed successfully. Diagnostic feedback applied.`,
      };
      setEvaluationResult(evaluation);
      setIsEvaluating(false);
      submitVirtualLabAnalysis(activeLab.id, evaluation);
    }, 1200);
  };

  return (
    <div className="space-y-6 w-full">
      {/* ── Top Scenario Banner ────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white rounded-gov-md shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="badge-gov-saffron text-[10px] uppercase font-bold">{activeLab.badge || 'Core Simulation'}</span>
              <span className="text-white/60 text-xs">·</span>
              <span className="text-xs text-white/80">Role Context: <strong>{activeLab.roleContext || 'Cadre Specialist'}</strong></span>
              <span className="text-white/60 text-xs">·</span>
              <span className="text-xs text-white/80">Dataset: <strong>{activeLab.datasetName || 'official_sample.csv'}</strong></span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              <FlaskConical size={22} className="text-gov-saffron" />
              <span>Virtual Lab: {activeLab.title}</span>
            </h1>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {activeLab.scenario || activeLab.description}
            </p>
          </div>

          <button
            onClick={onBack}
            className="btn-gov-secondary text-xs bg-white/10 hover:bg-white/20 text-white border-white/20 shrink-0"
          >
            ← Back to Virtual Labs
          </button>
        </div>
      </div>

      {/* ── Task Checklist & Evaluation Banner ──────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left (2/3): Interactive Workspace */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Workspace Tool Navigation Bar */}
          <div className="gov-card p-1.5 bg-white border border-gov-gray-200 flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1">
              {[
                { id: 'preview', label: 'Data Preview', icon: Database },
                { id: 'clean', label: 'Clean Data', icon: Filter },
                { id: 'analyze', label: 'Analyze', icon: BarChart2 },
                { id: 'visual', label: 'Visualization', icon: PieChartIcon },
                { id: 'report', label: 'Report', icon: FileText },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-gov font-semibold transition-all ${
                    activeTab === id
                      ? 'bg-gov-blue text-white shadow-xs'
                      : 'text-gov-gray-600 hover:text-gov-navy hover:bg-gov-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <span className="text-[11px] text-gov-gray-400 font-mono px-2">
              Dataset: {displayDataset.length} rows loaded
            </span>
          </div>

          {/* Tab 1: Data Preview */}
          {activeTab === 'preview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gov-card p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gov-navy">Tabular Data Preview</h3>
                  <p className="text-[11px] text-gov-gray-400">Sample records from District Varanasi Household Survey</p>
                </div>
                <span className="badge-gov-neutral text-[10px]">Format: CSV</span>
              </div>

              <div className="overflow-x-auto max-h-96 border border-gov-gray-200 rounded-gov">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-gov-off-white text-gov-navy font-bold border-b border-gov-gray-200 sticky top-0">
                    <tr>
                      <th className="p-2.5">ID</th>
                      <th className="p-2.5">Block</th>
                      <th className="p-2.5">Members</th>
                      <th className="p-2.5">Income (₹)</th>
                      <th className="p-2.5">Food Exp (₹)</th>
                      <th className="p-2.5">Health Access</th>
                      <th className="p-2.5">Status Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gov-gray-100">
                    {displayDataset.map(row => (
                      <tr key={row.id} className="hover:bg-gov-blue-light/30 transition-colors">
                        <td className="p-2.5 font-mono text-gov-navy font-semibold">{row.id}</td>
                        <td className="p-2.5 text-gov-gray-700">{row.block}</td>
                        <td className="p-2.5 text-gov-gray-700">{row.members}</td>
                        <td className="p-2.5 font-semibold text-gov-navy">
                          {row.income != null ? `₹${Number(row.income).toLocaleString()}` : <span className="text-gov-red font-bold">NULL (Missing)</span>}
                        </td>
                        <td className="p-2.5 text-gov-gray-700">
                          {row.foodExp != null ? `₹${Number(row.foodExp).toLocaleString()}` : '—'}
                        </td>
                        <td className="p-2.5">
                          <span className={`badge-gov-${row.healthAccess === 'Yes' ? 'success' : 'warning'} text-[10px]`}>
                            {row.healthAccess}
                          </span>
                        </td>
                        <td className="p-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            row.flag === 'Missing Value'
                              ? 'bg-gov-red-light text-gov-red'
                              : row.flag === 'Outlier'
                              ? 'bg-gov-amber-light text-gov-amber'
                              : row.flag.includes('Imputed')
                              ? 'bg-gov-blue-light text-gov-blue'
                              : 'bg-gov-green-light text-gov-green'
                          }`}>
                            {row.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* Tab 2: Clean Data Tool */}
          {activeTab === 'clean' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gov-card p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gov-navy">Data Cleaning & Imputation Engine</h3>
                <p className="text-xs text-gov-gray-400">Detect anomalies, resolve missing values, and validate survey records.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gov-navy">1. Missing Value Detection</span>
                    <span className="badge-gov-danger text-[10px]">1 Missing in HH-106</span>
                  </div>
                  <p className="text-xs text-gov-gray-600">
                    Apply Stratified Mean Imputation (Pindra Block average income: ₹34,500) to complete the dataset without dropping sample weight.
                  </p>
                  <button
                    onClick={handleCleanData}
                    disabled={cleaned}
                    className="btn-gov-primary text-xs w-full mt-2"
                  >
                    {cleaned ? '✓ Imputation Applied (HH-106: ₹34,500)' : 'Apply Mean Imputation'}
                  </button>
                </div>

                <div className="p-4 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-gov-navy">2. Outlier Identification</span>
                    <span className="badge-gov-warning text-[10px]">HH-111 (₹2,90,000)</span>
                  </div>
                  <p className="text-xs text-gov-gray-600">
                    Record HH-111 is 7.5x the median district income. Toggle outlier exclusion to observe effect on variance and skewness.
                  </p>
                  <button
                    onClick={handleFilterOutliers}
                    className="btn-gov-secondary text-xs w-full mt-2"
                  >
                    {outlierFiltered ? 'Re-include Outlier Record' : 'Exclude Outlier for Robust Analysis'}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Tab 3: Analyze Tool */}
          {activeTab === 'analyze' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gov-card p-5 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-gov-navy">Statistical Estimation & Analysis</h3>
                <p className="text-xs text-gov-gray-400">Descriptive statistics calculated across active dataset ({displayDataset.length} records).</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 bg-gov-blue-light/40 border border-blue-200 rounded-gov">
                  <span className="text-[10px] text-gov-gray-500 uppercase font-bold">Mean Income</span>
                  <p className="text-lg font-black text-gov-navy">₹{meanIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gov-blue-light/40 border border-blue-200 rounded-gov">
                  <span className="text-[10px] text-gov-gray-500 uppercase font-bold">Median Income</span>
                  <p className="text-lg font-black text-gov-navy">₹{medianIncome.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gov-blue-light/40 border border-blue-200 rounded-gov">
                  <span className="text-[10px] text-gov-gray-500 uppercase font-bold">Std Deviation</span>
                  <p className="text-lg font-black text-gov-navy">₹{stdDev.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-gov-blue-light/40 border border-blue-200 rounded-gov">
                  <span className="text-[10px] text-gov-gray-500 uppercase font-bold">Coeff of Var (CV)</span>
                  <p className="text-lg font-black text-gov-navy">{cvPercent}%</p>
                </div>
              </div>

              <div className="p-4 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-2 text-xs">
                <p className="font-bold text-gov-navy">Statistical Insights:</p>
                <p className="text-gov-gray-700 leading-relaxed">
                  • <strong>Skewness:</strong> {meanIncome > medianIncome + 3000 ? 'Positive Right-Skewed distribution due to high earner households.' : 'Relatively symmetrical income distribution after outlier treatment.'}
                </p>
                <p className="text-gov-gray-700 leading-relaxed">
                  • <strong>Engel's Law Observation:</strong> Proportional indicator expenditure accounts for <strong>{Math.round((displayDataset.reduce((a,b)=>a+(Number(b.foodExp)||0),0)/Math.max(1, displayDataset.reduce((a,b)=>a+(Number(b.income)||30000),0)))*100)}%</strong> of overall unit allocation.
                </p>
                <button
                  onClick={() => toggleTask(2)}
                  className="btn-gov-secondary text-xs mt-1"
                >
                  ✓ Mark Statistics Task Completed
                </button>
              </div>
            </motion.div>
          )}

          {/* Tab 4: Visualization Tool */}
          {activeTab === 'visual' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gov-card p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gov-navy">Interactive Charting: Food Expenditure vs Income</h3>
                  <p className="text-xs text-gov-gray-400">Explore correlation between household income and food spending across blocks.</p>
                </div>
                <button
                  onClick={() => toggleTask(4)}
                  className="badge-gov-success text-xs cursor-pointer"
                >
                  ✓ Mark Visualization Task Done
                </button>
              </div>

              <div className="h-64 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis type="number" dataKey="income" name="Income (₹)" unit="₹" stroke="#64748b" />
                    <YAxis type="number" dataKey="foodExp" name="Food Exp (₹)" unit="₹" stroke="#64748b" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter name="Households" data={scatterData} fill="#1D5F9E" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          )}

          {/* Tab 5: Report Tool */}
          {activeTab === 'report' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="gov-card p-5 space-y-3">
              <div>
                <h3 className="text-sm font-bold text-gov-navy">Draft Final Statistical Conclusion & Notes</h3>
                <p className="text-xs text-gov-gray-400">Prepare official observations for submission to the Departmental Review Board.</p>
              </div>

              <textarea
                rows={5}
                className="gov-input text-xs font-mono leading-relaxed"
                value={userReport}
                onChange={e => setUserReport(e.target.value)}
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-gov-gray-400">
                  Includes: Imputation notes, Outlier diagnostics, NSS standard compliance.
                </span>
                <button
                  onClick={() => toggleTask(5)}
                  className="btn-gov-secondary text-xs"
                >
                  ✓ Mark Report Task Ready
                </button>
              </div>
            </motion.div>
          )}

          {/* Submit Analysis Action Button */}
          <div className="pt-2">
            <button
              onClick={handleSubmitAnalysis}
              disabled={isEvaluating}
              className="btn-gov-saffron w-full py-3 text-sm font-bold shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] transition-transform"
            >
              {isEvaluating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>AI Evaluator Processing Analysis...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Submit Analysis & Evaluate Practical Competency</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right (1/3): Tasks Checklist & Evaluation Results */}
        <div className="space-y-5">
          
          {/* Tasks Checklist */}
          <div className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider">
                Lab Tasks Checklist ({tasks.filter(t => t.completed).length}/{tasks.length})
              </h3>
              <span className="badge-gov-info text-[10px]">Interactive</span>
            </div>

            <div className="space-y-2 text-xs">
              {tasks.map((t, idx) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-2.5 rounded-gov border cursor-pointer transition-all flex items-start gap-2.5 ${
                    t.completed
                      ? 'bg-gov-green-light/40 border-green-200 text-gov-navy'
                      : 'bg-gov-off-white border-gov-gray-200 text-gov-gray-700 hover:border-gov-blue'
                  }`}
                >
                  <div className="mt-0.5">
                    {t.completed ? (
                      <CheckCircle size={15} className="text-gov-green" />
                    ) : (
                      <div className="w-3.5 h-3.5 rounded-full border border-gov-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-semibold ${t.completed ? 'line-through text-gov-gray-500' : ''}`}>
                      {idx + 1}. {t.title}
                    </p>
                    <span className="text-[10px] text-gov-gray-400">Tool: {t.tool}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Practical Evaluation Breakdown Card */}
          {evaluationResult && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="gov-card p-5 border-2 border-gov-blue bg-gov-blue-light/30 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-blue-200 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-gov-navy">
                  <Sparkles size={15} className="text-gov-saffron" />
                  <span>AI Practical Evaluation</span>
                </div>
                <span className="text-base font-black text-gov-blue">
                  {evaluationResult.overallPracticalScore}%
                </span>
              </div>

              {/* Sub-competencies breakdown */}
              <div className="space-y-2 text-xs">
                {[
                  { label: 'Data Cleaning', score: evaluationResult.dataCleaning },
                  { label: 'Statistical Reasoning', score: evaluationResult.statisticalReasoning, isGap: true },
                  { label: 'Data Interpretation', score: evaluationResult.dataInterpretation },
                  { label: 'Visualization', score: evaluationResult.visualization },
                  { label: 'Report Writing', score: evaluationResult.reportWriting },
                ].map(item => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className={item.isGap ? 'font-bold text-gov-red' : 'text-gov-navy'}>
                        {item.label} {item.isGap && '⚠️ Priority Gap'}
                      </span>
                      <span className="font-bold">{item.score}%</span>
                    </div>
                    <div className="progress-track h-1.5">
                      <div
                        className={`h-full rounded-full ${item.score < 60 ? 'bg-gov-red' : item.score < 75 ? 'bg-gov-amber' : 'bg-gov-green'}`}
                        style={{ width: `${item.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Practical takeaway alert */}
              <div className="p-3 bg-white border border-blue-200 rounded-gov text-xs text-gov-navy">
                <p className="font-bold text-gov-saffron">Key Practical Takeaway:</p>
                <p className="mt-1 text-gov-gray-700 leading-relaxed">
                  "{evaluationResult.keyGapTakeaway}"
                </p>
                <p className="text-[10px] text-gov-green font-semibold mt-2">
                  ✓ Result incorporated into your Competency Profile & Progress History.
                </p>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
