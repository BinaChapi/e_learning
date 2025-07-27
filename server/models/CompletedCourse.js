const mongoose = require('mongoose');

const completedCourseSchema = new mongoose.Schema({
  completionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  courseId: {
    type: String,
    required: true,
    ref: 'Course'
  },
  completionDate: {
    type: Date,
    default: Date.now
  }
});

const CompletedCourse = mongoose.model('CompletedCourse', completedCourseSchema);
module.exports = CompletedCourse;