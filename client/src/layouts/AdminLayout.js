import React from 'react';
import Sidebar from '../components/Sidebar';
import colors from '../styles/colors';
import AdminHeader from '../components/AdminHeader';
import { motion } from 'framer-motion';

const AdminLayout = ({ children, showBackInHeader }) => {
  return (
    <div style={{ 
      display: 'flex', 
      backgroundColor: colors.bg, 
      height: '100vh', 
      overflow: 'hidden'
    }}>
      <Sidebar />
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        style={{ 
          marginLeft: '250px', 
          width: 'calc(100% - 250px)', 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column'
        }}
      >
        <div style={{ 
          position: 'fixed', 
          width: 'calc(100% - 250px)', 
          top: 0, 
          left: 250, 
          zIndex: 1000,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)'
        }}>
          <AdminHeader showBackInHeader={showBackInHeader} />
        </div>
        <motion.div 
          style={{ 
            marginTop: 50, 
            overflowY: 'auto', 
            flex: 1,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AdminLayout;