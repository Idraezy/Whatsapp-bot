import React, { useState } from 'react';
import { ChevronLeft, Send } from 'lucide-react';
import './MobileChatPage.css';

export interface MobileChatMessage {
  id: string;
  sender: 'me' | 'other';
  text: string;
  timestamp?: string;
}

export interface MobileChatPageProps {
  projectName: string;
  messages: MobileChatMessage[];
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

const MobileChatPage: React.FC<MobileChatPageProps> = ({ projectName, messages, onBack, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="mobile-chat-page">
      {/* Header */}
      <div className="mobile-chat-header">
        <button className="mobile-chat-back" onClick={onBack}>
          <ChevronLeft size={24} />
        </button>
        <h2 className="mobile-chat-title">{projectName}</h2>
      </div>

      {/* Chat messages */}
      <div className="mobile-chat-messages">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mobile-chat-message ${msg.sender === 'me' ? 'sent' : 'received'}`}
          >
            {msg.text}
            {msg.timestamp && <span className="mobile-chat-timestamp">{msg.timestamp}</span>}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="mobile-chat-input-wrapper">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="mobile-chat-input"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button className="mobile-chat-send" onClick={handleSend}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default MobileChatPage;
