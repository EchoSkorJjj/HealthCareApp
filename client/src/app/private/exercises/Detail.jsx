import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../../../assets/styles/private_styles/Detail.css';

import BodyPartImage from '../../../assets/images/body-part.png';
import TargetImage from '../../../assets/images/target.png';
import EquipmentImage from '../../../assets/images/equipment.png';

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <Container fluid className="detail-container">
      <Col lg={6}>
        <img src={gifUrl} alt={name} loading="lazy" />
      </Col>
      <Col lg={6} className="detail-text-container">
        <h1 className="detail-title">{name}</h1>
        <p className="detail-description">
          Exercises keep you strong. <span style={{ textTransform: 'capitalize' }}>{name}</span> is one
          of the best exercises to target your {target}. It will help you improve your
          mood and gain energy.
        </p>
        {extraDetail?.map((item, index) => (
          <div key={index} className="detail-extra">
            <Button style={{ background: '#FFF2DB', borderRadius: '50%', width: '100px', height: '100px' }}>
              <img src={item.icon} alt={bodyPart} />
            </Button>
            <span className="detail-extra-text">{item.name}</span>
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default Detail;
