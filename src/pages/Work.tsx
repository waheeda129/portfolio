import {ExternalLink} from 'lucide-react';
import {CASES, PROJECTS, type CaseStudy} from '../data';
import {Chips, ContactBand, PageHero, PageShell, Rise} from '../components/Site';
import {StockPanel, TamxPanel} from '../components/Visuals';

export function CaseVisual({c, size = 'card'}: {c: CaseStudy; size?: 'card' | 'hero'}) {
  if (c.slug === 'saleforgers') {
    return (
      <div className={`case-visual case-visual-sf case-visual-${size}`}>
        <StockPanel />
      </div>
    );
  }
  if (c.slug === 'tamx') {
    return (
      <div className={`case-visual case-visual-tamx case-visual-${size}`}>
        <TamxPanel label={false} />
      </div>
    );
  }
  const shot = c.shots?.[0];
  return (
    <div className={`case-visual case-visual-mapalz case-visual-${size}`}>
      {shot && <img src={shot.src} alt="" width={shot.w} height={shot.h} />}
    </div>
  );
}

function CaseCard({c}: {c: CaseStudy}) {
  return (
    <a href={`/work/${c.slug}`} className="card-flat case-card lift">
      <div className="case-card-text">
        <span className="logo-tile" style={{background: c.logoBg}}>
          <img src={c.logo} alt="" />
        </span>
        <p className="case-kicker">
          {c.role}, {c.years}
        </p>
        <h2 className="case-name">{c.company}</h2>
        <p className="case-tagline">{c.tagline}</p>
        <p className="muted case-summary">{c.summary}</p>
        <Chips items={c.focus} />
        <span className="text-link case-more">Read the case study</span>
      </div>
      <CaseVisual c={c} />
    </a>
  );
}

export default function Work() {
  return (
    <PageShell
      title="Work, Waheeda Gillani"
      description="Case studies from SaleForgers, Mapalz and TAMx, plus earlier projects by product designer Waheeda Gillani."
    >
      <PageHero
        title="Work"
        lead="I design products and run delivery with three teams. Each case study covers the problem, what we built and the part I played."
      />

      <Rise className="case-list">
        {CASES.map((c) => (
          <CaseCard key={c.slug} c={c} />
        ))}
      </Rise>

      <Rise as="section" className="section" id="projects">
        <h2 className="h2">Earlier projects</h2>
        <p className="muted section-lead">Things I built while studying Computer Science at COMSATS.</p>
        <ul className="grid-3">
          {PROJECTS.map((p) => (
            <li key={p.title} className="card-flat project">
              <div>
                <h3 className="h3">{p.title}</h3>
                <p className="muted">{p.body}</p>
              </div>
              <div className="project-foot">
                <Chips items={p.tags} />
                <a className="text-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Rise>

      <Rise>
        <ContactBand />
      </Rise>
    </PageShell>
  );
}
