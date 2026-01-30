import React from 'react';
import './MessageBubble.css';
import { Message } from '../types';

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

  // Convert URLs in text to clickable links
  const renderTextWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: isUser ? '#065f46' : '#00A884',
              textDecoration: 'underline',
              fontWeight: '500'
            }}
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className={`message-wrapper ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className={`message-bubble ${isUser ? 'user-bubble' : 'bot-bubble'}`}>
        <p className="message-text" style={{ whiteSpace: 'pre-wrap' }}>
          {renderTextWithLinks(text)}
        </p>
        <span className="message-time">{formatTime(timestamp)}</span>
      </div>
    </div>
  );
};

export default MessageBubble;