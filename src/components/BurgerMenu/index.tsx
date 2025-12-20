'use client';
import styles from './style.module.scss';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Nav from '../Nav';
import Magnetic from '../Magnetic';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { usePathname } from 'next/navigation';

const Rounded: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Magnetic>
      <div className={styles.button}>
        {children}
      </div>
    </Magnetic>
  );
};

export default function BurgerMenu() {
  const [isActive, setIsActive] = useState(false);
  const button = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isActive) setIsActive(false); 
  }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  
    gsap.to(button.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: 200,
        onLeave: () => {
          gsap.to(button.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(button.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
          setIsActive(false); // Call setIsActive separately
        },
      },
    });
  }, []);
  

  return (
    <>
      <motion.div 
        variants={{
            initial: { opacity: 0, x: "100%" },
            enter: { opacity: 1, x: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
            exit: { opacity: 0, x: "100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
        }}
        initial="initial"
        animate={isActive ? "enter" : "exit"}
        className={`${styles.pageShadow} ${isActive ? styles.active : ''}`}
        onClick={() => setIsActive(false)}
      />
      <div
        onClick={() => setIsActive(!isActive)}
        className={styles.burgerContainer}
        ref={button}
      >
        <Rounded>
          <div
            className={`${styles.burger} ${isActive ? styles.burgerActive : ''}`}
          ></div>
        </Rounded>
      </div>
      <AnimatePresence mode="wait">
        {isActive && <Nav close={() => setIsActive(false)} />}
      </AnimatePresence>
    </>
  );
}
