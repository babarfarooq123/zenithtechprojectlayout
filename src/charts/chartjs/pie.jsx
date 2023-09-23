// import React from 'react';
// import 'chart.js/auto';
// import { Pie } from 'react-chartjs-2';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

// const PieChart = ({ fullPageView }) => {

//     const data = {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
//         datasets: [
//             {
//                 data: [12, 19, 3, 5, 2],
//                 backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
//                 hoverOffset: 10,
//                 borderWidth: 1, // Set the border width
//                 borderColor: 'white',
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//             datalabels: {
//                 color: (vl, e) => {console.log(vl, e); return '#fff'}, // Label text color
//                 // color: (vl, e) => {console.log(vl, e); return 'black'}, // Label text color
//                 formatter: (value, ctx) => {
//                     return `${ctx.chart.data.labels[ctx.dataIndex]}: ${value}%`;
//                 },
//                 textDirection: "rtl",
//                 textAlign: "center"
//             },
//             legend: {
//                 display: false, // Set to false to hide the legends
//             },
//         }
//     };

//     return (
//         // <div style={{ height: "400px" }}>
//         <div style={{ width: '100%', minHeight: '260px', height: fullPageView ? "calc(100% - 32px - 16px - 24px)" : "", maxHeight: "100%" }}>
//             <Pie style={{ width: "100%", overflow: 'visible' }} data={data} plugins={[ChartDataLabels]} options={options} />
//         </div>
//     );
// };

// export default PieChart;








import React from 'react';
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const PieChart = ({ fullPageView }) => {

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [
            {
                data: [12, 19, 3, 5, 2],
                backgroundColor: ['red', 'blue', 'yellow', 'green', 'purple'],
                hoverOffset: 4,
                borderWidth: 1, // Set the border width
                borderColor: 'white',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            datalabels: {
                color: (vl, e) => {console.log(vl, e); return '#fff'}, // Label text color
                formatter: (value, ctx) => {
                    return `${ctx.chart.data.labels[ctx.dataIndex]}: ${value}%`;
                },
                textDirection: "rtl",
                textAlign: "center"
            },
            legend: {
                display: false, // Set to false to hide the legends
            },
        }
    };

    return (
        <div style={{ width: '100%', minHeight: '260px', height: fullPageView ? "calc(100% - 32px - 16px - 24px)" : "260px", maxHeight: "100%" }}>
            <div style={{ width: "100%", height: "100%" }}>
                <Pie style={{ width: "100%", height: "100%", margin: "auto" }} data={data} plugins={[ChartDataLabels]} options={options} />
            </div>
        </div>
    );
};

export default PieChart;
