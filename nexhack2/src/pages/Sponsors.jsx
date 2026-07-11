import React, { useState } from 'react';

/* Replace src values with actual logo image paths when available */
const sponsorTiers = [
  {
    tier: 'Gold Sponsors',
    icon: '✦',
    accentColor: '#eeb939',
    size: 'large',
    sponsors: [
      { id: 'gringotts',  src: './images/sponsors/sponsor1.png', role: 'Title Sponsor' },
      { id: 'ollivanders', src: './images/sponsors/sponsor1.png', role: 'Hardware Sponsor' },
    ]
  },
  {
    tier: 'Platform Partner',
    icon: '◈',
    accentColor: '#c084fc',
    size: 'medium',
    sponsors: [
      { id: 'ministry', src: './images/sponsors/sponsor1.png', role: 'Cloud Partner' },
      { id: 'flourish',  src: './images/sponsors/sponsor1.png', role: 'Platform Partner' },
    ]
  },
  {
    tier: 'Special Sponsors',
    icon: '⬡',
    accentColor: '#38bdf8',
    size: 'medium',
    sponsors: [
      { id: 'weasleys',  src: './images/sponsors/sponsor1.png', role: 'Creativity Sponsor' },
      { id: 'honeyduke', src: './images/sponsors/sponsor1.png', role: 'Food Sponsor' },
      { id: 'quidditch', src: './images/sponsors/sponsor1.png', role: 'Sports-Tech Sponsor' },
    ]
  },
];

const communityPartners = [
  { id: 'prophet',    src: './images/sponsors/sponsor1.png' },
  { id: 'hogsmead',   src: './images/sponsors/sponsor1.png' },
  { id: 'sorting',    src: './images/sponsors/sponsor1.png' },
  { id: 'three-b',    src: './images/sponsors/sponsor1.png' },
  { id: 'divination', src: './images/sponsors/sponsor1.png' },
  { id: 'patronus',   src: './images/sponsors/sponsor1.png' },
  { id: 'leaky',      src: './images/sponsors/sponsor1.png' },
  { id: 'floo',       src: './images/sponsors/sponsor1.png' },
];

function LogoCard({ sponsor, size, accentColor }) {
  return (
    <div className="sponsor-card-wrap">
      <a
        href="#"
        className={`sponsor-logo-card sponsor-logo-card--${size}`}
        style={{ '--accent': accentColor }}
      >
        {sponsor.src
          ? <img src={sponsor.src} alt="sponsor logo" className="sponsor-logo-img" />
          : <div className="sponsor-logo-placeholder" />
        }
      </a>
      {sponsor.role && (
        <p className="sponsor-role-label">{sponsor.role}</p>
      )}
    </div>
  );
}

