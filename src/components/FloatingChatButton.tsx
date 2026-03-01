import React from 'react';
import { MessageCircle, MessageSquareText } from 'lucide-react';
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
      <MessageSquareText size={24} />
    </button>
  );
};

export default FloatingChatButton;