import React, { useState } from 'react';
import Modal from 'react-modal';
import colors from '../styles/colors';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

Modal.setAppElement('#root');

function PasswordModal({ isOpen, onRequestClose, onSubmit }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={onRequestClose}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{
              position: 'fixed',
              left: '35%',
              top: '30%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '2.5rem',
              borderRadius: '1.25rem',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
              zIndex: 1001,
              width: '90%',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#f1f5f9' }}
              whileTap={{ scale: 0.95 }}
              onClick={onRequestClose}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={24} color="#64748b" />
            </motion.button>

            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              style={{ 
                margin: 0,
                color: colors.primary,
                fontSize: '1.5rem',
                fontWeight: '600',
                textAlign: 'center'
              }}
            >
              Enter Password
            </motion.h2>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div>
                <input
                  type="password"
                  value={password}
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '90%',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    border: `2px solid ${colors.stroke}`,
                    fontSize: '1rem',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                    backgroundColor: '#f8fafc'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = colors.primary;
                    e.target.style.backgroundColor = '#fff';
                    e.target.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = colors.stroke;
                    e.target.style.backgroundColor = '#f8fafc';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#0056b3' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                style={{
                  width: '100%',
                  padding: '1rem',
                  backgroundColor: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.2s ease'
                }}
              >
                Submit
              </motion.button>
            </motion.form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default PasswordModal;