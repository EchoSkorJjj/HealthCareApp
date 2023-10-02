import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {useState} from "react";
import { faHome, faWrench, faUser, faEnvelope, faGear, faRightFromBracket, faTableColumns, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons';
import '../../../assets/styles/private_styles/Sidebar.css'
import {Offcanvas, Nav, Modal, Button } from "react-bootstrap";

export default function Sidebar({show, handleClose, handleLogout}) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const onLogoutClick = () => {
        handleLogout();
      };
    return (
        <div className="sidebar d-none d-lg-block">
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column gap-4">
                <div className="row">
                    <Nav.Link href="/homepage" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faHome} className="me-2 fa-1x" /><span className='sidebar-text'>Home Page</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/dashboard" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faTableColumns} className="me-2 fa-1x" /><span className='sidebar-text'>Dashboard</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/nutrition" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faSearchengin} className="me-2 fa-1x" /><span className='sidebar-text'>Nutrition Analyzer</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/recipe" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="me-2 fa-1x" /><span className='sidebar-text'>Search Recipe</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/services" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faWrench} className="me-2 fa-1x" /><span className='sidebar-text'>Services</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/contact" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2 fa-1x" /><span className='sidebar-text'>Contact</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/profile" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faUser} className="me-2 fa-1x"/><span className='sidebar-text'>Profile</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <Nav.Link href="/settings" className='sidebar-item d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faGear} className="me-2 fa-1x"/><span className='sidebar-text'>Settings</span>
                    </Nav.Link>
                </div>
                <div className="row">
                    <button onClick={() => setShowLogoutModal(true)} className='logout-button bg-transparent d-flex mx-4 fs-6 align-items-center'>
                        <FontAwesomeIcon icon={faRightFromBracket} className="me-2 fa-1x"/><span className='sidebar-text'>Log Out</span>
                    </button>
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
                </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
