import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../../../assets/styles/private_styles/ExerciseVideos.css';
import Loader from '../../shared/loader/Loader';

const ExerciseVideos = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length) return <Loader />;

  return (
    <Container fluid className="exercise-videos-container">
      <h1 className="exercise-videos-title">
        Watch <span>{name}</span> exercise videos
      </h1>
      <Row className="exercise-videos-items">
        {exerciseVideos?.slice(0, 3)?.map((item, index) => (
          <Col lg={4} md={6} sm={12} key={index}>
            <a
              className="exercise-video"
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
            >
              <img src={item.video.thumbnails[0].url} alt={item.video.title} />
              <div className="exercise-video-text">
                <h2 className="exercise-video-title">{item.video.title}</h2>
                <p className="exercise-video-channel">{item.video.channelName}</p>
              </div>
            </a>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ExerciseVideos;
