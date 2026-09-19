import React from 'react';
import { ShieldAlert, RefreshCw, RotateCcw } from 'lucide-react';

/**
 * Root Error Boundary for the entire KarmaSiksha application.
 * Catches any unhandled React runtime errors and prevents the dreaded blank white screen.
 */
export default class RootErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RootErrorBoundary caught unhandled application error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleResetState = () => {
    try {
      localStorage.removeItem('ks_is_logged_in');
      localStorage.removeItem('ks_token');
      localStorage.removeItem('ks_user');
      localStorage.removeItem('ks_active_portal');
      localStorage.removeItem('ks_employee_profile');
      localStorage.removeItem('ks_selected_stream');
      localStorage.removeItem('ks_stream_answers');
      localStorage.removeItem('ks_role_answers');
      localStorage.removeItem('ks_assessment_completed');
      localStorage.removeItem('ks_onboarding_step');
    } catch (e) {
      console.warn('Could not clear local storage', e);
    }
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV);

      return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-[#F4F6F9] font-sans">
          <div className="max-w-xl w-full p-8 text-center bg-white border-2 border-slate-200 shadow-xl rounded-xl space-y-6">
            {/* Header Emblem */}
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto ring-8 ring-red-50/50">
              <ShieldAlert size={34} />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-full uppercase tracking-wider">
                Application Recovery
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B1E3B] tracking-tight">
                KarmaSiksha Portal Encountered an Issue
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
                An unexpected error interrupted this session. You can reload the portal or reset your local session state below.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto px-6 py-2.5 bg-[#0B1E3B] hover:bg-[#152e5a] text-white text-xs font-bold rounded-md flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                <RefreshCw size={14} />
                <span>Reload Page</span>
              </button>

              <button
                onClick={this.handleResetState}
                className="w-full sm:w-auto px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-md flex items-center justify-center gap-2 transition-all"
              >
                <RotateCcw size={14} />
                <span>Reset Session & Return Home</span>
              </button>
            </div>

            {/* Technical details (Development Only) */}
            {isDev && this.state.error && (
              <div className="mt-6 p-4 text-left bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-2 overflow-hidden">
                <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Technical Details:
                </p>
                <p className="font-mono text-[11px] text-red-600 break-words font-semibold">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-2 text-[10px] text-slate-500 font-mono overflow-x-auto max-h-40 p-2 bg-slate-100 rounded">
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
