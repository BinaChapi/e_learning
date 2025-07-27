const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary"); // config file

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning/videos", // Folder in Cloudinary
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
  },
});

const upload = multer({ storage });

module.exports = upload;
