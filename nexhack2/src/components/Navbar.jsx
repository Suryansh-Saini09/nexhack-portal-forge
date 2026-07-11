import React, { useState } from 'react';

export default function Navbar({ activeSection, onNavClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (section) => {
    onNavClick(section);
    setIsOpen(false);
  };

  return (
    <header>
      <div className={`navbar-capsule ${isOpen ? 'mobile-open' : ''}`}>
        {/* Mobile Header Row */}
        <div className="navbar-mobile-header">
          {/* Left Logo (Geeta University) */}
          <div className="navbar-logo-left" onClick={() => handleLinkClick('home')}>
            <img src="./images/home/gu_logo.png" alt="Geeta University" className="nav-logo-img" />
          </div>




          <button
            className="navbar-toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`nav-links-container ${isOpen ? 'show' : ''}`}>
          <button
            className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}
            onClick={() => handleLinkClick('about')}
          >
            About
          </button>
          <button
            className={`nav-link ${activeSection === 'themes' ? 'active' : ''}`}
            onClick={() => handleLinkClick('themes')}
          >
            Themes
          </button>
          <button
            className={`nav-link ${activeSection === 'prizes' ? 'active' : ''}`}
            onClick={() => handleLinkClick('prizes')}
          >
            Prizes
          </button>
          <button
            className={`nav-link ${activeSection === 'schedule' ? 'active' : ''}`}
            onClick={() => handleLinkClick('schedule')}
          >
            Schedule
          </button>
          <button
            className={`nav-link ${activeSection === 'sponsors' ? 'active' : ''}`}
            onClick={() => handleLinkClick('sponsors')}
          >
            Sponsors
          </button>
          <button
            className={`nav-link ${activeSection === 'team' ? 'active' : ''}`}
            onClick={() => handleLinkClick('team')}
          >
            Team
          </button>
          <button
            className={`nav-link ${activeSection === 'faq' ? 'active' : ''}`}
            onClick={() => handleLinkClick('faq')}
          >
            FAQ
          </button>
          <button
            className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => handleLinkClick('contact')}
          >
            Contact
          </button>
        </nav>

        {/* Right Logo (Geeta Technical Hub) */}
        <div className="navbar-logo-right">
          <img src="./images/home/gth.png" alt="Geeta Technical Hub" className="nav-logo-img" />
        </div>
      </div>
    </header>
  );
}
