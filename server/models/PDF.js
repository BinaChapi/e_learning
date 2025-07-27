const mongoose = require("mongoose");

const pdfSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model("PDF", pdfSchema);
