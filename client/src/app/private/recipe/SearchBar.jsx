import React, { useState } from 'react';
import '../../../assets/styles/private_styles/Searchbar.css';
import useRecipeStore from '../../../features/store/RecipeStore';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const searchName = useRecipeStore((state) => state.searchName);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='row searchbar-container'>
      <div className="container-fluid py-5">
        <div className="col-lg-4 col-md-5 col-sm-6 col-xs-10 mx-auto d-flex align-items-center">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleInputChange}
            className='form-control search-input me-2'
          />
          <button className="btn btn-outline-success" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}
