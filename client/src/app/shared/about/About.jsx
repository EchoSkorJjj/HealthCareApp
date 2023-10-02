import React from 'react';
import illustration from '../../../assets/images/illustration-hero.svg';

export default function About() {
    return (
        <div className="container bg-light py-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <h2 className="display-4">Our Story</h2>
                        <p className="lead">
                            Welcome to our Health and Wellness platform. We are dedicated to helping you achieve your health and wellness goals by providing you with the tools and resources you need.
                        </p>
                        <p>
                            Our mission is to empower individuals to take control of their health and make informed decisions. Whether you want to track your nutrition, monitor your fitness, or connect with healthcare providers, we have you covered.
                        </p>
                        <p>
                            We believe that a healthy lifestyle is within reach for everyone, and our platform is designed to make it easier and more accessible.
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <img
                            src={illustration}
                            alt="About Us"
                            className="img-fluid rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}