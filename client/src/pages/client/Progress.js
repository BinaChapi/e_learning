import React, { useState } from 'react';
import FX from '../../assets/images/FX.png';
import sport from '../../assets/images/sport.png';
import food from '../../assets/images/food.png';
import history from '../../assets/images/history.png';
import MainLayout from '../../layouts/MainLayout';
import ProgressChart from '../../components/ProgressChart';
import { hp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';
import { Book, Clock, Award, GraduationCap, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

function Progress() {
  const [isLoading, setIsLoading] = useState(false);
  const metrics = [
    { icon: Book, label: 'Courses', value: '6', color: '#3b82f6' },
    { icon: Clock, label: 'Hours', value: '29', color: '#10b981' },
    { icon: Award, label: 'Tests', value: '60', color: '#8b5cf6' },
    { icon: GraduationCap, label: 'Lessons', value: '720', color: '#ec4899' },
    { icon: Trophy, label: 'Completed', value: '18', color: '#14b8a6' },
  ];

  const completedCoursesByGrade = {
    'Grade 9': [
      { title: 'Mathematics', image: sport},
      { title: 'Physics', image: food },
    ],
    'Grade 10': [
      { title: 'Biology', image: history },
    ],
    'Grade 11': [
      { title: 'Chemistry', image: FX },
    ],
  };

  return (
    <MainLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <LoadingSpinner isLoading={isLoading} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 style={{ fontSize: hp(3.5), marginBottom: hp(4), color: colors.text }}>
            Learning Progress
          </h1>

          <div style={{ display: 'flex', gap: hp(4) }}>
            {/* Left Column */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: hp(4) }}>
              {/* Top - Progress Chart */}
              <div style={{
                backgroundColor: colors.card,
                padding: hp(0),
                borderRadius: hp(2),
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              }}>
                <h2 style={{ fontSize: hp(2.5), marginBottom: hp(3), color: colors.text }}>
                  Course Completion Progress
                </h2>
                <ProgressChart />
              </div>

              {/* Bottom - Key Metrics (3 in a row) */}
              <div style={{
                backgroundColor: colors.card,
                padding: hp(3),
                borderRadius: hp(2),
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              }}>
                <h2 style={{ fontSize: hp(2.5), marginBottom: hp(3), color: colors.text }}>
                  Key Metrics
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: hp(3),
                }}>
                  {metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{
                        backgroundColor: `${metric.color}10`,
                        padding: hp(2),
                        borderRadius: hp(2),
                        display: 'flex',
                        alignItems: 'center',
                        gap: hp(2),
                      }}
                    >
                      <div style={{
                        backgroundColor: `${metric.color}15`,
                        padding: hp(2),
                        borderRadius: '50%',
                      }}>
                        <metric.icon size={hp(3)} color={metric.color} />
                      </div>
                      <div>
                        <h3 style={{ fontSize: hp(2.5), color: colors.text }}>{metric.value}</h3>
                        <p style={{ fontSize: hp(1.6), color: colors.textSecondary }}>{metric.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Completed Courses by Grade */}
            <div style={{
              flex: 1,
              backgroundColor: colors.card,
              padding: hp(3),
              borderRadius: hp(2),
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
              maxHeight: '850px',
              overflowY: 'auto',
            }}>
              <h2 style={{ fontSize: hp(2.5), marginBottom: hp(3), color: colors.text }}>
                Completed Courses
              </h2>

              {Object.entries(completedCoursesByGrade).map(([grade, courses], idx) => (
                <div key={idx} style={{ marginBottom: hp(3) }}>
                  <h3 style={{ fontSize: hp(2), color: colors.primary, marginBottom: hp(1) }}>{grade}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: hp(2) }}>
                    {courses.map((course, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        style={{
                          backgroundColor: `${colors.primary}10`,
                          borderRadius: hp(1.5),
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          gap: hp(2),
                          padding: hp(2),
                        }}
                      >
                        <img
                          src={course.image}
                          alt={course.title}
                          style={{
                            width: hp(8),
                            height: hp(8),
                            objectFit: 'cover',
                            borderRadius: hp(1),
                          }}
                        />
                        <span style={{ fontSize: hp(2), color: colors.text }}>
                          {course.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default Progress;
