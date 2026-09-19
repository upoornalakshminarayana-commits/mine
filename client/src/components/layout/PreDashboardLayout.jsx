import { useEffect, useRef, useState } from 'react';

/**
 * PreDashboardLayout
 * Reusable static-header shell architecture for all pre-dashboard pages:
 * 1. Login / Sign In page
 * 2. Portal Selection page
 * 3. Employee Selection page
 * 4. Initial Competency Diagnostic Quiz page
 * 5. Diagnostic Results & Skill Gap report page
 * 6. Trainer & Admin pre-dashboard portal views
 *
 * Architecture:
 * - Locks html/body scroll via 'pre-dashboard-active'
 * - Fixed application shell (fixed inset-0, overflow: hidden)
 * - Static fixed top header (position: fixed, top: 0, z-index: 1000) containing top border & header elements
 * - Dedicated scroll container (overflow-y: auto) beneath the header
 * - Prevents double scrollbars, layout jump, and ensures top bar is 100% stationary during scroll
 */
export default function PreDashboardLayout({
  header,
  children,
  footer,
  className = '',
  contentClassName = '',
}) {
  const headerRef = useRef(null);
  const scrollRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  // Prevent document/body level scroll when inside pre-dashboard flows
  useEffect(() => {
    document.documentElement.classList.add('pre-dashboard-active');
    document.body.classList.add('pre-dashboard-active');
    return () => {
      document.documentElement.classList.remove('pre-dashboard-active');
      document.body.classList.remove('pre-dashboard-active');
    };
  }, []);

  // Dynamically measure header height for pixel-perfect content offset across all screen resolutions
  useEffect(() => {
    if (!headerRef.current) return;

    const measureHeight = () => {
      if (headerRef.current) {
        const measured = headerRef.current.offsetHeight;
        if (measured > 0) {
          setHeaderHeight(measured);
          document.documentElement.style.setProperty('--predash-header-height', `${measured}px`);
        }
      }
    };

    measureHeight();

    let resizeObserver = null;
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(measureHeight);
      resizeObserver.observe(headerRef.current);
    }
    window.addEventListener('resize', measureHeight);

    return () => {
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('resize', measureHeight);
    };
  }, []);

  // Reset scroll container position to top on mount
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, []);

  return (
    <div className="pre-dashboard-shell-root bg-gov-off-white text-gov-gray-800">
      {/* ── 1. STATIC TOP HEADER & UPPER BORDER (ATTACHED TO VIEWPORT) ── */}
      <div
        ref={headerRef}
        className="pre-dashboard-header-fixed bg-gov-navy shadow-xs"
      >
        {header}
      </div>

      {/* ── 2. DEDICATED SCROLLABLE CONTENT CONTAINER ───────────────── */}
      <div
        ref={scrollRef}
        className={`pre-dashboard-scroll-container ${className}`}
        style={{
          marginTop: headerHeight ? `${headerHeight}px` : 'var(--predash-header-height, 68px)',
          height: headerHeight ? `calc(100vh - ${headerHeight}px)` : 'calc(100vh - var(--predash-header-height, 68px))',
        }}
      >
        <div className={`flex-1 flex flex-col w-full ${contentClassName}`}>
          {children}
        </div>
        {footer}
      </div>
    </div>
  );
}
