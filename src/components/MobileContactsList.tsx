import React from 'react';
import * as LucideIcons from 'lucide-react';
import { VideoPlay, MessageText1 } from 'iconsax-react';
import { SquareArrowOutUpRight } from 'lucide-react';
import './MobileContactsList.css';

export interface MobileContact {
  id: string;
  name: string;
  username: string;
  icon: string;
  bgColor: string;
  url: string;
  type?: 'whatsapp' | 'tiktok';
  timestamp?: string;
}

interface MobileContactsListProps {
  contacts: MobileContact[];
  onContactClick: (contact: MobileContact) => void;
}

const MobileContactsList: React.FC<MobileContactsListProps> = ({ 
  contacts, 
  onContactClick 
}) => {
  return (
    <div className="mobile-contacts-list">
      {contacts.map((contact) => {
        // Determine which icon to use
        let IconToRender;
        
        if (contact.type === 'tiktok') {
          IconToRender = () => <VideoPlay size={24} color="#fff" variant="Bold" />;
        } else if (contact.type === 'whatsapp') {
          IconToRender = () => <MessageText1 size={24} color="#fff" variant="Bold" />;
        } else {
          const IconComponent = (LucideIcons as any)[contact.icon] || LucideIcons.Link;
          IconToRender = () => <IconComponent size={24} color="#fff" />;
        }

        return (
          <div
            key={contact.id}
            className="mobile-contact-item"
            onClick={() => onContactClick(contact)}
          >
            <div 
              className="mobile-contact-avatar"
              style={{ background: contact.bgColor }}
            >
              <IconToRender />
            </div>
            <div className="mobile-contact-content">
              <h3 className="mobile-contact-name">{contact.name}</h3>
              <p className="mobile-contact-username">{contact.username}</p>
            </div>
            <SquareArrowOutUpRight size={18} className="mobile-contact-icon" />
          </div>
        );
      })}
    </div>
  );
};

export default MobileContactsList;