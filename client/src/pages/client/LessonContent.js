import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import { ArrowLeft, Heart, FileText, PlayCircle, PenLine } from 'lucide-react';
import { hp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';

function LessonContent() {
  const location = useLocation();
  const { lesson = {
    title: 'Introduction to React',
    videos: [
      {
        id: '1',
        title: 'Getting Started with React',
        thumbnail: 'https://img.youtube.com/vi/1234/default.jpg',
        duration: '10:30'
      },
      {
        id: '2',
        title: 'Components and Props',
        thumbnail: 'https://img.youtube.com/vi/5678/default.jpg',
        duration: '15:45'
      },
      {
        id: '3',
        title: 'State and Lifecycle',
        thumbnail: 'https://img.youtube.com/vi/9012/default.jpg',
        duration: '12:20'
      }
    ],
    pdfs: [
      {
        title: 'React Fundamentals Guide',
        size: '2.5 MB'
      },
      {
        title: 'Exercise Worksheet',
        size: '1.8 MB'
      }
    ]
  }, courseTitle = 'React Development Course' } = location.state || {};

  const navigate = useNavigate();
  const [favoriteVideos, setFavoriteVideos] = useState(new Set());

  const handleBack = () => {
    navigate(-1);
  };

  const toggleFavorite = (videoId) => {
    setFavoriteVideos(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(videoId)) {
        newFavorites.delete(videoId);
      } else {
        newFavorites.add(videoId);
      }
      return newFavorites;
    });
  };

  return (
    <MainLayout>
      <div style={{ 
        padding: hp(3),
        backgroundColor: colors.background,
        minHeight: '100vh'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: hp(4),
          gap: hp(2)
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            style={{
              backgroundColor: colors.card,
              border: 'none',
              borderRadius: hp(1),
              padding: hp(1.5),
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: hp(1),
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <ArrowLeft size={hp(2.5)} />
            <span style={{ fontSize: hp(1.8) }}>Back</span>
          </motion.button>
          <h1 style={{ fontSize: hp(2.5) }}>{lesson.title}</h1>
        </div>

        {/* Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: hp(3),
          marginBottom: hp(4)
        }}>
          {/* Videos Section */}
          {lesson.videos.map((video, index) => (
            <motion.div
              key={`video-${index}`}
              whileHover={{ scale: 1.02 }}
              style={{
                backgroundColor: colors.card,
                borderRadius: hp(2),
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{
                position: 'relative',
                paddingTop: '56.25%' // 16:9 aspect ratio
              }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleFavorite(video.id)}
                  style={{
                    position: 'absolute',
                    top: hp(1),
                    right: hp(1),
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    padding: hp(1),
                    cursor: 'pointer'
                  }}
                >
                  <Heart
                    size={hp(2.5)}
                    fill={favoriteVideos.has(video.id) ? colors.primary : 'none'}
                    color={favoriteVideos.has(video.id) ? colors.primary : colors.text}
                  />
                </motion.button>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '50%',
                    padding: hp(1.5),
                    cursor: 'pointer'
                  }}
                >
                  <PlayCircle size={hp(4)} color={colors.primary} />
                </motion.div>
              </div>
              <div style={{ padding: hp(2) }}>
                <h3 style={{ marginBottom: hp(1) }}>{video.title}</h3>
                <p style={{ color: colors.textSecondary }}>{video.duration}</p>
              </div>
            </motion.div>
          ))}

          {/* PDFs Section */}
          {lesson.pdfs.map((pdf, index) => (
            <motion.div
              key={`pdf-${index}`}
              whileHover={{ scale: 1.02 }}
              style={{
                backgroundColor: colors.card,
                borderRadius: hp(2),
                padding: hp(2),
                display: 'flex',
                alignItems: 'center',
                gap: hp(2),
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
              }}
            >
              <FileText size={hp(4)} color={colors.primary} />
              <div>
                <h3 style={{ marginBottom: hp(0.5) }}>{pdf.title}</h3>
                <p style={{ color: colors.textSecondary }}>{pdf.size}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quiz Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: colors.primary,
            color: colors.card,
            border: 'none',
            borderRadius: hp(1.5),
            padding: `${hp(2)} ${hp(4)}`,
            fontSize: hp(2),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: hp(2),
            margin: '0 auto'
          }}
        >
          <PenLine size={hp(2.5)} />
          Take Quiz
        </motion.button>
      </div>
    </MainLayout>
  );
}

export default LessonContent;