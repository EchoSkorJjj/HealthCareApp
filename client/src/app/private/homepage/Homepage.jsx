import {react} from 'react';
import '../../../assets/styles/private_styles/Homepage.css';

export default function Home() {
    return (
        <div className='container-fluid bg-light homepage-container px-0'>
            <div className="container w-100 h-100">
                <div className="row h-100 align-items-center justify-content-center text-center">
                    <div className="col-lg-8">
                        <h1 className="font-weight-light">Welcome to the Health Care App</h1>
                        <p className="lead text-muted">This is a application which helps you to manage your diet, track your daily calories and much more</p>
                    </div>
                </div>
            </div>
        </div>
    )
}