"use strict"

/*  Variable that enables you to "talk to" your SVG drawing canvas. */
let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

/* Draw a border that matches the maximum drawing area for this assignment.
    Assign the border to a variable so that:
        (1) We know what the purpose of the shape is, and
        (2) We will have the ability to change it later (in a future assignment)
*/
let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");

/* Write your code for Project 1 beneath this comment */

/* ==========================
   Lab 2 – Drawing #4: Caterpillar
   Requirements:
   - Two variables control position (caterpillarX, caterpillarY)
   - Shapes use these variables in their coordinates
   - Only append/attr; no loops/events
   ========================== */

/* overall offsets to move the entire caterpillar */
let caterpillarX = 0;
let caterpillarY = 0;

/* ---------- BODY (10 circles) ---------- */
let body1Head = drawing.append('ellipse')
  .attr('cx', 60 + caterpillarX).attr('cy', 125 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'palegreen');

let body2 = drawing.append('ellipse')
  .attr('cx', 130 + caterpillarX).attr('cy', 155 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'seagreen');

let body3 = drawing.append('ellipse')
  .attr('cx', 190 + caterpillarX).attr('cy', 110 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'lightgreen');

let body4 = drawing.append('ellipse')
  .attr('cx', 240 + caterpillarX).attr('cy', 155 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'seagreen');

let body5 = drawing.append('ellipse')
  .attr('cx', 290 + caterpillarX).attr('cy', 130 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'lightgreen');

let body6 = drawing.append('ellipse')
  .attr('cx', 330 + caterpillarX).attr('cy', 90 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'seagreen');

let body7 = drawing.append('ellipse')
  .attr('cx', 390 + caterpillarX).attr('cy', 130 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'lightgreen');

let body8 = drawing.append('ellipse')
  .attr('cx', 420 + caterpillarX).attr('cy', 170 + caterpillarY)
  .attr('rx', 45).attr('ry', 45)
  .attr('fill', 'seagreen');

let body9 = drawing.append('ellipse')
  .attr('cx', 460 + caterpillarX).attr('cy', 150 + caterpillarY)
  .attr('rx', 20).attr('ry', 20)
  .attr('fill', 'lightgreen');

let body10Tail = drawing.append('ellipse')
  .attr('cx', 475 + caterpillarX).attr('cy', 135 + caterpillarY)
  .attr('rx', 12).attr('ry', 12) // 488 + 12 = 500
  .attr('fill', 'seagreen');

/* ---------- FACE (2 eyes) ---------- */
let eyeLeft = drawing.append('ellipse')
  .attr('cx', 20 + caterpillarX).attr('cy', 105 + caterpillarY)
  .attr('rx', 8).attr('ry', 8)
  .attr('fill', 'black');

let eyeRight = drawing.append('ellipse')
  .attr('cx', 45 + caterpillarX).attr('cy', 105 + caterpillarY)
  .attr('rx', 8).attr('ry', 8)
  .attr('fill', 'black');

/* ---------- LINES (2 eyebrows + 1 mouth) ---------- */
let browLeft = drawing.append('line')
  .attr('x1', 50-50 + caterpillarX).attr('y1', 50+10 + caterpillarY)
  .attr('x2', 80-50 + caterpillarX).attr('y2', 50+10 + caterpillarY)
  .attr('stroke', 'black');

let browRight = drawing.append('line')
  .attr('x1', 30 + caterpillarX).attr('y1', 60 + caterpillarY)
  .attr('x2', 40 + caterpillarX).attr('y2', 90 + caterpillarY)
  .attr('stroke', 'black');

  let browLeft2 = drawing.append('line')
  .attr('x1', 10 + caterpillarX).attr('y1', 50 + caterpillarY)
  .attr('x2', 40 + caterpillarX).attr('y2', 50 + caterpillarY)
  .attr('stroke', 'black');

let browRight2 = drawing.append('line')
  .attr('x1', 40 + caterpillarX).attr('y1', 50 + caterpillarY)
  .attr('x2', 55 + caterpillarX).attr('y2', 90 + caterpillarY)
  .attr('stroke', 'black');
  

let mouthLine = drawing.append('line')
  .attr('x1', 20 + caterpillarX).attr('y1', 135 + caterpillarY)
  .attr('x2', 40 + caterpillarX).attr('y2', 135 + caterpillarY)
  .attr('stroke', 'black');
