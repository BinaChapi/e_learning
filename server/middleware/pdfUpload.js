const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // same config file

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning/pdfs", // your PDF folder on Cloudinary
    resource_type: "raw",     // MUST be 'raw' for PDFs
    allowed_formats: ["pdf"],
  },
});

const uploadPDF = multer({ storage: pdfStorage });

module.exports = uploadPDF;
