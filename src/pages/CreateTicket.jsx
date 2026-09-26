import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const CreateTicket = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [assignedTo, setAssignedTo] = useState('');

  // Support staff list for assignment dropdown
  const [supportStaff, setSupportStaff] = useState([]);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await api.getUsers();
      setSupportStaff(allUsers.filter((u) => u.role === 'support'));
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!subject.trim()) {
      setError('Please enter a ticket subject');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a ticket description');
      return;
    }

    setLoading(true);
    try {
      const createdTicket = await api.createTicket({
        subject: subject.trim(),
        description: description.trim(),
        priority,
        assigned_to: assignedTo,
        created_by: currentUser?.id || 1,
      });

      setSuccessMsg(`Ticket ${createdTicket.ticket_id} created successfully! Redirecting...`);

      setSubject('');
      setDescription('');
      setPriority('Medium');
      setAssignedTo('');

      setTimeout(() => {
        navigate(`/tickets/${createdTicket.id}`);
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to create ticket');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-content">
      <div className="form-container">
        <div className="form-header">
          <Link to="/tickets" className="link-back">
            &larr; Back to Tickets
          </Link>
          <h2>Create New Ticket</h2>
          <p className="subtext">Fill in the details to submit a new support request</p>
        </div>

        {error && <div className="error-alert">{error}</div>}
        {successMsg && <div className="success-alert">{successMsg}</div>}

        <form onSubmit={handleSubmit} className="simple-form">
          <div className="form-field">
            <label>
              Subject <span className="required-star">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Email access problem, Laptop repair"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>
              Description <span className="required-star">*</span>
            </label>
            <textarea
              rows="4"
              placeholder="Explain the issue in detail..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>
              Priority <span className="required-star">*</span>
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-field">
            <label>Assign To (Optional)</label>
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            >
              <option value="">-- Leave Unassigned --</option>
              {supportStaff.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => navigate('/tickets')}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Submit Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicket;
