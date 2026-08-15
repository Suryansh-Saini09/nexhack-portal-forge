import React, { useState } from 'react';
import { postApi } from '../utils/api';

interface SponsorItem {
  id: string;
  role?: string;
  src?: string;
}

interface SponsorTier {
  tier: string;
  icon: string;
  accentColor: string;
  size: 'large' | 'medium' | 'small';
  sponsors: SponsorItem[];
}

interface SponsorFormData {
  company: string;
  contactName: string;
  email: string;
  tier: string;
  message: string;
}

const sponsorTiers: SponsorTier[] = [
  {
    tier: 'Gold Sponsors',
    icon: '✦',
    accentColor: '#eeb939',
    size: 'large',
    sponsors: [
      { id: 'gold-1', src: '/cblogo.png' },
      { id: 'gold-2', src: '/cblogo.png' }
    ]
  },
  {
    tier: 'Platform Partner',
    icon: '◈',
    accentColor: '#c084fc',
    size: 'medium',
    sponsors: [
      { id: 'plat-1', src: '/cblogo.png' },
      { id: 'plat-2', src: '/cblogo.png' }
    ]
  },
  {
    tier: 'Special Sponsors',
    icon: '⬡',
    accentColor: '#38bdf8',
    size: 'medium',
    sponsors: [
      { id: 'spec-1', src: '/cblogo.png' },
      { id: 'spec-2', src: '/cblogo.png' },
      { id: 'spec-3', src: '/cblogo.png' }
    ]
  }
];

const communityPartners: SponsorItem[] = [
  { id: 'cp-1', src: '/cblogo.png' },
  { id: 'cp-2', src: '/cblogo.png' },
  { id: 'cp-3', src: '/cblogo.png' },
  { id: 'cp-4', src: '/cblogo.png' },
  { id: 'cp-5', src: '/cblogo.png' },
  { id: 'cp-6', src: '/cblogo.png' },
  { id: 'cp-7', src: '/cblogo.png' },
  { id: 'cp-8', src: '/cblogo.png' }
];

function LogoCard({ sponsor, size, accentColor }: { sponsor: SponsorItem; size: string; accentColor: string }) {
  return (
    <div className="sponsor-card-wrap">
      <div
        className={`sponsor-logo-card sponsor-logo-card--${size}`}
        style={{ '--accent': accentColor } as React.CSSProperties}
      >
        {sponsor.src ? (
          <img src={sponsor.src} alt="Coding Blocks" className="sponsor-logo-img" />
        ) : (
          <div className="sponsor-logo-placeholder" />
        )}
      </div>
      {sponsor.role && <span className="sponsor-role-label">{sponsor.role}</span>}
    </div>
  );
}

function TierSection({ tier }: { tier: SponsorTier }) {
  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-header">
        <span className="sponsor-tier-icon" style={{ color: tier.accentColor }}>
          {tier.icon}
        </span>
        <h2 className="sponsor-tier-title" style={{ color: tier.accentColor }}>
          {tier.tier}
        </h2>
        <div
          className="sponsor-tier-line"
          style={{ background: `linear-gradient(90deg, ${tier.accentColor}70, transparent)` }}
        />
      </div>
      <div className={`sponsor-tier-grid sponsor-tier-grid--${tier.size}`}>
        {tier.sponsors.map((s) => (
          <LogoCard key={s.id} sponsor={s} size={tier.size} accentColor={tier.accentColor} />
        ))}
      </div>
    </div>
  );
}

