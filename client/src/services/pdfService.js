// client/services/pdfService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/pdfs";

export const getPDFsByChapter = async (chapterId) => {
  const response = await axios.get(`${BASE_URL}/chapter/${chapterId}`);
  return response.data;
};

export const addPDF = async ({ pdfTitle, chapterId, pdfFile }) => {
  const formData = new FormData();
  formData.append("title", pdfTitle);
  formData.append("chapterId", chapterId);
  formData.append("fileUrl", pdfFile); // Must match backend field name: "fileUrl"

  const response = await axios.post(BASE_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

  return response.data;
};

export const deletePDF = async (pdfId) => {
  const response = await axios.delete(`${BASE_URL}/${pdfId}`);
  return response.data;
};
