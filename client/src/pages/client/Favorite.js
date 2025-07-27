import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { hp } from '../../utils/responsivescreen';
import colors from '../../styles/colors';
import { Bookmark, Clock, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import LoadingSpinner from '../../components/LoadingSpinner';

function Favorite() {
  const [isLoading, setIsLoading] = useState(false);
  const initialItems = [
    {
      id: 1,
      title: 'Introduction to Mathematics',
      description: 'Learn the fundamentals of mathematics with our comprehensive course',
      duration: '2h 30m',
      lessons: 12,
      image: require('../../assets/images/sport.png'),
      category: 'Mathematics',
      isFavorited: true
    },
    {
      id: 2,
      title: 'Advanced Physics Concepts',
      description: 'Explore advanced physics theories and practical applications',
      duration: '3h 45m',
      lessons: 15,
      image: require('../../assets/images/FX.png'),
      category: 'Physics',
      isFavorited: true
    },
    {
      id: 3,
      title: 'Chemistry Basics',
      description: 'Master the basics of chemistry through interactive lessons',
      duration: '2h 15m',
      lessons: 10,
      image: require('../../assets/images/Chemistry.png'),
      category: 'Chemistry',
      isFavorited: true
    }
  ];

  const [favoriteItems, setFavoriteItems] = useState(initialItems);

  const toggleFavorite = (id) => {
    const updatedItems = favoriteItems.map(item =>
      item.id === id ? { ...item, isFavorited: !item.isFavorited } : item
    );
    setFavoriteItems(updatedItems);
  };

  return (
    <MainLayout>
      <div style={{ padding: hp(4), maxWidth: '1400px', margin: '0 auto' }}>
      <LoadingSpinner isLoading={isLoading} />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: hp(2),
          marginBottom: hp(4)
        }}>
          <Bookmark size={hp(3.5)} color={colors.primary} />
          <h1 style={{
            fontSize: hp(3.5),
            color: colors.text,
            fontWeight: '600',
            margin: 0
          }}>Saved Items</h1>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: hp(3)
        }}>
          {favoriteItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{
                backgroundColor: colors.card,
                borderRadius: hp(2),
                overflow: 'hidden',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: `1px solid ${colors.border}30`,
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{
                position: 'relative',
                height: hp(20),
                overflow: 'hidden'
              }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />

                {/* Category Label */}
                <div style={{
                  position: 'absolute',
                  top: hp(2),
                  left: hp(2),
                  backgroundColor: colors.card,
                  padding: `${hp(0.8)}px ${hp(1.5)}px`,
                  borderRadius: hp(3),
                  fontSize: hp(1.4),
                  color: colors.text,
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                }}>
                  {item.category}
                </div>
              </div>

              <div style={{ padding: hp(2.5) }}>
                <h3 style={{
                  fontSize: hp(2.2),
                  color: colors.text,
                  marginBottom: hp(1.5),
                  fontWeight: '600'
                }}>{item.title}</h3>

                <p style={{
                  fontSize: hp(1.6),
                  color: colors.textSecondary,
                  marginBottom: hp(2),
                  lineHeight: 1.5
                }}>{item.description}</p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: hp(3),
                  color: colors.textSecondary,
                  fontSize: hp(1.5)
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: hp(1) }}>
                    <Clock size={hp(1.8)} />
                    {item.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: hp(1) }}>
                    <GraduationCap size={hp(1.8)} />
                    {item.lessons} Lessons
                  </div>
                </div>
              </div>
              {/* Bookmark Icon (top-right corner) */}
              <Bookmark
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.id);
                  }}
                  size={hp(2.5)}
                  color={item.isFavorited ? colors.primary : colors.textSecondary}
                  fill={item.isFavorited ? colors.primary : 'none'}
                  style={{
                    position: 'absolute',
                    bottom: hp(2),
                    right: hp(2),
                    cursor: 'pointer',
                    transition: 'color 0.2s'
                  }}
                />
            </motion.div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Favorite;
