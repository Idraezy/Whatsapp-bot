import { useState, useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import { Message, STATES, StateType } from './types';

function App() {
  // State management
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<StateType>(STATES.ASK_NAME);
  const [userName, setUserName] = useState<string>('');
  const [botName, setBotName] = useState<string>(
    localStorage.getItem('bot-name') || 'Portfolio Bot'
  );
  const [userImage, setUserImage] = useState<string | null>(
    localStorage.getItem('user-image')
  );
  const [invalidAttempts, setInvalidAttempts] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [activeTab, setActiveTab] = useState<'projects' | 'contact'>('projects');

  // Projects data - ADD YOUR PROJECTS HERE
  const projects: Project[] = [
    {
      id: '1',
      name: 'WhatsApp Portfolio Bot',
      description: 'Interactive chat bot built with React & TypeScript',
      link: 'https://github.com/yourusername/whatsapp-bot',
      icon: '💬',
    },
    {
      id: '2',
      name: 'E-Commerce Platform',
      description: 'Full-stack online shopping platform',
      link: 'https://github.com/yourusername/ecommerce',
      icon: '🛒',
    },
    {
      id: '3',
      name: 'Task Manager App',
      description: 'Productivity app with real-time sync',
      link: 'https://github.com/yourusername/task-manager',
      icon: '✅',
    },
    {
      id: '4',
      name: 'Weather Dashboard',
      description: 'Beautiful weather forecast application',
      link: 'https://github.com/yourusername/weather-app',
      icon: '🌤️',
    },
    {
      id: '5',
      name: 'Portfolio Website',
      description: 'Personal portfolio with modern design',
      link: 'https://yourportfolio.com',
      icon: '💼',
    },
  ];

  // Contact/Social links - ADD YOUR LINKS HERE
  const contactLinks: ContactLink[] = [
    {
      id: '1',
      platform: 'GitHub',
      username: '@yourusername',
      url: 'https://github.com/yourusername',
      icon: '🐙',
    },
    {
      id: '2',
      platform: 'LinkedIn',
      username: 'Your Name',
      url: 'https://linkedin.com/in/yourprofile',
      icon: '💼',
    },
    {
      id: '3',
      platform: 'Twitter',
      username: '@yourhandle',
      url: 'https://twitter.com/yourhandle',
      icon: '🐦',
    },
    {
      id: '4',
      platform: 'Email',
      username: 'your.email@example.com',
      url: 'mailto:your.email@example.com',
      icon: '✉️',
    },
    {
      id: '5',
      platform: 'Portfolio',
      username: 'yourportfolio.com',
      url: 'https://yourportfolio.com',
      icon: '🌐',
    },
  ];
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('whatsapp-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  // Toggle theme
  const toggleTheme = (): void => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('whatsapp-theme', newTheme);
  };

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize chat with greeting on first load
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now(),
      text: 'Hello 👋 What is your name?',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Bot response generator with typing delay
  const addBotMessage = (text: string, delay: number = 1000): void => {
    setIsTyping(true);
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now(),
        text,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, delay);
  };

  // Main chatbot logic handler
  const handleUserMessage = (userInput: string): void => {
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Process message based on current state
    switch (currentState) {
      case STATES.ASK_NAME:
        handleNameInput(userInput);
        break;

      case STATES.ASK_BOT_NAME:
        handleBotNameInput(userInput);
        break;

      case STATES.ASK_CHOICE:
        handleChoiceInput(userInput);
        break;

      case STATES.SHOW_ABOUT:
      case STATES.SHOW_PROJECTS:
      case STATES.SHOW_CONTACT:
        handleFollowUpChoice(userInput);
        break;

      default:
        break;
    }
  };

  // Handle name input state
  const handleNameInput = (name: string): void => {
    setUserName(name.trim());
    addBotMessage('Please upload your image 📸', 1500);
    setCurrentState(STATES.ASK_IMAGE);
  };

  // Handle image upload
  const handleImageUpload = (file: File): void => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUserImage(base64);
      localStorage.setItem('user-image', base64);
      addBotMessage("Nice 👍 What would you love to call me?", 1200);
      setCurrentState(STATES.ASK_BOT_NAME);
    };
    reader.readAsDataURL(file);
  };

  // Handle bot name
  const handleBotNameInput = (name: string): void => {
    setBotName(name.trim());
    localStorage.setItem('bot-name', name.trim());
    const responseText = `Awesome 😎 I'm now ${name.trim()}, your AI.\n\nWhat would you like to see?\n\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information\n\nPlease type A, B, or C.`;
    addBotMessage(responseText, 1500);
    setCurrentState(STATES.ASK_CHOICE);
    setInvalidAttempts(0);
  };

  // Handle project click
  const handleProjectClick = (project: Project): void => {
    addBotMessage(
      `🚀 ${project.name}\n\n${project.description}\n\n🔗 Link: ${project.link}\n\nClick the link to visit the project!`,
      800
    );
  };

  // Handle menu choice input
  const handleChoiceInput = (choice: string): void => {
    const normalizedChoice = choice.trim().toUpperCase();

    // Validate choice (only A, B, or C allowed)
    if (normalizedChoice === 'A') {
      handleAboutChoice();
    } else if (normalizedChoice === 'B') {
      handleProjectsChoice();
    } else if (normalizedChoice === 'C') {
      handleContactChoice();
    } else {
      handleInvalidChoice();
    }
  };

  // Handle follow-up after showing content
  const handleFollowUpChoice = (choice: string): void => {
    const normalizedChoice = choice.trim().toUpperCase();

    if (normalizedChoice === 'A') {
      handleAboutChoice();
    } else if (normalizedChoice === 'B') {
      handleProjectsChoice();
    } else if (normalizedChoice === 'C') {
      handleContactChoice();
    } else {
      handleInvalidChoice();
    }
  };

  // Show About Me section
  const handleAboutChoice = (): void => {
    const aboutText = `📖 About Me\n\nI'm a passionate Full Stack Developer with expertise in:\n• React & Modern JavaScript\n• Node.js & Express\n• UI/UX Design\n• Cloud Technologies\n\nI love building user-friendly applications that solve real-world problems!\n\n---\n\nWant to see more?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
    addBotMessage(aboutText, 1200);
    setCurrentState(STATES.SHOW_ABOUT);
    setInvalidAttempts(0); // Reset counter on valid choice
  };

  // Show Projects section
  const handleProjectsChoice = (): void => {
    const projectsText = `💼 My Projects\n\n1. E-Commerce Platform\n   Built with React, Node.js, MongoDB\n   • Real-time inventory management\n   • Payment integration\n\n2. Task Management App\n   Built with React, Firebase\n   • Real-time collaboration\n   • Drag-and-drop interface\n\n3. Weather Dashboard\n   Built with React, API Integration\n   • Live weather data\n   • 7-day forecast\n\n---\n\nWhat else would you like to know?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
    addBotMessage(projectsText, 1200);
    setCurrentState(STATES.SHOW_PROJECTS);
    setInvalidAttempts(0); // Reset counter on valid choice
  };

  // Show Contact Information section
  const handleContactChoice = (): void => {
    const contactText = `📞 Contact Information\n\n📧 Email: developer@example.com\n🔗 LinkedIn: linkedin.com/in/yourprofile\n💻 GitHub: github.com/yourprofile\n🌐 Portfolio: www.yourportfolio.com\n📱 Phone: +1 (555) 123-4567\n\n---\n\nFeel free to reach out!\n\nWhat else would you like to explore?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
    addBotMessage(contactText, 1200);
    setCurrentState(STATES.SHOW_CONTACT);
    setInvalidAttempts(0); // Reset counter on valid choice
  };

  // Handle invalid choice with attempt tracking
  const handleInvalidChoice = (): void => {
    const newAttempts = invalidAttempts + 1;
    setInvalidAttempts(newAttempts);

    let errorMessage;
    
    if (newAttempts >= 3) {
      // After 3 invalid attempts, show stricter message
      errorMessage = `❌ Invalid choice too many times.\n\nPlease strictly select A, B, or C.\n\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    } else {
      // Standard error message
      errorMessage = `❌ Please choose only A, B, or C.\n\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    }

    addBotMessage(errorMessage, 800);
  };

  return (
    <div className="app-container">
      <div className="whatsapp-layout">
        {/* Left Sidebar - Navigation Icons */}
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Middle Panel - Projects or Contact List */}
        {activeTab === 'projects' ? (
          <ProjectsList projects={projects} onProjectClick={handleProjectClick} />
        ) : (
          <ContactInfo contacts={contactLinks} />
        )}

        {/* Right Panel - Chat Section */}
        <div className="chat-wrapper">
          <ChatHeader
            botName={botName}
            userImage={userImage}
            theme={theme}
            onToggleTheme={toggleTheme}
          />

          <div className="messages-container">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            onSendMessage={handleUserMessage}
            onImageUpload={handleImageUpload}
            disabled={currentState === STATES.ASK_IMAGE}
          />
        </div>
      </div>
    </div>
  );
}

export default App;