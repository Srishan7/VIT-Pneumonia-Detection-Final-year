# Pneumonia Detection VIT Model

## Introduction
This repository contains a Pneumonia Detection project using a Vision Transformer (VIT) model with TensorFlow. It includes a web interface hosted in a Docker container, allowing users to upload Chest X-Ray images and receive diagnostic results in the form of percentages indicating the likelihood of pneumonia.

## Features
- **Pneumonia Detection using VIT Model:** Utilizes a trained Vision Transformer model to analyze chest X-ray images.
- **Web Interface:** A user-friendly web interface for uploading X-ray images and displaying diagnostic results.
- **Docker Integration:** The web application is containerized using Docker, ensuring easy deployment and consistency across different environments.

## Installation

### Prerequisites
- Docker
- Git

### Setup
1. **Clone the Repository:** `git clone https://github.com/CrisLugoB/VIT-Pneumonia-Analyzer`
2. **Navigate to the Project Directory:**
3. **Build the Docker Container:** `docker build -t vit-pneumonia .`
4. **Run the Docker Container:** `docker run -p 8000:8000 pneumonia-container`


## Usage
- Open a web browser and navigate to `http://localhost:8000`.
- Follow the on-screen instructions to upload a Chest X-Ray image.
- The system will process the image and display the diagnostic results.

## Contributing
Contributions to the project are welcome! Please refer to the `CONTRIBUTING.md` file for guidelines.

## License
This project is licensed under the [MIT License](LICENSE).

## Acknowledgements
Special thanks to all contributors in specifically, [Mendely Data](https://data.mendeley.com/datasets/rscbjbr9sj/2?__hstc=25856994.d78bc0b06c3134caf1effabfa82b3354.1698779814349.1698779814349.1698779814349.1&__hssc=25856994.1.1698779814350&__hsfp=1211446396) for providing the Chest X-Ray datataset, [Keras Team](https://github.com/keras-team/keras) for providing the necessary deep learning model and the open-source community for their support and contributions to this project.


## Contact
For any queries, please contact [clugober@gmail.com].

## Disclaimer
This project is for educational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment.




   

