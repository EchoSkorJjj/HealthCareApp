import React from 'react';
import { Link } from 'react-router-dom';
import '../../../assets/styles/private_styles/ExerciseCard.css';

const ExerciseCard = ({ exercise }) => (
  <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />
    <div className="d-flex">
      <div className={`button button-bodyPart`}>
        {exercise.bodyPart}
      </div>
      <div className={`button button-target`}>
        {exercise.target}
      </div>
    </div>
    <div className="exercise-name">
      {exercise.name}
    </div>
  </Link>
);

export default ExerciseCard;
