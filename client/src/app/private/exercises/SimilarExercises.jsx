import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../assets/styles/private_styles/SimilarExercises.css';
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from '../../shared/loader/Loader';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => (
  <Container fluid className="similar-exercises-container">
    <Row>
      <Col>
        <h1 className="similar-exercises-title">
          Similar <span>Target Muscle</span> exercises
        </h1>
        <div className="similar-exercises-items">
          {targetMuscleExercises.length !== 0 ? <HorizontalScrollbar data={targetMuscleExercises} /> : <Loader />}
        </div>
        <h1 className="similar-exercises-title" style={{ marginTop: '60px' }}>
          Similar <span>Equipment</span> exercises
        </h1>
        <div className="similar-exercises-items">
          {equipmentExercises.length !== 0 ? <HorizontalScrollbar data={equipmentExercises} /> : <Loader />}
        </div>
      </Col>
    </Row>
  </Container>
);

export default SimilarExercises;
