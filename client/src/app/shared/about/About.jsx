import React from 'react';
import illustration from '../../../assets/images/illustration-hero.svg';
import { motion } from 'framer-motion';
import '../../../assets/styles/shared_styles/About.scss';
import healthyman from '../../../assets/images/healthyman.jpeg';
import developer from '../../../assets/images/developer.jpeg';

export default function About() {
    let easing = "easeInOut";

    const transition = {duration:1.4,ease:[0.6,0.01,-0.05,0.9]};

    const firstName = {
        initial:{
            y:-20,
        },
        animate:{
            y:0,
            transition:{
            delayChildren:0.4,
            staggerChildren:0.04,
            staggerDirection:-1
            }
        }
    }

    const lastName = {
        initial:{
            y:-20,
        },
        animate:{
            y:0,
            transition:{
            delayChildren:0.4,
            staggerChildren:0.04,
            staggerDirection:1
            }
        }
    }

    const letter = {
        initial:{
            y:400,
        },
        animate:{
            y:0,
            transition:{duration:1, ...transition}
        }
    };

    const container = {
        show:{
            transition:{
                staggerChildren:0.2
            }
        }
    };
    
    const item = {
        hidden:{opacity:0,x:-20},
        show:{
            opacity:1,
            x:0,
            transition:{
                x: 0,
                ease:'easeInOut',
                duration:.8
            }
        }
    }

    const item2 = {
        hidden:{opacity:0,x:20},
        show:{
            opacity:1,
            x:0,
            transition:{
                x: 0,
                ease:'easeInOut',
                duration:.8
            }
        }
    }

    const TextStyle = {
        background: 'linear-gradient(90deg, #14da8f, #1dd39c, #2af0b3)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    };

    return (
        <motion.div initial='initial' animate='animate' className='about_container'>
            <motion.div className="about_content" initial={{opacity:0,scale:0}} animate={{opacity:1, scale:1}} transition={{duration:0.6, ease:easing}} >
                <motion.div className="row mb-4" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>
                    <motion.div className="col-md-6 d-flex align-items-center justify-content-center" variants={item} >
                        <motion.img src={developer} alt="developer" className="img-thumbnail aboutus_image" />
                    </motion.div>
                    <div className="col-md-6 text_container">
                        <div className="about_text">
                            <motion.h2 className='card-header'>
                                <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
                                    <motion.span variants={letter}>A</motion.span>
                                    <motion.span variants={letter}>b</motion.span>
                                    <motion.span variants={letter}>o</motion.span>
                                    <motion.span variants={letter}>u</motion.span>
                                    <motion.span variants={letter}>t</motion.span>
                                </motion.span>
                                <motion.span variants={lastName} initial="initial" animate="animate" className='last' style={TextStyle}>
                                    <motion.span variants={letter} className="second">U</motion.span>
                                    <motion.span variants={letter}>s</motion.span>
                                </motion.span>
                            </motion.h2>
                            <motion.div variants={item2} className='card-body'>
                                <motion.p>
                                    We are a team of developers and designers who are passionate about the design and development of digital products and services.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
                <motion.div className="row" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>
                    <motion.div className="col-md-6 order-md-last d-flex align-items-center justify-content-center" variants={item2}>
                        <motion.img src={healthyman} alt="healthyman" className="img-thumbnail aboutus_image" />
                    </motion.div>
                    <div className="col-md-6 order-md-first text_container">
                        <div className="about_text">
                            <motion.h2 className='card-header' >
                                <motion.span variants={firstName} initial="initial" animate="animate" className='first'>
                                    <motion.span variants={letter}>O</motion.span>
                                    <motion.span variants={letter}>u</motion.span>
                                    <motion.span variants={letter}>r</motion.span>
                                </motion.span>
                                <motion.span variants={lastName} initial="initial" animate="animate" className='last' style={TextStyle}>
                                    <motion.span variants={letter} className="second">M</motion.span>
                                    <motion.span variants={letter}>i</motion.span>
                                    <motion.span variants={letter}>s</motion.span>
                                    <motion.span variants={letter}>s</motion.span>
                                    <motion.span variants={letter}>i</motion.span>
                                    <motion.span variants={letter}>o</motion.span>
                                    <motion.span variants={letter}>n</motion.span>
                                </motion.span>
                            </motion.h2>
                            <motion.div variants={item} className='card-body' style={{ color: '#fff', marginTop: '20px' }}>
                                <motion.p>
                                    Our mission is to empower individuals to take control of their health and make informed decisions. Whether you want to track your nutrition, monitor your fitness, or connect with healthcare providers, we have you covered.
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
                <motion.div className='row mt-5' variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{once:false}}>
                    <motion.h4
                        initial={{y:20, opacity:0}}
                        animate={{y:0, opacity:1}}
                        exit={{opacity:0}}
                        transition={{duration:.5, delay:2}}
                    >
                        We believe that a healthy lifestyle is within reach for everyone, and our platform is designed to make it easier and more accessible.
                    </motion.h4>
                </motion.div>
            </motion.div>
        </motion.div>
    )
}