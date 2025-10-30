"use strict";

/*
  Rick Li – Lab #7
  Hypothesis: As my golf score decreases (better performance), my happiness after playing increases.
  Visualization: Scatterplot using D3.js
  X Axis → Golf Score
  Y Axis → Happiness After Playing
*/

// ------------------- SVG CONFIG -------------------
const width = 800;
const height = 600;
const margin = 60;

const svg = d3.select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "white");

// ------------------- DATASET -------------------
// Golf & Happiness data collected from 2025-09–10
const dataset = [
  { score: 93, happinessAfter: 8 },
  { score: 90, happinessAfter: 8 },
  { score: 88, happinessAfter: 10 },
  { score: 91, happinessAfter: 9 },
  { score: 95, happinessAfter: 7 },
  { score: 92, happinessAfter: 8 },
  { score: 90, happinessAfter: 8 },
  { score: 87, happinessAfter: 10 },
  { score: 89, happinessAfter: 9 } // NEW: 2025-10-29 Quilchena Golf Club
];

// ------------------- SCALES -------------------
const xScale = d3.scaleLinear()
  .domain([d3.min(dataset, d => d.score) - 1, d3.max(dataset, d => d.score) + 1]) // input domain
  .range([margin, width - margin]); // output range

const yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d.happinessAfter)]) // input domain
  .range([height - margin, margin]); // flipped for graph orientation

// ------------------- PLOT POINTS -------------------
svg.selectAll("circle")
  .data(dataset)
  .join("circle")
  .attr("cx", d => xScale(d.score))
  .attr("cy", d => yScale(d.happinessAfter))
  .attr("r", 8)
  .attr("fill", "gray")
  .attr("opacity", 0.8);

// ------------------- AXES -------------------
const xAxis = d3.axisBottom(xScale).ticks(6);
const yAxis = d3.axisLeft(yScale).ticks(5);

svg.append("g")
  .attr("transform", `translate(0, ${height - margin})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", `translate(${margin}, 0)`)
  .call(yAxis);

// ------------------- LABELS -------------------
// X Axis label
svg.append("text")
  .attr("x", width / 2)
  .attr("y", height - 20)
  .attr("text-anchor", "middle")
  .text("Golf Score (lower is better)")
  .style("fill", "black");

// X Axis value labels
svg.append("text")
  .attr("x", margin)
  .attr("y", height - 5)
  .attr("text-anchor", "start")
  .text("86")
  .style("fill", "black");

svg.append("text")
  .attr("x", width - margin)
  .attr("y", height - 5)
  .attr("text-anchor", "end")
  .text("96")
  .style("fill", "black");

// Y Axis label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .text("Happiness After Playing (0–10)")
  .style("fill", "black");

// Y Axis value labels
svg.append("text")
  .attr("x", margin - 30)
  .attr("y", height - margin)
  .attr("text-anchor", "end")
  .text("0")
  .style("fill", "black");

svg.append("text")
  .attr("x", margin - 30)
  .attr("y", margin + 10)
  .attr("text-anchor", "end")
  .text("10")
  .style("fill", "black");
