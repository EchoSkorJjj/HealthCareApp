import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from "react";
import { faHome, faWrench, faUser, faPerson, faDumbbell, faBook, faGear, faRightFromBracket, faTableColumns, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import '../../../assets/styles/private_styles/Sidebar.css'
import {Offcanvas, Nav, Modal, Button } from "react-bootstrap";
import { motion, AnimatePresence} from 'framer-motion'
import {SidebarItem} from './SidebarItem'

export default function Sidebar({show, handleClose, handleLogout}) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const onLogoutClick = () => {
        handleLogout();
      };

    let easing = "easeInOut";

    const stagger = {
        animate:{
            transition:{
            delayChildren:0.2,
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
            duration:0.3,
            ease:easing
            }
        }
    };
    return (
        <motion.div initial='initial' animate='animate' className="sidebar d-none d-lg-block" >
            <motion.div className='container d-flex justify-content-start w-100 sidebar-container' variants={stagger}>
            <Offcanvas show={show} onHide={handleClose} responsive="lg" >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column sidebar-body'>
                {SidebarItem.map((item, index) => (
                    <motion.a key={index} href={item.path} className='sidebar-content row' variants={component}>
                        <div className='col-2 px-0 sidebar-icon'>
                            <FontAwesomeIcon icon={item.icon} className="fa-1x" />
                        </div>
                        <span className='sidebar-text col-10 text-start'>{item.name}</span>
                    </motion.a>
                ))}
                <motion.button className='logout-button row' variants={component} onClick={() => setShowLogoutModal(true)}>
                    <div className='col-2 px-0 sidebar-icon'>
                        <FontAwesomeIcon icon={faRightFromBracket} className="fa-1x"/>
                    </div>
                    <span className='button-text col-10 text-start'>Log Out</span>
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
