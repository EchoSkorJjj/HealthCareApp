import React, { useEffect, useState } from 'react';
import { fetchData, exerciseOptions } from '../../utils/GetData';
import HorizontalScrollbar from './HorizontalScrollbar';
import '../../../assets/styles/private_styles/SearchExercises.css';  // Assuming you have a CSS file named SearchExercises.css

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchExercisesData();
  }, []);

  const handleSearch = async () => {
    if (search) {
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

      const searchedExercises = exercisesData.filter(
        (item) => item.name.toLowerCase().includes(search)
               || item.target.toLowerCase().includes(search)
               || item.equipment.toLowerCase().includes(search)
               || item.bodyPart.toLowerCase().includes(search),
      );

      window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });

      setSearch('');
      setExercises(searchedExercises);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-5">Awesome Exercises You <br /> Should Know</h1>
      <div className="input-group mb-5">
        <input
          type="text"
          className="form-control"
          placeholder="Search Exercises"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
        <button className="btn btn-primary" onClick={handleSearch}>Search</button>
      </div>
      <div className="body-parts-container p-3">
        <HorizontalScrollbar data={bodyParts} bodyParts setBodyPart={setBodyPart} bodyPart={bodyPart} />
      </div>
    </div>
  );
};

export default SearchExercises;
