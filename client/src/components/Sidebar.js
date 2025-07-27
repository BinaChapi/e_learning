import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, LayoutDashboard, BookOpen, Users, LogOut } from 'lucide-react';
import { hp } from '../utils/responsivescreen';
import colors from '../styles/colors';
import { useAuth } from '../context/AuthContext';
import CustomModal from './CustomModel';

const Sidebar = () => {
  const { logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Courses', path: '/course' },
    { icon: Users, label: 'Students', path: '/students' }
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      style={{
        width: 250,
        height: '100vh',
        backgroundColor: colors.card,
        borderRight: `1px solid ${colors.border}20`,
        padding: '20px 0',
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ padding: '0 20px', marginBottom: 30 }}
        >
          <h1 style={{ 
            fontSize: hp(2.8),
            color: colors.primary,
            margin: 0,
            fontWeight: 700,
            letterSpacing: '-0.5px'
          }}>E-Learning</h1>
        </motion.div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <NavLink
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  padding: '14px 20px',
                  textDecoration: 'none',
                  color: isActive ? colors.primary : colors.text,
                  backgroundColor: isActive ? `${colors.primary}10` : 'transparent',
                  borderRight: isActive ? `3px solid ${colors.primary}` : 'none',
                  transition: 'all 0.3s ease',
                  borderRadius: '0 8px 8px 0',
                  margin: '0 8px 0 0'
                })}
              >
                <item.icon size={hp(2.2)} style={{ marginRight: 12 }} />
                <span style={{ fontSize: hp(1.8), fontWeight: 500 }}>{item.label}</span>
              </NavLink>
            </motion.div>
          ))}
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{ padding: '0 20px' }}
      >
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: `${colors.danger}20` }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsModalOpen(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '14px',
            marginBottom: hp(4),
            border: 'none',
            borderRadius: hp(1.2),
            backgroundColor: `${colors.danger}10`,
            color: colors.danger,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          <LogOut size={hp(2.2)} style={{ marginRight: 12 }} />
          <span style={{ fontSize: hp(1.8), fontWeight: 500 }}>Logout</span>
        </motion.button>
      </motion.div>
      <CustomModal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  style={{
    content: {
      width: '90%',
      maxWidth: '600px',
      margin: 'auto',
      padding: '32px 24px',
      borderRadius: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }
  }}
>
  <h2 style={{ 
    color: colors.text,
    fontSize: hp(2.2),
    marginBottom: hp(1.5),
    fontWeight: 600,
  }}>
    Confirm Logout
  </h2>

  <p style={{
    color: colors.textLight,
    fontSize: hp(1.8),
    marginBottom: hp(3),
    maxWidth: '80%',
  }}>
    Are you sure you want to logout?
  </p>

  <div style={{
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  }}>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={logout}
      style={{
        padding: '10px 24px',
        backgroundColor: colors.error,
        color: colors.card,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: hp(1.8),
        fontWeight: 500
      }}
    >
      Confirm
    </motion.button>

    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsModalOpen(false)}
      style={{
        padding: '10px 24px',
        backgroundColor: colors.border,
        color: colors.text,
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: hp(1.8),
        fontWeight: 500
      }}
    >
      Cancel
    </motion.button>
  </div>
</CustomModal>

    </motion.div>
  );
};

export default Sidebar;