import React from 'react';
import { Briefcase, X } from 'lucide-react';
import './Collaboration.css';

export interface Collaboration {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string; // Image path
}

interface CollaborationsProps {
  collaborations: Collaboration[];
  onClose?: () => void;
  isMobileActive?: boolean;
}

const Collaborations: React.FC<CollaborationsProps> = ({ collaborations, onClose, isMobileActive }) => {
  return (
    <div className={`collaborations-panel ${isMobileActive ? 'mobile-active' : ''}`}>
      {/* Mobile Close Button */}
      {onClose && (
        <button className="mobile-panel-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>
      )}

      <div className="collaborations-header">
        <h2 className="collaborations-title">
          Experience & Collaborations<Briefcase size={24} style={{ display: 'inline', marginLeft: '8px' }} color='#F8557A' />
        </h2>
        <p className="collaborations-subtitle">Organizations I've worked with</p>
      </div>

      <div className="collaborations-list">
        {collaborations.map((collab) => {
          return (
            <div
              key={collab.id}
              className="collaboration-item"
            >
              <div className="collaboration-logo">
                <img src={collab.logo} alt={collab.company} />
              </div>
              <div className="collaboration-info">
                <h3 className="collaboration-company">{collab.company}</h3>
                <p className="collaboration-role">{collab.role}</p>
                <p className="collaboration-period">{collab.period}</p>
                <p className="collaboration-description">{collab.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collaborations;