import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import { hp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';
import { Book, Plus, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { motion } from 'framer-motion';
import { getCourses } from '../../services/courseService';

const courseColors = [
  colors.primary,
  colors.green,
  colors.warning,
  colors.info,
  colors.lightblue,
  colors.success,
  colors.error,
  colors.secondary,
];

function Course() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

    useEffect(() => {
      async function fetchCourses() {
        try {
          const data = await getCourses();
          setCourses(data);
        } catch (err) {
          setError('Failed to load courses');
        }
      }
      fetchCourses();
    }, []);


  const handleCardClick = (course) => {
    navigate(`/courses/${course._id}`); // or use slug if available
  };

  return (
    <AdminLayout>
      <div style={{ padding: hp(4), maxWidth: '1400px', margin: '0 auto' }}>
        <div
          onClick={() => navigate(`/chapters/add-course`)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: hp(4),
          }}>
          <h1 style={{
            fontSize: hp(3.5),
            color: colors.text,
            margin: 0
          }}>Courses</h1>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: hp(1),
              padding: `${hp(1.5)}px ${hp(3)}px`,
              backgroundColor: colors.primary,
              color: colors.card,
              border: 'none',
              borderRadius: hp(1),
              cursor: 'pointer',
              fontSize: hp(1.8),
              fontWeight: '500',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Plus size={hp(2.2)} />
            Add New Course
          </motion.button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {courses.length === 0 && !error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '48px 0',
              background: colors.card,
              borderRadius: hp(2),
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              marginBottom: hp(3)
            }}
          >
            <Book size={hp(7)} color={colors.primary} style={{ marginBottom: hp(2) }} />
            <h2 style={{
              color: colors.primary,
              fontWeight: 700,
              fontSize: hp(2.5),
              marginBottom: hp(1)
            }}>
              No courses found
            </h2>
            <p style={{
              color: colors.textSecondary,
              fontSize: hp(1.7),
              marginBottom: hp(2)
            }}>
              Start by adding your first course to help students learn!
            </p>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: colors.primary }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/chapters/add-course')}
              style={{
                background: colors.primary,
                color: colors.card,
                border: 'none',
                borderRadius: hp(1),
                padding: `${hp(1.5)}px ${hp(4)}px`,
                fontSize: hp(1.8),
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
              }}
            >
              <Plus size={hp(2)} style={{ marginRight: hp(1) }} />
              Add Course
            </motion.button>
          </motion.div>
        )}

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: hp(3)
        }}>
          {courses.map((course, index) => {
            const color = courseColors[index % courseColors.length];
            return (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 8px 16px ${color}22`
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleCardClick(course)}
                style={{
                  backgroundColor: colors.card,
                  borderRadius: hp(2),
                  padding: hp(3),
                  cursor: 'pointer',
                  border: `2px solid ${color}40`,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: hp(1),
                  height: '100%',
                  backgroundColor: color,
                }} />

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: hp(2) }}>
                    <div style={{
                      backgroundColor: `${color}15`,
                      padding: hp(2),
                      borderRadius: hp(1.5),
                    }}>
                      <Book size={hp(3)} color={color} />
                    </div>
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: hp(2.2),
                        color: colors.text,
                        marginBottom: hp(0.5)
                      }}>{course.title}</h3>
                      <p style={{
                        margin: 0,
                        fontSize: hp(1.6),
                        color: colors.textSecondary
                      }}>{course.category} - {course.courseType}</p>
                    </div>
                  </div>
                  <ChevronRight size={hp(2.5)} color={color} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}

export default Course;
