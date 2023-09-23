// import React from "react";
// import {
//     LineChart,
//     Line,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend
// } from "recharts";
// import { useSelector } from "react-redux";
// import { patientsCount } from "../redux/api";

// // const data = [
// //     {
// //         name: "Jan",
// //         year: 2023,
// //         count: 1
// //     },
// //     {
// //         name: "Feb",
// //         year: 2023,
// //         count: 1
// //     },
// //     {
// //         name: "Jan",
// //         year: 2024,
// //         count: 2
// //     }
// // ];

// const LineChartView = ({ year }) => {
//     const patientsCountData = useSelector(state => state?.dentalReducer?.patientsCount?.counts);

//     return (
//         <LineChart
//             width={500}
//             className="lineChartView"
//             height={300}
//             data={patientsCountData && year ? patientsCountData?.TotalCaseVistPerMonth?.filter(val => val?.year === year) : []}
//             margin={{
//                 top: 0,
//                 right: 0,
//                 left: 0,
//                 bottom: 0
//             }}
//         >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="monthName" />
//             <YAxis />
//             <Tooltip />
//             {/* <Legend style={{ width: "100%" }} /> */}
//             <Line
//                 type="monotone"
//                 dataKey="count"
//                 stroke="#8884d8"
//                 activeDot={{ r: 8 }}
//             />
//         </LineChart>
//     );
// }

// export default LineChartView;
















// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const Tooltip = ({ x, y, value }) => {
//     return <div id="tooltip" style="display: none; position: absolute; background-color: white; color: white; padding: 5px; border-radius: 5px;"></div>
// };

// const LineChart = ({ data }) => {
//     const svgRef = useRef(null);
//     const [tooltipData, setTooltipData] = useState(null);    

//     useEffect(() => {
//         const svg = d3.select(svgRef.current);
//         // const width = svg.attr('width');
//         // const height = svg.attr('height');
//         const width = document.getElementById("lineChart").clientHeight;
//         const height = document.getElementById("lineChart").clientHeight;

//         // Set up margins and dimensions
//         const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//         const innerWidth = width - margin.left - margin.right;
//         const innerHeight = height - margin.top - margin.bottom;

//         const xScale = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, d => d.x)])
//             // .range([0, innerWidth]);
//             .range([0, width]);

//         const yScale = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, d => d.y)])
//             .range([innerHeight, 0]);

//         const line = d3
//             .line()
//             .x(d => xScale(d.x))
//             .y(d => yScale(d.y));

//         svg.selectAll('*').remove(); // Clear existing elements

//         const g = svg
//             .append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         g.selectAll('.dot')
//             .data(data)
//             .enter()
//             .append('circle')
//             .attr('class', 'dot')
//             .attr('cx', d => xScale(d.x))
//             .attr('cy', d => yScale(d.y))
//             .attr('r', 4)
//             .on("mouseover", function(event, d) {
//                 const tooltip = d3.select("#tooltip");
//                 tooltip.style('left', event?.pageX + 10 + 'px');
//                 tooltip.style('top', event?.pageY - 10 + 'px');
//                 tooltip.style('font-size', '10px');
//                 tooltip.classed('tooltipPie', true);
//                 tooltip.style('display', 'inline-block');
//                 tooltip.style('background-color', 'white');
//                 tooltip.style('color', 'black');
//                 tooltip.style('position', 'absolute');
//                 tooltip.html('<spand>Y: ' + d.y + '<br />' + 'X: ' + d.x + '</span>');

//               })
//             .on('mouseout', () => {
//                 setTooltipData(null);
//                 const tooltip = d3.select("#tooltip");
//                 tooltip.style('display', 'none')
//             });

//         g.append('path')
//             .datum(data)
//             .attr('fill', 'none')
//             .attr('stroke', 'steelblue')
//             .attr('stroke-width', 2)
//             .transition() // Add a transition
//             .duration(1000) // Set the duration of the transition in milliseconds
//             .attr('d', line);
//             // .attrTween('d', function (d) {
//             //     const previous = d3.select(this).attr('d');
//             //     const current = line(d);
//             //     return d3.interpolatePath(previous, current);
//             // });

