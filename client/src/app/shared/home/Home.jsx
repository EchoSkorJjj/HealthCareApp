import React, {useEffect} from 'react';
import About from '../about/About.jsx';
import Features from '../features/Features.jsx';
import Contact from '../contact/Contact.jsx';
import ShuffleHero from '../shufflehero/ShuffleHero.jsx';
// import Threejs from '../threejs/Threejs.jsx';
import Card from '../../components/card/Card';

export default function Home() {

    return (
        <div className='container-fluid px-0 mx-0 fadein-style'>
            <ShuffleHero />
            <Card />
            <About />
            <Features />
            <Contact />
        </div>
    )
}