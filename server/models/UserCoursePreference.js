const mongoose = require('mongoose');

const userCoursePreferenceSchema = new mongoose.Schema({
  preferenceId: {
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
  }
});

const UserCoursePreference = mongoose.model('UserCoursePreference', userCoursePreferenceSchema);
module.exports = UserCoursePreference;