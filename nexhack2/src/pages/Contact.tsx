import React, { useState } from 'react';
import { postApi } from '../utils/api';

type SendStatus = '' | 'sending' | 'success' | 'error';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<SendStatus>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const data = await postApi('/api/contact', form);
      if (data && data.success) {
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

  const contactChannels = [
    {
      icon: '✉️',
      label: 'OWL POST (EMAIL)',
      val: 'nexhack@geetauniversity.edu.in',
      href: 'mailto:nexhack@geetauniversity.edu.in'
    },
    {
      icon: '💬',
      label: 'DISCORD SANCTUM',
      val: 'thenexhack',
      href: 'https://discord.com'
    },
    {
      icon: '📸',
      label: 'INSTAGRAM SCROLL',
      val: '@thenexhack',
      href: 'https://instagram.com/thenexhack'
    },
    {
      icon: '📍',
      label: 'PHYSICAL REALM',
      val: 'Geeta University, Panipat',
      href: null
    },
    {
      icon: '📜',
      label: 'HOWLER TRANSMISSION',
      val: '+91 9053709750',
      href: 'tel:+919053709750'
    }
  ];

  return (
    <main className="objects-section owl-post-section" id="contact">
      {/* Grand Header */}
      <div className="owl-post-grand-header">
        <div className="themes-eyebrow-badge">
          <span className="eyebrow-sparkle">✦</span>
          <span className="eyebrow-text">THE MINISTRY OF COMMUNICATIONS</span>
          <span className="eyebrow-sparkle">✦</span>
        </div>
        <h1 className="section-title">Owl Post</h1>
        <div className="themes-header-divider" style={{ margin: '12px auto 26px' }} />
      </div>

      {/* Main 2-Column Enchanted Vault Card */}
      <div className="owl-vault-container">
        <div className="owl-vault-card">
          {/* Top Arcane Hairline */}
          <div className="owl-card-top-hairline" />

          {/* Left Panel: Information & Channels */}
          <div className="owl-info-column">
            <div className="owl-ambient-aura" />

            <div className="owl-column-header">
              <span className="owl-panel-tag">✦ REACH THE COMMITTEE ✦</span>
              <h2 className="owl-column-title">Get in Touch</h2>
              <div className="owl-title-underline" />
              <p className="owl-column-desc">
                Need to reach the Ministry of Hackers or summon the organizing committee? Dispatch your query through our official channels.
              </p>
            </div>

            {/* Channels Grid */}
            <div className="owl-channels-grid">
              {contactChannels.map((c, i) => {
                const isFull =
                  c.label.includes('EMAIL') ||
                  c.label.includes('PHYSICAL') ||
                  c.label.includes('LOCATION') ||
                  c.label.includes('HOWLER');
                return (
                  <div
                    key={i}
                    className={`owl-channel-tile ${isFull ? 'full-width' : ''}`}
                  >
                    <div className="channel-icon-bubble">{c.icon}</div>
                    <div className="channel-text-wrap">
                      <span className="channel-label-text">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} target="_blank" rel="noopener noreferrer" className="channel-value-link">
                          {c.val}
                        </a>
                      ) : (
                        <span className="channel-value-text">{c.val}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Central Gilded Divider with Rune Seal */}
          <div className="owl-vertical-divider">
            <div className="owl-seal-badge">
              <span className="owl-seal-icon">🪶</span>
            </div>
          </div>

          {/* Right Panel: Parchment Inquiry Form */}
          <div className="owl-form-column">
            <div className="owl-column-header">
              <span className="owl-panel-tag">✦ PARCHMENT INQUIRY ✦</span>
              <h2 className="owl-column-title">Send an Owl</h2>
              <div className="owl-title-underline" />
              <p className="owl-column-desc">
                Inscribe your parchment scroll and an owl messenger will be dispatched instantly.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="owl-interactive-form">
              <div className="owl-form-group">
                <label className="owl-field-label">YOUR NAME</label>
                <div className="owl-input-wrap">
                  <span className="owl-input-icon">👤</span>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    placeholder="e.g. Harry Potter"
                    className="owl-text-input"
                  />
                </div>
              </div>

              <div className="owl-form-group">
                <label className="owl-field-label">OWL ADDRESS (EMAIL)</label>
                <div className="owl-input-wrap">
                  <span className="owl-input-icon">✉️</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    placeholder="wizard@hogwarts.edu"
                    className="owl-text-input"
                  />
                </div>
              </div>

              <div className="owl-form-group">
                <label className="owl-field-label">YOUR MESSAGE</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={2}
                  placeholder="Inscribe your parchment scroll..."
                  className="owl-text-input owl-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`owl-dispatch-btn ${status}`}
              >
                <span>
                  {status === 'sending'
                    ? 'DISPATCHING OWL...'
                    : status === 'success'
                    ? 'OWL DISPATCHED! ✦'
                    : status === 'error'
                    ? 'FAILED TO DISPATCH'
                    : 'DISPATCH OWL MESSAGE ✉️'}
                </span>
              </button>
            </form>
          </div>

          {/* Ornate Corner Filigrees */}
          <div className="alliance-corner tl" />
          <div className="alliance-corner tr" />
          <div className="alliance-corner bl" />
          <div className="alliance-corner br" />
        </div>
      </div>
    </main>
  );
}
