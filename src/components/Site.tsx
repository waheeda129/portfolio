import {useEffect, useId, useRef, useState, type ReactNode} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {ArrowUp, Github, Linkedin, Mail, Menu, X} from 'lucide-react';
import {MAILTO, NAV, PROFILE} from '../data';
import {usePageMeta, usePath} from '../router';

const isActive = (path: string, href: string) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

/* ---------------- Header ---------------- */

export function SiteHeader({onStage = false}: {onStage?: boolean}) {
  const path = usePath();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btn.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`site-header${onStage ? ' on-stage' : ''}`}>
      <a className="brand" href="/" aria-label={`${PROFILE.name}, home`}>
        <img src="/assets/waheeda-440.webp" alt="" width={36} height={36} />
        <span>{PROFILE.name}</span>
      </a>

      <nav className="nav" aria-label="Main">
        <ul className="nav-pill">
          {NAV.map((n) => {
            const active = isActive(path, n.href);
            return (
              <li key={n.href}>
                <a href={n.href} className="nav-link" aria-current={active ? 'page' : undefined}>
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="nav-active"
                      transition={{type: 'spring', stiffness: 420, damping: 36}}
                    />
                  )}
                  <span className="nav-label">{n.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a className="pill pill-dark nav-cta" href="/contact" aria-current={path === '/contact' ? 'page' : undefined}>
          Contact
        </a>
      </nav>

      <button
        ref={btn}
        type="button"
        className="menu-btn"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={18} strokeWidth={1.8} aria-hidden="true" /> : <Menu size={18} strokeWidth={1.8} aria-hidden="true" />}
        <span>{open ? 'Close' : 'Menu'}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={menuId}
            className="menu-sheet"
            aria-label="Main"
            initial={{opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -6, transition: {duration: 0.15}}}
            transition={{duration: 0.22, ease: [0.22, 1, 0.36, 1]}}
          >
            <ul>
              {[...NAV, {href: '/contact', label: 'Contact'}].map((n) => (
                <li key={n.href}>
                  <a href={n.href} aria-current={isActive(path, n.href) ? 'page' : undefined}>
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- Footer ---------------- */

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <p className="footer-name">{PROFILE.name}</p>
          <p className="footer-line">Product designer. Co-founder &amp; COO at SaleForgers.</p>
        </div>
        <nav aria-label="Footer">
          <ul className="footer-links">
            {[...NAV.slice(1), {href: '/contact', label: 'Contact'}].map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="footer-social">
          <a className="pill pill-icon" href={MAILTO} aria-label="Email">
            <Mail size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a className="pill pill-icon" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">
            <Linkedin size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a className="pill pill-icon" href={PROFILE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
            <Github size={18} strokeWidth={1.6} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {PROFILE.name}</span>
        <button type="button" className="to-top" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          Back to top
          <ArrowUp size={14} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}

/* ---------------- Page shell ---------------- */

const rise = {
  hidden: {opacity: 0, y: 14},
  show: {opacity: 1, y: 0, transition: {duration: 0.7, ease: [0.22, 1, 0.36, 1] as const}},
};

/** One orchestrated page-load: children marked with <Rise> stagger in once. */
export function PageShell({title, description, children}: {title: string; description?: string; children: ReactNode}) {
  usePageMeta(title, description);
  useEffect(() => {
    const id = window.location.hash.slice(1);
    const el = id ? document.getElementById(id) : null;
    if (el) requestAnimationFrame(() => el.scrollIntoView());
    else window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page">
      <SiteHeader />
      <motion.main id="main" className="page-main" initial="hidden" animate="show" transition={{staggerChildren: 0.08}}>
        {children}
      </motion.main>
      <SiteFooter />
    </div>
  );
}

export function Rise({
  children,
  className,
  as = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header';
  id?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={rise} {...rest}>
      {children}
    </Tag>
  );
}

/* ---------------- Shared blocks ---------------- */

export function PageHero({title, lead, children}: {title: ReactNode; lead?: ReactNode; children?: ReactNode}) {
  return (
    <Rise as="header" className="page-hero">
      <h1>{title}</h1>
      {lead && <p className="page-lead">{lead}</p>}
      {children}
    </Rise>
  );
}

export function ContactBand({title = 'Have a product that needs a designer?'}: {title?: string}) {
  return (
    <section className="card-flat contact-band" aria-labelledby="band-title">
      <div>
        <h2 id="band-title">{title}</h2>
        <p className="muted">Tell me what your team is building and where people get stuck. The first call is free.</p>
      </div>
      <div className="band-actions">
        <a className="pill pill-dark" href="/contact">
          Start a conversation
        </a>
        <a className="pill" href="/work">
          See my work
        </a>
      </div>
    </section>
  );
}

export function Chips({items}: {items: string[]}) {
  return (
    <ul className="chips">
      {items.map((i) => (
        <li key={i} className="chip chip-static">
          {i}
        </li>
      ))}
    </ul>
  );
}
