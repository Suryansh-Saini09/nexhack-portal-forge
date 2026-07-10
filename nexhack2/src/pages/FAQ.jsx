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
    q: "What should I bring to the event??",
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
  return (
    <div
      className="object-card"
      style={{ padding: '25px 35px', margin: '0 auto 20px auto', width: '100%', maxWidth: '800px', cursor: 'none' }}
      onClick={onClick}
    >
      <div className="object-card-content" style={{ paddingLeft: '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="object-title" style={{ fontSize: '1.8rem', margin: '0' }}>{item.q}</h2>
          <span style={{
            fontSize: '1.8rem',
            color: '#ae0001',
            transition: 'transform 0.3s ease',
            transform: isOpen ? 'rotate(45deg)' : 'none',
            fontWeight: 'bold'
          }}>+</span>
        </div>
        <div style={{
          maxHeight: isOpen ? '200px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.4s cubic-bezier(0.25, 1, 0.5, 1), margin-top 0.3s ease',
          marginTop: isOpen ? '15px' : '0px'
        }}>
          <p className="object-description" style={{ fontSize: '1.1rem', lineHeight: '1.6', margin: '0' }}>{item.a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <main className="objects-section">
      <h1 className="section-title">Frequently Asked Questions</h1>
      <div className="objects-container" style={{ gap: '0' }}>
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
