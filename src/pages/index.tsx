import Head from "next/head";
import styles from "@/styles/Home.module.scss";
import Curve from "@/components/Curve";
import Landing from "@/components/Home/Landing";
import Description from "@/components/Home/Description";
import Slider from "@/components/Home/Slider";
import Contact from "@/components/Contact";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { slide } from "@/components/anim/anim";

import Router from 'next/router';

export const fixTimeoutTransition = (timeout: number): void => {
  Router.events.on('beforeHistoryChange', () => {
    // Query all relevant <style> and <link> elements
    const nodes: NodeListOf<HTMLLinkElement | HTMLStyleElement> = document.querySelectorAll('link[rel=stylesheet], style:not([media=x])');
    
    // Clone the nodes and cast them as an array of HTMLElements
    const copies: HTMLElement[] = Array.from(nodes).map((el) => el.cloneNode(true) as HTMLElement);

    // Modify the cloned nodes and append them to the document head
    copies.forEach((copy) => {
      copy.removeAttribute('data-n-p');
      copy.removeAttribute('data-n-href');
      document.head.appendChild(copy);
    });

    const handler = () => {
      Router.events.off('routeChangeComplete', handler);

      window.setTimeout(() => {
        // Remove the cloned nodes after the transition
        copies.forEach((copy) => {
          document.head.removeChild(copy);
        });
      }, timeout);
    };

    Router.events.on('routeChangeComplete', handler);
  });
};

// Usage
fixTimeoutTransition(1500);


export default function Home() {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <>
      <Head>
        <meta name="description" content="Mahesh Paul's Website Portfolio, Home Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        {/* <meta name="google-site-verification" content="IVOjL--iVz33j73JnMvQT2vZsRoEje6C9GQGxF8BlxQ" /> */}
      </Head>
      <Curve>
        <motion.main
          className={styles.main}
          ref={container}
          initial="initial"
          animate="open"
          exit="closed"
          variants={slide}
        >
          <Landing />
          <Description />
          <Slider />
          <motion.div style={{ height }} className={styles.circleContainer}>
            <div className={styles.circle}></div>
          </motion.div>
          <Contact />
        </motion.main>
      </Curve>
    </>
  );
}
