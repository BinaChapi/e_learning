import mongoose from "mongoose";

const finalTestResultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true,
  },
  testId: {
    type: String,
    required: true,
    ref: "FinalTest",
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  score: {
    type: Number,
    required: true,
  },
  attemptDate: {
    type: Date,
    default: Date.now,
  },
});

const FinalTestResult = mongoose.model(
  "FinalTestResult",
  finalTestResultSchema
);
export default FinalTestResult;
