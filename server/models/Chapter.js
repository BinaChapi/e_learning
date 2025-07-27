// server/models/Chapter.js
const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  grade: { type: String, required: true },
});

module.exports = mongoose.model("Chapter", chapterSchema);
