import React from 'react'

function MainLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: '2rem',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {children}
    </div>
  )
}

export default MainLayout
