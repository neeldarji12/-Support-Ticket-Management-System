import React, { useState, useEffect } from 'react';
import { api } from '../services/api';

export const Employees = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await api.getUsers();
        setUsers(data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div className="loading-container">Loading Employees...</div>;
  }

  return (
    <div className="page-content">
      <div className="dashboard-header">
        <div>
          <h2>Employees & Support Staff</h2>
          <p className="subtext">Company directory and assigned support technicians</p>
        </div>
      </div>

      <div className="section-container">
        <div className="table-responsive">
          <table className="simple-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <span
                      style={{
                        padding: '3px 8px',
                        borderRadius: '10px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        backgroundColor: u.role === 'support' ? '#e0f2fe' : '#f0fdf4',
                        color: u.role === 'support' ? '#0369a1' : '#15803d',
                      }}
                    >
                      {u.role === 'support' ? 'Support Staff' : 'Employee'}
                    </span>
                  </td>
                  <td>{u.department || 'General'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
