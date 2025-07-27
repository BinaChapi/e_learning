const mongoose = require('mongoose');

const finalTestSchema = new mongoose.Schema({
  testId: {
    type: String,
    required: true,
    unique: true
  },
  courseId: {
    type: String,
    required: true,
    ref: 'Course'
  },
  question: {
    type: String,
    required: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: String,
    required: true
  }
});

const FinalTest = mongoose.model('FinalTest', finalTestSchema);
module.exports = FinalTest;