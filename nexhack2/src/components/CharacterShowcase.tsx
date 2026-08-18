import React, { useEffect, useRef, useState } from 'react';

interface Character {
  id: string;
  src: string;
  alt: string;
  title: string;
  hasWand?: boolean;
  depthFactor: number;
}

const characterList: Character[] = [
  { id: '1', src: './images/cartoon_team/1.webp', alt: 'Harry Potter Character 1', title: 'Arcane Scholar', hasWand: true, depthFactor: 3.2 },
  { id: '2', src: './images/cartoon_team/2.webp', alt: 'Harry Potter Character 2', title: 'Shadow Walker', hasWand: false, depthFactor: 2.4 },
  { id: '3', src: './images/cartoon_team/3.webp', alt: 'Harry Potter Character 3', title: 'Potion Master', hasWand: true, depthFactor: 4.1 },
  { id: '4', src: './images/cartoon_team/4.webp', alt: 'Harry Potter Character 4', title: 'Spell Weaver', hasWand: true, depthFactor: 3.0 },
  { id: '5', src: './images/cartoon_team/5.webp', alt: 'Harry Potter Character 5', title: 'Mystic Seer', hasWand: true, depthFactor: 4.5 },
  { id: '6', src: './images/cartoon_team/6.webp', alt: 'Harry Potter Character 6', title: 'Rune Smith', hasWand: false, depthFactor: 2.8 },
  { id: '7', src: './images/cartoon_team/7.webp', alt: 'Harry Potter Character 7', title: 'Dragon Tamer', hasWand: true, depthFactor: 3.6 },
  { id: '8', src: './images/cartoon_team/8.webp', alt: 'Harry Potter Character 8', title: 'Astral Warden', hasWand: false, depthFactor: 4.8 },
  { id: '9', src: './images/cartoon_team/9.webp', alt: 'Harry Potter Character 9', title: 'Phoenix Sage', hasWand: true, depthFactor: 3.4 },
  { id: '10', src: './images/cartoon_team/10.webp', alt: 'Harry Potter Character 10', title: 'Cipher Mage', hasWand: true, depthFactor: 4.0 }
];

export default function CharacterShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Triple sequence for gapless infinite marquee
  const marqueeItems = [...characterList, ...characterList, ...characterList];

  // Viewport Staggered Reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // High-performance hardware accelerated mouse parallax (3–5px)
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const rect = sectionRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    rafRef.current = requestAnimationFrame(() => {
      if (sectionRef.current) {
        sectionRef.current.style.setProperty('--mouse-x', `${(x * 2).toFixed(3)}`);
        sectionRef.current.style.setProperty('--mouse-y', `${(y * 2).toFixed(3)}`);
      }
    });
  };

  const handleMouseLeave = () => {
    if (sectionRef.current) {
      sectionRef.current.style.setProperty('--mouse-x', '0');
      sectionRef.current.style.setProperty('--mouse-y', '0');
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`character-marquee-section ${isInView ? 'in-view' : ''}`}
      aria-label="Magical Characters Procession"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Mystical Background Atmosphere */}
      <div className="marquee-ambient-glow" />
      <div className="marquee-top-mist" />

      {/* Sparse Drifting Magical Particles */}
      <div className="marquee-stardust-layer" aria-hidden="true">
        {[...Array(12)].map((_, i) => (
          <span key={i} className={`marquee-dust-sparkle d-${i + 1}`} />
        ))}
      </div>

      {/* Infinite Moving Character Procession */}
      <div className="character-marquee-track">
        {marqueeItems.map((char, index) => {
          const itemKey = `${char.id}-${index}`;
          const staggerIndex = index % 10;

          return (
            <div
              key={itemKey}
              className={`character-marquee-item item-char-${char.id} float-node-${char.id}`}
              style={{
                '--char-depth': `${char.depthFactor}px`,
                '--stagger-delay': `${staggerIndex * 130}ms`
              } as React.CSSProperties}
            >
              {/* Character Image & Parallax Wrapper */}
              <div className="character-portrait-wrapper">
                <img
                  src={char.src}
                  alt={char.alt}
                  className="character-marquee-img"
                  draggable={false}
                  loading="lazy"
                />

                {/* Rare Subtle Wand Tip Spark */}
                {char.hasWand && (
                  <div className="wand-spark-emitter" aria-hidden="true">
                    <span className="wand-spark-core" />
                    <span className="wand-spark-flare" />
                  </div>
                )}
              </div>

              {/* Water / Black Lake Reflection */}
              <div className="character-reflection-wrapper" aria-hidden="true">
                <img
                  src={char.src}
                  alt=""
                  className="character-reflection-img"
                  draggable={false}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Mist Vignette */}
      <div className="marquee-bottom-mist" />
    </section>
  );
}
