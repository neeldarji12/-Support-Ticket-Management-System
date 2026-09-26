import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  Users,
  LogOut,
  ShieldCheck,
  UserCheck,
  X,
  LifeBuoy,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout, isSupport } = useAuth();

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`app-sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon-box">
            <LifeBuoy size={22} className="brand-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-title">SupportDesk</span>
            <span className="brand-sub">Ticketing Portal</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-user-pill">
          <div className="user-avatar-badge">
            {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'U')}
          </div>
          <div className="user-meta-info">
            <span className="user-name">{user?.name || 'Guest User'}</span>
            <span className={`role-badge ${isSupport ? 'role-support' : 'role-employee'}`}>
              {isSupport ? (
                <>
                  <ShieldCheck size={12} />
                  <span>Support Staff</span>
                </>
              ) : (
                <>
                  <UserCheck size={12} />
                  <span>Employee</span>
                </>
              )}
            </span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">MAIN NAVIGATION</div>

          <NavLink
            to="/"
            end
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tickets"
            end
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Ticket size={18} />
            <span>Tickets</span>
          </NavLink>

          <NavLink
            to="/create-ticket"
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={18} />
            <span>Create Ticket</span>
          </NavLink>

          <NavLink
            to="/employees"
            onClick={onClose}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Users size={18} />
            <span>Employees</span>
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <button onClick={logout} className="logout-button">
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
