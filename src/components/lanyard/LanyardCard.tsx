'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Component, useEffect, useState, type ReactNode } from 'react';

const Lanyard = dynamic(() => import('@/components/reactbits/Lanyard'), {
  ssr: false,
  loading: () => null,
});

function StaticCardFallback({ alt }: { alt: string }) {
  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-start pt-2"
      role="img"
      aria-label={alt}
      title={alt}
    >
      <div className="w-px h-[70px] sm:h-[92px] bg-gradient-to-b from-primary/5 via-primary/35 to-primary/60" />
      <div className="relative w-[180px] sm:w-[210px] aspect-[1.6/2.25] rounded-xl overflow-hidden border border-primary/30 shadow-[0_24px_70px_rgba(0,0,0,0.65)]">
        <Image src="/portfolio/lanyard/front.png" alt={alt} fill sizes="210px" className="object-cover" />
      </div>
    </div>
  );
}

class LanyardBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function LanyardCard({
  locale,
  className = '',
}: {
  locale: string;
  className?: string;
}) {
  const isAr = locale === 'ar';
  const [ready, setReady] = useState(false);
  const [webgl, setWebgl] = useState(true);

  const alt = isAr ? 'بطاقة تعريف هاني الشامي التفاعلية' : 'Interactive Hani Alshami ID card';

  useEffect(() => {
    let done = false;
    const go = () => {
      if (done) return;
      done = true;
      setReady(true);
    };

    try {
      const probe = document.createElement('canvas');
      const gl = probe.getContext('webgl2') || probe.getContext('webgl');
      if (!gl) setWebgl(false);
      else (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext();
    } catch {
      setWebgl(false);
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const idleId = win.requestIdleCallback
      ? win.requestIdleCallback(go, { timeout: 1000 })
      : 0;
    const timer = window.setTimeout(go, 1500);

    return () => {
      window.clearTimeout(timer);
      if (idleId && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
    };
  }, []);

  const fallback = <StaticCardFallback alt={alt} />;

  if (!webgl || !ready) {
    return (
      <div className={`relative w-full h-full ${className}`.trim()}>
        {fallback}
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`.trim()}>
      <LanyardBoundary fallback={fallback}>
        <Lanyard
          frontImage="/portfolio/lanyard/front.webp"
          backImage="/portfolio/lanyard/back.webp"
          strapImage="/portfolio/lanyard/strap.webp"
          cardColor="#0b0b0e"
          orientation="portrait"
          finish="glossy"
          metal="gold"
          cornerRadius={0.1}
          size={0.6}
          anchor="center"
          strapLength={0.5}
          strapColor="#0f0f13"
          strapWidth={0.65}
          gravity={1}
          damping={0.5}
          elasticity={0.5}
          breeze={0.3}
          interactive
          intro={false}
          imageFit="cover"
          style={{ width: '100%', height: '100%' }}
        />
      </LanyardBoundary>
    </div>
  );
}
