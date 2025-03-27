document.getElementById("imageUpload").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("imagePreview").src = e.target.result;
            document.getElementById("results").innerHTML = "Processing...";
            loadPredictions();
        };
        reader.readAsDataURL(file);
    }
});

function loadPredictions() {
    fetch("predictions.json")
        .then(response => response.json())
        .then(data => {
            displayPredictions(data);
        })
        .catch(error => {
            console.error("Error loading predictions:", error);
            document.getElementById("results").innerHTML = "Error loading predictions.";
        });
}

function displayPredictions(predictions) {
    let resultHTML = "<h3>Predictions:</h3><ul>";
    Object.entries(predictions).forEach(([label, confidence]) => {
        resultHTML += `<li><strong>${label}:</strong> ${(confidence * 100).toFixed(2)}%</li>`;
    });
    resultHTML += "</ul>";
    document.getElementById("results").innerHTML = resultHTML;
}
