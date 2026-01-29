import React, { useRef, useState } from 'react';
import { Mic, Paperclip, SmilePlus } from 'lucide-react';
import './ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onImageUpload?: (file: File) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onImageUpload,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleSend = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachmentClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onImageUpload) {
      onImageUpload(e.target.files[0]);
      e.target.value = ''; // reset input
    }
  };

  return (
    <div className="chat-input-container">
      <div className="input-icons-left">
        <button className="emoji-button" aria-label="Emoji">
          <SmilePlus size={20} color='#FFC638'/>
        </button>

        <button
          className="attachment-button"
          aria-label="Attach"
          onClick={handleAttachmentClick}
        >
          <Paperclip size={20} />
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
        <button className="send-button" onClick={handleSend}>
          ➤
        </button>
      ) : (
        <button className="mic-button" disabled={disabled}>
          <Mic size={20} />
        </button>
      )}
    </div>
  );
};

export default ChatInput;
