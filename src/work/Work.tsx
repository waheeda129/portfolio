import {useEffect} from 'react';
import {MotionConfig, motion} from 'framer-motion';
import {ArrowLeft, ExternalLink, Github, Linkedin, Mail} from 'lucide-react';
import {EDUCATION, MAILTO, PROFILE, PROJECTS, ROLES, TOOLKIT, type Role} from '../data';

const rise = {
  hidden: {opacity: 0, y: 14},
  show: {opacity: 1, y: 0, transition: {duration: 0.7, ease: [0.22, 1, 0.36, 1] as const}},
};

function RoleBlock({r}: {r: Role}) {
  return (
    <article id={r.id} className={`w-card w-role w-role-${r.id}`}>
      <div className="w-role-head">
        <span className="w-logo" style={{background: r.logoBg}}>
          <img src={r.logo} alt="" />
        </span>
        <div>
          <h2 className="w-role-company">{r.company}</h2>
          <p className="w-role-meta">
            <span>{r.role}</span>
            <span className="w-muted">{r.years}</span>
            <span className="w-muted">{r.place}</span>
          </p>
        </div>
      </div>
      <div className="w-role-body">
        <p className="w-lead">{r.about}</p>
        <h3 className="w-h3">What I do</h3>
        <ul className="w-list">
          {r.did.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <a className="w-link" href={r.url} target="_blank" rel="noopener noreferrer">
          Visit {r.urlLabel}
          <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      {r.shots && (
        <div className="w-shots">
          {r.shots.map((s) => (
            <figure key={s.src} className="w-shot">
              <img src={s.src} alt={s.alt} loading="lazy" width={1200} height={800} />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}

export default function Work() {
  useEffect(() => {
    document.title = 'Work, Waheeda Gillani';
    const id = window.location.hash.slice(1);
    if (id) requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="w-page">
        <motion.div initial="hidden" animate="show" transition={{staggerChildren: 0.08}}>
          <motion.header variants={rise} className="w-top">
            <a className="w-home" href="/">
              <ArrowLeft size={16} strokeWidth={1.7} aria-hidden="true" />
              <img src="/assets/waheeda-440.webp" alt="" width={36} height={36} />
              <span>{PROFILE.name}</span>
            </a>
            <a className="pill pill-dark w-top-cta" href={MAILTO}>
              Email me
            </a>
          </motion.header>

          <motion.section variants={rise} className="w-intro">
            <h1>Work</h1>
            <p>
              I design products and run delivery with three teams. Here is what I do at each, and a few projects I
              built while studying.
            </p>
          </motion.section>

          <motion.div variants={rise}>
            <RoleBlock r={ROLES[0]} />
          </motion.div>
        </motion.div>

        {ROLES.slice(1).map((r) => (
          <RoleBlock key={r.id} r={r} />
        ))}

        <section className="w-section" aria-labelledby="projects">
          <h2 id="projects" className="w-h2">
            Earlier projects
          </h2>
          <ul className="w-projects">
            {PROJECTS.map((p) => (
              <li key={p.title} className="w-card w-project">
                <div>
                  <h3 className="w-project-title">{p.title}</h3>
                  <p className="w-muted">{p.body}</p>
                </div>
                <a className="w-link" href={p.url} target="_blank" rel="noopener noreferrer">
                  View on GitHub
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="w-split">
          <section className="w-section" aria-labelledby="toolkit">
            <h2 id="toolkit" className="w-h2">
              Toolkit
            </h2>
            <div className="w-card w-toolkit">
              {TOOLKIT.map((g) => (
                <div key={g.group} className="w-tool-group">
                  <h3 className="w-h3">{g.group}</h3>
                  <ul className="w-chips">
                    {g.items.map((it) => (
                      <li key={it} className="chip chip-static">
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="w-section" aria-labelledby="education">
            <h2 id="education" className="w-h2">
              Education
            </h2>
            <div className="w-card w-edu">
              {EDUCATION.map((e) => (
                <div key={e.school} className="w-edu-row">
                  <h3 className="w-project-title">{e.detail}</h3>
                  <p className="w-muted">{e.school}</p>
                  {e.years && <p className="w-muted">{e.years}</p>}
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="w-card w-contact" aria-labelledby="contact">
          <h2 id="contact">Have a product that needs a designer?</h2>
          <p className="w-muted">Tell me what your team is building and where people get stuck. The first call is free.</p>
          <div className="w-contact-actions">
            <a className="pill pill-dark" href={MAILTO}>
              <Mail size={17} strokeWidth={1.7} aria-hidden="true" />
              {PROFILE.email}
            </a>
            <a className="pill pill-icon" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <Linkedin size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
            <a className="pill pill-icon" href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <Github size={18} strokeWidth={1.6} aria-hidden="true" />
            </a>
          </div>
        </section>

        <footer className="w-footer">© {new Date().getFullYear()} {PROFILE.name}</footer>
      </div>
    </MotionConfig>
  );
}
