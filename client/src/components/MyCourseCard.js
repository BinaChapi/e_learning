import React, { useState } from 'react';
import { hp, wp } from '../utils/responsivescreen';
import colors from '../styles/colors';
import { Heart, Play, BookOpen } from 'lucide-react';

function MyCourseCard({ item, index, onClick }) {
  const [liked, setLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setLiked(!liked);
  };

  return (
    <div
      className="course-card"
      style={{
        padding: hp(2),
        borderRadius: hp(2),
        backgroundColor: colors.card,
        boxShadow: isHovered ? '0 8px 16px rgba(0, 0, 0, 0.1)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
        marginBottom: hp(2)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <h3 style={{ 
        fontSize: hp(2.2),
        marginBottom: hp(1.5),
        color: colors.text
      }}>{item.title}</h3>

      <div style={{ 
        position: 'relative',
        marginBottom: hp(2)
      }}>
        <img 
          src={item.img}
          alt={item.title}
          style={{
            width: '100%',
            height: hp(30),
            objectFit: 'cover',
            borderRadius: hp(1.5),
            transition: 'transform 0.3s ease'
          }}
        />
        
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: `${colors.primary}cc`,
          borderRadius: '50%',
          padding: hp(2),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          opacity: isHovered ? 1 : 0.8,
          scale: isHovered ? 1.1 : 1
        }}>
          <Play 
            size={hp(4)} 
            color={colors.card}
            fill={colors.card}
          />
        </div>

        <div style={{
          position: 'absolute',
          bottom: hp(2),
          left: hp(2),
          right: hp(2),
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: colors.card,
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: hp(1),
            // backgroundColor: 'rgba(0, 0, 0, 0.6)',
            padding: `${hp(0.5)} ${hp(1)}`,
            borderRadius: hp(1)
          }}>
            <BookOpen size={hp(2)} />
            <span style={{ fontSize: hp(1.6) }}>
              {item.lessons.filter(lesson => lesson.finished).length}/{item.lessons.length} Lessons
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: hp(2) }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          marginBottom: hp(1)
        }}>
          <span style={{ 
            fontSize: hp(1.8),
            color: colors.text
          }}>{item.donePercentage}% Complete</span>
          <span style={{ 
            fontSize: hp(1.8),
            color: colors.textSecondary
          }}>{item.lessons.filter(lesson => lesson.finished).length} of {item.lessons.length}</span>
        </div>
        <div style={{ 
          height: hp(1),
          backgroundColor: `${colors.primary}20`,
          borderRadius: hp(0.5),
          overflow: 'hidden'
        }}>
          <div style={{ 
            width: `${item.donePercentage}%`,
            height: '100%',
            backgroundColor: colors.success,
            borderRadius: hp(0.5),
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      <div style={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button 
          onClick={handleLikeClick}
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: hp(1),
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: liked ? colors.primary : colors.textSecondary,
            transition: 'all 0.2s ease'
          }}
        >
          <Heart
            size={hp(2.5)}
            fill={liked ? colors.primary : 'none'}
          />
          <span style={{ fontSize: hp(1.8) }}>{item.NoLikes}</span>
        </button>

        <div style={{
          backgroundColor: `${colors.success}15`,
          color: colors.success,
          padding: `${hp(0.5)} ${hp(1)}`,
          borderRadius: hp(0.8),
          fontSize: hp(1.6)
        }}>
          In Progress
        </div>
      </div>
    </div>
  );
}

export default MyCourseCard;