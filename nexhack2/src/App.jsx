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
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const LAUNCH_DATE = new Date("2026-08-15T09:00:00+05:30");

export default function App() {
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = LAUNCH_DATE.getTime() - Date.now();
    return diff > 0 ? diff : 0;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => {
      const diff = LAUNCH_DATE.getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft(0);
        clearInterval(interval);
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const isLocked = false;

  const [activeSection, setActiveSection] = useState('home');
  const videoRef = React.useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const sections = ['home', 'about', 'themes', 'prizes', 'schedule', 'sponsors', 'team', 'faq', 'contact'];
          const viewportCenter = window.innerHeight / 2;

          let currentSection = 'home';
          let minDistance = Infinity;
          const debugInfo = [];
          for (const id of sections) {
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              const sectionCenter = rect.top + rect.height / 2;
              const distance = Math.abs(sectionCenter - viewportCenter);
              debugInfo.push(`${id}: top=${Math.round(rect.top)}, bottom=${Math.round(rect.bottom)}, dist=${Math.round(distance)}`);
              if (distance < minDistance) {
                minDistance = distance;
                currentSection = id;
              }
            }
          }
          const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
          if (isAtBottom) {
            currentSection = 'contact';
          }
          console.log(`Scroll Spy active=${currentSection} scrollY=${window.scrollY} vpCenter=${viewportCenter}`, debugInfo);
          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // Initial call
    handleScroll();

    // Call after a short delay once React layout mounts completely
    const timer = setTimeout(handleScroll, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isLocked) {
    const days = Math.floor(timeLeft / 86400000);
    const hours = Math.floor((timeLeft / 3600000) % 24);
    const minutes = Math.floor((timeLeft / 60000) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
      <>
        {/* Global Custom Cursor */}
        <WandCursor />

        <div className="wizard-lock-screen">
          {/* Decorative golden frame corners */}
          <div className="wizard-lock-frame-corner top-left" />
          <div className="wizard-lock-frame-corner top-right" />
          <div className="wizard-lock-frame-corner bottom-left" />
          <div className="wizard-lock-frame-corner bottom-right" />

          {/* Animated background stars */}
          <div className="wizard-lock-stars" />

          {/* Hogwarts House Ambient Glows */}
          <div className="house-glow glow-gryffindor" />
          <div className="house-glow glow-slytherin" />

          {/* Animated Golden Snitch */}
          <div className="golden-snitch">
            <div className="snitch-body" />
            <div className="snitch-wing wing-left" />
            <div className="snitch-wing wing-right" />
          </div>

          {/* Content Overlay */}
          <div className="wizard-lock-content">


            <h1 className="wizard-lock-title">PORTAL &nbsp; SEALED</h1>

            <p className="wizard-lock-subtitle">
              The wizarding world chunks are generating. The portal stabilizes in:
            </p>

            <div className="wizard-lock-countdown">
              <div className="countdown-item">
                <span className="countdown-num">{String(days).padStart(2, '0')}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-num">{String(hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-num">{String(minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Mins</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-num">{String(seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Secs</span>
              </div>
            </div>

            <button
              className="wizard-lock-button"
              onClick={() => window.location.replace('/')}
            >
              Return to Dimension 1.0
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Global Custom Cursor */}
      <WandCursor />

      {/* Global Background */}
      <div className="global-bg-container">
        {/* Video Background for Home & Schedule sections */}
        <div
          className={`bg-layer video-bg ${['home', 'schedule'].includes(activeSection) ? 'active' : ''}`}
          style={{ display: ['home', 'schedule'].includes(activeSection) ? 'block' : 'none' }}
        >
          <video
            ref={videoRef}
            src="./images/home/nexhack.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
          {/* Dark Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(10, 20, 40, 0.35) 0%, rgba(3, 3, 5, 0.95) 90%)',
            pointerEvents: 'none'
          }} />
        </div>

        {/* Image Background for all other sections */}
        <div className={`bg-layer home-bg ${!['home', 'schedule'].includes(activeSection) ? 'active' : ''}`} />
      </div>

      {/* Floating Capsule Header */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

      {/* Stacked View Sections */}
      <div id="home" className={activeSection === 'home' ? 'active' : ''}>
        <Home />
      </div>
      <div id="about" className={activeSection === 'about' ? 'active' : ''}>
        <About />
      </div>
      <div id="themes" className={activeSection === 'themes' ? 'active' : ''}>
        <Themes />
      </div>
      <div id="prizes" className={activeSection === 'prizes' ? 'active' : ''}>
        <Prizes />
      </div>
      <div id="schedule" className={activeSection === 'schedule' ? 'active' : ''}>
        <Schedule />
      </div>
      <div id="sponsors" className={activeSection === 'sponsors' ? 'active' : ''}>
        <Sponsors />
      </div>
      <div id="team" className={activeSection === 'team' ? 'active' : ''}>
        <Team />
      </div>
      <div id="faq" className={activeSection === 'faq' ? 'active' : ''}>
        <FAQ />
      </div>
      <div id="contact" className={activeSection === 'contact' ? 'active' : ''}>
        <Contact />
      </div>

      {/* Footer component */}
      <Footer onNavClick={handleNavClick} />


    </>
  );
}
