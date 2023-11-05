import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Graph = ({ reports }) => {
  // Define a custom payload for the Legend with the desired text
  const legendPayload = [
    { 
      id: 'totalAvgScore', 
      type: 'line', 
      value: 'Total Average Score', // Custom legend text
      color: 'navy' 
    }
  ];

  return (
    <>
      <div className="row mb-4 p-4">
        <div className="col-md-6">
          <h2>Feedback Summary</h2>
          <div style={{ height: '400px' }}>
            <BarChart width={900} height={400} data={reports}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="title" />
              <YAxis domain={[0, 5]} />
              <Tooltip />
              <Legend payload={legendPayload} />
              <Bar dataKey="totalAvgScore" fill="navy" name="Score" />
            </BarChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default Graph;
