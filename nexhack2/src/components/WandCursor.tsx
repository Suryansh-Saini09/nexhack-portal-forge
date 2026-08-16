import React, { useEffect, useRef } from 'react';

export default function WandCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.opacity = '1';
    };

    const onMouseLeaveWindow = () => { cursor.style.opacity = '0'; };
    const onMouseEnterWindow = () => { cursor.style.opacity = '1'; };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    let animationFrameId: number;
    const updateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      cursorX += dx * 0.35;
      cursorY += dy * 0.35;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    const onMouseEnter = () => cursor.classList.add('hovering');
    const onMouseLeave = () => cursor.classList.remove('hovering');

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll<Element>(
        'a, button, select, input, .card, .floating-img, .logo, .character-name, .team-social-icon, .faq-item, .faq-search-input, .footer-logo, .footer-nav-grid button, .footer-social-icon'
      );
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
      const hoverables = document.querySelectorAll<Element>(
        'a, button, select, input, .card, .floating-img, .logo, .character-name, .team-social-icon, .faq-item, .faq-search-input, .footer-logo, .footer-nav-grid button, .footer-social-icon'
      );
      hoverables.forEach(elem => {
        elem.removeEventListener('mouseenter', onMouseEnter);
        elem.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return <div ref={cursorRef} id="wand-cursor" />;
}
