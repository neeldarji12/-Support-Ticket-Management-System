import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';

export const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [assigneeFilter, setAssigneeFilter] = useState('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [ticketsData, usersData] = await Promise.all([
          api.getTickets(),
          api.getUsers(),
        ]);
        setTickets(ticketsData);
        setUsers(usersData);
      } catch (err) {
        console.error('Failed to load tickets:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === Number(userId));
    return user ? user.name : 'Unassigned';
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setPriorityFilter('All');
    setAssigneeFilter('All');
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.ticket_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'All' || ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === 'All' || ticket.priority === priorityFilter;

    const matchesAssignee =
      assigneeFilter === 'All' || String(ticket.assigned_to) === String(assigneeFilter);

    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  const supportStaff = users.filter((u) => u.role === 'support');

  if (loading) {
    return <div className="loading-container">Loading Tickets...</div>;
  }

  return (
    <div className="page-content">
      <div className="dashboard-header">
        <div>
          <h2>Support Tickets</h2>
          <p className="subtext">Manage, search, and filter all employee tickets</p>
        </div>
        <Link to="/create-ticket" className="btn-primary">
          + Create Ticket
        </Link>
      </div>

      <div className="filter-bar">
        <div className="filter-item search-field">
          <label>Search</label>
          <input
            type="text"
            placeholder="Search by ID or Subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Priority</label>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Assignee</label>
          <select
            value={assigneeFilter}
            onChange={(e) => setAssigneeFilter(e.target.value)}
          >
            <option value="All">All Assignees</option>
            {supportStaff.map((staff) => (
              <option key={staff.id} value={staff.id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item filter-btn-col">
          <button
            type="button"
            className="btn-secondary"
            onClick={handleResetFilters}
          >
            Clear Filters
          </button>
        </div>
      </div>

      <p className="results-text">
        Showing <strong>{filteredTickets.length}</strong> of {tickets.length} tickets
      </p>

      <div className="section-container">
        {filteredTickets.length === 0 ? (
          <p className="empty-message">No tickets found matching your criteria.</p>
        ) : (
          <div className="table-responsive">
            <table className="simple-table">
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Subject</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assigned To</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <Link to={`/tickets/${t.id}`} className="ticket-link">
                        {t.ticket_id}
                      </Link>
                    </td>
                    <td>{t.subject}</td>
                    <td>
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td>
                      <StatusBadge status={t.status} />
                    </td>
                    <td>{getUserName(t.assigned_to)}</td>
                    <td>
                      {t.created_at ? new Date(t.created_at).toLocaleDateString() : '—'}
                    </td>
                    <td>
                      <Link to={`/tickets/${t.id}`} className="btn-table-action">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
