import React, { useEffect, useRef } from 'react';

export default function WandCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    };

    const onMouseLeaveWindow = () => {
      cursor.style.opacity = '0';
    };

    const onMouseEnterWindow = () => {
      cursor.style.opacity = '1';
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    // Dynamic Sparkle generation helper
    const createSparkle = (x, y) => {
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';

      const colors = ['#ffe066', '#ffd700', '#00bfff', '#00f7ff', '#ffffff'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      const size = Math.random() * 5 + 3;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = color;
      particle.style.boxShadow = `0 0 8px ${color}`;

      const xDir = (Math.random() - 0.5) * 80;
      const yDir = (Math.random() - 0.5) * 80 + 30; // Tendency to fall down slightly
      particle.style.setProperty('--x-dir', `${xDir}px`);
      particle.style.setProperty('--y-dir', `${yDir}px`);

      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;

      document.body.appendChild(particle);

      setTimeout(() => {
        particle.remove();
      }, 600);
    };

    // Tracking loop
    let animationFrameId;
    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.35;
      cursorY += dy * 0.35;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      const speed = Math.sqrt(dx * dx + dy * dy);
      if (speed > 1.5 && Math.random() < 0.4) {
        createSparkle(cursorX, cursorY);
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    // Hover state managers
    const onMouseEnter = () => cursor.classList.add('hovering');
    const onMouseLeave = () => cursor.classList.remove('hovering');

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, select, input, .card, .floating-img, .logo, .character-name, .team-social-icon, .faq-item, .faq-search-input, .footer-logo, .footer-nav-grid button, .footer-social-icon');
      hoverables.forEach(elem => {
        elem.removeEventListener('mouseenter', onMouseEnter);
        elem.removeEventListener('mouseleave', onMouseLeave);
        elem.addEventListener('mouseenter', onMouseEnter);
        elem.addEventListener('mouseleave', onMouseLeave);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      const hoverables = document.querySelectorAll('a, button, select, input, .card, .floating-img, .logo, .character-name, .team-social-icon, .faq-item, .faq-search-input, .footer-logo, .footer-nav-grid button, .footer-social-icon');
      hoverables.forEach(elem => {
        elem.removeEventListener('mouseenter', onMouseEnter);
        elem.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} id="wand-cursor" />;
}
