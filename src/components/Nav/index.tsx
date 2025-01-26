import React, { useState } from 'react'
import styles from './style.module.scss'
import Rlink from './Link'
import { motion } from 'framer-motion';
import Magnetic from '@/components/Magnetic';
import { usePathname } from 'next/navigation';
import { menuSlide } from '../BurgerMenu/anim';
import Curve from './Curve';

const navItems = [
    {
        title: "Home",
        href: "/"
    }, 
    {
        title: "About",
        href: "/about"
    },
    {
        title:"Projects",
        href: "/projects"
    },
    {
        title:"Contact",
        href:"/contact"
    }
]

const Nav = ({close} : {close: any}) => {

    const pathname = usePathname();
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    
  return (
    <motion.div
    variants={menuSlide} 
    initial="initial" 
    animate="enter" 
    exit="exit" 
    className={styles.menu}>
        <div className={styles.body}>
            <div onMouseLeave={() => {setSelectedIndicator(pathname)}} className={styles.nav}>
                <div className={styles.header}>
                    <p>Navigation</p>
                </div>
                    {
                        navItems.map((item, index) => {
                            return <Rlink key={index} data={{...item, index}} isActive={selectedIndicator == item.href} setSelectedIndicator={setSelectedIndicator} Click={close}/>
                        }) 
                    }            
            </div>
            <div className={styles.footer}>
                <Magnetic><a href='https://github.com/maheshpaulj/' target='_blank'>Github</a></Magnetic>
                <Magnetic><a href='https://instagram.com/mahesh_paul_j' target='_blank'>Instagram</a></Magnetic>
                <Magnetic><a href='https://discordapp.com/users/509270434303311872' target='_blank'>Discord</a></Magnetic>
                <Magnetic><a href='https://linkedin.com/in/mahesh-paul' target='_blank'>LinkedIn</a></Magnetic>   
            </div>
        </div>
        <Curve />
    </motion.div>
  )
}

export default Nav