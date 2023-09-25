import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {

    const [validated, setValidated] = useState(false);
    const [emailForm, setForm] = useState({
        email: "",
    })

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const form =e.currentTarget;
        if (form.checkValidity() === false) {
          e.stopPropagation();
          setValidated(true);
          return;
        }

        const passReset = {...emailForm};

        try {
            const response = await fetch("http://localhost:3500/api/account/requestPasswordReset", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...passReset,
                }),
            });

            if (response.ok) {
                setForm({ email: ""});
                const emailResponse = await response.json();
                window.alert(emailResponse.message);
            } else {
                try {
                    const errorResponse = await response.json();
                    const errorMessage = errorResponse.message;
                    window.alert(`Password reset request failed: ${errorMessage}`)
                } catch(error) {
                    window.alert("An error occured while requesting password reset")
                }
            }
        } catch(error) {
            window.alert(error);
        }
    }

    return (
        <Container fluid className="col-lg-5 col-md-10 col-sm-11 my-auto">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className="text-center fw-bold fs-3">Forgot Password?</Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>Email</Form.Label>
                <Col sm={10}>
                <InputGroup hasValidation>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control 
                        type="text" 
                        placeholder="Email" 
                        required
                        onChange={(e) => updateForm({email: e.target.value})}
                        />
                        <div className="input-icon mt-3">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                        </svg>
                        </div>
                        <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                        </Form.Control.Feedback>
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                    <Col sm={{ span: 4, offset: 1 }} className="text-center">
                    <Link to='/login' className="text-primary">Back to Log In?
                    </Link>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }} className="text-center d-grid">
                    <Button size="lg" type="submit">Request Reset</Button>
                </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}
