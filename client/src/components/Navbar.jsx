import React from 'react';

export default function Navbar({ currentPage, setCurrentPage }) {
  const navItems = ['home', 'about', 'services', 'products', 'contact'];

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#0f5132' }}>
        HealthGuard Pharma
      </div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setCurrentPage(item)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: currentPage === item ? 'bold' : 'normal',
              color: currentPage === item ? '#0f5132' : '#495057',
              padding: '0.25rem 0.5rem',
              borderRadius: '4px'
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
