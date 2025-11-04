"use strict";

/*
  Rick Li – Class Homework #7
  Hypothesis: As my golf score decreases (better performance), my happiness after playing increases.
  In addition, longer game duration might positively affect my happiness level.
  Visualization: Scatterplot using D3.js with circle radius representing duration.
  X Axis → Golf Score
  Y Axis → Happiness After Playing
  Radius → Duration (minutes)
*/

// ------------------- SVG CONFIG -------------------
const width = 850;
const height = 600;
const margin = 60;

const svg = d3.select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .style("background-color", "white");

// ------------------- DATASET -------------------
// Golf performance data collected from September–November 2025
// score = total strokes (lower = better performance)
// happinessAfter = self-rated mood after round (0–10)
// duration = total play time in minutes (used for circle radius)
const dataset = [
  { score: 93, happinessAfter: 8, duration: 220 }, 
  { score: 90, happinessAfter: 8, duration: 240 }, 
  { score: 88, happinessAfter: 10, duration: 260 }, 
  { score: 91, happinessAfter: 9, duration: 245 }, 
  { score: 95, happinessAfter: 7, duration: 210 }, 
  { score: 92, happinessAfter: 8, duration: 230 }, 
  { score: 90, happinessAfter: 8, duration: 250 }, 
  { score: 87, happinessAfter: 10, duration: 275 }, 
  { score: 89, happinessAfter: 9, duration: 260 }, 

  // ✅ New observation: 2025-11-02 – Langara Golf Course
  // Date: 2025-11-02
  // Time: started at 11:00 a.m., total duration 4 hours
  // Location: Langara Golf Course, Vancouver
  // Weather: overcast, 12°C
  // Holes: 18
  // Score: 91 strokes
  // Walking: no
  // Happiness before: 4, after: 8
  { score: 91, happinessAfter: 8, duration: 240 }
];

// ------------------- SCALES -------------------
const xScale = d3.scaleLinear()
  .domain([84, 96]) // input domain: score range
  .range([margin, width - margin]); // output range

const yScale = d3.scaleLinear()
  .domain([6, 10]) // input domain: happiness range
  .range([height - margin, margin]); // flipped for graph orientation

const rScale = d3.scaleLinear()
  .domain([200, 300]) // input domain: duration range in minutes
  .range([6, 18]); // output range: circle radius size

// ------------------- PLOT POINTS -------------------
svg.selectAll("circle")
  .data(dataset)
  .join("circle")
  .attr("cx", function(d) { return xScale(d.score); })
  .attr("cy", function(d) { return yScale(d.happinessAfter); })
  .attr("r", function(d) { return rScale(d.duration); })
  .attr("fill", "steelblue")
  .attr("opacity", 0.8)
  .attr("stroke", "white");

// ------------------- AXES -------------------
const xAxis = d3.axisBottom(xScale).ticks(6);
const yAxis = d3.axisLeft(yScale).ticks(5);

svg.append("g")
  .attr("transform", "translate(0," + (height - margin) + ")")
  .call(xAxis);

svg.append("g")
  .attr("transform", "translate(" + margin + ",0)")
  .call(yAxis);

// ------------------- LABELS -------------------
// X Axis label
svg.append("text")
  .attr("x", width / 2)
  .attr("y", height - 20)
  .attr("text-anchor", "middle")
  .text("Golf Score (lower is better)")
  .style("fill", "black");

// Y Axis label
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -height / 2)
  .attr("y", 20)
  .attr("text-anchor", "middle")
  .text("Happiness After Playing (0–10)")
  .style("fill", "black");

// X Axis value labels
svg.append("text")
  .attr("x", margin)
  .attr("y", height - 5)
  .attr("text-anchor", "start")
  .text("84")
  .style("fill", "black");

svg.append("text")
  .attr("x", width - margin)
  .attr("y", height - 5)
  .attr("text-anchor", "end")
  .text("96")
  .style("fill", "black");

// Y Axis value labels
svg.append("text")
  .attr("x", margin - 30)
  .attr("y", height - margin)
  .attr("text-anchor", "end")
  .text("6")
  .style("fill", "black");

svg.append("text")
  .attr("x", margin - 30)
  .attr("y", margin + 10)
  .attr("text-anchor", "end")
  .text("10")
  .style("fill", "black");

// ------------------- LEGEND (KEY) -------------------
// Legend explaining what circle radius represents
const legendX = width - 180;
const legendY = 120;

// Legend title
svg.append("text")
  .attr("x", legendX)
  .attr("y", legendY - 20)
  .attr("text-anchor", "middle")
  .style("font-weight", "bold")
  .text("Game Duration (minutes)");

// Legend sample values
const legendData = [200, 250, 300];

// Draw legend circles
legendData.forEach(function(d, i) {
  svg.append("circle")
    .attr("cx", legendX)
    .attr("cy", legendY + i * 40)
    .attr("r", rScale(d))
    .attr("fill", "steelblue")
    .attr("opacity", 0.7)
    .attr("stroke", "white");

  svg.append("text")
    .attr("x", legendX + 50)
    .attr("y", legendY + i * 40 + 5)
    .text(d + " min")
    .attr("font-size", "12px")
    .attr("text-anchor", "start");
});
