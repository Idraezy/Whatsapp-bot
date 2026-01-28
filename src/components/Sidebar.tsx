import React from 'react';
import './Sidebar.css';

interface SidebarProps {
  activeTab: 'projects' | 'contact';
  onTabChange: (tab: 'projects' | 'contact') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-avatar">
          <span>💼</span>
        </div>
      </div>

      <div className="sidebar-nav">
        <button
          className={`sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => onTabChange('projects')}
          title="Projects"
        >
          💻
        </button>

        <button
          className={`sidebar-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => onTabChange('contact')}
          title="Contact Info"
        >
          📞
        </button>
      </div>

      <div className="sidebar-footer">
        <button className="sidebar-nav-item" title="Settings">
          ⚙️
        </button>
      </div>
    </div>
  );
};

export default Sidebar;