import { useEffect, useRef, useState } from 'react';
import './App.css';

// ---------------- COMPONENTS ----------------
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import Collaborations, { Collaboration } from './components/Collaboration';
import Skills, { Skill } from './components/Skills';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';
import Announcement from './components/Announcement';
import Writeup from './components/Writeup';

// ---------------- MOBILE COMPONENTS ----------------
import MobileProjectsList from './components/MobileProjectsList';
import MobileChatPage from './components/MobileChatPage';

// ---------------- TYPES ----------------
import { Message, STATES, StateType } from './types';

// ---------------- ASSETS ----------------
import logo from './assets/logo.png';
import prof from './assets/prof.jpg';
import nft from './assets/nft.png';
import cola from './assets/cola.png';
import colaa from './assets/colaa.jpg';
import colaaa from './assets/colaaa.jpg';

function App() {
  // ---------------- LAYOUT STATE ----------------
  const [activeTab, setActiveTab] = useState<
    'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup'
  >('projects');

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(true);

  // ---------------- MOBILE STATE ----------------
  const [mobileTab] = useState<'projects' | 'calls' | 'collaborations' | 'tools'>('projects');
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [currentMessages, setCurrentMessages] = useState<
    { id: string; sender: 'me' | 'other'; text: string; timestamp: string }[]
  >([]);

  // ---------------- CHAT STATE ----------------
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<StateType>(STATES.ASK_NAME);
  const [userName, setUserName] = useState('');
  const [botName, setBotName] = useState(
    localStorage.getItem('bot-name') || 'Portfolio Bot'
  );
  const [userImage, setUserImage] = useState<string | null>(
    localStorage.getItem('user-image')
  );
  const [invalidAttempts, setInvalidAttempts] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  // ---------------- THEME ----------------
  const [theme, setTheme] = useState<'light' | 'dark'>(
    (localStorage.getItem('whatsapp-theme') as 'light' | 'dark') || 'light'
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------- DATA ----------------
  const projects: Project[] = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      description: 'Modern fashion & lifestyle e-commerce app.',
      link: 'https://dali-m2rk.vercel.app/',
      icon: logo,
    },
    {
      id: '2',
      name: 'ATS Pro – Resume Checker',
      description: 'ATS resume analyzer built with React.',
      link: 'https://at-sify.vercel.app/',
      icon: prof,
    },
    {
      id: '3',
      name: 'NFT Marketplace',
      description: 'Decentralized NFT marketplace.',
      link: 'https://nft-marketplace-22.vercel.app/',
      icon: nft,
    },
  ];

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
      url: 'https://linkedin.com/in/etimidaraubong',
      icon: 'Linkedin',
      bgColor: '#0077B5',
    },
    {
      id: '3',
      platform: 'Email',
      username: 'idraezynoks@gmail.com',
      url: 'mailto:idraezynoks@gmail.com',
      icon: 'Mail',
      bgColor:
        'linear-gradient(135deg,#0087F4 0%,#DB0000 25%,#FF2F19 45%,#FFB900 70%,#00AA5A 100%)',
    },
  ];

  const collaborations: Collaboration[] = [
    {
      id: '1',
      company: 'Chaindustry',
      role: 'Frontend Developer',
      period: '2023 - Present',
      description: 'Frontend development on real-world apps.',
      logo: cola,
    },
    {
      id: '2',
      company: 'HNG',
      role: 'Frontend Intern',
      period: '2022',
      description: 'Built production-ready frontend apps.',
      logo: colaaa,
    },
    {
      id: '3',
      company: 'FlexiSAF',
      role: 'Senior Frontend Developer',
      period: '2025 - Present',
      description: 'Building scalable UI systems.',
      logo: colaa,
    },
  ];

  const skills: Skill[] = [
    { id: '1', name: 'React', category: 'FRONTEND', level: 95, icon: 'Component' },
    { id: '2', name: 'TypeScript', category: 'FRONTEND', level: 90, icon: 'FileCode' },
    { id: '3', name: 'Tailwind CSS', category: 'FRONTEND', level: 95, icon: 'Paintbrush' },
    { id: '4', name: 'Node.js', category: 'BACKEND', level: 80, icon: 'Server' },
  ];

  // ---------------- EFFECTS ----------------
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('whatsapp-theme', theme);
  }, [theme]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    setMessages([
      {
        id: Date.now(),
        text: 'Hello 👋 What is your name?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  }, []);

  // ---------------- BOT UTIL ----------------
  const addBotMessage = (text: string, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text, sender: 'bot', timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, delay);
  };

  // ---------------- HANDLERS ----------------
  const handleUserMessage = (input: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: 'user', timestamp: new Date() },
    ]);
  };

  const handleProjectClick = (project: Project) => {
    addBotMessage(
      `🚀 ${project.name}\n\n${project.description}\n\n🔗 ${project.link}`,
      800
    );
  };

  // ---------------- RENDER ----------------
  return (
    <div className="app-container">
      {/* ================= DESKTOP ================= */}
      <div className="desktop-layout">
        <div className="whatsapp-layout">
          <Sidebar
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab);
              setShowMobilePanel(true);
            }}
            userImage={userImage}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {activeTab === 'projects' && (
            <ProjectsList
              projects={projects}
              onProjectClick={handleProjectClick}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel}
            />
          )}

          {activeTab === 'contact' && (
            <ContactInfo
              contacts={contactLinks}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel}
            />
          )}

          {activeTab === 'collaborations' && (
            <Collaborations
              collaborations={collaborations}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel}
            />
          )}

          {activeTab === 'skills' && (
            <Skills
              skills={skills}
              onClose={() => setShowMobilePanel(false)}
              isMobileActive={showMobilePanel}
            />
          )}

          <div className="chat-wrapper">
            <ChatHeader
              botName={botName}
              userImage={userImage}
              theme={theme}
              onToggleTheme={() =>
                setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
              }
              onMenuClick={() => setIsSidebarOpen(true)}
            />

            <div className="messages-container">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleUserMessage} />
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="mobile-layout">
        <div className="mobile-content-area">
          {!isMobileChatOpen && mobileTab === 'projects' && (
            <MobileProjectsList
              projects={projects.map((p) => ({
                id: p.id,
                name: p.name,
                preview: p.description,
                icon: p.icon,
                timestamp: 'Today',
              }))}
              onProjectClick={(project) => {
                setIsMobileChatOpen(true);
                setCurrentProject(project);
                setCurrentMessages([
                  {
                    id: '1',
                    sender: 'other',
                    text: 'Hello! Let’s discuss this project.',
                    timestamp: '10:00 AM',
                  },
                ]);
              }}
            />
          )}

          {isMobileChatOpen && currentProject && (
            <MobileChatPage
              projectName={currentProject.name}
              messages={currentMessages}
              onBack={() => setIsMobileChatOpen(false)}
              onSendMessage={(text) =>
                setCurrentMessages((prev) => [
                  ...prev,
                  {
                    id: Date.now().toString(),
                    sender: 'me',
                    text,
                    timestamp: 'Now',
                  },
                ])
              }
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
