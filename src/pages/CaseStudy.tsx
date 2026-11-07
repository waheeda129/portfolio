import {ArrowLeft, ExternalLink} from 'lucide-react';
import {CASES, type CaseStudy as Case} from '../data';
import {Chips, ContactBand, PageShell, Rise} from '../components/Site';
import {Zoomable} from '../components/Lightbox';
import {CaseVisual} from './Work';
import NotFound from './NotFound';

function Steps({steps}: {steps: {title: string; body: string}[]}) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="step">
          <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="h3">{s.title}</h3>
          <p className="muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

function Body({c}: {c: Case}) {
  const idx = CASES.findIndex((x) => x.slug === c.slug);
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <>
      <Rise as="header" className="case-hero">
        <a className="back-link" href="/work">
          <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
          All work
        </a>
        <p className="case-kicker">
          {c.kind}, {c.years}
        </p>
        <h1 className="case-title">{c.company}</h1>
        <p className="page-lead">{c.tagline}</p>
      </Rise>

      <Rise className="card-flat case-meta">
        <dl>
          <div>
            <dt>My role</dt>
            <dd>{c.role}</dd>
          </div>
          <div>
            <dt>When</dt>
            <dd>{c.years}</dd>
          </div>
          <div>
            <dt>Where</dt>
            <dd>{c.place}</dd>
          </div>
          <div>
            <dt>Live site</dt>
            <dd>
              <a className="text-link" href={c.url} target="_blank" rel="noopener noreferrer">
                {c.urlLabel}
                <ExternalLink size={13} strokeWidth={1.7} aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </dd>
          </div>
        </dl>
      </Rise>

      <Rise>
        <CaseVisual c={c} size="hero" />
      </Rise>

      <section className="section split-2">
        <div>
          <h2 className="h2">{c.problemTitle}</h2>
          <p className="prose">{c.problem}</p>
        </div>
        <div>
          <h2 className="h2">{c.builtTitle}</h2>
          <p className="prose">{c.built}</p>
        </div>
      </section>

      <section className="section card-flat my-part" aria-labelledby="my-part">
        <h2 id="my-part" className="h2">
          My part
        </h2>
        <ul className="dot-list">
          {c.myPart.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <div className="my-part-focus">
          <span className="muted small">Focus areas</span>
          <Chips items={c.focus} />
        </div>
      </section>

      {c.shots && (
        <section className="section" aria-labelledby="screens">
          <h2 id="screens" className="h2">
            The product, role by role
          </h2>
          <p className="muted section-lead">Select a screen to see it full size.</p>
          <div className="shots">
            {c.shots.map((s, i) => (
              <Zoomable key={s.src} shot={s} id={`${c.slug}-${i}`} />
            ))}
          </div>
        </section>
      )}

      {c.systems && (
        <section className="section" aria-labelledby="systems">
          <h2 id="systems" className="h2">
            Delivered systems
          </h2>
          <div className="grid-2">
            {c.systems.map((s) => (
              <article key={s.name} className="card-flat system">
                <p className="case-kicker">{s.type}</p>
                <h3 className="system-name">{s.name}</h3>
                <p className="system-line">{s.line}</p>
                <p className="muted">{s.body}</p>
                <Chips items={s.modules} />
                <a className="text-link" href={s.url} target="_blank" rel="noopener noreferrer">
                  Read it on saleforgers.com
                  <ExternalLink size={13} strokeWidth={1.7} aria-hidden="true" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </article>
            ))}
          </div>
        </section>
      )}

      {c.steps && (
        <section className="section" aria-labelledby="steps">
          <h2 id="steps" className="h2">
            {c.stepsTitle}
          </h2>
          <Steps steps={c.steps} />
        </section>
      )}

      {c.parts && (
        <section className="section" aria-labelledby="parts">
          <h2 id="parts" className="h2">
            {c.partsTitle}
          </h2>
          <div className="grid-auto">
            {c.parts.map((p) => (
              <div key={p.title} className="card-flat part">
                <h3 className="h3">{p.title}</h3>
                <ul className="plain-list">
                  {p.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {(c.proof || c.closing) && (
        <section className="section note" aria-label="Notes">
          {c.proof && (
            <p>
              {c.proof.note}{' '}
              <a className="text-link" href={c.proof.href} target="_blank" rel="noopener noreferrer">
                Check it on {c.proof.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </p>
          )}
          {c.closing && <p className="muted">{c.closing}</p>}
        </section>
      )}

      <a className="card-flat next-case lift" href={`/work/${next.slug}`}>
        <span className="muted small">Next case study</span>
        <span className="next-name">{next.company}</span>
        <span className="muted">{next.tagline}</span>
      </a>

      <ContactBand />
    </>
  );
}

export default function CaseStudy({slug}: {slug: string}) {
  const c = CASES.find((x) => x.slug === slug);
  if (!c) return <NotFound />;
  return (
    <PageShell title={`${c.company} case study, Waheeda Gillani`} description={c.summary}>
      <Body c={c} />
    </PageShell>
  );
}
