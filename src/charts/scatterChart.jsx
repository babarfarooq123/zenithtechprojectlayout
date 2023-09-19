import React, { useRef } from 'react'
import * as d3 from 'd3'

const Tooltip = ({ x, y, value }) => {
    return (
        <div
            id="scatterDotTooltip"
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

const ScatterChart = () => {
    const svgRef = useRef(null);

    React.useEffect(() => {
        const ScatterPlot = async () => {
            const csvUrl =
                'https://raw.githubusercontent.com/pcm-dpc//COVID-19/master/dati-andamento-nazionale/dpc-covid19-ita-andamento-nazionale.csv'
            const data = await d3.csv(csvUrl, (d) => ({
                date: new Date(d.data),
                yValue:
                    d.nuovi_positivi === '' || d.nuovi_positivi === undefined
                        ? 0
                        : Math.abs(d.nuovi_positivi),
                rValue:
                    d.terapia_intensiva === '' || d.terapia_intensiva === undefined
                        ? 0
                        : +d.terapia_intensiva,
            }))
            const width = document.getElementById("barChart").clientWidth;
            const height = document.getElementById("barChart").clientHeight;
            // const margin = { top: 20, right: 30, bottom: 30, left: 40 };
            const margin = { top: 20, right: 30, bottom: 60, left: 70 };
            const innerWidth = width - margin.left - margin.right;
            const innerHeight = height - margin.top - margin.bottom;

            const xScale = d3
                .scaleTime()
                .domain(d3.extent(data, (d) => d.date))
                .range([0, innerWidth])

            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(data, (d) => d.yValue))
                .range([innerHeight, 0])

            const rScale = d3
                .scaleSqrt()
                .domain([0, d3.max(data, (d) => d.rValue)])
                .range([0, 2])

            const svg = d3.select(svgRef.current);

            svg.selectAll('*').remove();

            const g = svg
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            let dotSelection = undefined

            g.selectAll('g.scattercircle')
                .data(data)
                .join(
                    // 'circle'
                    enter => enter.append('circle')
                        .attr('class', 'scattercircle')
                        .attr('cx', (d) => xScale(d.date))
                        .attr('cy', (d) => yScale(d.yValue))
                        .attr('r', 0)
                        .transition()
                        .duration(2000)
                        .attr('r', (d) => rScale(d.rValue)),

                    update => update
                        .transition()
                        .duration(2000)
                        .attr('cx', (d) => xScale(d.date))
                        .attr('cy', (d) => yScale(d.yValue))
                )
                // .attr('class', 'scattercircle')
                // .attr('cx', (d) => xScale(d.date))
                // .attr('cy', (d) => yScale(d.yValue))
                // .attr('r', (d) => rScale(d.rValue))
                .attr('fill', 'lightblue')
                .attr('stroke', 'lightblue')
                .on("mousemove", function (event, d) {
                    const containerRect = svgRef.current.getBoundingClientRect();
                    const tooltip = d3.select("#scatterDotTooltip");
                    tooltip.style('left', event.clientX - containerRect.left - margin.left + 80 + 'px');
                    tooltip.style('top', event.clientY - containerRect.top - margin.top + 30 + 'px');
                    tooltip.style('font-size', '10px');
                    tooltip.classed('tooltipPie', true);
                    tooltip.style('display', 'flex');
                    tooltip.style('flex-wrap', 'wrap');
                    tooltip.style('background-color', 'white');
                    tooltip.style('color', 'black');
                    tooltip.style('position', 'absolute');
                    tooltip.html('<span>Y: ' + d.yValue + '<br />' + 'X: ' + new Date(d.date).getFullYear() + '</span>');

                    dotSelection = d3.select(this);
                    dotSelection
                        .transition()
                        .duration(200)
                        .attr('r', d => parseFloat(rScale(d.rValue)) + 4)
                        .ease(d3.easeBackIn)
                })
                .on("mouseout", (event, d) => {
                    const tooltip = d3.select("#scatterDotTooltip");
                    tooltip.style('display', 'none');
                    dotSelection
                        .transition()
                        .duration(200)
                        .attr('r', d => parseFloat(rScale(d.rValue)))
                        .ease(d3.easeBackOut);
                });

            g.append('path')
                .datum(data)
                .attr('fill', 'none')
                // .attr('display', 'none')
                .attr('stroke', 'lightblue')
                .attr('stroke-width', 0.5)
                .attr('class', 'scatterPlotLine')
                .attr('d',
                    d3.line()
                        .x((d) => xScale(d.date))
                        .y((d) => yScale(d.yValue))
                );

            const xAxis = d3.axisBottom(xScale) // Create the x-axis
            svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${innerHeight + margin.top})`) // Position the x-axis at the bottom
                .call(xAxis)
                .selectAll('text') // Select all text elements of the x-axis
                .attr('transform', 'rotate(-45)') // Rotate the text labels by -45 degrees
                .style('text-anchor', 'end');

            const yAxis = d3.axisLeft(yScale) // Create the x-axis
            svg
                .append('g')
                .attr('transform', `translate(${margin.left}, ${margin.top})`) // Position the x-axis at the bottom
                .call(yAxis)

            // svg.append('g')
            // .attr('transform', `translate(${margin.left}, ${innerHeight + margin.bottom + 10})`)
            // .data([null])
            // .append('text')
            // .text(d => "X-AXIS LABEL")
            // .attr('x', innerWidth/2)
            // .attr('y', 0)
            // .style('text-anchor', 'middle')

            svg.selectAll('g.xLabelG')
                .data([null])
                .join(
                    enter => enter.append('g')
                        .attr('class', 'xLabelG')
                        .attr('transform', `translate(${margin.left}, ${innerHeight + margin.bottom + 10})`)
                        .selectAll('text.xLabelText')
                        .data([null])
                        .join('text')
                        .text(d => "X-AXIS LABEL")
                        .attr('class', 'xLabelText')
                        .attr('x', innerWidth / 2)
                        .attr('y', 20)
                        .style('text-anchor', 'middle')
                        .attr('fill', '#7b6888')
                        .transition()
                        .duration(2000)
                        .attr('y', 0)
                )

            // svg.append('g')
            //     .attr('transform', `translate(${margin.left / 2 - 20}, ${(180) / 2})`)
            //     .data([null])
            //     .append('text')
            //     .text(d => "Y-AXIS LABEL")
            //     .attr('x', 0)
            //     .attr('y', 0)
            //     .style('text-anchor', 'middle')
            //     .attr('transform', 'rotate(-90)')
            //     .style('text-anchor', 'middle');


            svg.selectAll('g.yLabelG')
                .data([null])
                .join(
                    enter => enter.append('g')
                        .attr('class', 'yLabelG')
                        .attr('transform', `translate(${margin.left / 2 - 20}, ${(180) / 2})`)
                        .selectAll('text.yLabelText')
                        .data([null])
                        .join('text')
                        .text(d => "Y-AXIS LABEL")
                        .attr('x', 0)
                        .attr('y', -20)
                        .style('text-anchor', 'middle')
                        .attr('transform', 'rotate(-90)')
                        .attr('fill', '#7b6888')
                        .transition()
                        .duration(2000)
                        .attr('y', 0)
                )
        }
        ScatterPlot()
    }, [])
    return (
        <div style={{ position: 'relative', height: "260px", width: "100%", overflow: 'hidden' }}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="scatterChart"
                style={{
                    overflow: 'visible',
                }}
            ></svg>
            <Tooltip />
        </div>
    )
}

export default ScatterChart
