let model;

async function loadModel() {
    try {
        console.log("Loading Model...");
        model = await tf.loadLayersModel('predictions(1).json');
        console.log("Model Loaded Successfully");
    } catch (error) {
        console.error("Error Loading Model: ", error);
    }
}

// Load model when the page loads
loadModel();

document.getElementById("imageUpload").addEventListener("change", function(event) {
    let file = event.target.files[0];
    if (file) {
        let imgElement = document.getElementById("previewImage");
        imgElement.src = URL.createObjectURL(file);
        imgElement.style.display = "block";
    }
});

async function predictImage() {
    if (!model) {
        alert("Model is still loading, please wait...");
        return;
    }

    let fileInput = document.getElementById("imageUpload").files[0];
    if (!fileInput) {
        alert("Please upload an image first!");
        return;
    }

    let img = document.createElement('img');
    img.src = URL.createObjectURL(fileInput);

    img.onload = async function () {
        let tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([224, 224]) // Resize to match model input size
            .toFloat()
            .expandDims();
        
        let prediction = await model.predict(tensor).data();
        console.log("Prediction: ", prediction);

        document.getElementById("predictionResult").innerText = prediction;
    }
}
