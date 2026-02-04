import React from 'react';
import { ChevronRight } from 'lucide-react';
import './MobileProjectsList.css';

export interface MobileProject {
  id: string;
  name: string;
  preview: string;
  icon: string;
  timestamp?: string;
}

interface MobileProjectsListProps {
  projects: MobileProject[];
  onProjectClick: (project: MobileProject) => void;
}

const MobileProjectsList: React.FC<MobileProjectsListProps> = ({ 
  projects, 
  onProjectClick 
}) => {
  return (
    <div className="mobile-projects-list">
      {projects.length === 0 ? (
        <div className="mobile-empty-state">
          <p>No projects found</p>
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="mobile-project-item"
            onClick={() => onProjectClick(project)}
          >
            <div className="mobile-project-avatar">
              <img src={project.icon} alt={project.name} />
            </div>
            <div className="mobile-project-content">
              <div className="mobile-project-header">
                <h3 className="mobile-project-name">{project.name}</h3>
                {project.timestamp && (
                  <span className="mobile-project-time">{project.timestamp}</span>
                )}
              </div>
              <p className="mobile-project-preview">{project.preview}</p>
            </div>
            <ChevronRight size={20} className="mobile-project-arrow" />
          </div>
        ))
      )}
    </div>
  );
};

export default MobileProjectsList;