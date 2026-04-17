import React, { useState, useEffect } from 'react';
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
  mapContainer: { width: '220px', height: '120px', borderRadius: '6px', overflow: 'hidden', border: '1px solid #1e3a5f' },
  main: { flex: 1, padding: '24px' },
};

export default function MainLayout({ children }) {
  const [center, setCenter] = useState({ lat: 40.7128, lng: -74.0060 });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => {}
      );
    }
  }, []);

  const mapSrc = `https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${center.lat},${center.lng}&zoom=12`;

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <span style={styles.title}>{APP_NAME}</span>
        <div style={styles.mapContainer}>
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            title="Location Map"
            allowFullScreen
          />
        </div>
      </header>
      <main style={styles.main}>{children}</main>
    </div>
  );
}
