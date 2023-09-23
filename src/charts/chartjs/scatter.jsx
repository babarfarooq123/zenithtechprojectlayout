// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const ScatterPlot = (props) => {
//     const chartRef = useRef(null);
//     let scatterChart = null; // Store a reference to the chart

//     useEffect(() => {
//         const data = {
//             datasets: [
//                 {
//                     label: 'Scatter Dataset',
//                     data: [
//                         { x: -10, y: 0 },
//                         { x: 0, y: 10 },
//                         { x: 10, y: 5 },
//                         { x: 0.5, y: 5.5 },
//                     ],
//                     backgroundColor: 'rgb(255, 99, 132)',
//                 },
//             ],
//         };

//         const options = {
//             responsive: true,
//             scales: {
//                 x: {
//                     type: 'linear',
//                     position: 'bottom',
//                 },
//                 y: {
//                     type: 'linear',
//                     position: 'left',
//                 },
//             },
//         };

//         const ctx = chartRef.current.getContext('2d');

//         scatterChart = new Chart(ctx, {
//             type: 'scatter',
//             data: data,
//             options: options,
//         });

//         // Return a cleanup function to destroy the chart
//         return () => {
//             if (scatterChart) {
//                 scatterChart.destroy();
//             }
//         };
//     }, []);

//     return <div style={{ minHeight: '260px', height: props.fullPageView ? "calc(100% - 32px - 16px - 24px)" : "100%", width: "100%", border: "1px solid red" }}>
//         <canvas ref={chartRef} style={{ height: '100%', width: '100%' }} />
//     </div>
// };

// export default ScatterPlot;










import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterChart = () => {
  const data = {
    datasets: [
      {
        label: 'Scatter Dataset',
        data: [
          { x: -10, y: 0 },
          { x: 0, y: 10 },
          { x: 10, y: 5 },
          { x: 0.5, y: 5.5 },
        ],
        backgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
      },
      y: {
        type: 'linear',
        position: 'left',
      },
    },
  };

  return (
    <div style={{ width: '100%', minHeight: '260px', maxHeight: "100%" }}>
      <Scatter style={{ height: "100%", width: "100%" }} data={data} options={options} />
    </div>
  );
};

export default ScatterChart;
