import React from 'react';
import { getStatusColor } from '../utils';

export default function StatusBadge({ status = 'UNKNOWN' }) {
  const color = getStatusColor(status);
  const style = {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    background: color,
    color: '#fff',
  };
  return <span style={style}>{status}</span>;
}
