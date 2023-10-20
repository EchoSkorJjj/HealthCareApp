import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import review1 from '../../../assets/images/review1.png';
import review2 from '../../../assets/images/review2.png';
import review3 from '../../../assets/images/review3.png';
import '../../../assets/styles/shared_styles/Review.css';

export default function Review() {
  var settings = {
    dots: true, // if you want the dots navigation
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <section className='review_container'>
        <div className="container sliders">
            <h2 className="section__title fw-bold fs-1">Reviews</h2>
            <Slider {...settings}>
                <div>
                    <div className="slide__item">
                        <div className="slide__img-01"><img src={review1} alt="" /></div>

                        <h4>Homeless Person</h4>
                        <p>"Since I started using this website, I've noticed a significant improvement in my mental clarity and energy levels. The daily wellness tips are a game-changer!"</p>
                    </div>
                </div>
                <div>
                    <div className="slide__item">
                        <div className="slide__img-02"><img src={review2} alt="" /></div>

                        <h4>Not Homeless</h4>
                        <p>"Absolutely love this app! It helps me track my nutrition and exercise, keeping me accountable and healthy. Couldn't ask for a better health partner!"</p>
                    </div>
                </div>
                <div>
                    <div className="slide__item">
                        <div className="slide__img-03"><img src={review3} alt="" /></div>

                        <h4>Maybe Homeless</h4>
                        <p>"Can't recommend this app enough! The community is supportive, the workouts are challenging, and the recipes are delicious and healthy. It's everything I need in one place."</p>
                    </div>
                </div>
            </Slider>
        </div>
      </section>
    </>
  );
}
