import React, { useState, useEffect, useRef } from 'react';

interface Sponsor {
  id: string;
  name: string;
  category: string;
  descriptor?: string;
  logo: string;
  url?: string;
  tier: 'featured' | 'partner';
}

/**
 * 👑 FEATURED PARTNERS — PROMINENT TIERS
 */
export const FEATURED_SPONSORS: Sponsor[] = [
  {
    id: 'unstop',
    name: 'Unstop',
    category: 'Featured Partners',
    descriptor: 'PLATFORM PARTNER',
    logo: '/images/sponsors/unstop.png',
    url: 'https://unstop.com',
    tier: 'featured'
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    category: 'Featured Partners',
    descriptor: 'LEARNING PARTNER',
    logo: '/images/sponsors/GeeksforGeeks.webp',
    url: 'https://geeksforgeeks.org',
    tier: 'featured'
  }
];

/**
 * 🏛️ PARTNER LOGO WALL — FULLY SCALABLE
 * Scalable partner list for NexHack 2.0
 */
export const ALLY_SPONSORS: Sponsor[] = [
  {
    id: 'codecrafters',
    name: 'CodeCrafters',
    category: 'Prize Partners',
    descriptor: 'PRIZE PARTNER',
    logo: '/images/sponsors/codecrafters.svg',
    url: 'https://codecrafters.io',
    tier: 'partner'
  },
  {
    id: 'mastra',
    name: 'Mastra',
    category: 'Knowledge Partners',
    descriptor: 'KNOWLEDGE PARTNER',
    logo: '/images/sponsors/mastra.png',
    url: 'https://mastra.ai',
    tier: 'partner'
  },
  {
    id: 'xyz',
    name: '.xyz',
    category: 'Domain Partners',
    descriptor: 'DOMAIN PARTNER',
    logo: '/images/sponsors/xyz.svg',
    url: 'https://gen.xyz',
    tier: 'partner'
  },
  {
    id: 'n8n',
    name: 'n8n',
    category: 'Automation Partners',
    descriptor: 'AUTOMATION PARTNER',
    logo: '/images/sponsors/n8n.svg',
    url: 'https://n8n.io',
    tier: 'partner'
  },
  {
    id: 'nexora',
    name: 'Nexora Academy',
    category: 'Education Partners',
    descriptor: 'COMMUNITY PARTNER',
    logo: '/images/sponsors/nexora.jpeg',
    url: 'https://nexora.academy',
    tier: 'partner'
  }
];

/**
 * 📢 MEDIA PARTNERS
 */
