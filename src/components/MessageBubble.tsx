import React from 'react';
import './MessageBubble.css';
import type { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { text, sender, timestamp } = message;
  const isUser = sender === 'user';

  // Format timestamp
  const formatTime = (date: Date): string => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        <p className="message-text">{text}</p>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;