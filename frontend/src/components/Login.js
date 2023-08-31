import React, {useState} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import '../styles/Login.css';

export default function Login() {
    const navigate = useNavigate();

    return (
        <div>
            Hello Login Page
        </div>
    )
}