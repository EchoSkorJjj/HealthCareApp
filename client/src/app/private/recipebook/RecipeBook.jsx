import React, { useState, useEffect} from 'react';
import '../../../assets/styles/private_styles/RecipeBook.css';

export default function RecipeBook() {
    const [recipes, setRecipes] = useState([]);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
            try {
                fetch(`${baseUrl}/api/account/getRecipeBook`, {
                    method: 'GET',
                    credentials: 'include',
                })
                .then((response) => response.json())
                .then((data) => {
                    if (data.recipeList) {
                        setRecipes(data.recipeList);
                    }
                })
            } catch (error) {
                console.log(error);
            }
        };
        fetchRecipes();
    }, []);
    
    return (
        <div className='container book-container col-lg-9 bg-light'>
            <div className="container py-5">
                <div className="row">
                    <h1>Recipe Book</h1>
                </div>
                <ul className='list-group'>
                    {recipes.map((recipe) => (
                    <li className='list-group-item d-flex justify-content-between align-items-start text-start' key={recipe.recipeId}>
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{recipe.label}</div>
                            <p>{recipe.yield}</p>
                            <p>{recipe.ingredientLines}</p>
                        </div>                        
                    </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}