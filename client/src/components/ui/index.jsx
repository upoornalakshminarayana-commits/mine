import { forwardRef } from 'react';
import clsx from 'clsx';

// ─── BUTTON ───────────────────────────────────────────────────────────────────
export function Button({
  children, variant = 'primary', size = 'md', loading = false,
  disabled, className, type = 'button', onClick, ...props
}) {
  const sizeClass = { sm: 'btn-sm', md: 'btn-md', lg: 'btn-lg', xl: 'btn-xl' }[size];
  const variantClass = {
    primary: 'btn-primary', secondary: 'btn-secondary',
    ghost: 'btn-ghost', danger: 'btn-danger', navy: 'btn-navy',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(sizeClass, variantClass, className)}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </button>
  );
}

// ─── INPUT ────────────────────────────────────────────────────────────────────
export const Input = forwardRef(function Input(
  { label, error, hint, required, className, size = 'default', ...props }, ref
) {
  return (
    <div className="form-group">
      {label && (
        <label className={clsx('label', required && 'label-required')}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={clsx(
          size === 'lg' ? 'input-lg' : 'input',
          error && 'input-error',
          className
        )}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
      {hint && !error && <p className="form-hint">{hint}</p>}
    </div>
  );
});

// ─── TEXTAREA ─────────────────────────────────────────────────────────────────
export const Textarea = forwardRef(function Textarea(
  { label, error, hint, required, className, rows = 3, ...props }, ref
) {
  return (
    <div className="form-group">
      {label && <label className={clsx('label', required && 'label-required')}>{label}</label>}
      <textarea
        ref={ref}
        rows={rows}
        className={clsx('input resize-y min-h-[80px]', error && 'input-error', className)}
        {...props}
      />
      {error && <p className="form-error">{error}</p>}
      {hint && !error && <p className="form-hint">{hint}</p>}
    </div>
  );
});

// ─── SELECT ───────────────────────────────────────────────────────────────────
export const Select = forwardRef(function Select(
  { label, error, hint, required, className, children, ...props }, ref
) {
  return (
    <div className="form-group">
      {label && <label className={clsx('label', required && 'label-required')}>{label}</label>}
      <select
        ref={ref}
        className={clsx('input', error && 'input-error', className)}
        {...props}
      >
        {children}
      </select>
      {error && <p className="form-error">{error}</p>}
      {hint && !error && <p className="form-hint">{hint}</p>}
    </div>
  );
});

// ─── BADGE ────────────────────────────────────────────────────────────────────
export function Badge({ children, variant = 'slate', className }) {
  const variantClass = {
    primary: 'badge-primary', success: 'badge-success', warning: 'badge-warning',
    danger: 'badge-danger', slate: 'badge-slate', navy: 'badge-navy', sky: 'badge-sky',
    'ai-generated': 'status-ai-generated', draft: 'status-draft',
    'under-review': 'status-under-review', approved: 'status-approved',
    published: 'status-published', rejected: 'status-rejected', archived: 'status-archived',
  }[variant] || 'badge-slate';

  return <span className={clsx(variantClass, className)}>{children}</span>;
}

// ─── CARD ─────────────────────────────────────────────────────────────────────
export function Card({ children, className, hover = false, onClick }) {
  return (
    <div className={clsx(hover ? 'card-hover cursor-pointer' : 'card', className)} onClick={onClick}>
      {children}
    </div>
  );
}

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export function StatCard({ label, value, change, changeLabel, icon: Icon, color = 'primary', trend }) {
  const colorMap = {
    primary: 'text-primary-600 bg-primary-50',
    success: 'text-success-600 bg-success-50',
    warning: 'text-warning-600 bg-warning-50',
    danger: 'text-danger-600 bg-danger-50',
    sky: 'text-sky-600 bg-sky-50',
    navy: 'text-navy-900 bg-navy-50',
  };
  return (
    <div className="stat-card">
      <div className="flex items-start justify-between">
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        {Icon && (
          <div className={clsx('p-2.5 rounded-lg', colorMap[color])}>
            <Icon size={20} />
          </div>
        )}
      </div>
      {change !== undefined && (
        <p className={trend === 'up' ? 'stat-change-up' : 'stat-change-down'}>
          {trend === 'up' ? '↑' : '↓'} {change}% {changeLabel}
        </p>
      )}
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────
export function ProgressBar({ value, max = 100, label, showPercent = true, size = 'md', color = 'primary' }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3' };
  const colorMap = { primary: 'bg-primary-600', success: 'bg-success-500', warning: 'bg-warning-500', danger: 'bg-danger-500' };
  return (
    <div>
      {(label || showPercent) && (
        <div className="flex justify-between mb-1">
          {label && <span className="text-xs text-slate-600">{label}</span>}
          {showPercent && <span className="text-xs font-medium text-slate-700">{Math.round(pct)}%</span>}
        </div>
      )}
      <div className={clsx('progress-bar-track', heights[size])}>
        <div
          className={clsx('progress-bar-fill', colorMap[color], heights[size])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ─── SPINNER ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 'md', className }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-6 w-6', lg: 'h-8 w-8', xl: 'h-12 w-12' };
  return (
    <svg className={clsx('animate-spin text-primary-600', sizes[size], className)} fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ─── LOADING STATE ────────────────────────────────────────────────────────────
export function LoadingState({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-3">
      <Spinner size="lg" />
      <p className="text-slate-500 text-sm">{message}</p>
    </div>
  );
}

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
export function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="empty-state">
      {Icon && <Icon className="empty-state-icon" />}
      <p className="empty-state-title">{title}</p>
      {description && <p className="empty-state-text">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

// ─── ERROR STATE ──────────────────────────────────────────────────────────────
export function ErrorState({ message, onRetry }) {
  return (
    <div className="empty-state">
      <div className="w-12 h-12 rounded-full bg-danger-50 flex items-center justify-center mb-4">
        <svg className="w-6 h-6 text-danger-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p className="empty-state-title text-danger-700">Something went wrong</p>
      <p className="empty-state-text">{message || 'An unexpected error occurred. Please try again.'}</p>
      {onRetry && (
        <Button className="mt-4" onClick={onRetry} size="sm">Try Again</Button>
      )}
    </div>
  );
}

// ─── PAGINATION ───────────────────────────────────────────────────────────────
export function Pagination({ page, pages, onPage }) {
  if (pages <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <Button variant="ghost" size="sm" disabled={page === 1} onClick={() => onPage(page - 1)}>← Prev</Button>
      {Array.from({ length: Math.min(pages, 7) }, (_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => onPage(p)}
            className={clsx(
              'w-8 h-8 rounded-md text-sm font-medium transition-colors',
              p === page ? 'bg-primary-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            )}
          >{p}</button>
        );
      })}
      <Button variant="ghost" size="sm" disabled={page === pages} onClick={() => onPage(page + 1)}>Next →</Button>
    </div>
  );
}

// ─── LEVEL BADGE ──────────────────────────────────────────────────────────────
export function LevelBadge({ level }) {
  const variantMap = {
    FOUNDATION: 'slate', BEGINNER: 'sky', INTERMEDIATE: 'primary',
    ADVANCED: 'warning', EXPERT: 'success',
  };
  return <Badge variant={variantMap[level] || 'slate'}>{level?.charAt(0) + level?.slice(1).toLowerCase()}</Badge>;
}

// ─── SEVERITY BADGE ───────────────────────────────────────────────────────────
export function SeverityBadge({ severity }) {
  const variantMap = {
    NONE: 'success', LOW: 'sky', MODERATE: 'warning',
    HIGH: 'danger', CRITICAL: 'danger',
  };
  const labelMap = { NONE: 'No Gap', LOW: 'Low', MODERATE: 'Moderate', HIGH: 'High', CRITICAL: 'Critical' };
  return <Badge variant={variantMap[severity] || 'slate'}>{labelMap[severity] || severity}</Badge>;
}

// ─── STATUS BADGE ─────────────────────────────────────────────────────────────
export function StatusBadge({ status }) {
  const variantMap = {
    AI_GENERATED: 'ai-generated', DRAFT: 'draft', UNDER_REVIEW: 'under-review',
    APPROVED: 'approved', PUBLISHED: 'published', REJECTED: 'rejected', ARCHIVED: 'archived',
    ACTIVE: 'success', INACTIVE: 'slate', SUSPENDED: 'danger',
    IN_PROGRESS: 'sky', COMPLETED: 'success', NOT_STARTED: 'slate',
  };
  const labelMap = {
    AI_GENERATED: 'AI Generated', UNDER_REVIEW: 'Under Review',
    NOT_STARTED: 'Not Started', IN_PROGRESS: 'In Progress',
  };
  return (
    <Badge variant={variantMap[status] || 'slate'}>
      {labelMap[status] || status?.charAt(0) + status?.slice(1).toLowerCase().replace(/_/g, ' ')}
    </Badge>
  );
}

// ─── DIVIDER ──────────────────────────────────────────────────────────────────
export function Divider({ label }) {
  if (!label) return <hr className="divider my-4" />;
  return (
    <div className="divider-text my-4">
      <span>{label}</span>
    </div>
  );
}

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
export function Tooltip({ children, text, position = 'top' }) {
  return (
    <div className="relative group inline-block">
      {children}
      <div className={clsx(
        'absolute z-50 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-150',
        'bg-slate-900 text-white text-xs rounded-md px-2.5 py-1.5 whitespace-nowrap pointer-events-none',
        position === 'top' && 'bottom-full mb-1.5 left-1/2 -translate-x-1/2',
        position === 'bottom' && 'top-full mt-1.5 left-1/2 -translate-x-1/2',
        position === 'left' && 'right-full mr-1.5 top-1/2 -translate-y-1/2',
        position === 'right' && 'left-full ml-1.5 top-1/2 -translate-y-1/2',
      )}>
        {text}
      </div>
    </div>
  );
}

// ─── ALERT ────────────────────────────────────────────────────────────────────
export function Alert({ type = 'info', title, children, onClose }) {
  const styles = {
    info: 'bg-sky-50 border-sky-200 text-sky-800',
    success: 'bg-success-50 border-success-100 text-success-800',
    warning: 'bg-warning-50 border-warning-100 text-warning-800',
    error: 'bg-danger-50 border-danger-100 text-danger-800',
  };
  return (
    <div className={clsx('flex gap-3 p-4 rounded-lg border', styles[type])}>
      <div className="flex-1">
        {title && <p className="font-semibold text-sm mb-0.5">{title}</p>}
        <p className="text-sm">{children}</p>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-current opacity-60 hover:opacity-100 shrink-0">✕</button>
      )}
    </div>
  );
}

// ─── TABLE WRAPPER ────────────────────────────────────────────────────────────
export function Table({ children, className }) {
  return (
    <div className={clsx('table-wrapper', className)}>
      <table className="table">{children}</table>
    </div>
  );
}
