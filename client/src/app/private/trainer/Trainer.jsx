import React, { useState, useEffect } from 'react';
import '../../../assets/styles/private_styles/Trainer.css';
import BicepCurlGIf from '../../../assets/images/BicepCurl.gif';
import PushUpGif from '../../../assets/images/PushUp.gif';
import UserGuideModal from '../../components/userguide/UserGuide.jsx';
import useFitnessStore from '../../../features/store/FitnessStore';

export default function Trainer() {
    const [selectedExercise, setSelectedExercise] = useState(null);
    const [exerciseComponent, setExerciseComponent] = useState(null);
    const [key, setKey] = useState(0); 
    const [firstVisit, setFirstVisit] = useState(true);
    const isFirstVisit = useFitnessStore((state) => state.isFirstVisit);
    const setIsFirstVisit = useFitnessStore((state) => state.setIsFirstVisit);

    useEffect(() => {
      if (!isFirstVisit) {
        setFirstVisit(false);
      }
    }, [isFirstVisit])

    useEffect(() => {
        if (selectedExercise) {
            renderExercise(selectedExercise).then(component => {
                setExerciseComponent(component);
            });
        } else {
            setExerciseComponent(null);
        }
    }, [selectedExercise]);

    function handleCloseGuide() {
      setFirstVisit(false);
      setIsFirstVisit(false);
    }

    function handleOpenGuide() {
      setFirstVisit(true);
      setIsFirstVisit(true);
    }


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
        <div>
          <button type='btn' className='btn btn-primary mb-3' onClick={handleOpenGuide}>See Instructions</button>
        </div>
        <div className="options d-flex justify-content-center flex-md-row flex-column mb-5">
          <button className='m-2 trainer-btn' onClick={() => handleExerciseSelect('bicepCurl')}>Bicep Curl</button>
          <button className='m-2 trainer-btn' onClick={() => handleExerciseSelect('pushUp')}>Push Up</button>
          <button className='m-2 trainer-btn' onClick={() => handleExerciseSelect(null)}>Reset</button>
        </div>
        <div className="exercise-container" key={key}> 
          {selectedExercise ? 
            exerciseComponent :
            <div className='filler-component'>
              <h2>Choose an exercise to get started!</h2>
              <div className='d-flex justify-content-center flex-md-row flex-column'>
                <div type='btn' onClick={() => handleExerciseSelect('bicepCurl')}>
                  <img src={BicepCurlGIf} alt='bicepcurl' className='img-gif'/>
                </div>
                <div type='btn' onClick={() => handleExerciseSelect('pushUp')}>
                  <img src={PushUpGif} alt='pushup' className='img-gif'/>
                </div>
              </div>
            </div>
          }
        </div>
        {firstVisit && <UserGuideModal onClose={handleCloseGuide} />}
      </div>
    );
}
