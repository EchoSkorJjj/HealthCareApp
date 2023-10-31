import React, {useEffect} from 'react';
import About from '../about/About.jsx';
import Contact from '../contact/Contact.jsx';
import ShuffleHero from '../shufflehero/ShuffleHero.jsx';
import Card from '../../components/card/Card';
import World from '../world/World.jsx';
import Review from '../review/Review.jsx';

export default function Home() {
    console.log(import.meta.env.VITE_GOOGLE_CLIENT_ID);
    console.log(import.meta.env.VITE_GITHUB_CLIENT_ID);

    return (
        <div className='container-fluid px-0 mx-0 fadein-style'>
            <ShuffleHero />
            <About />
            <Card />       
            <World />
            <Review />
            {/* <Contact /> */}
            
        </div>
    )
}