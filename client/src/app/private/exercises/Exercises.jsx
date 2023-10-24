import React, { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import '../../../assets/styles/private_styles/Exercises.css';
import { exerciseOptions, fetchData } from '../../utils/GetData';
import ExerciseCard from './ExerciseCard';
import Loader from '../../shared/loader/Loader';

const Exercises = ({ exercises, setExercises, bodyPart }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(6);

  useEffect(() => {
    const fetchExercisesData = async () => {
      let exercisesData = [];

      if (bodyPart === 'all') {
        exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      } else {
        exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
      }
      setExercises(exercisesData);
    };

    fetchExercisesData();
  }, [bodyPart]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (event, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  if (!currentExercises.length) return <Loader />;

  // Create pagination items
  const totalPageCount = Math.ceil(exercises.length / exercisesPerPage);
  let paginationItems = [];
  for (let number = 1; number <= totalPageCount; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(null, number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div id="exercises">
      <h4 className="showing-results">Showing Results</h4>
      <div className="exercise-card-container">
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
      </div>
      <div className="pagination-container">
        {exercises.length > 9 && (
          <Pagination size="lg">
            {paginationItems}
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Exercises;
