import { useState, useEffect, useRef } from 'react';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import Collaborations, { Collaboration } from './components/Collaboration';
import Skills, { Skill } from './components/Skills';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import ChatInput from './components/ChatInput';
import TypingIndicator from './components/TypingIndicator';

// Mobile components
import BottomNav, { MobileTab } from './components/BottomNav';
import MobileAnnouncement from './components/MobileAnnouncement';
import MobileMessageMe from './components/MobileMessageMe';
import FloatingChatButton from './components/FloatingChatButton';
import MobileProjectsList from './components/MobileProjectsList';

// Assets
import logo from './assets/logo.png';
import logoo from './assets/logoo.jpeg';
import logooo from './assets/logooo.png';
import logoooo from './assets/logoooo.jpeg';
import logooooo from './assets/logooooo.jpeg';
import prof from './assets/prof.jpg';
import nft from './assets/nft.png';
import cola from './assets/cola.png';
import colaa from './assets/colaa.jpg';
import colaaa from './assets/colaaa.jpg';

// Types
import { Message, STATES, StateType } from './types';

function App() {
  // ---------------- STATES ---------------- //
  // Sidebar and layout
  const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'collaborations' | 'skills'>('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Chat state
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentState, setCurrentState] = useState<StateType>(STATES.ASK_NAME);
  const [userName, setUserName] = useState<string>('');
  const [botName, setBotName] = useState<string>(localStorage.getItem('bot-name') || 'Portfolio Bot');
  const [userImage, setUserImage] = useState<string | null>(localStorage.getItem('user-image'));
  const [invalidAttempts, setInvalidAttempts] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // ---------------- PERSONAL INFO ---------------- //
  const projects: Project[] = [
    { id: '1', name: "E-Commerce Platform", description: "Modern e-commerce platform for fashion & lifestyle.", link: "https://dali-m2rk.vercel.app/", icon: logo },
    { id: '2', name: "ATS Pro – Resume & ATS Checker", description: "Frontend app that analyzes resumes against job descriptions.", link: "https://at-sify.vercel.app/", icon: logoo },
    { id: '3', name: "Landing Page Generator", description: "AI-powered landing page generator with preview.", link: "https://landing-page-generator-taupe.vercel.app/", icon: logooo },
    { id: '4', name: "Smart Invoice", description: "Create, manage, and export professional invoices.", link: "https://smart-invoice-eta.vercel.app/", icon: logoooo },
    { id: '5', name: "ClientPilot", description: "Client management dashboard for freelancers.", link: "https://client-pilot-mini-app.vercel.app/", icon: logooooo },
    { id: '6', name: "Portfolio Website", description: "My personal portfolio with modern designs.", link: "https://idaraetim-portfolio.vercel.app/", icon: prof },
    { id: '7', name: "NFT Marketplace", description: "Decentralized NFT marketplace with smart contracts.", link: "https://nft-marketplace-22.vercel.app/", icon: nft },
  ];

  const contacts: ContactLink[] = [
    { id: '1', platform: 'GitHub', username: '@Idraezy', url: 'https://github.com/Idraezy', icon: 'Github', bgColor: '#000000' },
    { id: '2', platform: 'LinkedIn', username: 'Idara Etim', url: 'https://www.linkedin.com/in/etimidaraubong', icon: 'Linkedin', bgColor: '#0077B5' },
    { id: '3', platform: 'Twitter (X)', username: '@Idara_etimm', url: 'https://twitter.com/Idara_etimm', icon: 'Twitter', bgColor: '#1DA1F2' },
    { id: '4', platform: 'Facebook', username: 'Idara Etim', url: 'https://facebook.com/idaraetimm', icon: 'Facebook', bgColor: '#1877F2' },
    { id: '5', platform: 'Instagram', username: '@idaraetimm', url: 'https://instagram.com/idaraetimm', icon: 'Instagram', bgColor: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' },
    { id: '6', platform: 'TikTok', username: '@idara_etim', url: 'https://tiktok.com/@idara_etim', icon: 'Music', type: 'tiktok', bgColor: '#000000' },
    { id: '7', platform: 'WhatsApp', username: 'Chat on WhatsApp', url: 'https://wa.me/2347045256955', icon: 'MessageCircle', type: 'whatsapp', bgColor: '#25D366' },
    { id: '8', platform: 'Email', username: 'idraezynoks@gmail.com', url: 'mailto:idraezynoks@gmail.com', icon: 'Mail', bgColor: 'linear-gradient(135deg, #0087F4 0%, #DB0000 25%, #FF2F19 45%, #FFB900 70%, #00AA5A 100%)' },
  ];

  const collaborations: Collaboration[] = [
    { id: '1', company: 'Chaindustry', role: 'Frontend Developer', period: '2023 - Present', description: 'Worked on real-world frontend projects.', logo: cola },
    { id: '2', company: 'HNG', role: 'Frontend Developer (Internship)', period: '2022 - Present', description: 'Internship building production-ready frontend apps.', logo: colaaa },
    { id: '3', company: 'FlexiSAF', role: 'Senior Frontend Developer', period: '2025 - Present', description: 'Building modern, responsive web interfaces.', logo: colaa },
    { id: '4', company: 'Dali Wears', role: 'Full Stack Developer', period: '2024 - Present', description: 'Building responsive and animated web interfaces.', logo: logo },
  ];

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

  // ---------------- EFFECTS ---------------- //
  useEffect(() => {
    // Load theme
    const savedTheme = localStorage.getItem('whatsapp-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initial greeting
    addBotMessage('Hello 👋! What is your name?', 1000);
  }, []);

  // ---------------- CHAT UTILS ---------------- //
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('whatsapp-theme', newTheme);
  };

  const addBotMessage = (text: string, delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), text, sender: 'bot', timestamp: new Date() }]);
      setIsTyping(false);
    }, delay);
  };

  const handleUserMessage = (text: string) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user', timestamp: new Date() }]);
    handleBotReply(text);
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImage(reader.result as string);
      localStorage.setItem('user-image', reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ---------------- SIMPLE BOT LOGIC ---------------- //
  const handleBotReply = (userText: string) => {
    const normalized = userText.trim().toLowerCase();
    if (normalized.includes('project')) addBotMessage('Sure! You can check my projects in the projects panel. 🚀', 1200);
    else if (normalized.includes('contact')) addBotMessage('You can reach me via GitHub, LinkedIn, or Email. 📧', 1200);
    else addBotMessage("I'm here to help! Ask me about projects, contact, or skills. 🤖", 1200);
  };

  // ---------------- RENDER ---------------- //
  return (
    <div className="app-container">
      <div className="whatsapp-layout">

        {/* DESKTOP LAYOUT */}
        <div className="desktop-layout">
          <Sidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            userImage={userImage}
          />

          {activeTab === 'projects' && <ProjectsList projects={projects} onProjectClick={() => {}} />}
          {activeTab === 'contact' && <ContactInfo contacts={contacts} />}
          {activeTab === 'collaborations' && <Collaborations collaborations={collaborations} />}
          {activeTab === 'skills' && <Skills skills={skills} />}

          <div className="chat-wrapper">
            <ChatHeader
              botName={botName}
              userImage={userImage}
              theme={theme}
              onToggleTheme={toggleTheme}
              onMenuClick={() => setIsSidebarOpen(true)}
            />

            <div className="messages-container">
              {messages.map(msg => <MessageBubble key={msg.id} message={msg} />)}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            <ChatInput onSendMessage={handleUserMessage} onImageUpload={handleImageUpload} />
          </div>
        </div>

        {/* MOBILE LAYOUT */}
        <div className="mobile-layout">
          <div className="mobile-sticky-top">
            <MobileAnnouncement title="Latest Update" message="New projects added! Check them out." onClick={() => {}} />
            <MobileMessageMe onClick={() => {}} />
          </div>

          <div className="mobile-content-area">
            <MobileProjectsList projects={projects.map(p => ({ id: p.id, name: p.name, preview: p.description, icon: p.icon, timestamp: 'Today' }))} onProjectClick={() => {}} />
          </div>

          <BottomNav activeTab={'projects'} onTabChange={() => {}} />
          <FloatingChatButton onClick={() => {}} />
        </div>
      </div>
    </div>
  );
}

export default App;
