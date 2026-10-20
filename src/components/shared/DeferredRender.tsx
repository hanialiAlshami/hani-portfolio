'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Defers mounting of heavy client components until they are near the viewport.
 * Reserves space via minHeight to avoid layout shift.
 */
export function DeferredRender({
  children,
  rootMargin = '400px',
  minHeight,
}: {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, rootMargin]);

  return (
    <div ref={ref} style={show ? undefined : { minHeight }}>
      {show ? children : null}
    </div>
  );
}
