import React, { useState } from 'react';
import '../../../assets/styles/private_styles/RecipeDetail.css';
import RecipeCrudModal from './RecipeCrudModal'; // Import your modal component

export default function RecipeDetail({ recipe, setSelectedRecipe }) {
  const [crudModalOpen, setCrudModalOpen] = useState(false);

  const openCrudModal = () => {
    setCrudModalOpen(true);
  };

  const closeCrudModal = () => {
    setCrudModalOpen(false);
  };

  return (
    <div className="recipe-detail">
      <div className='pt-3 d-flex justify-content-center gap-3'>
        <button type="button" className="btn btn-outline-primary" onClick={() => setSelectedRecipe(null)}>Return Back</button>
        <button type="button" className="btn btn-outline-success" onClick={openCrudModal}>Open CRUD</button>
        <RecipeCrudModal isOpen={crudModalOpen} onRequestClose={closeCrudModal} />
      </div>
      <div className='container pb-5 d-flex justify-content-center'>
        <div className='card my-5' style={{width: 30 + 'rem'}}>
          <img className="card-img-top" src={recipe.image} alt={recipe.label} />
          <div className='card-body'>
            <h5 className="card-title">{recipe.label}</h5>
            <p className='card-text'>Servings: {recipe.yield}</p>
          </div>
            <ul className='list-group list-group-flush'>
              {recipe.ingredientLines.map((ingredient, index) => (
                <li className="list-group-item" key={index}>{ingredient}</li>
              ))}
            </ul>
          <div className='card-body'>
            <a href={recipe.url} target="_blank" rel="noopener noreferrer">
              View Full Recipe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}