import React, { useState } from 'react'
import { data } from '../assets/data/data'
import { hp } from '../utils/responsivescreen'
import colors from '../styles/colors'
import { Heart } from 'lucide-react'

function RecommendedForYouCard({index, item}) {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
      setLiked(!liked);
    };

    return (
        <div 
            id={index} 
            className="recommended-card"
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: hp(2),
                backgroundColor: colors.card,
                borderRadius: hp(2.5),
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                ':hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)'
                }
            }}
        >
            <img 
                src={item.img} 
                alt={item.header} 
                style={{
                    width: '100%',
                    height: hp(20),
                    objectFit: 'cover',
                    borderRadius: hp(1.5),
                    marginBottom: hp(1.5)
                }}
            />
            <div style={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: hp(1)
            }}>
                <h4 style={{ 
                    margin: 0,
                    fontSize: hp(2),
                    color: colors.text,
                    fontWeight: '600'
                }}>{item.header}</h4>
                {item.grade && 
                    <span style={{ 
                        backgroundColor: colors.primary,
                        color: colors.card,
                        padding: `${hp(0.5)}px ${hp(1)}px`,
                        borderRadius: hp(0.8),
                        fontSize: hp(1.6),
                        fontWeight: '500'
                    }}>
                        {item.grade}th
                    </span>
                }
            </div>
            
            <p style={{ 
                margin: `${hp(0.5)}px 0`,
                fontSize: hp(1.8),
                color: colors.text,
                lineHeight: '1.4'
            }}>
                {item.sub} 
                <span style={{ 
                    color: '#6C757D',
                    fontSize: hp(1.6),
                    marginLeft: hp(0.5)
                }}>
                    {item.desc}
                </span>
            </p>

            <div style={{ 
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto',
                paddingTop: hp(1)
            }}>
                <div style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: hp(1)
                }}>
                    <button 
                        onClick={handleLikeClick}
                        style={{ 
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: hp(0.5),
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.2s ease'
                        }}
                    >
                        <Heart
                            size={hp(3)}
                            fill={liked ? colors.primary : 'none'}
                            color={liked ? colors.primary : colors.text}
                            strokeWidth={2}
                        />
                    </button>
                    <span style={{ 
                        fontSize: hp(1.8),
                        color: colors.text,
                        fontWeight: '500'
                    }}>
                        {item.likes}
                    </span>
                </div>
                
                <button style={{
                    cursor: 'pointer',
                    fontSize: hp(2.2),
                    backgroundColor: colors.primary,
                    borderRadius: hp(1),
                    width: hp(16),
                    height: hp(5),
                    border: 'none',
                    color: colors.card,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    ':hover': {
                        transform: 'scale(1.05)',
                        backgroundColor: `${colors.primary}ee`
                    }
                }}>
                    +
                </button>
            </div>
        </div>
    )
}

export default RecommendedForYouCard
