import React, { useState, useCallback, useEffect, useRef } from 'react';
import '../../../assets/styles/public_styles/NewLogin.css';
import {useNavigate, useLocation} from 'react-router-dom';
import { LOGGED_IN_KEY, GOOGLE_AUTH_KEY, GITHUB_AUTH_KEY, useLocalStorage } from '../../../features/localStorage'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { GithubLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import useProfileStore from '../../../features/store/ProfileStore';
import useFitnessStore from '../../../features/store/FitnessStore';
import { FcGoogle } from 'react-icons/fc';
import { IoLogoGithub } from 'react-icons/io5';
import {IconContext} from "react-icons";

const NewLogin = () => {
    const [, setIsAuthenticated] = useLocalStorage(LOGGED_IN_KEY);
    const [, setIsGoogleAuthenticated] = useLocalStorage(GOOGLE_AUTH_KEY);
    const [, setIsGithubAuthenticated] = useLocalStorage(GITHUB_AUTH_KEY);
    const setProfileData = useProfileStore((state) => state.setProfileData)
    const setAccessToken = useFitnessStore((state) => state.setAccessToken)
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;

    const navigate = useNavigate();
    const location = useLocation();
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const activate = params.get('activate');
        
        if (activate) {
            toggleActive();
        }
    }, [location]);

    const toggleActive = () => {
        setIsActive(!isActive);
        if (isActive) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            const signInForm = document.querySelector('.sign-in');
            signInForm.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const navigateToHome = () => {
        navigate('/home');
    };

    const [loginForm, setLoginForm] = useState({
        usernameOrEmail: "",
        password: "",
    })

    function updateLoginForm(value) {
        return setLoginForm((prev) => {
            return {...prev, ...value};
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
            const response = await axios.post(`${baseUrl}/api/auth/google/callback`, {
                code,
            }, {
                withCredentials: true,
            });
            if (response.status === 200) {
                const dataResponse = response.data
                const profileData = dataResponse.profile;
                saveProfileData(profileData);
                setAccessToken(false);
                googleLogin();
                navigate("/dashboard");
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
                setAccessToken(false);
                githubLogin();
                navigate("/dashboard");
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

    async function handleLogin(e) {
        e.preventDefault();

        const loginUser = {...loginForm};

        try {
        
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
            setAccessToken(false);
            login();
            setLoginForm({ usernameOrEmail: "", password: "" });
            navigate("/dashboard");
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

    const [registerForm, setRegisterForm] = useState({
        username: "",
        fullName: "",
        email: "",
        passwordHash: "",
        otpToken: "",
    })

    const [iconClicked, setIconClicked] = useState(false);

    function togglePassVisibility() {
        setIconClicked(!iconClicked);
    }

    function updateRegisterForm(value) {
        return setRegisterForm((prev) => {
            return {...prev, ...value};
        });
    }

    async function handleSendOTP() {
        if (registerForm.email === "") {
            window.alert("Please enter your email.");
            return;
        }
        try {
        
          const response = await fetch(`${baseUrl}/request/sendOTP`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: registerForm.email }),
          });
          if (response.ok) {
            window.alert("OTP sent to your email.");
          }
        } catch (error) {
          window.alert(error);
        }
      }
  
      async function handleRegister(e) {
        e.preventDefault();
    
        if (registerForm.otpToken === "") {
          window.alert("Please verify your email.");
          return;
        }
        const newUser = { ...registerForm };
        
        try {
        
            const response = await fetch(`${baseUrl}/request/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
  
            if (response.ok) {
              setRegisterForm({ username: "", fullName: "", email: "" , passwordHash: ""});
              window.alert("Registration Successful");
              setIsActive(!isActive);
            } else {
              try {
                const errorResponse = await response.json();
                const errorMessage = errorResponse.message; 
                window.alert(`Registration failed: ${errorMessage}`);
              } catch (error) {
                window.alert("An error occurred while registering."); 
              }
            }
        }  catch(error) {
            window.alert(error);
          }
      }

    return (
        <div className="full-page-container">
            <div className='button-container'>
                <button className="back-to-home" onClick={navigateToHome}>Back to Home</button>
            </div>
            <div className={`forms-container ${isActive ? "active" : ""}`} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={handleRegister}>
                        <h1 className='sign-up-header'>Create Account</h1>
                        <div className='input-container'>
                            <input 
                            type="text" 
                            placeholder="Username" 
                            required 
                            onChange={(e) => updateRegisterForm({username: e.target.value})}
                            />
                        </div>
                        <div className='input-container'>
                            <input 
                            type="text" 
                            placeholder="Fullname" 
                            required
                            onChange={(e) => updateRegisterForm({fullName: e.target.value})}
                            />
                        </div>
                        <div className='input-container'>
                            <input 
                            type="email" 
                            placeholder="Email" 
                            required
                            onChange={(e) => updateRegisterForm({email: e.target.value})}
                            />
                        </div>
                        <div className='input-container'>
                            <input 
                            type="number" 
                            placeholder="OTP" 
                            required
                            onChange={(e) => updateRegisterForm({otpToken: e.target.value})}
                            />
                            <div className="otp-icon text-muted" onClick={handleSendOTP}>
                                Send OTP
                            </div>
                        </div>
                        <div className='input-container'>
                            <input 
                            type={iconClicked ? "text" : "password"}
                            required
                            placeholder="Password" 
                            onChange={(e) => updateRegisterForm({passwordHash: e.target.value})}
                            />
                            <div className="pass-icon" onClick={togglePassVisibility}>
                                {iconClicked && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                )}
                                {!iconClicked && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <button type='submit'>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={handleLogin}>
                        <h1>Sign In</h1>
                        <div className='row mb-3'>
                            <div className='col-6'>
                                <IconContext.Provider value={{ size: '40px' }}>
                                    <FcGoogle type='button' onClick={() => googleAuth()}/>
                                </IconContext.Provider>
                            </div>
                            <div className='col-6'>
                                <IconContext.Provider value={{ size: '40px' }}>
                                    <IoLogoGithub type='button' onClick={initiateGitHubLogin}/>
                                </IconContext.Provider>
                            </div>
                        </div>
                        <span>or use your email or username</span>
                        <div className='input-container'>
                            <input 
                            type="text" 
                            required
                            placeholder="Username Or Email" 
                            onChange={(e) => updateLoginForm({usernameOrEmail: e.target.value})}
                            />
                        </div>
                        <div className='input-container'>
                            <input 
                            type={iconClicked.passIcon ? "text" : "password"}
                            required
                            placeholder="Password"
                            onChange={(e) => updateLoginForm({password: e.target.value})} 
                            />
                            <div className="pass-icon" onClick={togglePassVisibility}>
                                {iconClicked && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                        <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                                    </svg>
                                )}
                                {!iconClicked && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                    </svg>
                                )}
                            </div>
                        </div>
                        <a href="/forgotpassword">Forget Your Password?</a>
                        <button type='submit'>Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Login through Email/Username Or Google/Github</p>
                            <button className="hidden" onClick={toggleActive}>Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, Friend!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={toggleActive}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewLogin;
