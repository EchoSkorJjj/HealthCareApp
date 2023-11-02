import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularBar({ value, maxValue }) {
    return (
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
            <CircularProgressbar
                value={value}
                maxValue={maxValue}
                text={`${value}`}
                styles={buildStyles({
                    pathColor: "#4CAF50",
                    trailColor: "#ccc",
                    textSize: '32px',
                    textColor: 'transparent', // Hide the default text
                })}
            />
            <div style={{ 
                position: 'absolute', 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                fontSize: '32px', // Match the text size
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
            }}>
                {value}
                <i className="bi bi-person-walking" style={{ marginLeft: '5px' }}></i> {/* Bootstrap icon */}
            </div>
        </div>
    );
}

export default CircularBar;
