import express from "express";
const router = express.Router();
import PDF from "../models/PDF.js";
import uploadPDF from "./../middleware/pdfUpload.js";

// [GET] Get all PDFs for a chapter
router.get("/chapter/:chapterId", async (req, res) => {
  try {
    const pdfs = await PDF.find({ chapterId: req.params.chapterId });
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch PDFs" });
  }
});

// [POST] Upload a PDF file to Cloudinary
router.post("/", uploadPDF.single("fileUrl"), async (req, res) => {
  const { title, chapterId } = req.body;

  if (!req.file || !title || !chapterId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const pdf = new PDF({
      title,
      fileUrl: req.file.path, // Cloudinary URL
      chapterId,
    });
    await pdf.save();
    res.status(201).json(pdf);
  } catch (err) {
    console.error("PDF Upload Error:", err);
    res.status(500).json({ error: "Failed to upload PDF" });
  }
});

// [DELETE] Delete PDF by ID
router.delete("/:id", async (req, res) => {
  try {
    const pdf = await PDF.findByIdAndDelete(req.params.id);
    if (!pdf) return res.status(404).json({ error: "PDF not found" });
    res.json({ message: "PDF deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete PDF" });
  }
});

export default router;
