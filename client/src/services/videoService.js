// client/services/videoService.js
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/videos";

export const getVideosByChapter = async (chapterId) => {
  const response = await axios.get(`${BASE_URL}/chapter/${chapterId}`);
  return response.data;
};

export const addVideo = async (videoData) => {
  const response = await axios.post(BASE_URL, videoData);
  return response.data;
};

export const deleteVideo = async (videoId) => {
  const response = await axios.delete(`${BASE_URL}/${videoId}`);
  return response.data;
};
