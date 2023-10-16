import { useState } from 'react';
import Bicep from './Bicep';
import '../../../assets/styles/private_styles/Trainer.css';

export default function Trainer() {

    return (
        <div className="col-lg-9 bg-light container trainer-container">
            <Bicep/>
        </div>
    )
}