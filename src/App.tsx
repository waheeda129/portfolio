import {MotionConfig, motion} from 'framer-motion';
import Home from './home/Home';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import {useLinkInterception, usePath} from './router';

function route(path: string) {
  if (path === '/') return <Home />;
  if (path === '/work') return <Work />;
  if (path.startsWith('/work/')) return <CaseStudy slug={path.slice('/work/'.length)} />;
  if (path === '/services') return <Services />;
  if (path === '/about') return <About />;
  if (path === '/contact') return <Contact />;
  return <NotFound />;
}

export default function App() {
  useLinkInterception();
  const path = usePath();

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      {/* The new page swaps in at once and fades up; nothing waits on the old page.
          Opacity only: a transform here would break the home page's fixed stage. */}
      <motion.div key={path} initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.25, ease: 'easeOut'}}>
        {route(path)}
      </motion.div>
    </MotionConfig>
  );
}
