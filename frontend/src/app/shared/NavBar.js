import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, Container, Form, Offcanvas, Button, Modal, Row, Col, Badge } from 'react-bootstrap';  
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
      <Navbar bg="light" data-bs-theme="light">
        <Container fluid>
          <Navbar.Brand href="#">
            <img
              alt=""
              src={require('../../assets/images/logo.png')}
              width="70"
              height="70"
              className="d-inline-block align-top"
            />{' '}
            <span className='fs-1'>Logo Name</span>
          </Navbar.Brand>
          <Row className="justify-content-end gap-3">
            <Col className="align-self-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
              </svg>
            </Col>
            <Col className="align-self-center position-relative">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
              </svg>
              <Badge bg="danger" pill className="position-absolute top-0 start-70 translate-middle p-2">1</Badge>
            </Col>
            <Col className="align-self-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z"/>
              </svg>
            </Col>
          </Row>
        </Container>
      </Navbar>
      
      <Navbar key='md' expand='md' className="bg-body-tertiary mb-3">
        <Container fluid>
          
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
                <Nav.Link href="/user-pages/home">Home</Nav.Link>
                <Nav.Link href="/user-pages/dashboard">Dashboard</Nav.Link>
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
                  </>
                )}
                <NavDropdown
                  title="Food Tools"
                  id={`offcanvasNavbarDropdown-expand-md`}
                >
                  <NavDropdown.Item href="/nutrition/nutritionanalyzer">Nutrition Analyzer</NavDropdown.Item>
                  <NavDropdown.Item href="/recipe">
                    Search Recipe
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
                <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button variant="outline-success">Search</Button>
              </Form>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
    </>
  );
}