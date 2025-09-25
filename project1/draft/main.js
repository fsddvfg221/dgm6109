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
   Project 1 – Drawing #4: Caterpillar
   Spec: 10 circles for body (incl. head & tail tip), 2 eyes (circles),
         3 lines (two eyebrows + one mouth).
   Notes: Use only allowed D3 calls this week; colors approximate by named colors.
   ========================== */

/* ---------- BODY (10 circles, from left to right) ---------- */
/* body1: head (largest near-left) */
let body1Head = drawing.append('ellipse')
  .attr('cx', 85).attr('cy', 115).attr('rx', 45).attr('ry', 45)
  .attr('fill', 'palegreen'); // no stroke per spec

/* body2: slight drop, overlap head */
let body2 = drawing.append('ellipse')
  .attr('cx', 155).attr('cy', 155).attr('rx', 55).attr('ry', 55)
  .attr('fill', 'seagreen');

/* body3: rise and grow */
let body3 = drawing.append('ellipse')
  .attr('cx', 225).attr('cy', 110).attr('rx', 60).attr('ry', 60)
  .attr('fill', 'lightgreen');

/* body4: dip */
let body4 = drawing.append('ellipse')
  .attr('cx', 285).attr('cy', 150).attr('rx', 50).attr('ry', 50)
  .attr('fill', 'mediumseagreen');

/* body5: highest & prominent */
let body5 = drawing.append('ellipse')
  .attr('cx', 335).attr('cy', 85).attr('rx', 60).attr('ry', 60)
  .attr('fill', 'forestgreen');

/* body6: mid-high */
let body6 = drawing.append('ellipse')
  .attr('cx', 385).attr('cy', 125).attr('rx', 50).attr('ry', 50)
  .attr('fill', 'lightgreen');

/* body7: clear dip */
let body7 = drawing.append('ellipse')
  .attr('cx', 430).attr('cy', 165).attr('rx', 45).attr('ry', 45)
  .attr('fill', 'seagreen');

/* body8: rise toward tail */
let body8 = drawing.append('ellipse')
  .attr('cx', 455).attr('cy', 130).attr('rx', 30).attr('ry', 30)
  .attr('fill', 'mediumseagreen');

/* body9: small transition */
let body9 = drawing.append('ellipse')
  .attr('cx', 470).attr('cy', 120).attr('rx', 20).attr('ry', 20)
  .attr('fill', 'lightgreen');

/* body10: tail tip (smallest; rightmost within 500 limit) */
let body10Tail = drawing.append('ellipse')
  .attr('cx', 488).attr('cy', 118).attr('rx', 12).attr('ry', 12) // 488 + 12 = 500
  .attr('fill', 'forestgreen');

/* ---------- FACE (2 eyes) ---------- */
let eyeLeft = drawing.append('ellipse')
  .attr('cx', 65).attr('cy', 105).attr('rx', 8).attr('ry', 8)
  .attr('fill', 'black');

let eyeRight = drawing.append('ellipse')
  .attr('cx', 90).attr('cy', 108).attr('rx', 8).attr('ry', 8)
  .attr('fill', 'black');

/* ---------- LINES (2 eyebrows + 1 mouth) ---------- */
/* thin black lines; lines need stroke to be visible */
let browLeft = drawing.append('line')   // left eyebrow (horizontal)
  .attr('x1', 35).attr('y1', 75)
  .attr('x2', 85).attr('y2', 75)
  .attr('stroke', 'black');

let browRight = drawing.append('line')  // right eyebrow (slanted)
  .attr('x1', 85).attr('y1', 75)
  .attr('x2', 100).attr('y2', 105)
  .attr('stroke', 'black');

let mouthLine = drawing.append('line')  // mouth (short horizontal)
  .attr('x1', 55).attr('y1', 135)
  .attr('x2', 90).attr('y2', 135)
  .attr('stroke', 'black');


