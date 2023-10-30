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
        <div className="container-fluid px-0 combined-container">
            <SearchBar onSearch={handleSearch}/>
            {searchQuery ? 
            <RecipeList searchQuery={searchQuery}/> :
            (<div className='filler-component'></div>)
            }
        </div> 
    )
}