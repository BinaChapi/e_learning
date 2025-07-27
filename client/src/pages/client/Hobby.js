import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../../layouts/AuthLayout';
import { hp, wp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';

function Hobby() {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedHobbies, setSelectedHobbies] = useState([]);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  const handleHobbySelect = (hobby) => {
    setSelectedHobbies((prevSelected) =>
      prevSelected.includes(hobby)
        ? prevSelected.filter((item) => item !== hobby)
        : [...prevSelected, hobby]
    );
  };

  const handleSave = () => {
    console.log('grade:', selectedGrade);
    console.log('hobbies:', selectedHobbies);
  };

  const handleCancel = () => {
    setSelectedGrade(null);
    setSelectedHobbies([]);
  };

  const grades = ['9', '10', '11', '12', 'Other'];
  const hobbies = [
    'FX Marketing', 'Food Making', 'Photography', 'Art', 'Music',
    'CyberSecurity', 'Language', 'Personal Development', 'Programming'
  ];

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          width: wp(45),
          backgroundColor: colors.card,
          borderRadius: 20,
          padding: '30px',
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Grade Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 style={{
            fontSize: hp(2.5),
            marginBottom: '20px',
            color: colors.text || '#2D3748',
            textAlign: 'center'
          }}>
            What grade are you in?
          </h1>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            {grades.map((grade, index) => (
              <motion.button
                key={grade}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  delay: index * 0.1
                }}
                onClick={() => handleGradeSelect(grade)}
                style={{
                  padding: '12px 25px',
                  fontSize: '1.1rem',
                  border: `2px solid ${colors.stroke}`,
                  borderRadius: '12px',
                  backgroundColor: selectedGrade === grade ? colors.lightblue : 'transparent',
                  color: selectedGrade === grade ? 'white' : colors.text,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  fontWeight: selectedGrade === grade ? '600' : '400'
                }}
              >
                {grade}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Hobbies Selection */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h1 style={{
            fontSize: hp(2.5),
            marginBottom: '20px',
            color: colors.text || '#2D3748',
            textAlign: 'center'
          }}>
            Select your hobbies
          </h1>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px',
            justifyContent: 'center'
          }}>
            {hobbies.map((hobby, index) => (
              <motion.button
                key={hobby}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  delay: 0.5 + index * 0.1
                }}
                onClick={() => handleHobbySelect(hobby)}
                style={{
                  padding: '12px 20px',
                  fontSize: '1rem',
                  border: `2px solid ${colors.stroke}`,
                  borderRadius: '12px',
                  backgroundColor: selectedHobbies.includes(hobby) ? colors.lightblue : 'transparent',
                  color: selectedHobbies.includes(hobby) ? 'white' : colors.text,
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  fontWeight: selectedHobbies.includes(hobby) ? '600' : '400'
                }}
              >
                {hobby}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '20px'
          }}
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCancel}
            style={{
              padding: '12px 30px',
              fontSize: '1rem',
              backgroundColor: 'transparent',
              color: colors.primary,
              border: `2px solid ${colors.primary}`,
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            style={{
              padding: '12px 40px',
              fontSize: '1rem',
              backgroundColor: colors.primary,
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
            }}
          >
            Save
          </motion.button>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
}

export default Hobby;