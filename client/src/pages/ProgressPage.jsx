import { motion } from 'framer-motion';
import GrowthChart from '../components/GrowthChart';
import CompetencyCard from '../components/CompetencyCard';
import { competencies, growthHistory, igotData, employee } from '../data/mockData';
import { BarChart2, CheckCircle, TrendingUp, Clock, BookOpen, Award, Target } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';

const competencyBarData = competencies.map(c => ({
  name: c.name.split(' ').slice(0, 2).join(' '),
  fullName: c.name,
  current: c.current,
  gap: Math.max(0, c.required - c.current),
  required: c.required,
}));

const CustomBarTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  return (
    <div className="gov-card px-3 py-2 text-xs">
      <p className="font-semibold text-gov-navy mb-1">{d.fullName}</p>
      <p className="text-gov-blue">Current: <strong>{d.current}%</strong></p>
      <p className="text-gov-gray-400">Required: <strong>{d.required}%</strong></p>
      {d.gap > 0 && <p className="text-gov-red">Gap: <strong>{d.gap}%</strong></p>}
    </div>
  );
};

export default function ProgressPage() {
  return (
    <div className="w-full space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-xl font-bold text-gov-navy">My Progress</h1>
        <p className="text-sm text-gov-gray-400 mt-1">Track your competency development over time.</p>
      </motion.div>

      {/* Summary stats */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: Target, label: 'Current Score', value: `${employee.overallCompetency}%`, color: 'text-gov-blue', bg: 'bg-gov-blue-light' },
          { icon: TrendingUp, label: 'Growth (6 months)', value: `+${growthHistory[growthHistory.length - 1].score - growthHistory[0].score}%`, color: 'text-gov-green', bg: 'bg-gov-green-light' },
          { icon: BookOpen, label: 'Hours Learned', value: `${igotData.hoursLearned}h`, color: 'text-gov-saffron', bg: 'bg-gov-saffron-light' },
          { icon: Award, label: 'Certificates', value: igotData.certificates, color: 'text-gov-navy', bg: 'bg-gov-blue-light' },
        ].map(({ icon: Icon, label, value, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
            className="stat-box">
            <div className={`w-8 h-8 rounded-gov ${bg} flex items-center justify-center mb-2`}>
              <Icon size={15} className={color} />
            </div>
            <p className="stat-value text-xl">{value}</p>
            <p className="stat-label">{label}</p>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Growth chart */}
        <GrowthChart />

        {/* Competency bar chart */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="gov-card p-5">
          <div className="mb-4">
            <h3 className="section-title">Competency vs Required</h3>
            <p className="text-xs text-gov-gray-400">Current achievement against role benchmarks</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={competencyBarData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0F3" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#8B94A3' }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#8B94A3' }} tickLine={false} axisLine={false} />
              <Tooltip content={<CustomBarTooltip />} />
              <Bar dataKey="current" name="Current" radius={[2, 2, 0, 0]}>
                {competencyBarData.map((entry, index) => (
                  <Cell key={index} fill={entry.current >= entry.required ? '#276749' : entry.gap > 20 ? '#C0392B' : '#B7791F'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-4 mt-2 text-[10px] text-gov-gray-400">
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-gov-green rounded-sm inline-block" /> Achieved</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-gov-amber rounded-sm inline-block" /> Developing</span>
            <span className="flex items-center gap-1"><span className="w-3 h-2 bg-gov-red rounded-sm inline-block" /> Critical Gap</span>
          </div>
        </motion.div>
      </div>

      {/* Learning activity timeline */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="gov-card p-5">
        <div className="border-l-4 border-l-gov-saffron pl-3 mb-5">
          <h2 className="section-title">Recent Learning Activity</h2>
        </div>
        <div className="space-y-3">
          {[
            { date: 'Sep 15, 2026', activity: 'Competency Assessment Taken', type: 'assessment', score: '72%', color: 'bg-gov-blue' },
            { date: 'Jul 12, 2026', activity: 'Certificate Earned: Foundations of Official Statistics', type: 'certificate', score: 'Completed', color: 'bg-gov-green' },
            { date: 'Jun 28, 2026', activity: 'Course Started: Advanced Survey Methodology', type: 'course', score: '65% progress', color: 'bg-gov-saffron' },
            { date: 'May 28, 2026', activity: 'Certificate Earned: Data Ethics and Privacy', type: 'certificate', score: 'Completed', color: 'bg-gov-green' },
            { date: 'Mar 14, 2026', activity: 'Certificate Earned: Effective Government Communication', type: 'certificate', score: 'Completed', color: 'bg-gov-green' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${item.color} mt-1.5 shrink-0`} />
              <div className="flex-1 border-b border-gov-gray-100 pb-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-xs font-medium text-gov-navy">{item.activity}</p>
                  <span className="text-[10px] font-semibold text-gov-gray-600 shrink-0">{item.score}</span>
                </div>
                <p className="text-[10px] text-gov-gray-400 mt-0.5">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Competency cards with progress */}
      <section>
        <div className="border-l-4 border-l-gov-blue pl-3 mb-5">
          <h2 className="section-title">Competency Progress Detail</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {competencies.map((c, i) => (
            <CompetencyCard key={c.id} competency={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
