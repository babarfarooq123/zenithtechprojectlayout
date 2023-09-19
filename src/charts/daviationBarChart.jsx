import React from 'react'
import * as d3 from 'd3'

const DaviationBarChart = () => {
    React.useEffect(() => {
        const data = [
            { x: '1994', y: 15 },
            { x: '1995', y: 23 },
            { x: '1996', y: -8 },
            { x: '1997', y: -10 },
            { x: '1998', y: -53 },
            { x: '1999', y: -25 },
        ]
        const colors = ['lightblue', '#7b6888']

        const width = document.getElementById("barChart").clientWidth;
        const height = document.getElementById("barChart").clientHeight;

        const svg = d3
            .select('#daviationBar')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        const margin = { top: 20, right: 20, bottom: 30, left: 40 }
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom

        const g = svg
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        const xScale = d3
            .scaleBand()
            .domain(data.map((d) => d.x))
            .range([0, innerWidth])
            .padding(0.2)

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, (d) => d.y))
            .range([innerHeight, 0])

        const rect = g
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('fill', 'black')
            .attr('height', 0)
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => (d.y >= 0 ? yScale(d.y) : yScale(0)))
            .attr('x', (d) => xScale(d.x))
            .style('fill', (d, i) => (i % 2 == 0 ? colors[0] : colors[1]))
            .style('stroke', (d, i) => (i % 2 == 0 ? colors[0] : colors[1]))

        rect
            .attr('x', (d) => xScale(d.x))
            .attr('width', xScale.bandwidth())
            .attr('y', (d) => (d.y >= 0 ? yScale(d.y) : yScale(0)))
            .transition()
            .duration(600)
            .ease(d3.easeBackIn)
            .attr('height', (d) => Math.abs(yScale(0) - yScale(d.y)))

        // // Create y-axis line
        g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', innerHeight)
            .attr('stroke', 'black')
            .attr('stroke-width', '2')

        // // Create y-axis labels and lines pointing to the labels
        const yLabels = g
            .selectAll('.y-label')
            .data(yScale.ticks()) // Adjust the number of ticks as needed
            .enter()
            .append('g')
            .attr('class', 'y-label')

        yLabels
            .append('line')
            .attr('x1', -5) // Adjust the length of the lines as needed
            .attr('y1', (d) => yScale(d))
            .attr('x2', 0)
            .attr('y2', (d) => yScale(d))
            .attr('stroke', 'black')
            .attr('stroke-width', '2')

        yLabels
            .append('text')
            .attr('x', -10)
            .attr('y', (d) => yScale(d))
            .attr('dy', '0.35em')
            .style('text-anchor', 'end')
            .text((d) => d)

        // // Add labels to the bars
        g.append('line')
            .attr('x1', 0)
            .attr('y1', yScale(0))
            .attr('x2', innerWidth)
            .attr('y2', yScale(0))
            .attr('stroke', 'black')
            .attr('stroke-width', '2')

        g.selectAll('.bar-label')
            .data(data)
            .enter()
            .append('text')
            .attr('class', 'bar-label')
            .attr('x', (d) => xScale(d.x) + xScale.bandwidth() / 2)
            .attr('y', (d) => (d.y >= 0 ? yScale(0) + 12 : yScale(0) - 6)) // Adjust vertical position
            .attr('text-anchor', 'middle')
            .style('font-size', '10')
            .text((d) => d.x)
    }, [])
    return (
        // <svg id="daviationBar"></svg>
        <div style={{ position: 'relative', height: "260px", width: "100%", overflow: 'hidden' }}>
            <svg
                id="daviationBar"
                // ref={svgRef}
                width="100%"
                height="100%"
                // className="scatterChart"
                style={{
                    overflow: 'visible',
                }}
            ></svg>
            {/* <Tooltip /> */}
        </div>
    )
}

export default DaviationBarChart;