document.getElementById("askBtn").addEventListener("click", async () => {
    const userInput = document.getElementById("userInput").value;
    const responseElement = document.getElementById("response");

    responseElement.textContent = "Generating response...";

    const response = await fetch("http://localhost:5000/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userInput }),
    });

    const data = await response.json();
    responseElement.textContent = data.result;
});