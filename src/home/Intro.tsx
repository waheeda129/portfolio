import {useRef} from 'react';
import {motion, useTransform} from 'framer-motion';
import {easeInOut, useClock, useTick} from '../clock';
import {NOW} from '../data';

const NOW_EVERY = 3400;
const NOW_SWITCH = 420;
const NOW_FIRST = 2800;

/** "Now" line: what Waheeda is working on, rotating on the shared clock. */
export function NowLine() {
  const {reduced} = useClock();
  const outEl = useRef<HTMLSpanElement>(null);
  const inEl = useRef<HTMLSpanElement>(null);
  const st = useRef({shown: -1, painted: -1, hover: false, held: 0, last: 0});

  useTick((t) => {
    const s = st.current;
    if (s.hover) s.held += Math.max(0, t - s.last);
    s.last = t;
    if (reduced) return;
    const local = t - s.held - NOW_FIRST;
    const idx = local < 0 ? 0 : Math.floor(local / NOW_EVERY) + 1;
    const since = local < 0 ? Infinity : local - (idx - 1) * NOW_EVERY;
    const cur = idx % NOW.length;
    const prev = (idx - 1 + NOW.length) % NOW.length;
    if (cur !== s.shown) {
      s.shown = cur;
      if (outEl.current) outEl.current.textContent = NOW[prev];
      if (inEl.current) inEl.current.textContent = NOW[cur];
    }
    const raw = Math.min(1, since / NOW_SWITCH);
    if (raw === 1 && s.painted === cur) return;
    const e = easeInOut(raw);
    if (outEl.current) {
      outEl.current.style.transform = `translateY(${(-18 * e).toFixed(2)}px)`;
      outEl.current.style.opacity = raw === 1 ? '0' : (1 - e).toFixed(3);
    }
    if (inEl.current) {
      inEl.current.style.transform = `translateY(${(18 * (1 - e)).toFixed(2)}px)`;
      inEl.current.style.opacity = e.toFixed(3);
    }
    if (raw === 1) s.painted = cur;
  });

  return (
    <div
      className="pill now"
      onMouseEnter={() => (st.current.hover = true)}
      onMouseLeave={() => (st.current.hover = false)}
    >
      <span className="now-label">Now</span>
      <span className="now-window">
        <span ref={outEl} className="now-text" aria-hidden="true" style={{opacity: 0}} />
        <span ref={inEl} className="now-text" aria-hidden="true">
          {NOW[0]}
        </span>
      </span>
      <span className="sr-only">Currently: {NOW.join('; ')}.</span>
    </div>
  );
}

export function Available() {
  const {time, reduced} = useClock();
  const phase = useTransform(time, (t) => (t % 1800) / 1800);
  const scale = useTransform(phase, [0, 1], [1, 2.4]);
  const opacity = useTransform(phase, [0, 1], [0.45, 0]);
  return (
    <a className="pill available" href="/contact">
      <span className="dot" aria-hidden="true">
        {!reduced && <motion.span className="halo" style={{scale, opacity}} />}
      </span>
      Available for work
    </a>
  );
}
