import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';

import { exerciseOptions, fetchData, youtubeOptions } from '../../utils/GetData';
import Detail from './Detail';
import ExerciseVideos from './ExerciseVideos';
import SimilarExercises from './SimilarExercises';
import '../../../assets/styles/private_styles/ExerciseDetail.css';

const ExerciseDetail = () => {
  const navigate = useNavigate();
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  function goBack() {
    navigate('/gym')
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchExercisesData = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExerciseDetail(exerciseDetailData);

      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);

      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equimentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equimentExercisesData);
    };

    fetchExercisesData();
  }, [id]);

  if (!exerciseDetail) return <div>No Data</div>;

  return (
    <div className='container-fluid px-0 bg-light exercisedetail-container'>
        <div className="container w-100 h-100">
          <div>
            <button type='btn' className='exercisedetail-btn' onClick={goBack}>Back</button> 
          </div>
          <Container className='component-container'>
              <Detail exerciseDetail={exerciseDetail} />
              <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
              <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
          </Container>
        </div>
    </div>
  );
};

export default ExerciseDetail;
