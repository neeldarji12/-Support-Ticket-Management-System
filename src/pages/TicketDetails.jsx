import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export const TicketDetails = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();

  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newStatus, setNewStatus] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  const [commentText, setCommentText] = useState('');

  const loadTicketDetails = async () => {
    try {
      const [ticketData, allUsers, commentsData] = await Promise.all([
        api.getTicketById(id),
        api.getUsers(),
        api.getComments(id),
      ]);

      setTicket(ticketData);
      setUsers(allUsers);
      setComments(commentsData);

      if (ticketData) {
        setNewStatus(ticketData.status);
        setNewAssignee(ticketData.assigned_to ? String(ticketData.assigned_to) : '');
      }
    } catch (err) {
      console.error('Error loading ticket details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTicketDetails();
  }, [id]);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === Number(userId));
    return user ? user.name : 'Unassigned';
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdateMsg('');

    try {
      const updated = await api.updateTicket(ticket.id, {
        status: newStatus,
        assigned_to: newAssignee,
      });

      setTicket(updated);
      setUpdateMsg('Ticket updated successfully!');
      setTimeout(() => setUpdateMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Failed to update ticket');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    try {
      const addedComment = await api.addComment(
        ticket.id,
        commentText.trim(),
        currentUser?.id || 1
      );

      setComments([...comments, addedComment]);
      setCommentText('');
    } catch (err) {
      alert(err.message || 'Failed to add comment');
    }
  };

  const supportStaff = users.filter((u) => u.role === 'support');

  if (loading) {
    return <div className="loading-container">Loading Ticket Details...</div>;
  }

  if (!ticket) {
    return (
      <div className="page-content">
        <p>Ticket not found.</p>
        <Link to="/tickets" className="link-back">
          &larr; Back to Tickets
        </Link>
      </div>
    );
  }

  return (
    <div className="page-content">
      <Link to="/tickets" className="link-back">
        &larr; Back to Tickets
      </Link>

      <div className="ticket-detail-card">
        {/* Ticket Header */}
        <div className="detail-header">
          <div>
            <span className="ticket-id-tag">{ticket.ticket_id}</span>
            <h2 className="ticket-title">{ticket.subject}</h2>
          </div>
          <div className="badge-group">
            <PriorityBadge priority={ticket.priority} />
            <StatusBadge status={ticket.status} />
          </div>
        </div>

        <div className="detail-meta-grid">
          <div>
            <span className="meta-label">Raised By:</span>
            <p className="meta-value">{getUserName(ticket.created_by)}</p>
          </div>
          <div>
            <span className="meta-label">Assigned To:</span>
            <p className="meta-value">{getUserName(ticket.assigned_to)}</p>
          </div>
          <div>
            <span className="meta-label">Created Date:</span>
            <p className="meta-value">
              {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : '—'}
            </p>
          </div>
          <div>
            <span className="meta-label">Last Updated:</span>
            <p className="meta-value">
              {ticket.updated_at ? new Date(ticket.updated_at).toLocaleString() : '—'}
            </p>
          </div>
        </div>

        <div className="detail-section">
          <h3>Description</h3>
          <p className="description-box">{ticket.description}</p>
        </div>

        <div className="detail-section update-section">
          <h3>Update Ticket Status & Assignee</h3>

          {updateMsg && <div className="success-alert">{updateMsg}</div>}

          <form onSubmit={handleUpdate} className="update-form">
            <div className="form-field">
              <label>Status</label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div className="form-field">
              <label>Assigned Staff</label>
              <select
                value={newAssignee}
                onChange={(e) => setNewAssignee(e.target.value)}
              >
                <option value="">-- Unassigned --</option>
                {supportStaff.map((staff) => (
                  <option key={staff.id} value={staff.id}>
                    {staff.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field btn-align-bottom">
              <button type="submit" className="btn-primary">
                Update Ticket
              </button>
            </div>
          </form>
        </div>

        <div className="detail-section">
          <h3>Comments & Discussion ({comments.length})</h3>

          <div className="comments-list">
            {comments.length === 0 ? (
              <p className="empty-message">No comments yet. Be the first to comment!</p>
            ) : (
              comments.map((c) => (
                <div key={c.id} className="comment-item">
                  <div className="comment-header">
                    <strong>{getUserName(c.user_id)}</strong>
                    <span className="comment-time">
                      {c.created_at ? new Date(c.created_at).toLocaleString() : ''}
                    </span>
                  </div>
                  <p className="comment-body">{c.comment}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleAddComment} className="add-comment-form">
            <textarea
              rows="3"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              required
            />
            <button type="submit" className="btn-secondary">
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
