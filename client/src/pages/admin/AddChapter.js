import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addChapter } from "../../services/chapterService";
import AdminLayout from "../../layouts/AdminLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import colors from "../../styles/colors";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const AddChapter = () => {
  const navigate = useNavigate();
  const { courseId, grade } = Object.fromEntries(new URLSearchParams(window.location.search));

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !grade || !courseId) {
      setErrorMsg("All fields are required");
      return;
    }

    setIsLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      await addChapter({ name, courseId, grade });
      setSuccessMsg("Chapter added successfully!");
      setName("");
      setTimeout(() => navigate(`/courses/${courseId}`), 1000);
    } catch (err) {
      console.error("Add chapter error:", err);
      setErrorMsg("Failed to add chapter");
    } finally {
      setIsLoading(false);
    }
  };

  if (!courseId || !grade) {
    return (
      <AdminLayout>
        <div style={{ padding: "32px", color: "red" }}>
          Missing courseId or grade in query parameters.
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout showBackInHeader={true}>
      <LoadingSpinner isLoading={isLoading} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: "32px",
          height: "calc(100vh - 100px)",
          overflowY: "auto",
          backgroundColor: "#f8fafc"
        }}
      >
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
        }}>
          <h1 style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "600",
            color: "#1e293b",
            marginBottom: "24px"
          }}>
            Add New Chapter for <span style={{ color: colors.primary }}>{grade}</span>
          </h1>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{
                display: "block",
                marginBottom: "8px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#334155"
              }}>Chapter Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter chapter name"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  fontSize: "16px"
                }}
              />
            </div>

            {successMsg && (
              <div style={{
                color: colors.success,
                background: `${colors.success}10`,
                borderRadius: "8px",
                padding: "10px",
                fontWeight: 500,
              }}>
                {successMsg}
              </div>
            )}
            {errorMsg && (
              <div style={{
                color: colors.error,
                background: `${colors.error}10`,
                borderRadius: "8px",
                padding: "10px",
                fontWeight: 500,
              }}>
                {errorMsg}
              </div>
            )}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: "100%",
                padding: "16px",
                backgroundColor: colors.primary,
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px"
              }}
            >
              <Plus size={20} />
              Add Chapter
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AddChapter;
