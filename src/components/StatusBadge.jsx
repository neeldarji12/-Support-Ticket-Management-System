import React from 'react';

export const StatusBadge = ({ status }) => {
  let badgeStyle = {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
  };

  if (status === 'Open') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#e0f2fe', color: '#0369a1' };
  } else if (status === 'In Progress') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#fef3c7', color: '#b45309' };
  } else if (status === 'Resolved') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#dcfce7', color: '#15803d' };
  } else if (status === 'Closed') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#f1f5f9', color: '#475569' };
  }

  return <span style={badgeStyle}>{status}</span>;
};

export default StatusBadge;
