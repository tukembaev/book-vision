import { useEffect, useMemo, useState } from 'react';

export function useScrollSpy(ids: string[], options?: { rootMargin?: string }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const observedIds = useMemo(() => ids.filter(Boolean), [ids]);

  useEffect(() => {
    if (observedIds.length === 0) return;

    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top ?? 0) - (b.boundingClientRect.top ?? 0));

        const topMost = visible[0];
        if (topMost?.target && topMost.target instanceof HTMLElement) {
          setActiveId(topMost.target.id);
        }
      },
      {
        root: null,
        threshold: [0.1, 0.25, 0.5, 0.75],
        rootMargin: options?.rootMargin ?? '0px 0px -70% 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [observedIds, options?.rootMargin]);

  return activeId;
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9а-яё\s-]/gi, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
