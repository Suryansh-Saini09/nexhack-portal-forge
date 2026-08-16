import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WandCursor from './components/WandCursor';
import Home from './pages/Home';
import About from './pages/About';
import Themes from './pages/Themes';
import Prizes from './pages/Prizes';
import Schedule from './pages/Schedule';
import Sponsors from './pages/Sponsors';
import Team from './pages/Team';
import CharacterShowcase from './components/CharacterShowcase';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const LAUNCH_DATE = new Date("2026-08-15T09:00:00+05:30");

const SECTIONS = ['home', 'about', 'themes', 'prizes', 'schedule', 'sponsors', 'team', 'faq', 'contact'] as const;
type SectionId = typeof SECTIONS[number];

export default function App() {
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const diff = LAUNCH_DATE.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) { setTimeLeft(0); clearInterval(interval); }
      else setTimeLeft(diff);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const isLocked = false;

  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [allPrizesUnlocked, setAllPrizesUnlocked] = useState(false);
  const [showBarrierAlert, setShowBarrierAlert] = useState(false);
  const alertTimeoutRef = React.useRef<number | null>(null);

  const triggerBarrierAlert = () => {
    setShowBarrierAlert(true);
    if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);
    alertTimeoutRef.current = window.setTimeout(() => setShowBarrierAlert(false), 2500);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let currentSection: SectionId = 'home';
          for (const id of SECTIONS) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 200) currentSection = id;
            }
          }
          const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
          if (isAtBottom) currentSection = 'contact';
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    const timer = setTimeout(handleScroll, 150);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); clearTimeout(timer); };
  }, []);

  // Enforce scroll barrier: user cannot scroll down past Prizes until all 3 vaults are unsealed
  useEffect(() => {
    if (allPrizesUnlocked) return;

    let touchStartY = 0;

    const onWheel = (e: WheelEvent) => {
      const prizesEl = document.getElementById('prizes');
      if (!prizesEl) return;
      const rect = prizesEl.getBoundingClientRect();

      // If user is at the bottom of prizes or trying to scroll past it into schedule
      if (rect.bottom <= window.innerHeight + 25 && e.deltaY > 0) {
        e.preventDefault();
        triggerBarrierAlert();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const deltaY = touchStartY - e.touches[0].clientY;
        const prizesEl = document.getElementById('prizes');
        if (!prizesEl) return;
        const rect = prizesEl.getBoundingClientRect();

        if (rect.bottom <= window.innerHeight + 25 && deltaY > 0) {
          if (e.cancelable) e.preventDefault();
          triggerBarrierAlert();
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
        const prizesEl = document.getElementById('prizes');
        if (!prizesEl) return;
        const rect = prizesEl.getBoundingClientRect();
        if (rect.bottom <= window.innerHeight + 25) {
          e.preventDefault();
          triggerBarrierAlert();
        }
      }
    };

    const onScroll = () => {
      const prizesEl = document.getElementById('prizes');
      if (!prizesEl) return;
      const maxScroll = prizesEl.offsetTop + prizesEl.offsetHeight - window.innerHeight;
      if (window.scrollY > maxScroll + 35) {
        window.scrollTo({ top: maxScroll, behavior: 'auto' });
        triggerBarrierAlert();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('scroll', onScroll);
    };
  }, [allPrizesUnlocked]);

  const handleNavClick = (sectionId: string) => {
    const downstream = ['schedule', 'sponsors', 'team', 'faq', 'contact'];
    if (!allPrizesUnlocked && downstream.includes(sectionId)) {
      const prizesEl = document.getElementById('prizes');
      if (prizesEl) {
        prizesEl.scrollIntoView({ behavior: 'smooth' });
        triggerBarrierAlert();
      }
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLocked) {
    const days    = Math.floor(timeLeft / 86400000);
    const hours   = Math.floor((timeLeft / 3600000) % 24);
    const minutes = Math.floor((timeLeft / 60000) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
      <>
        <WandCursor />
        <div className="wizard-lock-screen">
          <div className="wizard-lock-frame-corner top-left" />
          <div className="wizard-lock-frame-corner top-right" />
          <div className="wizard-lock-frame-corner bottom-left" />
          <div className="wizard-lock-frame-corner bottom-right" />
          <div className="wizard-lock-stars" />
          <div className="house-glow glow-gryffindor" />
          <div className="house-glow glow-slytherin" />
          <div className="golden-snitch">
            <div className="snitch-body" />
            <div className="snitch-wing wing-left" />
            <div className="snitch-wing wing-right" />
          </div>
          <div className="wizard-lock-content">
            <h1 className="wizard-lock-title">PORTAL &nbsp; SEALED</h1>
            <p className="wizard-lock-subtitle">The wizarding world chunks are generating. The portal stabilizes in:</p>
            <div className="wizard-lock-countdown">
              {[{ val: days, label: 'Days' }, { val: hours, label: 'Hours' }, { val: minutes, label: 'Mins' }, { val: seconds, label: 'Secs' }].map(({ val, label }) => (
                <div key={label} className="countdown-item">
                  <span className="countdown-num">{String(val).padStart(2, '0')}</span>
                  <span className="countdown-label">{label}</span>
                </div>
              ))}
            </div>
            <button className="wizard-lock-button" onClick={() => window.location.replace('/')}>Return to Dimension 1.0</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <WandCursor />
      <div className="global-bg-container">
        <div className={`bg-layer home-bg ${activeSection !== 'schedule' ? 'active' : ''}`} />
      </div>

      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {SECTIONS.map(id => {
        const PageMap: Record<SectionId, React.ReactNode> = {
          home:     <Home />,
          about:    <About />,
          themes:   <Themes />,
          prizes:   <Prizes onUnlockStatusChange={setAllPrizesUnlocked} showBarrierAlert={showBarrierAlert} />,
          schedule: <Schedule />,
          sponsors: <Sponsors />,
          team:     <Team />,
          faq:      <FAQ />,
          contact:  <Contact />,
        };
        return (
          <React.Fragment key={id}>
            <div id={id} className={activeSection === id ? 'active' : ''}>
              {PageMap[id]}
            </div>
            {id === 'prizes' && <CharacterShowcase />}
          </React.Fragment>
        );
      })}

      <Footer onNavClick={handleNavClick} />
    </>
  );
}
