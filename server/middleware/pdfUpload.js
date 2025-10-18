import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./../utils/cloudinary.js";

const pdfStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning/pdfs", // your PDF folder on Cloudinary
    resource_type: "raw", // MUST be 'raw' for PDFs
    allowed_formats: ["pdf"],
  },
});

const uploadPDF = multer({ storage: pdfStorage });

export default uploadPDF;
