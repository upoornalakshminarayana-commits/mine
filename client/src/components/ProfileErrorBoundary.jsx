import React from 'react';
import { ShieldAlert, RefreshCw, LayoutDashboard, AlertTriangle } from 'lucide-react';

/**
 * Error Boundary for Employee Profile and Profile Dropdown components.
 * Prevents profile rendering crashes from turning the screen into a white screen.
 */
export default class ProfileErrorBoundary extends React.Component {
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
    console.error('ProfileErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleTryAgain = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  handleBackToDashboard = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = '/dashboard';
  };

  render() {
    if (this.state.hasError) {
      const isDev = Boolean(import.meta.env?.DEV);

      // If it's used inside a small container like a dropdown
      if (this.props.compact) {
        return (
          <div className="p-4 bg-white border border-gov-red/30 rounded-gov-md shadow-gov-dropdown text-xs text-center space-y-2">
            <p className="font-bold text-gov-red">Profile menu failed to render</p>
            <p className="text-[11px] text-gov-gray-600">Please refresh the page</p>
            <button
              onClick={this.handleTryAgain}
              className="btn-gov-secondary text-[11px] px-2 py-1 mx-auto"
            >
              Retry
            </button>
          </div>
        );
      }

      return (
        <div className="w-full min-h-[400px] flex items-center justify-center p-6 bg-gov-off-white">
          <div className="gov-card max-w-lg w-full p-8 text-center bg-white border border-gov-gray-200 shadow-gov-card rounded-gov-lg space-y-5">
            <div className="w-16 h-16 rounded-full bg-gov-red/10 text-gov-red flex items-center justify-center mx-auto ring-8 ring-gov-red/5">
              <ShieldAlert size={32} />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-black text-gov-navy tracking-tight">
                Profile could not be loaded
              </h2>
              <p className="text-sm text-gov-gray-600 leading-relaxed max-w-md mx-auto">
                Something unexpected happened while opening your profile.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={this.handleTryAgain}
                className="btn-gov-primary w-full sm:w-auto px-5 py-2.5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <RefreshCw size={14} />
                <span>Try Again</span>
              </button>

              <button
                onClick={this.handleBackToDashboard}
                className="btn-gov-secondary w-full sm:w-auto px-5 py-2.5 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <LayoutDashboard size={14} />
                <span>Back to Dashboard</span>
              </button>
            </div>

            {/* Technical details (Development Only) */}
            {isDev && this.state.error && (
              <div className="mt-6 p-4 text-left bg-gray-50 border border-gray-200 rounded-gov text-xs space-y-1.5 overflow-hidden">
                <div className="flex items-center gap-1.5 text-amber-700 font-bold text-[11px] uppercase tracking-wider">
                  <AlertTriangle size={13} />
                  <span>Technical Details (Development Only)</span>
                </div>
                <p className="font-mono text-[11px] text-red-600 break-words font-semibold">
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo?.componentStack && (
                  <pre className="mt-2 text-[10px] text-gray-500 font-mono overflow-x-auto max-h-36 p-2 bg-gray-100 rounded">
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
