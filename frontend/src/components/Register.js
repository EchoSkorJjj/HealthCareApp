import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../styles/Register.css'

export default function Register() {
    const navigate = useNavigate();

    const [registerForm, setForm] = useState({
        username: "",
        fullname: "",
        email: "",
        passwordHash: "",
    })

    const [checkPass, setPass] = useState({
        confirmPass: "",
        confirmPassVisible: false
    })
    
    const [submitClicked, setSubmitClicked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);
    const [iconClicked, setIconClicked] = useState({
        confirmIcon: false,
        passIcon: false
    });

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}; // update previous value with new value
        });
    }

    function toggleconfirmPassVisibility() {
        setIconClicked((prev) => {
            return { ...prev, confirmIcon: !prev.confirmIcon };
        });
    }

    function togglePassVisibility() {
        setIconClicked((prev) => {
            return { ...prev, passIcon: !prev.passIcon };
        });
    }

    async function onSubmit(e) {
        e.preventDefault();

        if (registerForm.passwordHash !== checkPass.confirmPass) {
            setSubmitClicked(true); // Set submit button clicked
            return; // Don't proceed if passwords don't match
        }

        if (!termsChecked) { // Check if terms and conditions are not checked
            setSubmitClicked(true);
            return;
        }
    
        // When a post request is sent to the create url, we'll add a new record to the database.
        const newUser = { ...registerForm };
        
        try {
            await fetch("http://localhost:3500/api/account/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });
            setForm({ name: "", position: "", level: "" });
            navigate("/login");
        }  catch(error) {
            window.alert(error);
            }
    }

    return (
        <main className="container">
            <Form className="formStyle" onSubmit={onSubmit}>
                <h1 className="form-header">Registration</h1>
                <Form.Group className="input-container">
                    <input 
                    type="text" 
                    value={registerForm.username} 
                    className={registerForm.username ? "has-input" : ""} 
                    onChange={(e) => updateForm({username: e.target.value})}
                    />
                    <Form.Label>
                        Username
                    </Form.Label>
                    <div className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                    </div>
                    {submitClicked && !registerForm.username && (
                        <div className="alert-required text-danger">Username is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type="text"
                    value={registerForm.fullname} 
                    className={registerForm.fullname ? "has-input" : ""} 
                    onChange={(e) => updateForm({fullname: e.target.value})}
                    />
                    <Form.Label>
                        Fullname
                    </Form.Label>
                    <div className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                    </div>
                    {submitClicked && !registerForm.fullname && (
                        <div className="alert-required text-danger">Fullname is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type="text"
                    value={registerForm.email} 
                    className={registerForm.email ? "has-input" : ""} 
                    onChange={(e) => updateForm({email: e.target.value})}
                    />
                    <Form.Label>
                        Email
                    </Form.Label>
                    <div className="input-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                        </svg>
                    </div>
                    {submitClicked && !registerForm.email && (
                        <div className="alert-required text-danger">Email is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type={iconClicked.passIcon ? "text" : "password"}
                    value={registerForm.passwordHash} 
                    className={registerForm.passwordHash ? "has-input" : ""} 
                    onChange={(e) => updateForm({passwordHash: e.target.value})}
                    />
                    <Form.Label>
                        Password
                    </Form.Label>
                    <div className="input-icon" onClick={togglePassVisibility}>
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
                    {submitClicked && !registerForm.passwordHash && (
                        <div className="alert-required text-danger">Password is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type={iconClicked.confirmIcon ? "text" : "password"}
                    value={checkPass.confirmPass} 
                    className={checkPass.confirmPass ? "has-input" : ""} 
                    onChange={(e) => {setPass({ confirmPass: e.target.value })}}
                    />
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <div className="input-icon" onClick={toggleconfirmPassVisibility}>
                        {iconClicked.confirmIcon && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
                                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
                                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
                            </svg>
                        )}
                        {!iconClicked.confirmIcon && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>
                        )}
                    </div>
                    {submitClicked && !checkPass.confirmPass && (
                        <div className="alert-noconfirm text-danger">Confirm Password is required</div>
                    )}
                    {submitClicked && registerForm.passwordHash !== checkPass.confirmPass && checkPass.confirmPass && (
                        <div className="alert-notmatch text-danger">Passwords do not match</div>
                    )}
                </Form.Group>
                <Form.Group className="input-checkbox"> 
                    <div className="checkbox-container">
                        <Form.Check
                            type="checkbox"
                            label="I accept the Terms of Use & Privacy Policy"
                            onChange={() => setTermsChecked(!termsChecked)}
                        />
                    </div>
                    {submitClicked && !termsChecked && (
                        <div className="alert-message text-danger">You must accept the Terms of Use & Privacy Policy</div>
                    )}
                </Form.Group>
                <Form.Group>
                <input
                    type="submit"
                    value="Sign Up"
                    className="input-button"
                    />
                </Form.Group>
            </Form>
        </main>
    )
}