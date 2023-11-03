import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './BarChart.css';

const BarChartUi = ({ labels, data, title, bgColor, dataKey }) => {
    const formattedData = labels.map((label, index) => ({
      name: label,
      [dataKey]: data[index],
    }));
  
    return (
      <div className="card mx-auto graph-card" style={{ width: '100%', height: '100%', borderRadius: 'lg', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <div className="card-body mr-4 graph-body" style={{ flex: 1, borderRadius: 'md' }}>
            <h3 className="font-weight-bold mb-2 text-black">{title}</h3>
            <ResponsiveContainer width="100%" aspect={3}>
              <BarChart
                data={formattedData}
              >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey={dataKey}
                type="monotone"
                fill={bgColor}
                stroke="#8884d8"
                strokeWidth={2}
              />
              </BarChart>
            </ResponsiveContainer>
          </div> 
      </div>
    );
  };
  

export default BarChartUi;