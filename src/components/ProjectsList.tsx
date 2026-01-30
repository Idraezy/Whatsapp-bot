import React, { useState } from 'react';
import { CodeXml } from 'lucide-react';
import './ProjectsList.css';

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  icon: string; // Now it's an image URL
}

interface ProjectsListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const ProjectsList: React.FC<ProjectsListProps> = ({ projects, onProjectClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter projects based on search term
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="projects-panel">
      <div className="projects-header">
        <h2 className="projects-title">
          My Projects<CodeXml size={24} style={{ display: 'inline', marginLeft: '8px' }} color='#FF8200' />
        </h2>
        <div className="projects-search">
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="projects-list">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="project-item"
            onClick={() => onProjectClick(project)}
          >
            <div className="project-icon">
              <img src={project.icon} alt={project.name} />
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
        {filteredProjects.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            No projects found
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsList;