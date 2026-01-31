import React from 'react';
import { Laptop, PhoneIcon, Settings, ShieldCheck, Minus, Megaphone, MessageSquareText } from 'lucide-react';
import './Sidebar.css';
import { People } from 'iconsax-react';

interface SidebarProps {
  activeTab: 'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup';
  onTabChange: (tab: 'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup') => void;
  userImage: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, 
  onTabChange, 
  userImage,
  isOpen,
  onClose 
}) => {
  const handleTabClick = (tab: 'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup') => {
    onTabChange(tab);
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

      <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-avatar">
            <span>💼</span>
          </div>
        </div>

        <div className="sidebar-nav">
          <button
            className={`sidebar-nav-item ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => handleTabClick('projects')}
            title="Projects"
          >
            <Laptop size={20} strokeWidth={1.5} />
          </button>

          <button
            className={`sidebar-nav-item ${activeTab === 'contact' ? 'active' : ''}`}
            onClick={() => handleTabClick('contact')}
            title="Contact Info"
          >
            <PhoneIcon size={20} strokeWidth={1.5} />
          </button>

          <button
            className={`sidebar-nav-item ${activeTab === 'collaborations' ? 'active' : ''}`}
            onClick={() => handleTabClick('collaborations')}
            title="Collaborations"
          >
            <People size={20} variant="Outline" color="currentColor" />
          </button>

          <button
            className={`sidebar-nav-item ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => handleTabClick('skills')}
            title="Skills"
          >
            <ShieldCheck size={20} strokeWidth={1.5} />
          </button>

          {/* Dash icon separator */}
          <div className="sidebar-divider">
            <Minus size={20} strokeWidth={2} />
          </div>

          {/* Announcement section */}
          <button
            className={`sidebar-nav-item ${activeTab === 'announcement' ? 'active' : ''}`}
            onClick={() => handleTabClick('announcement')}
            title="Announcements"
          >
            <Megaphone size={20} strokeWidth={1.5} />
          </button>
        </div>

        <div className="sidebar-footer">


          {/* Writeup section */}
          <button
            className={`sidebar-nav-item ${activeTab === 'writeup' ? 'active' : ''}`}
            onClick={() => handleTabClick('writeup')}
            title="Write to Me"
          >
            <MessageSquareText size={20} strokeWidth={1.5} />
          </button>

          {/* Dash icon separator */}
          <div className="sidebar-divider">
            <Minus size={20} strokeWidth={2} />
          </div>

          <button className="sidebar-nav-item" title="Settings">
            <Settings size={20} strokeWidth={1.5} />
          </button>

          {/* User Image */}
          {userImage && (
            <div className="sidebar-user-image">
              <img src={userImage} alt="User" />
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        <button className="sidebar-close-btn" onClick={onClose}>
          ✕
        </button>
      </div>
    </>
  );
};

export default Sidebar;