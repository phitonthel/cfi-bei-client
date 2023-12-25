import React, { useState, useEffect, useRef } from 'react';

import { createGraphProperty } from './Graph'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Budgeting', value: 5 },
  { name: 'Financial Analysis', value: 19 },
  { name: 'Performance Management', value: 5 },
  { name: 'GCG Principles and Management', value: 5 },
  { name: 'Internal Control & Compliance', value: 5 },
];

const CustomBarChart = () => (
  <ResponsiveContainer width="100%" height={400}>
    <BarChart
      layout="vertical"
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <XAxis type="number" />
      <YAxis type="category" dataKey="name" width={150} />
      <Tooltip />
      <Bar dataKey="value" fill="#8884d8" barSize={20}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#82ca9d' : '#8884d8'} />
        ))}
      </Bar>
    </BarChart>
  </ResponsiveContainer>
);


const GraphReport = () => {
  const reportRef = useRef(null);

  return (
    <>
      <div className="container mt-4" ref={reportRef}>
        <div className="container mt-4">
          <div className="text-center mb-4">
            <h3>Competency Fit Index Report</h3>
          </div>

        </div>
      </div>

      <hr></hr>
      < CustomBarChart />
      {/* PDF Download Button */}
      <div className="text-center mt-4">
      </div>
    </>
  );
};

export default GraphReport;


