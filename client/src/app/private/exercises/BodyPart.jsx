import React from 'react';
import '../../../assets/styles/private_styles/BodyPart.css'; 
import Icon from '../../../assets/images/gym.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const handleClick = () => {
    setBodyPart(item);
    window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
  };

  return (
    <div
      type="button"
      className={`bodyPart-card ${bodyPart === item ? ' selected' : ''}`}
      onClick={handleClick} 
    >
      <img src={Icon} alt="dumbbell" style={{ width: '40px', height: '40px' }} />
      <div className="fw-bold" style={{ fontSize: '24px', fontFamily: 'Alegreya', color: '#3A1212', textTransform: 'capitalize' }}>
        {item}
      </div>
    </div>
  );
};

export default BodyPart;

