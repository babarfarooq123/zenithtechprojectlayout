import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data }) => {
  const svgRef = useRef(null);
  const [tooltipData, setTooltipData] = useState(null);

  useEffect(() => {    
    const svg = d3.select(svgRef.current);
    const width = document.getElementById("barChart").clientWidth;
    const height = document.getElementById("barChart").clientHeight;
    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.x))
      .range([0, innerWidth])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.y)])
      .nice()
      .range([innerHeight, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.selectAll('*').remove();

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

      let barSelection = undefined

    g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => xScale(d.x))
      .attr('y', d => yScale(d.y) - 4)
      // .attr('y', d => innerHeight)
      .attr('width', xScale.bandwidth())
      .attr('stroke-width', 8)
      .attr('stroke', "lightblue")
      .attr('height', d => innerHeight - yScale(d.y))
      // .attr('height', 0)
      .attr('fill', 'lightblue')
      .on('mouseover', (event, d) => {
        const containerRect = svgRef.current.getBoundingClientRect();
        setTooltipData({ x: xScale(d.x), y: yScale(d.y), value: d.y, left: event.clientX - containerRect.left - margin.left + 20, top: event.clientY - containerRect.top - margin.top + 20 });

        barSelection = d3.select(event.target)
        barSelection.attr('stroke', 'rgba(123, 104, 136, 0.5');
      })
      .on('mouseout', () => {
        setTooltipData(null);
        barSelection.attr('stroke', 'lightblue')
      })
      .on('mousemove', (event, d) => {
        const containerRect = svgRef.current.getBoundingClientRect();
        setTooltipData({ x: xScale(d.x), y: yScale(d.y), value: d.y, left: event.clientX - containerRect.left - margin.left + 50, top: event.clientY - containerRect.top - margin.top + 20 });
      })
      // .attr('height', 0)
      // .transition()
      // .duration(1000)
      // .attr('y', d => yScale(d.y))
      // .attr('height', d => Math.max(0, innerHeight - yScale(d.y) - 4))
      // .ease(d3.easeBackIn)

    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(xAxis);

    g.append('g').call(yAxis);
  }, [data]);

  return (
    <div style={{ position: 'relative', height: "260px", width: "100%", overflow: "hidden" }}>
      <svg ref={svgRef}
        id="barChart"
        width="100%" 
        height="100%"
        overflow="hidden"
      ></svg>
      {tooltipData && (
        <div
          style={{
            id: "barTooltip",
            position: 'absolute',
            left: `${tooltipData.left}px`,
            top: `${tooltipData.top}px`,
            border: "1px solid grey",
            backgroundColor: "white",
            borderRadius: "8px",
            padding: "4px",
            fontSize: "10px"
          }}
        >
          <span>X: {Math.round(tooltipData?.x, 0)}</span>
          <br />
          <span>Y: {Math.round(tooltipData?.y, 0)}</span>
        </div>
      )}
    </div>
  );
};

export default BarChart;
