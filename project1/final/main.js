// Project 1 — Drawing #4 Final (Caterpillar)
// Origin note: (caterpillarX, caterpillarY) is set to the head center
// (old head center was (60, 125)). All parts are offsets from this anchor.

const width = 600, height = 600;
let svg = d3.select("#canvas").select("svg");
if (svg.empty()) {
  svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "#fff")
    .style("border", "1px solid #999");
}

const xEl = document.getElementById("xInput");
const yEl = document.getElementById("yInput");
const choiceEl = document.getElementById("choice");
document.getElementById("drawBtn").addEventListener("click", drawImage);

function getConfig() {
  const caterpillarX = Number(xEl.value);
  const caterpillarY = Number(yEl.value);
  return { caterpillarX, caterpillarY };
}

function getChoice() {
  return choiceEl.value; // "original" | "enhanced"
}

function clearCanvas() { svg.selectAll("*").remove(); }

function drawImage() {
  const { caterpillarX, caterpillarY } = getConfig();
  const choice = getChoice();
  clearCanvas();

  // BODY (10 ellipses)
  svg.append('ellipse').attr('cx', caterpillarX + 0).attr('cy', caterpillarY + 0)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'palegreen');
  svg.append('ellipse').attr('cx', caterpillarX + 70).attr('cy', caterpillarY + 30)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  svg.append('ellipse').attr('cx', caterpillarX + 130).attr('cy', caterpillarY - 15)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  svg.append('ellipse').attr('cx', caterpillarX + 180).attr('cy', caterpillarY + 30)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  svg.append('ellipse').attr('cx', caterpillarX + 230).attr('cy', caterpillarY + 5)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  svg.append('ellipse').attr('cx', caterpillarX + 270).attr('cy', caterpillarY - 35)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  svg.append('ellipse').attr('cx', caterpillarX + 330).attr('cy', caterpillarY + 5)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'lightgreen');
  svg.append('ellipse').attr('cx', caterpillarX + 360).attr('cy', caterpillarY + 45)
     .attr('rx', 45).attr('ry', 45).attr('fill', 'seagreen');
  svg.append('ellipse').attr('cx', caterpillarX + 400).attr('cy', caterpillarY + 25)
     .attr('rx', 20).attr('ry', 20).attr('fill', 'lightgreen');
  svg.append('ellipse').attr('cx', caterpillarX + 415).attr('cy', caterpillarY + 10)
     .attr('rx', 12).attr('ry', 12).attr('fill', 'seagreen');

  // FACE (eyes)
  svg.append('ellipse').attr('cx', caterpillarX - 40).attr('cy', caterpillarY - 20)
     .attr('rx', 8).attr('ry', 8).attr('fill', 'black');
  svg.append('ellipse').attr('cx', caterpillarX - 15).attr('cy', caterpillarY - 20)
     .attr('rx', 8).attr('ry', 8).attr('fill', 'black');

  // EYEBROWS + MOUTH
  svg.append('line')
     .attr('x1', caterpillarX - 60).attr('y1', caterpillarY - 65)
     .attr('x2', caterpillarX - 30).attr('y2', caterpillarY - 65)
     .attr('stroke', 'black');
  svg.append('line')
     .attr('x1', caterpillarX - 30).attr('y1', caterpillarY - 65)
     .attr('x2', caterpillarX - 20).attr('y2', caterpillarY - 35)
     .attr('stroke', 'black');
  svg.append('line')
     .attr('x1', caterpillarX - 50).attr('y1', caterpillarY - 75)
     .attr('x2', caterpillarX - 20).attr('y2', caterpillarY - 75)
     .attr('stroke', 'black');
  svg.append('line')
     .attr('x1', caterpillarX - 20).attr('y1', caterpillarY - 75)
     .attr('x2', caterpillarX - 5).attr('y2', caterpillarY - 35)
     .attr('stroke', 'black');
  svg.append('line')
     .attr('x1', caterpillarX - 40).attr('y1', caterpillarY + 10)
     .attr('x2', caterpillarX - 20).attr('y2', caterpillarY + 10)
     .attr('stroke', 'black');

  // ENHANCED VARIATION
  if (choice === 'enhanced') {
    
    // Legs under body segments
    const segments = [
      { cx: caterpillarX + 70,  cy: caterpillarY + 30 },
      { cx: caterpillarX + 130, cy: caterpillarY - 15 },
      { cx: caterpillarX + 180, cy: caterpillarY + 30 },
      { cx: caterpillarX + 230, cy: caterpillarY + 5  },
      { cx: caterpillarX + 360, cy: caterpillarY + 45  },
    ];
    segments.forEach(s => {
  // legX stays at segment center (s.cx)
  const legX = s.cx;
  // legYStart: a little below the body
  const legYStart = s.cy + 45;  // body radius
  // legYEnd: longer line downwards
  const legYEnd = legYStart + 20;

  svg.append('line')
     .attr('x1', legX).attr('y1', legYStart)
     .attr('x2', legX).attr('y2', legYEnd)
     .attr('stroke', 'darkslategray')
     .attr('stroke-width', 3);
});

  }
}
