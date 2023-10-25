import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const BarChartUi = ({ labels, data, title, bgColor, borderColor, dataKey }) => {
    // Prepare data for Recharts
    const formattedData = labels.map((label, index) => ({
      name: label,
      [dataKey]: data[index],
    }));
  
    return (
      <div>
        <h3>{title}</h3>
        <BarChart
          width={500}
          height={300}
          data={formattedData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey={dataKey}
            fill={bgColor}
            stroke={borderColor}
            strokeWidth={1}
          />
        </BarChart>
      </div>
    );
  };
  

export default BarChartUi;