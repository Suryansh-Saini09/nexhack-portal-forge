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
  'https://unstop.com/hackathons/nexhack-20-geeta-university-naultha-panipat-1733198';

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
    { id: 'sponsors', label: 'SPONSOR' },
    { id: 'team',     label: 'TEAM' },
    { id: 'faq',      label: 'FAQ' },
    { id: 'contact',  label: 'CONTACT' },
  ];

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Inner content row */}
      <div className="site-header-inner">

        {/* LEFT: NexHack Logo & Brand Title */}
        <div className="navbar-logo-left" onClick={() => handleLinkClick('home')}>
          <img
            src="/images/home/logo_nexhack__final.png"
            alt="NexHack 2.0 Logo"
            className="nav-logo-img nexhack-nav-logo"
            onError={(e) => {
              const target = e.currentTarget as HTMLImageElement;
              if (target.src.endsWith('/images/home/logo_nexhack__final.png')) {
                target.src = './images/home/logo_nexhack__final.png';
              }
            }}
          />
          <div className="navbar-brand-text">
            <span className="brand-main">NEXHACK</span>
            <sup className="brand-sub">2.0</sup>
          </div>
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

        {/* RIGHT: Logos */}
        <div className="navbar-logo-right" onClick={() => handleLinkClick('home')}>
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
        </div>
      )}
    </header>
  );
}
