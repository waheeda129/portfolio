import {useEffect, useLayoutEffect} from 'react';
import {Linkedin, Mail} from 'lucide-react';
import {ClockProvider, Reveal} from '../clock';
import {MAILTO, PROFILE} from '../data';
import {Available, VoiceNote} from './Intro';
import {ExperienceCard, HowCard, MapCard, MapalzCard, SaleForgersCard, TamxCard} from './Cards';

function useStageFit() {
  useLayoutEffect(() => {
    const fit = () => {
      const s = Math.min(window.innerWidth / 1440, window.innerHeight / 960);
      document.documentElement.style.setProperty('--stage-scale', String(s));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
}

export default function Home() {
  useStageFit();
  useEffect(() => {
    document.title = 'Waheeda Gillani, Product Designer';
  }, []);

  return (
    <ClockProvider>
      <div className="viewport">
        <main className="stage" id="top">
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

          <Reveal index={3} className="voice-slot">
            <VoiceNote />
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
        </main>
      </div>
    </ClockProvider>
  );
}
