import React from 'react';
import { APP_NAME } from '../constants';

const styles = {
  wrapper: { display: 'flex', flexDirection: 'column', minHeight: '100vh' },
  header: {
    background: '#0d2136',
    borderBottom: '2px solid #1565c0',
    padding: '12px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { fontSize: '18px', fontWeight: 700, color: '#90caf9', letterSpacing: '0.5px' },
  geolocation: { fontSize: '14px', color: '#90caf9', display: 'flex', alignItems: 'center', gap: '4px' },
  main: { flex: 1, padding: '24px' },
};

export default function MainLayout({ children }) {
  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <span style={styles.title}>{APP_NAME}</span>
        <span style={styles.geolocation}>📍 Location</span>
      </header>
      <main style={styles.main}>{children}</main>
    </div>
  );
}
