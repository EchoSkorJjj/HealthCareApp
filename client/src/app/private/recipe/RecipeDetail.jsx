import React, { useState, useEffect } from 'react';
import '../../../assets/styles/private_styles/RecipeDetail.css';
import { Rating } from 'react-simple-star-rating';
import {Modal, Form, Button} from 'react-bootstrap';
import Loader from '../../shared/loader/Loader.jsx';
import useRecipeStore from '../../../features/store/RecipeStore';

export default function RecipeDetail({ recipe, setSelectedRecipe }) {
  const setRecipeSelected = useRecipeStore((state) => state.setRecipeSelected);
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState({
    overallRating: 0,
    numRating: 0,
  })

  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    review: '',
    hasReview: false,
  })

  const [reviews, setReviews] = useState([]);

  const [show, setShow] = useState(false);

  const handleCloseReview = () => setShow(false);
  const handleShowReview = () => setShow(true);

  const [showReviews, setShowReviews] = useState(false);

  const handleShowReviewList = () => setShowReviews(true);
  const handleCloseReviewList = () => setShowReviews(false);

  function updateRating(value) {
    return setRating((prev) => {
        return {...prev, ...value};
    });
  }

  function updateReviewForm(value) {
    return setReviewForm((prev) => {
        return {...prev, ...value};
    });
  }

  const handleRating = (rate) => {
    reviewForm.rating = rate;
  }

  function removeSelectedRecipe() {
    setRecipeSelected(false);
    setSelectedRecipe(null)
  }

  async function handleSaveRecipe() {
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
    try {
      const response = await fetch(`${baseUrl}/api/recipe/saveRecipe?q=${encodeURIComponent(recipe.label)}`,
        {
          method: 'POST',
          credentials: 'include',
        }
      );
      const data = await response.json();
      window.alert(data.message);
    } catch (error) {
      window.alert('Error saving recipe:', error);
    }
  }

  async function handleSubmitReview(e) {
    e.preventDefault();
    setShow(false);
    const submitReview = {...reviewForm}
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
    try {
      const response = await fetch(`${baseUrl}/api/recipe/saveReview?q=${encodeURIComponent(recipe.label)}`,{
          method: 'PATCH',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...submitReview,
          }),
          credentials: 'include',
        });

        if (response.ok) {
          window.alert('Review submitted successfully!');
          handleGetReview();
        } else {
          const data = await response.json();
          window.alert(data.message);
        }
    } catch (error) {
      window.alert('Error submitting review:', error);
    }
  }

  async function handleGetReview() {
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
    try {
      fetch(`${baseUrl}/api/recipe/getRecipeRating?q=${encodeURIComponent(recipe.label)}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
        .then((response) => response.json())
        .then((data) => {
            updateRating({overallRating: data.overallRating})
            updateRating({numRating: data.numRating})
            setReviews(data.reviews)
            if (data.userRating != 0) {
              updateReviewForm({rating: data.userRating})
              updateReviewForm({review: data.userReview})
              updateReviewForm({hasReview: true})
            }
            setLoading(false);
          })
        .catch((error) => console.error('Error fetching recipes:', error));
    } catch (error) {
      window.alert('Error getting review:', error);
    }
  }
  
  useEffect(() => {
    setLoading(true);
    handleGetReview();
  }, [])

  return (
    loading ? <Loader /> :
    <div className="recipe-detail pt-5">
      <div className='d-flex justify-content-center gap-3 pb-5'>
        <button type="button" className="btn btn-outline-primary" onClick={removeSelectedRecipe}>Return Back</button>
      </div>
      <div className='container mb-5'>
        <div className='row container'>
          <div className='col-lg-4 d-flex justify-content-lg-end justify-content-center mb-4'>           
            <div className="d-flex flex-column align-items-start">
              <img className="img-thumbnail" src={recipe.image} alt={recipe.label}/>
              <button type="button" className="btn btn-outline-primary mt-3 w-100" onClick={handleSaveRecipe}>Save Recipe</button>
              <button type="button" className="btn btn-outline-primary mt-3 w-100" onClick={() => handleShowReview(true)}>Rate</button>
              <Modal show={show} onHide={handleCloseReview}>
                <Modal.Header closeButton>
                  <Modal.Title>Leave a review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Rating:</Form.Label>
                      <Rating
                        onClick={handleRating}
                        transition={true}
                        allowFractionChange={true}
                        initialValue={reviewForm.rating}
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                    >
                      <Form.Label>Description</Form.Label>
                      <Form.Control as="textarea" rows={3} value={reviewForm.review} onChange={(e) => updateReviewForm({ review: e.target.value })}/>
                    </Form.Group>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseReview}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmitReview}>
                    Submit Review
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>        
          </div>
          <div className='col-lg-8'>
            <div className='row'>
              <div className="col-lg-auto">
                <h5 className="fw-bold fs-3">{recipe.label}</h5>
              </div>
            </div>
            <div className='row mb-4'>
              <div className="col-lg-auto d-flex align-items-center justify-content-center flex-sm-row flex-column ">
                <Rating
                  transition={true}
                  allowFractionChange={true}
                  readonly={true}
                  initialValue={rating.overallRating}
                /> 
                <span className='ms-2 d-sm-inline-block d-block'>{rating.numRating} ratings</span>
              </div>
            </div>
            <div className='row mt-3 d-inline-block d-lg-none'>
              <div className="col-lg-auto">
                <button className="btn btn-primary float-start" type="button" onClick={() => handleShowReviewList(true)}>View Reviews</button>
              </div>
              <div className="col-auto">
                <Modal show={showReviews} onHide={handleCloseReviewList}>
                  <Modal.Header closeButton>
                    <Modal.Title>User Reviews</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ul className="list-group">
                      {reviews.map((review, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold text-start">{review.username}</div>
                            <p>{review.review}</p> 
                          </div>
                          <span className="badge bg-primary rounded-pill">{review.rating}/5</span>
                        </li>
                      ))}
                    </ul>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReviewList}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
            <div className='row mt-3'>
              <div className="col-auto">
                <p className='card-text mb-0'>Servings: {recipe.yield}</p>
              </div>
            </div>
            <div className='row mt-3'>
              <div className="col-auto">
                <span className="text-muted">Nutrition Per Serving</span>
              </div>
            </div>
            <div className='row mt-2'>
              <div className="col-12">
                <ul className="list-group list-group-horizontal-lg">
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">kcal</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / recipe.yield)}{recipe.totalNutrients.ENERC_KCAL.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">fat</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.FAT.quantity / recipe.yield)}{recipe.totalNutrients.FAT.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">saturates</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.FASAT.quantity / recipe.yield)}{recipe.totalNutrients.FASAT.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">carbs</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.CHOCDF.quantity / recipe.yield)}{recipe.totalNutrients.CHOCDF.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">sugars</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.SUGAR.quantity / recipe.yield)}{recipe.totalNutrients.SUGAR.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">fibre</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.FIBTG.quantity / recipe.yield)}{recipe.totalNutrients.FIBTG.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">protein</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.PROCNT.quantity / recipe.yield)}{recipe.totalNutrients.PROCNT.unit}</span>
                  </li>
                  <li className="list-group-item-success mb-2 list-group-item text-center">
                    <div className="fw-bold">cholestrol</div> 
                    <span className="ml-2">{Math.round(recipe.totalNutrients.CHOLE.quantity / recipe.yield)}{recipe.totalNutrients.CHOLE.unit}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className='row mt-3 d-none d-lg-block'>
              <div className="col-lg-auto">
                <button className="btn btn-primary float-start" type="button" onClick={() => handleShowReviewList(true)}>View Reviews</button>
              </div>
              <div className="col-auto">
                <Modal show={showReviews} onHide={handleCloseReviewList}>
                  <Modal.Header closeButton>
                    <Modal.Title>User Reviews</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <ul className="list-group">
                      {reviews.map((review, index) => (
                        <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
                          <div className="ms-2 me-auto">
                            <div className="fw-bold text-start">{review.username}</div>
                            <p>{review.review}</p> 
                          </div>
                          <span className="badge bg-primary rounded-pill">{review.rating}/5</span>
                        </li>
                      ))}
                    </ul>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseReviewList}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div className='row container d-flex justify-content-center mt-5'>
          <div className='col-md-6 col-sm-9 col-12'>
            <h2>Ingredients</h2>
            <ul className='list-group list-group-flush'>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li className="list-group-item" key={index}>{ingredient}</li>
              ))}
            </ul>
            <div className='card-body'>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                View Full Instructions
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}