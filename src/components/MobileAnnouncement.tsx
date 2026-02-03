import React from 'react';
import { Megaphone } from 'lucide-react';
import './MobileAnnouncement.css';

interface MobileAnnouncementProps {
  title: string;
  message: string;
  onClick?: () => void;
}

const MobileAnnouncement: React.FC<MobileAnnouncementProps> = ({ 
  title, 
  message, 
  onClick 
}) => {
  return (
    <div className="mobile-announcement" onClick={onClick}>
      <div className="mobile-announcement-icon">
        <Megaphone size={20} />
      </div>
      <div className="mobile-announcement-content">
        <h3 className="mobile-announcement-title">{title}</h3>
        <p className="mobile-announcement-message">{message}</p>
      </div>
      <div className="mobile-announcement-arrow">›</div>
    </div>
  );
};

export default MobileAnnouncement;
