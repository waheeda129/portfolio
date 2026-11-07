import {useRef} from 'react';
import {useClockOptional, useTick} from '../clock';

/* ---------------- Recreated StockFlow panel (sample data) ---------------- */

const ROWS = [
  {name: 'Cotton tote, natural', sku: 'SKU-10482', base: 342},
  {name: 'Ceramic mug, 350 ml', sku: 'SKU-10517', base: 18},
  {name: 'Notebook, A5 dotted', sku: 'SKU-10533', base: 0},
  {name: 'Desk organiser, oak', sku: 'SKU-10561', base: 76},
  {name: 'Water bottle, steel', sku: 'SKU-10588', base: 41},
];
const SALE_EVERY = 2600;
const FIRST_SALE = 2200;
const PATTERN = [0, 4, 3, 1, 0, 3, 4, 0, 1, 3];

const status = (n: number) => (n === 0 ? 'Reorder' : n <= 20 ? 'Low' : 'In stock');
const tone = (n: number) => (n === 0 ? 'bad' : n <= 20 ? 'warn' : 'ok');

/** Stock after `events` sales, computed from scratch so any clock time gives the same picture. */
function stockAt(events: number) {
  const stock = ROWS.map((r) => r.base);
  let last = -1;
  for (let k = 0; k < events; k++) {
    const i = PATTERN[k % PATTERN.length];
    if (stock[i] === 0) continue;
    stock[i] = Math.max(0, stock[i] - (1 + ((k * 7) % 3)));
    last = i;
  }
  return {stock, last};
}

export function StockPanel({compact = false}: {compact?: boolean}) {
  const clock = useClockOptional();
  const rows = useRef<(HTMLTableRowElement | null)[]>([]);
  const painted = useRef(-1);

  useTick((t) => {
    if (!clock || clock.reduced) return;
    const events = t < FIRST_SALE ? 0 : Math.floor((t - FIRST_SALE) / SALE_EVERY) + 1;
    const since = t - (FIRST_SALE + (events - 1) * SALE_EVERY);
    const flash = events > 0 && since < 900;
    const key = events * 2 + (flash ? 1 : 0);
    if (key === painted.current) return;
    painted.current = key;
    const {stock, last} = stockAt(events);
    rows.current.forEach((tr, i) => {
      if (!tr) return;
      (tr.querySelector('.st-qty') as HTMLElement).textContent = String(stock[i]);
      const s = tr.querySelector('.st-status') as HTMLElement;
      s.textContent = status(stock[i]);
      s.dataset.tone = tone(stock[i]);
      tr.dataset.flash = flash && i === last ? 'y' : 'n';
    });
  }, !!clock);

  return (
    <div className={`stock${compact ? ' stock-compact' : ''}`} aria-hidden="true">
      <div className="stock-head">
        <span className="stock-app">
          <b>StockFlow</b>
          <span>Inventory</span>
        </span>
        <span className="stock-tag">Sample data</span>
      </div>
      {!compact && (
        <div className="stock-kpis">
          <span>
            Products <b>1,284</b>
          </span>
          <span>
            Low stock <b>23</b>
          </span>
          <span>
            Open purchases <b>9</b>
          </span>
        </div>
      )}
      <table className="stock-table">
        <thead>
          <tr>
            <th>Product</th>
            <th className="num">On hand</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((r, i) => (
            <tr
              key={r.sku}
              ref={(el) => {
                rows.current[i] = el;
              }}
            >
              <td>{r.name}</td>
              <td className="num st-qty">{r.base}</td>
              <td>
                <span className="st-status" data-tone={tone(r.base)}>
                  {status(r.base)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------------- TAMx panel ---------------- */

export function TamxPanel({label = true}: {label?: boolean}) {
  return (
    <div className="tamx-inset">
      <img className="tamx-glow" src="/assets/tamx-glow.webp" alt="" width={400} height={446} />
      <img className="tamx-logo" src="/assets/tamx-logo.webp" alt="TAMx" width={807} height={309} />
      {label && (
        <span className="tamx-pill">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M15.7 4.3 19.7 8.3" />
            <path d="M4 20l1.2-4.8L16.4 4a1.4 1.4 0 0 1 2 0l1.6 1.6a1.4 1.4 0 0 1 0 2L8.8 18.8Z" />
          </svg>
          UI/UX Designer at TAMx
        </span>
      )}
    </div>
  );
}
