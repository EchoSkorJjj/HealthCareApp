import React, { useState } from 'react';
import '../../../assets/styles/private_styles/Searchbar.css';

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className='row searchbar-container'>
      <div className="container-fluid bg-light py-5 d-flex justify-content-center">
        <div className="text-center m-5">
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={handleInputChange}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}
