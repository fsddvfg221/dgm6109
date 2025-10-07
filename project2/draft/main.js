function validateData() {
  const store = document.getElementById("store").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const zip = document.getElementById("zip").value.trim();

  const result = processInput(store, amount, zip);
  document.getElementById("output").textContent = result;
}
