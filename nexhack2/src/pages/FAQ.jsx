import React, { useState } from 'react';

const faqData = [
  {
    q: "What is the registration process?",
    a: "To register for NexHack, simply head over to our official website and click the “Register Now” button. Fill in your details, select your team members and submit the form. Once registered, you’ll receive a confirmation email along with event details."
  },
  {
    q: "How many members are required in a team for NexHack?",
    a: "You can participate in teams of 2–4 members."
  },
  {
    q: "What should I bring to the event?",
    a: "Bring your laptop, charger, Student ID card, any peripherals you prefer, and your creativity! We'll provide food, drinks, swag, and all the energy you need."
  },
  {
    q: "Are there any participation requirements?",
    a: "NexHack is open to everyone! Whether you’re a college student, or a tech enthusiast, you’re welcome to join. All you need is a team of 2–4 members and the passion to hack the next dimension."
  },
  {
    q: "Will food be provided during the hackathon?",
    a: "Yes, participants will be provided with breakfast, lunch, dinner, and midnight snacks to keep you energized throughout the hackathon. All meals and refreshments are included and will be served at scheduled times during the event."
  },
  {
    q: "Can I start working on my project before the event?",
    a: "No, all development must begin only after the official start of NexHack. Any team found working on a pre-built project will face disqualification. However, you are allowed to brainstorm ideas and research concepts in advance."
  },
  {
    q: "Can we form teams at the venue?",
    a: "No, teams must be formed before registration. Only complete teams (2–4 members) will be allowed to participate."
  }
];

function FAQItem({ item, isOpen, onClick }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    padding: '25px 35px',
    margin: '0 auto 20px auto',
    width: '100%',
    maxWidth: '1100px',
    cursor: 'none',
    border: isOpen 
      ? '1.5px solid #eeb939' 
      : hovered 
        ? '1.5px solid rgba(238, 185, 57, 0.4)' 
        : '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: isOpen 
      ? '0 15px 35px rgba(238, 185, 57, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.03)' 
      : hovered 
        ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(238, 185, 57, 0.06)' 
        : '0 4px 20px rgba(0, 0, 0, 0.3)',
    transform: hovered ? 'translateY(-3px)' : 'none',
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
    background: isOpen ? 'rgba(14, 18, 34, 0.6)' : 'rgba(14, 18, 34, 0.35)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  };

  return (
    <div
      className="object-card"
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="object-card-content" style={{ paddingLeft: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <h2 
            className="object-title" 
            style={{ 
              fontSize: '1.45rem', 
              margin: '0',
              color: isOpen || hovered ? '#eeb939' : '#fff',
              textShadow: isOpen || hovered ? '0 0 10px rgba(238, 185, 57, 0.15)' : 'none',
              transition: 'all 0.3s ease',
              fontFamily: 'Cinzel, serif',
              letterSpacing: '1px',
              fontWeight: '600'
            }}
          >
            {item.q}
          </h2>
          <span style={{
            fontSize: '1.8rem',
            color: isOpen || hovered ? '#eeb939' : 'rgba(255, 255, 255, 0.4)',
            textShadow: isOpen || hovered ? '0 0 10px #eeb939' : 'none',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), color 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'none',
            fontWeight: 'bold',
            lineHeight: 1
          }}>+</span>
        </div>
        <div style={{
          maxHeight: isOpen ? '250px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), margin-top 0.3s ease',
          marginTop: isOpen ? '15px' : '0px'
        }}>
          <p 
            className="object-description" 
            style={{ 
              fontSize: '1.05rem', 
              lineHeight: '1.7', 
              margin: '0',
              color: 'rgba(255, 255, 255, 0.75)',
              fontFamily: 'Spectral, serif',
              borderTop: '1px solid rgba(255, 255, 255, 0.05)',
              paddingTop: '15px'
            }}
          >
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="objects-section" style={{ padding: '120px 0 100px 0' }}>
      {/* Header */}
      <div className="themes-header" style={{ marginBottom: '60px' }}>
        <h1 className="section-title" style={{ marginBottom: '16px' }}>Frequently Asked Questions</h1>
        <p className="themes-subheading" style={{ maxWidth: '800px', margin: '0 auto' }}>
          Unravel the mysteries of NexHack 2.0. Everything you need to know about registrations, guidelines, and the wizarding arena.
        </p>
        <div className="themes-header-divider" />
      </div>

      <div className="objects-container" style={{ gap: '0', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </main>
  );
}
