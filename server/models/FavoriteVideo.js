import mongoose from "mongoose";

const favoriteVideoSchema = new mongoose.Schema({
  favoriteId: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: String,
    required: true,
    ref: "User",
  },
  videoId: {
    type: String,
    required: true,
    ref: "Video",
  },
  favoritedAt: {
    type: Date,
    default: Date.now,
  },
});

const FavoriteVideo = mongoose.model("FavoriteVideo", favoriteVideoSchema);
export default FavoriteVideo;
