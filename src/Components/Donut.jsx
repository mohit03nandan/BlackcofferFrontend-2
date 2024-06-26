import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { getTopics } from '../api/api'; // Assuming you have an API function to fetch topic data

const Donut = () => {
  const [donutData, setDonutData] = useState([]);
  const chartRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTopics(); // Fetching topic data from your API
        if (data) {
          console.log("Fetched data:", data);

          // Count occurrences of each topic
          const topicCounts = data.reduce((acc, curr) => {
            acc[curr.topic] = (acc[curr.topic] || 0) + 1;
            return acc;
          }, {});

          // Transform into array of objects for charting
          const chartData = Object.keys(topicCounts).map(topic => ({
            name: topic,
            value: topicCounts[topic]
          }));

          console.log("Chart data:", chartData);
          setDonutData(chartData.slice(0, 10)); // Only use the first 10 items
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (donutData.length > 0) {
      // Clean up previous chart
      d3.select(chartRef.current).selectAll("*").remove();
      // Draw new chart with animation
      drawChart();
    }
  }, [donutData]);

  const drawChart = () => {
    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2;

    const arc = d3.arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

    const color = d3.scaleOrdinal()
      .domain(donutData.map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), donutData.length).reverse());

    const svg = d3.select(chartRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    const arcs = pie(donutData);

    const path = svg.append("g")
      .selectAll("path")
      .data(arcs)
      .join("path")
        .attr("fill", d => color(d.data.name))
        .attr("d", arc)
        .each(function(d) { this._current = d; }); // store the initial angles

    path.transition()
      .duration(1000)
      .attrTween("d", function(d) {
        const i = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return function(t) {
          return arc(i(t));
        };
      });

    path.append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(arcs)
      .join("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .call(text => text.append("tspan")
            .attr("y", "-0.4em")
            .attr("font-weight", "bold")
            .text(d => d.data.name))
        .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
            .attr("x", 0)
            .attr("y", "0.7em")
            .attr("fill-opacity", 0.7)
            .text(d => d.data.value.toLocaleString("en-US")));
  };

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
};

export default Donut;
