import React, { useEffect, useRef } from 'react';

export default function WandCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isVisible = false;

    // Direct, instant 0-lag position updates
    const updatePosition = (x: number, y: number) => {
      cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        cursor.style.opacity = '1';
      }
      updatePosition(e.clientX, e.clientY);
    };

    const onMouseDown = () => {
      cursor.classList.add('casting');
    };

    const onMouseUp = () => {
      cursor.classList.remove('casting');
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if target is interactive / clickable
      const isInteractive = target.closest(
        'a, button, select, input, textarea, [role="button"], [onclick], .card, .card-wrapper, .floating-img, .logo, .character-name, .team-social-icon, .faq-item, .faq-search-input, .footer-logo, .footer-nav-grid button, .footer-social-icon, .sponsor-card, .prize-card, .interactive'
      );

      if (isInteractive) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    };

    const onMouseLeaveWindow = () => {
      isVisible = false;
      cursor.style.opacity = '0';
    };

    const onMouseEnterWindow = () => {
      isVisible = true;
      cursor.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseleave', onMouseLeaveWindow);
    document.addEventListener('mouseenter', onMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
    };
  }, []);

  return (
    <div ref={cursorRef} id="wand-cursor">
      <img
        src="/images/home/cursor_wand.png?v=3"
        alt=""
        className="wand-cursor-img"
        draggable={false}
      />
    </div>
  );
}
