import "@/styles/globals.css";
import '@/styles/styles.scss';
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";
import Router from "next/router";
import { useEffect } from "react";
import Lenis from "lenis";
import Head from "next/head";

import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";

const raleway = Raleway({
  subsets: ['latin'],
})

export default function App({ Component, pageProps, router }: AppProps) {
  const routeChange = () => {
    const tempFix = () => {
      const allStyleElems = document.querySelectorAll('style[media="x"]');
      allStyleElems.forEach((elem) => {
        elem.removeAttribute("media");
      });
    };
    tempFix();
  };

  useEffect(() => {
    const lenis = new Lenis()
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  Router.events.on("routeChangeComplete", routeChange );
  Router.events.on("routeChangeStart", routeChange );
 
  return (
    <>
      <Head>
        <title>Mahesh Paul | Portfolio</title>
        <meta
          name="description"
          content="Welcome to Mahesh Paul's developer portfolio – built with Next.js, Framer Motion & GSAP."
        />
        {/* OpenGraph Tags */}
        <meta property="og:title" content="Mahesh Paul | Portfolio" />
        <meta
          property="og:description"
          content="Frontend Developer Portfolio – Explore my work, skills and creative web experiences."
        />
        <meta property="og:url" content="https://maheshpaul.is-a.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/preview.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Mahesh Paul Portfolio Preview" />
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mahesh Paul | Portfolio" />
        <meta
          name="twitter:description"
          content="Frontend Developer Portfolio – Explore my work, skills and creative web experiences."
        />
        <meta name="twitter:image" content="/preview.png" />
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="k6GVSzNeUo-dwkno13jeI37Y7mqht6lYJP8kOYAnJ4w"
        />
      </Head>
      <main className={raleway.className}>
        <Navbar />
        <BurgerMenu />
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
      </main>
    </>
  );
}