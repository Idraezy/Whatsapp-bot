import React from 'react';
import * as LucideIcons from 'lucide-react';
import { VideoPlay, MessageText1 } from 'iconsax-react';
import './ContactInfo.css';

export interface ContactLink {
  id: string;
  platform: string;
  username: string;
  url: string;
  icon: string;
  bgColor: string;
  type?: 'whatsapp' | 'tiktok';
}

interface ContactInfoProps {
  contacts: ContactLink[];
  onClose?: ()=> void;
  isMobileActive?: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ contacts, onClose, isMobileActive  }) => {
  return (
    <div className={`contact-panel ${isMobileActive ? 'mobile-active' : ''}`}>
      {onClose && (
        <button className="mobile-panel-close" onClick={onClose} aria-label="Close">
          <LucideIcons.X size={24} />
        </button>
     )}
      <div className="contact-header">
        <h2 className="contact-title">Contact & Social 📱</h2>
        <p className="contact-subtitle">Connect with me on these platforms</p>
      </div>

      <div className="contact-list">
        {contacts.map((contact) => {
          // Determine which icon to use
          let IconToRender;
          
          if (contact.type === 'tiktok') {
            IconToRender = () => <VideoPlay size={28} color="#fff" variant="Bold" />;
          } else if (contact.type === 'whatsapp') {
            IconToRender = () => <MessageText1 size={28} color="#fff" variant="Bold" />;
          } else {
            const IconComponent = (LucideIcons as any)[contact.icon] || LucideIcons.Link;
            IconToRender = () => <IconComponent size={28} color="#fff" />;
          }
          
          return (
            <a
              key={contact.id}
              href={contact.url}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div
                className="contact-icon"
                style={{ background: contact.bgColor }}
              >
                <IconToRender />
              </div>

              <div className="contact-info">
                <h3 className="contact-platform">{contact.platform}</h3>
                <p className="contact-username">{contact.username}</p>
              </div>
              <div className="contact-action">
                <LucideIcons.ExternalLink size={18} />
              </div>
            </a>
          );
        })}
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