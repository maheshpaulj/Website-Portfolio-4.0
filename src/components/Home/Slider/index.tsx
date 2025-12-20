import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScroll, useTransform, motion, useSpring, useMotionValue } from "framer-motion";
import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";
import { Raleway } from "@next/font/google";

const raleway = Raleway({
  subsets: ['latin'],
})

const slider1 = [
  { color: "#B5D3DA", src: "/assets/academiaHub.png" },
  { color: "#455974", src: "/assets/weather.png" },
  { color: "#D2D5DA", src: "/assets/portfolio 2.0.png" },
  { color: "#1E1E1E", src: "/assets/viewtubee.png" },
];

const slider2 = [
  { color: "#333333", src: "/assets/snake game.png" },
  { color: "#0D1C46", src: "/assets/portfolio 1.0.png" },
  { color: "#eee", src: "/assets/resumeitnow.png" },
  { color: "#222222", src: "/assets/mockups/canvas.png" },
];



const Slider: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const [active, setActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
        if (!active || !container.current) return;
        
        // Check if the cursor is still over the slider container
        const elements = document.elementsFromPoint(lastMousePos.current.x, lastMousePos.current.y);
        const isOverSlider = elements.some(el => el === container.current || container.current?.contains(el));
        
        if (!isOverSlider) {
            setActive(false);
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [active]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    lastMousePos.current = { x: clientX, y: clientY };
    cursorX.set(clientX - 60);
    cursorY.set(clientY - 60);
  };


  return (
    <div 
        ref={container} 
        className={styles.slidingImages}
        onMouseMove={handleMouseMove}
        onMouseEnter={(e) => {
            handleMouseMove(e);
            setActive(true);
        }}
        onMouseLeave={() => setActive(false)}
    >
         {mounted && createPortal(
            <motion.div 
                className={`${styles.followButton} ${raleway.className}`}
                style={{ x, y }}
                animate={{ 
                    scale: active ? 1 : 0, 
                    opacity: active ? 1 : 0 
                }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
                onClick={() => router.push('/projects')}
                onMouseMove={handleMouseMove}
            >
                <span>View More</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 17L17 7" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 7H17V17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </motion.div>,
            document.body
        )}
        
        <motion.div  
            style={{x: x1}} 
            className={styles.slider}
        >
            {slider1.map((project, index) => (
                <div 
                    className={styles.project} 
                    style={{backgroundColor: project.color}} 
                    key={index}
                >
                    <div className={styles.imageContainer}>
                        <Image 
                            fill={true}
                            alt={"image"}
                            src={`${project.src}`}
                            loading='eager'
                            draggable={false}
                        />
                    </div>
                </div>
            ))}
        </motion.div>
        <motion.div 
            style={{x: x2}} 
            className={styles.slider}
        >
            {slider2.map((project, index) => (
                <div 
                    className={styles.project} 
                    style={{backgroundColor: project.color}} 
                    key={index}
                >
                    <div className={styles.imageContainer}>
                        <Image 
                            fill={true}
                            alt={"image"}
                            src={`${project.src}`}
                            loading='eager'
                            draggable={false}
                        />
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
  );
};

export default Slider;