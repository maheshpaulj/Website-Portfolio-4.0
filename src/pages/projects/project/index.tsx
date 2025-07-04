import React, { useRef } from 'react'
import styles from './style.module.scss'
import Image from 'next/image'
import Magnetic from '@/components/Magnetic'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function Project() {
  const projects = [
    {
      Title: "NoCodefolio",
      Desc: "NoCodefolio is the quickest way for anyone to build, host, and own a professional portfolio website for free. It bridges the gap between no-code simplicity and quality by offering a live, visual editor with templates that can be launched to the internet with a single click. ",
      Mockup: '/assets/nocodefolio.png',
      Lang: "next ts tailwind node firebase",
      Github: "https://github.com/maheshpaulj/NoCodefolio",
      Site: "https://nocodefolio.vercel.app/",
    },
    {
      Title: "NoteScape",
      Desc: "NoteScape is an AI-powered note-taking app that combines real-time collaboration with intelligent features. It leverages Meta's Llama model for features like smart translation and context-aware Q&A, while enabling seamless teamwork through live cursors and shared editing.",
      Mockup: '/assets/NoteScape.png',
      Lang: "next ts tailwind node firebase liveblocks clerk",
      Github: "https://github.com/maheshpaulj/NoteScape-2.0",
      Site: "https://notescape.vercel.app/",
    },
    {
      Title: "ResumeItNow",
      Desc: "ResumeItNow is a free, open-source resume builder that helps job seekers create professional resumes without watermarks or hidden fees. Built with modern technologies and powered by AI, it offers a seamless experience for creating ATS-friendly resumes.",
      Mockup: '/assets/resumeitnow.png',
      Lang: "next ts tailwind node firebase",
      Blog: "https://medium.com/@mahesh.paul.j/introducing-resumeitnow-the-free-open-source-resume-builder-for-job-seekers-2603ac4a4954",
      Github: "https://github.com/maheshpaulj/ResumeItNow",
      Site: "https://resumeitnow.vercel.app/",
    },
    {
      Title: "BoardScape",
      Desc: "A modern, real-time collaborative whiteboard application built with Next.js 14, enabling teams to visualize ideas and work together seamlessly.",
      Mockup: '/assets/boardscape.png',
      Lang: "next ts tailwind node convex clerk liveblocks",
      Github: "https://github.com/maheshpaulj/BoardScape",
      Site: "https://boardscape.vercel.app/",
    },
    {
      Title: "Vehicle and Lane Detection Using OpenCV and YOLO",
      Desc: "Real-time lane and car detection system using YOLOv8 and OpenCV, with distance estimation for vehicles. Ideal for autonomous driving and traffic analysis.",
      Mockup: '/assets/lane_detection.png',
      Lang: "python",
      Blog: "https://medium.com/@mahesh.paul.j/building-a-lane-and-car-detection-system-using-yolov8-and-opencv-b562f68bf15e",
      Github: "https://github.com/maheshpaulj/Lane_Detection",
    },
    {
      Title: "Manga Scraper",
      Desc: "Manga Scraping Tool made in python, It fetches the manga page from the website and downloads it in JPG format and saves it locally. This is basically web Scraping",
      Mockup: '/assets/mangaScrapper.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/maheshpaulj/Manga-Scraper",
      Site: "",
    },
    {
      Title: "Prompt2Shorts",
      Desc: "Prompt2Shorts is an application that takes prompts and generate full scripts, voice-over audio, and relevant videos. Designed for creators who want to quickly produce engaging content, Prompt2Shorts integrates advanced AI and APIs to automate the creation process.",
      Mockup: '/assets/prompt2shorts.png',
      Lang: "next ts tailwind node",
      Blog: "",
      Github: "https://github.com/maheshpaulj/Prompt2Shorts",
      Site: "https://prompt2shorts.vercel.app",
    },
    {
      Title: "Old Portfolio",
      Desc: "This is my old website portfolio made using reactJS and Sanity and hosted in Netlify!",
      Mockup: '/assets/portfolio 2.0.png',
      Lang: "react js node sass",
      Blog: "",
      Github: "https://github.com/maheshpaulj/Portfolio",
      Site: "https://maheshpaul.netlify.app/",
    },
    {
      Title: "Weather App",
      Desc: "This Weather App is made in Java using Java swing component with Modern UI design and Openweathermap API for the data.",
      Mockup: '/assets/weather_app.gif',
      Lang: "java",
      Blog: "",
      Github: "https://github.com/maheshpaulj/weather-app-java",
      Site: "",
    },
    {
      Title: "PathFinding Algorithms Visualized",
      Desc: "PathFinding Algorithms Visualized project consists of 2 pathfinding algorithm, implemented in python using tkinter for visualization Dijkstra algorithm and Breadth first search (BFS)",
      Mockup: '/assets/Dijkstra.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/maheshpaulj/Pathfinding-Algorithms",
      Site: "",
    },
    {
      Title: "Tetris",
      Desc: "This project is a recreation of the game Tetris in Python using Pygame library!",
      Mockup: '/assets/tetris.png',
      Lang: "python",
      Blog: "",
      Github: "https://github.com/maheshpaulj/Tetris-pygame",
      Site: "",
    },
    {
      Title: "Weather App",
      Desc: "This project is a weather app made using html, css, javascript. This is dependent on OpenWeatherMap API",
      Mockup: '/assets/weather.png',
      Lang: "html js css",
      Blog: "",
      Github: "https://github.com/maheshpaulj/weather-app",
      Site: "https://maheshpaulj.github.io/weather-app/",
    },
  ]

  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"]
  })

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 10]);

  // Staggered animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <main ref={container} className={styles.main}>
      <motion.div 
        className={styles.projectContainer}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {projects.map((project, index) => {
          return (
            <motion.div 
              className={styles.project} 
              key={index}
              variants={itemVariants}
            >
              <motion.div 
                className={styles.mockupContainer}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <Image 
                  src={project.Mockup} 
                  alt='project mockup' 
                  className={styles.projectImg} 
                  width={1280} 
                  height={720}
                />
              </motion.div>
              
              <motion.div 
                className={styles.content}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
              >
                <div className={styles.contentWrapper}>
                  <div className="">
                    <p className={styles.title}>{project.Title}</p>
                    <p className={styles.desc}>{project.Desc}</p>
                  </div>
                  <div className={styles.lang}>
                    {project.Lang.split(" ").map((lang, index) => (
                      <Magnetic key={index}>
                        <Image 
                          src={`/assets/${lang}.png`} 
                          alt={`${lang} logo`} 
                          width={48} 
                          height={48}
                        />
                      </Magnetic>
                    ))}
                  </div>
                </div>
                <div className={styles.links}>
                  {project.Blog && <Magnetic><a href={project.Blog} target='_blank'>Blog</a></Magnetic>}
                  {project.Github && <Magnetic><a href={project.Github} target='_blank'>Github</a></Magnetic>}
                  {project.Site && <Magnetic><a href={project.Site} target='_blank'>Site</a></Magnetic>}
                </div>
              </motion.div>
            </motion.div>
          )
        })}
      </motion.div>
      <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </main>
  )
}