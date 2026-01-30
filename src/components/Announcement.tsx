import React from 'react';
import { Megaphone } from 'lucide-react';
import './Announcement.css';

const Announcement: React.FC = () => {
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
    <div className="announcement-panel">
      <div className="announcement-header">
        <h2 className="announcement-title">
          Announcements <Megaphone size={24} style={{ display: 'inline', marginLeft: '8px' }} />
        </h2>
        <p className="announcement-subtitle">Latest updates and news</p>
      </div>

      <div className="announcement-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className="announcement-item">
            <div className="announcement-icon">
              <Megaphone size={24} />
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