import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import '../../../assets/styles/private_styles/Combined.css';
import useRecipeStore from '../../../features/store/RecipeStore';
import { useLocation } from 'react-router-dom';

export default function Combined() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const recipeSelected = useRecipeStore((state) => state.recipeSelected);
    const setRecipeSelected = useRecipeStore((state) => state.setRecipeSelected);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    useEffect(() => {
        if (location.pathname.includes('/recipe')) {
            setRecipeSelected(false);
        }
    }, [location]); 

    return (
        <div className="container-fluid px-0 bg-light combined-container">
            {recipeSelected ? <></> : 
            <SearchBar onSearch={handleSearch}/>
            }
            {searchQuery ? 
            <RecipeList searchQuery={searchQuery}/> :
            (
            <div className='filler-component'>
                <h1 className='display-6'>Search for a recipe!</h1>
                <div className="search-guide">
                    <p>Welcome to our recipe search feature! Here's a comprehensive guide on how you can find the perfect recipe for any occasion:</p>
                    
                    <h2 className="guide-title">1. Searching by Food Item</h2>
                    <p>Enter the name of any food item or ingredient in the search bar. For example, you can search for "chicken rice", "pasta", "healthy breakfast", etc.</p>
                    
                    <h2 className="guide-title">2. Searching by Diet Labels</h2>
                    <p>Looking for something specific to your dietary needs? You can search recipes based on diet labels such as:</p>
                    <ul>
                        <li><strong>Balanced</strong>: Recipes with a good balance of essential nutrients.</li>
                        <li><strong>High-Fiber</strong>: Dishes rich in dietary fiber.</li>
                        <li><strong>High-Protein</strong>: Meals that are high in protein content.</li>
                    </ul>
                    
                    <h2 className="guide-title">3. Searching by Health Labels</h2>
                    <p>If you have specific health requirements or preferences, you can search based on health labels such as:</p>
                    <ul>
                        <li><strong>Dairy-Free</strong>: Recipes without dairy products.</li>
                        <li><strong>Alcohol-Free</strong>: Dishes that don't contain alcohol.</li>
                        <li><strong>Pork-Free</strong>: Recipes without pork or pork products.</li>
                    </ul>
                    
                    <h2 className="guide-title">4. Searching by Meal Types</h2>
                    <p>Find recipes that are perfect for different times of the day:</p>
                    <ul>
                        <li><strong>Breakfast</strong>: Start your day with delicious breakfast ideas.</li>
                        <li><strong>Lunch</strong>: Quick and easy lunch options.</li>
                        <li><strong>Dinner</strong>: Hearty and comforting dinner recipes.</li>
                    </ul>
                    
                    <h2 className="guide-title">5. Searching by Dish Types</h2>
                    <p>Looking for a specific kind of dish? Try searching for:</p>
                    <ul>
                        <li><strong>Bread</strong>: Recipes for homemade bread, buns, and more.</li>
                        <li><strong>Egg</strong>: Dishes with eggs as the main ingredient.</li>
                        <li><strong>Seafood</strong>: A variety of seafood recipes.</li>
                    </ul>
                    
                    <h2 className="guide-title">6. Searching by Cuisine Types</h2>
                    <p>Explore recipes from around the world by searching for cuisine types such as:</p>
                    <ul>
                        <li><strong>Italian</strong>: Classic and modern Italian dishes.</li>
                        <li><strong>Mexican</strong>: Traditional and fusion Mexican recipes.</li>
                        <li><strong>Chinese</strong>: A range of Chinese culinary delights.</li>
                    </ul>
            
                    <p>Combine any of the above keywords for more refined results. Happy cooking!</p>
                </div>
            </div>
            )
            }
        </div> 
    )
}