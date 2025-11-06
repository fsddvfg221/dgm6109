"use strict";

// Rick Li – Lab #8
// Enhanced Bubble Plot with scale, color, sorting, and legends
// Reference: Class 08 Slides (scaleSqrt, sort, d3.min/max) + Lab 8 Assignment

// ---------- CONFIGURATION VARIABLES ----------
let svgWidth = 800;
let svgHeight = 600;
let marginTop = 60;
let marginBottom = 80;
let marginLeft = 80;
let marginRight = 60;

// ---------- SVG SETUP ----------
let svg = d3.select("#canvas")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// ---------- DATASET ----------
let dataset = [
  {score: 95, happiness: 2, duration: 3.5, weather: 5},
  {score: 90, happiness: 3, duration: 4.0, weather: 6},
  {score: 88, happiness: 4, duration: 4.2, weather: 7},
  {score: 85, happiness: 4.5, duration: 4.5, weather: 8},
  {score: 92, happiness: 3, duration: 3.8, weather: 4},
  {score: 80, happiness: 5, duration: 5.0, weather: 9},
  {score: 98, happiness: 1.5, duration: 3.2, weather: 3},
  {score: 86, happiness: 4.2, duration: 4.6, weather: 8}
];

// ---------- SORT: largest duration drawn last ----------
dataset.sort(function(a, b) {
  return a.duration - b.duration; // ascending order
});

// ---------- SCALES ----------
let xScale = d3.scaleLinear()
  .domain([d3.min(dataset, d => d.score) - 2, d3.max(dataset, d => d.score) + 2])
  .range([marginLeft, svgWidth - marginRight]);

let yScale = d3.scaleLinear()
  .domain([0, d3.max(dataset, d => d.happiness) + 1])
  .range([svgHeight - marginBottom, marginTop]);

// Bubble radius proportional to duration
let rScale = d3.scaleSqrt()
  .domain([d3.min(dataset, d => d.duration), d3.max(dataset, d => d.duration)])
  .range([5, 30]);

// Weather color gradient (cool to warm)
let colorScale = d3.scaleLinear()
  .domain([3, 9])
  .range(["#74add1", "#f46d43"]);

// ---------- DRAW CIRCLES ----------
svg.selectAll("circle")
  .data(dataset)
  .join("circle")
  .attr("cx", d => xScale(d.score))
  .attr("cy", d => yScale(d.happiness))
  .attr("r", d => rScale(d.duration))
  .attr("fill", d => colorScale(d.weather))
  .attr("opacity", 0.8);

// ---------- AXES & LABELS ----------
let xAxis = d3.axisBottom(xScale).ticks(6);
let yAxis = d3.axisLeft(yScale).ticks(6);

svg.append("g")
  .attr("transform", `translate(0, ${svgHeight - marginBottom})`)
  .call(xAxis);

svg.append("g")
  .attr("transform", `translate(${marginLeft}, 0)`)
  .call(yAxis);

// Axis titles
svg.append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight - 40)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Golf Score (Lower = Better)");

svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("x", -svgHeight / 2)
  .attr("y", 25)
  .attr("text-anchor", "middle")
  .style("font-size", "14px")
  .text("Happiness Level (1–5)");

// ---------- LEGENDS ----------

// Legend for bubble size (duration)
svg.append("text")
  .attr("x", svgWidth - 220)
  .attr("y", 70)
  .text("Game Duration (hrs)")
  .style("font-size", "12px")
  .style("font-weight", "bold");

let legendDurations = [3, 4, 5];
legendDurations.forEach((d, i) => {
  svg.append("circle")
    .attr("cx", svgWidth - 200 + i * 60)
    .attr("cy", 100)
    .attr("r", rScale(d))
    .attr("fill", "#ccc")
    .attr("stroke", "black");
  svg.append("text")
    .attr("x", svgWidth - 200 + i * 60)
    .attr("y", 100 + rScale(d) + 15)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(d + "h");
});

// Legend for color (weather)
svg.append("text")
  .attr("x", svgWidth - 220)
  .attr("y", 180)
  .text("Weather Condition")
  .style("font-size", "12px")
  .style("font-weight", "bold");

let legendWeather = [3, 6, 9];
legendWeather.forEach((d, i) => {
  svg.append("rect")
    .attr("x", svgWidth - 220 + i * 60)
    .attr("y", 190)
    .attr("width", 40)
    .attr("height", 20)
    .attr("fill", colorScale(d))
    .attr("stroke", "black");
  svg.append("text")
    .attr("x", svgWidth - 200 + i * 60)
    .attr("y", 225)
    .attr("text-anchor", "middle")
    .attr("font-size", "10px")
    .text(d);
});

// ---------- BONUS STYLE ----------
svg.style("font-family", "Arial")
   .style("font-size", "11px");

// ---------- END ----------
