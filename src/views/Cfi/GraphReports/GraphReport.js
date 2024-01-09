import React, { useState, useEffect, useRef } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';


const data = [
  { name: 'Budgeting', percentage: 100 },
  { name: 'Financial Analysis', percentage: 95 },
  { name: 'Performance Management', percentage: 90 },
  { name: 'GCG Principles and Management', percentage: 88 },
  { name: 'Internal Control & Compliance', percentage: 87 },
];

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const offset = width / 2;
  return (
    <text x={x + offset} y={y + height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
      {value + '%'}
    </text>
  );
};

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
      <Bar dataKey="percentage" fill="#8884d8" barSize={50}>
      <LabelList dataKey="percentage" content={renderCustomizedLabel} />
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4F6F52' : '#739072'} />
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

          <hr></hr>
          < CustomBarChart />

        </div>
      </div>
      {/* PDF Download Button */}
      <div className="text-center mt-4">
      </div>
    </>
  );
};

export default GraphReport;


