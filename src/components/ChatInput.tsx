import React, { useState, useRef } from 'react';
import './ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onImageUpload?: (file: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  onImageUpload,
  disabled = false 
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle send button click
  const handleSend = (): void => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue(''); // Clear input after sending
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle attachment click
  const handleAttachmentClick = (): void => {
    fileInputRef.current?.click();
  };

  // Handle file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(e.target.files[0]);
      e.target.value = ''; // Reset input
    }
  };

  return (
    <div className="chat-input-container">
      <div className="input-icons-left">
        <button 
          className="emoji-button" 
          aria-label="Emoji"
          disabled={disabled}
        >
          😊
        </button>
        <button
          className="attachment-button"
          aria-label="Attach"
          onClick={handleAttachmentClick}
          disabled={disabled}
        >
          📎
        </button>
        {/* HIDDEN FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />
      </div>
      
      <input
        type="text"
        className="chat-input"
        placeholder={disabled ? 'Upload an image…' : 'Type a message'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />

      {inputValue.trim() && !disabled ? (
        <button 
          className="send-button"
          onClick={handleSend}
          aria-label="Send message"
        >
          ➤
        </button>
      ) : (
        <button 
          className="mic-button"
          aria-label="Voice message"
          disabled={disabled}
        >
          🎤
        </button>
      )}
    </div>
  );
};

export default ChatInput;