import { useState, useEffect, useRef } from 'react';
import './App.css';

// Desktop components
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import Collaborations, { Collaboration } from './components/Collaboration';
import Skills, { Skill } from './components/Skills';
import Announcement from './components/Announcement';
import Writeup from './components/Writeup';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import { Message, STATES, StateType } from './types';

// Mobile components (NEW)
import BottomNav, { MobileTab } from './components/BottomNav';
import MobileAnnouncement from './components/MobileAnnouncement';
import MobileMessageMe from './components/MobileMessageMe';
import FloatingChatButton from './components/FloatingChatButton';
import MobileProjectsList from './components/MobileProjectsList';
import MobileContactsList from './components/MobileContactsList';
import MobileCollaborationsList from './components/MobileCollaborationsList';
import MobileToolsList from './components/MobileToolsList';
import MobileChatPage from './components/MobileChatPage';

// Import project images
import logo from './assets/logo.png';
import logoo from './assets/logoo.jpeg';
import logooo from './assets/logooo.png';
import logoooo from './assets/logoooo.jpeg';
import logooooo from './assets/logooooo.jpeg';
import prof from './assets/prof.jpg';
import nft from './assets/nft.png';

// Import collaboration company logos
import cola from './assets/cola.png';
import colaa from './assets/colaa.jpg';
import colaaa from './assets/colaaa.jpg';
import { Moon, Sun } from 'lucide-react';

