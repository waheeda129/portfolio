import {useRef, useState} from 'react';
import {motion, useTransform} from 'framer-motion';
import {Pause, Play} from 'lucide-react';
import {useClock, useTick} from '../clock';

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 78 seeded bar heights (px) with two loud bursts. */
const BARS = (() => {
  const r = mulberry32(129);
  return Array.from({length: 78}, (_, i) => {
    const base = 4 + r() * 9;
    const burst = 17 * Math.exp(-((i - 21) ** 2) / 18) + 15 * Math.exp(-((i - 54) ** 2) / 14);
    return Math.round(Math.min(28, base + burst * (0.75 + r() * 0.35)));
  });
})();

const VOICE_START = 1300;
const VOICE_LENGTH = 32000;

const fmt = (ms: number) => {
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export function VoiceNote() {
  const {reduced} = useClock();
  const [playing, setPlaying] = useState(false);
  // While playing, elapsed = t - anchor, read straight from the shared clock.
  const st = useRef({playing: false, elapsed: 0, anchor: 0, now: 0, touched: false});
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const timer = useRef<HTMLSpanElement>(null);

  useTick((t) => {
    const s = st.current;
    s.now = t;

    if (!s.touched && !reduced && t >= VOICE_START) {
      s.touched = true;
      s.playing = true;
      s.anchor = VOICE_START;
      setPlaying(true);
    }
    if (s.playing) {
      s.elapsed = t - s.anchor;
      if (s.elapsed >= VOICE_LENGTH) {
        s.elapsed = 0;
        s.playing = false;
        setPlaying(false);
      }
    }

    const head = (s.elapsed / VOICE_LENGTH) * BARS.length;
    for (let i = 0; i < BARS.length; i++) {
      const el = bars.current[i];
      if (!el) continue;
      let k = 1;
      if (s.playing && !reduced) {
        const d = Math.abs(i + 0.5 - head);
        if (d < 4) k = 1 + 0.55 * (1 - d / 4) * (0.55 + 0.45 * Math.sin(t / 95 + i * 1.7));
      }
      el.style.transform = `scaleY(${k.toFixed(3)})`;
      el.dataset.played = i < head ? 'y' : 'n';
    }
    if (timer.current) timer.current.textContent = fmt(s.elapsed);
  });

  const toggle = () => {
    const s = st.current;
    s.touched = true;
    s.playing = !s.playing;
    if (s.playing) s.anchor = s.now - s.elapsed;
    setPlaying(s.playing);
  };

  return (
    <div className="pill voice" role="group" aria-label="Voice intro">
      <button
        type="button"
        className="voice-btn"
        onClick={toggle}
        aria-label={playing ? 'Pause voice intro' : 'Play voice intro'}
        aria-pressed={playing}
      >
        {playing ? (
          <Pause size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" />
        ) : (
          <Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" className="nudge" />
        )}
      </button>
      <span className="wave" aria-hidden="true">
        {BARS.map((h, i) => (
          <span
            key={i}
            ref={(el) => {
              bars.current[i] = el;
            }}
            className="bar"
            style={{height: h}}
          />
        ))}
      </span>
      <span ref={timer} className="voice-time" aria-hidden="true">
        0:00
      </span>
    </div>
  );
}

export function Available() {
  const {time, reduced} = useClock();
  const phase = useTransform(time, (t) => (t % 1800) / 1800);
  const scale = useTransform(phase, [0, 1], [1, 2.4]);
  const opacity = useTransform(phase, [0, 1], [0.45, 0]);
  return (
    <div className="pill available">
      <span className="dot" aria-hidden="true">
        {!reduced && <motion.span className="halo" style={{scale, opacity}} />}
      </span>
      Available for work
    </div>
  );
}
