import { motion } from 'framer-motion';
import map from '../../../assets/images/map.png';
import '../../../assets/styles/shared_styles/World.css';
import sg from '../../../assets/images/sg_flag.png';
import ukraine from '../../../assets/images/ukraine.png';
import usa from '../../../assets/images/usa.png';

export default function World() {
    const stagger = {
        hidden: {},
        show:{
            transition:{
                delayChildren:0.4,
                staggerChildren:0.2,
            }
        }
    }

    const fadeIn ={
        hidden: {
          y: 100,
          opacity: 0,
        },
        show: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            type: 'tween',
            delay: 0.4,
            duration: 1,
            ease: 'easeOut',
          },
        },
    };

    return (
        <div className='world-container'>
            <motion.div 
                variants={stagger} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.25 }}
                className=''
            >
                <div className="container text-container"> 
                    <motion.span variants={fadeIn} className='fw-bold fs-1 world-text'>
                        Find Recipes
                    </motion.span>
                    <br /> 
                    <motion.span variants={fadeIn} className='fw-bold fs-1 world-text'>
                        From Around The World
                    </motion.span>
                </div>
                {/* <motion.div variants={fadeIn} className='position-relative w-100 mt-5'>
                    <img src={map} alt="map" className='map-image' />
                    <div className='position-absolute end-0 bottom-0 sg-container'>
                        <img src={sg_flag} alt="sg_flag" className='img-flag rounded-circle'/>
                    </div>
                    <div className='position-absolute end-0 bottom-0 ukraine-container'>
                        <img src={ukraine} alt="ukraine_flag" className='img-flag rounded-circle'/>
                    </div>
                    <div className='position-absolute start-0 bottom-0 usa-container'>
                        <img src={usa} alt="usa_flag" className='img-flag rounded-circle'/>
                    </div>
                </motion.div> */}
                <motion.div variants={fadeIn} className='position-relative w-100 mt-5'>
                    <img src={map} alt="map" className='map-image' />
                    <div className='position-absolute end-0 bottom-0 sg-container'>
                        <div className="geo-location-icon">
                            <img src={sg} alt="sg_flag" className='img-flag rounded-circle'/>
                            <div className="hover-info">
                                <span>Singapore</span>
                            </div>
                        </div>
                    </div>
                    <div className='position-absolute end-0 bottom-0 ukraine-container'>
                        <div className="geo-location-icon">
                            <img src={ukraine} alt="ukraine_flag" className='img-flag rounded-circle'/>
                            <div className="hover-info">
                                <span>Ukraine</span>
                            </div>
                        </div>
                    </div>
                    <div className='position-absolute start-0 bottom-0 usa-container'>
                        <div className="geo-location-icon">
                            <img src={usa} alt="usa_flag" className='img-flag rounded-circle'/>
                            <div className="hover-info">
                                <span>USA</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}