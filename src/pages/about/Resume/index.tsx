'use client';
import React, { useRef } from 'react'
import { useScroll, motion, useTransform, useInView } from 'framer-motion'

import { slide, slideUp } from '@/components/anim/anim';
import styles from './style.module.scss'
import Line from '@/components/Line'
import Magnetic from '@/components/Magnetic'

const sData = [
  ["Python", "C", "C++", "Java"],
  ["HTML", "CSS/SCSS", "JavaScript", "TypeScript"],
  ["ReactJS", "NodeJS", "NextJS", "TailwindCSS"],
  ["MySQL", "Oracle SQL", "Firebase"],
  ["Git", "Vercel", "Netlify", "MATLAB"]
];

const cData = [
  ["Python for Data Science", "Programming in Java", "Introduction to Database System", "Introduction to Machine Learning", "AWS Certified Machine Learning", "Digital Image Processing", "Computer Vision Essentials", "Image Processing Onramp", "MATLAB Onramp"],
  ["NPTEL", "NPTEL", "NPTEL", "NPTEL", "Amazon Web Services", "Great Learning", "Great Learning", "MathWorks", "MathWorks"],
  ["2023", "2023", "2024", "2024","2024", "2024", "2024", "2024", "2024"]
]
;

const Resume = () => {

  const container = useRef(null);
  const sRef = useRef(null);
  const cRef = useRef(null);

  const isSInView = useInView(sRef);
  const isCInView = useInView(cRef);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div ref={container} className={styles.resume}>
      <div className={styles.resumeContainer}>
        <div className={styles.title}>The Resume</div>
        <Line scolor={"#000"} w={.8} sright={0}/>
          <div className={styles.resumeText}>
            <p>Tech Enthusiast CS <span>student</span> at SRM University, Kattankulathur with a passion for technology. Possesses strong foundational skills in
            <span> Python, Java, C, C++,  Web Development(HTML, JS, CSS, ReactJS, NodeJS, NextJS)</span> and <span>AI/ML</span> gained through coursework and personal projects.</p>
            <div className="" data-scroll data-scroll-speed={0.05}>
            <a href='/assets/resume.pdf' target='_blank'>
            <Magnetic parallax={true}>
              <div className={styles.button}><span>Resume</span></div>
            </Magnetic>
            </a>
          </div>
          </div>
          <div className={styles.skillText} ref={sRef}>
            <p className={styles.subTitle}>01 Skills</p>
            <Line scolor={"#000"} w={.8} sright={0}/>
            <div className={styles.columnContainer}>
              {sData.map((column, columnIndex) => (
                <div key={columnIndex} className={styles.column}>
                  <p>
                  {column.map((item, itemIndex) => (
                    <span className={styles.mask} key={itemIndex}>
                      <motion.span
                        variants={slideUp}
                        animate={isSInView ? 'open' : 'closed'}
                        custom={itemIndex+5}
                      >
                        {item}
                      </motion.span>
                    </span>
                  ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.skillText} ref={cRef}>
            <p className={styles.subTitle}>02 Certifications</p>
            <Line scolor={"#000"} w={.8} sright={0}/>
            <div className={styles.columnContainer}>
              {cData.map((column, columnIndex) => (
                <div key={columnIndex} className={styles.column}>
                  <p>
                  {column.map((item, itemIndex) => (
                    <span className={styles.mask} key={itemIndex}>
                      <motion.span
                        variants={slideUp}
                        animate={isCInView ? 'open' : 'closed'}
                        custom={itemIndex + 10}
                      >
                        {item}
                      </motion.span>
                    </span>
                  ))}
                  </p>
                </div>
              ))}
            </div>
            <p className={styles.proofText}>proofs in my <a href='https://www.linkedin.com/in/mahesh-paul/details/certifications/' target='_blank'>LinkedIn <svg width="12" height="12" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 24.5L24.5 1M24.5 1V24.5M24.5 1H1" stroke="black" stroke-width="2"/></svg></a></p>
          </div>
      </div>
      <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </div>
  )
}

export default Resume