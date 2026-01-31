import React, { useState } from 'react';
import { MessageSquareText, Send, X } from 'lucide-react';
import './Writeup.css';

interface WriteupProps {
  onClose?: () => void;
  isMobileActive?: boolean;
}

const Writeup: React.FC<WriteupProps>  = ({ onClose, isMobileActive }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('idle');

    // Create mailto link
    const subject = `Message from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:idraezynoks@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Reset form after a delay
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setIsSending(false);
      setStatus('success');
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className={`writeup-panel ${isMobileActive ? 'mobile-active' : ''}`}>
          {onClose && (
        <button className="mobile-panel-close" onClick={onClose} aria-label="Close">
          <X  size={24} />
        </button>
      )}
      <div className="writeup-header">
        <h2 className="writeup-title">
          Write to Me<MessageSquareText size={24} style={{ display: 'inline', marginLeft: '8px' }} />
        </h2>
        <p className="writeup-subtitle">Send me a message directly</p>
      </div>

      <div className="writeup-content">
        <form onSubmit={handleSubmit} className="writeup-form">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              rows={6}
              required
            />
          </div>

          {status === 'success' && (
            <div className="status-message success">
              ✓ Opening your email client...
            </div>
          )}

          <button type="submit" className="writeup-submit-btn" disabled={isSending}>
            {isSending ? (
              <>Sending...</>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>
        </form>

        <div className="writeup-footer">
          <p>You can also reach me at:</p>
          <a href="mailto:idraezynoks@gmail.com" className="email-link">
            idraezynoks@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Writeup;