import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState, useCallback, useEffect, useRef} from "react";
import { Form, Button, Container, Row, Col, InputGroup, FloatingLabel } from "react-bootstrap";
import '../../../assets/styles/public_styles/Register.css'
import '../../../assets/styles/public_styles/Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../../../features/localStorage'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import useProfileStore from '../../../features/store/ProfileStore';

export default function Login() {
    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const setProfileData = useProfileStore((state) => state.setProfileData)

    const navigate = useNavigate();

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

    function saveProfileData(profileData) {
      setProfileData({
        username: profileData.username, 
        fullname: profileData.fullName, 
        age: profileData.age, 
        bio: profileData.bio,
        gender: profileData.gender, 
        email: profileData.email,
        profilePicture: profileData.profilePicture
      })
    }

    const googleLogin = useCallback(() => {
      setIsGoogleAuthenticated(true);
    }, [setIsGoogleAuthenticated]);

    const googleAuth = useGoogleLogin({
      onSuccess: async ({ code }) => {
        try {
          const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
          const response = await axios.post(`${baseUrl}/api/auth/google/callback`, {
            code,
          }, {
            withCredentials: true,
          });
          if (response.status === 200) {
            const dataResponse = response.data
            const profileData = dataResponse.profile;
            saveProfileData(profileData);
            googleLogin();
            navigate("/homepage");
          } else {
            try {
              const errorResponse = await response.json();
              const errorMessage = errorResponse.message; 
              window.alert(`Login failed: ${errorMessage}`);
            } catch (error) {
              window.alert("An error occurred while logging in."); 
            }
          }
        } catch (error) {
          window.alert("Error:", error);
        }
      },
      onError: (error) => {
        window.alert("Google Login Error:", error);
      },
      flow: 'auth-code',
    });

    const githubLogin = useCallback(() => {
      setIsGithubAuthenticated(true);
    }, [setIsGithubAuthenticated]);
   
    function initiateGitHubLogin() {
      const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`;
      window.location.href = githubAuthUrl;
    };  

    const handleGitHubCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get('code');
  
      if (code) {
        try {
          const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
          const response = await fetch(`${baseUrl}/api/auth/github/callback`, {
            method: 'POST',
            body: JSON.stringify({ code }),
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
          });
  
          if (response.ok) {
            const dataResponse = await response.json();
            const profileData = dataResponse.profile;
            saveProfileData(profileData);
            githubLogin();
            navigate("/homepage");
          } else {
            try {
              const errorResponse = await response.json();
              const errorMessage = errorResponse.message; 
              window.alert(`Login failed: ${errorMessage}`);
            } catch (error) {
              window.alert("An error occurred while logging in."); 
            }
          }
        } catch (error) {
          console.error('Error during GitHub token exchange:', error);
        } 
      }
    };

    // This is to prevent useEffect and handleGitHubCallback from being called twice.
    const callGithub = useRef(true);
    useEffect(() => {
      if (callGithub.current) {
        callGithub.current = false;
        handleGitHubCallback();
      }
    }, []);  
    
    const login = useCallback(() => {
      setIsAuthenticated(true);
    }, [setIsAuthenticated]);

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
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            const response = await fetch(`${baseUrl}/api/auth/login`, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...loginUser,
              }),
              credentials: 'include',
            });

            if (response.ok) {
              const dataResponse = await response.json();
              const profileData = dataResponse.profile;
              saveProfileData(profileData);
              login();
              setForm({ usernameOrEmail: "", password: "" });
              navigate("/homepage");
            } else {
              try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message; 
                window.alert(`Login failed: ${errorMessage}`);
              } catch (error) {
                window.alert("An error occurred while logging in."); 
              }
            }
        } catch(error) {
            window.alert(error);
        }
    }

    return (
    <Container fluid className="col-lg-5 col-md-10 col-sm-11 py-5 mt-auto login-container fadein-style">
      <Form noValidate validated={validated} onSubmit={handleSubmit} className="p-3">
        <Form.Group className="mb-3">
          <Form.Label className="text-center fw-bold fs-3 text-primary">Log In</Form.Label>
        </Form.Group>
        <Form.Group className="d-flex flex-sm-row flex-column">
          <Form.Label className="d-flex justify-content-start align-items-start col-3">Username</Form.Label>
          <div className="flex-fill">
          <InputGroup hasValidation className="d-flex align-items-center">
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
              <div className="input-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                </svg>
             </div>
              <Form.Control.Feedback type="invalid" className="text-start">
                Please choose a username.
              </Form.Control.Feedback>
              <Form.Control.Feedback className="text-start">Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="d-flex flex-sm-row flex-column">
          <Form.Label className="d-flex justify-content-start align-items-start col-3">Password</Form.Label>
          <div className="flex-fill">
          <InputGroup hasValidation className="d-flex align-items-center">
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
              <div className="input-icon" onClick={togglePassVisibility}>
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
              <Form.Control.Feedback type="invalid" className="text-start">
                Please provide a password.
              </Form.Control.Feedback>
              <Form.Control.Feedback className="text-start">Looks good!</Form.Control.Feedback>
            </FloatingLabel>
          </InputGroup>
          </div>
        </Form.Group>
        <Form.Group className="mb-3 d-flex flex-sm-row flex-column" controlId="formHorizontalCheck">
            <div className="p-2 flex-fill d-flex justify-content-start">
            <Form.Check label="Remember me" onChange={() => setSignedIn(!keepSignedIn)} />
            </div>
            <div className="p-2 flex-fill d-flex justify-content-sm-end justify-content-start">
            <Link to='/forgotpassword' className="auth-link text-black">Forgot password?
            </Link>
            </div>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col className="text-center d-grid">
            <Button size="lg" type="submit">Sign in</Button>
          </Col>
        </Form.Group>
        <div className="text-center font-weight-light mt-5">
            Don't have an account? <Link to="/register" className="text-primary">Create</Link>
        </div>
        <div className="text-center font-weight-light mt-3">
          Or sign in with
          <hr className="my-1" />
        </div>
      </Form>
      <div className='d-flex flex-column'>
        <div className="font-weight-light mt-2 flex-fill d-flex gap-2">
          <GoogleLoginButton className="d-flex justify-content-center rounded-pill border border-primary" onClick={() => googleAuth()} />
        </div>
        <div className="font-weight-light mt-2 flex-fill d-flex gap-2">
          <GithubLoginButton className="d-flex justify-content-center rounded-pill" onClick={initiateGitHubLogin} />
        </div>
      </div>
      </Container>
    )
}