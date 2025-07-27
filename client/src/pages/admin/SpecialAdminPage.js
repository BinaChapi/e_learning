import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminLayout from '../../layouts/AdminLayout';
import AdminsCard from '../../components/AdminsCard';
import profile from '../../assets/images/Profile.png';
import colors from '../../styles/colors';
import { hp } from '../../utils/responsivescreen';

function SpecialAdminPage() {
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const adminsData = [
    { "fname": "Admin 1", "lname": "Doe", "email": "admin1@gmail.com" },
    { "fname": "Admin 2", "lname": "Doe", "email": "admin2@gmail.com" },
    { "fname": "Admin 3", "lname": "Doe", "email": "admin3@gmail.com" },
    { "fname": "Admin 4", "lname": "Doe", "email": "admin4@gmail.com" },
    { "fname": "Admin 5", "lname": "Doe", "email": "admin5@gmail.com" },
    { "fname": "Admin 6", "lname": "Doe", "email": "admin6@gmail.com" },
    { "fname": "Admin 7", "lname": "Doe", "email": "admin7@gmail.com" },
    { "fname": "Admin 8", "lname": "Doe", "email": "admin8@gmail.com" },
    { "fname": "Admin 9", "lname": "Doe", "email": "admin9@gmail.com" },
    { "fname": "Admin 10", "lname": "Doe", "email": "admin10@gmail.com" },
  ];
  const tableData = [
    { action: 'Add', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Add', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Add', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
    { action: 'Drop', course: 'Biology', chapter: 'Chapter 1', video: 3, when: '2024-06-25 / 12:38:35' },
  ];

  const handleCardClick = (admin) => {
    setSelectedAdmin(admin);
  };

  const handleDelete = () => {
    alert('Delete action triggered!');
  };

  return (
    <AdminLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          padding: '20px 25px',
        }}
      >
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: 'calc(100vh - 370px)',
            overflowX: 'auto',
            overflowY: 'hidden',
            gap: '25px',
            padding: '10px 5px',
            scrollbarWidth: 'thin',
            scrollbarColor: `${colors.lightblue} transparent`,
          }}
        >
          {adminsData.map((admin, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ flex: '0 0 auto' }}
            >
              <AdminsCard
                onClick={() => handleCardClick(admin)}
                fname={admin.fname}
                lname={admin.lname}
                email={admin.email}
                img={profile}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedAdmin && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              style={{
                marginTop: '30px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                overflow: 'hidden',
              }}
            >
              <div style={{
                padding: '20px 25px',
                borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                display: 'flex',
                gap: '20px',
                backgroundColor: colors.card,
              }}>
                {['Action', 'Course', 'Chapter', 'Video', 'When'].map((header, index) => (
                  <div
                    key={index}
                    style={{
                      flex: 1,
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: colors.text || '#2D3748',
                    }}
                  >
                    {header}
                  </div>
                ))}
              </div>

              <div style={{
                maxHeight: hp(40),
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: `${colors.lightblue} transparent`,
              }}>
                {tableData.map((row, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '16px 25px',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                      backgroundColor: index % 2 === 0 ? 'rgba(0, 0, 0, 0.01)' : 'transparent',
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                      <div style={{
                        width: '4px',
                        height: '16px',
                        backgroundColor: row.action === 'Add' ? '#10B981' : '#EF4444',
                        borderRadius: '2px',
                        marginRight: '12px',
                      }} />
                      <span style={{ color: row.action === 'Add' ? '#10B981' : '#EF4444' }}>
                        {row.action}
                      </span>
                    </div>
                    <div style={{ flex: 1 }}>{row.course}</div>
                    <div style={{ flex: 1 }}>{row.chapter}</div>
                    <div style={{ flex: 1 }}>{row.video}</div>
                    <div style={{ flex: 1 }}>{row.when}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style>
        {`
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: ${colors.lightblue};
            border-radius: 4px;
          }

          ::-webkit-scrollbar-track {
            background: transparent;
          }
        `}
      </style>
    </AdminLayout>
  );
}

export default SpecialAdminPage;