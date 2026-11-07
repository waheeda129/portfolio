import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Plus} from 'lucide-react';
import {FAQ, SERVICES, STEPS} from '../data';
import {Chips, ContactBand, PageHero, PageShell, Rise} from '../components/Site';

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq">
      {FAQ.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="faq-item">
            <h3>
              <button
                type="button"
                className="faq-q"
                aria-expanded={isOpen}
                aria-controls={`faq-${i}`}
                id={`faq-q-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                {f.q}
                <motion.span animate={{rotate: isOpen ? 45 : 0}} transition={{duration: 0.2}} className="faq-icon" aria-hidden="true">
                  <Plus size={18} strokeWidth={1.7} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="faq-a"
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{duration: 0.25, ease: [0.22, 1, 0.36, 1]}}
                >
                  <p className="muted">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  return (
    <PageShell
      title="Services, Waheeda Gillani"
      description="Product and UI/UX design, UX research, design systems, dashboards, websites and product delivery by Waheeda Gillani."
    >
      <PageHero
        title="Services"
        lead="Design for products that teams use every day. Each engagement starts with how your business works; the screens come second."
      />

      <Rise as="section" className="grid-3 services" aria-label="What I offer">
        {SERVICES.map((s) => (
          <article key={s.id} id={s.id} className="card-flat service">
            <h2 className="h3 service-title">{s.title}</h2>
            <p className="muted">{s.body}</p>
            <Chips items={s.items} />
          </article>
        ))}
      </Rise>

      <Rise as="section" className="section" id="process">
        <h2 className="h2">How a project runs</h2>
        <p className="muted section-lead">Four steps, the same for a single screen or a whole product.</p>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="h3">{s.title}</h3>
              <p className="muted">{s.body}</p>
              <p className="step-get">
                <span className="small muted">You get</span>
                {s.get}
              </p>
            </li>
          ))}
        </ol>
      </Rise>

      <Rise as="section" className="section split-faq" id="questions">
        <div>
          <h2 className="h2">Questions</h2>
          <p className="muted section-lead">What people usually ask before the first call.</p>
        </div>
        <Faq />
      </Rise>

      <Rise>
        <ContactBand title="Ready to talk about your product?" />
      </Rise>
    </PageShell>
  );
}
