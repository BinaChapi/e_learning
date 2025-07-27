import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';
import { GraduationCap } from 'lucide-react';

function LoadingSpinner({ isLoading }) {
  // Prevent scrolling when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        pointerEvents: 'all',     // make sure this div catches all clicks
      }}
    >
      <motion.div
        style={{
          width: hp(13),
          height: hp(13),
          backgroundColor: colors.card,
          borderRadius: hp(2),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.4)',
          pointerEvents: 'none', // allow animation to work inside, but still block outside
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <GraduationCap size={hp(5)} color={colors.primary} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default LoadingSpinner;
