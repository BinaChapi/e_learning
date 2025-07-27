const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const upload = require('../middleware/cloudinaryUploader');

// POST: Upload a video
router.post("/", upload.single("videoFile"), async (req, res) => {
  try {
    const { videoTitle, chapterId, description } = req.body;

    console.log("Body:", req.body); // ✅ Debug
    console.log("File:", req.file); // ✅ Debug

    if (!req.file) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const newVideo = new Video({
      title: videoTitle,
      url: req.file.path,
      publicId: req.file.filename, // ✅ Required by schema
      chapterId, // ✅ MUST be sent from the client
      description,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload and save video" });
  }
});


// GET: Videos by chapter
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const videos = await Video.find({ chapterId: req.params.chapterId });
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

// DELETE: Delete video by ID
router.delete('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return res.status(404).json({ error: 'Video not found' });

    // Delete from Cloudinary
    const cloudinary = require("../utils/cloudinary");
    await cloudinary.uploader.destroy(video.publicId, { resource_type: "video" });

    await Video.findByIdAndDelete(req.params.id);
    res.json({ message: 'Video deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete video' });
  }
});

module.exports = router;
