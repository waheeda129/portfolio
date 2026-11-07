import {createContext, useContext, useEffect, useRef, type ReactNode} from 'react';
import {
  cubicBezier,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * One clock for every piece of motion on the home page.
 *
 * The source of truth is the currentTime of a long Web Animation on a hidden
 * element. Framer Motion's frame loop (useAnimationFrame) reads it once per
 * frame and publishes it as a MotionValue, so every card derives its state
 * from the same number. A recorder that pauses and seeks Web Animations
 * therefore captures the page exactly.
 */

type Clock = {time: MotionValue<number>; reduced: boolean};

const ClockContext = createContext<Clock | null>(null);

export const easeOut = cubicBezier(0.22, 1, 0.36, 1);
export const easeInOut = cubicBezier(0.65, 0, 0.35, 1);

export function ClockProvider({children}: {children: ReactNode}) {
  const time = useMotionValue(0);
  const reduced = useReducedMotion() ?? false;
  const clockEl = useRef<HTMLDivElement>(null);
  const anim = useRef<Animation | null>(null);

  useEffect(() => {
    const el = clockEl.current;
    if (!el || typeof el.animate !== 'function') return;
    const a = el.animate([{opacity: 0}, {opacity: 1}], {duration: 1e9, fill: 'both'});
    anim.current = a;
    return () => a.cancel();
  }, []);

  useAnimationFrame((frameTime) => {
    const ct = anim.current?.currentTime;
    // Fallback for browsers without Web Animations: Framer Motion's own frame time.
    time.set(ct == null ? frameTime : Number(ct));
  });

  return (
    <ClockContext.Provider value={{time, reduced}}>
      <div ref={clockEl} aria-hidden="true" className="clock-source" />
      {children}
    </ClockContext.Provider>
  );
}

export function useClock() {
  const ctx = useContext(ClockContext);
  if (!ctx) throw new Error('useClock must be used inside ClockProvider');
  return ctx;
}

/** Subscribe to every clock tick (ms). The callback runs inside the shared frame loop. */
export function useTick(cb: (t: number) => void) {
  const {time} = useClock();
  const saved = useRef(cb);
  saved.current = cb;
  useEffect(() => time.on('change', (t) => saved.current(t)), [time]);
}

/** Entrance: rise 14px and fade in over 0.7s, staggered 80ms in DOM order. */
export function Reveal({
  index,
  className,
  children,
  as = 'div',
  ...rest
}: {
  index: number;
  className?: string;
  children: ReactNode;
  as?: 'div' | 'section' | 'header' | 'article';
} & Record<string, unknown>) {
  const {time, reduced} = useClock();
  const start = 120 + index * 80;
  const opacity = useTransform(time, [start, start + 700], [0, 1], {ease: easeOut});
  const y = useTransform(time, [start, start + 700], [14, 0], {ease: easeOut});
  const Tag = motion[as];
  return (
    <Tag className={className} style={reduced ? undefined : {opacity, y}} {...rest}>
      {children}
    </Tag>
  );
}
