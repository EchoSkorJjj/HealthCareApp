import {react} from 'react';
import '../../../assets/styles/private_styles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Card, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import nutritionShareImage from './images/Nutrition_share.jpg'
import Exercise from './images/exercise1.jpg'
import Recipe from './images/recipe_analyis.jpg'
import Charts from './images/charts.jpg'

export default function Home() {
    return (
        <div className='container-fluid bg-light homepage-container px-0'>
            <div className="container w-100 h-100">
{/* edit here */}
                <div>
                    <Container>
                        <Carousel fade>
                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={nutritionShareImage} alt="First slide" />
                            <Carousel.Caption>
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Recipe} alt="First slide" />
                            <Carousel.Caption>
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Exercise} alt="First slide" />
                            <Carousel.Caption>
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Charts} alt="First slide" />
                            <Carousel.Caption>
                                <h5>Fourth slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>
          {/* Add more Carousel items here */}
                         </Carousel>
                    </Container>
                         <br />
                </div>
{/* edit ends here. */}
            </div>
        </div>
    )
}