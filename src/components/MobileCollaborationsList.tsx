import React from 'react';
import { ChevronRight } from 'lucide-react';
import './MobileCollaborationsList.css';

export interface MobileCollaboration {
  id: string;
  projectName: string;
  collaborators: string;
  icon: string;
}

interface MobileCollaborationsListProps {
  collaborations: MobileCollaboration[];
  onCollaborationClick: (collab: MobileCollaboration) => void;
}

const MobileCollaborationsList: React.FC<MobileCollaborationsListProps> = ({ collaborations, onCollaborationClick }) => {
  return (
    <div className="mobile-collaborations-list">
      {collaborations.map(collab => (
        <div
          key={collab.id}
          className="mobile-collaboration-item"
          onClick={() => onCollaborationClick(collab)}
        >
          <div className="mobile-collaboration-avatar">
            <img src={collab.icon} alt={collab.projectName} />
          </div>
          <div className="mobile-collaboration-content">
            <div className="mobile-collaboration-header">
              <h3 className="mobile-collaboration-name">{collab.projectName}</h3>
            </div>
            <p className="mobile-collaboration-collaborators">{collab.collaborators}</p>
          </div>
          <ChevronRight size={20} className="mobile-collaboration-arrow" />
        </div>
      ))}
    </div>
  );
};

export default MobileCollaborationsList;
