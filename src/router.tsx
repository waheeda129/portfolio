import {useEffect, useSyncExternalStore} from 'react';

/**
 * A tiny client-side router: same-origin links are intercepted and pushed onto
 * history, so pages swap without a full reload and Framer Motion can animate
 * between them. Vercel rewrites every path to index.html, so deep links work.
 */

const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  window.addEventListener('popstate', cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener('popstate', cb);
  };
};

const snapshot = () => window.location.pathname.replace(/\/+$/, '') || '/';

export function usePath() {
  return useSyncExternalStore(subscribe, snapshot, () => '/');
}

export function navigate(to: string) {
  window.history.pushState({}, '', to);
  listeners.forEach((l) => l());
}

/** Intercept clicks on same-origin <a> elements anywhere in the app. */
export function useLinkInterception() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const samePage = url.pathname.replace(/\/+$/, '') === snapshot();
      if (samePage && url.hash) return; // let the browser scroll to the anchor
      e.preventDefault();
      if (samePage) {
        window.scrollTo({top: 0, behavior: 'smooth'});
        return;
      }
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}

export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
