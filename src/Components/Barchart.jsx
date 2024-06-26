import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getCountry } from '../api/api'; // Assuming you have an API function to fetch country data

const Barchart = () => {
  const [barchartData, setBarchartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCountry(); // Fetching country data from your API
        if (data) {
          // Count occurrences of each country
          const countryCounts = countCountryOccurrences(data);
          // Transform into array of objects for charting
          const chartData = Object.keys(countryCounts).map(country => ({
            country: country,
            count: countryCounts[country]
          }));
          setBarchartData(chartData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const countCountryOccurrences = (data) => {
    return data.reduce((counts, d) => {
      if (d.country in counts) {
        counts[d.country]++;
      } else {
        counts[d.country] = 1;
      }
      return counts;
    }, {});
  };

  const chartRef = useRef();

  useEffect(() => {
    if (barchartData.length > 0) {
      // Clean up previous chart
      d3.select(chartRef.current).selectAll("*").remove();
      // Draw new chart with animation
      drawChart();
    }
  }, [barchartData]);

  const drawChart = () => {
    // Define chart dimensions and margins
    const width = 960;
    const height = 600;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 90;
    const marginLeft = 65;

    // Create scales
    const x = d3.scaleBand()
      .domain(barchartData.map(d => d.country))
      .range([marginLeft, width - marginRight])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(barchartData, d => d.count)])
      .nice()
      .range([height - marginBottom, marginTop]);

    // Create SVG element
    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height);

    // Add bars with initial state
    svg.selectAll("rect")
      .data(barchartData)
      .join("rect")
        .attr("x", d => x(d.country))
        .attr("y", height - marginBottom) // Start from bottom for animation
        .attr("width", x.bandwidth())
        .attr("height", 0) // Start with zero height for animation
        .attr("fill", "orange") // Change color to orange
      .transition() // Apply transition
        .duration(1000) // Duration of animation
        .delay((d, i) => i * 100) // Delay for each bar
        .attr("y", d => y(d.count))
        .attr("height", d => height - marginBottom - y(d.count));

    // Add x-axis with transition
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
      .transition() // Apply transition
        .duration(1000); // Duration of animation

    // Add y-axis with transition
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(10, "s"))
      .transition() // Apply transition
        .duration(1000); // Duration of animation

    // Add chart title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", marginTop / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .text("Bar Chart");

    // Cleanup
    return () => {
      svg.selectAll("*").remove();
    };
  };

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Barchart;
