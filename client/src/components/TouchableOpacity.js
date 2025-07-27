import React from 'react';
import './TouchableOpacity.css'; // Import custom styles

const TouchableOpacity = ({ children, onClick, style }) => {
  return (
    <button className="touchable-opacity" onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default TouchableOpacity;