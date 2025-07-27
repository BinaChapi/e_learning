import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, UserCog, ChevronRight } from 'lucide-react';
import { hp } from '../utils/responsivescreen';

function OverviewCard({ Icon, stroke, no, text, onClick }) {
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
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
      onClick={onClick}
      style={{
        border: `2px solid ${stroke}`,
        width: hp(38),
        borderRadius: '1rem',
        padding: '0.5rem',
        cursor: 'pointer',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.div
          whileHover={{ rotate: 15 }}
          style={{
            backgroundColor: `${stroke}15`,
            padding: '0.75rem',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {getIcon(Icon)}
        </motion.div>
        
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: 0,
              fontSize: '1.5rem',
              fontWeight: '600',
              color: '#2d3748'
            }}
          >
            {no}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: 0,
              color: '#718096',
              fontSize: '0.875rem'
            }}
          >
            {text}
          </motion.p>
        </div>
      </div>

      <div
        style={{
          height: '1px',
          backgroundColor: `${stroke}30`,
          margin: '0.5rem 0'
        }}
      />

      <motion.div
        whileHover={{ x: 5 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: stroke
        }}
      >
        <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
          See Details
        </span>
        <ChevronRight size={20} />
      </motion.div>
    </motion.div>
  );
}

export default OverviewCard;