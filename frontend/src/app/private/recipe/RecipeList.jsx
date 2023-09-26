import React, { useState, useEffect } from 'react';
import '../../../assets/styles/private_styles/RecipeCard.css';
import RecipeDetail from './RecipeDetail';

export default function RecipeList({ searchQuery }) {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(true); // Declare and initialize showSearchBar state

  useEffect(() => {
    if (searchQuery) {
      fetch(`http://localhost:3500/api/account/getRecipes?q=${encodeURIComponent(searchQuery)}`,
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
    <div className="recipe-list">
      {selectedRecipe ? (
        <RecipeDetail recipe={selectedRecipe.recipe} setSelectedRecipe={setSelectedRecipe} />
      ) : (
        searchResults.map((recipe) => (
          <li
            key={recipe.recipe.uri}
            className="recipe-card"
          >
            <h2>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <p>Servings: {recipe.recipe.yield}</p>
            <p>Calories: {Math.round(recipe.recipe.calories)}</p>
            {/* Other nutrient properties */}
            {recipe.recipe.totalNutrients.PROCNT && (
              <p>Protein: {Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)} g</p>
            )}
            {recipe.recipe.totalNutrients.FAT && (
              <p>Fat: {Math.round(recipe.recipe.totalNutrients.FAT.quantity)} g</p>
            )}
            {recipe.recipe.totalCO2Emissions && (
              <p>Total CO2 Emissions: {Math.round(recipe.recipe.totalCO2Emissions)} </p>
            )}
            <button onClick={() => handleRecipeClick(recipe)}>View Recipe</button>
          </li>
        ))
      )}
    </div>
  );
}