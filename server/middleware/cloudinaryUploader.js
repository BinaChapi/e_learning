import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./../utils/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "elearning/videos", // Folder in Cloudinary
    resource_type: "video",
    allowed_formats: ["mp4", "mov", "avi", "mkv"],
  },
});

const upload = multer({ storage });

export default upload;