function App() {
  // Desktop state (existing)
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
  const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup'>('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [showMobilePanel, setShowMobilePanel] = useState<boolean>(false);

  // Mobile state (NEW)
  // Mobile state (UPDATED)
  const [mobileTab, setMobileTab] = useState<MobileTab>('projects');
  const [showMobileChatPage, setShowMobileChatPage] = useState<boolean>(false); // For floating chat button
  const [showMobileChatInput, setShowMobileChatInput] = useState<boolean>(false);

  // const [showMobilePanel, setShowMobilePanel] = useState<boolean>(false); // For desktop components
  const [mobileSearchQuery, setMobileSearchQuery] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Projects data
  const projects: Project[] = [
    {
      id: '1',
      name: "E-Commerce Platform",
      description:
        "A modern e-commerce platform for fashion and lifestyle products, featuring clothing items and Pinterest frames. Built for elegant design, smooth animations, and a seamless user experience with React, TypeScript, Tailwind CSS, Framer Motion, React Router DOM, and Lucide React.",
      link: "https://dali-m2rk.vercel.app/",
      icon: logo,
    },
    {
      id: '2',
      name: "ATS Pro – Resume & ATS Checker",
      description:
        "A frontend application that analyzes resumes against job descriptions and provides intelligent ATS-based suggestions using React, TypeScript, Tailwind CSS, Framer Motion, and LocalStorage.",
      link: "https://at-sify.vercel.app/",
      icon: logoo,
    },
    {
      id: '3',
      name: "Landing Page Generator",
      description:
        "An AI-powered landing page generator with real-time preview and customizable themes built using React, TypeScript, Tailwind CSS, Framer Motion, and Figma.",
      link: "https://landing-page-generator-taupe.vercel.app/",
      icon: logooo,
    },
    {
      id: '4',
      name: "Smart Invoice",
      description:
        "A web application for creating, managing, and exporting professional invoices, built with Next.js, React, Tailwind CSS, and JavaScript.",
      link: "https://smart-invoice-eta.vercel.app/",
      icon: logoooo,
    },
    {
      id: '5',
      name: "ClientPilot",
      description:
        "A lightweight client management dashboard for freelancers and small businesses to track clients, statuses, and notes in one place using React, TypeScript, Tailwind CSS, and Framer Motion.",
      link: "https://client-pilot-mini-app.vercel.app/",
      icon: logooooo,
    },
    {
      id: '6',
      name: "Portfolio Website",
      description: "My Personal portfolio with modern designs and smooth animations built using React, TypeScript, Tailwind CSS, Framer Motion, and Figma.",
      link: "https://idaraetim-portfolio.vercel.app/",
      icon: prof,
    },
    {
      id: '7',
      name: "NFT Marketplace",
      description:
        "A decentralized marketplace for trading NFTs with wallet connectivity and smart contract integration built using React, TypeScript, Tailwind CSS, Solidity, Framer Motion, and designed in Figma.",
      link: "https://nft-marketplace-22.vercel.app/",
      icon: nft,
    },
  ];

  // Contact/Social links
  const contactLinks: ContactLink[] = [
    {
      id: '1',
      platform: 'GitHub',
      username: '@Idraezy',
      url: 'https://github.com/Idraezy',
      icon: 'Github',
      bgColor: '#000000',
    },
    {
      id: '2',
      platform: 'LinkedIn',
      username: 'Idara Etim',
      url: 'https://www.linkedin.com/in/etimidaraubong',
      icon: 'Linkedin',
      bgColor: '#0077B5',
    },
    {
      id: '3',
      platform: 'Twitter (X)',
      username: '@Idara_etimm',
      url: 'https://twitter.com/Idara_etimm',
      icon: 'Twitter',
      bgColor: '#1DA1F2',
    },
    {
      id: '4',
      platform: 'Facebook',
      username: 'Idara Etim',
      url: 'https://facebook.com/idaraetimm',
      icon: 'Facebook',
      bgColor: '#1877F2',
    },
    {
      id: '5',
      platform: 'Instagram',
      username: '@idaraetimm',
      url: 'https://instagram.com/idaraetimm',
      icon: 'Instagram',
      bgColor: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    },
    {
      id: '6',
      platform: 'TikTok',
      username: '@idara_etim',
      url: 'https://tiktok.com/@idara_etim',
      icon: 'Music',
      type: 'tiktok',
      bgColor: '#000000',
    },
    {
      id: '7',
      platform: 'WhatsApp',
      username: 'Chat on WhatsApp',
      url: 'https://wa.me/2347045256955',
      icon: 'MessageCircle',
      type: 'whatsapp',
      bgColor: '#25D366',
    },
    {
      id: '8',
      platform: 'Email',
      username: 'idraezynoks@gmail.com',
      url: 'mailto:idraezynoks@gmail.com',
      icon: 'Mail',
      bgColor: `linear-gradient(135deg, #0087F4 0%, #DB0000 25%, #FF2F19 45%, #FFB900 70%, #00AA5A 100%)`,
    },
  ];

  // Collaborations/Experience data
  const collaborations: Collaboration[] = [
    {
      id: '1',
      company: 'Chaindustry',
      role: 'Frontend Developer',
      period: '2023 - Present',
      description: 'Worked on real-world frontend projects in a collaborative development environment.',
      logo: cola,
    },
    {
      id: '2',
      company: 'HNG',
      role: 'Frontend Developer (Internship)',
      period: '2024 - 2025',
      description: 'Participated in an intensive internship focused on building production-ready frontend applications.',
      logo: colaaa,
    },
    {
      id: '3',
      company: 'FlexiSAF',
      role: 'Senior Frontend Developer',
      period: '2025 - Present',
      description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
      logo: colaa,
    },
    {
      id: '4',
      company: 'Dali Wears',
      role: 'Full Stack Developer',
      period: '2024 - Present',
      description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
      logo: logo,
    },
  ];

  // Skills data
  const skills: Skill[] = [
    { id: '1', name: 'React.js', category: 'FRONTEND', level: 95, icon: 'Component' },
    { id: '2', name: 'TypeScript', category: 'FRONTEND', level: 90, icon: 'FileCode' },
    { id: '3', name: 'Next.js', category: 'FRONTEND', level: 85, icon: 'Triangle' },
    { id: '4', name: 'Tailwind CSS', category: 'FRONTEND', level: 95, icon: 'Paintbrush' },
    { id: '5', name: 'JavaScript', category: 'FRONTEND', level: 95, icon: 'Code' },
    { id: '6', name: 'HTML/CSS', category: 'FRONTEND', level: 98, icon: 'Globe' },
    { id: '7', name: 'Node.js', category: 'BACKEND', level: 80, icon: 'Server' },
    { id: '8', name: 'Express.js', category: 'BACKEND', level: 75, icon: 'Zap' },
    { id: '9', name: 'MongoDB', category: 'BACKEND', level: 70, icon: 'Database' },
    { id: '10', name: 'Git/GitHub', category: 'TOOLS', level: 90, icon: 'GitBranch' },
    { id: '11', name: 'Figma', category: 'DESIGN', level: 85, icon: 'Figma' },
    { id: '12', name: 'Smart Contracts', category: 'WEB3', level: 65, icon: 'FileText' },
  ];

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

  // Auto-scroll to bottom
  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initialize chat
  useEffect(() => {
    const initialMessage: Message = {
      id: Date.now(),
      text: 'Hello 👋 What is your name?',
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, []);

  // Bot response generator
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

  // Handle user message
  const handleUserMessage = (userInput: string): void => {
    const userMessage: Message = {
      id: Date.now(),
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

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

  const handleNameInput = (name: string): void => {
    setUserName(name.trim());
    const firstMessage = `Awesome 😎\n\nWhat would you like to know about me?`;
    addBotMessage(firstMessage, 1000);
    setTimeout(() => {
      addBotMessage('But first, please upload your image 📸', 1500);
      setCurrentState(STATES.ASK_IMAGE);
    }, 2500);
  };

  const handleImageUpload = (file: File): void => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setUserImage(base64);
      localStorage.setItem('user-image', base64);
      setTimeout(() => {
        addBotMessage("Nice 👍 What would you love to call me?", 800);
        setCurrentState(STATES.ASK_BOT_NAME);
      }, 100);
    };
    reader.readAsDataURL(file);
  };

  const handleBotNameInput = (name: string): void => {
    setBotName(name.trim());
    localStorage.setItem('bot-name', name.trim());
    addBotMessage(`Great! I'm now ${name.trim()}, your AI. 🤖`, 1000);
    setTimeout(() => {
      const intro1 = `Okay... Let me introduce myself briefly...🙂\n\nMy Name still Remains...\n\nIdara Etim.\n\nI'm a Frontend Developer skilled in HTML, CSS, JavaScript, React.js, TypeScript, Tailwind CSS, and Next.js, with a strong passion for building intuitive, user-focused solutions.`;
      addBotMessage(intro1, 1500);
      setCurrentState(STATES.INTRO_2);
    }, 2500);
  };

  const handleIntro1 = (): void => {
    handleIntro2();
  };

  const handleIntro2 = (): void => {
    const intro2 = `Currently expanding expertise in backend development and smart contract development, with additional strengths in graphic design and active involvement as a Web3 Ambassador.`;
    addBotMessage(intro2, 2000);
    setCurrentState(STATES.INTRO_3);
  };

  const handleIntro3 = (): void => {
    const menuMessage = `What would you like to explore? 👇\n\nA️. About Me \nB️. Projects  \nC️. Contact Information  \n\nPlease type A, B, or C.`;
    addBotMessage(menuMessage, 1500);
    setCurrentState(STATES.ASK_CHOICE);
    setInvalidAttempts(0);
  };

  const handleProjectClick = (project: Project): void => {
    addBotMessage(
      `🚀 ${project.name}\n\n${project.description}\n\n🔗 Link: ${project.link}\n\nClick the link to visit the project!`,
      800
    );
  };

  const handleChoiceInput = (choice: string): void => {
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

  const handleAboutChoice = (): void => {
    const aboutText = `📖 About Me\n\nI'm a passionate Frontend Developer with expertise in:\n• React & Modern JavaScript\n• Node.js & Express\n• UI/UX Design\n• Cloud Technologies\n\nI love building user-friendly applications that solve real-world problems!\n\n---\n\nWhat else would you like to know?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    addBotMessage(aboutText, 1200);
    setCurrentState(STATES.SHOW_ABOUT);
    setInvalidAttempts(0);
  };

  const handleProjectsChoice = (): void => {
    const projectsText = `💼 My Projects\n\nCheck out the projects list in the middle panel! 👈\nClick on any project to learn more about it.\n\nYou can also view:\n\n1. E-Commerce Platform\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and Designed in Figma.\n\n2. ATS Pro – Resume & ATS Checker\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and LocalStorage.\n\n3.  Landing Page Generator\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and Figma. etc\n\n---\n\nWhat else would you like to know?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    addBotMessage(projectsText, 1200);
    setCurrentState(STATES.SHOW_PROJECTS);
    setInvalidAttempts(0);
  };

  const handleContactChoice = (): void => {
    const contactText = `📞 Contact Information\n\nYou can find all my social links in the middle panel! 👈\nClick on any platform to connect with me.\n\n📧 Email: idraezynoks@gmail.com\n🔗 LinkedIn: linkedin.com/in/etimidaraubong\n💻 GitHub: github.com/Idraezy\n🌐 Portfolio: idaraetim-portfolio.vercel.app\n📱 WhatsApp: +234 704 525 6955\n\n---\n\nFeel free to reach out! I typically respond within 24 hours\n\nWhat else would you like to explore?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    addBotMessage(contactText, 1200);
    setCurrentState(STATES.SHOW_CONTACT);
    setInvalidAttempts(0);
  };

  const handleInvalidChoice = (): void => {
    const newAttempts = invalidAttempts + 1;
    setInvalidAttempts(newAttempts);
    let errorMessage;
    if (newAttempts >= 3) {
      errorMessage = `❌ Invalid choice too many times.\n\nPlease strictly select A, B, or C.\n\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    } else {
      errorMessage = `❌ Please choose only A, B, or C.\n\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    }
    addBotMessage(errorMessage, 800);
  };

  // Mobile handlers (NEW)
  // Mobile handlers (CORRECTED)
  const handleMobileProjectClick = (project: any): void => {
    // Find and click the actual project in desktop component
    handleProjectClick(projects.find(p => p.id === project.id)!);
    // Switch to projects view
    setActiveTab('projects');
    setShowMobilePanel(true);
  };

  const handleMobileContactClick = (contact: any): void => {
    // Open contact link directly
    window.open(contact.url, '_blank');
  };

  const handleMobileCollabClick = (collab: any): void => {
    // Switch to collaborations view
    setActiveTab('collaborations');
    setShowMobilePanel(true);
  };

  const handleMobileToolClick = (skill: any): void => {
    // Switch to skills view
    setActiveTab('skills');
    setShowMobilePanel(true);
  };

  const handleFloatingChatClick = (): void => {
  setShowMobileChatInput(!showMobileChatInput);
};


  const handleMobileChatBack = (): void => {
    // Close fullscreen chat page
    setShowMobileChatPage(false);
  };

  const handleMessageMeClick = (): void => {
    // Navigate to writeup page
    setActiveTab('writeup');
    setShowMobilePanel(true);
  };

  const handleAnnouncementClick = (): void => {
    // Navigate to announcement page
    setActiveTab('announcement');
    setShowMobilePanel(true);
  };

  // Filter mobile projects by search
  const filteredMobileProjects = projects.filter(project =>
    project.name.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(mobileSearchQuery.toLowerCase())
  );


  return (
    <div className="app-container">
      <div className="whatsapp-layout">
        
        {/* ==================== DESKTOP LAYOUT ==================== */}
        <div className="desktop-layout">
          <Sidebar 
            activeTab={activeTab} 
            onTabChange={(tab) => { setActiveTab(tab); setShowMobilePanel(true); }}
            userImage={userImage}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {activeTab === 'projects' && (
            <ProjectsList 
              projects={projects} 
              onProjectClick={handleProjectClick}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'projects'}
            />
          )}

          {activeTab === 'contact' && (
            <ContactInfo 
              contacts={contactLinks}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'contact'}
            />
          )}

          {activeTab === 'collaborations' && (
            <Collaborations 
              collaborations={collaborations}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'collaborations'}
            />
          )}

          {activeTab === 'skills' && (
            <Skills 
              skills={skills}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'skills'}
            />
          )}

          {activeTab === 'announcement' && (
            <Announcement 
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'announcement'}
            />
          )}

          {activeTab === 'writeup' && (
            <Writeup 
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel && activeTab === 'writeup'}
            />
          )}

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

        {/* ==================== MOBILE LAYOUT ==================== */}
       {/* ==================== MOBILE LAYOUT ==================== */}
        <div className="mobile-layout">
          
          {/* Fullscreen Chat Page (Only when FloatingChatButton is clicked) */}
          {showMobileChatPage ? (
            <div className="mobile-fullscreen-chat">
              {/* Chat Header with Back Button */}
              <div className="mobile-chat-header">
                <button 
                  className="mobile-chat-back-btn"
                  onClick={handleMobileChatBack}
                  aria-label="Back"
                >
                  ← Back
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
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? (
                        <Moon size={20} strokeWidth={1.5} />
                      ) : (
                        <Sun size={20} strokeWidth={1.5} />
                      )}
                </button>
              </div>

              {/* Chat Messages */}
              <div className="mobile-fullscreen-messages">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input - THIS IS THE KEY PART */}
              <div className="mobile-fullscreen-input">
                <ChatInput
                  onSendMessage={handleUserMessage}
                  onImageUpload={handleImageUpload}
                  disabled={currentState === STATES.ASK_IMAGE}
                />
              </div>
            </div>
          ) : showMobilePanel ? (
            /* Desktop Component View (When clicking on list items) */
            <div className="mobile-panel-view">
              {activeTab === 'projects' && (
                <ProjectsList 
                  projects={projects} 
                  onProjectClick={handleProjectClick}
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}

              {activeTab === 'contact' && (
                <ContactInfo 
                  contacts={contactLinks}
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}

              {activeTab === 'collaborations' && (
                <Collaborations 
                  collaborations={collaborations}
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}

              {activeTab === 'skills' && (
                <Skills 
                  skills={skills}
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}

              {activeTab === 'announcement' && (
                <Announcement 
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}

              {activeTab === 'writeup' && (
                <Writeup 
                  onClose={() => setShowMobilePanel(false)}
                  isMobileActive={true}
                />
              )}
            </div>
          ) : (
            /* Main Mobile Home View */
            <>
              {/* Sticky Top Sections - ALWAYS VISIBLE ON ALL TABS */}
              <div className="mobile-sticky-top">
                <MobileAnnouncement
                  title="Portfolio Updates"
                  message="New projects and collaborations added! 🚀"
                  onClick={handleAnnouncementClick}
                />
                
                <MobileMessageMe
                  onClick={handleMessageMeClick}
                />
              </div>

              {/* Conditional Search Bar (only on Projects tab) */}
              {mobileTab === 'projects' && (
                <div className="mobile-search-bar">
                  <input 
                    type="text" 
                    placeholder="Search projects..."
                    className="mobile-search-input"
                    value={mobileSearchQuery}
                    onChange={(e) => setMobileSearchQuery(e.target.value)}
                  />
                </div>
              )}

              {/* Tab Content Area - Changes based on active bottom tab */}
              <div className="mobile-content-area">
                {mobileTab === 'projects' && (
                  <MobileProjectsList
                    projects={filteredMobileProjects.map(p => ({
                      id: p.id,
                      name: p.name,
                      preview: p.description.substring(0, 60) + '...',
                      icon: p.icon,
                      timestamp: 'Recent'
                    }))}
                    onProjectClick={handleMobileProjectClick}
                  />
                )}

                {mobileTab === 'calls' && (
                  <MobileContactsList
                    contacts={contactLinks.map(c => ({
                      id: c.id,
                      name: c.platform,
                      username: c.username,
                      icon: c.icon,
                      bgColor: c.bgColor,
                      url: c.url,
                      type: c.type,
                      timestamp: 'Available'
                    }))}
                    onContactClick={handleMobileContactClick}
                  />
                )}

                {mobileTab === 'collaborations' && (
                  <MobileCollaborationsList
                    collaborations={collaborations.map(c => ({
                      id: c.id,
                      name: c.company,
                      role: c.role,
                      period: c.period,
                      logo: c.logo,
                      description: c.description
                    }))}
                    onCollabClick={handleMobileCollabClick}
                  />
                )}

                {mobileTab === 'tools' && (
                  <MobileToolsList
                    tools={skills.map(s => ({
                      id: s.id,
                      name: s.name,
                      category: s.category,
                      level: s.level,
                      icon: s.icon
                    }))}
                    onToolClick={handleMobileToolClick}
                  />
                )}
              </div>

              {/* Bottom Navigation */}
              <BottomNav
                activeTab={mobileTab}
                onTabChange={setMobileTab}
              />

              {/* Floating Chat Button */}
              <FloatingChatButton
                onClick={handleFloatingChatClick}
              />
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default App;