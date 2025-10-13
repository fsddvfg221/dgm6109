/*
  Project 2-5 Gift Card Purchasing System — Final
  main.js
  Author: Rick Li
  Date: October 2025
  Description:
    Handles event actions for the form and displays messages
    returned from validateData() in output.js.
*/

document.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.querySelector("button");
  const output = document.getElementById("output");

  submitBtn.addEventListener("click", () => {
    const store = document.getElementById("store").value.trim();
    const amount = document.getElementById("amount").value.trim();
    const zip = document.getElementById("zip").value.trim();

    const result = validateData(store, amount, zip);
    output.textContent = result;
  });
});
