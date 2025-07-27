const mongoose = require('mongoose');

const chapterQuizSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true,
    unique: true
  },
  chapterId: {
    type: String,
    required: true,
    ref: 'Chapter'
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

const ChapterQuiz = mongoose.model('ChapterQuiz', chapterQuizSchema);
module.exports = ChapterQuiz;