import React, { useEffect } from 'react';
import '../../../assets/styles/shared_styles/404.css';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className='d-flex justify-content-center align-items-center w-100 flex-column error-container'>
            <div className="error-page">
                <div>
                <h1 data-h1="404">404</h1>
                <p data-p="NOT FOUND">NOT FOUND</p>
                </div>
            </div>
            <Link to='/dashboard' className="back">GO BACK</Link>
        </div>
    );
};

export default NotFoundPage;
