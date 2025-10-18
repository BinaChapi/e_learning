import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PDF", pdfSchema);
