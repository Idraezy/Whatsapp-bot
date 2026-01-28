import React from 'react';
import './ChatHeader.css';

interface ChatHeaderProps {
  botName: string;
  userImage: string | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  botName, 
  userImage, 
  theme, 
  onToggleTheme 
}) => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="avatar">
          {userImage ? (
            <img src={userImage} alt="User avatar" />
          ) : (
            <span className="avatar-icon">🤖</span>
          )}
        </div>
        <div className="header-info">
          <h3 className="header-name">{botName}, your AI</h3>
          <p className="header-status">online</p>
        </div>
      </div>
      <div className="header-actions">
        <span className="icon">🔍</span>
        <button 
          className="icon"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <span className="icon">⋮</span>
      </div>
    </div>
  );
};

export default ChatHeader;