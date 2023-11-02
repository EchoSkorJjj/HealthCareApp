import react, {useState} from 'react';
import '../../../assets/styles/private_styles/Gym.css';
import SearchExercises from './SearchExercises';
import Exercises from './Exercises';

export default function Gym() {
    const [exercises, setExercises] = useState([]);
    const [bodyPart, setBodyPart] = useState('all');
    return (
        <div className='container-fluid px-0 bg-light gym-container'>
            <div className="container w-100 h-100">
                <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
                <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
            </div>
        </div>
    )
}