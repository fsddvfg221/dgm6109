"use strict";

/* *** START Do not modify this section of code ***** */
document.getElementById("action").addEventListener("click", processForm);

function processForm() {
    let choice1 = document.getElementById("choice1").value;
    let x1 = Number(document.getElementById("x1").value);
    let y1 = Number(document.getElementById("y1").value);

    let choice2 = document.getElementById("choice2").value;
    let x2 = Number(document.getElementById("x2").value);
    let y2 = Number(document.getElementById("y2").value);

    let showOrigin = document.getElementById("origins").value == "yes";
    drawing.selectAll('svg>*').remove();

    makeDrawing(drawing, choice1, x1, y1, choice2, x2, y2, showOrigin);
}

let drawing = d3.select("#canvas")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500);

let border = drawing.append("rect")
    .attr("width", 500)
    .attr("height", 500)
    .attr("fill", "none")
    .attr("stroke", "red");
/* *** END Do not modify this section of code ***** */

/**
 * makeDrawing()
 * Draws two selected drawings based on user choices.
 * Each drawing function must accept parameters (canvas, x, y, showOrigin).
 */
function makeDrawing(canvas, choice1, x1, y1, choice2, x2, y2, showOrigin) {
    let item1 = canvas.append("g");
    drawSelected(choice1, item1, x1, y1, showOrigin);

    let item2 = canvas.append("g");
    drawSelected(choice2, item2, x2, y2, showOrigin);

    // optional animation swap (default Lab 5 behavior)
    switcheroo(item1, x1, y1, item2, x2, y2);
}

/**
 * drawSelected()
 * Calls the correct drawing function for each classmate’s file.
 */
function drawSelected(name, svg, x, y, showOrigin) {
    if (name === "caterpillar") caterpillar(svg, x, y, showOrigin);
    else if (name === "butterfly") butterfly(svg, x, y, showOrigin);
    else if (name === "drummer") drummer(svg, x, y, showOrigin);
    else if (name === "ladybug") ladybug(svg, x, y, showOrigin);
    else console.warn("Unknown drawing:", name);
}

/**
 * switcheroo()
 * Swaps positions of the two drawings after half-second delay.
 * (Provided by the instructor — do not modify)
 */
function switcheroo(i1, x1, y1, i2, x2, y2) {
    i1.transition().delay(500).duration(500)
      .attr("transform", `translate(${x2 - x1},${y2 - y1})`);
    i2.transition().delay(500).duration(500)
      .attr("transform", `translate(${x1 - x2},${y1 - y2})`);
}
