import { useState } from 'react';
import Bicep from './Bicep';
import PushUp from './PushUp';
import '../../../assets/styles/private_styles/Trainer.css';

export default function Trainer() {
    const [selectedExercise, setSelectedExercise] = useState(null);

    const renderExercise = (exercise) => {
      switch (exercise) {
        case 'bicepCurl':
          return <Bicep />;
        
        case 'pushUp':
          return <PushUp />;
          
        default:
          return null;
      }
    };
  
    return (
      <div className="col-lg-9 bg-light container trainer-container">
        <header className='row d-flex text-center'>
          <h1>Your Personal AI Trainer</h1>
        </header>
        <div className="options row d-flex justify-content-center gap-2">
          <button className='col-md-2 col-6' onClick={() => setSelectedExercise('bicepCurl')}>Bicep Curl</button>
          <button className='col-md-2 col-6' onClick={() => setSelectedExercise('pushUp')}>Push Up</button>
          <button className='col-md-2 col-6' onClick={() => setSelectedExercise(null)}>Reset</button>
        </div>
        <div className="exercise-container">
          {selectedExercise ? 
            (renderExercise(selectedExercise)) :
            <div className='filler-component'>
              <h2>Choose an exercise to get started!</h2>
              <div className='row'>
                <div className='col-md-6'>
                  <img src='https://v2.exercisedb.io/image/wO8F2mfM6u0M0t' alt='pushup' className='float-end'/>
                </div>
                <div className='col-md-6'>
                  <img src='https://v2.exercisedb.io/image/wO8F2mfM6u0M0t' alt='pushup' className='float-start'/>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
}