import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import OverviewCard from '../../components/OverviewCard';
import colors from '../../styles/colors';
import MostEnrolledCourses from '../../components/MostEnrolledCourses';
import Biology from '../../assets/images/Biology.png';
import Chemistry from '../../assets/images/Chemistry.png';
import PasswordModal from '../../components/PasswordModal';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuth();
  const username = user.user.username;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/${username}`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  const handleAdminCardClick = () => {
    setIsModalOpen(true);
  };

  const handlePasswordSubmit = async (password) => {
    try {
      const response = await fetch('http://localhost:3000/api/verify-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.isMatch) {
        setIsModalOpen(false);
        navigate('/special-admin-page');
      } else {
        alert('Incorrect password');
      }
    } catch (error) {
      console.error('Error verifying password:', error);
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <AdminLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{
          height: 'calc(100vh - 100px)',
          overflowY: 'auto',
          padding: '2rem',
        }}
      >
        <motion.h2
          variants={itemVariants}
          style={{
            color: '#1a202c',
            marginBottom: '2rem',
            fontSize: '1.875rem',
            fontWeight: '600'
          }}
        >
          Overview
        </motion.h2>

        <motion.div
          variants={containerVariants}
          style={{
            display: 'flex',
            flexDirection:'row',
            gap:40,
            marginBottom: '3rem'
          }}
        >
          <motion.div variants={itemVariants}>
            <OverviewCard
              Icon="user"
              no={10}
              text="Total Users"
              stroke={colors.strokes.one}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <OverviewCard
              Icon="course"
              no={26}
              text="Total Courses"
              stroke={colors.strokes.four}
            />
          </motion.div>

          {userData?.special && (
            <motion.div variants={itemVariants}>
              <OverviewCard
                Icon="admin"
                no={3}
                text="Total Admins"
                stroke={colors.strokes.three}
                onClick={handleAdminCardClick}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.h2
          variants={itemVariants}
          style={{
            color: '#1a202c',
            marginBottom: '2rem',
            fontSize: '1.875rem',
            fontWeight: '600'
          }}
        >
          Most Enrolled Courses
        </motion.h2>

        <motion.div
          variants={containerVariants}
          style={{
            display: 'flex',
            flexDirection:'row',
            gap:20,
          }}
        >
          <motion.div variants={itemVariants}>
            <MostEnrolledCourses
              subject="Biology"
              grade={11}
              likes={10}
              students={28}
              img={Biology}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <MostEnrolledCourses
              subject="Chemistry"
              grade={10}
              likes={22}
              students={12}
              img={Chemistry}
            />
          </motion.div>
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

export default Dashboard;