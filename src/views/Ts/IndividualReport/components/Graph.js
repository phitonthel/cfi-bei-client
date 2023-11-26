import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Text, ReferenceLine } from 'recharts';

const CustomAxisTick = (props) => {
  const { x, y, stroke, payload } = props;

  return (
    <Text x={x} y={y} width={75} angle={-45} textAnchor="end" verticalAnchor="start">
      {payload.value}
    </Text>
  );
};

const yTicks = [0, 3, 5];

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
              {/* <XAxis dataKey="title" /> */}
              <XAxis dataKey="title" height={120} interval={0} tick={<CustomAxisTick />} />
              {/* <YAxis domain={[0, 6]} /> */}
              <YAxis domain={[0, 'dataMax']} ticks={yTicks} allowDecimals={false} />
              <Tooltip />
              <Legend payload={legendPayload} />
              <Bar dataKey="totalAvgScore" fill="navy" name="Score" />
              {/* <ReferenceLine y={5} strokeWidth={1} label="max" /> */}
            </BarChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default Graph;
