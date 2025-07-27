import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCourseById } from "../../services/courseService";
import { getChaptersByCourseAndGrade } from "../../services/chapterService";
import { getVideosByChapter } from "../../services/videoService";
import { getPDFsByChapter, deletePDF } from "../../services/pdfService";
import { motion } from "framer-motion";
import AdminLayout from "../../layouts/AdminLayout";
import Collapsible from "../../components/Collapsible";
import { Pencil, Trash2, Plus, Video, FileText, Trash } from "lucide-react";
import colors from "../../styles/colors";

const CourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [grades] = useState(["Grade 9", "Grade 10", "Grade 11", "Grade 12"]);
  const [chapterData, setChapterData] = useState({});
  const [openGrade, setOpenGrade] = useState(null);
  const [openChapter, setOpenChapter] = useState(null);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const course = await getCourseById(id);
        setCourse(course);

        const gradeData = {};

        for (const grade of grades) {
          const chapters = await getChaptersByCourseAndGrade(id, grade);
          const enrichedChapters = [];

          for (const chapter of chapters) {
            const [videos, pdfs] = await Promise.all([
              getVideosByChapter(chapter._id),
              getPDFsByChapter(chapter._id),
            ]);

            enrichedChapters.push({ ...chapter, videos, pdfs });
          }

          gradeData[grade] = enrichedChapters;
        }

        setChapterData(gradeData);
      } catch (err) {
        console.error("Failed to fetch course details:", err);
      }
    }

    fetchCourseDetails();
  }, [id, grades]);

  const handleDeletePDF = async (pdfId, grade) => {
    try {
      await deletePDF(pdfId);
      const updatedData = { ...chapterData };
      for (const chapter of updatedData[grade]) {
        chapter.pdfs = chapter.pdfs.filter((pdf) => pdf._id !== pdfId);
      }
      setChapterData(updatedData);
    } catch (err) {
      console.error("Failed to delete PDF:", err);
    }
  };

  if (!course) {
    return (
      <AdminLayout>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            padding: "32px",
            height: "calc(100vh - 100px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#64748b",
            fontSize: "18px",
          }}
        >
          Loading course details...
        </motion.div>
      </AdminLayout>
    );
  }

  const renderChapterContent = (chapter, grade) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        {/* Videos */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            overflowX: "auto",
            padding: "4px",
            scrollbarWidth: "thin",
          }}
        >
          {chapter.videos.length > 0 ? (
            chapter.videos.map((video) => (
              <motion.div
                key={video._id}
                whileHover={{ y: -5 }}
                style={{
                  width: "280px",
                  flexShrink: 0,
                  backgroundColor: "#fff",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "160px",
                    backgroundColor: "#000",
                    overflow: "hidden",
                  }}
                >
                  <video
                    src={video.url}
                    muted
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ padding: "16px" }}>
                  <h4
                    style={{
                      margin: 0,
                      fontSize: "18px",
                      color: "#334155",
                      marginBottom: "8px",
                    }}
                  >
                    {video.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "14px",
                      color: "#64748b",
                      marginBottom: "16px",
                      lineHeight: "1.5",
                    }}
                  >
                    {video.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "12px",
                      justifyContent: "flex-end",
                    }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: colors.green,
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Pencil size={20} color="#fff" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        backgroundColor: colors.error,
                        padding: "8px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={20} color="#fff" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p style={{ padding: "16px", color: "#94a3b8" }}>No videos available.</p>
          )}
        </div>

        {/* PDFs */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {chapter.pdfs.length > 0 ? (
            chapter.pdfs.map((pdf) => (
              <motion.div
                key={pdf._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: `1px solid ${colors.primary}30`,
                  boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                  }}
                  onClick={() => window.open(pdf.fileUrl, "_blank")}
                  title="Open PDF"
                >
                  <FileText size={28} color={colors.primary} />
                  <span
                    style={{
                      color: colors.primary,
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {pdf.title}
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDeletePDF(pdf._id, grade)}
                  style={{
                    background: colors.error,
                    border: "none",
                    borderRadius: "50%",
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                  title="Delete PDF"
                >
                  <Trash size={18} color="#fff" />
                </motion.button>
              </motion.div>
            ))
          ) : (
            <p style={{ padding: "8px 16px", color: "#94a3b8" }}>
              No PDFs available.
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/chapters/add-video/${chapter._id}`)}
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: "#fff",
              border: "2px dashed #e2e8f0",
              borderRadius: "12px",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Plus size={28} color="#94a3b8" />
            <span style={{ color: "#64748b", fontSize: "15px", fontWeight: "500" }}>
              Add New Video
            </span>
          </motion.button>

          <motion.button
            whileHover={!chapter.pdfs.length ? { scale: 1.02 } : {}}
            whileTap={!chapter.pdfs.length ? { scale: 0.98 } : {}}
            onClick={() => !chapter.pdfs.length && navigate(`/chapters/add-pdf/${chapter._id}`)}
            disabled={chapter.pdfs.length > 0}
            style={{
              flex: 1,
              padding: "20px",
              backgroundColor: chapter.pdfs.length > 0 ? "#f1f5f9" : "#fff",
              border: "2px dashed #e2e8f0",
              borderRadius: "12px",
              cursor: chapter.pdfs.length > 0 ? "not-allowed" : "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
            title={chapter.pdfs.length > 0 ? "PDF already exists" : "Add PDF"}
          >
            <Plus size={28} color="#94a3b8" />
            <span style={{ color: "#64748b", fontSize: "15px", fontWeight: "500" }}>
              Add PDF
            </span>
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: "32px",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          backgroundColor: "#f8fafc",
        }}
      >
        <h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1e293b", marginBottom: "32px" }}>
          {course.title}
        </h1>

        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          {grades.map((grade) => (
            <Collapsible
              key={grade}
              title={grade}
              isOpen={openGrade === grade}
              onToggle={() => setOpenGrade(openGrade === grade ? null : grade)}
            >
              {chapterData[grade] &&
                chapterData[grade].map((chapter) => (
                  <Collapsible
                    key={chapter._id}
                    title={chapter.name}
                    isOpen={openChapter === chapter._id}
                    onToggle={() =>
                      setOpenChapter(openChapter === chapter._id ? null : chapter._id)
                    }
                  >
                    {renderChapterContent(chapter, grade)}
                  </Collapsible>
                ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/chapters/add-chapter?courseId=${id}&grade=${grade}`)}
                style={{
                  width: "100%",
                  padding: "24px",
                  backgroundColor: "#fff",
                  border: "2px dashed #e2e8f0",
                  borderRadius: "12px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "24px",
                }}
              >
                <Plus size={32} color="#94a3b8" />
                <span style={{ color: "#64748b", fontSize: "16px", fontWeight: "500" }}>
                  Add New Chapter
                </span>
              </motion.button>
            </Collapsible>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default CourseDetails;
