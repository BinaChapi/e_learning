import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../layouts/MainLayout';
import { ArrowLeft, Lock, Unlock, PenLine, PlayCircle, Heart, BookOpen, Clock } from 'lucide-react';
import { hp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';
import LoadingSpinner from '../../components/LoadingSpinner';

function MyCourseDetails() {
  const location = useLocation();
  const { item } = location.state;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    navigate(-1);
  };

  const handleLessonClick = (lesson) => {
    navigate('/lesson-content', {
      state: {
        lesson,
        courseTitle: item.title
      }
    });
  };

  return (
    <MainLayout>
      <div style={{ 
        padding: hp(3),
        backgroundColor: colors.background,
        minHeight: '100vh'
      }}>
        <LoadingSpinner isLoading={isLoading} />
        {/* Course Header */}
        <div style={{ 
          position: 'relative',
          marginBottom: hp(4)
        }}>
          <div style={{
            position: 'relative',
            borderRadius: hp(2),
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}>
            <img 
              src={item.img} 
              alt={item.title} 
              style={{ 
                width: '100%',
                height: hp(40),
                objectFit: 'cover'
              }}
            />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.7))'
            }} />
          </div>

          {/* Back Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            style={{
              position: 'absolute',
              top: hp(2),
              left: hp(2),
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

          {/* Course Info */}
          <div style={{
            position: 'absolute',
            bottom: hp(3),
            left: hp(3),
            right: hp(3),
            color: colors.card
          }}>
            <h1 style={{ 
              fontSize: hp(3),
              marginBottom: hp(2)
            }}>{item.title}</h1>
            
            <div style={{
              display: 'flex',
              gap: hp(3),
              marginBottom: hp(2)
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: hp(1) }}>
                <Clock size={hp(2)} />
                <span>8 weeks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: hp(1) }}>
                <BookOpen size={hp(2)} />
                <span>{item.lessons.length} lessons</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: hp(1) }}>
                <Heart size={hp(2)} />
                <span>{item.NoLikes} likes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div style={{
          backgroundColor: colors.card,
          padding: hp(3),
          borderRadius: hp(2),
          marginBottom: hp(4),
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
        }}>
          <h2 style={{ 
            fontSize: hp(2.2),
            marginBottom: hp(2)
          }}>Your Progress</h2>
          
          <div style={{ 
            height: hp(1.5),
            backgroundColor: `${colors.primary}20`,
            borderRadius: hp(0.75),
            marginBottom: hp(1)
          }}>
            <div style={{ 
              width: `${item.donePercentage}%`,
              height: '100%',
              backgroundColor: colors.success,
              borderRadius: hp(0.75),
              transition: 'width 0.3s ease'
            }} />
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: hp(1.8)
          }}>
            <span>{item.donePercentage}% Complete</span>
            <span>{item.lessons.filter(l => l.finished).length}/{item.lessons.length} Lessons</span>
          </div>
        </div>

        {/* Lessons List */}
        <div style={{ marginBottom: hp(4) }}>
          <h2 style={{ 
            fontSize: hp(2.2),
            marginBottom: hp(2)
          }}>Course Content</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: hp(2) }}>
            {item.lessons.map((lesson, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.01 }}
                onClick={() => handleLessonClick(lesson)}
                style={{
                  backgroundColor: lesson.finished ? `${colors.success}10` : colors.card,
                  padding: hp(2),
                  borderRadius: hp(1.5),
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${lesson.finished ? colors.success + '30' : colors.border}`,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: hp(1)
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: hp(1.5) }}>
                    <div style={{
                      backgroundColor: lesson.finished ? `${colors.success}20` : `${colors.error}15`,
                      padding: hp(1.2),
                      borderRadius: '50%',
                      border: `2px solid ${lesson.finished ? colors.success : colors.error}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {lesson.finished ? 
                        <Unlock size={hp(2.5)} color={colors.success} strokeWidth={2.5} /> : 
                        <Lock size={hp(2.5)} color={colors.error} strokeWidth={2.5} />
                      }
                    </div>
                    <h3 style={{ 
                      fontSize: hp(2),
                      color: lesson.finished ? colors.success : colors.text,
                      fontWeight: lesson.finished ? '600' : '500'
                    }}>Lesson {lesson.lessonNumber}</h3>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: hp(1)
                  }}>
                    <PlayCircle size={hp(2)} />
                    <span>{lesson.finishedVideos}/{lesson.videos} videos</span>
                  </div>
                </div>
                <p style={{ 
                  fontSize: hp(1.8),
                  color: colors.textSecondary,
                  marginLeft: hp(5)
                }}>Secrets of money, currency and our financial evolution</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final Test Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: '100%',
            padding: hp(2),
            backgroundColor: colors.primary,
            color: colors.card,
            border: 'none',
            borderRadius: hp(1.5),
            fontSize: hp(2),
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: hp(1.5),
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          Take Final Test
          <PenLine size={hp(2.5)} />
        </motion.button>
      </div>
    </MainLayout>
  );
}

export default MyCourseDetails;
