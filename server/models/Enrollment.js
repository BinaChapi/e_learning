import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  courseId: {
    type: String,
    required: true,
    ref: "Course",
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
