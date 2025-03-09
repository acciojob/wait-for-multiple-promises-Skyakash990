//your JS code here. If required.
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("output");

  // Initially, add a loading row
  output.innerHTML = `<tr id="loading"><td colspan="2">Loading...</td></tr>`;

  // Function to generate a promise that resolves after a random delay
  function createPromise(index) {
    const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
    return new Promise((resolve) => {
      setTimeout(() => resolve({ index, time: time.toFixed(3) }), time * 1000);
    });
  }

  // Create three promises
  const promises = [createPromise(1), createPromise(2), createPromise(3)];

  // Wait for all promises to resolve
  Promise.all(promises).then((results) => {
    // Remove loading row
    output.innerHTML = "";

    // Append rows for each promise
    results.forEach(({ index, time }) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>Promise ${index}</td><td>${time}</td>`;
      output.appendChild(row);
    });

    // Calculate the total (maximum time taken)
    const totalTime = Math.max(...results.map((r) => parseFloat(r.time))).toFixed(3);
    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `<td>Total</td><td>${totalTime}</td>`;
    output.appendChild(totalRow);
  });
});