function TierSection({ tier }) {
  return (
    <div className="sponsor-tier">
      <div className="sponsor-tier-header">
        <span className="sponsor-tier-icon" style={{ color: tier.accentColor }}>{tier.icon}</span>
        <h2 className="sponsor-tier-title" style={{ color: tier.accentColor }}>{tier.tier}</h2>
        <div className="sponsor-tier-line" style={{ background: `linear-gradient(90deg, ${tier.accentColor}50, transparent)` }} />
      </div>

      <div className={`sponsor-tier-grid sponsor-tier-grid--${tier.size}`}>
        {tier.sponsors.map(s => (
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
        <span className="sponsor-tier-icon" style={{ color: accentColor }}>○</span>
        <h2 className="sponsor-tier-title" style={{ color: accentColor }}>Community Partners</h2>
        <div className="sponsor-tier-line" style={{ background: `linear-gradient(90deg, ${accentColor}50, transparent)` }} />
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track marquee-track--left">
          {row1.map((p, i) => (
            <a key={i} href="#" className="marquee-logo-card" style={{ '--accent': accentColor }}>
              {p.src
                ? <img src={p.src} alt="partner logo" className="sponsor-logo-img" />
                : <div className="sponsor-logo-placeholder" />
              }
            </a>
          ))}
        </div>

        <div className="marquee-track marquee-track--right">
          {row2.map((p, i) => (
            <a key={i} href="#" className="marquee-logo-card" style={{ '--accent': accentColor }}>
              {p.src
                ? <img src={p.src} alt="partner logo" className="sponsor-logo-img" />
                : <div className="sponsor-logo-placeholder" />
              }
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Sponsors() {
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleSponsorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://websitebackend-w5m9.onrender.com/api/sponsor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({
          company: '',
          contactName: '',
          email: '',
          tier: 'Gold',
          message: ''
        });
      } else {
        alert(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      alert('A network error occurred. Please try again.');
    }
  };

  return (
    <main className="objects-section sponsors-page">
      {/* Header */}
      <div className="themes-header" style={{ marginBottom: '70px' }}>
        <h1 className="section-title" style={{ marginBottom: '16px' }}>Sponsors</h1>
        <p className="themes-subheading">
          The wizarding world behind NexHack 2026 — organisations that believe in the next generation of builders.
        </p>
        <div className="themes-header-divider" />
      </div>

      {/* Tier sections */}
      <div className="sponsors-tiers-wrapper">
        {sponsorTiers.map((tier, i) => (
          <TierSection key={i} tier={tier} />
        ))}
        <CommunityMarquee />
      </div>

      {/* ── Become a Sponsor CTA ── */}
      <div className="sponsor-cta-block">
        {/* Animated bg orbs */}
        <div className="cta-orb cta-orb--gold" />
        <div className="cta-orb cta-orb--purple" />

        <p className="themes-eyebrow" style={{ marginBottom: '12px' }}>
          ✦ &nbsp;Join the Magic
        </p>
        <h2 className="sponsor-cta-title">Become a Sponsor</h2>
        <p className="sponsor-cta-desc">
          Partner with NexHack 2026 to showcase your brand, connect with top-tier developer talent, and fuel the next wave of wizarding innovation.
        </p>

        {/* Actions */}
        <div className="sponsor-cta-actions">
          <button onClick={() => setShowSponsorModal(true)} className="register-btn" style={{ cursor: 'none' }}>
            Contact Us
          </button>
          <a href="/NexHack_Sponsorship%20_Brochure.pdf" download className="sponsor-cta-link">Download Sponsorship Kit →</a>
        </div>
      </div>

      {showSponsorModal && (
        <div className="magic-modal-overlay" onClick={() => setShowSponsorModal(false)}>
          <div 
            className="magic-modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ 
              maxWidth: '650px', 
              width: '95%',
              padding: '30px 40px',
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
              <div style={{ padding: '20px 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div className="magic-modal-icon" aria-hidden="true" style={{ animation: 'floatIcon 3s ease-in-out infinite alternate', fontSize: '3.2rem', marginBottom: '15px' }}>✉️</div>
                <h2 className="magic-modal-title" style={{ fontSize: '2.4rem', fontFamily: 'HarryP, serif' }}>Inquiry Sent!</h2>
                <div className="magic-modal-divider" style={{ margin: '15px auto' }} />
                <p className="magic-modal-text" style={{ fontSize: '1.1rem', textAlign: 'center' }}>
                  Your partnership proposal has been dispatched! Our owl messenger is winging its way to the committee, and we will reply post-haste.
                </p>
                <button className="magic-modal-btn" onClick={handleCloseModal}>
                  Mischief Managed
                </button>
              </div>
            ) : (
              <form onSubmit={handleSponsorSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="magic-modal-icon" aria-hidden="true" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🤝</div>
                  <h2 className="magic-modal-title" style={{ fontSize: '2.4rem', fontFamily: 'HarryP, serif' }}>Forge an Alliance</h2>
                  <div className="magic-modal-divider" style={{ margin: '10px auto' }} />
                  <p className="magic-modal-text" style={{ fontSize: '0.95rem', marginBottom: '15px', textAlign: 'center' }}>
                    Share your details to enlist as an ally for NexHack 2.0.
                  </p>
                </div>

                {/* Grid Row 1: Company Name & Contact Name */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#eeb939', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Cinzel, serif' }}>Organization / Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Gringotts Bank"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontFamily: 'Spectral, serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#eeb939', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Cinzel, serif' }}>Contact Person Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Griphook"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontFamily: 'Spectral, serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Grid Row 2: Owl Email & Interest Tier */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#eeb939', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Cinzel, serif' }}>Owl Address (Email)</label>
                    <input
                      type="email"
                      required
                      placeholder="partner@gringotts.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontFamily: 'Spectral, serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'none'
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '0.8rem', color: '#eeb939', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Cinzel, serif' }}>Interest Tier</label>
                    <select
                      value={formData.tier}
                      onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        background: '#0e1222',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        fontFamily: 'Spectral, serif',
                        fontSize: '0.95rem',
                        outline: 'none',
                        cursor: 'none'
                      }}
                    >
                      <option value="Gold">Gold Ally</option>
                      <option value="Platform">Platform Ally</option>
                      <option value="Special">Special Ally</option>
                      <option value="Custom">Custom / In-Kind Ally</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Owl Post Message / Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#eeb939', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'Cinzel, serif' }}>Owl Post Message / Details</label>
                  <textarea
                    rows="4"
                    placeholder="Tell us how you would like to support our tech magic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      fontFamily: 'Spectral, serif',
                      fontSize: '0.95rem',
                      outline: 'none',
                      cursor: 'none',
                      resize: 'none'
                    }}
                  />
                </div>

                <button type="submit" className="magic-modal-btn" style={{ marginTop: '10px', width: '100%', cursor: 'none' }}>
                  Send Owl Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

