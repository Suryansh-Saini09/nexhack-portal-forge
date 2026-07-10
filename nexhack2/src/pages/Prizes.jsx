import React, { useState, useEffect, useRef } from 'react';

const objectsData = [
  {
    id: 'galleons',
    rank: '2nd',
    title: '2nd Prize: Galleon Pool',
    subtitle: 'Grand Runners-Up',
    image: './images/prizes/galleon.png',
    alt: 'Embossed Golden Galleon Coin',
    class: 'left-card'
  },
  {
    id: 'snitch',
    rank: '1st',
    title: '1st Prize: Golden Snitch',
    subtitle: 'Ultimate Champions',
    image: './images/prizes/snitch.png',
    alt: 'Flying Golden Snitch with wings',
    class: 'center-card'
  },
  {
    id: 'wand',
    rank: '3rd',
    title: '3rd Prize: Elder Wand',
    subtitle: 'Technical Mastery',
    image: './images/prizes/elder_wand.png',
    alt: 'The Elder Wand resting',
    class: 'right-card'
  }
];

function PrizeCard({ obj, unfolded }) {
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card || !unfolded) return;

    const isTouch = window.matchMedia('(max-width: 768px)').matches;
    if (isTouch) return;

    const onMouseMove = (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xc = rect.width / 2;
      const yc = rect.height / 2;

      const maxTilt = 15;
      const angleX = -((y - yc) / yc) * maxTilt;
      const angleY = ((x - xc) / xc) * maxTilt;

      card.style.zIndex = '15';
      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.05, 1.05, 1.05) translateY(-12px)`;
    };

    const onMouseEnter = () => {
      card.style.transition = 'transform 0.1s ease, border-color 0.4s ease, box-shadow 0.4s ease';
    };

    const onMouseLeave = () => {
      card.style.zIndex = '';
      card.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.25, 1), border-color 0.4s ease, box-shadow 0.4s ease';

      let baseRotation = 'rotate(0deg)';
      if (obj.class === 'left-card') baseRotation = 'rotate(-4deg)';
      if (obj.class === 'right-card') baseRotation = 'rotate(4deg)';
      if (obj.class === 'center-card') baseRotation = 'translateY(-15px) scale(1.02)';

      card.style.transform = baseRotation;
    };

    wrapper.addEventListener('mousemove', onMouseMove);
    wrapper.addEventListener('mouseenter', onMouseEnter);
    wrapper.addEventListener('mouseleave', onMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', onMouseMove);
      wrapper.removeEventListener('mouseenter', onMouseEnter);
      wrapper.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [unfolded, obj.class]);

  return (
    <div
      ref={wrapperRef}
      className={`prize-cinematic-wrapper ${obj.class}-wrapper`}
    >
      <div
        ref={cardRef}
        className={`prize-cinematic-card ${obj.class}`}
      >
        {/* Breathing backdrop glow */}
        <div className="prize-card-glow-backdrop" />

        {/* Animated magic portal vortex */}
        <div className="prize-card-portal-vortex" />

        {/* Ambient floating ember particles */}
        <div className="prize-card-particles">
          <span className="particle p1"></span>
          <span className="particle p2"></span>
          <span className="particle p3"></span>
          <span className="particle p4"></span>
          <span className="particle p5"></span>
        </div>

        <div className="prize-card-inner">
          <div className="prize-card-badge">{obj.rank}</div>
          <div className="prize-card-img-wrapper">
            <img src={obj.image} alt={obj.alt} className="prize-card-img" />
          </div>
          <h2 className="prize-card-title">{obj.title}</h2>
          <p className="prize-card-subtitle">{obj.subtitle}</p>
        </div>
      </div>
    </div>
  );
}

export default function Prizes() {
  const [unfolded, setUnfolded] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setUnfolded(true);
        }
      },
      {
        threshold: 0.15
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <main className="objects-section" ref={containerRef}>
      <h1 className="section-title">NexHack Rewards</h1>

      <div className={`prizes-cinematic-row ${unfolded ? 'unfolded' : ''}`}>
        {objectsData.map((obj) => (
          <PrizeCard
            key={obj.id}
            obj={obj}
            unfolded={unfolded}
          />
        ))}
      </div>
    </main>
  );
}
