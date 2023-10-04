import React, { useState, useEffect } from 'react';
import '../../../assets/styles/private_styles/RecipeCard.css';
import RecipeDetail from './RecipeDetail';

export default function RecipeList({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(true); // Declare and initialize showSearchBar state

  useEffect(() => {
    const baseUrl = import.meta.env.VITE_NODE_ENV === 'production' ? import.meta.env.VITE_HTTPS_SERVER : import.meta.env.VITE_DEVELOPMENT_SERVER;
    if (searchQuery) {
      fetch(`${baseUrl}/api/account/getRecipes?q=${encodeURIComponent(searchQuery)}`,
        {
          method: 'GET',
          credentials: 'include',
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.hits) { 
            setRecipes(data.hits);
            setSearchResults(data.hits);
            setShowSearchBar(false);
          }
        })
        .catch((error) => console.error('Error fetching recipes:', error));
    }
  }, [searchQuery]);
  

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  return (
    <div className="recipe-list row">
      {selectedRecipe ? (
        <RecipeDetail recipe={selectedRecipe.recipe} setSelectedRecipe={setSelectedRecipe} />
      ) : (
        searchResults.map((recipe) => (
          <div key={recipe.recipe.uri} className="card recipe-card col-lg-3 col-md-4 col-sm-6 col-xs-12 ">
            <img src={recipe.recipe.image} alt={recipe.recipe.label} className='card-img-top'/>
            <div className='card-body'>
              <h5 className="card-title">{recipe.recipe.label}</h5>
            </div>
              <ul className='list-group list-group-flush'>
                <li className='list-group-item'>Servings: {recipe.recipe.yield}</li>
                <li className='list-group-item'>Calories: {Math.round(recipe.recipe.calories)}</li>
                {recipe.recipe.totalNutrients.PROCNT && (
                  <li className='list-group-item'>Protein: {Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)} g</li>
                )}
                {recipe.recipe.totalNutrients.FAT && (
                  <li className='list-group-item'>Fat: {Math.round(recipe.recipe.totalNutrients.FAT.quantity)} g</li>
                )}
                {recipe.recipe.totalCO2Emissions && (
                  <li className='list-group-item'>Total CO2 Emissions: {Math.round(recipe.recipe.totalCO2Emissions)} </li>
                )}
                <button type="button" className="btn btn-secondary" onClick={() => handleRecipeClick(recipe)}>View Recipe</button>
              </ul>
          </div>
        ))
      )}
    </div>
  );
}
