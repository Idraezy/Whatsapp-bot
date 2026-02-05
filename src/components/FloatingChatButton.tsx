import React from 'react';
import { MessageCircle, MessagesSquare } from 'lucide-react';
import './FloatingChatButton.css';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <button 
      className="floating-chat-button" 
      onClick={onClick} 
      aria-label="Open chat"
    >
      <MessagesSquare size={24} color='black' />
    </button>
  );
};

export default FloatingChatButton;