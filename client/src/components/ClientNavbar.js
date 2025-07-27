import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hp } from '../utils/responsivescreen';
import { Bell, Search as SearchIcon, Settings, LogOut } from 'lucide-react';
import profile from '../assets/images/Profile.png';
import colors from '../styles/colors';

// Modal Component
const Modal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        backgroundColor: colors.card,
        padding: hp(3),
        borderRadius: hp(2),
        width: hp(40),
        textAlign: 'center',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transform: 'translateY(0)',
        animation: 'modalSlideIn 0.3s ease-out',
      }}>
        <h4 style={{ 
          fontSize: hp(2.2),
          marginBottom: hp(3),
          color: colors.text
        }}>Are you sure you want to logout?</h4>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: hp(2),
        }}>
          <button onClick={onConfirm} style={{
            backgroundColor: colors.primary,
            color: colors.card,
            padding: `${hp(1.5)}px ${hp(3)}px`,
            border: 'none',
            borderRadius: hp(1),
            cursor: 'pointer',
            fontSize: hp(1.8),
            fontWeight: '500',
            transition: 'transform 0.2s, background-color 0.2s',
            ':hover': {
              transform: 'translateY(-1px)',
              backgroundColor: `${colors.primary}dd`
            }
          }}>Logout</button>
          <button onClick={onCancel} style={{
            backgroundColor: `${colors.border}20`,
            color: colors.text,
            padding: `${hp(1.5)}px ${hp(3)}px`,
            border: 'none',
            borderRadius: hp(1),
            cursor: 'pointer',
            fontSize: hp(1.8),
            fontWeight: '500',
            transition: 'transform 0.2s, background-color 0.2s',
            ':hover': {
              transform: 'translateY(-1px)',
              backgroundColor: `${colors.border}30`
            }
          }}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

function ClientNavbar() {
  const { logout } = useAuth();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const linkStyle = {
    textDecoration: 'none',
    color: colors.textSecondary,
    fontWeight: '500',
    fontSize: hp(2),
    padding: `${hp(1.5)}px ${hp(2.5)}px`,
    borderRadius: hp(1),
    transition: 'all 0.3s ease',
    position: 'relative',
    ':hover': {
      backgroundColor: `${colors.primary}10`,
      color: colors.primary
    }
  };

  const activeLinkStyle = {
    color: colors.primary,
    backgroundColor: `${colors.primary}10`,
    fontWeight: '600',
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: '-2px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '30%',
      height: '3px',
      backgroundColor: colors.primary,
      borderRadius: '2px'
    }
  };

  const dropdownStyle = {
    position: 'absolute',
    top: hp(6),
    right: 0,
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}30`,
    borderRadius: hp(1.5),
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: hp(1),
    zIndex: 1000,
    display: isDropdownVisible ? 'flex' : 'none',
    minWidth: hp(20),
    transform: isDropdownVisible ? 'translateY(0)' : 'translateY(-10px)',
    opacity: isDropdownVisible ? 1 : 0,
    transition: 'all 0.2s ease-in-out'
  };

  const iconContainerStyle = {
    width: hp(4.5),
    height: hp(4.5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: `${colors.border}20`
    }
  };

  const dropdownItemStyle = {
    padding: '8px 12px',
    cursor: 'pointer',
    color: '#333',
    textDecoration: 'none',
    flexDirection:'row',
    gap:5,
    display: 'flex',
    borderRadius: '4px',
    marginBottom: '5px',
  };

  const dropdownItemHoverStyle = {
    backgroundColor: '#f8f9fa',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false); // Close the dropdown
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setModalOpen(true);
    setDropdownVisible(false); // Close the dropdown
  };

  const handleConfirmLogout = () => {
    logout();
    setModalOpen(false);
  };

  const handleCancelLogout = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: `${hp(2)}px ${hp(4)}px`,
        backgroundColor: colors.card,
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: hp(8), margin: '0 auto', maxWidth: '1200px', width: '100%' }}>
          <img src="/Class.png" alt="Logo" style={{ height: hp(4) }} />
          <nav style={{ display: 'flex', gap: hp(2), flex: 1, justifyContent: 'center' }}>
            <NavLink to="/homepage" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Home</NavLink>
            <NavLink to="/my-courses" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>My Courses</NavLink>
            <NavLink to="/tests" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Tests</NavLink>
            <NavLink to="/progress" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Progress</NavLink>
            <NavLink to="/favorite" style={({ isActive }) => ({ ...linkStyle, ...(isActive ? activeLinkStyle : {}) })}>Favorite</NavLink>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: hp(2) }}>
            <div style={iconContainerStyle}>
              <SearchIcon size={hp(2.5)} style={{ color: colors.textSecondary }} />
            </div>
            
            <div style={{ ...iconContainerStyle, position: 'relative' }}>
              <Bell size={hp(2.5)} style={{ color: colors.textSecondary }} />
              <div style={{ 
                position: 'absolute',
                top: hp(1),
                right: hp(1),
                width: hp(1),
                height: hp(1),
                backgroundColor: colors.primary,
                borderRadius: '50%',
                border: `2px solid ${colors.card}`
              }}></div>
            </div>

            <div style={{ 
              width: hp(0.1), 
              height: hp(3), 
              backgroundColor: `${colors.border}40`,
              margin: `0 ${hp(1)}px`
            }} />

            <img 
              src={profile} 
              alt="profile" 
              style={{ 
                width: hp(4),
                height: hp(4),
                borderRadius: '50%',
                cursor: 'pointer',
                border: `2px solid ${colors.border}30`,
                transition: 'transform 0.2s ease',
                ':hover': {
                  transform: 'scale(1.05)'
                }
              }} 
            />

            <div style={{ position: 'relative' }} ref={dropdownRef}>
              <div 
                style={iconContainerStyle}
                onClick={() => setDropdownVisible(!isDropdownVisible)}
              >
                <Settings size={hp(2.5)} style={{ color: colors.textSecondary }} />
              </div>

              <div style={dropdownStyle}>
                <div
                  style={{
                    padding: `${hp(1.5)}px ${hp(2)}px`,
                    borderRadius: hp(1),
                    display: 'flex',
                    alignItems: 'center',
                    gap: hp(1.5),
                    color: colors.error,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      backgroundColor: `${colors.error}10`
                    }
                  }}
                  onClick={handleLogout}
                >
                  <LogOut size={hp(2)} style={{ color: 'currentColor' }} />
                  <span style={{ fontSize: hp(1.8) }}>Logout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      <style>
        {`
          @keyframes modalSlideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>
    </>
  );
}

export default ClientNavbar;
