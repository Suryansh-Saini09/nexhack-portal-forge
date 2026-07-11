import React from 'react';

export default function Footer({ onNavClick }) {
  const socialLinks = [
    { 
      name: 'GitHub', 
      url: 'https://github.com/thenexhack', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg> 
    },
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/company/nexhack/', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> 
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/thenexhack/', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg> 
    },
    { 
      name: 'Discord', 
      url: 'https://discord.gg/mKy2G9ye6F', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 127.14 96.36"><path fill="currentColor" d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,52.88,6.83,77.19,77.19,0,0,0,49.58,0,105.15,105.15,0,0,0,19.14,8.07C-3,41.25-1.7,73.57,10.09,90.3A105.8,105.8,0,0,0,41.4,96.36a77.4,77.4,0,0,0,8.71-14.18,68.22,68.22,0,0,1-13.85-6.66c1.17-.86,2.3-1.76,3.39-2.7a75.78,75.78,0,0,0,74.94,0c1.09.94,2.22,1.84,3.39,2.7a68.22,68.22,0,0,1-13.85,6.66,77.4,77.4,0,0,0,8.71,14.18,105.8,105.8,0,0,0,31.31-6.06C128.84,73.57,130.14,41.25,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.83,46,53.83,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.23,60,73.23,53S78.41,40.36,84.69,40.36,96.07,46,96.07,53,91,65.69,84.69,65.69Z"/></svg> 
    },
    { 
      name: 'Twitter', 
      url: 'https://x.com/thenexhack', 
      icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> 
    }
  ];

  return (
    <footer className="footer-section">
      <div className="footer-glow" />
      <div className="footer-container">
        
        {/* Column 1: Brand & Socials */}
        <div className="footer-brand">
          <button className="footer-logo" onClick={() => onNavClick('home')}>
            NEXHACK
          </button>
          <p className="footer-tagline">
            The ultimate intersection of Code &amp; Magic. Unleash your inner wizard.
          </p>
          <div className="footer-patronage-container">
            <span className="footer-patronage-label">Organised By</span>
            <div className="footer-patronage-logos">
              <img src="./images/home/gu_logo.png" alt="Geeta University" className="patronage-logo-img" />
              <div className="footer-patronage-logo-divider" />
              <img src="./images/home/gth.png" alt="Geeta Technical Hub" className="patronage-logo-img" />
            </div>
          </div>
        </div>

        {/* Column 2: Index & Extra links */}
        <div className="footer-links-column">
          <div className="footer-links-grid">
            
            <div className="footer-nav">
              <h4>Spellbook Index</h4>
              <div className="footer-nav-grid">
                <button onClick={() => onNavClick('about')}>About</button>
                <button onClick={() => onNavClick('themes')}>Themes</button>
                <button onClick={() => onNavClick('prizes')}>Prizes</button>
                <button onClick={() => onNavClick('schedule')}>Schedule</button>
                <button onClick={() => onNavClick('sponsors')}>Sponsors</button>
                <button onClick={() => onNavClick('team')}>Committee</button>
                <button onClick={() => onNavClick('faq')}>FAQ</button>
                <button onClick={() => onNavClick('contact')}>Owl Post</button>
              </div>
            </div>
            
            <div className="footer-extra-links">
              <div className="footer-link-group">
                <h4>Resources</h4>
                <a href="#" className="footer-text-link">Sponsorship Brochure</a>
                <a href="./images/NexHack%202.0%20Code%20of%20Conduct.pdf" className="footer-text-link" target="_blank" rel="noopener noreferrer">Code of Conduct</a>
              </div>
              <div className="footer-link-group">
                <h4>Archives</h4>
                <a href="/archives/nexhack-1" className="footer-text-link">NexHack 1.0</a>
              </div>
            </div>

          </div>

          <div className="footer-handles-centered">
            <h4>Connect via handles</h4>
            <div className="footer-social-tray">
              {socialLinks.map((s, idx) => (
                <a 
                  key={idx}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-social-icon"
                  aria-label={s.name}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Column 3: Geeta University Map */}
        <div className="footer-map-column">
          <h4>Our Sanctuary</h4>
          <div className="footer-map-container">
            <iframe 
              src="https://maps.google.com/maps?q=Geeta%20University,%20Panipat&z=15&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Geeta University Map"
            />
          </div>
          <a 
            href="https://www.google.com/maps/place/GEETA+UNIVERSITY,+NAULTHA,+PANIPAT/@29.305211,76.893071,19675m/data=!3m1!1e3!4m6!3m5!1s0x390dc3b5533b6d9f:0x1b563db61bcc0195!8m2!3d29.3052114!4d76.8930706!16s%2Fg%2F11pv2_3shm?hl=en&entry=ttu&g_ep=EgoyMDI2MDYxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-map-address"
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg 
              className="location-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="address-text">
              <span className="address-primary">Geeta University, Panipat</span>
            </span>
          </a>
        </div>

      </div>



      <div className="footer-divider" />

      {/* Footer Bottom copyright block */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          Made with ❤️ by Nexhack Team
        </p>
      </div>
    </footer>
  );
}
