import { useState } from 'react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import '../../../assets/styles/private_styles/Combined.css';

export default function Combined() {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    return (
        <div className="col-lg-9 container combined-container">
            <SearchBar onSearch={handleSearch}/>
            <RecipeList searchQuery={searchQuery}/>
        </div>
    )
}