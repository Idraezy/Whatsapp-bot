import React from 'react';
import { Send } from 'lucide-react';
import './MobileMessageMe.css';

interface MobileMessageMeProps {
  onClick: () => void;
}

const MobileMessageMe: React.FC<MobileMessageMeProps> = ({ onClick }) => {
  return (
    <div className="mobile-message-me" onClick={onClick}>
      <div className="mobile-message-me-icon">
        <Send size={20} />
      </div>
      <div className="mobile-message-me-content">
        <span className="mobile-message-me-text">Message Me Directly</span>
        <span className="mobile-message-me-subtext">Get in touch for projects & collaborations</span>
      </div>
      <div className="mobile-message-me-arrow">›</div>
    </div>
  );
};

export default MobileMessageMe;