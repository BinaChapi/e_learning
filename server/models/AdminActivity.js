import mongoose from "mongoose";

const adminActivitySchema = new mongoose.Schema({
  activityId: {
    type: String,
    required: true,
    unique: true,
  },
  adminId: {
    type: String,
    required: true,
    ref: "User",
  },
  action: {
    type: String,
    required: true,
  },
  entityId: {
    type: String,
    required: true,
  },
  entityType: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const AdminActivity = mongoose.model(
  "AdminActivity",
  adminActivitySchema,
  "AdminActivity"
);
export default AdminActivity;
