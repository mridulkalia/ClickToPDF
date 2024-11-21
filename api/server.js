const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const properties = require("office-document-properties");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(fileUpload());

// Upload and process .docx file
app.post("/upload", async (req, res) => {
  const file = req.files?.file;

  if (!file) {
    return res.status(400).send("No file uploaded");
  }

  const uploadDir = path.join(__dirname, "uploads");
  const pdfDir = path.join(__dirname, "pdfs");

  // Ensure directories exist
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
  if (!fs.existsSync(pdfDir)) fs.mkdirSync(pdfDir);

  const uploadPath = path.join(uploadDir, file.name);

  // Save file
  await file.mv(uploadPath);

  try {
    // Extract metadata and convert to PDF
    const metadata = extractMetadata(uploadPath);
    const pdfPath = await convertToPdf(uploadPath);

    // Respond with metadata and PDF URL
    res.json({
      metadata,
      pdfUrl: `http://localhost:5000/download/${path.basename(pdfPath)}`,
    });
  } catch (error) {
    res.status(500).send("Error processing file");
  }
});

// Download PDF
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(__dirname, "pdfs", req.params.filename);
  res.download(filePath);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Metadata extraction
function extractMetadata(filePath) {
  const fileContent = fs.readFileSync(filePath);
  return properties.read(fileContent);
}

// Convert .docx to PDF using LibreOffice
function convertToPdf(docxPath) {
  return new Promise((resolve, reject) => {
    const pdfPath = path.join(
      __dirname,
      "pdfs",
      path.basename(docxPath, ".docx") + ".pdf"
    );

    // LibreOffice conversion command
    const command = `libreoffice --headless --convert-to pdf "${docxPath}" --outdir "${path.join(
      __dirname,
      "pdfs"
    )}"`;

    exec(command, (error) => {
      if (error) {
        reject("Error converting file");
      } else {
        resolve(pdfPath);
      }
    });
  });
}
