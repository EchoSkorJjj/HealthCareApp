import React, { useState } from 'react';
import '../../assets/styles/RecipeCard.css';
import RecipeCrudModal from './RecipeCrudModal'; // Import your modal component

function RecipeDetail({ recipe, setSelectedRecipe }) {
  const [crudModalOpen, setCrudModalOpen] = useState(false);

  const openCrudModal = () => {
    setCrudModalOpen(true);
  };

  const closeCrudModal = () => {
    setCrudModalOpen(false);
  };

  return (
    <div className="recipe-detail">
      <h2>{recipe.label}</h2>
      <img src={recipe.image} alt={recipe.label} />
      <button onClick={() => setSelectedRecipe(null)}>Return Back</button>
      {/* Open the CRUD modal */}
      <button onClick={openCrudModal}>Open CRUD</button>
      {/* Render the CRUD modal */}
      <RecipeCrudModal isOpen={crudModalOpen} onRequestClose={closeCrudModal} />
      {/* Rest of your recipe details */}
      <p>Servings: {recipe.yield}</p>
      {/* ... other recipe details ... */}
      <ul>
        {recipe.ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <a href={recipe.url} target="_blank" rel="noopener noreferrer">
        View Full Recipe
      </a>
    </div>
  );
}

export default RecipeDetail;
