import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import StudentsCard from '../../components/StudentsCard';
import colors from '../../styles/colors';
import PasswordModal from '../../components/PasswordModal';

function Students() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = (password) => {
    if (password === 'admin123') {
      setIsModalOpen(false);
    } else {
      alert('Incorrect password');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const courses = [
    { subject: "Biology", no: 10 },
    { subject: "Math", no: 10 },
    { subject: "History", no: 10 },
    { subject: "Chemistry", no: 10 },
    { subject: "Physics", no: 10 },
    { subject: "Sport", no: 10 },
    { subject: "Art", no: 10 }
  ];

  return (
    <AdminLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ 
          padding: '32px',
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
        }}
      >
        <motion.div
          variants={cardVariants}
          style={{
            marginBottom: '32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <h1 style={{ 
            margin: 0,
            fontSize: '32px',
            fontWeight: '700',
            color: '#1e293b'
          }}>
            Formal Courses
          </h1>
        </motion.div>

        <motion.div
          variants={containerVariants}
          style={{ 
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1400px',
            margin: '0 auto'
          }}
        >
          {courses.map((course, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }}
            >
              <StudentsCard
                stroke={colors.strokes.four}
                no={course.no}
                subject={course.subject}
                Icon="user"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <PasswordModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onSubmit={handlePasswordSubmit}
      />
    </AdminLayout>
  );
}

export default Students;