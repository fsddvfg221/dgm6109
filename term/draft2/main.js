// Basic SVG configuration
const svgWidth = 1000;
const svgHeight = 600;

// Extra space on the right for the legend
const margin = {
  top: 40,
  right: 260,
  bottom: 40,
  left: 40
};

// Center of the radial diagram
const centerX = svgWidth / 2;
const centerY = svgHeight / 2;

// Happiness scale configuration (1–10 mapped to radial distance)
const happinessMin = 0;
const happinessMax = 10;

// Distance from center for happiness values
const innerRadius = 45; // just outside the golf ball
const maxRadius = Math.min(svgWidth, svgHeight) / 2 - 60;

// Create the SVG canvas
const svg = d3.select("#viz")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("viewBox", "0 0 " + svgWidth + " " + svgHeight);

// Global variable to keep data if needed later
let allRounds = [];


/**
 * Helper: classify weather string into 3 categories.
 */
function classifyWeather(weatherString) {
  const w = weatherString.toLowerCase();

  if (w.indexOf("rain") >= 0 || w.indexOf("drizzle") >= 0) {
    return "Rainy";
  }

  if (w.indexOf("sunny") >= 0) {
    return "Sunny";
  }

  if (w.indexOf("cloud") >= 0 || w.indexOf("overcast") >= 0) {
    return "Cloudy";
  }

  return "Cloudy";
}


/**
 * Helper: map weather type to color.
 */
function weatherColor(weatherType) {
  if (weatherType === "Rainy") {
    return "#6ec5ff";
  }
  if (weatherType === "Sunny") {
    return "#ffa726";
  }
  return "#c0c3d0"; // Cloudy
}


/**
 * Build the visualization
 */
function buildVisualization(data) {

  allRounds = data;

  // Process the data
  const processed = data.map(function (d) {
    const before = Number(d.happinessBefore);
    const after = Number(d.happinessAfter);
    const delta = after - before;

    return {
      date: d.date,
      course: d.course,
      weatherOriginal: d.weather,
      weatherType: classifyWeather(d.weather),
      happinessBefore: before,
      happinessAfter: after,
      happinessDelta: delta
    };
  });

  // Happiness → radius scale
  const radiusScale = d3.scaleLinear()
    .domain([happinessMin, happinessMax])
    .range([innerRadius, maxRadius]);

  const numRounds = processed.length;
  const angleStep = (2 * Math.PI) / numRounds;

  // Group centered on canvas
  const spokesGroup = svg.append("g")
    .attr("transform", "translate(" + centerX + ", " + centerY + ")");

  // -----------------------------
  // Draw spokes 
  // -----------------------------
  processed.forEach(function (d, index) {

    const angle = -Math.PI / 2 + index * angleStep;

    const rBefore = radiusScale(d.happinessBefore);
    const rAfter = radiusScale(d.happinessAfter);

    const xBefore = Math.cos(angle) * rBefore;
    const yBefore = Math.sin(angle) * rBefore;

    const xAfter = Math.cos(angle) * rAfter;
    const yAfter = Math.sin(angle) * rAfter;

    // Red segment — happiness before
    spokesGroup.append("line")
      .attr("x1", 0)
      .attr("y1", 0)
      .attr("x2", xBefore)
      .attr("y2", yBefore)
      .attr("stroke", "#e53935")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round");

    // Green segment — happiness gained
    spokesGroup.append("line")
      .attr("x1", xBefore)
      .attr("y1", yBefore)
      .attr("x2", xAfter)
      .attr("y2", yAfter)
      .attr("stroke", "#43a047")
      .attr("stroke-width", 3)
      .attr("stroke-linecap", "round");

    // Weather circle at endpoint
    spokesGroup.append("circle")
      .attr("cx", xAfter)
      .attr("cy", yAfter)
      .attr("r", 9)
      .attr("fill", weatherColor(d.weatherType));
  });

  // -----------------------------
  // Draw central golf ball 
  // -----------------------------
  const ballRadius = innerRadius - 15; //ball size

  const ballGroup = spokesGroup.append("g");

  ballGroup.append("circle")
    .attr("r", ballRadius)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("fill", "#ffffff")       // white
    .attr("stroke", "#000000")
    .attr("stroke-width", 2);

  // small dots（dimples）
  const dimples = [
    [-6, -4], [0, -6], [6, -4],
    [-6, 0],  [0, 0],  [6, 0],
    [-6, 4],  [0, 6],  [6, 4]
  ];

  ballGroup.selectAll("circle.dimple")
    .data(dimples)
    .enter()
    .append("circle")
    .attr("class", "dimple")
    .attr("cx", function (d) { return d[0]; })
    .attr("cy", function (d) { return d[1]; })
    .attr("r", 1.5)
    .attr("fill", "#000000");


  // Legend
  const legendX = svgWidth - margin.right + 40;
  const legendY = margin.top;

  const legend = svg.append("g")
    .attr("transform", "translate(" + legendX + ", " + legendY + ")");

  legend.append("text")
    .attr("class", "legend-title")
    .attr("x", 0)
    .attr("y", 0)
    .text("Weather");

  const weatherLegendData = [
    { type: "Rainy", label: "Rainy" },
    { type: "Sunny", label: "Sunny / Partly Sunny" },
    { type: "Cloudy", label: "Cloudy / Overcast" }
  ];

  const weatherLegend = legend.append("g")
    .attr("transform", "translate(0, 16)");

  weatherLegend.selectAll("circle.weather-dot")
    .data(weatherLegendData)
    .enter()
    .append("circle")
    .attr("class", "weather-dot")
    .attr("cx", 0)
    .attr("cy", function (d, i) { return i * 26; })
    .attr("r", 8)
    .attr("fill", function (d) { return weatherColor(d.type); });

  weatherLegend.selectAll("text.weather-label")
    .data(weatherLegendData)
    .enter()
    .append("text")
    .attr("class", "weather-label")
    .attr("x", 18)
    .attr("y", function (d, i) { return i * 26 + 4; })
    .attr("font-size", "13px")
    .text(function (d) { return d.label; });

  // Segment legend
  const segmentLegend = legend.append("g")
    .attr("transform", "translate(0, 110)");

  segmentLegend.append("text")
    .attr("class", "legend-title")
    .attr("x", 0)
    .attr("y", 0)
    .text("Happiness Segments");

  // Red line
  segmentLegend.append("line")
    .attr("x1", 0)
    .attr("y1", 18)
    .attr("x2", 40)
    .attr("y2", 18)
    .attr("stroke", "#e53935")
    .attr("stroke-width", 3)
    .attr("stroke-linecap", "round");

  segmentLegend.append("text")
    .attr("x", 50)
    .attr("y", 22)
    .attr("font-size", "13px")
    .text("Happiness Before");

  // Green line
  segmentLegend.append("line")
    .attr("x1", 0)
    .attr("y1", 44)
    .attr("x2", 40)
    .attr("y2", 44)
    .attr("stroke", "#43a047")
    .attr("stroke-width", 3)
    .attr("stroke-linecap", "round");

  segmentLegend.append("text")
    .attr("x", 50)
    .attr("y", 48)
    .attr("font-size", "13px")
    .text("Happiness After");

  segmentLegend.append("text")
    .attr("class", "small-note")
    .attr("x", -10)
    .attr("y", 72)
    .text("Distance from center = Happiness (1–10)");
}


/**
 * Load JSON & start
 */
async function loadData() {
  try {
    const response = await fetch("data.json");
    const jsonData = await response.json();
    buildVisualization(jsonData);
  } catch (error) {
    console.log("Error loading data.json:", error);
  }
}

loadData();
