// import React from 'react';
// import './Collaboration.css';

// export interface Collaboration {
//   id: string;
//   company: string;
//   role: string;
//   period: string;
//   description: string;
//   logo: string;
// }

// interface CollaborationsProps {
//   collaborations: Collaboration[];
// }

// const Collaborations: React.FC<CollaborationsProps> = ({ collaborations }) => {
//   return (
//     <div className="collaborations-panel">
//       <div className="collaborations-header">
//         <h2 className="collaborations-title">Experience & Collaborations</h2>
//         <p className="collaborations-subtitle">Organizations I've worked with</p>
//       </div>

//       <div className="collaborations-list">
//         {collaborations.map((collab) => (
//           <div
//             key={collab.id}
//             className="collaboration-item"
//           >
//             <div className="collaboration-logo">
//               <span>{collab.logo}</span>
//             </div>
//             <div className="collaboration-info">
//               <h3 className="collaboration-company">{collab.company}</h3>
//               <p className="collaboration-role">{collab.role}</p>
//               <p className="collaboration-period">{collab.period}</p>
//               <p className="collaboration-description">{collab.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Collaborations;











import React from 'react';
import * as LucideIcons from 'lucide-react';
import './Collaboration.css';


export interface Collaboration {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  logo: string; // Lucide icon name
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
        {collaborations.map((collab) => {
          // Dynamically get the Lucide icon component
          const IconComponent = (LucideIcons as any)[collab.logo] || LucideIcons.Building;
          
          return (
            <div
              key={collab.id}
              className="collaboration-item"
            >
              <div className="collaboration-logo">
                <IconComponent size={32} />
              </div>
              <div className="collaboration-info">
                <h3 className="collaboration-company">{collab.company}</h3>
                <p className="collaboration-role">{collab.role}</p>
                <p className="collaboration-period">{collab.period}</p>
                <p className="collaboration-description">{collab.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Collaborations;