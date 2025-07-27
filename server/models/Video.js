// models/Video.js

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    publicId: { type: String, required: true }, // ✅ Add this line
    chapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
