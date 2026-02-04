import React from 'react';
import { ArrowLeft } from 'lucide-react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import ChatInput from './ChatInput';
import { Message, StateType } from '../types';
import './MobileChatPage.css';

interface MobileChatPageProps {
  item: any;
  chatType: 'project' | 'bot' | 'writeup' | null;
  onBack: () => void;
  botName: string;
  userImage: string | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  onImageUpload: (file: File) => void;
  currentState: StateType;
}

const MobileChatPage: React.FC<MobileChatPageProps> = ({
  item,
  chatType,
  onBack,
  botName,
  userImage,
  theme,
  onToggleTheme,
  messages,
  isTyping,
  onSendMessage,
  onImageUpload,
  currentState,
}) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className="mobile-chat-page">
      {/* Header */}
      <div className="mobile-chat-page-header">
        <button 
          className="mobile-chat-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={24} />
        </button>
        <div className="mobile-chat-avatar">
          {userImage ? (
            <img src={userImage} alt="User" />
          ) : (
            <span>🤖</span>
          )}
        </div>
        <div className="mobile-chat-info">
          <h3>{botName}</h3>
          <p>online</p>
        </div>
        <button 
          className="mobile-theme-toggle"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

      {/* Messages */}
      <div className="mobile-chat-page-messages">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="mobile-chat-page-input">
        <ChatInput
          onSendMessage={onSendMessage}
          onImageUpload={onImageUpload}
          disabled={currentState === 'ASK_IMAGE'}
        />
      </div>
    </div>
  );
};

export default MobileChatPage;