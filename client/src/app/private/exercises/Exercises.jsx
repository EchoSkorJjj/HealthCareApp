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
  }, [bodyPart, setExercises]);

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 1800, behavior: 'smooth' });
  };

  const handleFirstClick = () => {
    paginate(1);
  };

  const handlePreviousClick = () => {
    setCurrentPage(prev => (prev <= 1 ? prev : prev - 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prev => (prev >= totalPageCount ? prev : prev + 1));
  };

  const handleLastClick = () => {
    paginate(totalPageCount);
  };

  if (!currentExercises.length) return <Loader />;

  const totalPageCount = Math.ceil(exercises.length / exercisesPerPage);
  let paginationItems = [];
  const pageNumbers = Array.from({ length: totalPageCount }, (_, i) => i + 1);
  
  const firstPagesCount = 3; 
  const lastPagesCount = 3; 
  
  const firstPages = pageNumbers.slice(0, firstPagesCount);
  const lastPages = pageNumbers.slice(-lastPagesCount);
  
  const isCurrentPageNearStart = currentPage <= firstPagesCount + 2;
  const isCurrentPageNearEnd = currentPage > totalPageCount - lastPagesCount - 2;

  pageNumbers.forEach((number) => {
    if (
      firstPages.includes(number) ||
      lastPages.includes(number) ||
      (number >= currentPage - 1 && number <= currentPage + 1)
    ) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          className="hidden-xs"
          active={number === currentPage}
          onClick={() => paginate(number)}
        >
          {number}
        </Pagination.Item>,
      );
    } else if (
      (number === firstPagesCount + 1 && !isCurrentPageNearStart) ||
      (number === totalPageCount - lastPagesCount && !isCurrentPageNearEnd)
    ) {
      paginationItems.push(
        <Pagination.Ellipsis key={`ellipsis-${number}`} />
      );
    }
  });

  return (
    <div id="exercises">
      <h4 className="showing-results">Showing Results</h4>
      <div className="exercise-card-container">
        {currentExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
      <div className="pagination-container">
        {exercises.length > exercisesPerPage && (
          <Pagination size="lg">
            <Pagination.First onClick={handleFirstClick} />
            <Pagination.Prev onClick={handlePreviousClick} />
            {paginationItems}
            <Pagination.Next onClick={handleNextClick} />
            <Pagination.Last onClick={handleLastClick} />
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default Exercises;