// Add event listener to the form submission
document.getElementById('upload-form').addEventListener('submit', uploadImageAndPredict);

// Function to handle image upload and prediction
async function uploadImageAndPredict(event)
{
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the file input element and check file size
    const fileInput = document.getElementById('file-input');
    if (fileInput.files[0].size > 5000000) { // 5MB limit
        alert('File is too large. Please upload a file smaller than 5MB.');
        return;
    }

    // Prepare the file for sending
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    // Show a loading spinner while processing
    document.getElementById('result').innerHTML = '<div class="spinner"></div>';

    try {
        // Send the image to the server for prediction
        const response = await fetch("http://localhost:8000/predict", {
            method: 'POST',
            body: formData
        });

        // Check for a successful response from the server
        if (!response.ok) {
             throw new Error("Server responded with an error!");
         }

        // Parse the JSON response
        const data = await response.json();

        // Handle possible errors from the server
        if (data.error) {
            document.getElementById('result').innerHTML = `<p>Error: ${data.error}</p>`;
        } else {
            // Display the prediction results
            document.getElementById('result').innerHTML = `<p>This image is ${data.normal} Normal and ${data.pneumonia} Pneumonia</p>`;
            displayExplanation();
        }
    } catch (error)
    {
        // Handle any errors during the fetch operation
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
}

// Function to display an explanation of the results
function displayExplanation()
{
    const explanationDiv = document.getElementById('explanation');
    explanationDiv.innerHTML = `
        <p><strong>Diagnostic Analysis Interpretation:</strong></p>
        <p>The results presented here reflect a probabilistic assessment of the chest X-ray image, indicating the 
        likelihood of pneumonia presence. A higher percentage under 'Pneumonia' suggests an increased probability 
        of the condition. These insights are derived from a sophisticated Vision Transformer (ViT) model, 
        which utilizes deep learning techniques to analyze and interpret complex patterns in medical imagery.</p>
        <p>The ViT model applies advanced algorithms to process the nuances in X-ray images, enabling it to identify 
        indicators that are characteristic of pneumonia. However, it's important to recognize the limitations of 
        AI-based diagnostic tools. While they provide valuable assistance and augment the diagnostic process, 
        they cannot capture the full clinical context and should not be used as standalone diagnostic tools.</p>
        <p>Medical professionals should consider these results as an additional source of information that complements 
        their clinical expertise and judgement. A comprehensive diagnosis should always involve a holistic assessment,
         including patient history, physical examination, and other relevant medical investigations.</p>
        <p>For patients and non-medical users, please note that these results are not a substitute for professional 
        medical advice, diagnosis, or treatment. Always seek the guidance of your physician or other qualified health 
        provider with any questions you may have regarding a medical condition.</p>
    `;
}
