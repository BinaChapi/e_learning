// server/models/Chapter.js
import mongoose from "mongoose";
const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  grade: { type: String, required: true },
});

export default mongoose.model("Chapter", chapterSchema);
