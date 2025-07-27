import React from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './CustomeModel.css';
import colors from '../styles/colors';

Modal.setAppElement('#root');

const CustomModal = ({ isOpen, onRequestClose, children, style }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          className="custom-modal"
          overlayClassName="custom-modal-overlay"
        >
          <div className="modal-header" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onRequestClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign:'center',
                color: colors.text
              }}
            >
              <X size={24} />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={style}
          >
            {children}
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default CustomModal;