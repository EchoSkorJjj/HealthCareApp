import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Container, Form, Offcanvas, Button, Modal } from 'react-bootstrap';  
import { Navigate, useNavigate } from "react-router-dom";

export default function NavBar({ isAuthenticated }) {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  async function handleLogout() {
    try {
      const response = await fetch('http://localhost:3500/api/account/logout', {
        method: 'GET',
        credentials: 'include',
      });
  
      if (response.ok) {
        setAuthenticated(false);
        console.log('Logged out successfully');
        navigate('/user-pages/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      setAuthenticated(true);
    }
  }, [isAuthenticated]);
  
  
  return (
    <>
      {['lg'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <img
                alt=""
                src={require('../../assets/images/logo.png')}
                width="70"
                height="70"
                className="d-inline-block align-top"
              />{' '}
              <span className='fs-1'>Logo</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="/user-pages/home">Home</Nav.Link>
                  <Nav.Link href="/nutrition/nutritionanalyzer">Nutrition Analyzer</Nav.Link>
                  <Nav.Link href="/recipe">Recipe Search</Nav.Link>
                  <Nav.Link href="/support">Support</Nav.Link>
                  {authenticated ? (
                    <>
                      <Nav.Link onClick={() => setShowLogoutModal(true)}>Log Out</Nav.Link>
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
                    </>
                  ) : (
                    <>
                      <Nav.Link href="/user-pages/login">Log In</Nav.Link>
                      <Nav.Link href="/user-pages/register">Sign Up</Nav.Link>
                    </>
                  )}
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}