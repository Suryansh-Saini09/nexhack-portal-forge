import React, { useState, useEffect, useRef } from 'react';

interface Track {
  id: string;
  num: string;
  spell: string;
  title: string;
  desc: string;
}

const tracksData: Track[] = [
  {
    id: 'forensic-tech',
    num: '01',
    spell: 'Aparecium',
    title: 'Forensic Tech',
    desc: 'Uncover hidden digital footprints, extract encrypted artifacts, and deploy automated forensics to solve cyber crimes.'
  },
  {
    id: 'edtech',
    num: '02',
    spell: 'Lumos',
    title: 'EdTech',
    desc: 'Transform educational paradigms with intelligent tutoring, interactive classroom tools, and adaptive knowledge networks.'
  },
  {
    id: 'open-innovation',
    num: '03',
    spell: 'Alohomora',
    title: 'Open Innovation',
    desc: 'Break conventional boundaries in a limitless track where cross-domain engineering meets raw creative innovation.'
  },
  {
    id: 'web3',
    num: '04',
    spell: 'Decentralia',
    title: 'Web3 & Blockchain',
    desc: 'Forge tamper-proof smart contracts, decentralized ledgers, zero-knowledge privacy layers, and sovereign identity.'
  },
  {
    id: 'ai-agri',
    num: '05',
    spell: 'Herbivicus',
    title: 'AI in Agriculture',
    desc: 'Leverage computer vision for crop diagnostics, predictive meteorology, and automated precision soil enrichment.'
  },
  {
    id: 'generative-ai',
    num: '06',
    spell: 'Conjurus',
    title: 'Generative AI',
    desc: 'Empower human ingenuity with agentic workflows, neural synthesizers, multimodal intelligence, and real-time generation.'
  },
  {
    id: 'robotics',
    num: '07',
    spell: 'Locomotor',
    title: 'Robotics & Automation',
    desc: 'Design intelligent physical automata, real-time spatial pathfinding, sensory telemetry, and collaborative robot interfaces.'
  },
  {
    id: 'cybersecurity',
    num: '08',
    spell: 'Cave Inimicum',
    title: 'Cybersecurity',
    desc: 'Fortify digital perimeters with impenetrable cryptographic barriers, active anomaly detection, and zero-trust defenses.'
  },
  {
    id: 'fintech',
    num: '09',
    spell: 'Gringotts',
    title: 'FinTech',
    desc: 'Re-engineer transactions with microsecond algorithmic settlements, fraud-resistant ledgers, and automated trading.'
  },
  {
    id: 'campus-solutions',
    num: '10',
    spell: 'Hogwarts',
    title: 'Campus Solutions',
    desc: 'Build frictionless utilities for university life: intelligent resource dispatch, safety telemetry, and community portals.'
  }
];

export default function Themes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScrollable = rect.height - window.innerHeight;

          if (totalScrollable > 0) {
            const current = -rect.top;
            const progress = Math.min(Math.max(current / totalScrollable, 0), 1);
            setScrollProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const totalTracks = tracksData.length;
  const currentFocus = scrollProgress * (totalTracks - 1);
  const activeIndex = Math.min(Math.round(currentFocus), totalTracks - 1);

  const scrollToTheme = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (index / (totalTracks - 1)) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="themes-cinematic-wrapper">
      <div className="themes-sticky-stage">

        {/* Ambient Dark Atmospheric Glows */}
        <div className="themes-ambient-backdrop">
          <div className="themes-radial-glow top-glow" />
          <div className="themes-radial-glow bottom-glow" />
          <div className="themes-big-watermark-text" aria-hidden="true">
            THEMES
          </div>
        </div>

        {/* Centered Grand Hall Header */}
        <div className="themes-centered-header">
          <span className="themes-hall-tag">THE GRAND HALL OF TRACKS</span>
          <h1 className="themes-hall-title">Hacking Themes</h1>
          <div className="themes-hall-divider" />
        </div>

        {/* Cards Stream Canvas — First Card highlighted at start */}
        <div className="themes-stagger-canvas">
          {tracksData.map((track, i) => {
            const diff = i - currentFocus;
            const absDiff = Math.abs(diff);

            // Render visible cards
            if (absDiff > 2.8) return null;

            // Track 01 is guaranteed spotlight at start, progression follows smoothly
            const isFocal = i === activeIndex || absDiff < 0.45;

            // Spacing across viewport
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            const spacing = isMobile ? 320 : 440;
            const translateX = diff * spacing;

            // Subtle vertical stagger for editorial rhythm
            const translateY = (i % 2 === 0 ? -16 : 16) + diff * 8;

            const scale = Math.max(0.85, 1 - absDiff * 0.08);
            const opacity = Math.max(0.2, 1 - absDiff * 0.32);
            const zIndex = Math.round(30 - absDiff * 6);

            return (
              <div
                key={track.id}
                className={`theme-rect-card ${isFocal ? 'is-focal' : 'is-peripheral'}`}
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                  opacity,
                  zIndex,
                }}
                onClick={() => scrollToTheme(i)}
              >
                {/* Header Row: Number + Spell */}
                <div className="rect-card-header">
                  <span className="rect-track-num">TRACK // {track.num}</span>
                  <span className="rect-spell-name">{track.spell}</span>
                </div>

                {/* Main Theme Title */}
                <h2 className="rect-theme-title">{track.title}</h2>

                {/* Divider Line */}
                <div className="rect-card-divider" />

                {/* About / Description */}
                <p className="rect-desc-text">{track.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
