import React from 'react';
import { Megaphone, X } from 'lucide-react';
import './Announcement.css';

interface AnnouncementProps {
  onClose?: () => void;
  isMobileActive?: boolean;
}

const Announcement: React.FC<AnnouncementProps> = ({ onClose, isMobileActive }) => {
  const announcements = [
    {
      id: '1',
      title: 'New Project Launch',
      date: 'January 25, 2026',
      message: 'Excited to announce the launch of my latest NFT Marketplace! Check it out in the projects section.',
    },
    {
      id: '2',
      title: 'Available for Freelance',
      date: 'January 20, 2026',
      message: 'Currently open for new freelance opportunities. Looking for exciting React/TypeScript projects!',
    },
    {
      id: '3',
      title: 'Blog Post Published',
      date: 'January 15, 2026',
      message: 'Just published a new article on building scalable React applications with TypeScript.',
    },
  ];

  return (
    <div className={`announcement-panel ${isMobileActive ? 'mobile-active' : ''}`}>
        {onClose && (
        <button className="mobile-panel-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
      )}
      <div className="announcement-header">
        <h2 className="announcement-title">
          Announcements<Megaphone size={24} style={{ display: 'inline', marginLeft: '8px',  }} color='#008DE0'/>
        </h2>
        <p className="announcement-subtitle">Latest updates and news</p>
      </div>

      <div className="announcement-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-item">
            <div
      className="announcement-icon" style={{ background: `linear-gradient( 135deg, #7C3AED,#2563EB,#06B6D4)`,}}>
           <Megaphone size={24} color="#fff" />
        </div>

            <div className="announcement-content">
              <h3 className="announcement-item-title">{announcement.title}</h3>
              <p className="announcement-date">{announcement.date}</p>
              <p className="announcement-message">{announcement.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcement;