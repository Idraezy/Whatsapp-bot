import React from 'react';
import { ChevronRight } from 'lucide-react';
import './MobileToolsList.css';

export interface MobileTool {
  id: string;
  name: string;
  description?: string;
  icon: string;
}

interface MobileToolsListProps {
  tools: MobileTool[];
  onToolClick: (tool: MobileTool) => void;
}

const MobileToolsList: React.FC<MobileToolsListProps> = ({ tools, onToolClick }) => {
  return (
    <div className="mobile-tools-list">
      {tools.map(tool => (
        <div
          key={tool.id}
          className="mobile-tool-item"
          onClick={() => onToolClick(tool)}
        >
          <div className="mobile-tool-avatar">
            <img src={tool.icon} alt={tool.name} />
          </div>
          <div className="mobile-tool-content">
            <div className="mobile-tool-header">
              <h3 className="mobile-tool-name">{tool.name}</h3>
            </div>
            {tool.description && <p className="mobile-tool-description">{tool.description}</p>}
          </div>
          <ChevronRight size={20} className="mobile-tool-arrow" />
        </div>
      ))}
    </div>
  );
};

export default MobileToolsList;
