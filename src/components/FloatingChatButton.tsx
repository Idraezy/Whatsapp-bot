import React from 'react';
import { MessageCircle, MoreHorizontal } from 'lucide-react';
import './FloatingChatButton.css';

interface FloatingChatButtonProps {
  onClick: () => void;
  variant?: 'chat' | 'menu'; // Add variant option
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ 
  onClick, 
  variant = 'chat' 
}) => {
  return (
    <button 
      className="floating-chat-button" 
      onClick={onClick} 
      aria-label="Open chat"
    >
      {variant === 'menu' ? (
        <MoreHorizontal size={24} />
      ) : (
        <MessageCircle size={24} />
      )}
    </button>
  );
};

export default FloatingChatButton;