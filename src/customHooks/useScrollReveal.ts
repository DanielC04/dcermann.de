import { useEffect, useRef } from 'react';

export function useScrollReveal<T extends HTMLElement = HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}

export function useStaggerReveal<T extends HTMLElement = HTMLElement>(
    childSelector: string,
    staggerMs = 120,
    threshold = 0.1
) {
    const ref = useRef<T>(null);

    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    const children = container.querySelectorAll<HTMLElement>(childSelector);
                    children.forEach((child, i) => {
                        setTimeout(() => child.classList.add('is-visible'), i * staggerMs);
                    });
                    observer.unobserve(container);
                }
            },
            { threshold }
        );

        observer.observe(container);
        return () => observer.disconnect();
    }, [childSelector, staggerMs, threshold]);

    return ref;
}
