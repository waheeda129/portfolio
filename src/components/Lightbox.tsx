import {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {Maximize2, X} from 'lucide-react';
import type {Shot} from '../data';

/** A screenshot that opens full size in an overlay, sharing its layout with Framer Motion. */
export function Zoomable({shot, id}: {shot: Shot; id: string}) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    close.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab') {
        e.preventDefault();
        close.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
      trigger.current?.focus();
    };
  }, [open]);

  return (
    <figure className="shot">
      <button
        ref={trigger}
        type="button"
        className="shot-btn"
        style={{aspectRatio: `${shot.w} / ${shot.h}`}}
        onClick={() => setOpen(true)}
        aria-label={`View larger: ${shot.alt}`}
      >
        {!open && (
          <motion.img layoutId={`shot-${id}`} src={shot.src} alt={shot.alt} width={shot.w} height={shot.h} loading="lazy" />
        )}
        <span className="shot-hint" aria-hidden="true">
          <Maximize2 size={14} strokeWidth={1.8} />
        </span>
      </button>
      <figcaption>{shot.caption}</figcaption>

      <AnimatePresence>
        {open && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={shot.alt}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.2}}
            onClick={() => setOpen(false)}
          >
            <motion.img layoutId={`shot-${id}`} src={shot.src} alt="" width={shot.w} height={shot.h} className="lightbox-img" />
            <p className="lightbox-caption">{shot.caption}</p>
            <button ref={close} type="button" className="lightbox-close" onClick={() => setOpen(false)}>
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
