
function output(msg) {
  document.getElementById("output").innerText = msg;
}

function validateData() {
  const store = document.getElementById("store").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const zip = document.getElementById("zip").value.trim();

  // Check store selected
  if (store === "") {
    output("Please select a store.");
    return false;
  }

  // Check amount format: integer or two decimals
  if (!/^\d+(\.\d{2})?$/.test(amount)) {
    output("Please enter a valid dollar amount (e.g., 10 or 25.00).");
    return false;
  }

  // Check ZIP is exactly 5 digits
  if (!/^\d{5}$/.test(zip)) {
    output("Please enter a five-digit ZIP code.");
    return false;
  }

  // All data valid
  output("All form data is valid.");
  return true;
}
