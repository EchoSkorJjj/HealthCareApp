import React, {useEffect} from 'react';
import About from '../about/About.jsx';
import Features from '../features/Features.jsx';
import Contact from '../contact/Contact.jsx';
import GetStarted from '../getstarted/GetStarted.jsx';

export default function Home() {
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, []);

    return (
        <div className='container'>
            <GetStarted />
            <section id="about-us-section">
                <About />
            </section>
            <section id="features-section">
                <Features />
            </section>
            <section id="contact-us-section">
                <Contact />
            </section>
        </div>
    )
}