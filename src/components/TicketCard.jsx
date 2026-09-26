import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge';
import PriorityBadge from './PriorityBadge';
import { formatDateShort } from '../utils/ticketUtils';

export const TicketCard = ({ ticket, users = [] }) => {
  const assignedUser = users.find((u) => u.id === Number(ticket.assigned_to));
  const createdUser = users.find((u) => u.id === Number(ticket.created_by));

  return (
    <div className="ticket-card">
      <div className="ticket-card-header">
        <span className="ticket-card-id">{ticket.ticket_id}</span>
        <div className="ticket-card-badges">
          <PriorityBadge priority={ticket.priority} size="sm" />
          <StatusBadge status={ticket.status} size="sm" />
        </div>
      </div>

      <Link to={`/tickets/${ticket.id}`} className="ticket-card-body">
        <h4 className="ticket-card-title">{ticket.subject}</h4>
        <p className="ticket-card-desc">{ticket.description}</p>
      </Link>

      <div className="ticket-card-footer">
        <div className="ticket-card-meta">
          <div className="meta-item">
            <span className="meta-label">Assigned:</span>
            <span className="meta-value">
              {assignedUser ? assignedUser.name : 'Unassigned'}
            </span>
          </div>
          <div className="meta-item">
            <Calendar size={13} className="text-muted" />
            <span className="meta-value">{formatDateShort(ticket.created_at)}</span>
          </div>
        </div>

        <Link to={`/tickets/${ticket.id}`} className="btn-view-card">
          <span>Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
};

export default TicketCard;
