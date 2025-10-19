import express from "express";
import Enrollment from "../models/Enrollment.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

/**
 * [POST] /api/enrollments
 * ➝ Enroll a user in a course
 */
router.post("/", async (req, res) => {
  const { userId, courseId } = req.body;

  if (!userId || !courseId) {
    return res.status(400).json({ error: "userId and courseId are required." });
  }

  try {
    // Prevent duplicate enrollments
    const existing = await Enrollment.findOne({ userId, courseId });
    if (existing) {
      return res
        .status(400)
        .json({ error: "User is already enrolled in this course." });
    }

    const enrollment = new Enrollment({
      enrollmentId: uuidv4(),
      userId,
      courseId,
      enrollmentDate: new Date(),
      progress: 0,
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create enrollment." });
  }
});

/**
 * [GET] /api/enrollments
 * ➝ Get all enrollments
 */
router.get("/", async (req, res) => {
  try {
    const enrollments = await Enrollment.find();
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch enrollments." });
  }
});

/**
 * [GET] /api/enrollments/user/:userId
 * ➝ Get all courses a specific user is enrolled in
 */
router.get("/user/:userId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.params.userId });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user enrollments." });
  }
});

/**
 * [GET] /api/enrollments/course/:courseId
 * ➝ Get all users enrolled in a specific course
 */
router.get("/course/:courseId", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      courseId: req.params.courseId,
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch course enrollments." });
  }
});

/**
 * [PATCH] /api/enrollments/:enrollmentId
 * ➝ Update progress for a specific enrollment
 */
router.patch("/:enrollmentId", async (req, res) => {
  const { progress } = req.body;

  try {
    const enrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId: req.params.enrollmentId },
      { progress },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }

    res.json(enrollment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update progress." });
  }
});

/**
 * [DELETE] /api/enrollments/:enrollmentId
 * ➝ Cancel/Delete enrollment
 */
router.delete("/:enrollmentId", async (req, res) => {
  try {
    const enrollment = await Enrollment.findOneAndDelete({
      enrollmentId: req.params.enrollmentId,
    });

    if (!enrollment) {
      return res.status(404).json({ error: "Enrollment not found." });
    }

    res.json({ message: "Enrollment deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete enrollment." });
  }
});

export default router;
