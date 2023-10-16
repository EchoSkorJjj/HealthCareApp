import React, {useEffect} from 'react';
import About from '../about/About.jsx';
import Contact from '../contact/Contact.jsx';
import ShuffleHero from '../shufflehero/ShuffleHero.jsx';
import Card from '../../components/card/Card';
import World from '../world/World.jsx';

export default function Home() {

    return (
        <div className='container-fluid px-0 mx-0 fadein-style'>
            <ShuffleHero />
            <About />
            <Card />
            <World />
            <Contact />
        </div>
    )
}