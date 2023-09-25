import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'

export default function Contact() {
  return (
    <section className="bg-light py-5 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Contact Us</h1>
            <p className="text-center">Get in touch with us</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Contact Information</h2>
            <p>
              <strong>Email:</strong> contact@example.com
            </p>
            <p>
              <strong>Phone:</strong> +123 456 7890
            </p>
            <p>
              <strong>Address:</strong> 123 Main Street, City, Country
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="contact-image.jpg"
              alt="Contact Information"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Follow Us on Social Media</h2>
            <div className="social-icons d-flex gap-3">
              <a href="#" className="mr-3">
                <FontAwesomeIcon icon={faFacebook} className='fa-2x'/>
              </a>
              <a href="#" className="mr-3">
                <FontAwesomeIcon icon={faTwitter} className='fa-2x'/>
              </a>
              <a href="#" className="mr-3">
                <FontAwesomeIcon icon={faLinkedin} className='fa-2x'/>
              </a>
              <a href="#">
                <FontAwesomeIcon icon={faInstagram} className='fa-2x'/>
              </a>
            </div>
          </div>
          <div className="col-md-6">
            <img
              src="social-media-image.jpg"
              alt="Social Media Links"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
