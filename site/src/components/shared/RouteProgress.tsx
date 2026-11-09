'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

/**
 * Thin brand-colored bar at the top of the page while a client-side navigation is loading.
 * Starts when an internal link to another page is clicked and finishes when the new route renders.
 */
const RouteProgress = () => {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const active = useRef(false);

  const clearTimers = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
    }
  };

  // Start on internal link clicks.
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }
      const link = (event.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) {
        return;
      }
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol.indexOf('http') !== 0) {
        return;
      }
      // Same page (or only a #hash change): nothing loads.
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        return;
      }
      clearTimers();
      active.current = true;
      setVisible(true);
      setProgress(8);
      // Creep toward 90% until the route changes.
      timer.current = setInterval(() => {
        setProgress((value) => (value < 90 ? value + (90 - value) * 0.12 : value));
      }, 200);
    };
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('click', onClick, true);
      clearTimers();
    };
  }, []);

  // Finish when the new route has rendered.
  useEffect(() => {
    if (!active.current) {
      return;
    }
    active.current = false;
    clearTimers();
    setProgress(100);
    hideTimer.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 300);
  }, [pathname]);

  return (
    <div
      aria-hidden
      className="route-progress pointer-events-none fixed inset-x-0 top-0 z-[9999] h-[3px]"
      style={{ opacity: visible ? 1 : 0 }}>
      <div
        className="bg-primary-500 h-full shadow-[0_0_8px_rgba(200,33,39,0.6)]"
        style={{ width: `${progress}%`, transition: 'width 200ms ease-out' }}
      />
    </div>
  );
};

RouteProgress.displayName = 'RouteProgress';
export default RouteProgress;
