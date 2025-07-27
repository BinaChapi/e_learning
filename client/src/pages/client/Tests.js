import React, { useState } from 'react';
import { OngoingTest } from '../../assets/data/OngoingTest';
import { hp } from '../../utils/responsivescreen';
import MainLayout from '../../layouts/MainLayout';
import colors from '../../styles/colors';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, AlertCircle, ChevronRight, BookOpen, Timer } from 'lucide-react';
import LoadingSpinner from '../../components/LoadingSpinner';

function Tests() {
  const [isLoading, setIsLoading] = useState(false);
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
      transition: { duration: 0.2 }
    }
  };

  const renderTestCard = (item, index, type) => (
    <motion.div
      key={index}
      variants={cardVariants}
      whileHover="hover"
      style={{
        width: '100%',
        height: hp(35),
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        backgroundColor: colors.card,
        borderRadius: hp(2.5),
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        border: `1px solid ${colors.border}30`
      }}
    >
      <div style={{
        position: 'relative',
        height: '65%',
        overflow: 'hidden'
      }}>
        <img 
          src={item.img} 
          alt={item.title} 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
          }} 
        />
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(rgba(0,0,0,0.2), ${colors.background}DD)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.3s ease'
        }}>
          <motion.div
            whileHover={{ scale: 1.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: hp(1),
              color: colors.card,
              padding: `${hp(1)}px ${hp(2)}px`,
              borderRadius: hp(3),
              backgroundColor: type === 'completed' ? colors.success : 
                             type === 'upcoming' ? colors.warning : 
                             colors.primary
            }}
          >
            {type === 'ongoing' && <Timer size={hp(2.5)} />}
            {type === 'completed' && <CheckCircle2 size={hp(2.5)} />}
            {type === 'upcoming' && <AlertCircle size={hp(2.5)} />}
            <span style={{ fontSize: hp(1.8) }}>
              {type === 'upcoming' ? 'Coming Soon' : 'View Details'}
            </span>
            <ChevronRight size={hp(2.5)} />
          </motion.div>
        </div>
      </div>

      <div style={{
        padding: hp(2.5),
        height: '35%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: colors.card
      }}>
        <div>
          <h4 style={{ 
            margin: 0,
            fontSize: hp(2.2),
            color: colors.text,
            marginBottom: hp(1)
          }}>{item.title}</h4>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: hp(2),
            color: colors.textSecondary
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: hp(0.5) }}>
              <BookOpen size={hp(1.8)} />
              <span style={{ fontSize: hp(1.6) }}>{item.AllQuestions} Questions</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: hp(0.5) }}>
              <Clock size={hp(1.8)} />
              <span style={{ fontSize: hp(1.6) }}>45 mins</span>
            </div>
          </div>
        </div>

        {type !== 'upcoming' && (
          <div style={{
            width: '100%',
            height: hp(1),
            backgroundColor: `${colors.border}30`,
            borderRadius: hp(0.5),
            overflow: 'hidden'
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(item.Completed/item.AllQuestions) * 100}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              style={{
                height: '100%',
                backgroundColor: type === 'completed' ? colors.success : colors.primary,
                borderRadius: hp(0.5)
              }}
            />
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <MainLayout>
      <div style={{ 
        padding: hp(4),
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
      <LoadingSpinner isLoading={isLoading} />
        {['upcoming', 'ongoing', 'completed'].map((type) => (
          <motion.section
            key={type}
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
            style={{ marginBottom: hp(6) }}
          >
            <h2 style={{ 
              fontSize: hp(3),
              marginBottom: hp(3),
              color: colors.text,
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: hp(1)
            }}>
              {type === 'ongoing' && <Clock size={hp(2.8)} />}
              {type === 'completed' && <CheckCircle2 size={hp(2.8)} color={colors.success} />}
              {type === 'upcoming' && <AlertCircle size={hp(2.8)} color={colors.warning} />}
              {type.charAt(0).toUpperCase() + type.slice(1)} Tests
            </h2>
            <div style={{
              display: 'flex',
              overflowX: 'auto',
              gap: hp(3),
              padding: `${hp(1)}px 0`,
              scrollSnapType: 'x mandatory',
              '::-webkit-scrollbar': {
                height: hp(1)
              },
              '::-webkit-scrollbar-track': {
                background: `${colors.border}30`,
                borderRadius: hp(0.5)
              },
              '::-webkit-scrollbar-thumb': {
                background: colors.primary,
                borderRadius: hp(0.5)
              }
            }}>
              {OngoingTest.map((item, index) => (
                <div style={{
                  flex: `0 0 ${hp(40)}px`,
                  scrollSnapAlign: 'start'
                }}>
                  {renderTestCard(item, index, type)}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </MainLayout>
  );
}

export default Tests;