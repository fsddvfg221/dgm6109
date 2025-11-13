// ------------------------------------------------------
// Rick Li – Lab 9 Plot 1
// Duration → Happiness After
// Professional Style with Axis + Ticks + Legends
// ------------------------------------------------------

// Setup SVG
let width = 900;
let height = 600;
let margin = {top: 60, right: 200, bottom: 70, left: 80};

let svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// DATA --------------------------------------------------
let dataset = [
  {duration: 240, score: 93, weather: "Overcast", happiness: 8},
  {duration: 238, score: 90, weather: "Cloudy", happiness: 8},
  {duration: 245, score: 88, weather: "Partly Sunny", happiness: 10},
  {duration: 239, score: 91, weather: "Light Rain", happiness: 9},
  {duration: 240, score: 95, weather: "Mostly Cloudy", happiness: 7},
  {duration: 250, score: 92, weather: "Drizzle", happiness: 8},
  {duration: 235, score: 90, weather: "Cloudy", happiness: 8},
  {duration: 245, score: 87, weather: "Partly Sunny", happiness: 10},
  {duration: 270, score: 89, weather: "Cloudy", happiness: 9},
  {duration: 240, score: 91, weather: "Partly Sunny", happiness: 8},
  {duration: 260, score: 92, weather: "Sunny", happiness: 7},
  {duration: 250, score: 89, weather: "Partly Sunny", happiness: 8},
  {duration: 310, score: 88, weather: "Light Rain", happiness: 10}
];

// FILTER (required)
let longRounds = dataset.filter(function(d){
    return d.duration >= 250;
});

// SORT (required)
dataset.sort(function(a,b){ return a.duration - b.duration; });

// ------------------------------------------------------
// SCALES
let xScale = d3.scaleLinear()
    .domain([d3.min(dataset, d=>d.duration)-5,
             d3.max(dataset, d=>d.duration)+5])
    .range([margin.left, width - margin.right]);

let yScale = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top]);

let sizeScale = d3.scaleSqrt()
    .domain([87, 95])
    .range([5, 25]);

let colorScale = d3.scaleOrdinal()
    .domain(["Overcast","Cloudy","Partly Sunny","Light Rain","Sunny","Drizzle","Mostly Cloudy"])
    .range(["#6c757d","#3b82f6","#f59e0b","#64748b","#facc15","#94a3b8","#4b5563"]);


// ------------------------------------------------------
// AXES WITH TICKS
let xAxis = d3.axisBottom(xScale)
    .tickFormat(function(d){ return d + " min"; })
    .ticks(6);

let yAxis = d3.axisLeft(yScale)
    .tickFormat(function(d){ return d + " / 10"; })
    .ticks(6);

// Draw axes
svg.append("g")
    .attr("transform", "translate(0," + (height - margin.bottom) + ")")
    .call(xAxis);

svg.append("g")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis);

// ------------------------------------------------------
// AXIS LABELS
svg.append("text")
    .attr("x", (width - margin.right) / 2)
    .attr("y", height - 20)
    .attr("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Duration (minutes)");

svg.append("text")
    .attr("x", -height/2)
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "15px")
    .text("Happiness After (0–10)");


// ------------------------------------------------------
// SCATTERPLOT DOTS
svg.selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", function(d){ return xScale(d.duration); })
    .attr("cy", function(d){ return yScale(d.happiness); })
    .attr("r", function(d){ return sizeScale(d.score); })
    .attr("fill", function(d){ return colorScale(d.weather); })
    .attr("opacity", 0.85);


// ------------------------------------------------------
// LEGEND: WEATHER
let legendBox = svg.append("g").attr("transform", "translate("+(width-180)+",100)");

legendBox.append("rect")
    .attr("width", 160)
    .attr("height", 200)
    .attr("fill", "white")
    .attr("stroke", "#ccc")
    .attr("rx", 10);

legendBox.append("text")
    .text("Weather")
    .attr("x", 10)
    .attr("y", 25)
    .style("font-weight", "bold");

colorScale.domain().forEach(function(w, i){
    legendBox.append("rect")
        .attr("x", 10)
        .attr("y", 40 + i*22)
        .attr("width", 14)
        .attr("height", 14)
        .attr("fill", colorScale(w));

    legendBox.append("text")
        .text(w)
        .attr("x", 30)
        .attr("y", 50 + i*22)
        .attr("alignment-baseline", "middle");
});

// ------------------------------------------------------
// LEGEND: SCORE SIZE
let sizeLegend = svg.append("g")
    .attr("transform", "translate("+(width-180)+",310)");

sizeLegend.append("rect")
    .attr("width", 160)
    .attr("height", 160)
    .attr("fill", "white")
    .attr("stroke", "#ccc")
    .attr("rx", 10);

sizeLegend.append("text")
    .text("Score (bubble size)")
    .attr("x", 10)
    .attr("y", 25)
    .style("font-weight", "bold");

let scoreSamples = [88, 92, 95];

scoreSamples.forEach(function(v, i){
  let extra = 0;
  if (i === 1) extra = -10;   

  sizeLegend.append("circle")
    .attr("cx", 30)
    .attr("cy", 50 + i * 40 + extra)
    .attr("r", sizeScale(v))
    .attr("fill", "#ccc")
    .attr("opacity", 0.6);

  sizeLegend.append("text")
    .text(v)
    .attr("x", 60)
    .attr("y", 50 + i * 40 + extra + 4)
    .attr("alignment-baseline", "middle");
});

