import styles from './style.module.scss';
import { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Magnetic from '../Magnetic/index';
import Line from '../Line';
import Link from 'next/link';

const Contact = () => {
    const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end end"]
    })

    const x = useTransform(scrollYProgress, [0, 1], [0, 100])
    const y = useTransform(scrollYProgress, [0, 1], [-500, 0])
    const rotate = useTransform(scrollYProgress, [0, 1], [120, 90])

  return (
        <motion.div style={{y}} ref={container} className={styles.contact}>
            <div className={styles.body}>
                <div className={styles.title}>
                    <span>
                    <h2>Let&apos;s Have</h2>
                    </span>
                    <h2>a Chat</h2>
                    <div className={styles.line}><Line scolor={"#fff"} sright={100} w={.8}/></div>
                    <motion.div style={{x}} className={styles.buttonContainer}>
                        <Link href={"/contact"}><Magnetic>
                            <div className={styles.button}>
                                <p>Get in touch </p>
                            </div>
                        </Magnetic></Link>
                    </motion.div>

                    <motion.svg style={{rotate, scale: 2}} width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
                    </motion.svg>
                </div> 
                <div className={styles.nav}>
                    <Magnetic><div className={styles.button}>
                          <a href='mailto:mahesh.paul.j@gmail.com'><p>mahesh.paul.j@gmail.com</p></a>
                        </div>
                    </Magnetic>
                    <Magnetic><div className={styles.button}>
                           <a href='tel:+919025698209'><p>+91 9025698209</p></a>
                        </div>
                    </Magnetic>
                </div>
                <div className={styles.info}>
                    <div className={styles.v}>
                        <span>
                            <h3>Version</h3>
                            <p>2024 © Edition</p>
                        </span>
                    </div>
                    <div className={styles.s}>
                        <span>
                            <h3>socials</h3>
                        
                        <Magnetic>
                            <a href='https://github.com/maheshpaulj/' target='_blank'>Github</a>
                        </Magnetic>
                        </span>
                        <Magnetic>
                            <a href='https://instagram.com/mahesh_paul_j' target='_blank'>Instagram</a>
                        </Magnetic>
                        <Magnetic>
                            <a href='https://discordapp.com/users/509270434303311872' target='_blank'>Discord</a>
                        </Magnetic>
                        <Magnetic>
                            <a href='https://linkedin.com/in/mahesh-paul' target='_blank'>Linkedin</a>
                        </Magnetic>
                    </div>
                </div>
            </div>
        </motion.div>
  )
}

export default Contact