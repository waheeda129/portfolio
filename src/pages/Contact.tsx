import {useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Check, Copy, ExternalLink, Github, Linkedin, Mail, MapPin} from 'lucide-react';
import {GMAIL, MAILTO, PROFILE} from '../data';
import {PageShell, Rise} from '../components/Site';

const NEXT = [
  {title: 'You send a short note', body: 'What you are building, who uses it and where it gets stuck. A few lines is enough.'},
  {title: 'We book a free call', body: 'Thirty minutes to understand the product and the problem behind it.'},
  {title: 'You get a clear next step', body: 'A short written summary of what is worth doing first, and how I can help.'},
];

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = MAILTO;
    }
  };
  return (
    <button type="button" className="pill" onClick={copy}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? 'done' : 'copy'}
          className="pill-inner"
          initial={{opacity: 0, y: 6}}
          animate={{opacity: 1, y: 0}}
          exit={{opacity: 0, y: -6}}
          transition={{duration: 0.16}}
        >
          {copied ? <Check size={16} strokeWidth={1.9} aria-hidden="true" /> : <Copy size={16} strokeWidth={1.7} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy email'}
        </motion.span>
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {copied ? 'Email address copied' : ''}
      </span>
    </button>
  );
}

export default function Contact() {
  return (
    <PageShell
      title="Contact, Waheeda Gillani"
      description="Email Waheeda Gillani about product design, UX research or delivery. The first call is free."
    >
      <Rise as="header" className="page-hero">
        <h1>Let’s talk about your product</h1>
        <p className="page-lead">
          Tell me what your team is building and where people get stuck. The first call is free, and you leave with a clear
          next step.
        </p>
      </Rise>

      <Rise className="contact-grid">
        <section className="card-flat contact-main" aria-labelledby="email-title">
          <h2 id="email-title" className="small muted">
            Email
          </h2>
          <a className="contact-email" href={MAILTO}>
            {PROFILE.email}
          </a>
          <div className="contact-actions">
            <a className="pill pill-dark" href={MAILTO}>
              <Mail size={16} strokeWidth={1.7} aria-hidden="true" />
              Write an email
            </a>
            <CopyEmail />
            <a className="pill" href={GMAIL} target="_blank" rel="noopener noreferrer">
              Open in Gmail
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
          <p className="about-place muted">
            <MapPin size={15} strokeWidth={1.7} aria-hidden="true" />
            Based in {PROFILE.hometown}, working with teams remotely
          </p>
        </section>

        <section className="card-flat contact-side" aria-labelledby="elsewhere">
          <h2 id="elsewhere" className="small muted">
            Elsewhere
          </h2>
          <ul className="elsewhere">
            <li>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <b>LinkedIn</b>
                  <span className="muted">{PROFILE.linkedinHandle}</span>
                </span>
                <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" className="ext" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
                <Github size={18} strokeWidth={1.6} aria-hidden="true" />
                <span>
                  <b>GitHub</b>
                  <span className="muted">{PROFILE.githubHandle}</span>
                </span>
                <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" className="ext" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            <li>
              <a href="https://saleforgers.com" target="_blank" rel="noopener noreferrer">
                <img src="/assets/saleforgers-mark.webp" alt="" width={18} height={27} />
                <span>
                  <b>SaleForgers</b>
                  <span className="muted">Need the whole system built? Talk to the team.</span>
                </span>
                <ExternalLink size={14} strokeWidth={1.7} aria-hidden="true" className="ext" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </section>
      </Rise>

      <Rise as="section" className="section" aria-labelledby="next">
        <h2 id="next" className="h2">
          What happens next
        </h2>
        <ol className="steps steps-3">
          {NEXT.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.body}</p>
            </li>
          ))}
        </ol>
      </Rise>
    </PageShell>
  );
}
