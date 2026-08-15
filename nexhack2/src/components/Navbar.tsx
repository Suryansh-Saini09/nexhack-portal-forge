import React, { useState, useEffect } from 'react';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

interface NavItem {
  id: string;
  label: string;
}

const UNSTOP_REGISTER_URL =
  'https://unstop.com/o/8VHBSm6?lb=useLPsiy&utm_medium=Share&utm_source=nexhac99316&utm_campaign=Online_coding_challenge';

export default function Navbar({ activeSection, onNavClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (sectionId: string) => {
    if (onNavClick) {
      onNavClick(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const navItems: NavItem[] = [
    { id: 'about',    label: 'ABOUT' },
    { id: 'themes',   label: 'THEMES' },
    { id: 'prizes',   label: 'PRIZES' },
    { id: 'schedule', label: 'SCHEDULE' },
    { id: 'sponsors', label: 'SPONSORS' },
    { id: 'team',     label: 'TEAM' },
    { id: 'faq',      label: 'FAQ' },
    { id: 'contact',  label: 'CONTACT' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Inner content row */}
      <div className="site-header-inner">

        {/* LEFT: Logos */}
        <div className="navbar-logo-left" onClick={() => handleLinkClick('home')}>
          <img
            src="/images/home/gu_logo.png"
            alt="Geeta University Logo"
            className="nav-logo-img"
          />
          <div className="nav-logo-divider" />
          <img
            src="/images/home/gth.png"
            alt="GTH Logo"
            className="nav-logo-img"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/sponsors/GTH.png';
            }}
          />
        </div>

        {/* CENTER: Desktop Navigation Links */}
        <nav className="nav-links-container">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* RIGHT: REGISTER CTA Link to Unstop */}
        <div className="nav-register-wrapper">
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-register-btn"
            style={{ textDecoration: 'none' }}
          >
            REGISTER
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="navbar-toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Gold bottom glow line */}
      <div className="navbar-bottom-glow" />

      {/* Mobile Dropdown Menu Panel */}
      {isOpen && (
        <div className="navbar-mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleLinkClick(item.id)}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          <a
            href={UNSTOP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-register-btn mobile-register"
            style={{ textDecoration: 'none' }}
            onClick={() => setIsOpen(false)}
          >
            REGISTER
          </a>
        </div>
      )}
    </header>
  );
}
