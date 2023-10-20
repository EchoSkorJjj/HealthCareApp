import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import '../../../assets/styles/shared_styles/ShuffleHero.scss'
import { Link } from 'react-router-dom';
import {IoMailOutline, IoChevronForwardCircle, IoStar} from 'react-icons/io5';
import {IconContext} from "react-icons";

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

  return (
    <motion.div initial='initial' animate='animate'>
      <motion.div className="content_wrapper row" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.3, ease:easing}}>
        <motion.div className="left_content_wrapper col-lg-6 col-12" >
          <motion.h2 
          variants={stagger2} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }} >
            <motion.span variants={firstname} className='first'>
                <motion.span variants={letter}>Y</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter}>u</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter} className="second">P</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>t</motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter} className="second">t</motion.span>
                <motion.span variants={letter}>o</motion.span>
                <motion.span variants={letter} className="second">W</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>l</motion.span>
                <motion.span variants={letter}>n</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>s</motion.span>
                <motion.span variants={letter}>s,</motion.span>
            </motion.span>
            <motion.span variants={lastname} className='last'>
                <motion.span variants={letter} className="second">E</motion.span>
                <motion.span variants={letter}>v</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>r</motion.span>
                <motion.span variants={letter}>y</motion.span>
                <motion.span variants={letter} className="second">S</motion.span>
                <motion.span variants={letter}>t</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter}>p</motion.span>
                <motion.span variants={letter} className="second">o</motion.span>
                <motion.span variants={letter}>f</motion.span>
                <motion.span variants={letter} className="second">t</motion.span>
                <motion.span variants={letter}>h</motion.span>
                <motion.span variants={letter}>e</motion.span>
                <motion.span variants={letter} className="second">W</motion.span>
                <motion.span variants={letter}>a</motion.span>
                <motion.span variants={letter}>y.</motion.span>
            </motion.span>
        </motion.h2>
          <motion.p variants={fadeInUp}>In the embrace of nature's beauty, where the sun touches the horizon. </motion.p>

          <motion.div className="btn_group gap-3" variants={stagger}>
            <motion.a className="btn btn_primary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}} href="/register">
              Get Started
            <IconContext.Provider value={{color:"#14da8f", size:"25px"}}>
                <IoChevronForwardCircle/>
            </IconContext.Provider>
            </motion.a>
            <motion.a className="btn-link btn btn_secondary" variants={btnGroup} whileHover={{scale:1.05}} whileTap={{scale:0.95}} href="/login">
              Sign In
            </motion.a>
          </motion.div>
          <motion.div className="review_container" variants={stagger}>
              <motion.p className="total_review" variants={star}>64+ Reviews</motion.p>
              <IconContext.Provider value={{color:"#fff", size:"18px"}}>
                  <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                  <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                  <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                  <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
                  <motion.span variants={star} whileHover={{scale:1.2, rotate:180,borderRadius:'100%',cursor:'pointer'}}><IoStar/></motion.span>
              </IconContext.Provider>
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

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
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