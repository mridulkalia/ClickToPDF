# Word-to-PDF Converter

A simple web application that converts Word documents (`.docx`) into PDF format using **React** (frontend) and **Node.js** with **LibreOffice** (backend).

## Features

- Upload `.docx` files from your local system.
- Instant conversion to `.pdf` format.
- Download the converted PDF file.
- Fully containerized with **Docker** for easy deployment.

---

## Prerequisites

Make sure you have the following installed:

1. **Docker** and **Docker Compose**
2. **Node.js** and **npm** (for local development)

---

## Project Structure

- **frontend/**: React-based user interface.
- **backend/**: Node.js server for handling file uploads and conversion.
- **docker-compose.yml**: Configuration for running the app using Docker.

---

## Built With
- React for the front end.
- Node.js with Express for the backend.
- LibreOffice for document conversion.
- Docker for containerization.

---

## Setup Instructions

### Using Docker (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ClickToPDF.git
   cd ClickToPDF
   ```
2. **Run the application**:
   ```bash
   docker-compose up --build
   ```
3. **Access the app in your browser at**:
   ```
   http://localhost:3000
   ```
   
   
   
