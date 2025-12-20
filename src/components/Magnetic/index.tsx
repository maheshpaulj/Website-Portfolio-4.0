"use client";
import React, { useEffect, useRef, ReactElement } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactElement;
  parallax?: boolean;
}

const Magnetic: React.FC<MagneticProps> = ({ children, parallax = false }) => {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isMobileOrTablet = window.innerWidth <= 768;

      if (!isMobileOrTablet && magnetic.current) {
        const element = magnetic.current;
        const xTo = gsap.quickTo(element, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(element, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        let childrenXTo: gsap.QuickToFunc[] = [];
        let childrenYTo: gsap.QuickToFunc[] = [];

        if (parallax) {
            const children = element.querySelectorAll('span, div, p');
            children.forEach((child) => {
                childrenXTo.push(gsap.quickTo(child, "x", { duration: 1, ease: "elastic.out(1, 0.3)" }));
                childrenYTo.push(gsap.quickTo(child, "y", { duration: 1, ease: "elastic.out(1, 0.3)" }));
            });
        }

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { height, width, left, top } = element.getBoundingClientRect();
          const x = clientX - (left + width / 2);
          const y = clientY - (top + height / 2);
          xTo(x * 0.35);
          yTo(y * 0.35);

          if (parallax) {
             childrenXTo.forEach(func => func(x * 0.15));
             childrenYTo.forEach(func => func(y * 0.15));
          }
        };

        const handleMouseLeave = () => {
          xTo(0);
          yTo(0);
          if (parallax) {
            childrenXTo.forEach(func => func(0));
            childrenYTo.forEach(func => func(0));
          }
        };

        element.addEventListener("mousemove", handleMouseMove);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }
  }, [parallax]);

  return React.cloneElement(children, { ref: magnetic });
};

export default Magnetic;
