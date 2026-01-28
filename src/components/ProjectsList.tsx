import React from 'react';
import './ProjectsList.css';

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: string;
}

interface ProjectsListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="projects-panel">
      <div className="projects-header">
        <h2 className="projects-title">My Projects</h2>
        <div className="projects-search">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="projects-list">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => onProjectClick(project)}
          >
            <div className="project-icon">
              <span>{project.icon}</span>
            </div>
            <div className="project-info">
              <h3 className="project-name">{project.name}</h3>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-action">
              →
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsList;