const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));
app.use(fileUpload());

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

  // save kro file ko for the time being
  const tempFilePath = path.join(__dirname, "uploads", file.name);
  if (!fs.existsSync(path.join(__dirname, "uploads"))) {
    fs.mkdirSync(path.join(__dirname, "uploads"));
  }

  // and move it to uploads folder
  file.mv(tempFilePath, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error saving the file." });
    }

    try {
      const outputDir = path.join(__dirname, "uploads");
      const outputFilePath = path.join(
        outputDir,
        `${path.basename(file.name, fileExtension)}.pdf`
      );

      // Construct the soffice command for conversion
      // const sofficeCommand = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to pdf --outdir "${outputDir}" "${tempFilePath}"`;
      const sofficeCommand = `/usr/bin/soffice --headless --convert-to pdf --outdir "${outputDir}" "${tempFilePath}"`;

      // Execute the command
      exec(sofficeCommand, (err, stdout, stderr) => {
        if (err) {
          console.error("Error during conversion:", stderr);
          return res.status(500).json({ error: "Error converting the file." });
        }

        res.set({
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="${path.basename(
            file.name,
            fileExtension
          )}.pdf"`,
        });

        const pdfData = fs.readFileSync(outputFilePath);
        console.log(pdfData);
        res.send(pdfData);

        fs.unlinkSync(tempFilePath);
        fs.unlinkSync(outputFilePath);
      });
    } catch (error) {
      console.error("Error during conversion:", error);
      res.status(500).json({ error: "Error converting the file." });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
