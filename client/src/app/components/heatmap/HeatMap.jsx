import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './HeatMap.scss';

const HeatMap = ({ monthlyData, onDateClick }) => {
    const ref = useRef();

    useEffect(() => {
        const svg = d3.select(ref.current);
        svg.selectAll('*').remove(); // Clear previous SVG elements

        const colorScale = d3.scaleSequential()
                            .domain([0, d3.max(monthlyData)])
                            .interpolator(d3.interpolateBlues);
        // Create tooltip
        const tooltip = d3.select('body')
                            .append('div')
                            .attr('class', 'tooltip')
                            .style('opacity', 0);

        // Function to handle mouseover
        const mouseover = (event, d) => {
            tooltip.transition()
                    .duration(200)
                    .style('opacity', 1);
            d3.select(event.currentTarget)
                .style('stroke', 'black')
                .style('stroke-width', 2);
        };

        // Function to handle mouseout
        const mouseout = (event, d) => {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
            d3.select(event.currentTarget)
            .style('stroke', 'none');
        };

        // Function to handle click
        const click = (event, d, i) => {
            onDateClick(i); // Call the passed in function with the data for the clicked date
        };

        svg.selectAll('rect')
        .data(monthlyData)
        .enter()
        .append('rect')
        .attr('x', (d, i) => (i % 7) * 30)
        .attr('y', (d, i) => Math.floor(i / 7) * 30)
        .attr('width', 28)
        .attr('height', 28)
        .attr('fill', d => d !== null ? colorScale(d) : 'grey')
        .on('mouseover', mouseover)
        .on('mouseout', mouseout)
        .on('click', click)
        .on('click', (event, d) => {
            const i = monthlyData.indexOf(d); // Get the index of the current data in the array
            onDateClick(i);
        })
        .style('cursor', 'pointer');

        // Add text labels
        svg.selectAll('text')
        .data(monthlyData)
        .enter()
        .append('text')
        .attr('x', (d, i) => (i % 7) * 30 + 14) 
        .attr('y', (d, i) => Math.floor(i / 7) * 30 + 18)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .text((d, i) => i + 1)
        .style('pointer-events', 'none')
        .on('click', (event, d) => {
            const i = monthlyData.indexOf(d); // Get the index of the current data in the array
            onDateClick(i);
        })
        .style('cursor', 'pointer');
    }, [monthlyData, onDateClick]);

    return (
        <div>
        <h3>Monthly Data</h3>
        <svg ref={ref} width={220} height={220}></svg>
        </div>
    );
};

export default HeatMap;
