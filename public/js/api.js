document
  .getElementById("inputForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputText = document.getElementById("inputText").value;

    try {
      const response = await fetch("/individualAWBId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ AWB_ID: inputText }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();

      const tableHtml = `<table class="table">${data.data}</table>`;

      document.getElementById("displayDetails").innerHTML = tableHtml;
    } catch (error) {
      document.getElementById(
        "displayDetails"
      ).textContent = `Error: ${error.message}`;
    }
  });
