import { useState } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import '../../../assets/styles/private_styles/Combined.css';
import useRecipeStore from '../../../features/store/RecipeStore';

export default function Combined() {
    const [searchQuery, setSearchQuery] = useState('');
    const recipeSelected = useRecipeStore((state) => state.recipeSelected);
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    return (
        <div className="container-fluid px-0 bg-light combined-container">
            {recipeSelected ? <></> : 
            <SearchBar onSearch={handleSearch}/>
            }
            {searchQuery ? 
            <RecipeList searchQuery={searchQuery}/> :
            (<div className='filler-component'></div>)
            }
        </div> 
    )
}