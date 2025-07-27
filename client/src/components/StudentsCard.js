import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserCog, ChevronRight } from 'lucide-react';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';

function StudentsCard({ Icon, stroke, no, subject }) {
  const getIcon = (iconName) => {
    const iconProps = {
      size: hp(4),
      color: stroke,
      strokeWidth: 2
    };

    switch (iconName) {
      case 'user':
        return <Users {...iconProps} />;
      case 'course':
        return <BookOpen {...iconProps} />;
      case 'admin':
        return <UserCog {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        border: `2px solid ${stroke}`,
        width: hp(38),
        borderRadius: '16px',
        backgroundColor: '#fff',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '10px'
      }}>
        <motion.div
          whileHover={{ rotate: 15 }}
          style={{
            backgroundColor: `${stroke}15`,
            padding: '12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon(Icon)}
        </motion.div>

        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            style={{ 
              margin: 0, 
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e293b',
              marginBottom: '4px'
            }}
          >
            {subject}
          </motion.h3>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ 
              color: colors.secondary,
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            {no} Students
          </motion.span>
        </div>
      </div>

      <div style={{ 
        width: '100%', 
        height: '2px', 
        background: `linear-gradient(to right, ${stroke}50, ${stroke}10)`,
        borderRadius: '1px'
      }} />

      <motion.div
        whileHover={{ x: 4 }}
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          color: stroke,
          fontWeight: '500'
        }}
      >
        <span style={{ fontSize: '14px' }}>See Details</span>
        <ChevronRight size={20} />
      </motion.div>
    </motion.div>
  );
}

export default StudentsCard;