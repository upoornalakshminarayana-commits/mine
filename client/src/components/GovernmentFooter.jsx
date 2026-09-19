import { Link } from 'react-router-dom';
import { ExternalLink, PhoneCall, Mail, Globe } from 'lucide-react';

export default function GovernmentFooter() {
  const year = new Date().getFullYear();

  const footerLinks = {
    'Platform': [
      { label: 'Home', to: '/dashboard' },
      { label: 'My Competencies', to: '/competencies' },
      { label: 'Skill Assessment', to: '/assessment' },
      { label: 'Learning', to: '/learning' },
      { label: 'My Progress', to: '/progress' },
    ],
    'Resources': [
      { label: 'iGOT Karmayogi', href: 'https://www.igot.gov.in', external: true },
      { label: 'Digital India', href: 'https://www.digitalindia.gov.in', external: true },
      { label: 'MoSPI', href: 'https://www.mospi.gov.in', external: true },
    ],
    'Legal & Support': [
      { label: 'Accessibility', to: '#' },
      { label: 'Privacy Policy', to: '#' },
      { label: 'Terms of Use', to: '#' },
      { label: 'Help & Support', to: '/help' },
    ],
  };

  return (
    <footer className="bg-gov-navy text-white mt-12">
      {/* Top accent */}
      <div className="h-1 bg-gradient-to-r from-gov-saffron via-white to-gov-green" />

      {/* Main footer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center">
                <span className="text-[8px] font-bold text-gov-saffron leading-none text-center">GOVT<br/>INDIA</span>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Government Employee</p>
                <p className="text-xs font-bold text-white">Competency & Learning Portal</p>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed mb-4 max-w-xs">
              An initiative of the Ministry of Statistics & Programme Implementation for developing competencies across India's Official Statistical System.
            </p>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <Globe size={11} />
                <a href="https://www.mospi.gov.in" target="_blank" rel="noreferrer"
                  className="hover:text-white transition-colors">www.mospi.gov.in</a>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-white/50">
                <Mail size={11} />
                <span>support@competency.gov.in</span>
              </div>
            </div>

            {/* iGOT placeholder */}
            <div className="mt-4 inline-flex items-center gap-2 border border-white/20 rounded px-3 py-1.5 bg-white/5">
              <div className="w-4 h-4 rounded-sm bg-gov-saffron flex items-center justify-center text-white text-[8px] font-bold">iG</div>
              <span className="text-[11px] text-white/60">iGOT Karmayogi [Integration Placeholder]</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-[11px] font-semibold text-white/80 uppercase tracking-wider mb-3">{group}</h4>
              <ul className="space-y-2">
                {links.map(({ label, to, href, external }) => (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noreferrer"
                        className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1">
                        {label} <ExternalLink size={9} />
                      </a>
                    ) : to ? (
                      <Link to={to} className="text-xs text-white/50 hover:text-white transition-colors">{label}</Link>
                    ) : (
                      <span className="text-xs text-white/50">{label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/40">
            <p>© {year} Government Employee Competency Platform · Ministry of Statistics & Programme Implementation</p>
            <p className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gov-green animate-pulse" />
              This is a demonstration platform · Not an official Government of India website
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
