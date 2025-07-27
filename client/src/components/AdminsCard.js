import React from 'react';
import { motion } from 'framer-motion';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';
import { Trash2 } from 'lucide-react';

function AdminsCard({img, fname, lname, email, onClick, onDelete}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        backgroundColor: colors.card,
        padding: '25px 20px',
        borderRadius: 16,
        width: hp(32),
        cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      }}
    >
      <motion.div
        className="content-wrapper"
        onClick={onClick}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          width: '100%',
        }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            position: 'relative',
            width: hp(12),
            height: hp(12),
            borderRadius: '50%',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          }}
        >
          <img
            src={img}
            alt="Profile"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </motion.div>
        
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ 
            margin: '0 0 4px 0',
            fontSize: '1.2rem',
            fontWeight: 600,
            color: colors.text || '#2D3748'
          }}>
            {fname} {lname}
          </h3>
          <p style={{ 
            margin: 0,
            fontSize: '0.95rem',
            color: colors.secondary || '#718096',
            fontWeight: 400
          }}>
            {email}
          </p>
        </div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        style={{
          marginTop: 15,
          border: 'none',
          backgroundColor: colors.error,
          color: '#fff',
          padding: '10px 0',
          width: '100%',
          borderRadius: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 8,
          fontSize: '0.95rem',
          fontWeight: 500,
          transition: 'background-color 0.2s ease',
        }}
        onClick={onDelete}
      >
        <Trash2 size={18} />
        <span>Remove Admin</span>
      </motion.button>
    </motion.div>
  );
}

export default AdminsCard;