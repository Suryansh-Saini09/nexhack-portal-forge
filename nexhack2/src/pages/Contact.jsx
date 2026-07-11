import React, { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://websitebackend-w5m9.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Error dispatching owl:', err);
      setStatus('error');
    }
    setTimeout(() => setStatus(''), 4000);
  };

  const getButtonBackground = () => {
    if (status === 'sending') return 'linear-gradient(135deg, #555 0%, #335 100%)';
    if (status === 'success') return 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)';
    if (status === 'error') return 'linear-gradient(135deg, #c62828 0%, #b71c1c 100%)';
    return 'linear-gradient(135deg, #ae0001 0%, #740001 100%)';
  };

  const getButtonBorderColor = () => {
    if (status === 'success') return '#5cd68a';
    if (status === 'error') return '#ff8a80';
    return '#eeb939';
  };

  return (
    <main className="objects-section" style={{ minHeight: '90vh', padding: '140px 0 100px 0' }}>
      <h1 className="section-title">Owl Post</h1>
      
      <div className="objects-container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        <div className="contact-wrapper">
          
          {/* Left Side: Owl Info Panel */}
          <div className="contact-info-panel">
            {/* Thematic Glow backdrop behind image */}
            <div style={{
              position: 'absolute',
              top: '10%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236, 185, 57, 0.12) 0%, rgba(0,0,0,0) 70%)',
              filter: 'blur(20px)',
              pointerEvents: 'none',
              zIndex: 0
            }} />
            
            <div style={{ zIndex: 1, position: 'relative' }}>
              <h2 style={{
                fontFamily: 'HarryP, Cinzel Decorative, serif',
                fontSize: '3rem',
                color: '#fff',
                marginBottom: '10px',
                letterSpacing: '1px',
                textShadow: '0 0 10px rgba(236, 185, 57, 0.3)'
              }}>Get in Touch</h2>
              <div style={{
                width: '60px',
                height: '2px',
                background: 'linear-gradient(90deg, #eeb939 0%, transparent 100%)',
                marginBottom: '25px'
              }} />
              
              <p style={{
                fontFamily: 'Spectral, serif',
                fontSize: '1.15rem',
                lineHeight: '1.6',
                color: 'var(--color-text-muted)',
                marginBottom: '30px'
              }}>
                Need to reach the Ministry of Hackers or summon the organizing committee? Contact us directly through the channels below.
              </p>

              {/* Detail fields in a clean 2-column grid to shorten card height */}
              <div className="contact-details-grid">
                <div>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#ff9900', letterSpacing: '1px', marginBottom: '4px' }}>EMAIL</h4>
                  <p style={{ fontFamily: 'Spectral, serif', color: '#fff', fontSize: '1.1rem' }}>nexhack@geetauniversity.edu.in</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#ff9900', letterSpacing: '1px', marginBottom: '4px' }}>DISCORD</h4>
                  <p style={{ fontFamily: 'Spectral, serif', color: '#fff', fontSize: '1.1rem' }}>thenexhack</p>
                </div>
                <div>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#ff9900', letterSpacing: '1px', marginBottom: '4px' }}>INSTAGRAM</h4>
                  <p style={{ fontFamily: 'Spectral, serif', color: '#fff', fontSize: '1.1rem' }}>@thenexhack</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#ff9900', letterSpacing: '1px', marginBottom: '4px' }}>LOCATION</h4>
                  <p style={{ fontFamily: 'Spectral, serif', color: '#fff', fontSize: '1.1rem' }}>Geeta University, Panipat</p>
                </div>
                <div style={{ gridColumn: 'span 2' }}>
                  <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: '0.9rem', color: '#ff9900', letterSpacing: '1px', marginBottom: '4px' }}>EMERGENCY NO. (HOWLER)</h4>
                  <p style={{ fontFamily: 'Spectral, serif', color: '#fff', fontSize: '1.1rem' }}>+91 9053709750</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="contact-form-panel">
            {/* Thematic wand accent border like the original designs */}
            <div className="wand-decor" style={{
              position: 'absolute',
              top: '45px',
              left: '20px',
              width: '4px',
              height: '70px',
              background: 'linear-gradient(to bottom, #eeb939, #ae0001)'
            }} />
            
            <div style={{ paddingLeft: '15px' }}>
              <h2 style={{
                fontFamily: 'HarryP, Cinzel, serif',
                fontSize: '2.8rem',
                color: '#fff',
                marginBottom: '5px'
              }}>Send an Owl</h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.88rem',
                color: 'var(--color-text-muted)',
                marginBottom: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1.5px'
              }}>Write your parchment scroll</p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                <div>
                  <label className="character-role" style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '0.85rem',
                    color: '#eeb939',
                    letterSpacing: '1.5px',
                    fontWeight: 'bold'
                  }}>Your Name</label>
                  <input 
                    type="text" 
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Harry Potter"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      fontFamily: 'Spectral, serif',
                      fontSize: '1.05rem',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      cursor: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#eeb939';
                      e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.target.style.boxShadow = '0 0 15px rgba(238, 185, 57, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label className="character-role" style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '0.85rem',
                    color: '#eeb939',
                    letterSpacing: '1.5px',
                    fontWeight: 'bold'
                  }}>Your Email</label>
                  <input 
                    type="email" 
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="wizard@hogwarts.edu"
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      fontFamily: 'Spectral, serif',
                      fontSize: '1.05rem',
                      outline: 'none',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      cursor: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#eeb939';
                      e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.target.style.boxShadow = '0 0 15px rgba(238, 185, 57, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label className="character-role" style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontSize: '0.85rem',
                    color: '#eeb939',
                    letterSpacing: '1.5px',
                    fontWeight: 'bold'
                  }}>Your Message</label>
                  <textarea 
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    rows={3}
                    placeholder="Inscribe your parchment scroll..."
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: '#fff',
                      fontFamily: 'Spectral, serif',
                      fontSize: '1.05rem',
                      outline: 'none',
                      resize: 'none',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      cursor: 'none'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#eeb939';
                      e.target.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.target.style.boxShadow = '0 0 15px rgba(238, 185, 57, 0.15)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.02)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'sending'}
                  style={{
                    padding: '14px 30px',
                    borderRadius: '30px',
                    background: getButtonBackground(),
                    border: `1px solid ${getButtonBorderColor()}`,
                    color: '#fff',
                    fontFamily: 'Cinzel, serif',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    letterSpacing: '2px',
                    cursor: status === 'sending' ? 'not-allowed' : 'none',
                    transition: 'all 0.3s ease-out',
                    alignSelf: 'flex-start',
                    marginTop: '10px',
                    boxShadow: status === 'success' 
                      ? '0 4px 15px rgba(46, 125, 50, 0.4)' 
                      : status === 'error' 
                        ? '0 4px 15px rgba(198, 40, 40, 0.4)' 
                        : '0 4px 15px rgba(174, 0, 1, 0.3)',
                    opacity: status === 'sending' ? 0.7 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (status === 'sending') return;
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = status === 'success'
                      ? '0 6px 20px rgba(92, 214, 138, 0.4)'
                      : status === 'error'
                        ? '0 6px 20px rgba(255, 138, 128, 0.4)'
                        : '0 6px 20px rgba(238, 185, 57, 0.4), 0 0 15px rgba(174, 0, 1, 0.5)';
                    e.target.style.borderColor = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (status === 'sending') return;
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = status === 'success'
                      ? '0 4px 15px rgba(46, 125, 50, 0.4)'
                      : status === 'error'
                        ? '0 4px 15px rgba(198, 40, 40, 0.4)'
                        : '0 4px 15px rgba(174, 0, 1, 0.3)';
                    e.target.style.borderColor = getButtonBorderColor();
                  }}
                >
                  {status === 'sending' 
                    ? 'Sending Owl...' 
                    : status === 'success' 
                      ? 'Owl Dispatched!' 
                      : status === 'error' 
                        ? 'Failed to Send' 
                        : 'Dispatch Owl'}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
