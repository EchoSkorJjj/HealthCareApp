import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import { Form, Button, Container, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import '../../../assets/styles/public_styles/ResetPass.css';
import { Navigate, useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    const [resetPassForm, setForm] = useState({
        newPassword: "",
    })

    const [iconClicked, setIconClicked] = useState({
        passIcon: false
    })
    const [validated, setValidated] = useState(false);

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}; 
        });
    }

    function togglePassVisibility() {
        setIconClicked((prev) => {
            return { ...prev, passIcon: !prev.passIcon };
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

        const resetPass = {...resetPassForm};

        try {
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            const response = await fetch(`${baseUrl}/api/account/resetPassword`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...resetPass,
                    token: token,
                  }),
            });

            if (response.ok) {
                setForm({newPassword: "", token: ""})
                window.alert("Password reset successful.");
                navigate("/login");
            } else {
                try {
                  const errorResponse = await response.json();
                  const errorMessage = errorResponse.message; 
                  window.alert(`Reset password failed: ${errorMessage}`);
                } catch (error) {
                  window.alert("An error occurred while resetting password."); 
                }
            }
        } catch(error) {
            window.alert(error);
        }
    }

    return (
        <Container fluid className="col-lg-5 col-md-10 col-sm-11 my-auto resetpass-container">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label className="text-center fw-bold fs-3 text-primary">Password Reset</Form.Label>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Form.Label column sm={2}>New Password</Form.Label>
                <Col sm={10}>
                <InputGroup hasValidation>
                    <FloatingLabel
                    controlId="floatingPassword"
                    label="New Password"
                    className="mb-3"
                    >
                    <Form.Control 
                        type={iconClicked.passIcon ? "text" : "password"}
                        required
                        placeholder="New Password"
                        onChange={(e) => updateForm({newPassword: e.target.value})}
                    />
                    <div className="input-icon mt-3" onClick={togglePassVisibility}>
                        {iconClicked.passIcon && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                        )}
                        {!iconClicked.passIcon && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                        )}
                    </div>
                    <Form.Control.Feedback type="invalid">
                        Please provide a password.
                    </Form.Control.Feedback>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </FloatingLabel>
                </InputGroup>
                </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 2 }} className="text-center d-grid">
                    <Button size="lg" type="submit">Password Reset</Button>
                </Col>
                </Form.Group>
            </Form>
        </Container>
    )
}