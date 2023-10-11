import '../../../assets/styles/shared_styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Offcanvas, Button, Modal, Form} from 'react-bootstrap';  
import React, { useState, useCallback, useEffect } from 'react';
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

    const handleDeleteNotification = (content) => {
    setNotificationContent(
        notificationContent.filter((item) => item !== content)
    );
    };
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showLogoutModal, setShowLogoutModal] = useState(false);
        
    return (
        <Navbar id="header-navbar" key='lg' expand='lg' className="bg-body-tertiary fixed-top pt-0 fadein-style" >
            <Container fluid className="header-custom d-flex align-items-center ">
            {(isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated) && (
                <button className="d-lg-none border-0 bg-transparent" onClick={onToggle}>
                    <FontAwesomeIcon icon={faListUl} className="me-2 fa-solid fa-2x"/>
                </button>
            )}
            <Navbar.Brand href="/home" className='align-items-center gap-2 mx-auto'>
                {/* <img
                alt=""
                src={logo}
                width="70"
                height="70"
                className="d-inline-block align-top"
                />{' '} */}
                <span className='fs-1 brand-logo'>HealthCarePro</span>
            </Navbar.Brand>
            <div className='search-bar mx-5'>
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
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={handleShow} className="custom-navbar-toggle">
                <FontAwesomeIcon icon={faEllipsis} className="fa-solid fa-2x"/>
            </Navbar.Toggle>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    onHide={handleClose}
                >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    Notification Panel
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className={`${
                        show
                        ? 'd-flex ms-2'
                        : 'd-flex justify-content-lg-end justify-content-start hstack gap-2'
                    }`}
                    >
                    <Nav >
                        {isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated ? (
                        <>
                            <div className='d-flex flex-lg-row flex-column gap-2'>
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
                                <AnimatePresence>
                                {showNotifications ? (
                                    <NotificationTray
                                    notificationContent={notificationContent}
                                    handleDeleteNotification={handleDeleteNotification}
                                    ></NotificationTray>
                                ) : null}
                                </AnimatePresence>
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
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}