import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import register from '../styles/Register.css';

export default function Register() {
    const [registerForm, setForm] = useState({
        username: "",
        fullname: "",
        email: "",
        passwordHash: "",
    })
    const navigate = useNavigate();

    function updateForm(value) {
        // The (prev) parameter in this callback is automatically populated by 
        // React with the current state value, which is the state value when the 
        // setForm function is called. You don't need to explicitly provide (prev); 
        // React handles that for you. This is possible due to the closure created by 
        // the component's functional scope.
        return setForm((prev) => {
            return {...prev, ...value}; // update previous value with new value
        });
    }

    return (
        <div className="formStyle">
            <form>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="username"
                    value={registerForm.username}
                    onChange={(e) => updateForm({username: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="fullname"
                    value={registerForm.fullname}
                    onChange={(e) => updateForm({fullname: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="name@example.com"
                    value={registerForm.email}
                    onChange={(e) => updateForm({email: e.target.value})}
                    />
                </div>
                <div className="form-group">
                    <input 
                    type="password" 
                    className="form-control" 
                    placeholder="password"
                    value={registerForm.passwordHash}
                    onChange={(e) => updateForm({passwordHash: e.target.value})}
                    />
                </div>
            </form>
        </div>
    )
}