//         g.append('g')
//             .attr('transform', `translate(0,${innerHeight})`)
//             .call(d3.axisBottom(xScale));

//         g.append('g').call(d3.axisLeft(yScale));
//     }, [data]);

//     return <svg
//         ref={svgRef}
//         id="lineChart"
//         // width={350} height={300}
//         width="100%" height="100%"
//     >
//         {tooltipData && (
//             <Tooltip x={tooltipData.x} y={tooltipData.y} value={tooltipData.value} />
//         )}
//     </svg>;
// };

// export default LineChart;






// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const Tooltip = ({ x, y, value }) => {
//     return (
//         <div id="tooltip" style={{ display: 'none', position: 'absolute', backgroundColor: 'white', color: 'black', padding: '5px', borderRadius: '5px' }}>
//             {`X: ${x}, Y: ${value}`}
//         </div>
//     );
// };

// const LineChart = ({ data }) => {
//     const svgRef = useRef(null);
//     const [tooltipData, setTooltipData] = useState(null);

//     useEffect(() => {
//         const svg = d3.select(svgRef.current);
//         const width = svg.node().getBoundingClientRect().width;
//         const height = svg.node().getBoundingClientRect().height;

//         const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//         const innerWidth = width - margin.left - margin.right;
//         const innerHeight = height - margin.top - margin.bottom;

//         const xScale = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, d => d.x)])
//             .range([0, innerWidth]);

//         const yScale = d3
//             .scaleLinear()
//             .domain([0, d3.max(data, d => d.y)])
//             .range([innerHeight, 0]);

//         const line = d3
//             .line()
//             .x(d => xScale(d.x))
//             .y(d => yScale(d.y));

//         svg.selectAll('*').remove();

//         const g = svg
//             .append('g')
//             .attr('transform', `translate(${margin.left},${margin.top})`);

//         g.selectAll('.dot')
//             .data(data)
//             .enter()
//             .append('circle')
//             .attr('class', 'dot')
//             .attr('cx', d => xScale(d.x))
//             .attr('cy', d => yScale(d.y))
//             .attr('r', 4)
//             .on("mouseover", function (event, d) {
//                 const tooltip = d3.select("#tooltip");
//                 tooltip.style('left', event.pageX + 10 + 'px');
//                 tooltip.style('top', event.pageY - 10 + 'px');
//                 tooltip.style('font-size', '10px');
//                 tooltip.classed('tooltipPie', true);
//                 tooltip.style('display', 'inline-block');
//                 tooltip.style('background-color', 'white');
//                 tooltip.style('color', 'black');
//                 tooltip.style('position', 'absolute');
//                 tooltip.html('<span>Y: ' + d.y + '<br />' + 'X: ' + d.x + '</span>');
//             })
//             .on('mouseout', () => {
//                 setTooltipData(null);
//                 const tooltip = d3.select("#tooltip");
//                 tooltip.style('display', 'none')
//             });

//         g.append('path')
//             .datum(data)
//             .attr('fill', 'none')
//             .attr('stroke', 'steelblue')
//             .attr('stroke-width', 2)
//             .attr('d', line)
//             .merge(g)
//             .transition()
//             .duration(1000);

//         g.append('g')
//             .attr('transform', `translate(0,${innerHeight})`)
//             .call(d3.axisBottom(xScale));

//         g.append('g').call(d3.axisLeft(yScale));
//     }, [data]);

//     return <svg
//         ref={svgRef}
//         id="lineChart"
//         width="100%" height="100%"
//     >
//         {tooltipData && (
//             <Tooltip x={tooltipData.x} y={tooltipData.y} value={tooltipData.value} />
//         )}
//     </svg>;
// };

// export default LineChart;



// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const Tooltip = ({ x, y, value }) => {
//   return (
//     <div
//       id="tooltip"
//       style={{
//         display: 'none',
//         position: 'absolute',
//         backgroundColor: 'white',
//         color: 'black',
//         padding: '5px',
//         borderRadius: '5px',
//         fontSize: '10px',
//       }}
//     >
//       <span>Y: {value}</span>
//       <br />
//       <span>X: {x}</span>
//     </div>
//   );
// };

