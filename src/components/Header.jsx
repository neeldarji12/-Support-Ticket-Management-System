import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Plus, Bell, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Header = ({ onToggleSidebar }) => {
  const { user, logout, isSupport } = useAuth();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return { title: 'Dashboard Overview', desc: 'Real-time support operations & ticket metrics' };
    if (path === '/tickets') return { title: 'Support Tickets', desc: 'Search, filter, and track support requests' };
    if (path === '/create-ticket') return { title: 'Create Ticket', desc: 'Submit a new support or service incident' };
    if (path.startsWith('/tickets/')) return { title: 'Ticket Details', desc: 'Manage assignment, progress, and comments' };
    if (path === '/employees') return { title: 'Team Directory', desc: 'Company employees and assigned support technicians' };
    return { title: 'SupportDesk', desc: 'Support Ticket Management System' };
  };

  const { title, desc } = getPageTitle();

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-titles">
          <h1 className="header-main-title">{title}</h1>
          <p className="header-subtitle">{desc}</p>
        </div>
      </div>

      <div className="header-right">
        <Link to="/create-ticket" className="btn-header-create">
          <Plus size={16} />
          <span>New Ticket</span>
        </Link>

        <div className="header-divider" />

        <div className="header-user-wrapper">
          <div className="header-avatar" title={user?.name}>
            {user?.avatar || (user?.name ? user.name.slice(0, 2).toUpperCase() : 'U')}
          </div>
          <div className="header-user-details">
            <span className="header-user-name">{user?.name}</span>
            <span className="header-user-role">
              {isSupport ? 'Support Staff' : 'Employee'}
            </span>
          </div>
          <button
            onClick={logout}
            className="btn-header-logout"
            title="Sign out of account"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
