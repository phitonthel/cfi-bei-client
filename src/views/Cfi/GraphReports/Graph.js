/**
 * return { data, options }
 */
export const createGraphProperty = ({
  labels,
  dataSets,
  title,
  isStrength,
}) => {
  const rgbaColor = isStrength
    ? '75, 192, 192'
    : '255, 255, 0'
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Competency Score',
        data: dataSets, // dynamic data for the score
        backgroundColor: [
          `rgba(${rgbaColor}, 0.2)`,
        ],
        borderColor: [
          `rgba(${rgbaColor}, 1)`,
        ],
        borderWidth: 1,
        maxBarThickness: 30, // Optional: adjust the thickness of the bars
      },
    ],
  };

  const options = {
    indexAxis: 'x', // Changed to 'x' for horizontal bar chart
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // This should hide the legend
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: { // Changed to 'y' as this will now be the axis with the ticks
        beginAtZero: true,
        max: 100, // Sets the max value of the scale to 100
        ticks: {
          callback: function (value) {
            return value + '%'; // Append a percentage sign to the ticks
          },
        },
        grid: {
          display: true, // Hide grid lines
        },
      },
    },
  };

  return {
    data,
    options
  }
}