// const LineChart = ({ data }) => {
//   const svgRef = useRef(null);
//   const [tooltipData, setTooltipData] = useState(null);

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const width = svg.attr('width');
//     const height = svg.attr('height');

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.x)]).range([0, innerWidth]);

//     const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)]).range([innerHeight, 0]);

//     const line = d3
//       .line()
//       .x((d) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     svg.selectAll('*').remove();

//     const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

//     g.selectAll('.dot')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'dot')
//       .attr('cx', (d) => xScale(d.x))
//       .attr('cy', (d) => yScale(d.y))
//       .attr('r', 4)
//       .on('mouseover', (event, d) => {
//         setTooltipData({ x: xScale(d.x), y: yScale(d.y), value: d.y });
//       })
//       .on('mouseout', () => {
//         setTooltipData(null);
//       });

//     g.append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'steelblue')
//       .attr('stroke-width', 2)
//       .attr('d', line);

//     g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

//     g.append('g').call(d3.axisLeft(yScale));
//   }, [data]);

//   return (
//     <div style={{ position: 'relative', height: '250px', width: '100%' }}>
//       <svg ref={svgRef} width={350} height={300}></svg>
//       {tooltipData && <Tooltip x={tooltipData.x} y={tooltipData.y} value={tooltipData.value} />}
//     </div>
//   );
// };

// export default LineChart;


// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';

// const Tooltip = ({ x, y, value }) => {
//   return (
//     <div
//       id="tooltip"
//       style={{
//         display: 'none',
//         position: 'absolute',
//         backgroundColor: 'white',
//         color: 'black',
//         padding: '5px',
//         borderRadius: '5px',
//         fontSize: '10px',
//       }}
//     >
//       <span>Y: {value}</span>
//       <br />
//       <span>X: {x}</span>
//     </div>
//   );
// };

// const LineChart = ({ data }) => {
//   const svgRef = useRef(null);
//   const [tooltipData, setTooltipData] = useState(null);
//   const [resize,setResize] = useState(0);

//   useEffect(() => {
//     window.addEventListener("resize", () => {
//         setResize(window.innerWidth)
//     })
//   }, [])

//   useEffect(() => {
//     const svg = d3.select(svgRef.current);
//     const width = document.getElementById("lineChart").clientWidth;
//     const height = document.getElementById("lineChart").clientHeight;

//     const margin = { top: 20, right: 30, bottom: 30, left: 40 };
//     const innerWidth = width - margin.left - margin.right;
//     const innerHeight = height - margin.top - margin.bottom;

//     const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.x)]).range([0, innerWidth]);
//     // const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.x)]).range([0, width]);

//     const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)]).range([innerHeight, 0]);

//     const line = d3
//       .line()
//       .x((d) => xScale(d.x))
//       .y((d) => yScale(d.y));

//     svg.selectAll('*').remove();

//     const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

//     g.append('path')
//       .datum(data)
//       .attr('fill', 'none')
//       .attr('stroke', 'lightblue')
//       .attr('stroke-width', 2)
//       .attr('class', "path")
//       .attr('d', line);

//     g.selectAll('.dot')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('class', 'dot')
//       .attr('cx', (d) => xScale(d.x))
//       .attr('cy', (d) => yScale(d.y))
//       .attr('class', 'dot')
//       .attr('r', 4)
//       .on("mouseover", function (event, d) {
//             const tooltip = d3.select("#tooltip");
//             tooltip.style('left', event.pageX + 10 + 'px');
//             tooltip.style('top', event.pageY - 10 + 'px');
//             tooltip.style('font-size', '10px');
//             tooltip.classed('tooltipPie', true);
//             tooltip.style('display', 'inline-block');
//             tooltip.style('background-color', 'white');
//             tooltip.style('color', 'black');
//             tooltip.style('position', 'absolute');
//             tooltip.html('<span>Y: ' + d.y + '<br />' + 'X: ' + d.x + '</span>');
//         })
//         .on('mouseout', () => {
//             setTooltipData(null);
//             const tooltip = d3.select("#tooltip");
//             tooltip.style('display', 'none')
//         });



