import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';

export const CustomBarChart = ({
  reports,
  colors = ['#4F6F52', '#739072']
}) => {
  
  if (reports.length === 0) {
    return <>None</>
  }

  const height = (reports.length * 60) + 120;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        layout="vertical"
        data={reports}
        margin={{
          top: 20, right: 30, left: 20, bottom: 5,
        }}
      >
        <XAxis type="number" domain={[0, 100]}/>
        <YAxis type="category" dataKey="title" width={150} />
        <Tooltip />
        <Bar dataKey="percentage" fill="#8884d8" barSize={50}>
        <LabelList dataKey="percentageText" content={renderCustomizedLabel} />
          {reports.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index % 2 === 0 ? colors[0] : colors[1]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

const renderCustomizedLabel = (props) => {
  const { x, y, width, height, value } = props;
  const offset = width / 2;
  return (
    <text x={x + offset} y={y + height / 2} fill="#fff" textAnchor="middle" dominantBaseline="middle">
      {value}
    </text>
  );
};