import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Building2,
  Layers,
  BarChart2,
  Users,
  ChevronLeft,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Compass
} from 'lucide-react';
import PreDashboardLayout from '../components/layout/PreDashboardLayout';

export default function AdminPortalView({ onBackToPortals }) {
  const [activeTab, setActiveTab] = useState('overview');

  const adminStats = [
    { title: 'TOTAL EMPLOYEES', value: '1,420', sub: 'Across 5 Ministries', icon: Users, color: 'text-gov-blue', border: 'border-l-gov-blue' },
    { title: 'ORGANIZATION READINESS', value: '68.4%', sub: 'Target: 75%', icon: TrendingUp, color: 'text-gov-green', border: 'border-l-gov-green' },
    { title: 'CRITICAL SKILL GAPS', value: '38', sub: 'Urgent Intervention Required', icon: AlertTriangle, color: 'text-gov-red', border: 'border-l-gov-red' },
    { title: 'ACTIVE BLUEPRINTS', value: '14', sub: 'SSO, AD, Director Roles', icon: Layers, color: 'text-gov-saffron', border: 'border-l-gov-saffron' },
  ];

  const departmentHealth = [
    { name: 'MoSPI / National Statistical Office', officers: 580, readiness: 71, criticalGaps: 12, topNeed: 'Survey Sampling & Geospatial' },
    { name: 'Ministry of Agriculture (DES)', officers: 290, readiness: 64, criticalGaps: 9, topNeed: 'Crop Estimation & Remote Sensing' },
    { name: 'Health & Family Welfare (MoHFW)', officers: 210, readiness: 74, criticalGaps: 6, topNeed: 'Public Health Analytics' },
    { name: 'Ministry of Labour & Employment', officers: 190, readiness: 58, criticalGaps: 8, topNeed: 'Periodic Labour Force Data' },
    { name: 'Ministry of Education', officers: 150, readiness: 69, criticalGaps: 3, topNeed: 'Learning Outcomes Metrics' },
  ];

  const adminHeader = (
    <header className="bg-gov-navy text-white text-xs border-b border-white/10 w-full shadow-xs">
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green w-full" />
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-gov-green flex items-center justify-center font-bold text-white text-xs shadow-xs">
            <Shield size={18} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white leading-tight">Administration & Governance Portal</h1>
              <span className="badge-gov-success text-[9px] font-bold">MoSPI / DIID Control Center</span>
            </div>
            <p className="text-[10px] text-white/70">Department Hierarchy, Role Blueprints & Workforce Analytics</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBackToPortals}
            className="flex items-center gap-1 text-white/80 hover:text-white bg-white/10 hover:bg-white/15 px-3 py-1.5 rounded text-xs font-semibold border border-white/20 transition-colors"
          >
            <ChevronLeft size={14} />
            <span>Back to Portals</span>
          </button>
        </div>
      </div>
    </header>
  );

  const adminFooter = (
    <footer className="w-full bg-white border-t border-gov-gray-200 py-3 px-4 sm:px-6 lg:px-8 text-center text-xs text-gov-gray-500 shrink-0">
      <p>© {new Date().getFullYear()} Ministry of Statistics & Programme Implementation · DIID Governance Suite</p>
    </footer>
  );

  return (
    <PreDashboardLayout header={adminHeader} footer={adminFooter}>
      {/* ── Main Admin Workspace ─────────────────────────────────────────── */}
      <main className="w-full flex-1 px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-gov-gray-200 pb-3">
          {[
            { id: 'overview', label: 'Workforce Intelligence', icon: BarChart2 },
            { id: 'departments', label: 'Department Management', icon: Building2 },
            { id: 'roles', label: 'Role & Competency Blueprints', icon: Layers },
            { id: 'integrations', label: 'iGOT Ecosystem Sync', icon: CheckCircle2 },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-gov text-xs font-bold transition-all ${
                  active
                    ? 'bg-gov-navy text-white shadow-xs'
                    : 'bg-white text-gov-gray-600 hover:bg-gov-gray-100 border border-gov-gray-200'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. Stat Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {adminStats.map((st) => {
            const Icon = st.icon;
            return (
              <div key={st.title} className={`gov-card p-4 border-l-4 ${st.border} flex items-start justify-between`}>
                <div>
                  <span className="text-[10px] font-bold text-gov-gray-400 uppercase tracking-wider">{st.title}</span>
                  <p className="text-2xl font-black text-gov-navy mt-1">{st.value}</p>
                  <p className="text-xs text-gov-gray-500 mt-0.5">{st.sub}</p>
                </div>
                <div className="w-8 h-8 rounded-gov bg-gov-off-white flex items-center justify-center">
                  <Icon size={16} className={st.color} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Department Workforce Health Matrix */}
        <div className="gov-card overflow-hidden">
          <div className="p-4 border-b border-gov-gray-200 flex items-center justify-between bg-gov-off-white">
            <h3 className="text-xs font-bold text-gov-navy uppercase tracking-wider flex items-center gap-2">
              <Building2 size={15} className="text-gov-blue" />
              Department Workforce Competency Matrix
            </h3>
            <span className="text-xs text-gov-gray-500">Live Ministry Rollup</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-gov-gray-100 text-gov-gray-600 font-bold border-b border-gov-gray-200">
                <tr>
                  <th className="p-3">Department / Division</th>
                  <th className="p-3 text-center">Officers</th>
                  <th className="p-3">Average Readiness</th>
                  <th className="p-3 text-center">Critical Gaps</th>
                  <th className="p-3">Priority Capacity Need</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gov-gray-200">
                {departmentHealth.map((dept) => (
                  <tr key={dept.name} className="hover:bg-gov-gray-50 transition-colors">
                    <td className="p-3 font-bold text-gov-navy">{dept.name}</td>
                    <td className="p-3 text-center text-gov-gray-700">{dept.officers}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="progress-track h-2 w-24">
                          <div
                            className={`h-full rounded-full ${dept.readiness >= 70 ? 'bg-gov-green' : dept.readiness >= 60 ? 'bg-gov-saffron' : 'bg-gov-red'}`}
                            style={{ width: `${dept.readiness}%` }}
                          />
                        </div>
                        <span className="font-bold text-gov-navy">{dept.readiness}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <span className="badge-gov-danger text-[10px] font-bold">{dept.criticalGaps} Gaps</span>
                    </td>
                    <td className="p-3 text-gov-gray-600 font-medium">{dept.topNeed}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </PreDashboardLayout>
  );
}
