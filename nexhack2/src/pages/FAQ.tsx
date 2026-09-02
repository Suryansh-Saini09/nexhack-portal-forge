import React, { useState } from 'react';

interface FAQItem {
  id: number;
  numeral: string;
  q: string;
  a: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    numeral: 'I',
    q: "What is the registration process?",
    a: 'To register for NexHack, simply head over to our official website and click the "Register Now" button. Fill in your details, select your team members and submit the form. Once registered, you\'ll receive a confirmation email along with event details.'
  },
  {
    id: 2,
    numeral: 'II',
    q: "How many members are required in a team for NexHack?",
    a: "You can participate in teams of 2–4 members."
  },
  {
    id: 3,
    numeral: 'III',
    q: "What should I bring to the event?",
    a: "Bring your laptop, charger, Student ID card, any peripherals you prefer, and your creativity! We'll provide food, drinks, swag, and all the energy you need."
  },
  {
    id: 4,
    numeral: 'IV',
    q: "Are there any participation requirements?",
    a: "NexHack is open to everyone! Whether you're a college student, or a tech enthusiast, you're welcome to join. All you need is a team of 2–4 members and the passion to hack the next dimension."
  },
  {
    id: 5,
    numeral: 'V',
    q: "Will food be provided during the hackathon?",
    a: "Yes, participants will be provided with breakfast, lunch, dinner, and midnight snacks to keep you energized throughout the hackathon. All meals and refreshments are included and will be served at scheduled times during the event."
  },
  {
    id: 6,
    numeral: 'VI',
    q: "Can I start working on my project before the event?",
    a: "No, all development must begin only after the official start of NexHack. Any team found working on a pre-built project will face disqualification. However, you are allowed to brainstorm ideas and research concepts in advance."
  },
  {
    id: 7,
    numeral: 'VII',
    q: "Can we form teams at the venue?",
    a: "No, teams must be formed before registration. Only complete teams (2–4 members) will be allowed to participate."
  }
];

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section className="magical-faq-section" id="faq" aria-label="Frequently Asked Questions">
      {/* Background Arcane Glow */}
      <div className="faq-atmosphere-glow" />

      {/* Header */}
      <div className="themes-header" style={{ margin: '0 auto 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <h1 className="section-title">Frequently Asked Questions</h1>
      </div>

      {/* FAQ Grimoire Grid */}
      <div className="faq-grimoire-grid">
        {faqData.map(item => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className={`faq-grimoire-card ${isOpen ? 'is-open' : ''}`}
              onClick={() => toggleAccordion(item.id)}
            >
              {/* Card Header / Question */}
              <div className="faq-card-header">
                <div className="faq-numeral-badge">
                  <span>{item.numeral}</span>
                </div>

                <h2 className="faq-question-title">{item.q}</h2>

                <div className={`faq-toggle-icon ${isOpen ? 'rotated' : ''}`}>
                  <span className="toggle-rune">✦</span>
                </div>
              </div>

              {/* Card Body / Answer */}
              <div className="faq-card-collapse" style={{ maxHeight: isOpen ? '280px' : '0' }}>
                <div className="faq-card-answer">
                  <div className="faq-answer-gold-line" />
                  <p className="faq-answer-text">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Post Inquiry Callout in Harry Potter Style */}
      <div className="faq-owl-callout">
        <span className="owl-feather-icon">🪶</span>
        <span>Still puzzled by ancient riddles? Dispatch your owl to </span>
        <a href="#contact" className="owl-callout-link">Get in Touch</a>
        <span> below.</span>
      </div>
    </section>
  );
}
