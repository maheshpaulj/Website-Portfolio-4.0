import "@/styles/globals.css";
import '@/styles/styles.scss';
import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { Raleway } from "@next/font/google";
import Router from "next/router";
import { useEffect } from "react";
import Lenis from "lenis";

import Navbar from "@/components/Navbar";
import BurgerMenu from "@/components/BurgerMenu";
import { Metadata } from "next";

const raleway = Raleway({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mahesh Paul | Portfolio',
  description: 'Welcome to Mahesh Paul\'s developer portfolio – built with Next.js, Framer Motion & GSAP.',
  openGraph: {
    title: 'Mahesh Paul | Portfolio',
    description: 'Frontend Developer Portfolio – Explore my work, skills and creative web experiences.',
    url: 'https://maheshpaul.is-a.dev',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'Mahesh Paul Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahesh Paul | Portfolio',
    description: 'Frontend Developer Portfolio – Explore my work, skills and creative web experiences.',
    images: ['/preview.png'],
  },
  other: {
    'google-site-verification': 'k6GVSzNeUo-dwkno13jeI37Y7mqht6lYJP8kOYAnJ4w',
  },
};


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
    <main className={raleway.className}>
      <Navbar />
      <BurgerMenu />
      <AnimatePresence mode="wait">
        <Component key={router.route} {...pageProps} />
      </AnimatePresence>
    </main>
  );
}
