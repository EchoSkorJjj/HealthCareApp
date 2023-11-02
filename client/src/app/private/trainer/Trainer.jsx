import React, { useState, useEffect } from 'react';
import '../../../assets/styles/private_styles/Trainer.css';
import BicepCurlGIf from '../../../assets/images/BicepCurl.gif';
import PushUpGif from '../../../assets/images/PushUp.gif';

export default function Trainer() {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exerciseComponent, setExerciseComponent] = useState(null);
    const [key, setKey] = useState(0); 

    useEffect(() => {
        if (selectedExercise) {
            renderExercise(selectedExercise).then(component => {
                setExerciseComponent(component);
            });
        } else {
            setExerciseComponent(null);
        }
    }, [selectedExercise]);

    const renderExercise = async (exercise) => {
      switch (exercise) {
        case 'bicepCurl':
          const Bicep = (await import('./Bicep')).default;
          return <Bicep />;
          
        case 'pushUp':
          const PushUp = (await import('./PushUp')).default;
          return <PushUp />;
          
        default:
          return null;
      }
    };

    const handleExerciseSelect = (exercise) => {
        setSelectedExercise(exercise);
        setKey(prev => prev + 1); 
    };
  
    return (
      <div className="bg-light container-fluid px-0 trainer-container">
        <header className='row d-flex text-center'>
          <h1>Your Personal AI Trainer</h1>
        </header>
        <div className="options row d-flex justify-content-center gap-2 mb-5">
          <button className='col-md-2 col-6 trainer-btn' onClick={() => handleExerciseSelect('bicepCurl')}>Bicep Curl</button>
          <button className='col-md-2 col-6 trainer-btn' onClick={() => handleExerciseSelect('pushUp')}>Push Up</button>
          <button className='col-md-2 col-6 trainer-btn' onClick={() => handleExerciseSelect(null)}>Reset</button>
        </div>
        <div className="exercise-container" key={key}> 
          {selectedExercise ? 
            exerciseComponent :
            <div className='filler-component'>
              <h2>Choose an exercise to get started!</h2>
              <div className='row'>
                <div type='btn' className='col-md-6' onClick={() => handleExerciseSelect('bicepCurl')}>
                  <img src={BicepCurlGIf} alt='bicepcurl' className='float-end'/>
                </div>
                <div type='btn' onClick={() => handleExerciseSelect('pushUp')} className='col-md-6'>
                  <img src={PushUpGif} alt='pushup' className='float-start'/>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    );
}
