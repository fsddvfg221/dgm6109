// ------------------------------------------------------
// Rick Li – Lab 9 Plot 2
// Score → Happiness After
// Professional axis, ticks, bubble legend, color legend
// Includes sort() and filter()
// ------------------------------------------------------

let width = 900;
let height = 600;
let margin = {top: 60, right: 200, bottom: 70, left: 80};

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// ------------------------------------------------------
// DATA (Converted for Plot 2 needs)
// ------------------------------------------------------
let dataset = [
  {score: 93, happiness: 8, duration: 240, walking: "Yes"},
  {score: 90, happiness: 8, duration: 238, walking: "Yes"},
  {score: 88, happiness: 10, duration: 245, walking: "Yes"},
  {score: 91, happiness: 9, duration: 239, walking: "Yes"},
  {score: 95, happiness: 7, duration: 240, walking: "No"},
  {score: 92, happiness: 8, duration: 250, walking: "Yes"},
  {score: 90, happiness: 8, duration: 235, walking: "No"},
  {score: 87, happiness: 10, duration: 245, walking: "Yes"},
  {score: 89, happiness: 9, duration: 270, walking: "Yes"},
  {score: 91, happiness: 8, duration: 240, walking: "No"},
  {score: 92, happiness: 7, duration: 260, walking: "Yes"},
  {score: 89, happiness: 8, duration: 250, walking: "Yes"},
  {score: 88, happiness: 10, duration: 310, walking: "No"}
];

// FILTER (required)
let walkingRounds = dataset.filter(function(d){
    return d.walking === "Yes";
});

// SORT (required)
dataset.sort(function(a,b){ return a.score - b.score; });

// ------------------------------------------------------
// SCALES
// ------------------------------------------------------
let xScale = d3.scaleLinear()
    .domain([d3.min(dataset, d=>d.score)-1, d3.max(dataset, d=>d.score)+1])
    .range([margin.left, width - margin.right]);

let yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

let sizeScale = d3.scaleSqrt()
    .domain([
        d3.min(dataset, d=>d.duration),
        d3.max(dataset, d=>d.duration)
    ])
    .range([5, 30]);

let colorScale = d3.scaleOrdinal()
    .domain(["Yes","No"])
    .range(["#3b82f6", "#f59e0b"]); // walking=blue, cart=orange

// ------------------------------------------------------
// AXES WITH TICKS
// ------------------------------------------------------
let xAxis = d3.axisBottom(xScale)
    .ticks(6)
    .tickFormat(function(d){ return d; });

let yAxis = d3.axisLeft(yScale)
    .ticks(6)
    .tickFormat(function(d){ return d + " / 10"; });

svg.append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

// ------------------------------------------------------
// AXIS LABELS
// ------------------------------------------------------
svg.append("text")
    .attr("x", (width - margin.right) / 2)
    .attr("y", height - 20)
    .attr("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Score");

svg.append("text")
    .attr("x", -height/2)
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Happiness After (0–10)");

// ------------------------------------------------------
// SCATTERPLOT DOTS
// ------------------------------------------------------
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return xScale(d.score); })
    .attr("cy", function(d){ return yScale(d.happiness); })
    .attr("r", function(d){ return sizeScale(d.duration); })
    .attr("fill", function(d){ return colorScale(d.walking); })
    .attr("opacity", 0.85);

// ------------------------------------------------------
// LEGEND: WALKING / CART
// ------------------------------------------------------
let legendBox = svg.append("g")
    .attr("transform", "translate("+(width-180)+",100)");

legendBox.append("rect")
    .attr("width", 160)
    .attr("height", 120)
    .attr("fill", "white")
    .attr("stroke", "#ccc")
    .attr("rx", 10);

legendBox.append("text")
    .text("Play Mode")
    .attr("x", 10)
    .attr("y", 25)
    .style("font-weight", "bold");

["Yes","No"].forEach(function(w, i){
    legendBox.append("rect")
        .attr("x", 10)
        .attr("y", 40 + i*25)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorScale(w));

    legendBox.append("text")
        .text(w === "Yes" ? "Walking" : "Cart")
        .attr("x", 32)
        .attr("y", 50 + i*25)
        .attr("alignment-baseline", "middle");
});

// ------------------------------------------------------
// LEGEND: DURATION SIZE
// ------------------------------------------------------
let sizeLegend = svg.append("g")
    .attr("transform", "translate("+(width-180)+",250)");

sizeLegend.append("rect")
    .attr("width", 160)
    .attr("height", 185)
    .attr("fill", "white")
    .attr("stroke", "#ccc")
    .attr("rx", 10);

sizeLegend.append("text")
    .text("Duration (min)")
    .attr("x", 10)
    .attr("y", 25)
    .style("font-weight", "bold");

let samples = [240, 260, 310];

samples.forEach(function(v, i){

  let extra = 0;
  if (i === 1) extra = -10;   

  sizeLegend.append("circle")
    .attr("cx", 30)
    .attr("cy", 55 + i * 45 + extra)
    .attr("r", sizeScale(v))
    .attr("fill", "#ddd")
    .attr("opacity", 0.6);

  sizeLegend.append("text")
    .text(v + " min")
    .attr("x", 65)
    .attr("y", 55 + i * 45 + extra + 4)
    .attr("alignment-baseline", "middle");
});
