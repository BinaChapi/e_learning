import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import { UploadCloud, FileText, X } from 'lucide-react';
import colors from '../../styles/colors';

function AddPDF() {
  const { chapterId } = useParams(); // ✅ Get chapter ID from URL
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
    setError('');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      setPdfFile(e.dataTransfer.files[0]);
      setError('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveFile = () => {
    setPdfFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!pdfFile || !pdfTitle || !chapterId) {
      setError('Please fill all fields and select a PDF file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', pdfTitle);
    formData.append('chapterId', chapterId);
    formData.append('fileUrl', pdfFile); // Must match backend key

    try {
      const res = await fetch('http://localhost:3000/api/pdfs', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setSuccessMessage('✅ PDF uploaded successfully!');
        setTimeout(() => navigate(-1), 1500);
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to upload PDF.');
      }
    } catch (err) {
      console.error(err);
      setError('Server error.');
    }
  };

  return (
    <AdminLayout showBackInHeader={true}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          padding: '32px',
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          backgroundColor: '#f8fafc'
        }}
      >
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden'
        }}>
          <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
            <h2 style={{ marginBottom: '24px', color: colors.text, fontSize: '24px' }}>Add PDF Resource</h2>

            {/* PDF Title */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="pdfTitle" style={{ display: 'block', marginBottom: '8px' }}>PDF Title</label>
              <input
                id="pdfTitle"
                type="text"
                value={pdfTitle}
                onChange={(e) => setPdfTitle(e.target.value)}
                required
                placeholder="Enter PDF title"
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '16px'
                }}
              />
            </div>

            {/* Drag and Drop Upload */}
            <motion.div
              initial={false}
              animate={isDragging ? { scale: 1.03, borderColor: colors.primary } : { scale: 1, borderColor: '#e2e8f0' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                border: `2px dashed ${isDragging ? colors.primary : '#e2e8f0'}`,
                borderRadius: '12px',
                padding: '32px',
                background: isDragging ? `${colors.primary}10` : '#f8fafc',
                textAlign: 'center',
                cursor: 'pointer',
                position: 'relative'
              }}
              onClick={() => fileInputRef.current.click()}
            >
              {!pdfFile ? (
                <>
                  <UploadCloud size={40} color={colors.primary} />
                  <div style={{ marginTop: 12, color: colors.primary, fontWeight: 500, fontSize: 16 }}>
                    Click to upload or drag and drop a PDF
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}
                >
                  <FileText size={32} color={colors.primary} />
                  <span style={{ fontWeight: 500, color: '#334155', fontSize: 16 }}>
                    {pdfFile.name}
                  </span>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    onClick={handleRemoveFile}
                    style={{
                      backgroundColor: colors.error,
                      border: 'none',
                      borderRadius: '50%',
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={16} color="#fff" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>

            {/* Error / Success Message */}
            {error && <p style={{ color: colors.error, marginTop: '16px' }}>{error}</p>}
            {successMessage && <p style={{ color: colors.success, marginTop: '16px' }}>{successMessage}</p>}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              style={{
                marginTop: '24px',
                width: '100%',
                padding: '16px',
                backgroundColor: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer'
              }}
            >
              Upload PDF
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

export default AddPDF;
