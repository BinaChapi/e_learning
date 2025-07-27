import React from 'react';
import { motion } from 'framer-motion';
import { ThumbsUp, Users } from 'lucide-react';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';

function MostEnrolledCourses({ subject, grade, likes, students, img }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        backgroundColor: '#fff',
        width: hp(40), // wider card
        borderRadius: '1.5rem',
        overflow: 'hidden',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        style={{ overflow: 'hidden',width:'100%' }}
      >
        <img
          src={img}
          alt={subject}
          style={{
            width: '100%',
            height: hp(22),
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }}
        />
      </motion.div>

      <div style={{ padding: '1.25rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <motion.h4
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              margin: 0,
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#2d3748'
            }}
          >
            {subject}
          </motion.h4>
          <motion.span
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
              backgroundColor: colors.primary + '15',
              color: colors.primary,
              padding: '0.5rem 1rem',
              borderRadius: '2rem',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            {grade}th Grade
          </motion.span>
        </div>

        <div style={{
          display: 'flex',
          gap: '1.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: colors.primary
          }}>
            <ThumbsUp size={18} />
            <span style={{ fontWeight: '500' }}>{likes}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: colors.green
          }}>
            <Users size={18} />
            <span style={{ fontWeight: '500' }}>{students}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default MostEnrolledCourses;