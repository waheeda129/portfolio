import {ExternalLink, MapPin} from 'lucide-react';
import {BELIEFS, EDUCATION, PROFILE, TIMELINE, TOOLKIT} from '../data';
import {Chips, ContactBand, PageShell, Rise} from '../components/Site';

export default function About() {
  return (
    <PageShell
      title="About, Waheeda Gillani"
      description="Waheeda Gillani is a product designer from Bagh, Azad Kashmir: Co-founder & COO at SaleForgers, UI/UX Designer at TAMx and part of the founding team at Mapalz."
    >
      <Rise as="header" className="about-hero">
        <img className="about-photo" src="/assets/waheeda-440.webp" alt="Portrait of Waheeda Gillani" width={440} height={440} />
        <div>
          <h1>About me</h1>
          <p className="page-lead">
            I’m Waheeda Gillani, a product designer from Bagh, Azad Kashmir. I co-founded SaleForgers, where I run delivery
            and operations, I design at TAMx, and I’m part of the founding team at Mapalz.
          </p>
          <p className="prose">
            I study Computer Science at COMSATS University, so I design with a clear picture of how software is built.
            Most of my work is the software a team uses all day: inventory, orders, attendance and dashboards. I like
            that kind of product because good design there saves people real hours every week.
          </p>
          <p className="about-place muted">
            <MapPin size={15} strokeWidth={1.7} aria-hidden="true" />
            Based in {PROFILE.hometown}, working with teams remotely
          </p>
        </div>
      </Rise>

      <Rise as="section" className="section" id="beliefs">
        <h2 className="h2">What I believe</h2>
        <div className="grid-3">
          {BELIEFS.map((b) => (
            <article key={b.title} className="card-flat belief">
              <h3 className="h3">{b.title}</h3>
              <p className="muted">{b.body}</p>
            </article>
          ))}
        </div>
      </Rise>

      <Rise as="section" className="section split-2" id="experience">
        <div>
          <h2 className="h2">Experience</h2>
          <p className="muted section-lead">From my first semester to running a company.</p>
        </div>
        <ol className="timeline">
          {[...TIMELINE].reverse().map((t) => (
            <li key={t.title} className="timeline-item">
              <span className="timeline-years">{t.years}</span>
              <div>
                <h3 className="h3">{t.title}</h3>
                <p className="muted">{t.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Rise>

      <Rise as="section" className="section card-flat proof" id="proof">
        <h2 className="h2">Check it yourself</h2>
        <p className="muted">The roles on this site are listed where you can verify them.</p>
        <ul className="proof-list">
          <li>
            <span>SaleForgers team page lists me as Co-founder &amp; COO</span>
            <a className="text-link" href="https://saleforgers.com/about#team" target="_blank" rel="noopener noreferrer">
              saleforgers.com/about
              <ExternalLink size={13} strokeWidth={1.7} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <span>Full work history on LinkedIn</span>
            <a className="text-link" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin.com/in/{PROFILE.linkedinHandle}
              <ExternalLink size={13} strokeWidth={1.7} aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </Rise>

      <Rise as="section" className="section split-toolkit">
        <div id="toolkit">
          <h2 className="h2">Toolkit</h2>
          <div className="card-flat toolkit">
            {TOOLKIT.map((g) => (
              <div key={g.group}>
                <h3 className="small-head">{g.group}</h3>
                <Chips items={g.items} />
              </div>
            ))}
          </div>
        </div>
        <div id="education">
          <h2 className="h2">Education</h2>
          <div className="card-flat edu">
            {EDUCATION.map((e) => (
              <div key={e.school}>
                <h3 className="h3">{e.detail}</h3>
                <p className="muted">{e.school}</p>
                {e.years && <p className="muted">{e.years}</p>}
              </div>
            ))}
          </div>
        </div>
      </Rise>

      <Rise>
        <ContactBand />
      </Rise>
    </PageShell>
  );
}
