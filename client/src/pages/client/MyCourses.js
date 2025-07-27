import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { myCourse } from '../../assets/data/Mycources';
import MyCourseCard from '../../components/MyCourseCard';
import MainLayout from '../../layouts/MainLayout';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import colors from '../../styles/colors';
import { hp } from '../../utils/responsivescreen';
import LoadingSpinner from '../../components/LoadingSpinner';

function MyCourses() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = (item) => {
    navigate(`/my-courses/${item.title}`, { state: { item } });
  };

  return (
    <MainLayout>
      <div style={{
        padding: `${hp(2)} ${hp(3)}`,
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <LoadingSpinner isLoading={isLoading} />
        {/* Header Section */}
        <div style={{
          marginBottom: hp(4)
        }}>
          <h1 style={{
            fontSize: hp(3),
            color: colors.text,
            marginBottom: hp(2)
          }}>My Learning Journey</h1>
          <p style={{
            fontSize: hp(1.8),
            color: colors.textSecondary,
            marginBottom: hp(3)
          }}>Track your progress and continue learning</p>

          {/* Search and Filter */}
          <div style={{
            display: 'flex',
            gap: hp(2),
            marginBottom: hp(3)
          }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: hp(1),
              padding: `${hp(1.5)} ${hp(2)}`,
              backgroundColor: colors.card,
              borderRadius: hp(1),
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <Search size={hp(2.5)} color={colors.textSecondary} />
              <input
                placeholder="Search your courses"
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  width: '100%',
                  fontSize: hp(1.8),
                  color: colors.text
                }}
              />
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: hp(1),
              padding: `${hp(1.5)} ${hp(2)}`,
              backgroundColor: colors.card,
              border: 'none',
              borderRadius: hp(1),
              cursor: 'pointer',
              color: colors.text,
              fontSize: hp(1.8),
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
            }}>
              <Filter size={hp(2.5)} />
              Filter
            </button>
          </div>
        </div>

        {/* Course Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: hp(3)
          }}
        >
          {myCourse.map((item, index) => (
            <MyCourseCard 
              key={index} 
              item={item} 
              onClick={() => handleCardClick(item)} 
            />
          ))}
        </motion.div>
      </div>
    </MainLayout>
  );
}

export default MyCourses;