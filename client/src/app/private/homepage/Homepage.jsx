import {react, useEffect} from 'react';
import '../../../assets/styles/private_styles/Homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Carousel, Card, Row, Col } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import nutritionShareImage from './images/Nutrition_share.jpg'
import Exercise from './images/exercise1.jpg'
import Recipe from './images/recipe_analyis.jpg'
import Charts from './images/charts.jpg'
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
                            <Carousel.Caption>
                                <h5>Nutrition Information</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Recipe} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption>
                                <h5>Recipe Analysis</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Exercise} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption>
                                <h5>Exercise Assistant</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>

                            <Carousel.Item interval={5000}>
                                <img className="d-block w-100" src={Charts} alt="First slide" style={blurryStyle}/>
                            <Carousel.Caption>
                                <h5>Google Fit API</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </Carousel.Caption>
                            </Carousel.Item>
                         </Carousel>
                    </Container>
                         <br />

                    <Container>
                        <Card style={cardStyle} data-aos='fade-down-left' data-aos-offset="200" data-aos-once='true' data-aos-mirror="true" data-aos-easing="ease-in-out" data-aos-anchor-placement="center-bottom">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={nutritionShareImage} alt="Card image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Nutrition Information</Card.Title>
                                            <Card.Text style={textStyle}>
                                                Description on the Feature
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />

                    <Container>
                        <Card style={cardStyle} data-aos='fade-down-right' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Recipe Analysis</Card.Title>
                                            <Card.Text style={textStyle}>
                                                Description on the Feature
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Text>
                                    </Card.Body>
                                </Col>
                                <Col md={4}>
                                    <Card.Img src={Recipe} alt="Card image" />

                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />
                    <Container>
                        <Card style={cardStyle} data-aos='fade-up-left' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={Exercise} alt="Card image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Exercise Assistant</Card.Title>
                                            <Card.Text style={textStyle}>
                                                Description on the Feature
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Last updated 3 mins ago</small>
                                            </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Container>
                    <br />
                    <Container>
                        <Card style={cardStyle} data-aos='fade-up-right' data-aos-offset="200" data-aos-once="true" data-aos-mirror="true" data-aos-easing="ease-in-out">
                            <Row className="g-0">
                                <Col md={4}>
                                    <Card.Img src={Charts} alt="Card image" />
                                </Col>
                                <Col md={8}>
                                    <Card.Body>
                                        <Card.Title style={titleStyle}>Google Fit API</Card.Title>
                                            <Card.Text style={textStyle}>
                                                Description on the Feature
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">Last updated 3 mins ago</small>
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