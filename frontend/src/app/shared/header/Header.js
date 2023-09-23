import '../../../assets/styles/Header.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar, NavDropdown, Container, Offcanvas, Button, Modal} from 'react-bootstrap';  
import React, { useState, useCallback } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../../../features/localStorage'
import { useAuth } from '../../../features/auth';

export default function Header() {
    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const { isAuthenticated, isGoogleAuthenticated, isGithubAuthenticated } = useAuth();

    const navigate = useNavigate();
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
            navigate('/login')
        } else {
            console.error('Logout failed');
        }
    }
        
    return (
        <>
        <Navbar key='md' expand='md' className="bg-body-tertiary mb-3">
            <Container fluid>
                <Navbar.Brand href="#">
                    <img
                    alt=""
                    src={require('../../../assets/images/logo.png')}
                    width="70"
                    height="70"
                    className="d-inline-block align-top"
                    />{' '}
                    <span className='fs-1'>Logo Name</span>
                </Navbar.Brand>
            
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-md`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                    placement="start"
                >
                <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                    Offcanvas
                </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        {isAuthenticated || isGoogleAuthenticated || isGithubAuthenticated ? (
                        <>
                            <Nav.Link href="/homepage">Home</Nav.Link>
                            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                            <NavDropdown
                            title="Features"
                            id={`offcanvasNavbarDropdown-expand-md`}
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
                            <NavDropdown
                            title="Profile"
                            id={`offcanvasNavbarDropdown-expand-md`}
                            src={require('../../../assets/images/user.png')}
                            >
                                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => setShowLogoutModal(true)}>Log Out</NavDropdown.Item>
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
                        </>
                        ) : (
                            <>
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/about">About Us</Nav.Link>
                            </>
                        )}
                        <Nav.Link href="/contact">Contact Us</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
            </Container>
        </Navbar>
        </>
    );
}