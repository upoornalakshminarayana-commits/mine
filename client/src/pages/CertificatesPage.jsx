import { motion } from 'framer-motion';
import CertificateCard from '../components/CertificateCard';
import { certificates, igotData } from '../data/mockData';
import { Award, Download, ExternalLink, Shield } from 'lucide-react';

export default function CertificatesPage() {
  return (
    <div className="w-full space-y-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-xl font-bold text-gov-navy">My Certificates</h1>
            <p className="text-sm text-gov-gray-400 mt-1">Your earned credentials from iGOT Karmayogi and TPAC programmes.</p>
          </div>
          <button className="btn-gov-secondary text-xs py-2 px-4">
            <Download size={12} /> Download All
          </button>
        </div>
      </motion.div>

      {/* Summary */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="gov-card p-5 bg-gov-navy text-white">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center">
            <Award size={24} className="text-gov-saffron" />
          </div>
          <div>
            <p className="text-2xl font-bold">{certificates.length}</p>
            <p className="text-white/60 text-sm">Certificates Earned</p>
          </div>
          <div className="h-10 w-px bg-white/20 mx-2 hidden sm:block" />
          <div>
            <p className="text-lg font-bold">{certificates.reduce((sum, c) => sum + c.credits, 0)}</p>
            <p className="text-white/60 text-sm">Total Learning Credits</p>
          </div>
          <div className="h-10 w-px bg-white/20 mx-2 hidden sm:block" />
          <div>
            <p className="text-lg font-bold">{igotData.hoursLearned}h</p>
            <p className="text-white/60 text-sm">Hours of Learning</p>
          </div>
          <div className="ml-auto">
            <a href="https://www.igot.gov.in" target="_blank" rel="noreferrer"
              className="btn-gov-secondary border-white/30 text-white hover:bg-white/10 text-xs py-2 px-3">
              <ExternalLink size={12} /> iGOT Certificates
            </a>
          </div>
        </div>
      </motion.div>

      {/* Certificate grid */}
      <section>
        <div className="border-l-4 border-l-gov-saffron pl-3 mb-5">
          <h2 className="section-title">Earned Certificates</h2>
          <p className="section-subtitle">Issued after successful course completion</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <CertificateCard key={cert.id} cert={cert} index={i} />
          ))}
        </div>
      </section>

      {/* Verification notice */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="gov-card p-4 flex items-start gap-3 bg-gov-blue-light border border-blue-200">
        <Shield size={16} className="text-gov-blue shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-semibold text-gov-navy">Certificate Verification</p>
          <p className="text-xs text-gov-gray-600 mt-0.5">
            All certificates issued through iGOT Karmayogi can be verified using the Certificate ID at{' '}
            <a href="https://www.igot.gov.in" target="_blank" rel="noreferrer" className="text-gov-blue underline">igot.gov.in</a>.
            For TPAC-issued certificates, contact your training coordinator.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
