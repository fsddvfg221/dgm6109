// output.js — handles input validation and message generation
// Rick Li · October 2025

function processInput(store, amount, zip) {
  // Check store
  if (store === "") {
    return "Please select a store.";
  }

  // Check amount
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0) {
    return "Please enter a valid dollar amount.";
  }

  // Check ZIP format
  const zipPattern = /^\d{5}$/;
  if (!zipPattern.test(zip)) {
    return "Please enter a five-digit ZIP code.";
  }

  // Everything valid
  return "All form data is valid.";
}
