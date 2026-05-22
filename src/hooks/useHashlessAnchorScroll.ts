import { useEffect } from 'react';

export function useHashlessAnchorScroll() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const href = link?.getAttribute('href');

      if (!link || link.target || !href || href === '#') {
        return;
      }

      const target = document.getElementById(decodeURIComponent(href.slice(1)));

      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    }

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
