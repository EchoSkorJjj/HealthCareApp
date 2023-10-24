import React, { useContext } from 'react';
import ItemSlider from '../../components/itemslider/ItemSlider.jsx';
import '../../../assets/styles/private_styles/HorizontalScrollbar.css'; 
import ExerciseCard from './ExerciseCard.jsx';
import BodyPart from './BodyPart.jsx';

const HorizontalScrollbar = ({ data, bodyParts, setBodyPart, bodyPart }) => (
  <ItemSlider title="Body Parts">
    {data.map((item, index) => (
      <div
        key={item.id || item}
        itemID={item.id || `item-${index}`}  // ensure itemId is provided
        title={item.id || item}
        className="scroll-items"
      >
        {bodyParts ? <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} /> : <ExerciseCard exercise={item} /> }
      </div>
    ))}
  </ItemSlider>
);

export default HorizontalScrollbar;