function CommunityMarquee() {
  const accentColor = '#34d399';
  const row1 = [...communityPartners, ...communityPartners];
  const row2 = [...communityPartners, ...communityPartners].reverse();
  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-header">
        <span className="sponsor-tier-icon" style={{ color: accentColor }}>
          ○
        </span>
        <h2 className="sponsor-tier-title" style={{ color: accentColor }}>
          Community Partners
        </h2>
        <div
          className="sponsor-tier-line"
          style={{ background: `linear-gradient(90deg, ${accentColor}70, transparent)` }}
        />
      </div>
      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track--left">
          {row1.map((p, i) => (
            <div key={i} className="marquee-logo-card" style={{ '--accent': accentColor } as React.CSSProperties}>
              {p.src ? <img src={p.src} alt="Coding Blocks" className="sponsor-logo-img" /> : <div className="sponsor-logo-placeholder" />}
            </div>
          ))}
        </div>
        <div className="marquee-track marquee-track--right">
          {row2.map((p, i) => (
            <div key={i} className="marquee-logo-card" style={{ '--accent': accentColor } as React.CSSProperties}>
              {p.src ? <img src={p.src} alt="Coding Blocks" className="sponsor-logo-img" /> : <div className="sponsor-logo-placeholder" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [formData, setFormData] = useState<SponsorFormData>({
    company: '',
    contactName: '',
    email: '',
    tier: 'Gold',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCloseModal = () => {
    setIsRotating(true);
    setTimeout(() => {
      setShowSponsorModal(false);
      setIsRotating(false);
      setSubmitted(false);
    }, 500);
  };

  const handleSponsorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await postApi('/api/sponsor', formData);
      if (data && data.success) {
        setSubmitted(true);
        setFormData({ company: '', contactName: '', email: '', tier: 'Gold', message: '' });
      } else {
        alert(data?.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      alert((err as Error).message || 'A network error occurred. Please try again.');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(212, 160, 23, 0.25)',
    color: '#fff',
    fontFamily: 'Spectral, serif',
    fontSize: '0.95rem',
    outline: 'none',
    cursor: 'text'
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '0.76rem',
    color: '#f0c030',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    fontFamily: 'Cinzel, serif'
  };

  return (
    <main className="objects-section sponsors-page">
      {/* Page Header */}
      <div className="themes-header" style={{ marginBottom: '35px' }}>
        <h1 className="section-title" style={{ marginBottom: '16px' }}>
          Sponsors & Allies
        </h1>
        <p className="themes-subheading">
          The wizarding institutions empowering NexHack 2026 — visionary partners fueling the next generation of builders.
        </p>
        <div className="themes-header-divider" />
      </div>

      {/* Sponsor Tiers Showcase */}
      <div className="sponsors-tiers-wrapper">
        {sponsorTiers.map((tier, i) => (
          <TierSection key={i} tier={tier} />
        ))}
        <CommunityMarquee />
      </div>

      {/* Compact & Sleek "Become a Sponsor" Arcane Card */}
      <div className="sponsor-cta-block magical-alliance-compact">
        {/* Ambient Glow Orbs */}
        <div className="cta-orb cta-orb--gold" />
        <div className="cta-orb cta-orb--purple" />

        {/* Top Arcane Hairline */}
        <div className="alliance-top-hairline" />

        {/* Header Tag */}
        <div className="alliance-eyebrow-badge">
          <span>JOIN THE MAGIC</span>
        </div>

        {/* Main Title */}
        <h2 className="sponsor-cta-title">Become a Sponsor</h2>

        {/* Narrative Description */}
        <p className="sponsor-cta-desc">
          Partner with <strong>NexHack 2026</strong> to showcase your technology, connect with 1,000+ top developer talents, and fuel the next wave of wizarding innovation.
        </p>

        {/* Action Controls */}
        <div className="sponsor-cta-actions">
          <button
            onClick={() => setShowSponsorModal(true)}
            className="alliance-primary-btn"
            style={{ cursor: 'pointer' }}
          >
            <span>CONTACT US</span>
          </button>
          <a
            href="./images/sponsors/NexHack_2.0_Sponsorship_Prospectus.pdf"
            download
            className="alliance-secondary-btn"
          >
            <span>DOWNLOAD SPONSORSHIP KIT</span>
            <span className="btn-arrow">→</span>
          </a>
        </div>

        {/* Filigree Corners */}
        <div className="alliance-corner tl" />
        <div className="alliance-corner tr" />
        <div className="alliance-corner bl" />
        <div className="alliance-corner br" />
      </div>

      {/* Sponsor Owl Post Modal */}
      {showSponsorModal && (
        <div className="magic-modal-overlay" onClick={() => setShowSponsorModal(false)}>
          <div
            className="magic-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '650px',
              width: '95%',
              padding: '24px 32px',
              textAlign: 'left',
              alignItems: 'stretch'
            }}
          >
            <button
              className={`magic-modal-close ${isRotating ? 'key-rotate' : ''}`}
              onClick={handleCloseModal}
              style={{ padding: '4px', right: '15px', zIndex: 10 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="magic-modal-key-icon"
              >
                <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
              </svg>
            </button>
            {submitted ? (
              <div
                style={{
                  padding: '20px 0',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div
                  className="magic-modal-icon"
                  aria-hidden="true"
                  style={{
                    animation: 'floatIcon 3s ease-in-out infinite alternate',
                    fontSize: '2.8rem',
                    marginBottom: '10px'
                  }}
                >
                  ✉️
                </div>
                <h2 className="magic-modal-title" style={{ fontSize: '2.1rem', fontFamily: 'HarryP, serif' }}>
                  Inquiry Dispatched!
                </h2>
                <div className="magic-modal-divider" style={{ margin: '10px auto' }} />
                <p className="magic-modal-text" style={{ fontSize: '1rem', textAlign: 'center' }}>
                  Your alliance proposal has been dispatched! Our owl messenger is winging its way to the committee, and we will reply post-haste.
                </p>
                <button className="magic-modal-btn" onClick={handleCloseModal} style={{ marginTop: '14px' }}>
                  Mischief Managed
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSponsorSubmit}
                style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="magic-modal-icon" aria-hidden="true" style={{ fontSize: '2.2rem', marginBottom: '6px' }}>
                    🤝
                  </div>
                  <h2 className="magic-modal-title" style={{ fontSize: '2.2rem', fontFamily: 'HarryP, serif' }}>
                    Forge an Alliance
                  </h2>
                  <div className="magic-modal-divider" style={{ margin: '8px auto' }} />
                  <p className="magic-modal-text" style={{ fontSize: '0.88rem', marginBottom: '10px', textAlign: 'center' }}>
                    Share your organization details to partner with NexHack 2.0.
                  </p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Organization / Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gringotts Bank"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Contact Person Name</label>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Owl Address (Email)</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@gringotts.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={labelStyle}>Interest Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      style={{ ...inputStyle, background: '#0e1526', cursor: 'pointer' }}
                    >
                      <option value="Gold">Gold Ally</option>
                      <option value="Platform">Platform Ally</option>
                      <option value="Special">Special Ally</option>
                      <option value="Custom">Custom / In-Kind Ally</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={labelStyle}>Owl Post Message / Details</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us how you would like to support our hackathon..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>
                <button type="submit" className="alliance-primary-btn" style={{ marginTop: '6px', width: '100%', cursor: 'pointer' }}>
                  <span>Send Owl Message ✉️</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
