export const mockSystems = [
  { id: 1, name: 'Flight Ops API',      status: 'OK',       lastChecked: '2025-07-10T08:00:00Z' },
  { id: 2, name: 'Ground Control Feed', status: 'WARNING',  lastChecked: '2025-07-10T07:55:00Z' },
  { id: 3, name: 'Crew Scheduling DB',  status: 'OK',       lastChecked: '2025-07-10T08:01:00Z' },
  { id: 4, name: 'Weather Service',     status: 'CRITICAL', lastChecked: '2025-07-10T07:50:00Z' },
  { id: 5, name: 'NOTAMs Integrator',   status: 'UNKNOWN',  lastChecked: '2025-07-10T07:45:00Z' },
];

export const mockAlerts = [
  { id: 1, severity: 'CRITICAL', message: 'Weather Service unreachable',         timestamp: '2025-07-10T07:50:00Z' },
  { id: 2, severity: 'WARNING',  message: 'Ground Control Feed latency elevated', timestamp: '2025-07-10T07:55:00Z' },
];
