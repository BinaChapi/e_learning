const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const AdminActivity = require('../models/AdminActivity');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

// [GET] /api/courses - Fetch all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses.' });
  }
});

// [GET] /api/courses/:id - Fetch course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// [POST] /api/courses - Add new course
router.post('/', async (req, res) => {
  const { title, description, category, courseType, adminId } = req.body;

  const errors = [];
  if (!title) errors.push('Title is required');
  if (!description) errors.push('Description is required');
  if (!category) errors.push('Category is required');
  if (!['formal', 'hobby'].includes(courseType)) errors.push('Invalid course type');
  if (!adminId) errors.push('Admin ID is required');

  if (errors.length > 0) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  try {
    const course = new Course({
      title,
      description,
      category,
      courseType,
      courseId: new mongoose.Types.ObjectId().toString()
    });

    await course.save();

    // Save admin activity
    const activity = new AdminActivity({
      activityId: uuidv4(),
      adminId,
      action: 'add_course',
      entityId: course._id.toString(),
      entityType: 'Course',
      timestamp: new Date()
    });
    await activity.save();

    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
