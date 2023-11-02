import {react, useEffect} from 'react';
import '../../../assets/styles/private_styles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Card, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import nutritionShareImage from './images/Nutrition_share.jpg'
import Exercise from './images/exercise1.jpg'
import Recipe from './images/nutrition.png'
import Charts from './images/googlefit.jpg'
import 'aos/dist/aos.css';
import AOS from 'aos';


export default function Home() {

    const blurryStyle = {
        filter: "blur(2.5px)", // Set the filter to grayscale
      };

      const cardStyle = {
        background: 'linear-gradient(90deg, #14da8f, #1dd39c, #2af0b3)',
        color: 'white',
        fontFamily: "'Proxima Nova', sans-serif",
        // one of the four fonts: Roboto, Lato, Open Sans, Montserrat.
      };

      const titleStyle = {
        fontWeight: 'bold',
        fontSize: '24px'
      };

      const textStyle ={
        fontSize: '16px'
      };

      useEffect(() => {
        import('aos').then((AOS) => {
          AOS.init({
            offset: 200, // Set the global offset to 200 pixels
            duration: 2000, // Set the global duration to 2000 milliseconds
          });
        });
      }, []);




    return (
        <div className='container-fluid bg-light homepage-container px-0'>
            <div className="container w-100 h-100">
{/* edit here */}
                <div>
                    <Container data-aos='zoom-in'>
                        <Carousel fade controls={false} indicators={false}>
                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={nutritionShareImage} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption  className="d-flex flex-column justify-content-center" style={{ top: 0 }}>
                                <h4>Nutrition Information</h4>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Recipe} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption className="d-flex flex-column justify-content-center" style={{ top: 0 }}>
                                <h4>Recipe Analysis</h4>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Exercise} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption className="d-flex flex-column justify-content-center" style={{ top: 0 }}>
                                <h4>Smart Exercise Assistant</h4>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Charts} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption className="d-flex flex-column justify-content-center" style={{ top: 0 }}>
                                <h4>Google Fit API</h4>
                                {/* <p>Some representative placeholder content for the first slide.</p> */}
                            </Carousel.Caption>
                            </Carousel.Item>
                         </Carousel>
                    </Container>
                         <br />

                    <Container>
                        <Card style={cardStyle} data-aos='fade-left' data-aos-offset="200" data-aos-once='true' data-aos-mirror="true" data-aos-easing="ease-in-out" data-aos-anchor-placement="center-bottom">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={nutritionShareImage} alt="Card image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Nutrition Information</Card.Title>
                                            <Card.Text style={textStyle}>
                                            <ul style={{ listStyleType: 'none', padding: 20 }}>
                                                <li>Detailed nutritional information through Edamam API.</li>
                                                <li>Search for foods and retrieve its nutrition details.</li>
                                                <li>Create meal plans and track daily intake.</li>
                                            </ul>
                                            </Card.Text>
                                            <Card.Text>
                                                {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                            </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />

                    <Container>
                        <Card style={cardStyle} data-aos='fade-right' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                            <Col md={4} className="order-md-2">
                                <Card.Img src={Recipe} alt="Card image" />
                            </Col>
                        <Col md={8} className="order-md-1">
                        <Card.Body>
                            <Card.Title style={titleStyle}>Recipe Analysis</Card.Title>
                            <Card.Text style={textStyle}>
                                <ul style={{ listStyleType: 'none', padding: 20 }}>
                                    <li>Analyse recipes utilizing Edamam API</li>
                                    <li>Calculate recipe's calorie content, breakdown of nutrients</li>
                                    <li>Understand nutrition value of favorite dishes</li>
                                </ul>
                            </Card.Text>
                            <Card.Text>
                             {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                            </Card.Text>
                        </Card.Body>
                        </Col>
                            </Row>
                        </Card>

                    </Container>
                    <br />
                    <Container>
                        <Card style={cardStyle} data-aos='fade-left' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={Exercise} alt="Card image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Smart Exercise Assistant</Card.Title>
                                            <Card.Text style={textStyle}>
                                                <ul style={{ listStyleType: 'none', padding: 20 }}>
                                                    <li>Track right posture of exercise through TensorFlow</li>
                                                    <li>Provide counter to keep track of exercise done</li>
                                                    <li>Ensures proper technique of exercise</li>
                                                </ul>
                                            </Card.Text>
                                            <Card.Text>
                                                {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                                            </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />
                    <Container>
                        <Card style={cardStyle} data-aos='fade-right' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                            <Col md={4} className="order-md-2">
                                <Card.Img src={Charts} alt="Card image" />
                            </Col>
                        <Col md={8} className="order-md-1">
                        <Card.Body>
                            <Card.Title style={titleStyle}>Google Fit API</Card.Title>
                            <Card.Text style={textStyle}>
                                <ul style={{ listStyleType: 'none', padding: 20 }}>
                                    <li>Monitor your daily output</li>
                                    <li>Calculate calories burned</li>
                                    <li>Personalised dashboard about health goals</li>
                                </ul>
                            </Card.Text>
                            <Card.Text>
                             {/* <small className="text-muted">Last updated 3 mins ago</small> */}
                            </Card.Text>
                        </Card.Body>
                        </Col>
                            </Row>
                        </Card>
                    </Container>
                </div>
{/* edit ends here. */}
            </div>
        </div>
    )
}