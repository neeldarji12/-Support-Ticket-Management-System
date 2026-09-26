import React from 'react';

export const PriorityBadge = ({ priority }) => {
  let badgeStyle = {
    padding: '3px 8px',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    display: 'inline-block',
  };

  if (priority === 'High') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#fee2e2', color: '#b91c1c' };
  } else if (priority === 'Medium') {
    badgeStyle = { ...badgeStyle, backgroundColor: '#ffedd5', color: '#c2410c' };
  } else {
    badgeStyle = { ...badgeStyle, backgroundColor: '#f0fdf4', color: '#166534' };
  }

  return <span style={badgeStyle}>{priority}</span>;
};

export default PriorityBadge;
