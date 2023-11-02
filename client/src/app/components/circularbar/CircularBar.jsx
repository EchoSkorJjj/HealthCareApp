import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CircularBar({ value, maxValue, label }) {
    return (
        <div style={{ width: "200px", height: "200px" }}>
            <CircularProgressbar 
                value={value}
                maxValue={maxValue}
                text={label}
                styles={buildStyles({
                    pathColor: "#4CAF50",
                    trailColor: "#ccc",
                    textSize: "16px"
                })}
            />
        </div>
    );
}

export default CircularBar;