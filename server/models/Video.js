import mongoose from "mongoose";
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

export default mongoose.model("Video", videoSchema);
