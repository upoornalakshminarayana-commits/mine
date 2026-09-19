import { motion } from 'framer-motion';

/**
 * Official government-style header.
 * Matches the visual language of Indian government digital portals.
 */
export default function GovernmentHeader({ ministry = 'Ministry of Statistics & Programme Implementation' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gov-navy text-white"
    >
      {/* Top stripe – saffron accent */}
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green" />

      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 py-3">
          {/* Emblem placeholder */}
          <div className="shrink-0">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center text-center">
              <div className="text-center leading-none">
                <div className="text-[7px] font-bold tracking-tighter text-white/90">GOVT</div>
                <div className="text-[8px] font-bold text-gov-saffron mt-0.5">INDIA</div>
              </div>
            </div>
            <p className="text-[8px] text-white/50 text-center mt-0.5 leading-none max-w-[56px]">[Emblem Placeholder]</p>
          </div>

          {/* Ministry info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] sm:text-xs text-white/60 font-medium uppercase tracking-widest leading-none mb-0.5">
              भारत सरकार · Government of India
            </p>
            <h1 className="text-sm sm:text-base font-semibold text-white leading-tight truncate">
              {ministry}
            </h1>
            <p className="text-[10px] sm:text-xs text-white/50 mt-0.5 leading-none">
              Data Informatics & Innovation Division (DIID)
            </p>
          </div>

          {/* iGOT branding */}
          <div className="hidden sm:flex flex-col items-end shrink-0">
            <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded px-3 py-1.5">
              <div className="w-5 h-5 rounded-sm bg-gov-saffron flex items-center justify-center text-white text-[9px] font-bold">iG</div>
              <div>
                <p className="text-[10px] font-semibold text-white leading-none">iGOT Karmayogi</p>
                <p className="text-[9px] text-white/50 leading-none mt-0.5">[Integration Placeholder]</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="h-px bg-white/10" />
    </motion.div>
  );
}
