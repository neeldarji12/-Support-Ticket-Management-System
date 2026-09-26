import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import StatusBadge from '../components/StatusBadge';
import PriorityBadge from '../components/PriorityBadge';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [allTickets, allUsers] = await Promise.all([
          api.getTickets(),
          api.getUsers(),
        ]);
        setTickets(allTickets);
        setUsers(allUsers);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getUserName = (userId) => {
    const user = users.find((u) => u.id === Number(userId));
    return user ? user.name : 'Unassigned';
  };

  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === 'Open').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;
  const closedCount = tickets.filter((t) => t.status === 'Closed').length;
  const highPriorityCount = tickets.filter((t) => t.priority === 'High').length;

  const recentTickets = tickets.slice(0, 5);

  if (loading) {
    return <div className="loading-container">Loading Dashboard...</div>;
  }

  return (
    <div className="page-content">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p className="subtext">
            Welcome back, <strong>{currentUser?.name}</strong>!
          </p>
        </div>
        <Link to="/create-ticket" className="btn-primary">
          + Create New Ticket
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h4>Total Tickets</h4>
          <p className="stat-number">{totalCount}</p>
        </div>

        <div className="stat-card stat-open">
          <h4>Open</h4>
          <p className="stat-number">{openCount}</p>
        </div>

        <div className="stat-card stat-progress">
          <h4>In Progress</h4>
          <p className="stat-number">{inProgressCount}</p>
        </div>

        <div className="stat-card stat-resolved">
          <h4>Resolved</h4>
          <p className="stat-number">{resolvedCount}</p>
        </div>

        <div className="stat-card stat-closed">
          <h4>Closed</h4>
          <p className="stat-number">{closedCount}</p>
        </div>

        <div className="stat-card stat-high">
          <h4>High Priority</h4>
          <p className="stat-number">{highPriorityCount}</p>
        </div>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h3>Recent Tickets</h3>
          <Link to="/tickets" className="link-text">
            View All Tickets &rarr;
          </Link>
        </div>

        {recentTickets.length === 0 ? (
          <p className="empty-message">No tickets found.</p>
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
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map((t) => (
                  <tr key={t.id}>
                    <td>
                      <strong>{t.ticket_id}</strong>
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

export default Dashboard;
