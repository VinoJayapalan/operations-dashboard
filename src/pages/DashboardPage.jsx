import React from 'react';
import StatusBadge from '../components/StatusBadge';
import { mockSystems, mockAlerts } from '../data/mockDashboard';
import { formatTimestamp } from '../utils';

const tableStyle = {
  width: '100%', borderCollapse: 'collapse', marginBottom: '32px',
};
const thStyle = {
  textAlign: 'left', padding: '8px 12px',
  borderBottom: '1px solid #1e3a5f', color: '#90caf9', fontWeight: 600,
};
const tdStyle = {
  padding: '8px 12px', borderBottom: '1px solid #1a2a3a',
};
const sectionTitle = {
  fontSize: '15px', fontWeight: 700, color: '#90caf9',
  marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px',
};

export default function DashboardPage() {
  return (
    <div>
      <div style={sectionTitle}>System Status</div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>System</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {mockSystems.map((sys) => (
            <tr key={sys.id}>
              <td style={tdStyle}>{sys.name}</td>
              <td style={tdStyle}><StatusBadge status={sys.status} /></td>
              <td style={tdStyle}>{formatTimestamp(sys.lastChecked)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={sectionTitle}>Active Alerts</div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Severity</th>
            <th style={thStyle}>Message</th>
            <th style={thStyle}>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {mockAlerts.map((alert) => (
            <tr key={alert.id}>
              <td style={tdStyle}><StatusBadge status={alert.severity} /></td>
              <td style={tdStyle}>{alert.message}</td>
              <td style={tdStyle}>{formatTimestamp(alert.timestamp)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
