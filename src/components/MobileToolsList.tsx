import React from 'react';
import * as LucideIcons from 'lucide-react';
import { ShieldCheck, ChevronRight } from 'lucide-react';
import './MobileToolsList.css';

export interface MobileTool {
  id: string;
  name: string;
  category: string;
  level: number;
  icon: string;
}

interface MobileToolsListProps {
  tools: MobileTool[];
  onToolClick: (tool: MobileTool) => void;
}

// Color mapping for different technologies
const getSkillColor = (skillName: string): string => {
  const colorMap: Record<string, string> = {
    'React.js': '#61DAFB',
    'TypeScript': '#3178C6',
    'Next.js': '#000000',
    'Tailwind CSS': '#06B6D4',
    'JavaScript': '#F7DF1E',
    'HTML/CSS': '#E34F26',
    'Node.js': '#339933',
    'Express.js': '#000000',
    'MongoDB': '#47A248',
    'Git/GitHub': '#F05032',
    'Figma': '#F24E1E',
    'Smart Contracts': '#627EEA',
  };
  return colorMap[skillName] || '#00AB88';
};

const MobileToolsList: React.FC<MobileToolsListProps> = ({ 
  tools, 
  onToolClick 
}) => {
  // Group tools by category
  const groupedTools = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, MobileTool[]>);

  return (
    <div className="mobile-tools-list">
      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        <div key={category} className="mobile-tools-category">
          <div className="mobile-tools-category-header">
            <ShieldCheck size={16} />
            <h3>{category}</h3>
          </div>
          {categoryTools.map((tool) => {
            const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.Code;
            const skillColor = getSkillColor(tool.name);
            
            return (
              <div
                key={tool.id}
                className="mobile-tool-item"
                onClick={() => onToolClick(tool)}
              >
                <div 
                  className="mobile-tool-avatar"
                  style={{ 
                    background: `${skillColor}20`,
                    color: skillColor 
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <div className="mobile-tool-content">
                  <div className="mobile-tool-header">
                    <h4 
                      className="mobile-tool-name"
                      style={{ color: skillColor }}
                    >
                      {tool.name}
                    </h4>
                    <span 
                      className="mobile-tool-level"
                      style={{ color: skillColor }}
                    >
                      {tool.level}%
                    </span>
                  </div>
                  <div className="mobile-tool-progress-bar">
                    <div 
                      className="mobile-tool-progress-fill"
                      style={{ 
                        width: `${tool.level}%`,
                        background: `linear-gradient(90deg, ${skillColor} 0%, ${skillColor}dd 100%)`
                      }}
                    ></div>
                  </div>
                </div>
                <ChevronRight size={20} className="mobile-tool-arrow" />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MobileToolsList;