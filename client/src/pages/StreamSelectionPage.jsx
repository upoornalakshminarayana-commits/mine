import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle, Info, LayoutDashboard } from 'lucide-react';
import { STREAMS } from '../data/streamData';
import { useStream } from '../context/StreamContext';
import PreDashboardLayout from '../components/layout/PreDashboardLayout';

export default function StreamSelectionPage({ onSelect }) {
  const { skipToDashboard } = useStream();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected) onSelect(selected);
  };

  const streamHeader = (
    <div className="bg-gov-navy w-full shadow-xs">
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green w-full" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
          <span className="text-[8px] font-bold text-gov-saffron leading-none">GOVT</span>
        </div>
        <div>
          <p className="text-[10px] text-white/60 uppercase tracking-widest">Government of India · iGOT Karmayogi</p>
          <p className="text-xs font-semibold text-white">Employee Competency & Learning Portal</p>
        </div>
        {/* Step indicator */}
        <div className="ml-auto flex items-center gap-2">
          {[
            { n: 1, label: 'Select Stream', active: true },
            { n: 2, label: 'Assessment', active: false },
            { n: 3, label: 'Gap Analysis', active: false },
            { n: 4, label: 'Dashboard', active: false },
          ].map(({ n, label, active }) => (
            <div key={n} className="hidden sm:flex items-center gap-1.5">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border
                ${active ? 'bg-gov-saffron text-white border-gov-saffron' : 'bg-white/10 text-white/40 border-white/20'}`}>{n}</div>
              <span className={`text-[10px] ${active ? 'text-white' : 'text-white/40'} hidden md:inline`}>{label}</span>
              {n < 4 && <div className="w-6 h-px bg-white/20 mx-1 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-white/10" />
    </div>
  );

  return (
    <PreDashboardLayout header={streamHeader}>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Page title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gov-blue-light border border-blue-200 rounded px-3 py-1.5 mb-4">
                <span className="text-xs font-semibold text-gov-blue">Step 1 of 4</span>
              </div>
              <h1 className="text-2xl font-bold text-gov-navy mb-2">Select Your Professional Stream</h1>
              <p className="text-sm text-gov-gray-400 max-w-md mx-auto">
                Select the stream that best matches your current role. Your competency assessment will be tailored accordingly.
              </p>
            </div>

            {/* Stream grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              {STREAMS.map((stream, i) => {
                const isSelected = selected?.id === stream.id;
                return (
                  <motion.button
                    key={stream.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.06 }}
                    onClick={() => setSelected(stream)}
                    className={`relative text-left p-5 rounded-gov-md border-2 transition-all duration-150 w-full
                      ${isSelected
                        ? 'border-gov-blue bg-gov-blue-light shadow-gov-card-hover'
                        : 'border-gov-gray-200 bg-white hover:border-gov-blue hover:bg-gov-blue-light/40 shadow-gov-card'
                      }`}
                  >
                    {isSelected && (
                      <div className="absolute top-3 right-3">
                        <CheckCircle size={16} className="text-gov-blue" />
                      </div>
                    )}
                    <div className="text-2xl mb-3">{stream.icon}</div>
                    <h3 className={`text-sm font-semibold mb-1 ${isSelected ? 'text-gov-blue' : 'text-gov-navy'}`}>
                      {stream.name}
                    </h3>
                    <p className="text-xs text-gov-gray-400 leading-relaxed">{stream.description}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {stream.competencies.slice(0, 3).map(c => (
                        <span key={c} className="badge-gov-neutral text-[9px]">{c}</span>
                      ))}
                      {stream.competencies.length > 3 && (
                        <span className="badge-gov-neutral text-[9px]">+{stream.competencies.length - 3} more</span>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Info */}
            <div className="flex items-start gap-2 text-[11px] text-gov-gray-400 mb-6">
              <Info size={12} className="shrink-0 mt-0.5" />
              Your stream selection determines the competency assessment questions and required proficiency levels for your role.
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleContinue}
                disabled={!selected}
                className="btn-gov-primary px-8 py-3 text-sm disabled:opacity-40 w-full sm:w-auto justify-center"
              >
                <span>Continue to Assessment</span>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => skipToDashboard(selected || STREAMS[0])}
                className="btn-gov-secondary px-6 py-3 text-sm w-full sm:w-auto justify-center border border-gov-gray-300"
                title="Enter Dashboard with benchmark profile"
              >
                <LayoutDashboard size={16} className="text-gov-blue" />
                <span>Explore Full Portal Directly</span>
              </button>
            </div>

            {selected && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs text-gov-blue mt-3 font-medium"
              >
                {selected.icon} Selected: <strong>{selected.name}</strong>
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </PreDashboardLayout>
  );
}
