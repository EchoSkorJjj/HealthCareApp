import React, {useEffect} from 'react';
import About from '../about/About';
import Features from '../features/Features';
import Contact from '../contact/Contact';
import GetStarted from '../getstarted/GetStarted';

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
        <div>
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