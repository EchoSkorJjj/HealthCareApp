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
        confirmPass: ""
    })
    
    const [submitClicked, setSubmitClicked] = useState(false);
    const [termsChecked, setTermsChecked] = useState(false);

    function updateForm(value) {
        return setForm((prev) => {
            return {...prev, ...value}; // update previous value with new value
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
                    {submitClicked && !registerForm.email && (
                        <div className="alert-required text-danger">Email is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type="password"
                    value={registerForm.passwordHash} 
                    className={registerForm.passwordHash ? "has-input" : ""} 
                    onChange={(e) => updateForm({passwordHash: e.target.value})}
                    />
                    <Form.Label>
                        Password
                    </Form.Label>
                    {submitClicked && !registerForm.passwordHash && (
                        <div className="alert-required text-danger">Password is required</div>
                    )}
                </Form.Group>
                <Form.Group className="input-container">
                    <input 
                    type="password"
                    value={checkPass.confirmPass} 
                    className={checkPass.confirmPass ? "has-input" : ""} 
                    onChange={(e) => {setPass({ confirmPass: e.target.value })}}
                    />
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
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