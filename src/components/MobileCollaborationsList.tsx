import React from 'react';
import { ChevronRight } from 'lucide-react';
import './MobileCollaborationsList.css';

export interface MobileCollaboration {
  id: string;
  name: string;
  role: string;
  period: string;
  logo: string;
  description?: string;
}

interface MobileCollaborationsListProps {
  collaborations: MobileCollaboration[];
  onCollabClick: (collab: MobileCollaboration) => void;
}

const MobileCollaborationsList: React.FC<MobileCollaborationsListProps> = ({ 
  collaborations, 
  onCollabClick 
}) => {
  return (
    <div className="mobile-collaborations-list">
      {collaborations.map((collab) => (
        <div
          key={collab.id}
          className="mobile-collaboration-item"
          onClick={() => onCollabClick(collab)}
        >
          <div className="mobile-collaboration-avatar">
            {collab.logo ? (
              <img 
                src={collab.logo} 
                alt={collab.name}
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span style="font-size: 24px; color: #00AB88;">${collab.name.charAt(0)}</span>`;
                }}
              />
            ) : (
              <span style={{ fontSize: '24px', color: '#00AB88' }}>
                {collab.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="mobile-collaboration-content">
            <div className="mobile-collaboration-header">
              <h3 className="mobile-collaboration-name">{collab.name}</h3>
              <span className="mobile-collaboration-period">{collab.period}</span>
            </div>
            <p className="mobile-collaboration-role">{collab.role}</p>
          </div>
          <ChevronRight size={20} className="mobile-collaboration-arrow" />
        </div>
      ))}
    </div>
  );
};

export default MobileCollaborationsList;