import React, { useState, useEffect, useRef } from 'react';
import { postApi } from '../utils/api';

export interface Sponsor {
  id: string;
  name: string;
  category?: string;
  categoryType?: 'prize' | 'knowledge' | 'domain' | 'tech' | 'media';
  logo?: string;
  url?: string;
  tier?: 'powered-by' | 'ally';
}

/**
 * ⚡ HERO / POWERED BY SPONSORS
 * Primary patrons of NexHack 2.0
 */
export const POWERED_BY_SPONSORS: Sponsor[] = [
  {
    id: 'unstop',
    name: 'Unstop',
    category: 'Powered By Partner',
    logo: '/images/sponsors/unstop.png',
    url: 'https://unstop.com',
    tier: 'powered-by'
  },
  {
    id: 'geeksforgeeks',
    name: 'GeeksforGeeks',
    category: 'Powered By Partner',
    logo: '/images/sponsors/GeeksforGeeks.webp',
    url: 'https://geeksforgeeks.org',
    tier: 'powered-by'
  }
];

/**
 * 🏆 STRATEGIC & KNOWLEDGE ALLIES
 * Scalable sponsor wall — seamlessly accommodates 5, 10, 20+ partners
 */
export const ALLY_SPONSORS: Sponsor[] = [
  {
    id: 'codecrafters',
    name: 'CodeCrafters',
    category: '🏆 Prize Partner',
    categoryType: 'prize',
    logo: '/images/sponsors/codecrafters.svg',
    url: 'https://codecrafters.io',
    tier: 'ally'
  },
  {
    id: 'mastra',
    name: 'Mastra',
    category: '📚 Knowledge Partner',
    categoryType: 'knowledge',
    logo: '/images/sponsors/mastra.png',
    url: 'https://mastra.ai',
    tier: 'ally'
  },
  {
    id: 'xyz',
    name: '.xyz',
    category: '🌐 Domain Partner',
    categoryType: 'domain',
    logo: '/images/sponsors/xyz.svg',
    url: 'https://gen.xyz',
    tier: 'ally'
  },
  /* {
    id: 'eventopia',
    name: 'Eventopia.in',
    category: '📢 Official Media Partner',
    categoryType: 'media',
    logo: '',
    url: 'https://eventopia.in',
    tier: 'ally'
  }, */
  {
    id: 'n8n',
    name: 'n8n',
    category: '💻 Technology Partner',
    categoryType: 'tech',
    logo: '/images/sponsors/n8n.svg',
    url: 'https://n8n.io',
    tier: 'ally'
  },
  {
    id: 'nexora',
    name: 'Nexora',
    category: '💻 Technology Partner',
    categoryType: 'tech',
    logo: '/images/sponsors/nexora.jpeg',
    url: '#',
    tier: 'ally'
  }
];

interface SponsorFormData {
  company: string;
  contactName: string;
  email: string;
  tier: string;
  message: string;
}

const sponsorPillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
      </svg>
    ),
    tag: 'TALENT & REACH',
    title: '500+ Elite Builders',
    desc: 'Connect directly with high-caliber developers, designers, and AI creators from 50+ premier institutions.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    tag: 'PRODUCT SPOTLIGHT',
    title: 'Custom Tracks & Bounties',
    desc: 'Empower hackers to build real-world solutions powered by your APIs, SDKs, dev tools, and cloud platforms.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    tag: 'HIRING PIPELINE',
    title: 'Direct Talent Access',
    desc: 'Fast-track recruitment with curated participant resumes, live project demonstrations, and interview access.'
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2 2 7h20L12 2z" />
      </svg>
    ),
    tag: 'BRAND IMMERSION',
    title: 'Keynote & Booth Presence',
    desc: 'Claim the main stage for keynote addresses, interactive workshops, branded booth stalls, and mentor desks.'
  }
];

