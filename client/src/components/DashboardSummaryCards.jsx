import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Target, AlertTriangle, BookOpen, Compass, TrendingUp, CheckCircle2 } from 'lucide-react';
import { useStream } from '../context/StreamContext';

// Animated Number Counter Hook
function AnimatedCounter({ target, duration = 1.2, suffix = '' }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(target) || 0;
    if (start === end) {
      setCount(end);
      return;
    }

    const stepTime = Math.abs(Math.floor((duration * 1000) / (end || 1)));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      }
    }, Math.max(stepTime, 20));

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count}{suffix}</span>;
}

export default function DashboardSummaryCards() {
  const { gapAnalysis, employee } = useStream();

  const overallScore = gapAnalysis?.overallScore || employee.overallCompetency || 63;
  const criticalGapsCount = gapAnalysis?.criticalGaps?.length || employee.criticalGapsCount || 1;
  const totalGapsCount = (gapAnalysis?.criticalGaps?.length || 0) + (gapAnalysis?.developingGaps?.length || 0) || employee.prioritySkillGapsCount || 3;
  const progressPercent = employee.learningProgressPercent || 72;
  const readinessPercent = employee.futureRoleReadiness || 66;

  const cards = [
    {
      id: 'overall',
      title: 'OVERALL COMPETENCY',
      value: overallScore,
      suffix: '%',
      subtitle: '↑ 8% improvement',
      subColor: 'text-gov-green',
      icon: Target,
      iconBg: 'bg-gov-blue-light',
      iconColor: 'text-gov-blue',
      borderAccent: 'border-l-gov-blue',
    },
    {
      id: 'gaps',
      title: 'PRIORITY SKILL GAPS',
      value: totalGapsCount,
      suffix: '',
      subtitle: `${criticalGapsCount} critical gap`,
      subColor: 'text-gov-red',
      icon: AlertTriangle,
      iconBg: 'bg-gov-red-light',
      iconColor: 'text-gov-red',
      borderAccent: 'border-l-gov-red',
    },
    {
      id: 'learning',
      title: 'LEARNING PROGRESS',
      value: progressPercent,
      suffix: '%',
      subtitle: `${employee.activitiesCompleted || 8} of ${employee.totalActivities || 11} activities completed`,
      subColor: 'text-gov-gray-600',
      icon: BookOpen,
      iconBg: 'bg-gov-saffron-light',
      iconColor: 'text-gov-saffron',
      borderAccent: 'border-l-gov-saffron',
    },
    {
      id: 'future',
      title: 'FUTURE ROLE READINESS',
      value: readinessPercent,
      suffix: '%',
      subtitle: employee.futureRoleStatus || 'Near ready for next role',
      subColor: 'text-gov-navy font-semibold',
      icon: Compass,
      iconBg: 'bg-gov-green-light',
      iconColor: 'text-gov-green',
      borderAccent: 'border-l-gov-green',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.08 }}
            className={`gov-card p-4 border-l-4 ${c.borderAccent} hover:shadow-gov-card-hover transition-all flex flex-col justify-between`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider">
                {c.title}
              </span>
              <div className={`w-7 h-7 rounded-gov ${c.iconBg} flex items-center justify-center shrink-0`}>
                <Icon size={15} className={c.iconColor} />
              </div>
            </div>

            <div className="mt-2">
              <p className="text-2xl sm:text-3xl font-black text-gov-navy tracking-tight">
                <AnimatedCounter target={c.value} suffix={c.suffix} />
              </p>
              <p className={`text-xs mt-1 ${c.subColor} flex items-center gap-1`}>
                {c.subtitle}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
