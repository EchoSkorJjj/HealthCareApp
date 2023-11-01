import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../../shared/loader/Loader.jsx';
import useRecipeStore from '../../../features/store/RecipeStore.jsx';
import {IoTrashOutline} from 'react-icons/io5';
import '../../../assets/styles/private_styles/RecipeBookDetail.css';
import {Modal, Button} from 'react-bootstrap';

export default function RecipeDetails() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { recipeId } = useParams();
    const recipeData = useRecipeStore((state) => state.recipeData)
    const setRecipeData = useRecipeStore((state) => state.setRecipeData);

    const [show, setShow] = useState(false);

    const handleCloseDelete = () => setShow(false);
    const handleShowDelete = () => setShow(true);

    if (!recipeId) {
        navigate('/recipebook');
    }

    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
        
    function handleBack() {
        navigate('/recipebook');
    }
    
    function saveRecipeData(recipeData) {
        setRecipeData({
            image: recipeData.image,
            url: recipeData.url,
            source: recipeData.source,
            overallRating: recipeData.overallRating,
            numRating: recipeData.numRating,
            ingredientLines: recipeData.ingredientLines,
            totalNutrients: recipeData.totalNutrients,
            totalCO2Emissions: recipeData.totalCO2Emissions,
            yield: recipeData.yield,
        });
    }
    
    useEffect(() => {
        const fetchRecipeData = async () => {
            setLoading(true);
            try {
                fetch(`${baseUrl}/api/recipe/getRecipeData`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({recipeId: recipeId})
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.recipeData) {
                        saveRecipeData(data.recipeData);
                        console.log(recipeData.yield)
                        setLoading(false);
                    }  
                })
            } catch (error) {
                setLoading(false);
                window.alert(error.message);
            }
        }
        fetchRecipeData();
    }, []);

    async function handleDelete() {
        setLoading(true);
        try {
            const deleteResponse = await fetch(`${baseUrl}/api/recipe/removeRecipe`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeId: recipeId,
                }),
            })
            if (deleteResponse.ok) {
                handleBack();
                window.alert('Recipe deleted successfully');
            }
            setLoading(false);
            setShow(false);
        } catch (error) {
            setLoading(false);
            setShow(false);
            window.alert(error.message);
        }
    }

    if (loading || !recipeData || !recipeData.ingredientLines) {
        return <Loader />;
    }

    return (
        // loading ? <Loader /> :
        <div className='container data-container col-lg-9 bg-light'>
            <div className="container py-5">
                <div className="recipe-details d-flex justify-content-center align-items-center flex-column">
                    <div className='d-flex flex-row mb-3'>
                        <div className='me-2'>
                            <button type='button' className='btn btn-primary' onClick={handleBack}>Back</button>
                        </div>
                        <div >
                            <button type='button' className='btn btn-danger'onClick={handleShowDelete}><IoTrashOutline/></button>
                            <Modal show={show} onHide={handleCloseDelete}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure you want to remove recipe?</Modal.Title>
                                </Modal.Header>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseDelete}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={handleDelete}>
                                        remove
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="d-flex flex-sm-row flex-column">
                            <div>
                                <img src={`data:image/jpeg;base64,${recipeData.image}`} alt={recipeData.label} className="recipe-image img-thumbnail" loading="lazy" style={{ height: 300, width: 300, marginRight: 20 }}/>
                            </div>
                            <div>
                                <h1 className="recipe-title">{recipeData.label}</h1>
                                <p className="source">Source: {recipeData.source}</p>
                                <p className="ratings">Rating: {recipeData.overallRating} (from {recipeData.numRating} reviews)</p>
                                <a href={recipeData.url} target="_blank" rel="noopener noreferrer" className="full-recipe-link">View Full Recipe</a>
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3 gy-3'>
                        <div className="nutrition-section col-md-12 col-sm-4 col-12 d-flex align-items-center jusitfy-content-center flex-column">
                            <h2 className='nutrition-header'>Nutrition Facts For Each Serving</h2>
                            <div className='list-container w-100 d-flex justify-content-center'>
                                <ul className="list-group list-group-horizontal-lg d-flex flex-md-row flex-column justify-content-center">
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">kcal</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].ENERC_KCAL.quantity / recipeData.yield)}{recipeData.totalNutrients[0].ENERC_KCAL.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">fat</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].FAT.quantity / recipeData.yield)}{recipeData.totalNutrients[0].FAT.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">saturates</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].FASAT.quantity / recipeData.yield)}{recipeData.totalNutrients[0].FASAT.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">carbs</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].CHOCDF.quantity / recipeData.yield)}{recipeData.totalNutrients[0].CHOCDF.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">sugars</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].SUGAR.quantity / recipeData.yield)}{recipeData.totalNutrients[0].SUGAR.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">fibre</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].FIBTG.quantity / recipeData.yield)}{recipeData.totalNutrients[0].FIBTG.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">protein</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].PROCNT.quantity / recipeData.yield)}{recipeData.totalNutrients[0].PROCNT.unit}</span>
                                    </li>
                                    <li className="list-group-item-success mb-2 list-group-item text-center">
                                        <div className="fw-bold">cholestrol</div> 
                                        <span className="ml-2">{Math.round(recipeData.totalNutrients[0].CHOLE.quantity / recipeData.yield)}{recipeData.totalNutrients[0].CHOLE.unit}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="ingredients-section col-md-12 col-sm-8 col-12 d-flex align-items-center jusitfy-content-center flex-column">
                            <h2 className='ingredient-header'>Ingredients</h2>
                            <ul className='list-group list-group-flush'>
                                {recipeData.ingredientLines.map((ingredient, index) => (
                                    <li className='list-group-item' key={index}>{ingredient}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="environment-section">
                        <h2>Environmental Impact</h2>
                        <p>Total CO2 Emissions: {recipeData.totalCO2Emissions}g</p>
                    </div>

                    <div className="servings-section">
                        <h2>Servings</h2>
                        <p>This recipe serves {recipeData.yield} people.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}