export const MEDIA_SPONSORS: Sponsor[] = [
  {
    id: 'eventopia',
    name: 'Eventopia',
    category: 'Media Partners',
    descriptor: 'MEDIA PARTNER',
    logo: '/images/sponsors/eventopia.png',
    url: 'https://eventopia.in',
    tier: 'partner'
  }
];

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [isKeyRotating, setIsKeyRotating] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const revealElements = el.querySelectorAll('.editorial-reveal');
    if (!revealElements || revealElements.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleKeyClose = () => {
    if (isKeyRotating || isModalClosing) return;
    setIsKeyRotating(true);
    setTimeout(() => {
      setIsModalClosing(true);
      setTimeout(() => {
        setShowSponsorModal(false);
        setIsModalClosing(false);
        setIsKeyRotating(false);
      }, 260);
    }, 320);
  };

  const handleOverlayClose = () => {
    if (isKeyRotating || isModalClosing) return;
    handleKeyClose();
  };

  return (
    <main ref={sectionRef} className="editorial-sponsors-section">
      <div className="editorial-ambient-veil" aria-hidden="true" />

      {/* ── SECTION HEADER ── */}
      <header className="editorial-sponsors-header editorial-reveal">
        <h2 className="editorial-main-title">OUR SPONSORS & ALLIES</h2>
        <div className="sponsors-alliance-divider" aria-hidden="true">
          <span className="divider-line left" />
          <span className="divider-sigil-cluster">
            <span className="sigil-dot">◆</span>
            <span className="sigil-star">✦</span>
            <span className="sigil-dot">◆</span>
          </span>
          <span className="divider-line right" />
        </div>
      </header>

      {/* ── POWERED BY ── */}
      {FEATURED_SPONSORS.length > 0 && (
        <section className="featured-sponsors-section editorial-reveal" aria-label="Powered By">
          <h3 className="featured-sponsors-heading">POWERED BY</h3>
          <div className="featured-sponsors-grid">
            {FEATURED_SPONSORS.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="featured-sponsor-block"
                style={{ '--card-idx': index } as React.CSSProperties}
              >
                <a
                  href={sponsor.url || '#'}
                  target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="featured-sponsor-card"
                  title={sponsor.name}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className={`featured-sponsor-logo logo-${sponsor.id}`}
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── MEDIA PARTNER ── */}
      {MEDIA_SPONSORS.length > 0 && (
        <section className="media-sponsors-section editorial-reveal" aria-label="Media Partner">
          <h3 className="media-sponsors-heading">MEDIA PARTNER</h3>
          <div className="media-sponsors-grid">
            {MEDIA_SPONSORS.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="media-sponsor-block"
                style={{ '--card-idx': index } as React.CSSProperties}
              >
                <a
                  href={sponsor.url || '#'}
                  target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="media-sponsor-card"
                  title={sponsor.name}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className={`media-sponsor-logo logo-${sponsor.id}`}
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── GENERAL SPONSORS ── */}
      {ALLY_SPONSORS.length > 0 && (
        <section className="general-sponsors-section editorial-reveal" aria-label="General Sponsors">
          <h3 className="general-sponsors-heading">GENERAL SPONSORS</h3>
          <div className="general-sponsors-grid">
            {ALLY_SPONSORS.map((sponsor, index) => (
              <div
                key={sponsor.id}
                className="general-sponsor-block"
                style={{ '--card-idx': index } as React.CSSProperties}
              >
                <a
                  href={sponsor.url || '#'}
                  target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="general-sponsor-card"
                  title={sponsor.name}
                >
                  <img
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    className={`general-sponsor-logo logo-${sponsor.id}`}
                    loading="lazy"
                  />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ===================================================================
          BECOME A PARTNER SECTION / PATRONAGE INVITATION
          =================================================================== */}
      <section className="sponsor-tier-section tier-partner-cta editorial-reveal" aria-label="Become a Partner">
        <div className="sponsor-decree-card">
          <h2 className="decree-heading">FORGE AN ALLIANCE</h2>
          <div className="sponsors-arcane-divider" style={{ margin: '8px auto 14px' }}>
            <span className="divider-line" />
            <span className="divider-star">✦</span>
            <span className="divider-line" />
          </div>

          <p className="decree-compact-tagline">
            Even the greatest spells require legendary tools — equip 500+ tech wizards and watch pure innovation come alive.
          </p>

          {/* Action Controls */}
          <div className="decree-action-controls">
            <button
              onClick={() => setShowSponsorModal(true)}
              className="alliance-primary-btn"
            >
              <svg
                className="btn-wizard-svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3C8.13 3 5 6.13 5 10C5 14.5 8 19 12 21.5C16 19 19 14.5 19 10C19 6.13 15.87 3 12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="9" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="9" cy="9.5" r="1" fill="currentColor" />
                <circle cx="15" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="15" cy="9.5" r="1" fill="currentColor" />
                <path d="M12 10.5L11 13H13L12 10.5Z" fill="currentColor" />
                <path d="M2 8C4.5 9.5 5.5 12 5.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M22 8C19.5 9.5 18.5 12 18.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M9.5 16.5C11 17.5 13 17.5 14.5 16.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              <span>FORGE AN ALLIANCE ✦</span>
            </button>
            <a
              href="/images/sponsors/NexHack_2.0_Sponsorship_Prospectus.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="alliance-secondary-btn"
            >
              <span>SPONSORSHIP BROCHURE</span>
            </a>
          </div>
        </div>
      </section>

      {showSponsorModal && (
        <div
          className="editorial-modal-overlay"
          onClick={handleOverlayClose}
        >
          <div
            className="editorial-modal-card alliance-portal-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              opacity: isModalClosing ? 0 : 1,
              transform: isModalClosing ? 'translateY(16px) scale(0.95)' : 'translateY(0) scale(1)',
              transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {/* Golden Animated Key Close Button */}
            <button
              onClick={handleKeyClose}
              title="Close (Turn Key)"
              aria-label="Turn key to unlock and close modal"
              className={`golden-key-close-btn ${isKeyRotating ? 'is-unlocking' : ''}`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="7.5" cy="15.5" r="4.5" />
                <circle cx="7.5" cy="15.5" r="1.8" fill="currentColor" />
                <path d="M11 12l9-9" />
                <path d="M15.5 7.5l2.5 2.5" />
                <path d="M18.5 4.5l2.5 2.5" />
              </svg>
            </button>

            <div className="alliance-modal-content">
              <span className="alliance-modal-eyebrow">
                NEXHACK 2.0 • GEETA UNIVERSITY
              </span>
              <h2 className="alliance-modal-title">
                FORGE AN ALLIANCE
              </h2>

              <div className="sponsors-arcane-divider" style={{ margin: '8px auto 16px' }}>
                <span className="divider-line" />
                <span className="divider-star">✦</span>
                <span className="divider-line" />
              </div>

              <p className="alliance-modal-description">
                We invite industry leaders, technology partners, and visionary organizations to collaborate and empower 500+ builders at NexHack 2.0.
              </p>

              {/* ── SPONSORSHIP PURPOSE CONTACT EMAIL BOX ── */}
              <div className="sponsor-modal-email-banner">
                <div className="email-banner-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <span className="email-banner-label">Contact us for sponsorship purposes:</span>
                </div>
                <a
                  href="mailto:nexhack@geetauniversity.edu.in?subject=NexHack%202.0%20Sponsorship%20Inquiry"
                  className="sponsor-modal-email-link"
                  title="Send Email to NexHack Sponsorship Team"
                >
                  nexhack@geetauniversity.edu.in
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
