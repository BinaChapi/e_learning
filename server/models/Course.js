// server/models/Course.js
import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    category: String,
    courseType: String,
    courseId: {
      type: String,
      unique: true,
    },
    grades: {
      type: [String], // e.g., ["Grade 9", "Grade 10"]
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Course", CourseSchema);
