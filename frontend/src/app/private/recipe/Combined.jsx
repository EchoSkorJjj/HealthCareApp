import { useState } from 'react';
import RecipeList from './RecipeList';
import SearchBar from './SearchBar';
import '../../../assets/styles/private_styles/Combined.css';

export default function Combined() {
    const [searchQuery, setSearchQuery] = useState('');
  
    const handleSearch = (query) => {
      setSearchQuery(query);
    };
    return (
        <div className="col-lg-9 container-fluid combined-container">
            <SearchBar onSearch={handleSearch}/>
            <RecipeList searchQuery={searchQuery}/>
        </div>
    )
}