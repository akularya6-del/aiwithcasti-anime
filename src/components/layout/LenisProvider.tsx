'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenisInstance } from '@/lib/lenis';
import { useStore } from '@/stores/useStore';

gsap.registerPlugin(ScrollTrigger);

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const setScrollProgress = useStore((s) => s.setScrollProgress);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    setLenisInstance(lenis);

    const onScroll = () => {
      ScrollTrigger.update();
      const progress = lenis.progress || 0;
      setScrollProgress(Number.isFinite(progress) ? progress : 0);
    };
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    ScrollTrigger.config({ limitCallbacks: true });

    return () => {
      gsap.ticker.remove(raf);
      lenis.off('scroll', onScroll);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [setScrollProgress]);

  return <>{children}</>;
}
