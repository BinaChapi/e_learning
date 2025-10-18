import mongoose from "mongoose";

const courseLikeSchema = new mongoose.Schema({
  likeId: {
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
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

const CourseLike = mongoose.model("CourseLike", courseLikeSchema);
export default CourseLike;
