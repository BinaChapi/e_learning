import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, ChevronLeft, Search, Bell } from 'lucide-react';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';

function AdminHeader({ showBackInHeader }) {
  const location = useLocation();
  const navigate = useNavigate();

  const isCourseDetailsPage = location.pathname.startsWith('/courses/');
  const isSpecialAdminPage = location.pathname.startsWith('/special-admin-page');
  const isAddVideoPage = showBackInHeader || location.pathname.startsWith('/add-video');
  const isAddChapterPage = showBackInHeader || location.pathname.startsWith('/chapters/add-chapter');
  
  
  const handleClick = () => {
    if (isCourseDetailsPage) {
      navigate('/course');
    } else if (isSpecialAdminPage) {
      navigate('/dashboard');
    } else if (isAddVideoPage || isAddChapterPage) {
      navigate(-1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '15px 24px',
        backgroundColor: colors.card,
        borderBottom: `1px solid ${colors.border}20`
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: hp(2) }}>
        {(isCourseDetailsPage || isSpecialAdminPage || isAddVideoPage || isAddChapterPage) ? (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            <ChevronLeft size={hp(3)} color={colors.text} />
          </motion.div>
        ) : (
          <Menu size={hp(3)} color={colors.text} />
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: hp(3) }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: hp(1),
            padding: `${hp(1)}px ${hp(2)}px`,
            backgroundColor: colors.bg,
            borderRadius: hp(1),
            cursor: 'pointer'
          }}
        >
          <Search size={hp(2)} color={colors.textSecondary} />
          <input
            placeholder="Search..."
            style={{
              border: 'none',
              background: 'none',
              outline: 'none',
              color: colors.text,
              fontSize: hp(1.6)
            }}
          />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{ 
            position: 'relative',
            cursor: 'pointer' 
          }}
        >
          <Bell size={hp(2.5)} color={colors.text} />
          <span style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: colors.primary,
            width: 8,
            height: 8,
            borderRadius: '50%'
          }} />
        </motion.div>
      </div>
    </motion.div>
  );
}

export default AdminHeader;
