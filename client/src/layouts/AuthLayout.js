import React from 'react';

function AuthLayout({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9fafc',
        padding: '2rem',
      }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