export default function Sponsors() {
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [isKeyTurning, setIsKeyTurning] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [formData, setFormData] = useState<SponsorFormData>({
    company: '',
    contactName: '',
    email: '',
    tier: 'Gold Ally',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);

  // Progressive Scroll Summon Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-summoned');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.summon-reveal');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 16px',
    borderRadius: '10px',
    background: 'rgba(10, 16, 28, 0.85)',
    border: '1px solid rgba(212, 175, 55, 0.35)',
    color: '#ffffff',
    fontFamily: 'Spectral, serif',
    fontSize: '0.96rem',
    outline: 'none',
    boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.6)',
    transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
    cursor: 'text'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.74rem',
    color: '#f0c030',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    fontFamily: 'Cinzel, serif'
  };

  const handleCloseModal = () => {
    if (isKeyTurning || isModalClosing) return;
    setIsKeyTurning(true);
    setTimeout(() => {
      setIsModalClosing(true);
      setTimeout(() => {
        setShowSponsorModal(false);
        setIsKeyTurning(false);
        setIsModalClosing(false);
        setSubmitted(false);
      }, 320);
    }, 380);
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const data = await postApi('/api/sponsor', formData);
      if (data && data.success) {
        setSubmitted(true);
        setFormData({ company: '', contactName: '', email: '', tier: 'Gold Ally', message: '' });
      } else {
        alert(data?.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      alert((err as Error).message || 'A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main ref={sectionRef} className="objects-section sponsors-page" id="sponsors">
      {/* Background Arcane Halo */}
      <div className="sponsors-ambient-aura" />

      {/* Grand Section Header */}
      <div className="sponsors-grand-header summon-reveal">
        <div className="sponsors-eyebrow-badge">
          <span className="eyebrow-sparkle">✦</span>
          <span className="eyebrow-text">PATRONAGE & ALLIANCES</span>
          <span className="eyebrow-sparkle">✦</span>
        </div>
        <h1 className="section-title">OUR SPONSORS & ALLIES</h1>
        <p className="sponsors-section-subtitle">
          Those who stand with <strong>NexHack 2.0</strong> — championing the next generation of builders, innovators, and creators.
        </p>
        <div className="themes-header-divider" style={{ margin: '14px auto 0' }} />
      </div>

      {/* Main Patronage Showcase Container */}
      <div className="sponsors-showcase-container">

        {/* ===================================================================
            1. POWERED BY (HERO TIER)
            =================================================================== */}
        <section className="sponsor-tier-section tier-hero summon-reveal" aria-label="Powered By Sponsors">
          <div className="tier-header-badge">
            <span className="tier-badge-icon">⚡</span>
            <span className="tier-badge-label">POWERED BY</span>
            <span className="tier-badge-icon">⚡</span>
          </div>

          <div className="powered-by-hero-grid">
            {POWERED_BY_SPONSORS.map((sponsor, idx) => (
              <a
                key={sponsor.id || idx}
                href={sponsor.url || '#'}
                target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="sponsor-seal-card hero-seal"
                title={`${sponsor.name} — Powered By Partner`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="seal-shimmer-sweep" />
                <div className="seal-gold-perimeter" />

                <div className="seal-logo-chamber hero-chamber">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="seal-logo-img hero-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="seal-placeholder-chamber">
                      <span className="placeholder-crest-icon">✦ ⚡ ✦</span>
                      <span className="placeholder-brand-title">{sponsor.name}</span>
                    </div>
                  )}
                </div>

                <div className="seal-corner tl" />
                <div className="seal-corner tr" />
                <div className="seal-corner bl" />
                <div className="seal-corner br" />
              </a>
            ))}
          </div>
        </section>

        {/* Section Tier Connector */}
        <div className="sponsor-tier-divider summon-reveal">
          <div className="divider-line" />
          <span className="divider-sparkle">✦</span>
          <div className="divider-line" />
        </div>

        {/* ===================================================================
            2. OUR ALLIES (RESPONSIVE 3-COL / 2-COL / 1-COL SPONSOR WALL)
            =================================================================== */}
        <section className="sponsor-tier-section tier-allies summon-reveal" aria-label="Strategic and Knowledge Allies">
          <div className="tier-header-badge">
            <span className="tier-badge-icon">🏆</span>
            <span className="tier-badge-label">STRATEGIC & KNOWLEDGE ALLIES</span>
            <span className="tier-badge-icon">🏆</span>
          </div>

          <div className="allies-sponsor-wall">
            {ALLY_SPONSORS.map((sponsor, idx) => (
              <a
                key={sponsor.id || idx}
                href={sponsor.url || '#'}
                target={sponsor.url && sponsor.url !== '#' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="sponsor-seal-card ally-seal"
                title={`${sponsor.name}${sponsor.category ? ` — ${sponsor.category}` : ''}`}
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="seal-shimmer-sweep" />
                <div className="seal-gold-perimeter" />

                <div className="seal-logo-chamber ally-chamber">
                  {sponsor.logo ? (
                    <img
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      className="seal-logo-img ally-img"
                      loading="lazy"
                    />
                  ) : (
                    <div className="seal-placeholder-chamber">
                      <span className="placeholder-crest-icon">✦ 🪄 ✦</span>
                      <span className="placeholder-brand-title">{sponsor.name}</span>
                    </div>
                  )}
                </div>

                {sponsor.category && (
                  <div className="seal-category-footer">
                    <span className={`seal-category-label ${sponsor.categoryType ? `type-${sponsor.categoryType}` : ''}`}>
                      {sponsor.category}
                    </span>
                  </div>
                )}

                <div className="seal-corner tl" />
                <div className="seal-corner tr" />
                <div className="seal-corner bl" />
                <div className="seal-corner br" />
              </a>
            ))}
          </div>
        </section>

        {/* Section Tier Connector */}
        <div className="sponsor-tier-divider summon-reveal">
          <div className="divider-line" />
          <span className="divider-sparkle">✦</span>
          <div className="divider-line" />
        </div>

        {/* ===================================================================
            3. BECOME A PARTNER SECTION
            =================================================================== */}
        <section className="sponsor-tier-section tier-partner-cta summon-reveal" aria-label="Become a Partner">
          <div className="tier-header-badge">
            <span className="tier-badge-icon">✦</span>
            <span className="tier-badge-label">PATRONAGE INVITATION</span>
            <span className="tier-badge-icon">✦</span>
          </div>

          <h2 className="section-title" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.1rem)', margin: '0' }}>
            BECOME A PARTNER
          </h2>
          <div className="themes-header-divider" style={{ margin: '8px auto 16px' }} />

          <div className="sponsor-decree-card">
            <div className="decree-ambient-aura" />
            <div className="decree-top-hairline" />

            <p className="decree-compact-tagline">
              ✦ Even the greatest spells require legendary tools — equip 500+ tech wizards and watch pure innovation come alive. ✦
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
                <span>DOWNLOAD DECREE (PDF)</span>
              </a>
            </div>

            {/* Corner Filigree Brackets */}
            <div className="decree-corner tl" />
            <div className="decree-corner tr" />
            <div className="decree-corner bl" />
            <div className="decree-corner br" />
          </div>
        </section>
      </div>

      {/* Widened & Sleek Dispatch Owl Inquiry Vault Modal Card */}
      {showSponsorModal && (
        <div
          className="magic-modal-overlay"
          onClick={handleCloseModal}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999999,
            background: 'rgba(3, 6, 14, 0.88)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            opacity: isModalClosing ? 0 : 1,
            transition: 'opacity 0.3s ease'
          }}
        >
          <div
            className="owl-inquiry-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '740px',
              background: 'linear-gradient(155deg, rgba(16, 24, 40, 0.98) 0%, rgba(9, 14, 25, 0.99) 60%, rgba(6, 9, 16, 1) 100%)',
              border: '1.8px solid rgba(212, 175, 55, 0.65)',
              borderRadius: '22px',
              padding: '26px 38px 22px',
              boxShadow: '0 25px 80px rgba(0, 0, 0, 0.96), 0 0 40px rgba(212, 175, 55, 0.22), inset 0 1px 2px rgba(255, 235, 160, 0.25)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              transform: isModalClosing ? 'scale(0.93) translateY(15px)' : 'scale(1) translateY(0)',
              filter: isModalClosing ? 'blur(5px)' : 'none',
              opacity: isModalClosing ? 0 : 1,
              transition: 'all 0.3s ease',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          >
            {/* Top Gilded Shimmer Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: '12%',
                right: '12%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent 0%, #f0c030 50%, transparent 100%)',
                boxShadow: '0 0 10px rgba(240, 192, 48, 0.85)'
              }}
            />

            {/* Turning Golden Vault Key Close Button */}
            <button
              onClick={handleCloseModal}
              title="Turn Key to Close"
              aria-label="Turn key to close card"
              style={{
                position: 'absolute',
                top: '14px',
                right: '16px',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(14, 23, 38, 0.95)',
                border: '1.2px solid rgba(212, 175, 55, 0.65)',
                color: '#f0c030',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 30,
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6), 0 0 10px rgba(240, 192, 48, 0.25)',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isKeyTurning ? 'rotate(-180deg) scale(1.15)' : 'rotate(0deg) scale(1)',
                  filter: isKeyTurning ? 'drop-shadow(0 0 20px #ffd700) brightness(1.8)' : 'drop-shadow(0 0 4px #ffd700)',
                  transition: 'transform 0.4s cubic-bezier(0.3, 0, 0.2, 1), filter 0.35s ease'
                }}
              >
                <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </button>

            {submitted ? (
              <div style={{ padding: '16px 10px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '6px' }}>✉️</div>
                <h2 style={{ fontFamily: 'HarryP, serif', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', margin: 0, textShadow: '0 0 14px rgba(240, 192, 48, 0.4)' }}>
                  Inquiry Dispatched!
                </h2>
                <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, transparent, #f0c030, transparent)', margin: '8px auto' }} />
                <p style={{ fontFamily: 'Spectral, serif', fontSize: '0.94rem', color: 'rgba(245, 230, 200, 0.9)', lineHeight: 1.5, maxWidth: '420px', margin: '6px auto' }}>
                  Your alliance proposal has been sealed and dispatched! Our owl messenger is winging its way to the committee, and we will reply post-haste.
                </p>
                <button className="alliance-primary-btn" onClick={handleCloseModal} style={{ marginTop: '12px', padding: '10px 26px', fontSize: '0.82rem' }}>
                  <span>Mischief Managed ✦</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ fontSize: '1.8rem', marginBottom: '2px', filter: 'drop-shadow(0 0 6px rgba(240, 192, 48, 0.4))' }}>🤝</div>
                  <h2 style={{ fontFamily: 'HarryP, serif', fontSize: '2.4rem', color: '#ffffff', letterSpacing: '2px', textShadow: '0 0 14px rgba(240, 192, 48, 0.35)', margin: 0, lineHeight: 1 }}>
                    Forge an Alliance
                  </h2>
                  <div style={{ width: '60px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #f0c030, transparent)', margin: '6px auto 6px', boxShadow: '0 0 5px rgba(240, 192, 48, 0.6)' }} />
                  <p style={{ fontFamily: 'Spectral, serif', fontSize: '0.84rem', color: 'rgba(245, 230, 200, 0.82)', margin: '0 0 10px 0' }}>
                    Share your organization details to partner with <strong>NexHack 2.0</strong>.
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>ORGANIZATION / COMPANY NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gringotts Bank"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>CONTACT PERSON NAME</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Griphook"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '10px' }}>
                  <div>
                    <label style={labelStyle}>OWL ADDRESS (EMAIL)</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@gringotts.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>INTEREST TIER</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      style={{ ...inputStyle, background: '#0a101c', cursor: 'pointer' }}
                    >
                      <option value="Gold Ally">Gold Ally</option>
                      <option value="Platform Ally">Platform Ally</option>
                      <option value="Special Ally">Special Ally</option>
                      <option value="Custom / In-Kind Ally">Custom / In-Kind Ally</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={labelStyle}>OWL POST MESSAGE / DETAILS</label>
                  <textarea
                    rows={2}
                    placeholder="Tell us how you would like to support our hackathon..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="alliance-primary-btn"
                  style={{
                    width: '100%',
                    padding: '13px 24px',
                    fontSize: '0.86rem',
                    fontWeight: 800,
                    letterSpacing: '1.8px',
                    justifyContent: 'center',
                    marginTop: '6px'
                  }}
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
                  <span>{isSubmitting ? 'DISPATCHING OWL...' : 'SEND OWL INQUIRY'}</span>
                </button>
              </form>
            )}

            {/* Corner Filigree Brackets */}
            <div className="alliance-corner tl" />
            <div className="alliance-corner tr" />
            <div className="alliance-corner bl" />
            <div className="alliance-corner br" />
          </div>
        </div>
      )}
    </main>
  );
}
