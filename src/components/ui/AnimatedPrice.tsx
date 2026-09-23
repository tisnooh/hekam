'use client';

import { animate, useMotionValue, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';

/** Prix animé : transition progressive (pas de saut brutal). */
export default function AnimatedPrice({ value, className }: { value: number; className?: string }) {
  const reduce = useReducedMotion();
  const motion = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(motion, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, motion, reduce]);

  return <span className={className}>{formatPrice(display)}</span>;
}
