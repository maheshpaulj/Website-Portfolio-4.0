import React, { useRef } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import { blob } from 'stream/consumers'
import Magnetic from '@/components/Magnetic'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Project() {
  const projects = [
    {
      Title: "NoteScape",
      Desc: "NoteScape is a powerful note-taking app featuring bulletins, to-dos, image uploads, and an AI assistant. Built with Next.js 14, Firebase, Vercel Blob, and Novel.sh, it offers seamless sync across devices and a rich editing experience.",
      Mockup: '/assets/NoteScape.png',
      Lang: "next ts sass firebase",
      Blog: "https://medium.com/@mahesh.paul.j/notescape-building-the-ultimate-note-taking-app-with-ai-and-seamless-sync-6fc92f0e6249",
      Github: "https://github.com/CityIsBetter/NoteScape",
      Site: "https://notescape.vercel.app/",
    },
    {
      Title: "AcademiaHUB",
      Desc: "AcademiaHUB: Bunk management, Reminders, and CGPA calculator. Your all-in-one website, seamlessly connected to your Google account for on-the-go accessibility.",
      Mockup: '/assets/academiaHub.png',
      Lang: "react js css firebase",
      Blog: "https://medium.com/@mahesh.paul.j/creating-academiahub-a-comprehensive-student-companion-81d9c2186299",
      Github: "https://github.com/CityIsBetter/AcademiaHUB",
      Site: "https://academiahub.netlify.app/",
    },
    {
      Title: "Manga Scraper",
      Desc: "Manga Scraping Tool made in python, It fetches the manga page from the website and downloads it in JPG format and saves it locally. This is basically web Scraping",
      Mockup: '/assets/mangaScrapper.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/CityIsBetter/Manga-Scraper",
      Site: "",
    },
    {
      Title: "Old Portfolio",
      Desc: "This is my old website portfolio made using reactJS and Sanity and hosted in Netlify!",
      Mockup: '/assets/portfolio 2.0.png',
      Lang: "react js sass",
      Blog: "",
      Github: "https://github.com/CityIsBetter/Portfolio",
      Site: "https://maheshpaul.netlify.app/",
    },
    {
      Title: "Weather App",
      Desc: "This Weather App is made in Java using Java swing component with Modern UI design and Openweathermap API for the data.",
      Mockup: '/assets/weather_app.gif',
      Lang: "java",
      Blog: "",
      Github: "https://github.com/CityIsBetter/weather-app-java",
      Site: "",
    },
    {
      Title: "PathFinding Algorithms Visualized",
      Desc: "PathFinding Algorithms Visualized project consists of 2 pathfinding algorithm, implemented in python using tkinter for visualization Dijkstra algorithm and Breadth first search (BFS)",
      Mockup: '/assets/Dijkstra.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/CityIsBetter/Pathfinding-Algorithms",
      Site: "",
    },
    {
      Title: "Tetris",
      Desc: "This project is a recreation of the game Tetris in Python using Pygame library!",
      Mockup: '/assets/tetris.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/CityIsBetter/Tetris-pygame",
      Site: "",
    },
    {
      Title: "Canvas",
      Desc: "This is Canvas made using pure HTML, CSS, Javascript. This is similar to Paint but in website!",
      Mockup: '/assets/canvas.gif',
      Lang: "html js css",
      Blog: "",
      Github: "https://github.com/CityIsBetter/canvas",
      Site: "",
    },
    {
      Title: "ViewTubee",
      Desc: "This project is a YouTube Clone - ViewTubee Made using Youtube's own API.",
      Mockup: '/assets/viewtubee.png',
      Lang: "react js css",
      Blog: "",
      Github: "https://github.com/CityIsBetter/ViewTube",
      Site: "https://viewtubee.netlify.app/",
    },
    {
      Title: "Weather App",
      Desc: "This project is a weather app made using html, css, javascript. This is dependent on openweathermap API",
      Mockup: '/assets/weather.png',
      Lang: "html js css",
      Blog: "",
      Github: "https://github.com/CityIsBetter/weather-app",
      Site: "https://cityisbetter.github.io/weather-app/",
    },
  ]

  const container = useRef(null);

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    const height = useTransform(scrollYProgress, [0, 0.9], [50, 10]);

  return (
    <main ref={container} className={styles.main}>
      <div className={styles.projectContainer}>
        {
          projects.map((project, index) => {
            return <div className={styles.project} key={index}>
                      <div className={styles.mockupContainer}><Image src={project.Mockup} alt='project mockup' className={styles.projectImg} width={1280} height={720}/></div>
                      <div className={styles.content}>
                        <div className="">
                          <p className={styles.title}>{project.Title}</p>
                          <p className={styles.desc}>{project.Desc}</p>
                        </div>
                        <div className={styles.lang}>
                          {
                            project.Lang.split(" ").map((lang, index) => {
                              return <Magnetic key={index}>
                                <Image src={`/assets/${lang}.png`} alt='language logo' width={48} height={48}/>
                              </Magnetic>
                            })
                          }
                        </div>
                        <div className={styles.links}>
                          {project.Blog && <Magnetic><a href={project.Blog} target='_blank'>Blog</a></Magnetic>}
                          {project.Github && <Magnetic><a href={project.Github} target='_blank'>Github</a></Magnetic>}
                          {project.Site && <Magnetic><a href={project.Site} target='_blank'>Site</a></Magnetic>}
                        </div>
                      </div>
                    </div>
          })
        }
      </div>
      <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </main>
  )
}