//     g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

//     g.append('g').call(d3.axisLeft(yScale));
//   }, [data, resize]);

//   return (
//     <div style={{ position: 'relative', height: '250px', width: '100%' }}>
//       <svg 
//       ref={svgRef} 
//       id="lineChart" 
//       width="100%"
//       height="100%"
//       ></svg>
//       {tooltipData && <Tooltip x={tooltipData.x} y={tooltipData.y} value={tooltipData.value} />}
//     </div>
//   );
// };

// export default LineChart;


import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const Tooltip = ({ x, y, value }) => {
  return (
    <div
      id="tooltip"
      style={{
        display: 'none',
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        padding: '5px',
        borderRadius: '5px',
        fontSize: '10px',
      }}
    >
      <span>Y: {value}</span>
      <br />
      <span>X: {x}</span>
    </div>
  );
};

const LineChart = ({ data }) => {
  const svgRef = useRef(null);
  const [resize, setResize] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setResize(window.innerWidth)
    })
  }, [])

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = document.getElementById("lineChart").clientWidth;
    const height = document.getElementById("lineChart").clientHeight;

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.x)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(data, (d) => d.y)]).range([innerHeight, 0]);

    const line = d3
      .line()
      .x((d) => xScale(d.x))
      .y((d) => yScale(d.y));

    svg.selectAll('*').remove();

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const linePath = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'lightblue')
      .attr('stroke-width', 2)
      .attr('class', "path")
      .attr('d', line)
      .attr('stroke-dasharray', function () {
        return this.getTotalLength() + ' ' + this.getTotalLength();
      })
      .attr('stroke-dashoffset', function () {
        return this.getTotalLength();
      })
      .transition()
      .duration(1500) // Transition duration in milliseconds (same as the line animation)
      .ease(d3.easeLinear) // Transition easing function (linear in this case)
      .attr('stroke-dashoffset', 0);

    // Animate points along with line
    let dotSelection = undefined
    g.selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', (d) => 0) // Initialize points at the start
      .attr('cy', (d) => 0) // Initialize points at the start
      .attr('r', 4)
      // .transition()
      // .duration(4000) // Transition duration matching the line animation
      // .ease(d3.easeLinear) // Transition easing function (linear)
      .attr('cx', (d) => xScale(d.x))
      .attr('cy', (d) => yScale(d.y))
      .on("mouseover", function (event, d) {
        const tooltip = d3.select("#tooltip");
        tooltip.style('left', event.pageX + 10 + 'px');
        tooltip.style('top', event.pageY - 10 + 'px');
        tooltip.style('font-size', '10px');
        tooltip.classed('tooltipPie', true);
        tooltip.style('display', 'inline-block');
        tooltip.style('background-color', 'white');
        tooltip.style('color', 'black');
        tooltip.style('position', 'absolute');
        tooltip.html('<span>Y: ' + d.y + '<br />' + 'X: ' + d.x + '</span>');

        dotSelection = d3.select(this);

        dotSelection
        .transition()
        .duration(200)
        .attr('r', 6)
        .ease(d3.easeBackIn)
      })
      .on('mouseout', () => {
        const tooltip = d3.select("#tooltip");
        tooltip.style('display', 'none');
        console.log("rew: ", dotSelection);
        dotSelection
        .transition()
        .duration(200)
        .attr('r', () => {console.log("rew: "); return 4})
        .ease(d3.easeBackOut);

      })
      .style('opacity', 0)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .style('opacity', 1);

    g.append('g').attr('transform', `translate(0,${innerHeight})`).call(d3.axisBottom(xScale));

    g.append('g').call(d3.axisLeft(yScale));

  }, [data, resize]);

  return (
    <div style={{ position: 'relative', height: '250px', width: '100%' }}>
      <svg
        ref={svgRef}
        id="lineChart"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }} // Ensure points are visible outside of SVG bounds
      ></svg>
      <Tooltip />
    </div>
  );
};

export default LineChart;
