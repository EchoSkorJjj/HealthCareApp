import React, { useState, useEffect} from 'react';
import '../../../assets/styles/private_styles/RecipeBook.css';
import Loader from '../../shared/loader/Loader.jsx';
import { motion} from 'framer-motion'

export default function RecipeBook() {
    const [loading, setLoading] = useState(false);
    const [recipes, setRecipes] = useState([]);

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
            transition:{duration:0.1, ease:easing}
        },
        animate:{
            y:0,
            opacity:1,
            animation:{
                duration:1,
                ease:easing
            }
        }
    };
    
    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            try {
                fetch(`${baseUrl}/api/recipe/getRecipeBook`, {
                    method: 'GET',
                    credentials: 'include',
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.recipeList) {
                        console.log(data.recipeList);
                        setRecipes(data.recipeList);
                    }
                    setLoading(false);
                })
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipes();
    }, []);
    
    return (
        loading ? <Loader /> :
        <motion.div initial='initial' animate='animate' className='container book-container col-lg-7 bg-light overflow-y-auto'>
            <motion.div className="container py-5" variants={stagger}>
                <motion.div className="row mb-4" variants={component}>
                    <h1>Recipe Book</h1>
                </motion.div>
                <ul className='list-group'>
                    {recipes.map((recipe) => (
                    <motion.li variants={component} className='list-group-item d-flex justify-content-between align-items-start text-start' key={recipe.recipeId}>
                        <div className="ms-2 me-auto row">
                            <div className='col-md-5 image-container'>
                                <div>
                                    <img src={`data:image/jpeg;base64,${recipe.image}`} alt={recipe.label} className="rounded float-start recipe-image img-thumbnail" />
                                </div>
                            </div>
                            <div className='col-md-7'>
                                <div className="fw-bold fs-2">{recipe.label}</div>
                                <p>Portions: {recipe.yield}</p>
                                <p>Calories:{Math.round(recipe.totalNutrients[0].ENERC_KCAL.quantity / recipe.yield)}{recipe.totalNutrients[0].ENERC_KCAL.unit}</p>
                            </div>
                        </div>                        
                    </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.div>
    );
}