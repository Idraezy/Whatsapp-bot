import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Zap } from 'lucide-react';
import './Skills.css';

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
  icon: string; // Lucide icon name
}

interface SkillsProps {
  skills: Skill[];
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
  return colorMap[skillName] || '#00A884';
};

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="skills-panel">
      <div className="skills-header">
        <h2 className="skills-title">
          Skills & Expertise <Zap size={24} style={{ display: 'inline', marginLeft: '8px', color: '#FFD700' }} />
        </h2>
        <p className="skills-subtitle">My technical proficiencies</p>
      </div>

      <div className="skills-list">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="skills-category">
            <h3 className="category-title">{category}</h3>
            <div className="category-skills">
              {categorySkills.map((skill) => {
                // Dynamically get the Lucide icon component
                const IconComponent = (LucideIcons as any)[skill.icon] || LucideIcons.Code;
                const skillColor = getSkillColor(skill.name);
                
                return (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-name-wrapper">
                        <span className="skill-icon" style={{ color: skillColor }}>
                          <IconComponent size={18} />
                        </span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-level-text">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div 
                        className="skill-progress-fill"
                        style={{ 
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${skillColor} 0%, ${skillColor}dd 100%)`
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;