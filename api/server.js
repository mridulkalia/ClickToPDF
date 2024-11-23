const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { exec } = require("child_process"); // Import the exec function from child_process

const app = express();

const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(fileUpload());

// Upload and convert docx to pdf
app.post("/convert", async (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded." });
  }

  const file = req.files.file;
  const fileExtension = path.extname(file.name).toLowerCase();

  // Validate file type
  if (fileExtension !== ".docx") {
    return res
      .status(400)
      .json({ error: "Invalid file format. Please upload a .docx file." });
  }

  // Save the uploaded file temporarily
  const tempFilePath = path.join(__dirname, "uploads", file.name);
  if (!fs.existsSync(path.join(__dirname, "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "uploads"));
  }

  // Move the file to the "uploads" folder
  file.mv(tempFilePath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error saving the file." });
    }

    try {
      // Set the output directory where the PDF will be saved
      const outputDir = path.join(__dirname, "uploads");
      const outputFilePath = path.join(
        outputDir,
        `${path.basename(file.name, fileExtension)}.pdf`
      );

      // Construct the soffice command for conversion
      const sofficeCommand = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf --outdir "${outputDir}" "${tempFilePath}"`;

      // Execute the command
      exec(sofficeCommand, (err, stdout, stderr) => {
        if (err) {
          console.error("Error during conversion:", stderr);
          return res.status(500).json({ error: "Error converting the file." });
        }

        // Send the converted PDF file back to the client
        res.set({
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${path.basename(
            file.name,
            fileExtension
          )}.pdf"`,
        });

        // Read the PDF file and send it as a response
        const pdfData = fs.readFileSync(outputFilePath);
        console.log(pdfData);
        res.send(pdfData);

        // Clean up the temporary files after the conversion
        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(outputFilePath);
      });
    } catch (error) {
      console.error("Error during conversion:", error);
      res.status(500).json({ error: "Error converting the file." });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// const express = require("express");
// const fileUpload = require("express-fileupload");
// const fs = require("fs");
// const path = require("path");
// const docxConverter = require("docx-pdf");
// const cors = require("cors");

// const app = express();

// const corsOptions = {
//   origin: "http://localhost:3000",
//   methods: ["GET", "POST"],
// };

// app.use(cors(corsOptions));
// app.use(fileUpload());

// // Directory for temporary file storage
// const UPLOAD_DIR = path.join(__dirname, "uploads");
// if (!fs.existsSync(UPLOAD_DIR)) {
//   fs.mkdirSync(UPLOAD_DIR, { recursive: true });
// }

// // Endpoint to handle file upload and conversion
// app.post("/docs/convert", (req, res) => {
//   if (!req.files || !req.files.file) {
//     return res.status(400).json({ error: "No file uploaded." });
//   }

//   const file = req.files.file;
//   const fileExtension = path.extname(file.name).toLowerCase();

//   // Ensure the uploaded file is a .docx file
//   if (fileExtension !== ".docx") {
//     return res
//       .status(400)
//       .json({ error: "Invalid file format. Please upload a .docx file." });
//   }

//   // Define paths for the temporary input (.docx) and output (.pdf) files
//   const inputFilePath = path.join(UPLOAD_DIR, file.name);
//   const outputFilePath = path.join(
//     UPLOAD_DIR,
//     file.name.replace(".docx", ".pdf")
//   );

//   // Save the uploaded file
//   file.mv(inputFilePath, (err) => {
//     if (err) {
//       return res.status(500).json({ error: "Error uploading the file." });
//     }

//     // Convert the uploaded .docx file to PDF
//     docxConverter(inputFilePath, outputFilePath, (err) => {
//       if (err) {
//         console.error("Error during conversion:", err);
//         return res.status(500).json({ error: "Error processing the file." });
//       }

//       // Read the converted PDF file and encode it to Base64
//       const pdfData = fs.readFileSync(outputFilePath, { encoding: "base64" });

//       // Return the PDF data as a response
//       res.json({
//         metadata: {
//           originalName: file.name,
//           size: file.size,
//           uploadedAt: new Date().toISOString(),
//         },
//         pdfFile: pdfData,
//       });

//       // Clean up the temporary files
//       fs.unlinkSync(inputFilePath);
//       fs.unlinkSync(outputFilePath);
//     });
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
