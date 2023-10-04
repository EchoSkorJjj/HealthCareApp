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
        <div className="container sidebar d-none d-lg-block">
            <Offcanvas show={show} onHide={handleClose} responsive="lg">
                <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menu Panel</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className='d-flex flex-column gap-4'>
                <div className='sidebar-content'>
                    <Nav.Link href="/homepage" className='sidebar-item'>
                        <FontAwesomeIcon icon={faHome} className="fa-1x pe-1" /><span className='sidebar-text'>Home Page</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/dashboard" className='sidebar-item'>
                        <FontAwesomeIcon icon={faTableColumns} className="fa-1x pe-1" /><span className='sidebar-text'>Dashboard</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/nutrition" className='sidebar-item'>
                        <FontAwesomeIcon icon={faSearchengin} className="fa-1x pe-1" /><span className='sidebar-text'>Nutrition Analyzer</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/recipe" className='sidebar-item'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className="fa-1x pe-1" /><span className='sidebar-text'>Search Recipe</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/services" className='sidebar-item'>
                        <FontAwesomeIcon icon={faWrench} className="fa-1x pe-1" /><span className='sidebar-text'>Services</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/contact" className='sidebar-item'>
                        <FontAwesomeIcon icon={faEnvelope} className="fa-1x pe-1" /><span className='sidebar-text'>Contact</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/profile" className='sidebar-item'>
                        <FontAwesomeIcon icon={faUser} className="fa-1x pe-1"/><span className='sidebar-text'>Profile</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <Nav.Link href="/settings" className='sidebar-item'>
                        <FontAwesomeIcon icon={faGear} className="fa-1x pe-1"/><span className='sidebar-text'>Settings</span>
                    </Nav.Link>
                </div>
                <div className='sidebar-content'>
                    <button onClick={() => setShowLogoutModal(true)} className='logout-button bg-transparent'>
                        <FontAwesomeIcon icon={faRightFromBracket} className="fa-1x pe-1"/><span className='sidebar-text'>Log Out</span>
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
