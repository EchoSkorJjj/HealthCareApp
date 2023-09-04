// import React from "react";
// import '../../assets/styles/Navbar.css';
// import { Dropdown } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { Trans } from 'react-i18next';
// import "bootstrap/dist/css/bootstrap.css";
// import { NavLink } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';


// export default function Navbar() {
//   return (
//     <div className="container">
//       <div className="row nav-upper col-lg-12 col-12 p-0 fixed-top d-flex flex-row align-items-center">
//         <div className="col-md-auto">
//           <Link className="navbar-brand brand-logo" to="/">
//             <img src={require('../../assets/images/logo.png')} height="100" width="200" alt="logo" className="rounded mx-auto d-block" />
//           </Link>
//         </div>
//         <div className="col-md-auto">
//           <button className="sidebar-toggler" type="button">
//             <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
//               <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
//             </svg>
//           </button>
//         </div>
//         <div className="col-md-auto">
//           <form className="d-flex" role="search">
//             <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
//             <button className="btn btn-outline-success" type="submit">Search</button>
//           </form>
//         </div>
//         <div className="col-sm-5">
//           <ul className="navbar-nav flex-row justify-content-end">
//             <li className="nav-item">
//               <a className="nav-link active mx-2" aria-current="page" href="#">Home</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link mx-2" href="#">About Us</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link mx-2" href="#">Contact Us</a>
//             </li>
//             <li className="nav-item dropdown">
//               <a className="nav-link dropdown-toggle mx-2" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                 Dropdown link
//               </a>
//               <ul className="dropdown-menu">
//                 <li><a className="dropdown-item" href="#">Action</a></li>
//                 <li><a className="dropdown-item" href="#">Another action</a></li>
//                 <li><a className="dropdown-item" href="#">Something else here</a></li>
//               </ul>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }


import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavBar() {
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
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/support">Support</Nav.Link>
                  <Nav.Link href="/user-pages/login">Log In</Nav.Link>
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