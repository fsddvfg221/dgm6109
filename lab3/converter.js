"use strict";

document.getElementById("submit").addEventListener("click", function () {
  const fahrenheit = document.getElementById("inputF").value;
  const f = Number(fahrenheit);

  const celsius = (f - 32) * 5 / 9;
  const kelvin  = (f - 32) * 5 / 9 + 273.15;

  const conversionType = document.getElementById("conversionChoice").value;

  document.getElementById("output").innerHTML = "";

  output(`Fahrenheit (input): ${f.toFixed(2)} °F`);

  // --- Version A: two separate if statements (kept but commented as required) ---
  /*
  if (conversionType === "c") {
    output(`Celsius (converted): ${celsius.toFixed(2)} °C`);
  }
  if (conversionType === "k") {
    output(`Kelvin  (converted): ${kelvin.toFixed(2)} K`);
  }

  Explanation (Step 24, in my own words):
  I prefer the if/else version. With two mutually exclusive options, if/else
  evaluates only one condition and reads more clearly as a single choice.
  Two separate ifs can work, but they introduce redundant checks and feel
  less explicit about the exclusivity of the outcomes.
  */

  // --- Version B: if/else (active) ---
  if (conversionType === "c") {
    output(`Celsius (converted): ${celsius.toFixed(2)} °C`);
  } else {
    output(`Kelvin  (converted): ${kelvin.toFixed(2)} K`);
  }
});
