import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ArrowRight,
  ShieldCheck,
  Building2,
  Briefcase,
  Layers,
  Sparkles,
  BarChart3,
  Sprout,
  Activity,
  GraduationCap,
  Award,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  BrainCircuit,
  Loader2
} from 'lucide-react';
import { DEMO_EMPLOYEES } from '../data/demoEmployees';
import PreDashboardLayout from '../components/layout/PreDashboardLayout';

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 },
};

// Department Icons mapping
const iconMap = {
  'BarChart3': BarChart3,
  'Sprout': Sprout,
  'Activity': Activity,
  'Briefcase': Briefcase,
  'GraduationCap': GraduationCap,
};

export default function EmployeeSelectionPage({ onSelectEmployee, onBackToPortals }) {
  const [selectedId, setSelectedId] = useState(DEMO_EMPLOYEES[0].id);
  const [enteringEmpId, setEnteringEmpId] = useState(null);
  const [entryError, setEntryError] = useState(null);

  const handleConfirm = async (emp) => {
    try {
      setEntryError(null);
      setEnteringEmpId(emp.id);
      setSelectedId(emp.id);
      // Section 19: Brief professional loading state to show question preparation
      await new Promise(resolve => setTimeout(resolve, 550));
      onSelectEmployee(emp);
    } catch (err) {
      console.error('Failed to start competency assessment:', err);
      setEnteringEmpId(null);
      setEntryError({
        emp,
        message: 'Unable to start competency assessment. Please try again.',
      });
    }
  };

  const employeeHeader = (
    <header className="bg-gov-navy text-white text-xs border-b border-white/10 w-full shadow-xs">
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green w-full" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full border border-white/30 bg-white/10 flex items-center justify-center font-serif text-[9px] font-bold text-gov-saffron shrink-0">
            GOV
          </div>
          <div>
            <p className="font-bold tracking-wide text-white text-xs sm:text-sm">
              भारत सरकार · Government of India
            </p>
            <p className="text-white/60 text-[10px] hidden sm:block">
              Ministry of Statistics & Programme Implementation · Employee Competency Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortals}
            className="flex items-center gap-1.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1 rounded text-xs font-semibold border border-white/20 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Change Portal</span>
          </button>
        </div>
      </div>
    </header>
  );

  const employeeFooter = (
    <footer className="w-full bg-white border-t border-gov-gray-200 py-4 px-4 sm:px-6 lg:px-8 text-center text-xs text-gov-gray-500 shrink-0">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto">
        <p>© {new Date().getFullYear()} Government Employee Competency & Learning Platform · DIID / MoSPI</p>
        <p className="flex items-center gap-2 text-[11px]">
          <span className="w-2 h-2 rounded-full bg-gov-green" />
          <span>Integrated with iGOT Karmayogi Framework</span>
        </p>
      </div>
    </footer>
  );

  return (
    <PreDashboardLayout header={employeeHeader} footer={employeeFooter}>
      {/* ── 2. Main Employee Profile Selection Container ──────────────────── */}
      <main className="w-full flex-1 px-4 sm:px-6 lg:px-12 py-8 lg:py-12 flex flex-col justify-center">
        <div className="w-full space-y-8">
          
          {/* Header Title Section */}
          <motion.div {...fadeUp} className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gov-saffron-light border border-orange-200 text-gov-saffron text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-gov-saffron animate-pulse" />
              <span>DEMO ENVIRONMENT</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gov-navy tracking-tight">
              Select Employee Profile
            </h1>

            <p className="text-sm sm:text-base text-gov-gray-600 leading-relaxed text-balance">
              Choose a demo employee to preview how competency intelligence changes according to department and role.
            </p>
          </motion.div>

          {/* 5 Employee Profile Cards Grid (3 on top row, 2 centered below on desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {DEMO_EMPLOYEES.map((emp, idx) => {
              const IconComponent = iconMap[emp.iconName] || BarChart3;
              const isSelected = selectedId === emp.id;

              return (
                <motion.div
                  key={emp.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  onClick={() => setSelectedId(emp.id)}
                  className={`bg-white rounded-gov-md border-2 transition-all flex flex-col justify-between overflow-hidden cursor-pointer shadow-gov-card hover:shadow-gov-card-hover ${
                    isSelected
                      ? 'border-gov-blue ring-2 ring-gov-blue/20 -translate-y-1'
                      : 'border-gov-gray-200 hover:border-gov-blue/40'
                  }`}
                >
                  {/* Card Header & Avatar */}
                  <div className="p-5 border-b border-gov-gray-100 bg-gradient-to-r from-gov-off-white to-white">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gov-blue text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                          {emp.avatarInitials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-base font-bold text-gov-navy leading-tight">
                              {emp.name}
                            </h2>
                            {isSelected && (
                              <CheckCircle size={15} className="text-gov-blue shrink-0" />
                            )}
                          </div>
                          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded border bg-gov-blue-light text-gov-blue border-blue-200">
                            {emp.cadre || 'Official Cadre Profile'}
                          </span>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-gov bg-gov-blue-light text-gov-blue flex items-center justify-center shrink-0">
                        <IconComponent size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Card Details: Department, Current Role, Professional Area */}
                  <div className="p-5 space-y-4 flex-1">
                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                          Department
                        </span>
                        <p className="font-bold text-gov-navy text-sm mt-0.5">
                          {emp.department}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                          Current Role
                        </span>
                        <p className="font-semibold text-gov-blue mt-0.5">
                          {emp.currentRole}
                        </p>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block">
                          Professional Area
                        </span>
                        <p className="text-gov-gray-700 mt-0.5">
                          {emp.professionalArea}
                        </p>
                      </div>
                    </div>

                    {/* Competency Focus Pills */}
                    <div className="pt-3 border-t border-gov-gray-100">
                      <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider block mb-2">
                        Competencies Focus
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {emp.competencies.map((comp) => (
                          <span
                            key={comp}
                            className="badge-gov-info text-[11px] py-1 px-2 font-medium"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Button */}
                  <div className="p-5 pt-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleConfirm(emp);
                      }}
                      className={`w-full py-2.5 px-4 rounded-gov text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        isSelected
                          ? 'btn-gov-primary shadow-sm'
                          : 'bg-gov-off-white hover:bg-gov-blue hover:text-white text-gov-navy border border-gov-gray-200'
                      }`}
                    >
                      <span>Enter Employee</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom Security & Demo Notice */}
          <div className="p-4 rounded-gov bg-white border border-gov-gray-200 text-xs text-gov-gray-600 flex items-start gap-3 shadow-xs">
            <AlertCircle size={18} className="text-gov-blue shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-gov-navy font-bold">Privacy & Verification Assurance:</strong>{' '}
              All demo profiles are simulated government officer personas for technology demonstration purposes. No actual employee records, private data, or classified credentials are used.
            </div>
          </div>

        </div>
      </main>

      {/* ── Section 19: Loading State Overlay ───────────────────────────────── */}
      <AnimatePresence>
        {enteringEmpId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gov-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-gov-md shadow-2xl max-w-md w-full p-8 text-center border-t-4 border-gov-blue">
              <div className="w-16 h-16 rounded-full bg-gov-blue-light flex items-center justify-center mx-auto mb-5 text-gov-blue">
                <Loader2 className="w-8 h-8 animate-spin" />
              </div>
              <h3 className="text-lg font-bold text-gov-navy mb-2">
                Preparing your competency assessment...
              </h3>
              <p className="text-sm text-gov-gray-600">
                Loading your personalized questions...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Section 20: Error State Fallback ────────────────────────────────── */}
      <AnimatePresence>
        {entryError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-gov-navy/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-gov-md shadow-2xl max-w-md w-full p-6 text-center border-t-4 border-gov-red">
              <div className="w-14 h-14 rounded-full bg-red-50 text-gov-red flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gov-navy mb-2">
                Unable to start competency assessment.
              </h3>
              <p className="text-xs text-gov-gray-600 mb-6">
                Please try again.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setEntryError(null)}
                  className="px-4 py-2 text-xs font-semibold text-gov-gray-700 bg-gov-gray-100 hover:bg-gov-gray-200 rounded-gov transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    const emp = entryError.emp;
                    setEntryError(null);
                    if (emp) handleConfirm(emp);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-gov-blue hover:bg-gov-blue/90 rounded-gov transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PreDashboardLayout>
  );
}
