import '../../../assets/styles/Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Offcanvas, Button, Modal} from 'react-bootstrap';  
import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../../../features/localStorage'
import { useAuth } from '../../../features/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import logo from '../../../assets/images/logo.png';
import profilepic from '../../../assets/images/user.png';

export default function Header() {
    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const location = useLocation();
    const scrollToSection = (sectionId) => {
        if (location.pathname.includes('home')) {
            const element = document.querySelector(sectionId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            window.location.href = `/home${sectionId}`;
          }
    };

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    
    const googleLogout = useCallback(() => {
        setIsGoogleAuthenticated(undefined);
    }, [setIsGoogleAuthenticated]);

    const githubLogout = useCallback(() => {
        setIsGithubAuthenticated(undefined);
    }, [setIsGithubAuthenticated]);

    const logout = useCallback(() => {
        setIsAuthenticated(undefined);
    }, [setIsAuthenticated]);
    
    async function handleLogout() {
        const response = await fetch('http://localhost:3500/api/account/logout', {
            method: 'POST',
            credentials: 'include',
        });
        if (response.ok) {
            if (isGoogleAuthenticated) {  
            googleLogout();
            } 
            if (isGithubAuthenticated) {
            githubLogout();
            }
            if (isAuthenticated) {
            logout();
            }
            console.log('Logged out successfully');
            navigate('/home')
        } else {
            console.error('Logout failed');
        }
    }
        
    return (
        <>
        <Navbar id="header-navbar" key='lg' expand='lg' className="bg-body-tertiary sticky-top " >
            <Container fluid className="header-custom">
                <Navbar.Brand href="/home">
                    <img
                    alt=""
                    src={logo}
                    width="70"
                    height="70"
                    className="d-inline-block align-top"
                    />{' '}
                    <span className='fs-1'>Logo Name</span>
                </Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={handleShow}/>
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="end"
                    onHide={handleClose}
                >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    Menu
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body
                    className={`${
                        show
                        ? 'd-flex ms-2'
                        : 'd-flex justify-content-center hstack gap-2'
                    }`}
                    >
                    <Nav >
                        {isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated ? (
                        <>
                            <div className="p-2 ms-1">
                                <Nav.Link href="/homepage" className="nav-link-custom">Home</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <Nav.Link href="/dashboard" className="nav-link-custom">Dashboard</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <NavDropdown
                                title="Features"
                                id={`offcanvasNavbarDropdown-expand-lg`}
                                >
                                    <NavDropdown.Item href="/nutrition">Nutrition Analyzer</NavDropdown.Item>
                                    <NavDropdown.Item href="/recipe">
                                        Search Recipe
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </div>
                            <div className="p-2 ms-1">
                                <NavDropdown
                                title={<div>
                                    <img 
                                    src={profilepic} 
                                    alt="Profile Pic"
                                    width="30"
                                    height="30"
                                    className='me-2'
                                    />Profile
                                    </div>}
                                id={`offcanvasNavbarDropdown-expand-lg`}
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
                            <div className="p-2 ms-1">
                                <Nav.Link href="#about-us-section" onClick={() => scrollToSection("#about-us-section")} className="nav-link-custom">About Us</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <Nav.Link href="#features-section" onClick={() => scrollToSection("#features-section")} className="nav-link-custom">Features</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <Nav.Link href="#contact-us-section" onClick={() => scrollToSection("#contact-us-section")} className="nav-link-custom">Contact Us</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <Nav.Link href="/login" className={`nav-link-custom ${window.location.pathname === "/login" ? "active" : ""}`}>Login</Nav.Link>
                            </div>
                            <div className="p-2 ms-1">
                                <Nav.Link href="/register" className={`nav-link-custom ${window.location.pathname === "/register" ? "active" : ""}`}>Sign Up</Nav.Link>
                            </div>
                        </>
                        )}
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
        </>
    );
}