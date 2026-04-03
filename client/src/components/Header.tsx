import React from 'react';

const Header: React.FC = () => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <h1 style={styles.title}>🎯 ArbiHunt</h1>
        <p style={styles.subtitle}>Real-time Crypto Arbitrage Tracker</p>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#1a202c',
    color: '#fff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: 0
  },
  subtitle: {
    margin: 0,
    opacity: 0.8,
    fontSize: '0.9rem'
  }
};

export default Header;
