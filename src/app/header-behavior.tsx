'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

export default function HeaderBehavior({ children, lang }: { children: ReactNode; lang: 'tr' | 'en' }) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let previousY = Math.max(0, window.scrollY);
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.max(0, Math.min(window.scrollY, document.documentElement.scrollHeight - window.innerHeight));
      if (open || y < 72) {
        setHidden(false);
        previousY = y;
      } else if (Math.abs(y - previousY) >= 8) {
        setHidden(y > previousY);
        previousY = y;
      }
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); window.cancelAnimationFrame(frame); };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
    const onResize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener('change', onResize);
    const onOutsideClick = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener('pointerdown', onOutsideClick);
    return () => { desktop.removeEventListener('change', onResize); document.removeEventListener('pointerdown', onOutsideClick); };
  }, []);

  return <header ref={header} id="top" className={`header${hidden && !open ? ' header-hidden' : ''}${open ? ' menu-open' : ''}`}
    onFocusCapture={() => setHidden(false)}
    onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onClick={event => { if (event.target instanceof Element && event.target.closest('a')) setOpen(false); }}
    onKeyDown={event => { if (event.key === 'Escape' && open) { setOpen(false); toggle.current?.focus(); } }}>
    {children}
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation"
      aria-label={lang === 'tr' ? (open ? 'Menüyü kapat' : 'Menüyü aç') : (open ? 'Close menu' : 'Open menu')}
      onClick={() => { setOpen(value => !value); setHidden(false); }}>
      <span/><span/><span/>
    </button>
  </header>;
}
