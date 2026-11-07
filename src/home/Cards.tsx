import {useEffect, useRef, useState, type ReactNode, type RefObject} from 'react';
import {motion} from 'framer-motion';
import {Building2, History, MapPin, Store, Workflow} from 'lucide-react';
import {easeInOut, useClock, useTick} from '../clock';
import {STEPS, TIMELINE} from '../data';
import {StockPanel, TamxPanel} from '../components/Visuals';

const SHADOW = '0px 1px 2px rgba(30, 28, 26, 0.04), 0px 10px 24px -14px rgba(30, 28, 26, 0.14)';
const SHADOW_LIFT = '0px 3px 6px rgba(30, 28, 26, 0.05), 0px 20px 36px -16px rgba(30, 28, 26, 0.24)';

const lift = {
  rest: {y: 0, boxShadow: SHADOW},
  hover: {y: -3, boxShadow: SHADOW_LIFT},
};

/** Cards that go somewhere lift on hover; cards that don't stay still, so nothing promises a click it can't keep. */
function Card({className, children, href, label}: {className: string; children: ReactNode; href?: string; label?: string}) {
  if (href) {
    return (
      <motion.a
        href={href}
        aria-label={label}
        className={`card is-link ${className}`}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        variants={lift}
        transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <article className={`card ${className}`} style={{boxShadow: SHADOW}}>
      {children}
    </article>
  );
}

function Chip({icon, children}: {icon: ReactNode; children: ReactNode}) {
  return (
    <span className="chip">
      {icon}
      {children}
    </span>
  );
}

const ico = {size: 13, strokeWidth: 1.7, 'aria-hidden': true} as const;

/* ---------------- Experience ---------------- */

export function ExperienceCard() {
  const {reduced} = useClock();
  const list = useRef<HTMLDivElement>(null);
  const paused = useRef(false);
  // Drift = (clock time minus time spent paused) at 9px/s.
  const st = useRef({held: 0, last: 0, loop: 0});

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const ro = new ResizeObserver(() => (st.current.loop = el.scrollHeight / 2));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useTick((t) => {
    const s = st.current;
    if (paused.current) s.held += Math.max(0, t - s.last);
    s.last = t;
    const el = list.current;
    if (reduced || !el || s.loop <= 0) return;
    const off = (((t - s.held) * 9) / 1000) % s.loop;
    el.style.transform = `translate3d(0, ${-off.toFixed(2)}px, 0)`;
  });

  const items = (dup: boolean) =>
    TIMELINE.map((it, i) => (
      <li key={`${dup ? 'b' : 'a'}${i}`} className="tl-item" aria-hidden={dup || undefined}>
        <span className="tl-title">{it.title}</span>
        <span className="tl-years">{it.years}</span>
      </li>
    ));

  return (
    <Card className="experience" href="/about#experience" label="Experience: Mapalz, TAMx, SaleForgers and COMSATS. See the full timeline">
      <Chip icon={<History {...ico} />}>Experience</Chip>
      <div
        className="tl-window"
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
      >
        <div ref={list} className="tl-track">
          <ol className="tl-list">{items(false)}</ol>
          <ol className="tl-list" aria-hidden="true">
            {items(true)}
          </ol>
        </div>
      </div>
    </Card>
  );
}

/* ---------------- SaleForgers ---------------- */

export function SaleForgersCard() {
  return (
    <Card className="saleforgers" href="/work/saleforgers" label="SaleForgers, Co-founder and COO. Read the case study">
      <Chip icon={<Building2 {...ico} />}>Co-founder & COO</Chip>
      <h2 className="sf-title">SaleForgers</h2>
      <p className="sf-sub">Custom software and automation for growing businesses</p>
      <p className="sf-shipped">Shipped StockFlow and FaceAttend</p>
      <div className="sf-panel">
        <StockPanel compact />
      </div>
    </Card>
  );
}

/* ---------------- Mapalz ---------------- */

export function MapalzCard() {
  return (
    <Card className="mapalz" href="/work/mapalz" label="Mapalz, founding team. Read the case study">
      <Chip icon={<Store {...ico} />}>Founding team</Chip>
      <h2 className="mz-title">Mapalz</h2>
      <p className="mz-sub">One platform for wholesalers, sellers and customers</p>
      <img
        className="mz-shot"
        src="/assets/mapalz-seller.webp"
        width={1200}
        height={800}
        alt="Mapalz seller dashboard"
      />
    </Card>
  );
}

/* ---------------- Map: Bagh, AJK ---------------- */

const MAP = (() => {
  const z = 14;
  const lat = 33.9811;
  const lon = 73.7754;
  const n = 2 ** z;
  const xt = ((lon + 180) / 360) * n;
  const lr = (lat * Math.PI) / 180;
  const yt = ((1 - Math.log(Math.tan(lr) + 1 / Math.cos(lr)) / Math.PI) / 2) * n;
  const tx = Math.floor(xt);
  const ty = Math.floor(yt);
  const fx = (xt - tx) * 256;
  const fy = (yt - ty) * 256;
  const tiles: {key: string; src: string; dx: number; dy: number}[] = [];
  for (let dy = -2; dy <= 2; dy++) {
    for (let dx = -2; dx <= 2; dx++) {
      const x = tx + dx;
      const y = ty + dy;
      tiles.push({
        key: `${x}-${y}`,
        src: `https://tile.openstreetmap.org/${z}/${x}/${y}.png`,
        dx: dx * 256 - fx,
        dy: dy * 256 - fy,
      });
    }
  }
  return tiles;
})();

export function MapCard() {
  return (
    <Card className="map">
      <div className="map-inset" role="img" aria-label="Street map of Bagh, Azad Kashmir">
        {MAP.map((t) => (
          <img
            key={t.key}
            className="map-tile"
            src={t.src}
            alt=""
            width={256}
            height={256}
            loading="lazy"
            decoding="async"
            style={{left: `calc(50% + ${t.dx.toFixed(1)}px)`, top: `calc(50% + ${t.dy.toFixed(1)}px)`}}
          />
        ))}
        <span className="map-city" aria-hidden="true">
          Bagh
        </span>
        <span className="map-label">
          <MapPin size={12} strokeWidth={1.8} aria-hidden="true" />
          Bagh, Azad Kashmir
        </span>
        <span className="map-credit">
          © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>
        </span>
      </div>
      <Chip icon={<MapPin {...ico} />}>Based in</Chip>
    </Card>
  );
}

/* ---------------- TAMx ---------------- */

export function TamxCard() {
  return (
    <Card className="tamx" href="/work/tamx" label="UI/UX Designer at TAMx. Read the case study">
      <TamxPanel />
    </Card>
  );
}

/* ---------------- How I work ---------------- */

const STEP_MS = 1900;
const SWITCH_MS = 420;
const HOLD_MS = 6000;
const FIRST_STEP_AT = 2600;

export function HowCard() {
  const {time, reduced} = useClock();
  const [active, setActive] = useState(0);
  const st = useRef({from: 0, to: 0, changeAt: -1e9, nextAt: FIRST_STEP_AT, hover: false, painted: -1});
  const seg = useRef<HTMLDivElement>(null);
  const segW = useRef(0);
  const pill = useRef<HTMLSpanElement>(null);
  const outEl = useRef<HTMLDivElement>(null);
  const inEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = seg.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      segW.current = (el.clientWidth - 8) / STEPS.length;
      st.current.painted = -1;
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const write = (el: HTMLDivElement | null, i: number) => {
    if (!el) return;
    const n = String(i + 1).padStart(2, '0');
    (el.querySelector('.how-title') as HTMLElement).textContent = `${n} ${STEPS[i].title}`;
    (el.querySelector('.how-body') as HTMLElement).textContent = STEPS[i].body;
  };

  const goTo = (to: number, t: number) => {
    const s = st.current;
    if (to === s.to && t - s.changeAt > SWITCH_MS) return;
    s.from = s.to;
    s.to = to;
    s.changeAt = reduced ? -1e9 : t;
    write(outEl.current, s.from);
    write(inEl.current, s.to);
    setActive(to);
  };

  useTick((t) => {
    const s = st.current;
    if (!reduced) {
      if (s.hover && t >= s.nextAt) s.nextAt = t + 400;
      if (t >= s.nextAt) {
        goTo((s.to + 1) % STEPS.length, t);
        s.nextAt = t + STEP_MS;
      }
    }
    const raw = Math.min(1, Math.max(0, (t - s.changeAt) / SWITCH_MS));
    if (raw === 1 && s.painted === s.to) return;
    const e = easeInOut(raw);
    if (pill.current) {
      const x = (s.from + (s.to - s.from) * e) * segW.current;
      pill.current.style.transform = `translateX(${x.toFixed(2)}px)`;
    }
    if (outEl.current) {
      outEl.current.style.transform = `translateY(${(-24 * e).toFixed(2)}px)`;
      outEl.current.style.opacity = raw === 1 ? '0' : (1 - e).toFixed(3);
    }
    if (inEl.current) {
      inEl.current.style.transform = `translateY(${(24 * (1 - e)).toFixed(2)}px)`;
      inEl.current.style.opacity = e.toFixed(3);
    }
    if (raw === 1) s.painted = s.to;
  });

  const onPick = (i: number) => {
    goTo(i, time.get());
    st.current.nextAt = time.get() + HOLD_MS;
  };

  const panel = (ref: RefObject<HTMLDivElement | null>, i: number, hidden: boolean) => (
    <div ref={ref} className="how-panel" aria-hidden={hidden || undefined}>
      <h2 className="how-title">
        {String(i + 1).padStart(2, '0')} {STEPS[i].title}
      </h2>
      <p className="how-body">{STEPS[i].body}</p>
    </div>
  );

  return (
    <Card className="how">
      <div
        className="how-inner"
        onMouseEnter={() => (st.current.hover = true)}
        onMouseLeave={() => (st.current.hover = false)}
        onFocus={() => (st.current.hover = true)}
        onBlur={() => (st.current.hover = false)}
      >
        <Chip icon={<Workflow {...ico} />}>How I work</Chip>
        <div className="how-stage" aria-live="off">
          {panel(outEl, 0, true)}
          {panel(inEl, 0, false)}
        </div>
        <div ref={seg} className="seg" role="tablist" aria-label="Steps of my process">
          <span ref={pill} className="seg-pill" aria-hidden="true" />
          {STEPS.map((s, i) => (
            <button
              key={s.title}
              type="button"
              role="tab"
              aria-selected={active === i}
              className="seg-btn"
              onClick={() => onPick(i)}
            >
              Step {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
