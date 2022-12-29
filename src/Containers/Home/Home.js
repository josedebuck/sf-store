import React, { useState } from 'react';
import styles from './Home.module.css';
import NavBar from '../../Components/NavBar/NavBar';
import { ReactComponent as GitHubLogo } from "../../Resources/image/githublogo.svg";
import { ReactComponent as Enter } from "../../Resources/image/enter.svg";
import { ReactComponent as Dice } from "../../Resources/image/dice.svg";
import { ReactComponent as LinkedIn } from "../../Resources/image/linkedin.svg";
import { ReactComponent as Game } from "../../Resources/image/game.svg";
import { ReactComponent as NotFound } from "../../Resources/image/notfound.svg";
import { ReactComponent as NotFoundQuery } from "../../Resources/image/notfoundquery.svg";
import { ReactComponent as Git } from "../../Resources/image/git.svg";
import { ReactComponent as Performance } from "../../Resources/image/performance.svg";
import { ReactComponent as Sources } from "../../Resources/image/sources.svg";
import { motion, AnimatePresence, m } from "framer-motion";
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Cart from '../../Components/Cart/Cart';
import AnimatedScroll from '../AnimatedPage/AnimatedScroll';
import games from '../../utils/games';

const Home = props => {
  const {
    shownGames,
    cartAmount,
    cart,
    cartDisplayed,
    handleOpenCart,
    handleCloseCart,
    clearCart,
    handleRemoveFromCart,
    hoverState,
    setHoverState,
    overlap,
    setOverlap,
    openGamePage
  } = props;

  const [browsing, setBrowsing] = useState(false);
  const [landingPage, setLandingPage] = useState(true);

  const navigate = useNavigate();

  const handleHover = (e) => {
    let newHoverState = hoverState[e.target.id];
    newHoverState.hovered = !newHoverState.hovered;

    setHoverState([
        ...hoverState, hoverState[e.target.id] = newHoverState
    ]);
  }

  const handleBrowse = () => {
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      navigate('/react-ecommerce-store/browse');
    }, 1500);
  }

  const handleHome = () => {
    setBrowsing(false);
    navigate('/');
  }

  const handleNavGamePage = () => {
    setHoverState([...hoverState, hoverState[21].hovered = false]);
    navigate('/react-ecommerce-store/games/riseofthetombraider');
  }
  
  const handleNavNotFoundPage = () => {
    navigate('/react-ecommerce-store/this-page');
  }
  
  const handleNavNotFoundQuery = () => {
    navigate('/react-ecommerce-store/games/404');
  }
  
  const handlePlayDice = () => {
    let randomIndex = Math.floor(Math.random() * 32);
    let randomSurname = games[randomIndex].surname;
    setOverlap(true);
    setTimeout(() => {
      setBrowsing(true);
      navigate(`/react-ecommerce-store/games/${randomSurname}`);
    }, 1500);
  }

  const variants = {
    hidden: { opacity: 1, x: -150 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 150 },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 900 },
    visible: { opacity: 1, y: 0, transition: {  y: { type: "tween", duration: 1.5, bounce: 0.3 }} },
  }

  return (
    <div className={styles.main}>
      {overlap ? 
          <motion.div 
            className={styles.overlap}
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
          >
    
          </motion.div> 
      : null}

      {cartDisplayed ? <Cart 
              cartDisplayed={cartDisplayed} 
              handleOpenCart={handleOpenCart}
              handleCloseCart={handleCloseCart}
              cart={cart}
              cartAmount={cartAmount}
              handleHover={handleHover}
              hoverState={hoverState}
              clearCart={clearCart}
              handleRemoveFromCart={handleRemoveFromCart}
              openGamePage={openGamePage}
      /> : null}
        <div className={styles.home}>

                <video autoPlay muted loop className={styles.video}>
                  <source src={require("../../Resources/image/pyke.mp4")} type="video/mp4" />
                </video>

                <NavBar 
                  handleHover={handleHover} 
                  hoverState={hoverState}
                  browsing={browsing}
                  handleBrowse={handleBrowse}
                  handleHome={handleHome}
                  landingPage={landingPage}
                  cartAmount={cartAmount}
                  handleOpenCart={handleOpenCart}
                  handleCloseCart={handleCloseCart}
                />
                <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.splash}>
                          <h1>SF Store</h1>
                          <p className={styles.intro}>El mejor lugar para comprar tus juegos favoritos en tendencia al mejor precio, no te lo podés perder! 😎🔥</p>
                        </div>
    
                        <div className={styles.buttons}>
                              <button className={`${styles.cta} ${styles.browseBtn}`} onClick={handleBrowse} aria-label="Browse">
                                <Enter className={styles.ctaSVG} />
                                Buscar
                              </button>
                              <button className={styles.cta} onClick={handlePlayDice} aria-label="Open random game page">
                                <Dice className={styles.ctaSVG} />
                                Aleatorio
                              </button>
                              <a href="https://github.com/josedebuck" target="_blank"><button className={styles.cta} aria-label="Ver repositorio">
                                <GitHubLogo className={styles.ctaSVG} />
                                GitHub
                              </button></a>
                              <a href="https://www.linkedin.com/in/jos%C3%A9-debuck-b07354165/" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="Open LinkedIn">
                                <LinkedIn className={`${styles.ctaSVG} ${styles.linkedin}`} />
                                <span>LinkedIn</span>
                              </button></a>
                        </div>
                    </div>
    
                    <div className={styles.right}>
                        <div className={styles.buttonsRight}>
                            <h2>Navegación Rápida</h2>
                            <button className={styles.cta} onClick={handleNavGamePage} aria-label="Open a game page">
                              <Game className={styles.ctaSVG} />
                              Página Juegos
                            </button>
                           
                            <a href="" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="View technologies used"> 
                              <img className={styles.technologies} src={require("../../Resources/image/whatruns.png")} alt="WhatRuns logo"/>
                              Tecnologías
                            </button></a>
                            <a href="https://github.com/josedebuck" target="_blank"><button className={`${styles.cta} ${styles.lastChild}`} aria-label="View Sources">
                              <Sources className={`${styles.ctaSVG}`} />
                             Perfil GitHub
                            </button></a>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
}

export default Home;