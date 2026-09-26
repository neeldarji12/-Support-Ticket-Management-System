import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="simple-navbar">
      <div className="nav-container">
        
        <Link to="/" className="nav-brand">
          🎫 Support Desk
        </Link>

       
        <div className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/tickets"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Tickets
          </NavLink>

          <NavLink
            to="/create-ticket"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Create Ticket
          </NavLink>

          <NavLink
            to="/employees"
            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          >
            Employees
          </NavLink>
        </div>

        <div className="nav-user-info">
          {currentUser && (
            <>
              <span className="user-greeting">
                {currentUser.name}{' '}
                <span className="user-role-tag">({currentUser.role})</span>
              </span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
