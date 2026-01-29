// import React from 'react';
// import './Skills.css';

// export interface Skill {
//   id: string;
//   name: string;
//   category: string;
//   level: number; // 1-100
//   icon: string;
// }

// interface SkillsProps {
//   skills: Skill[];
// }

// const Skills: React.FC<SkillsProps> = ({ skills }) => {
//   // Group skills by category
//   const groupedSkills = skills.reduce((acc, skill) => {
//     if (!acc[skill.category]) {
//       acc[skill.category] = [];
//     }
//     acc[skill.category].push(skill);
//     return acc;
//   }, {} as Record<string, Skill[]>);

//   return (
//     <div className="skills-panel">
//       <div className="skills-header">
//         <h2 className="skills-title">Skills & Expertise</h2>
//         <p className="skills-subtitle">My technical proficiencies</p>
//       </div>

//       <div className="skills-list">
//         {Object.entries(groupedSkills).map(([category, categorySkills]) => (
//           <div key={category} className="skills-category">
//             <h3 className="category-title">{category}</h3>
//             <div className="category-skills">
//               {categorySkills.map((skill) => (
//                 <div key={skill.id} className="skill-item">
//                   <div className="skill-header">
//                     <div className="skill-name-wrapper">
//                       <span className="skill-icon">{skill.icon}</span>
//                       <span className="skill-name">{skill.name}</span>
//                     </div>
//                     <span className="skill-level-text">{skill.level}%</span>
//                   </div>
//                   <div className="skill-progress-bar">
//                     <div 
//                       className="skill-progress-fill"
//                       style={{ width: `${skill.level}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Skills;






import React from 'react';
import * as LucideIcons from 'lucide-react';
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
        <h2 className="skills-title">Skills & Expertise</h2>
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
                
                return (
                  <div key={skill.id} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-name-wrapper">
                        <span className="skill-icon">
                          <IconComponent size={18} />
                        </span>
                        <span className="skill-name">{skill.name}</span>
                      </div>
                      <span className="skill-level-text">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div 
                        className="skill-progress-fill"
                        style={{ width: `${skill.level}%` }}
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