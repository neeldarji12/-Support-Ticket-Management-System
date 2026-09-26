import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, User, Calendar, ExternalLink } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDateShort } from '../utils/ticketUtils';

export const TicketTable = ({ tickets = [], users = [] }) => {
  const getUserName = (userId) => {
    if (!userId) return 'Unassigned';
    const user = users.find((u) => u.id === Number(userId));
    return user ? user.name : `User #${userId}`;
  };

  const getUserAvatar = (userId) => {
    if (!userId) return null;
    const user = users.find((u) => u.id === Number(userId));
    return user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'U');
  };

  if (tickets.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📋</div>
        <h4 className="empty-state-title">No tickets found</h4>
        <p className="empty-state-text">
          No support tickets match the selected filters or search query.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive-wrapper">
      <table className="custom-ticket-table">
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Created</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => {
            const assigneeName = getUserName(ticket.assigned_to);
            const avatarInitials = getUserAvatar(ticket.assigned_to);

            return (
              <tr key={ticket.id} className="ticket-table-row">
                <td className="ticket-id-cell">
                  <Link to={`/tickets/${ticket.id}`} className="ticket-id-link">
                    {ticket.ticket_id}
                  </Link>
                </td>
                <td className="ticket-subject-cell">
                  <Link to={`/tickets/${ticket.id}`} className="ticket-subject-link">
                    <span className="subject-title">{ticket.subject}</span>
                    <span className="subject-snippet">{ticket.description}</span>
                  </Link>
                </td>
                <td>
                  <PriorityBadge priority={ticket.priority} size="sm" />
                </td>
                <td>
                  <StatusBadge status={ticket.status} size="sm" />
                </td>
                <td>
                  <div className="assignee-pill">
                    {ticket.assigned_to ? (
                      <>
                        <span className="assignee-avatar">{avatarInitials}</span>
                        <span className="assignee-name">{assigneeName}</span>
                      </>
                    ) : (
                      <span className="unassigned-text">Unassigned</span>
                    )}
                  </div>
                </td>
                <td className="date-cell">
                  <div className="date-display">
                    <Calendar size={13} className="text-muted mr-1" />
                    <span>{formatDateShort(ticket.created_at)}</span>
                  </div>
                </td>
                <td className="text-center">
                  <Link
                    to={`/tickets/${ticket.id}`}
                    className="btn-action-view"
                    title="View Ticket Details"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TicketTable;
