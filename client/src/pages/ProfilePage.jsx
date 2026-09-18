import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  User,
  ShieldCheck,
  Building,
  Award,
  BookOpen,
  Target,
  Compass,
  Clock,
  Lock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useStream } from '../context/StreamContext';
import { certificates } from '../data/mockData';

export default function ProfilePage() {
  const { employee, selectedStream, currentRole, gapAnalysis } = useStream();

  return (
    <div className="space-y-6 max-w-screen-xl mx-auto">
      {/* ── Header Strip ────────────────────────────────────────────────────── */}
      <div className="gov-card p-6 bg-gradient-to-r from-gov-navy via-[#0f2e54] to-gov-blue text-white relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-gov-saffron text-white text-xl font-black flex items-center justify-center shadow-md">
              {employee.avatarInitials || 'AS'}
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{employee.name}</h1>
                <span className="badge-gov-success text-[10px] font-bold">iGOT Verified</span>
              </div>
              <p className="text-xs text-white/80">{employee.designation} · {employee.department}</p>
              <p className="text-[11px] text-white/60 font-mono">Employee ID: {employee.id} · Cadre: {employee.cadre}</p>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-gov text-center shrink-0">
            <span className="text-[10px] text-white/60 uppercase font-bold block">Overall Competency</span>
            <span className="text-3xl font-black text-gov-saffron">{gapAnalysis?.overallScore || employee.overallCompetency}%</span>
            <span className="text-[10px] text-green-300 font-semibold block mt-0.5">Benchmark: 80%</span>
          </div>
        </div>
      </div>

      {/* ── Official Government Record Notice ─────────────────────────────────── */}
      <div className="flex items-start gap-3 bg-gov-blue-light border border-blue-200 p-3.5 rounded-gov text-xs text-gov-navy">
        <Lock size={16} className="text-gov-blue shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Official Civil Service Metadata (Read-Only)</p>
          <p className="text-gov-gray-600 mt-0.5">
            Cadre, designation, and departmental posting are synchronized with the central iGOT Karmayogi civil service registry and cannot be edited locally.
          </p>
        </div>
      </div>

      {/* ── Employee Details Grid ────────────────────────────────────────────── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left (2/3): Metadata Breakdown */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Official Registry Attributes */}
          <div className="gov-card p-5 space-y-4">
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider border-b border-gov-gray-200 pb-2 flex items-center gap-2">
              <Building size={14} className="text-gov-blue" />
              Administrative Cadre & Departmental Profile
            </h3>

            <div className="grid sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Full Name</span>
                <p className="font-bold text-gov-navy mt-0.5">{employee.name} ({employee.nameHindi})</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Employee ID</span>
                <p className="font-bold text-gov-navy font-mono mt-0.5">{employee.id}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Ministry</span>
                <p className="font-bold text-gov-navy mt-0.5">{employee.ministry}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Department / Division</span>
                <p className="font-bold text-gov-navy mt-0.5">{employee.department}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Current Role / Rank</span>
                <p className="font-bold text-gov-navy mt-0.5">{employee.designation}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Selected Stream</span>
                <p className="font-bold text-gov-blue mt-0.5">{selectedStream?.name}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">Target Promotion Role</span>
                <p className="font-bold text-gov-saffron mt-0.5">{employee.targetRole}</p>
              </div>

              <div>
                <span className="text-[10px] text-gov-gray-400 uppercase font-bold block">iGOT Synced Account</span>
                <p className="font-bold text-gov-green font-mono mt-0.5">{employee.igotId}</p>
              </div>
            </div>
          </div>

          {/* Competency Summary */}
          <div className="gov-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
                <Target size={14} className="text-gov-blue" />
                Competency Profile Summary
              </h3>
              <Link to="/competencies" className="text-xs text-gov-blue font-semibold hover:underline flex items-center gap-0.5">
                <span>View Full Radar</span>
                <ChevronRight size={12} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 text-xs">
              {(gapAnalysis?.competencyBreakdown || []).map(comp => (
                <div key={comp.name} className="p-3 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gov-navy">{comp.name}</span>
                    <strong className="text-gov-navy">{comp.current}%</strong>
                  </div>
                  <div className="progress-track h-1.5">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${comp.current}%`, backgroundColor: comp.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right (1/3): Verified Certificates & Stats */}
        <div className="space-y-5">
          {/* Learning Stats */}
          <div className="gov-card p-5 space-y-3">
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider border-b border-gov-gray-200 pb-2 flex items-center gap-2">
              <BookOpen size={14} className="text-gov-saffron" />
              Learning Achievements
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-gov-off-white rounded-gov">
                <span className="text-gov-gray-600">Total Learning Hours</span>
                <strong className="text-gov-navy">{employee.learningHoursTotal || 34} hrs</strong>
              </div>
              <div className="flex items-center justify-between p-2 bg-gov-off-white rounded-gov">
                <span className="text-gov-gray-600">Active Learning Streak</span>
                <strong className="text-gov-saffron">{employee.learningStreakDays || 14} days</strong>
              </div>
              <div className="flex items-center justify-between p-2 bg-gov-off-white rounded-gov">
                <span className="text-gov-gray-600">Activities Completed</span>
                <strong className="text-gov-green">8 of 11 completed</strong>
              </div>
              <div className="flex items-center justify-between p-2 bg-gov-off-white rounded-gov">
                <span className="text-gov-gray-600">Verified Certificates</span>
                <strong className="text-gov-blue">{certificates.length} credentials</strong>
              </div>
            </div>
          </div>

          {/* Verified Certificates List */}
          <div className="gov-card p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
              <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
                <Award size={14} className="text-gov-green" />
                Verified Certificates
              </h3>
              <Link to="/certificates" className="text-xs text-gov-blue font-semibold hover:underline">
                View All
              </Link>
            </div>

            <div className="space-y-2.5">
              {certificates.map(cert => (
                <div key={cert.id} className="p-3 bg-gov-off-white border border-gov-gray-200 rounded-gov space-y-1 text-xs">
                  <span className="badge-gov-success text-[9px] font-bold">{cert.provider}</span>
                  <p className="font-bold text-gov-navy leading-snug">{cert.course}</p>
                  <p className="text-[10px] text-gov-gray-400 font-mono">{cert.certificateId}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
