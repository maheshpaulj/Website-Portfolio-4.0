import React, { useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import Head from 'next/head';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion, useScroll, useTransform } from 'framer-motion';

import styles from './style.module.scss';
import Curve from '@/components/Curve';
import Line from '@/components/Line';
import Magnetic from '@/components/Magnetic';
import { slide } from '@/components/anim/anim';

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

interface Message {
  user_name: string;
  user_email: string;
  user_message: string;
}

interface Error {
  user_name?: string;
  user_email?: string;
  user_message?: string;
}

const Contact: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [msgSent, setMsgSent] = useState(false);
  const [msg, setMsg] = useState<Message>({ user_name: "", user_email: "", user_message: "" });
  const [msgError, setMsgError] = useState<Error>({});

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMsg({ ...msg, [name]: value });
  };

  const validate = (values: Message): Error => {
    const errors: Error = {};
    if (!values.user_name) {
      errors.user_name = "Name is Required";
    }
    if (!values.user_email) {
      errors.user_email = "Email is Required";
    }
    if (!values.user_message) {
      errors.user_message = "Message is Required";
    }
    return errors;
  };

  useEffect(() => {
    setMsgError(validate(msg));
  }, [msg]);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (Object.keys(msgError).length === 0) {
      emailjs.sendForm('service_457jg5w', 'template_xv6tlzz', form.current!, {
        publicKey: '9QqWaMd3w2zXLYjRy',
      })
        .then(
          () => {
            toast.success('Message Sent Successfully', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            setMsgSent(true);
          },
          (error) => {
            toast.error('Issue while sending Message', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
          },
        );
    } else {
      toast.error('Fill Required Fields', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Mahesh Paul | Contact</title>
        <meta name="description" content="Website Portfolio Made by Mahesh Paul J. Contact Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Curve>
      <motion.main
          className={styles.contact}
          ref={container}
          initial="initial"
          animate="open"
          exit="closed"
          variants={slide}
        >
          <div className={styles.contactContainer} ref={container}>
            <div className={styles.Heading}>
              <div className={styles.Title}>Let&apos;s Have<br /> a Chat Together</div>
              <Line scolor={"#eee"} w={.8} sright={0} />
              <motion.div style={{ x }} className={styles.buttonContainer}>
                <Magnetic>
                  <div className={styles.button}>
                    <svg width="120" height="120" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.4167 49.5834H15.95C12.9502 49.5834 11.4503 49.5834 10.3989 48.8195C10.0593 48.5728 9.76065 48.2741 9.51393 47.9346C8.75 46.8831 8.75 45.3832 8.75 42.3834V18.8667C8.75 15.867 8.75 14.3671 9.51393 13.3156C9.76065 12.976 10.0593 12.6774 10.3989 12.4307C11.4503 11.6667 12.9502 11.6667 15.95 11.6667H54.05C57.0498 11.6667 58.5497 11.6667 59.6011 12.4307C59.9407 12.6774 60.2394 12.976 60.4861 13.3156C61.25 14.3671 61.25 15.867 61.25 18.8668V42.3834C61.25 45.3832 61.25 46.8831 60.4861 47.9346C60.2394 48.2741 59.9407 48.5728 59.6011 48.8195C58.5497 49.5834 57.0498 49.5834 54.05 49.5834H35" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M20.4167 49.5833L17.5 58.3333L35 49.5833" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Magnetic>
              </motion.div>
            </div>
            {msgSent ?
              <div className={styles.thanksContainer}>Thanks For Contacting!</div>
              :
              <form ref={form} onSubmit={sendEmail}>
                <div className={styles.labels}>
                  <label>01 Name</label>
                  {msgError.user_name !== undefined ? <label className={styles.error}>* Name is Required</label> : ""}
                </div>
                <Line scolor={"#57585A"} w={.8} sright={0} />
                <input type="text" name="user_name" placeholder='Mahesh Paul *' value={msg.user_name} onChange={handleChange} />
                <div className={styles.labels}>
                  <label>02 Email</label>
                  {msgError.user_email !== undefined ? <label className={styles.error}>* Email is Required</label> : ""}
                </div>
                <Line scolor={"#57585A"} w={.8} sright={0} />
                <input type="email" name="user_email" placeholder='mahesh.paul.j@gmail.com *' value={msg.user_email} onChange={handleChange} />
                <div className={styles.labels}>
                  <label>03 Message</label>
                  {msgError.user_message !== undefined ? <label className={styles.error}>* Message is Required</label> : ""}
                </div>
                <Line scolor={"#57585A"} w={.8} sright={0} />
                <textarea name="user_message" placeholder='Hello Mahesh Paul, *' value={msg.user_message} onChange={handleChange} />
                <div className={styles.sendContainer}>
                  <Line scolor={"#57585A"} w={.8} sright={0} />
                  <motion.div style={{ x }} className={styles.buttonContainer}>
                    <Magnetic>
                      <input type="submit" value="Send" className={styles.button} />
                    </Magnetic>
                  </motion.div>
                </div>
              </form>
            }
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
                  <a href='https://github.com/CityIsBetter/' target='_blank' rel="noopener noreferrer">Github</a>
                </Magnetic>
              </span>
              <Magnetic>
                <a href='https://instagram.com/mahesh_paul_j' target='_blank' rel="noopener noreferrer">Instagram</a>
              </Magnetic>
              <Magnetic>
                <a href='https://discordapp.com/users/509270434303311872' target='_blank' rel="noopener noreferrer">Discord</a>
              </Magnetic>
              <Magnetic>
                <a href='https://linkedin.com/in/mahesh-paul' target='_blank' rel="noopener noreferrer">Linkedin</a>
              </Magnetic>
            </div>
          </div>
        </motion.main>
      </Curve>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
      />
    </>
  );
}

export default Contact;
