import React from 'react';
import './Collaboration.css';

export interface Collaboration {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string;
}

interface CollaborationsProps {
  collaborations: Collaboration[];
}

const Collaborations: React.FC<CollaborationsProps> = ({ collaborations }) => {
  return (
    <div className="collaborations-panel">
      <div className="collaborations-header">
        <h2 className="collaborations-title">Experience & Collaborations</h2>
        <p className="collaborations-subtitle">Organizations I've worked with</p>
      </div>

      <div className="collaborations-list">
        {collaborations.map((collab) => (
          <div
            key={collab.id}
            className="collaboration-item"
          >
            <div className="collaboration-logo">
              <span>{collab.logo}</span>
            </div>
            <div className="collaboration-info">
              <h3 className="collaboration-company">{collab.company}</h3>
              <p className="collaboration-role">{collab.role}</p>
              <p className="collaboration-period">{collab.period}</p>
              <p className="collaboration-description">{collab.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collaborations;