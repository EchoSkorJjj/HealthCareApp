import React, {useState, useRef, useEffect} from 'react';
import { IoChevronForward} from "react-icons/io5";
import {IconContext} from "react-icons";
import {motion, AnimatePresence} from 'framer-motion';
import LinePng from '../../../assets/images/line.png';
import './Card.scss';
import {CardData} from './CardData';

const container = {
    show:{
        transition:{
            staggerChildren:0.2
        }
    }
};

const item = {
    hidden:{opacity:0,y:20},
    show:{
        opacity:1,
        y:0,
        transition:{
            ease:'easeInOut',
            duration:.2
        }
    }
}

const hoverEffect = {
    whileHover:{
        scale:1.5,rotate:630,borderRadius:"100%"
    },
    whileTap:{
        scale:.8,rotate:630,borderRadius:"100%"
    },
}

const buttonStyle = {

    padding: '7px 10px',
    border: 'none',
    borderRadius: '5px',
    background: 'linear-gradient(90deg, #14da8f, #1dd39c, #2af0b3)',
    color: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    marginTop: 'auto'
}

const paraStyle = {

    border: '5px solid',
    borderImage: 'linear-gradient(90deg, #14da8f, #1dd39c, #2af0b3) 5',
    padding: '5px',

}


function Card() {
    const [selectedCard, setSelectedCard] = useState(null);

    const cardClickHandler = (index) => {
        setSelectedCard(CardData[index]);
    };

    const cardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setSelectedCard(null);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
    <motion.div className={`service_container ${selectedCard ? 'blurred' : ''}`}>
        <div className="title_wrapper">
            <motion.span className="service_title"
                initial={{y:20, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1.8}}
            >Our Services</motion.span>
            <motion.h2
                initial={{y:200, opacity:0}}
                animate={{y:0, opacity:1}}
                exit={{opacity:0}}
                transition={{duration:.5, delay:1}}
            >Optimize Your Well-being Journey<br/>With Time-saving Healthcare Solutions.</motion.h2>
        </div>

        <AnimatePresence>
            {selectedCard && (
            <motion.div
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{duration:0.4}}
                className="expanded-card"
                style={{backgroundColor: selectedCard.backgroundColor}}
            >
                <div className="expanded-card-content">
                {/* Display card content here */}
                <h2 style={{ marginTop: 0 }}>{selectedCard.title}</h2>
                <p style={paraStyle}>{selectedCard.description}</p>
                <button onClick={() => setSelectedCard(null)} style={buttonStyle}>Close</button>
                </div>
            </motion.div>
            )}
        </AnimatePresence>

        <motion.div className="service_card" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>
            {CardData.map((card, index) => (
            <motion.div className="card" key={index} onClick={() => cardClickHandler(index)} variants={item}>
                <motion.span className="service_icon" style={{ backgroundColor: card.backgroundColor }} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                    <IconContext.Provider value={{ color: card.iconColor, size: '22px' }}>
                        {React.createElement(card.icon)}
                    </IconContext.Provider>
                </motion.span>
                <h3>{card.title[0]}<br/>{card.title[1]}</h3>
                <a>
                <span>learn more</span>
                <IconContext.Provider value={{ color:"#14da8f", size: '18px' }}>
                    <IoChevronForward />
                </IconContext.Provider>
                </a>
            </motion.div>
            ))}
            <motion.div className="card dark" variants={item}>
                <img src={LinePng} alt="line" className="line"/>               
                <h2>+4 <br/>More...</h2>
                <a href="#">
                    <span>View more...</span>
                    <motion.span className="service_icon" style={{backgroundColor:"#14da8f"}} variants={hoverEffect} whileHover="whileHover" whileTap='whileTap'>
                        <IconContext.Provider value={{color:"#fff", size:"18px"}}>
                            <IoChevronForward/>
                        </IconContext.Provider>
                    </motion.span>
                </a>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}

export default Card