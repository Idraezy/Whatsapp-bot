import { useState, useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import Collaborations, { Collaboration } from './components/Collaboration';
import Skills, { Skill } from './components/Skills';
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
  const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'collaborations' | 'skills'>('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

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

  // Collaborations/Experience data - ADD YOUR EXPERIENCE HERE
  const collaborations: Collaboration[] = [
    {
      id: '1',
      company: 'Tech Startup Inc',
      role: 'Frontend Developer',
      period: '2023 - Present',
      description: 'Building scalable web applications with React and TypeScript',
      logo: '🚀',
    },
    {
      id: '2',
      company: 'Web3 Foundation',
      role: 'Web3 Ambassador',
      period: '2022 - Present',
      description: 'Promoting blockchain technology and decentralized applications',
      logo: '⛓️',
    },
    {
      id: '3',
      company: 'Design Agency',
      role: 'UI/UX Designer',
      period: '2021 - 2023',
      description: 'Created user-centered designs for mobile and web applications',
      logo: '🎨',
    },
    {
      id: '4',
      company: 'Freelance',
      role: 'Full Stack Developer',
      period: '2020 - 2021',
      description: 'Delivered custom solutions for various clients worldwide',
      logo: '💼',
    },
  ];

  // Skills data - ADD YOUR SKILLS HERE
  const skills: Skill[] = [
    // Frontend
    { id: '1', name: 'React.js', category: 'Frontend', level: 95, icon: '⚛️' },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 90, icon: '📘' },
    { id: '3', name: 'Next.js', category: 'Frontend', level: 85, icon: '▲' },
    { id: '4', name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: '🎨' },
    { id: '5', name: 'JavaScript', category: 'Frontend', level: 95, icon: '💛' },
    { id: '6', name: 'HTML/CSS', category: 'Frontend', level: 98, icon: '🌐' },
    
    // Backend
    { id: '7', name: 'Node.js', category: 'Backend', level: 80, icon: '🟢' },
    { id: '8', name: 'Express.js', category: 'Backend', level: 75, icon: '🚂' },
    { id: '9', name: 'MongoDB', category: 'Backend', level: 70, icon: '🍃' },
    
    // Tools & Others
    { id: '10', name: 'Git/GitHub', category: 'Tools', level: 90, icon: '🔀' },
    { id: '11', name: 'Figma', category: 'Design', level: 85, icon: '🎭' },
    { id: '12', name: 'Smart Contracts', category: 'Web3', level: 65, icon: '📜' },
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

      case STATES.INTRO_1:
        handleIntro1();
        break;

      case STATES.INTRO_2:
        handleIntro2();
        break;

      case STATES.INTRO_3:
        handleIntro3();
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
    const firstMessage = `Awesome 😎\n\nWhat would you like to know about me?`;
    addBotMessage(firstMessage, 1000);
    // Wait a bit then ask for image
    setTimeout(() => {
      addBotMessage('But first, please upload your image 📸', 1500);
      setCurrentState(STATES.ASK_IMAGE);
    }, 2500);
  };

  // Handle image upload
  const handleImageUpload = (file: File): void => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUserImage(base64);
      localStorage.setItem('user-image', base64);
      
      // Add a small delay before asking for bot name to ensure state updates
      setTimeout(() => {
        addBotMessage("Nice 👍 What would you love to call me?", 800);
        setCurrentState(STATES.ASK_BOT_NAME);
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  // Handle bot name input
  const handleBotNameInput = (name: string): void => {
    setBotName(name.trim());
    localStorage.setItem('bot-name', name.trim());
    addBotMessage(`Great! I'm now ${name.trim()}, your AI. 🤖`, 1000);
    // Start introduction flow after a delay
    setTimeout(() => {
      const intro1 = `Okay... Let me introduce myself briefly...\n\nMy Name still Remains...\n\nIdara Etim.\n\nI'm a Frontend Developer skilled in HTML, CSS, JavaScript, React.js, TypeScript, Tailwind CSS, and Next.js, with a strong passion for building intuitive, user-focused solutions.`;
      addBotMessage(intro1, 1500);
      setCurrentState(STATES.INTRO_2);
    }, 2500);
  };

  // Handle second interaction - send introduction part 2
  const handleIntro2 = (): void => {
    const intro2 = `Currently expanding expertise in backend development and smart contract development, with additional strengths in graphic design and active involvement as a Web3 Ambassador.`;
    addBotMessage(intro2, 2000);
    setCurrentState(STATES.INTRO_3);
  };

  // Handle third interaction - show menu
  const handleIntro3 = (): void => {
    const menuMessage = `Do you want to know\n\nA️⃣ About Me or\nB️⃣ Projects or see my\nC️⃣ Contact Information\n\nPlease type A, B, or C.`;
    addBotMessage(menuMessage, 1500);
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
    const aboutText = `📖 About Me\n\nI'm a passionate Full Stack Developer with expertise in:\n• React & Modern JavaScript\n• Node.js & Express\n• UI/UX Design\n• Cloud Technologies\n\nI love building user-friendly applications that solve real-world problems!\n\n---\n\nWhat else would you like to know?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
    addBotMessage(aboutText, 1200);
    setCurrentState(STATES.SHOW_ABOUT);
    setInvalidAttempts(0); // Reset counter on valid choice
  };

  // Show Projects section
  const handleProjectsChoice = (): void => {
    const projectsText = `💼 My Projects\n\nCheck out the projects list in the middle panel! 👈\nClick on any project to learn more about it.\n\nYou can also view:\n\n1. E-Commerce Platform\n   Built with React, Node.js, MongoDB\n\n2. Task Management App\n   Built with React, Firebase\n\n3. Weather Dashboard\n   Built with React, API Integration\n\n---\n\nWhat else would you like to know?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
    addBotMessage(projectsText, 1200);
    setCurrentState(STATES.SHOW_PROJECTS);
    setInvalidAttempts(0); // Reset counter on valid choice
  };

  // Show Contact Information section
  const handleContactChoice = (): void => {
    const contactText = `📞 Contact Information\n\nYou can find all my social links in the middle panel! 👈\nClick on any platform to connect with me.\n\n📧 Email: developer@example.com\n🔗 LinkedIn: linkedin.com/in/yourprofile\n💻 GitHub: github.com/yourprofile\n🌐 Portfolio: www.yourportfolio.com\n📱 Phone: +1 (555) 123-4567\n\n---\n\nFeel free to reach out!\n\nWhat else would you like to explore?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
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
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          userImage={userImage}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Middle Panel - Projects, Contact, Collaborations, or Skills */}
        {activeTab === 'projects' && (
          <ProjectsList projects={projects} onProjectClick={handleProjectClick} />
        )}
        {activeTab === 'contact' && (
          <ContactInfo contacts={contactLinks} />
        )}
        {activeTab === 'collaborations' && (
          <Collaborations collaborations={collaborations} />
        )}
        {activeTab === 'skills' && (
          <Skills skills={skills} />
        )}

        {/* Right Panel - Chat Section */}
        <div className="chat-wrapper">
          <ChatHeader
            botName={botName}
            userImage={userImage}
            theme={theme}
            onToggleTheme={toggleTheme}
            onMenuClick={() => setIsSidebarOpen(true)}
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