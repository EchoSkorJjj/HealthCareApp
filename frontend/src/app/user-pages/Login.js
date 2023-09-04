import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../../assets/styles/Register.css'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [iconClicked, setIconClicked] = useState({
      passIcon: false
    })
    const [keepSignedIn, setSignedIn] = useState(false);

    const [validated, setValidated] = useState(false);

    const [loginForm, setForm] = useState({
        usernameOrEmail: "",
        password: "",
        keepSignedIn
    })

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
        
        const loginUser = {...loginForm};

        try {
            const response = await fetch("http://localhost:3500/api/account/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(loginUser),
            });

            if (response.ok) {
              const { accessToken, refreshToken } = await response.json();
               // Access the login function from the context
              login(accessToken, refreshToken);
        
              setForm({ usernameOrEmail: "", password: "" });
              navigate("/");
            } else {
              try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message; // Assuming the error message is stored in a "message" field
                window.alert(`Login failed: ${errorMessage}`);
              } catch (error) {
                window.alert("An error occurred while logging in."); // Fallback if unable to parse error response
              }
            }
        } catch(error) {
            window.alert(error);
        }
    }

    return (
    <Container fluid className="col-lg-5 mt-5">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3 border border-primary">
        <Form.Group as={Row} className="mb-3" controlId="validationCustomUsername">
          <Form.Label column sm={2}>Username</Form.Label>
          <Col sm={10}>
          <InputGroup hasValidation>
            <FloatingLabel
                controlId="floatingInput"
                label="Username"
                className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Username"
                required
                onChange={(e) => updateForm({usernameOrEmail: e.target.value})}
              />
              <div className="input-icon mt-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
             </div>
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="validationCustomPassword">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
          <InputGroup hasValidation>
            <FloatingLabel
              controlId="floatingPassword"
              label="Password"
              className="mb-3"
            >
              <Form.Control 
                type={iconClicked.passIcon ? "text" : "password"}
                required
                placeholder="Password"
                onChange={(e) => updateForm({password: e.target.value})}
              />
              <div className="input-icon mt-3" onClick={togglePassVisibility}>
                {iconClicked.passIcon && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                    </svg>
                )}
                {!iconClicked.passIcon && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
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
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
            <Col sm={{ span: 4, offset: 2 }}>
            <Form.Check label="Remember me" onChange={() => setSignedIn(!keepSignedIn)} />
            </Col>
            <Col sm={{ span: 4, offset: 2 }} className="text-end">
            <Link to='/user-pages/forgotpassword' className="auth-link text-black">Forgot password?
            </Link>
            </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 10, offset: 2 }} className="text-center d-grid">
          <Button size="lg" type="submit">Sign in</Button>
        </Col>
        </Form.Group>
        <div className="text-center font-weight-light mt-5">
            Don't have an account? <Link to="/user-pages/register" className="text-primary">Create</Link>
        </div>
      </Form>
      </Container>
    )
}