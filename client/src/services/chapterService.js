// client/services/chapterService.js
import axios from "axios";
const BASE_URL = "http://localhost:3000/api/chapters";

export const getChaptersByCourseAndGrade = async (courseId, grade) => {
  const response = await axios.get(`${BASE_URL}/${courseId}/${grade}`);
  return response.data;
};

export const addChapter = async (chapterData) => {
  const response = await axios.post(BASE_URL, chapterData);
  return response.data;
};

export const deleteChapter = async (chapterId) => {
  const response = await axios.delete(`${BASE_URL}/${chapterId}`);
  return response.data;
};
