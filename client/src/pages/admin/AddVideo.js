import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import { Upload, X } from 'lucide-react';
import colors from '../../styles/colors';

function AddVideo() {
  const { chapterId } = useParams(); // ✅ Gets chapterId from URL
  const navigate = useNavigate();

  const [videoData, setVideoData] = useState({
    videoTitle: '',
    videoFile: null,
    previewUrl: null,
    description: ''
  });

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoData(prev => ({
        ...prev,
        videoFile: file,
        previewUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    setError(null);
    setSuccessMessage(null);

    if (!videoData.videoFile) {
      setError("Please upload a video file.");
      setIsUploading(false);
      return;
    }

    if (!chapterId) {
      setError("Missing chapter ID. Cannot submit video.");
      setIsUploading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('videoTitle', videoData.videoTitle);
      formData.append('videoFile', videoData.videoFile);
      formData.append('chapterId', chapterId); // ✅ Send chapterId
      formData.append('description', videoData.description);

      const response = await fetch('http://localhost:3000/api/videos', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        setSuccessMessage('✅ Video uploaded successfully!');
        setTimeout(() => navigate(-1), 1500);
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      setError(error.message);
    } finally {
      setIsUploading(false);
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
            <h2 style={{ marginBottom: '24px', color: colors.text, fontSize: '24px' }}>Add New Video</h2>

            {/* Video Title */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="videoTitle" style={{ display: 'block', marginBottom: '8px' }}>Video Title</label>
              <input
                id="videoTitle"
                type="text"
                value={videoData.videoTitle}
                onChange={(e) => setVideoData(prev => ({ ...prev, videoTitle: e.target.value }))}
                required
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            {/* Video Description */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="description" style={{ display: 'block', marginBottom: '8px' }}>Description</label>
              <textarea
                id="description"
                rows={4}
                value={videoData.description}
                onChange={(e) => setVideoData(prev => ({ ...prev, description: e.target.value }))}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
              />
            </div>

            {/* Video File Upload */}
            <div style={{ marginBottom: '24px' }}>
              <label htmlFor="videoFile" style={{ display: 'block', marginBottom: '8px' }}>Upload Video</label>
              <div style={{
                border: '2px dashed #e2e8f0',
                padding: '20px',
                borderRadius: '12px',
                textAlign: 'center',
                position: 'relative'
              }}>
                {videoData.previewUrl ? (
                  <div style={{ position: 'relative' }}>
                    <video src={videoData.previewUrl} controls style={{ width: '100%' }} />
                    <button
                      type="button"
                      onClick={() => setVideoData(prev => ({ ...prev, videoFile: null, previewUrl: null }))}
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        backgroundColor: colors.error,
                        border: 'none',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        color: '#fff',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ) : (
                  <label htmlFor="videoFile" style={{ cursor: "pointer", display: "block" }}>
                    <Upload size={32} color="#94a3b8" />
                    <p style={{ marginTop: "10px", color: "#94a3b8" }}>Click to upload or drag and drop</p>
                  </label>
                )}
                <input
                  id="videoFile"
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  required
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Error or Success */}
            {error && <p style={{ color: colors.error }}>{error}</p>}
            {successMessage && <p style={{ color: colors.success }}>{successMessage}</p>}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isUploading}
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: colors.primary,
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                opacity: isUploading ? 0.7 : 1
              }}
            >
              {isUploading ? 'Uploading...' : 'Upload Video'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </AdminLayout>
  );
}

export default AddVideo;
