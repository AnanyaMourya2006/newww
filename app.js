function predictImage() {
    let imageInput = document.getElementById('imageInput');
    let predictionText = document.getElementById('predictionText');

    if (imageInput.files.length > 0) {
        let file = imageInput.files[0];
        let reader = new FileReader();
        
        reader.onload = function(e) {
            // Simulating prediction (Replace with actual ML API call)
            predictionText.innerHTML = "🔍 <span style='color:#00BFFF;'>Processing Image...</span>";

            setTimeout(() => {
                predictionText.innerHTML = "✅ <span style='color:#17A2B8;'>Prediction: Skin Condition Identified</span>";
            }, 2000);
        };

        reader.readAsDataURL(file);
    } else {
        predictionText.innerHTML = "⚠️ <span style='color:red;'>Please upload an image first.</span>";
    }
}
