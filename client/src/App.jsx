import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Services from './components/Services';
import Products from './components/Products';
import Contact from './components/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About />;
      case 'services':
        return <Services />;
      case 'products':
        return <Products />;
      case 'contact':
        return <Contact />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main style={{ flex: 1, backgroundColor: '#ffffff' }}>
        {renderPage()}
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '1.5rem',
        borderTop: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        color: '#6c757d',
        fontSize: '0.9rem'
      }}>
        &copy; {new Date().getFullYear()} HealthGuard Pharmaceuticals. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
