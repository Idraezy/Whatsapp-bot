import React from 'react';
import { ChevronRight } from 'lucide-react';
import './MobileContactsList.css';

export interface MobileContact {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  lastMessage?: string;
}

interface MobileContactsListProps {
  contacts: MobileContact[];
  onContactClick: (contact: MobileContact) => void;
}

const MobileContactsList: React.FC<MobileContactsListProps> = ({ contacts, onContactClick }) => {
  return (
    <div className="mobile-contacts-list">
      {contacts.map(contact => (
        <div
          key={contact.id}
          className="mobile-contact-item"
          onClick={() => onContactClick(contact)}
        >
          <div className="mobile-contact-avatar">
            <img src={contact.avatar} alt={contact.name} />
          </div>
          <div className="mobile-contact-content">
            <div className="mobile-contact-header">
              <h3 className="mobile-contact-name">{contact.name}</h3>
              {contact.lastMessage && (
                <span className="mobile-contact-time">Today</span>
              )}
            </div>
            {contact.role && <p className="mobile-contact-role">{contact.role}</p>}
          </div>
          <ChevronRight size={20} className="mobile-contact-arrow" />
        </div>
      ))}
    </div>
  );
};

export default MobileContactsList;
