import React from 'react';
import './ContactInfo.css';

export interface ContactLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
}

interface ContactInfoProps {
  contacts: ContactLink[];
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contacts }) => {
  return (
    <div className="contact-panel">
      <div className="contact-header">
        <h2 className="contact-title">Contact & Social</h2>
        <p className="contact-subtitle">Connect with me on these platforms</p>
      </div>

      <div className="contact-list">
        {contacts.map((contact) => (
          <a
            key={contact.id}
            href={contact.url}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-item"
          >
            <div className="contact-icon">
              <span>{contact.icon}</span>
            </div>
            <div className="contact-info">
              <h3 className="contact-platform">{contact.platform}</h3>
              <p className="contact-username">{contact.username}</p>
            </div>
            <div className="contact-action">
              🔗
            </div>
          </a>
        ))}
      </div>

      <div className="contact-footer">
        <p className="contact-footer-text">
          Feel free to reach out for collaborations or just to say hi! 👋
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;