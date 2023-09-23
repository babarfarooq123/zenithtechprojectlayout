import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ScatterPlot = ({ fullWithChart }) => {
  // Sample data for the scatter plot
  const data = [
    [0, 0],
    [1, 8],
    [2, 4],
    [3, 6],
    [4, 7],
    [5, 5],
    [6, 3],
    [7, 1],
    [8, 2],
    [9, 9],
  ];

  // Highcharts configuration options
  const options = {
    chart: {
      type: 'scatter',
      zoomType: 'xy',
      height: fullWithChart ? "calc(100vh - 32px - 16px - 24px)" : 260
    },
    title: {
      text: null,
    },
    xAxis: {
      title: {
        text: 'X-axis',
      },
    },
    yAxis: {
      title: {
        text: 'Y-axis',
      },
    },
    series: [
      {
        name: 'Data Series',
        color: 'rgba(223, 83, 83, .5)',
        data: data,
      },
    ],
  };

  return (
    <div style={{ height: fullWithChart ? "calc(100vh - 32px - 16px - 24px)" : "260px", width: "100%" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default ScatterPlot;
