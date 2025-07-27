const mongoose = require('mongoose');

const chapterQuizResultSchema = new mongoose.Schema({
  resultId: {
    type: String,
    required: true,
    unique: true
  },
  quizId: {
    type: String,
    required: true,
    ref: 'ChapterQuiz'
  },
  userId: {
    type: String,
    required: true,
    ref: 'User'
  },
  score: {
    type: Number,
    required: true
  },
  attemptDate: {
    type: Date,
    default: Date.now
  }
});

const ChapterQuizResult = mongoose.model('ChapterQuizResult', chapterQuizResultSchema);
module.exports = ChapterQuizResult;