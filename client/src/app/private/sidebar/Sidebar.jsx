import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from "react";
import { faHome, faWrench, faUser, faBook, faGear, faRightFromBracket, faTableColumns, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import '../../../assets/styles/private_styles/Sidebar.css'
import {Offcanvas, Nav, Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence} from 'framer-motion'

export default function Sidebar({show, handleClose, handleLogout}) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const onLogoutClick = () => {
        handleLogout();
      };

    let easing = "easeInOut";

    const stagger = {
        animate:{
            transition:{
            delayChildren:0.3,
            staggerChildren:0.1,
            staggerDirection:1
            }
        }
    }

    const component = {
        initial:{
            y:-60,
            opacity:0,
            transition:{duration:0.05, ease:easing}
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
        <motion.div initial='initial' animate='animate' className="sidebar d-none d-lg-block" >
            <motion.div className='container d-flex justify-content-start w-100 sidebar-container' variants={stagger}>
            <Offcanvas show={show} onHide={handleClose} responsive="lg" className="w-100">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column sidebar-body'>
                <motion.a href="/homepage" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faHome} className="fa-1x" /><span className='sidebar-text ps-2'>Home Page</span>
                </motion.a>
                <motion.a href="/dashboard" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faTableColumns} className="fa-1x" /><span className='sidebar-text ps-2'>Dashboard</span>
                </motion.a>
                <motion.a href="/nutrition" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faSearchengin} className="fa-1x" /><span className='sidebar-text ps-2'>Nutrition Info</span>
                </motion.a>
                <motion.a href="/recipe" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-1x" /><span className='sidebar-text ps-2'>Search Recipe</span>
                </motion.a>
                <motion.a href="/recipebook" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faBook} className="fa-1x" /><span className='sidebar-text ps-2'>Recipe Book</span>
                </motion.a>
                <motion.a href="/services" className='sidebar-content' variants={component}>                   
                    <FontAwesomeIcon icon={faWrench} className="fa-1x" /><span className='sidebar-text ps-2'>Services</span>
                </motion.a>
                <motion.a href="/profile" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faUser} className="fa-1x"/><span className='sidebar-text ps-2'>Profile</span>
                </motion.a>
                <motion.a href="/settings" className='sidebar-content' variants={component}>
                    <FontAwesomeIcon icon={faGear} className="fa-1x"/><span className='sidebar-text ps-2'>Settings</span>
                </motion.a>
                <motion.button className='logout-button' variants={component} onClick={() => setShowLogoutModal(true)}>
                    <FontAwesomeIcon icon={faRightFromBracket} className="fa-1x"/><span className='sidebar-text ps-2'>Log Out</span>
                </motion.button>
                <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Logout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you wish to log out?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                        Cancel
                        </Button>
                        <Button variant="primary" onClick={onLogoutClick}>
                        Yes, Log Out
                        </Button>
                    </Modal.Footer>
                </Modal>
                </Offcanvas.Body>
            </Offcanvas>
            </motion.div>
        </motion.div>
    )
}
