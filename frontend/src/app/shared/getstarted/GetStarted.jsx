import React from 'react';
import { Link } from 'react-router-dom';

export default function GetStarted() {
  return (
    <div className="container bg-light py-5">
        <div className="container text-center">
          <h1>Get Started</h1>
          <div className="d-grid gap-2 d-md-flex justify-content-md-center">
              <Link to="/register" className="btn btn-primary btn-lg btn-block me-md-2">
                  Let's Get Started
              </Link>
              <Link to="/login" className="btn btn-secondary btn-lg btn-block">
                  Have an account?
              </Link>
          </div>
        </div>
    </div>
  );
}
