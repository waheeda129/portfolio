import {useLayoutEffect, useState} from 'react';
import {Linkedin, Mail} from 'lucide-react';
import {ClockProvider, Reveal} from '../clock';
import {MAILTO, PROFILE} from '../data';
import {usePageMeta} from '../router';
import {SiteFooter, SiteHeader} from '../components/Site';
import {Available, NowLine} from './Intro';
import {ExperienceCard, HowCard, MapCard, MapalzCard, SaleForgersCard, TamxCard} from './Cards';

type Layout = 'stage' | 'flow';

/** Below this scale the fixed stage makes body text too small to read comfortably. */
const MIN_STAGE_SCALE = 0.8;

function useLayoutMode(): Layout {
  const pick = (): Layout => {
    const s = Math.min(window.innerWidth / 1440, window.innerHeight / 960);
    document.documentElement.style.setProperty('--stage-scale', String(s));
    return window.innerWidth > 820 && s >= MIN_STAGE_SCALE ? 'stage' : 'flow';
  };
  const [mode, setMode] = useState<Layout>(pick);
  useLayoutEffect(() => {
    const onResize = () => setMode(pick());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return mode;
}

export default function Home() {
  const mode = useLayoutMode();
  usePageMeta(
    'Waheeda Gillani, Product Designer',
    'Waheeda Gillani is a product and UI/UX designer, Co-founder & COO at SaleForgers, UI/UX Designer at TAMx and part of the founding team at Mapalz.',
  );
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <ClockProvider>
      <div className="home" data-layout={mode}>
        <div className="viewport">
          <div className="stage">
            <Reveal index={0} className="nav-slot">
              <SiteHeader onStage />
            </Reveal>

            <main id="main" className="stage-main">
              <Reveal index={0} className="avatar">
                <img src="/assets/waheeda-440.webp" width={440} height={440} alt="Portrait of Waheeda Gillani" />
              </Reveal>

              <Reveal index={1} as="header" className="headline">
                <h1>
                  Hi I’m Waheeda Gillani — I’m a Product Designer <br className="br-wide" />
                  and Co-founder at SaleForgers.<span className="headline-muted"> UI/UX at TAMx.</span>
                </h1>
              </Reveal>

              <Reveal index={2} className="bio">
                <p>
                  I design calm, useful software for growing businesses and run delivery <br className="br-wide" />
                  and operations at SaleForgers, while finishing my CS degree at COMSATS.
                </p>
              </Reveal>

              <Reveal index={3} className="now-slot">
                <NowLine />
              </Reveal>

              <Reveal index={4} className="available-slot">
                <Available />
              </Reveal>

              <Reveal index={5} className="actions">
                <a className="pill pill-dark" href="/work">
                  See my work
                </a>
                <a className="pill pill-icon" href={MAILTO} aria-label={`Email ${PROFILE.name}`}>
                  <Mail size={19} strokeWidth={1.6} aria-hidden="true" />
                </a>
                <a
                  className="pill pill-icon"
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile (opens in a new tab)"
                >
                  <Linkedin size={18} strokeWidth={1.6} aria-hidden="true" />
                </a>
              </Reveal>

              <div className="bento">
                <Reveal index={6} className="slot slot-experience">
                  <ExperienceCard />
                </Reveal>
                <Reveal index={7} className="slot slot-saleforgers">
                  <SaleForgersCard />
                </Reveal>
                <Reveal index={8} className="slot slot-mapalz">
                  <MapalzCard />
                </Reveal>
                <Reveal index={9} className="slot slot-map">
                  <MapCard />
                </Reveal>
                <Reveal index={10} className="slot slot-tamx">
                  <TamxCard />
                </Reveal>
                <Reveal index={11} className="slot slot-how">
                  <HowCard />
                </Reveal>
              </div>
            </main>
          </div>
        </div>
        {mode === 'flow' && <SiteFooter />}
      </div>
    </ClockProvider>
  );
}
