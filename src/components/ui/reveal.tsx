"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
};

/**
 * Fades its children up as they scroll into view. Rendered visible on the server and only
 * hidden once this has mounted, so a crawler or a reader without JavaScript sees everything.
 */
export function Reveal({ children, as: Tag = "div", delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const box = node.getBoundingClientRect();
    if (box.top < window.innerHeight * 0.92) return; // Already on screen: never hide it.

    node.classList.add("reveal");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={className} style={{ "--delay": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
