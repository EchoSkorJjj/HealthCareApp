import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const HeatMap = ({ monthlyData }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove(); // Clear previous SVG elements

        const colorScale = d3.scaleSequential()
                            .domain([0, d3.max(monthlyData)])
                            .interpolator(d3.interpolateBlues);

        svg.selectAll('rect')
        .data(monthlyData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i % 7) * 30)
        .attr('y', (d, i) => Math.floor(i / 7) * 30)
        .attr('width', 28)
        .attr('height', 28)
        .attr('fill', d => d !== null ? colorScale(d) : 'grey');

        svg.selectAll('text')
        .data(monthlyData)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i % 7) * 30 + 14)  // Center the text in the block
        .attr('y', (d, i) => Math.floor(i / 7) * 30 + 18) // Center the text in the block
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text((d, i) => i + 1);  // You can replace this with the actual date or day
    }, [monthlyData]);

    return (
        <div>
        <h3>Monthly Data</h3>
        <svg ref={ref} width={220} height={220}></svg>
        </div>
    );
};

export default HeatMap;
