/*
  Project 2-5 Gift Card Purchasing System — Final
  output.js
  Author: Rick Li
  Date: October 2025
  Description:
    Validates store, amount, and ZIP code.
    Applies store-specific rules and processing fees.
    Returns a detailed message string for output.
*/

function validateData(store, amount, zip) {
  // Check store selection
  if (store === "") {
    return "Please select a store.";
  }

  // Validate amount format
  const amountNum = parseFloat(amount);
  if (isNaN(amountNum) || amountNum <= 0 || !/^\d+(\.\d{2})?$/.test(amount)) {
    return "Please enter a valid dollar amount (e.g. 25.00).";
  }

  // Validate ZIP format
  const zipPattern = /^\d{5}$/;
  if (!zipPattern.test(zip)) {
    return "Please enter a five-digit ZIP code.";
  }

  // Convert ZIP to number for comparison
  const zipNum = parseInt(zip);

  // Store-specific rules
  if (store === "Sepharoah") {
    // ZIP validation: only East Coast (<34000 or 09000–09999)
    if (!(zipNum < 34000 || (zipNum >= 9000 && zipNum <= 9999))) {
      return "Sorry, the Sepharoah gift card can only be ordered on the East Coast.";
    }
    // Amount limits
    if (amountNum < 50 || amountNum > 1000) {
      return "Sorry, the Sepharoah gift card has a minimum of $50 and a maximum of $1000.";
    }
  }

  if (store === "Wallgrinds" || store === "Taco Hut") {
    if (amountNum < 5 || amountNum > 500) {
      return "Sorry, the amount placed on the gift card must be at least $5 and at most $500.";
    }
  }

  if (store === "Wallgrinds" && amountNum % 5 !== 0) {
    return "The Wallgrinds card can only be purchased in increments of $5.";
  }

  // Add processing fee for non-Hawaii low amount (<$100)
  let feeMessage = "";
  if (amountNum < 100 && (zipNum < 96701 || zipNum > 96898)) {
    const fee = amountNum * 0.05;
    const total = (amountNum + fee).toFixed(2);
    feeMessage = `Please note: a 5% processing fee ($${fee.toFixed(2)}) has been added.\nTotal: $${total}.`;
  }

  // Success message
  let message = `Your gift card for ${store} in the amount of $${amountNum.toFixed(2)} will be shipped to ZIP ${zip}.`;
  if (feeMessage) message += `\n${feeMessage}`;
  return message;
}
