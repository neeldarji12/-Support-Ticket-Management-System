export const STATUS_LIST = ['Open', 'In Progress', 'Resolved', 'Closed'];
export const PRIORITY_LIST = ['Low', 'Medium', 'High'];

export const STATUS_CONFIG = {
  Open: {
    label: 'Open',
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
    badgeClass: 'badge-status-open',
  },
  'In Progress': {
    label: 'In Progress',
    color: '#b45309',
    bg: '#fffbeb',
    border: '#fde68a',
    badgeClass: 'badge-status-progress',
  },
  Resolved: {
    label: 'Resolved',
    color: '#047857',
    bg: '#ecfdf5',
    border: '#a7f3d0',
    badgeClass: 'badge-status-resolved',
  },
  Closed: {
    label: 'Closed',
    color: '#475569',
    bg: '#f8fafc',
    border: '#cbd5e1',
    badgeClass: 'badge-status-closed',
  },
};

export const PRIORITY_CONFIG = {
  High: {
    label: 'High',
    color: '#b91c1c',
    bg: '#fef2f2',
    border: '#fecaca',
    badgeClass: 'badge-priority-high',
  },
  Medium: {
    label: 'Medium',
    color: '#c2410c',
    bg: '#fff7ed',
    border: '#fed7aa',
    badgeClass: 'badge-priority-medium',
  },
  Low: {
    label: 'Low',
    color: '#0f766e',
    bg: '#f0fdfa',
    border: '#99f6e4',
    badgeClass: 'badge-priority-low',
  },
};

export const formatDate = (isoString) => {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return isoString;
  }
};

export const formatDateShort = (isoString) => {
  if (!isoString) return '—';
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(d);
  } catch {
    return isoString;
  }
};
