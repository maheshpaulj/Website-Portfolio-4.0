import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react'
import styles from './style.module.scss'
import { slideUp } from '@/components/anim/anim';
import Magnetic from '@/components/Magnetic';
import Link from 'next/link';
import Line from '@/components/Line';

export default function Description() {
  const phraseA = "CSE student at SRM University, Kattankulathur with a passion for technology. Possesses strong foundational skills in Python, C, and web development gained through coursework and personal projects. ";
  const phraseW = "I dive into web development, Python, Java, C and Database projects with enthusiasm, driven by my own curiosity and passion for technology. My goal is to continuously learn and innovate, creating impactful solutions through my projects.";
  
  const descriptionA = useRef(null);
  const descriptionW = useRef(null);

  const isAInView = useInView(descriptionA);
  const isWInView = useInView(descriptionW);

  return (
    <div className={styles.description} >
        <div className={styles.content}>
          <div ref={descriptionA} className={styles.contentAbout}>
            <p>
            {
              phraseA.split(" ").map( (word, index) => {
                  return <span className={styles.mask} key={index}><motion.span variants={slideUp} custom={index} animate={isAInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
              })
            }
            </p>
            <div data-scroll data-scroll-speed={0.1}>
              
              <Link href={"/about"}><Magnetic parallax={true}><div className={styles.button}><span>About Me</span></div></Magnetic></Link>
            </div>
          </div>
          <Line scolor={`#000`} w={.85} sright={0}/>
          <div ref={descriptionW} className={styles.contentWorks}>
            <div className={styles.wTitle}>
              My <br/>Projects
            </div>
                      <p>{
              phraseW.split(" ").map( (word, index) => {
                  return <span className={styles.mask} key={index}><motion.span variants={slideUp} custom={index} animate={isWInView ? "open" : "closed"} key={index}>{word}</motion.span></span>
              })
            }</p>
          </div>
          <div data-scroll data-scroll-speed={0.1} className={styles.wButton}>
              <Link href={"/projects"}><Magnetic><div className={styles.wbutton}>My Works</div></Magnetic> </Link>             
          </div>  
        </div>
    </div>
  )
}