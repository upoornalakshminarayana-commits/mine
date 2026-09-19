import { Link } from 'react-router-dom';
import { GraduationCap, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap size={16} className="text-white" />
              </div>
              <span className="font-bold text-white">KarmaSiksha</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              AI-enabled competency development platform for India's Official Statistical System.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="badge bg-primary-900 text-primary-300 text-xs">MoSPI / DIID</span>
              <span className="badge bg-slate-800 text-slate-400 text-xs">DIID</span>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Platform</h4>
            <ul className="space-y-2">
              {[
                { label: 'Features', to: '/features' },
                { label: 'How It Works', to: '/how-it-works' },
                { label: 'Competency Framework', to: '/features' },
                { label: 'AI Assessment', to: '/features' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Resources</h4>
            <ul className="space-y-2">
              {[
                { label: 'Learning Catalog', to: '/learning' },
                { label: 'FAQ', to: '/faq' },
                { label: 'Contact', to: '/contact' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://www.igot.gov.in" target="_blank" rel="noreferrer"
                  className="text-sm text-slate-400 hover:text-white transition-colors inline-flex items-center gap-1">
                  iGOT Karmayogi <ExternalLink size={11} />
                </a>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">Account</h4>
            <ul className="space-y-2">
              {[
                { label: 'Sign In', to: '/login' },
                { label: 'Register', to: '/register' },
                { label: 'Dashboard', to: '/dashboard' },
              ].map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            © {currentYear} KarmaSiksha. Built for MoSPI – Data Informatics & Innovation Division (DIID).
          </p>
          <p className="text-xs text-slate-600">
            AI Provider: Mock (development mode) · iGOT Integration: Abstraction Layer Active
          </p>
        </div>
      </div>
    </footer>
  );
}
