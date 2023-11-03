import React, { useState, useEffect} from 'react';
import '../../../assets/styles/private_styles/RecipeBook.css';
import Loader from '../../shared/loader/Loader.jsx';
import { useNavigate } from 'react-router-dom';
import { motion} from 'framer-motion'
import {IoTrashOutline} from 'react-icons/io5';
import {Modal, Button} from 'react-bootstrap';

export default function RecipeBook() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);
    const [hasRecipe, setHasRecipe] = useState(false);
    const [recipeCount, setRecipeCount] = useState(false);

    const [show, setShow] = useState(false);

    function handleCloseDelete(e) {
        e.stopPropagation();
        setShow(false);
    }
    function handleShowDelete(e) {
        e.stopPropagation();
        setShow(true);
    }

    const handleSelectRecipe = (recipeLabel) => {
        navigate(`/recipebook/${recipeLabel}`);
    };

    let easing = "easeInOut";

    const stagger = {
        animate:{
            transition:{
            delayChildren:0.6,
            staggerChildren:0.2,
            staggerDirection:1
            }
        }
    }

    const component = {
        initial:{
            y:-60,
            opacity:0,
            transition:{duration:0.4, ease:easing}
        },
        animate:{
            y:0,
            opacity:1,
            transition:{
                duration:1,
                ease:easing
            }
        },
        whileHover:{
            scale:1.1
        },
        whileTap:{
            scale:1.1
        },
    };

    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
    
    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                fetch(`${baseUrl}/api/recipe/getRecipeBook`, {
                    method: 'GET',
                    credentials: 'include',
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.recipeList) {
                        if (data.recipeList.length > 0) {
                            setHasRecipe(true);
                        }
                        else if (data.recipeList.length > 3) {
                            setRecipeCount(true);
                        }
                        setRecipes(data.recipeList);
                    }
                    setLoading(false);
                })
            } catch (error) {
                window.alert(error.message);
            }
        };
        fetchRecipes();
    }, []);

    async function handleDelete(recipeLabel, e) {
        e.stopPropagation();
        setLoading(true);
        try {
            const deleteResponse = await fetch(`${baseUrl}/api/recipe/removeRecipe`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipeLabel: recipeLabel,
                }),
            })
            if (deleteResponse.ok) {
                const data = await deleteResponse.json();
                if (data.recipeList) {
                    if (data.recipeList.length > 0) {
                        setHasRecipe(true);
                    }
                    else if (data.recipeList.length > 3) {
                        setRecipeCount(true);
                    }
                    else {
                        setRecipeCount(false);
                    }
                    setRecipes(data.recipeList);
                }
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
    
    return (
        loading ? <Loader /> :
        <motion.div initial='initial' animate='animate' className='container-fluid book-container px-0 bg-light '>
            <motion.div className="container py-5 d-flex align-items-center justify-content-center flex-column" variants={stagger}>
                <motion.div className="row mb-4" variants={component}>
                    <h1>Recipe Book</h1>
                </motion.div>
                <ul className={`list-group ${recipeCount ? `` : `filler-container`}`}>
                    {hasRecipe ? 
                    recipes.map((recipe) => (
                    <motion.li 
                    initial="initial"
                    animate="animate"
                    whileHover="whileHover"
                    whileTap="whileTap" 
                    onClick={() => handleSelectRecipe(recipe.recipeLabel)} 
                    type='button' 
                    variants={component} 
                    className='mb-3 rounded list-group-item d-flex flex-md-row flex-column justify-content-md-between jusitfy-content-center align-items-md-start align-items-center text-md-start text-center' key={recipe.recipeLabel}>
                        <div className="list-item-container ms-2 me-md-auto me-2 d-flex flex-md-row flex-column gap-2">
                            <div className='image-container col-md-3 col-12'>
                                <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.recipeLabel} className="rounded float-start recipe-image img-thumbnail" />
                            </div>
                            <div className='col-md-8 col-12'>
                                <div className="fw-bold fs-2 label-text">
                                    {recipe.recipeLabel}
                                </div>
                                <p>Portions: {recipe.yield}</p>
                                <p>Calories:{Math.round(recipe.totalNutrients[0].ENERC_KCAL.quantity / recipe.yield)}{recipe.totalNutrients[0].ENERC_KCAL.unit}</p>
                            </div>
                        </div>
                        <h3 className='trash-container'>
                            <span 
                            className="badge bg-danger rounded-pill trash-button" 
                            type='button' 
                            onClick={(e) => handleShowDelete(e)}>
                                <IoTrashOutline/>
                            </span>
                            <Modal show={show} onHide={(e) => handleCloseDelete(e)}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Are you sure you want to remove recipe?</Modal.Title>
                                </Modal.Header>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={(e) => handleCloseDelete(e)}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={(e) => handleDelete(recipe.recipeLabel, e)}>
                                        remove
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </h3>                 
                    </motion.li>
                    ))
                    : <div className="filler-text">Add recipes to your recipe book to see them here</div>}
                </ul>
            </motion.div>
        </motion.div>
    );
}