import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';

const data1 = [
    { name: '<5', value: 2704659 },
    { name: '5-13', value: 4499890 },
    { name: '14-17', value: 2159981 },
    { name: '18-24', value: 3853788 },
    { name: '25-44', value: 14106543 },
    { name: '45-64', value: 8819342 },
    { name: '>=65', value: 612463 },
];

const data2 = [
    { name: 'Category D', value: 50 },
    { name: 'Category E', value: 60 },
    { name: 'Category F', value: 20 },
];

const PieChart = () => {
    const svgRef = useRef();
    const [data, setData] = useState(data1);
    const [resize, setResize] = useState(0);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setResize(window.innerWidth)
        })
    }, [])

    React.useEffect(() => {
        // let i = 0
        // setInterval(() => {
        //   console.log('i: ', i)

        const colors = [
            '#98abc5',
            '#8a89a6',
            '#7b6888',
            '#6b486b',
            '#a05d56',
            '#d0743c',
            '#ff8c00',
        ]

        var color = d3.scaleOrdinal().range(colors)

        let width = 0, height = 0;

        if (document.getElementById("fullChartModal")?.clientWidth) {
            width = document.getElementById("fullChartModal").clientWidth - 32 - 32;
            height = document.getElementById("fullChartModal").clientHeight - 32 - 16 - 24 - 20 - 21;
        } else {
            width = document.getElementById("pieChart").clientWidth;
            height = document.getElementById("pieChart").clientHeight;
        }

        const margin = { top: 20, right: 20, bottom: 30, left: 40 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        // const radius = Math.min(innerWidth, innerHeight) / 2
        const radius = Math.min(width, innerHeight) / 2

        var arc = d3
            .arc()
            .outerRadius(radius - 10)
            .innerRadius(0)

        var pie = d3.pie().value(function (d) {
            return d.value
        })
        const svg = d3.select(svgRef.current);

        svg.selectAll('*').remove()

        let g = svg
            .append('g')
            .attr('transform', 'translate(' + ((innerWidth / 2) + margin.left - 10) + ',' + ((innerHeight / 2) + margin.top) + ')')

        g = g
            .selectAll('.arc')
            .data(pie(data))
            .join('g')
            .attr('class', 'arc')
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('transform', function (d) {
                        var offset = 10; // Adjust the explosion distance
                        var angle = (d?.startAngle + d?.endAngle) / 2;
                        const x = Math.sin(angle) * offset;
                        const y = -Math.cos(angle) * offset;
                        return 'translate(' + x + ',' + y + ')'
                    })
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr('transform', 'translate(0,0)')
            })

        g.append('path')
            .attr('d', (d) => {
                return arc(d)
            })
            .style('fill', function (d) {
                return color(d.data.name)
            })
            .attr('class', 'slice')
            .transition()
            .duration(1000) // Transition duration for chart creation
            .attrTween('d', function (d) {
                var interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            });

        g.selectAll('label').remove();

        g.append('text')
            .attr('transform', function (d) {
                return 'translate(' + arc.centroid(d) + ')'
            })
            .attr('dy', '.35em')
            .attr('class', 'label')
            .style('text-anchor', 'middle')
            .text(function (d) {
                return d.data.name
            })
            .attr('fill', 'white')
            .style('cursor', 'default')
            .style('font-size', document.getElementById("fullChartModal")?.clientWidth ? '14px' : '10px')
            .style('opacity', 0)
            .transition()
            .duration(2000)
            .style('opacity', 1);

        //   i++
        // }, 3000)
    }, [data, resize])

    // useEffect(() => {
    //     const svg = d3.select(svgRef.current);
    //     // const width = 250;
    //     // const height = 250;
    //     const width = document.getElementsByClassName("pieSvg")[0].clientWidth;
    //     const height = document.getElementsByClassName("pieSvg")[0].clientHeight;
    //     const radius = Math.min(width, height) / 2;
    //     const color = d3.scaleOrdinal().range(['#98abc5', '#8a89a6', '#7b6888']);
    //     const pie = d3.pie().value((d) => d.value);
    //     const arc = d3.arc().innerRadius(0).outerRadius(radius).padAngle(0);
    //     var div = d3.select('body').append('div').attr('class', 'toolTip');

    //     const arcs = svg.selectAll('.arc').data(pie(data));

    //     arcs.select('text')
    //         .selectAll('tspan')
    //         .data(function (d) {
    //             return [d.data.name, d.data.value];
    //         })
    //         .text(function (d) {
    //             return d;
    //         });

    //     // Update existing arcs
    //     arcs.select('path')
    //         .attr('d', arc)
    //         .transition()
    //         .duration(500)
    //         .attrTween('d', function (d) {
    //             const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
    //             return function (t) {
    //                 return arc(interpolate(t));
    //             };
    //         })
    //         .attr('fill', (d) => color(d.data.name));


    //     // Enter new arcs
    //     const newArcs = arcs
    //         .enter()
    //         .append('g')
    //         .attr('class', 'arc')
    //         .style('transform', (d) => {
    //             var offset = 0;
    //             var angle = (d?.startAngle + d?.endAngle) / 2;
    //             var xOff = (Math.sin(angle) * offset) + (width / 2);
    //             var yOff = (-Math.cos(angle) * offset) + (height / 2);
    //             return `translate(${xOff}px,${yOff}px)`
    //         });



    //     newArcs
    //         .append('path')
    //         .attr('d', arc)
    //         .attr('stroke', '#3fa9f5')
    //         .attr('fill', (d) => color(d.data.name))
    //         .on('mouseover', function (event, d) {
    //             setHoveredSlice(d);

    //             var offset = 10;
    //             var angle = (d?.startAngle + d?.endAngle) / 2;
    //             var xOff = (Math.sin(angle) * offset) + (width / 2);
    //             var yOff = (-Math.cos(angle) * offset) + (height / 2);
    //             d3.select(this.parentNode).style("transform", `translate(${xOff}px,${yOff}px)`).transition().duration(200)

    //             div.style('left', event?.pageX + 'px');
    //             div.style('top', event?.pageY + 'px');
    //             div.style('display', 'inline-block');
    //             div.style('position', 'absolute');
    //             div.html(d.data.name + '<br>' + d.data.value);

    //             // d3.select(this)
    //             //     .transition()
    //             //     .duration(200)
    //             //     .attr(
    //             //         'd',
    //             //         d3
    //             //             .arc()
    //             //             .innerRadius(0)
    //             //             .outerRadius(radius + 20)
    //             //             .padAngle(0.2)
    //             //     );
    //         })
    //         .on('mouseout', function () {
    //             setHoveredSlice(null);
    //             div.style('display', 'none');

    //             var xOff = (width / 2);
    //             var yOff = 0 + (height / 2);
    //             d3.select(this.parentNode).style("transform", `translate(${xOff}px,${yOff}px)`).transition().duration(200)
    //             // d3.select(this)
    //             //     .transition()
    //             //     .duration(200)
    //             //     .attr('d', arc);
    //         })
    //         .on('mousemove', function (event, d) {
    //             setHoveredSlice(d);

    //             div.style('left', event?.pageX + 10 + 'px');
    //             div.style('top', event?.pageY - 25 + 'px');
    //             div.style('display', 'inline-block');
    //             div.style('position', 'absolute');
    //             div.classed('tooltipPie', true);
    //             div.html(d.data.name + '<br>' + d.data.value);
    //         });

    //     // Append labels to each slice
    //     newArcs
    //         .append('text')
    //         .attr('transform', function (d) {
    //             const pos = arc.centroid(d);
    //             return 'translate(' + pos + ')';
    //         })
    //         .attr('dy', '0.35em')
    //         .attr('text-anchor', 'middle')
    //         .style('font-size', '10px')
    //         .each(function (d) {
    //             for (let i = 0; i < 2; i++) {
    //                 const lineHeight = 15;
    //                 d3.select(this)
    //                     .append('tspan')
    //                     .attr('x', 0)
    //                     .attr('dy', i === 0 ? 0 : lineHeight + 'px')
    //                     .attr('fill', 'lightblue')
    //                     .text(i === 0 ? d.data.name : d.data.value);
    //             }
    //         });


    // }, [data, resize]);

    return (
        <div style={{ position: 'relative', height: '260px', width: '100%' }}>
            {/* <button
                onClick={() => setData((prevData) => (prevData[0].name === data1[0].name ? data2 : data1))}
                style={{ height: "21px" }}
            >
                Toggle Data
            </button> */}
            {/* <div className="pie-chart" style={{ justifyContent: 'center', height: 'calc(100% - 21px)', width: "100%" }}> */}
            <div className="pie-chart" style={{ justifyContent: 'center', height: 'calc(100%)', width: "100%" }}>
                <svg
                    ref={svgRef}
                    width="100%"
                    height="100%"
                    id='pieChart'
                    style={{
                        overflow: 'visible',
                    }}
                ></svg>
            </div>
        </div>
    );
};

export default PieChart;

