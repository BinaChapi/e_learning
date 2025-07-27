const express = require('express');
const router = express.Router();
const Chapter = require('../models/Chapter');


// Add chapter
router.post("/", async (req, res) => {
  try {
    const { name, courseId, grade } = req.body;
    const chapter = new Chapter({ name, courseId, grade });
    await chapter.save();
    res.status(201).json(chapter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// [GET] Get all chapters for a specific course + grade
router.get('/:courseId/:grade', async (req, res) => {
  const { courseId, grade } = req.params;

  try {
    const chapters = await Chapter.find({ courseId, grade });
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch chapters' });
  }
});


// [DELETE] Delete chapter by ID
router.delete('/:id', async (req, res) => {
  try {
    const chapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!chapter) return res.status(404).json({ error: 'Chapter not found' });
    res.json({ message: 'Chapter deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete chapter' });
  }
});

module.exports = router;
