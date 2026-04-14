import { STATUS_COLORS } from '../constants';

/**
 * Returns the hex color associated with a given status string.
 */
export function getStatusColor(status = '') {
  return STATUS_COLORS[status.toUpperCase()] || STATUS_COLORS.UNKNOWN;
}

/**
 * Formats an ISO timestamp string to a human-readable local time.
 */
export function formatTimestamp(isoString) {
  if (!isoString) return '—';
  return new Date(isoString).toLocaleString();
}
