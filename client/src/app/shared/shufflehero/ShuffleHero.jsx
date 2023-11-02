import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import '../../../assets/styles/shared_styles/ShuffleHero.scss'
import { Link } from 'react-router-dom';
import {IoMailOutline, IoChevronForwardCircle, IoStar} from 'react-icons/io5';
import {IconContext} from "react-icons";
import {ShuffleData} from './ShuffleHeroData'; 

const ShuffleHero = () => {
  let easing = "easeInOut";

  const stagger = {
    animate:{
        transition:{
        delayChildren:0.3,
        staggerChildren:0.2,
        staggerDirection:1
        }
    }
  }

  const fadeInUp = {
    initial:{
        y:-60,
        opacity:0,
        transition:{
        duration:0.6, ease:easing
        }
    },
    animate:{
        y:0,
        opacity:1,
        transition:{
        duration:0.6,
        delay:0.5,
        ease:easing
        }
    }
  };

  const transition = {duration:0.5,ease:[0.6, 0.01, 0, 0.9]};

  const stagger2 = {
    hidden: {},
    show:{
        transition:{
            delayChildren:0.05,
            staggerChildren:0.1,
        }
    }
  }

    const firstname ={
        hidden: {
          y: -20,
          opacity: 0,
        },
        show: {
          x: 0,
          y: 0,
          opacity: 1,
          transition:{
            delayChildren:0.1,
            staggerChildren:0.04,
            staggerDirection:-1
            },
        },
    };

    const lastname ={
      hidden: {
        y: -20,
        opacity: 0,
      },
      show: {
        x: 0,
        y: 0,
        opacity: 1,
        transition:{
          delayChildren:0.1,
          staggerChildren:0.04,
          staggerDirection:1
          },
      },
    };

    const letter = {
      hidden: {
          y:400,
      },
      show:{
          y:0,
          transition:{duration:0.5, ...transition}
      }
    };

    const btnGroup={
        initial:{
            y:-60,
            opacity:0,
            transition:{duration:0.6, ease:easing}
        },
        animate:{
            y:0,
            opacity:1,
            animation:{
            duration:0.6,
            ease:easing
            }
        }
    };
    const star={
        initial:{
            y:60,
            opacity:0,
            transition:{duration:0.8, ease:easing}
        },
        animate:{
            y:0,
            opacity:1,
            animation:{
            duration:0.6,
            ease:easing
            }
        }
    };

  const MotionSpan = ({ className, variants, children }) => (
    <motion.span variants={variants} className={className}>
        {children.split('').map((char, index) => (
            char === ' '
                ? ' '
                : <motion.span key={index} variants={letter}>{char}</motion.span>
        ))}
    </motion.span>
  );
  
  const StarRating = () => (
      <IconContext.Provider value={{ color: "#fff", size: "18px" }}>
          {Array(5).fill().map((_, index) => (
              <motion.span
                  key={index}
                  variants={star}
                  whileHover={{ scale: 1.2, rotate: 180, borderRadius: '100%', cursor: 'pointer' }}
              >
                  <IoStar />
              </motion.span>
          ))}
      </IconContext.Provider>
  );

  return (
    <motion.div initial='initial' animate='animate'>
      <motion.div className="content_wrapper row" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.3, ease:easing}}>
        <motion.div className="left_content_wrapper col-lg-6 col-12" >
          <motion.h2 
          variants={stagger2} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="mt-3" >
            <MotionSpan variants={firstname} className='first'>
                Your Path to Wellness,
            </MotionSpan>
            <MotionSpan variants={lastname} className='last'>
                Every Step of the Way.
            </MotionSpan>
        </motion.h2>
          <motion.p variants={fadeInUp}>In the embrace of nature's beauty, where the sun touches the horizon. </motion.p>

          <motion.div className="btn_group gap-3" variants={stagger}>
            <motion.a className="btn btn_primary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}} href="/newlogin?activate=true">
              Get Started
            <IconContext.Provider value={{color:"#14da8f", size:"25px"}}>
                <IoChevronForwardCircle/>
            </IconContext.Provider>
            </motion.a>
            <motion.a className="btn-link btn btn_secondary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}} href="/newlogin">
              Sign In
            </motion.a>
          </motion.div>
          <motion.div className="review_container" variants={stagger}>
              <motion.p className="total_review" variants={star}>64+ Reviews</motion.p>
              <StarRating />
              <motion.p className="more_review" variants={star}>More then 50+ people taking services</motion.p>
          </motion.div>
        </motion.div>
        <motion.div className="shuffle-hero col-lg-6 col-12">  
          <ShuffleGrid initial={{x:200, opacity:0}} animate={{x:0, opacity:1}} transition={{duration:.5, delay:1.5}}/>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(ShuffleData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-100 h-100"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="shuffle-pic">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;