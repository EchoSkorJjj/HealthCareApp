import '../../../assets/styles/shared_styles/Header.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Nav, Navbar, NavDropdown, Container, Offcanvas, Button, Modal, Form} from 'react-bootstrap';  
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from '../../../features/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faRightFromBracket, faEllipsis, faListUl, faBell } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png';
import profilepic from '../../../assets/images/user.png';
import DrawOutlineButton from '../../components/button/DrawOutline.jsx'
import NotificationTray from '../../components/notification/NotificationTray.jsx'
import { motion, AnimatePresence} from 'framer-motion'
import useProfileStore  from '../../../features/store/ProfileStore';

export default function Header({onToggle, handleLogout}) {
    const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();
    
    const profileData = useProfileStore((state) => state.profileStore)
    
    const initialNotifications = [
        "User #20 left you a like!",
        "User #45 sent you a friend request",
        "Why do you suck so much?",
        "Thanks for signing up!",
      ];

    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationContent, setNotificationContent] = useState(initialNotifications);

    const notificationContainerRef = React.useRef(null);

    useEffect(() => {
        // Function to check if clicked outside of element
        function handleClickOutside(event) {
          if (notificationContainerRef.current && !notificationContainerRef.current.contains(event.target)) {
            setShowNotifications(false);
          }
        }
    
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, []);

    const handleDeleteNotification = (content) => {
        setNotificationContent(
            notificationContent.filter((item) => item !== content)
        );
    };
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    
    let easing = "easeInOut";

    const stagger = {
        animate:{
            transition:{
            delayChildren:0.4,
            staggerChildren:0.2,
            staggerDirection:1
            }
        }
    }

    const header={
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
        <motion.nav initial='initial' id="header-navbar" animate='animate' className="navbar navbar-expand-lg header-nav fixed-top pt-0">
            <motion.header variants={stagger} className='container-fluid'>
                {(isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated) && (
                    <button className="d-lg-none border-0 bg-transparent" onClick={onToggle}>
                        <FontAwesomeIcon icon={faListUl} className="me-2 fa-solid fa-2x"/>
                    </button>
                )}
                <motion.a className="logo_wrapper" href="/home" variants={header}>HealthCare<span>Pro</span></motion.a>
                <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar-expand-lg" type="button" aria-controls="offcanvasNavbar-expand-lg" className="custom-navbar-toggle navbar-toggler collapsed">
                    <FontAwesomeIcon icon={faEllipsis} className="fa-solid fa-2x"/>
                </button>
                <div id="offcanvasNavbar-expand-lg" className="offcanvas-lg offcanvas-end offcanvas-popup" aria-labelledby="offcanvasNavbarLabel-expand-lg">
                 <div className="offcanvas-header">
                     <div className="offcanvas-title h5" id="offcanvasNavbarLabel-expand-lg">Get Started</div>
                     <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#offcanvasNavbar-expand-lg" aria-label="Close"></button>
                </div>
                <motion.div className="menu_container offcanvas-body" variants={stagger}>
                    <motion.span variants={header} className='body-component'>
                    {isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated ? (
                    <>
                        <div className='search-bar-offcanvas d-flex align-items-center '>
                            <Form className="d-flex">
                                <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </div>
                        <div ref={notificationContainerRef}>
                            <motion.div 
                                whileHover={window.innerWidth >= 992 ? {
                                    rotateZ: [0, -20, 20, -20, 20, -20, 20, 0],
                                    transition: { duration: 0.5 },
                                    } : []}
                                className="p-1 d-flex align-items-center pt-1">
                                <button className="bg-transparent notification-button d-flex"
                                    onClick={() => {
                                        setShowNotifications(!showNotifications);
                                    }}
                                    
                                    >
                                    <FontAwesomeIcon icon={faBell} className="bell-icon "/>
                                </button>
                            </motion.div>
                            <AnimatePresence>
                            {showNotifications ? (
                                <NotificationTray
                                notificationContent={notificationContent}
                                handleDeleteNotification={handleDeleteNotification}
                                ></NotificationTray>
                            ) : null}
                            </AnimatePresence>
                        </div>   
                        <div className="p-1 me-4">
                            <NavDropdown
                            title={<div className='profile-icon'>
                                <img 
                                src={profileData.profilePicture || profilepic} 
                                alt="Profile Pic"
                                width="30"
                                height="30"
                                className='rounded-circle'
                                />
                                {profileData.username}
                                </div>}
                            id={`offcanvasNavbarDropdown-expand-lg`}
                            align="end"
                            >
                                <NavDropdown.Item href="/profile"><FontAwesomeIcon icon={faUser} className="me-2"/>Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/settings"><FontAwesomeIcon icon={faGear} className="me-2"/>Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setShowLogoutModal(true)}><FontAwesomeIcon icon={faRightFromBracket} className="me-2"/>Log Out</NavDropdown.Item>
                                <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Confirm Logout</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Do you wish to log out?</Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setShowLogoutModal(false)}>
                                    Cancel
                                    </Button>
                                    <Button variant="primary" onClick={handleLogout}>
                                    Yes, Log Out
                                    </Button>
                                </Modal.Footer>
                                </Modal>
                            </NavDropdown>
                        </div>
                        
                    </>
                    ) : (
                    <>
                    <div>
                        <Nav.Link href="/login">
                            <DrawOutlineButton>
                                Log In
                            </DrawOutlineButton>
                        </Nav.Link>
                    </div>
                    <div>
                        <Nav.Link href="/register">
                            <DrawOutlineButton>
                                Sign Up
                            </DrawOutlineButton>
                        </Nav.Link>
                    </div>
                    </>
                    )}
                    </motion.span>
                </motion.div>
                </div>
                
            </motion.header>
        </motion.nav>
        
    );
}