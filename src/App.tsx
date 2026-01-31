// import { useState, useEffect, useRef } from 'react';
// import './App.css';
// import Sidebar from './components/Sidebar';
// import ProjectsList, { Project } from './components/ProjectsList';
// import ContactInfo, { ContactLink } from './components/ContactInfo';
// import Collaborations, { Collaboration } from './components/Collaboration';
// import Skills, { Skill } from './components/Skills';
// import Announcement from './components/Announcement';
// import Writeup from './components/Writeup';
// import ChatHeader from './components/ChatHeader';
// import MessageBubble from './components/MessageBubble';
// import TypingIndicator from './components/TypingIndicator';
// import ChatInput from './components/ChatInput';
// import { Message, STATES, StateType } from './types';

// // Import project images
// import logo from './assets/logo.png';
// import logoo from './assets/logoo.jpeg';
// import logooo from './assets/logooo.png';
// import logoooo from './assets/logoooo.jpeg';
// import logooooo from './assets/logooooo.jpeg';
// import prof from './assets/prof.jpg';
// import nft from './assets/nft.png';

// // Import collaboration company logos
// import cola from './assets/cola.png';
// import colaa from './assets/colaa.jpg';
// import colaaa from './assets/colaaa.jpg';


// function App() {
//   // State management
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [currentState, setCurrentState] = useState<StateType>(STATES.ASK_NAME);
//   const [userName, setUserName] = useState<string>('');
//   const [botName, setBotName] = useState<string>(
//     localStorage.getItem('bot-name') || 'Portfolio Bot'
//   );
//   const [userImage, setUserImage] = useState<string | null>(
//     localStorage.getItem('user-image')
//   );
//   const [invalidAttempts, setInvalidAttempts] = useState<number>(0);
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');
//   const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup'>('projects');
//   const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

//   // Projects data - Using imported images
//   const projects: Project[] = [
//     {
//       id: '1',
//       name: "E-Commerce Platform",
//       description:
//         "A modern e-commerce platform for fashion and lifestyle products, featuring clothing items and Pinterest frames. Built for elegant design, smooth animations, and a seamless user experience with React, TypeScript, Tailwind CSS, Framer Motion, React Router DOM, and Lucide React.",
//       link: "https://dali-m2rk.vercel.app/",
//       icon: logo, // Using image
//     },
//     {
//       id: '2',
//       name: "ATS Pro – Resume & ATS Checker",
//       description:
//         "A frontend application that analyzes resumes against job descriptions and provides intelligent ATS-based suggestions using React, TypeScript, Tailwind CSS, Framer Motion, and LocalStorage.",
//       link: "https://at-sify.vercel.app/",
//       icon: logoo, // Using image
//     },
//     {
//       id: '3',
//       name: "Landing Page Generator",
//       description:
//         "An AI-powered landing page generator with real-time preview and customizable themes built using React, TypeScript, Tailwind CSS, Framer Motion, and Figma.",
//       link: "https://landing-page-generator-taupe.vercel.app/",
//       icon: logooo, // Using image
//     },
//     {
//       id: '4',
//       name: "Smart Invoice",
//       description:
//         "A web application for creating, managing, and exporting professional invoices, built with Next.js, React, Tailwind CSS, and JavaScript.",
//       link: "https://smart-invoice-eta.vercel.app/",
//       icon: logoooo, // Using image
//     },
//     {
//       id: '5',
//       name: "ClientPilot",
//       description:
//         "A lightweight client management dashboard for freelancers and small businesses to track clients, statuses, and notes in one place using React, TypeScript, Tailwind CSS, and Framer Motion.",
//       link: "https://client-pilot-mini-app.vercel.app/",
//       icon: logooooo, // Using image
//     },
//     {
//       id: '6',
//       name: "Portfolio Website",
//       description: "My Personal portfolio with modern designs and smooth animations built using React, TypeScript, Tailwind CSS, Framer Motion, and Figma.",
//       link: "https://idaraetim-portfolio.vercel.app/",
//       icon: prof, // Using image
//     },
//     {
//       id: '7',
//       name: "NFT Marketplace",
//       description:
//         "A decentralized marketplace for trading NFTs with wallet connectivity and smart contract integration built using React, TypeScript, Tailwind CSS, Solidity, Framer Motion, and designed in Figma.",
//       link: "https://nft-marketplace-22.vercel.app/",
//       icon: nft, // Using image
//     },
//   ];

//   // Contact/Social links - Using Lucide icon names
//   const contactLinks: ContactLink[] = [
//     {
//       id: '1',
//       platform: 'GitHub',
//       username: '@Idraezy',
//       url: 'https://github.com/Idraezy',
//       icon: 'Github', // Lucide icon
//       bgColor: '#000000', // GitHub black
//     },
//     {
//       id: '2',
//       platform: 'LinkedIn',
//       username: 'Idara Etim',
//       url: 'https://www.linkedin.com/in/etimidaraubong',
//       icon: 'Linkedin', // Lucide icon
//       bgColor: '#0077B5', // LinkedIn blue

//     },
//     {
//       id: '3',
//       platform: 'Twitter (X)',
//       username: '@Idara_etimm',
//       url: 'https://twitter.com/Idara_etimm',
//       icon: 'Twitter', // Lucide icon
//       bgColor: '#1DA1F2', // Twitter blue
//     },
//     {
//       id: '4',
//       platform: 'Facebook',
//       username: 'Idara Etim',
//       url: 'https://facebook.com/idaraetimm',
//       icon: 'Facebook', // Lucide icon
//       bgColor: '#1877F2', // Facebook blue
//     },
//     {
//       id: '5',
//       platform: 'Instagram',
//       username: '@idaraetimm',
//       url: 'https://instagram.com/idaraetimm',
//       icon: 'Instagram', // Lucide icon
//       bgColor: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', // Instagram gradient
//     },
//     {
//       id: '6',
//       platform: 'TikTok',
//       username: '@idara_etim',
//       url: 'https://tiktok.com/@idara_etim',
//       icon: 'Music', // Lucide icon (closest to TikTok)
//       type: 'tiktok',
//       bgColor: '#000000', // TikTok black (can add neon effect later)
//     },
//     {
//       id: '7',
//       platform: 'WhatsApp',
//       username: 'Chat on WhatsApp',
//       url: 'https://wa.me/2347045256955',
//       icon: 'MessageCircle', // Lucide icon
//       type: 'whatsapp',
//       bgColor: '#25D366', // WhatsApp green
//     },
    
//   {
//      id: '8',
//      platform: 'Email',
//      username: 'idraezynoks@gmail.com',
//      url: 'mailto:idraezynoks@gmail.com',
//      icon: 'Mail', // Lucide icon
//      bgColor: `linear-gradient(135deg, #0087F4 0%, #DB0000 25%, #FF2F19 45%, #FFB900 70%, #00AA5A 100%)`,},
// ];

//   // Collaborations/Experience data - Using company logo images
//   const collaborations: Collaboration[] = [
//     {
//       id: '1',
//       company: 'Chaindustry',
//       role: 'Frontend Developer',
//       period: '2023 - Present',
//       description: 'Worked on real-world frontend projects in a collaborative development environment.',
//       logo: cola,
//     },
//     {
//       id: '2',
//       company: 'HNG',
//       role: 'Frontend Developer (Internship)',
//       period: '2024 - 2025',
//       description: 'Participated in an intensive internship focused on building production-ready frontend applications.',
//       logo: colaaa,
//     },
//     {
//       id: '3',
//       company: 'FlexiSAF',
//       role: 'Senior Frontend Developer',
//       period: '2025 - Present',
//       description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
//       logo: colaa,
//     },
//     {
//       id: '4',
//       company: 'Dali Wears',
//       role: 'Full Stack Developer',
//       period: '2024 - Present',
//       description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
//       logo: logo,
//     },
//   ];

//   // Skills data - Using Lucide icon names
//   const skills: Skill[] = [
//     // Frontend
//     { id: '1', name: 'React.js', category: 'FRONTEND', level: 95, icon: 'Component' },
//     { id: '2', name: 'TypeScript', category: 'FRONTEND', level: 90, icon: 'FileCode' },
//     { id: '3', name: 'Next.js', category: 'FRONTEND', level: 85, icon: 'Triangle' },
//     { id: '4', name: 'Tailwind CSS', category: 'FRONTEND', level: 95, icon: 'Paintbrush' },
//     { id: '5', name: 'JavaScript', category: 'FRONTEND', level: 95, icon: 'Code' },
//     { id: '6', name: 'HTML/CSS', category: 'FRONTEND', level: 98, icon: 'Globe' },

// // Backend
//    { id: '7', name: 'Node.js', category: 'BACKEND', level: 80, icon: 'Server' },
//    { id: '8', name: 'Express.js', category: 'BACKEND', level: 75, icon: 'Zap' },
//    { id: '9', name: 'MongoDB', category: 'BACKEND', level: 70, icon: 'Database' },

// // Tools & Others
//    { id: '10', name: 'Git/GitHub', category: 'TOOLS', level: 90, icon: 'GitBranch' },
//    { id: '11', name: 'Figma', category: 'DESIGN', level: 85, icon: 'Figma' },
//    { id: '12', name: 'Smart Contracts', category: 'WEB3', level: 65, icon: 'FileText' },

//   ];
  
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Initialize theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('whatsapp-theme') as 'light' | 'dark' | null;
//     if (savedTheme) {
//       setTheme(savedTheme);
//       document.documentElement.setAttribute('data-theme', savedTheme);
//     }
//   }, []);

//   // Toggle theme
//   const toggleTheme = (): void => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//     document.documentElement.setAttribute('data-theme', newTheme);
//     localStorage.setItem('whatsapp-theme', newTheme);
//   };

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = (): void => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, isTyping]);

//   // Initialize chat with greeting on first load
//   useEffect(() => {
//     const initialMessage: Message = {
//       id: Date.now(),
//       text: 'Hello 👋 What is your name?',
//       sender: 'bot',
//       timestamp: new Date(),
//     };
//     setMessages([initialMessage]);
//   }, []);

//   // Bot response generator with typing delay
//   const addBotMessage = (text: string, delay: number = 1000): void => {
//     setIsTyping(true);
//     setTimeout(() => {
//       const botMessage: Message = {
//         id: Date.now(),
//         text,
//         sender: 'bot',
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, botMessage]);
//       setIsTyping(false);
//     }, delay);
//   };

//   // Main chatbot logic handler
//   const handleUserMessage = (userInput: string): void => {
//     // Add user message to chat
//     const userMessage: Message = {
//       id: Date.now(),
//       text: userInput,
//       sender: 'user',
//       timestamp: new Date(),
//     };
//     setMessages((prev) => [...prev, userMessage]);

//     // Process message based on current state
//     switch (currentState) {
//       case STATES.ASK_NAME:
//         handleNameInput(userInput);
//         break;

//       case STATES.ASK_BOT_NAME:
//         handleBotNameInput(userInput);
//         break;

//       case STATES.INTRO_1:
//         handleIntro1();
//         break;

//       case STATES.INTRO_2:
//         handleIntro2();
//         break;

//       case STATES.INTRO_3:
//         handleIntro3();
//         break;

//       case STATES.ASK_CHOICE:
//         handleChoiceInput(userInput);
//         break;

//       case STATES.SHOW_ABOUT:
//       case STATES.SHOW_PROJECTS:
//       case STATES.SHOW_CONTACT:
//         handleFollowUpChoice(userInput);
//         break;

//       default:
//         break;
//     }
//   };

//   // Handle name input state
//   const handleNameInput = (name: string): void => {
//     setUserName(name.trim());
//     const firstMessage = `Awesome 😎\n\nWhat would you like to know about me?`;
//     addBotMessage(firstMessage, 1000);
//     // Wait a bit then ask for image
//     setTimeout(() => {
//       addBotMessage('But first, please upload your image 📸', 1500);
//       setCurrentState(STATES.ASK_IMAGE);
//     }, 2500);
//   };

//   // Handle image upload
//   const handleImageUpload = (file: File): void => {
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       const base64 = reader.result as string;
//       setUserImage(base64);
//       localStorage.setItem('user-image', base64);
      
//       // Add a small delay before asking for bot name to ensure state updates
//       setTimeout(() => {
//         addBotMessage("Nice 👍 What would you love to call me?", 800);
//         setCurrentState(STATES.ASK_BOT_NAME);
//       }, 100);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle bot name input
//   const handleBotNameInput = (name: string): void => {
//     setBotName(name.trim());
//     localStorage.setItem('bot-name', name.trim());
//     addBotMessage(`Great! I'm now ${name.trim()}, your AI. 🤖`, 1000);
//     // Start introduction flow after a delay
//     setTimeout(() => {
//       const intro1 = `Okay... Let me introduce myself briefly...🙂\n\nMy Name still Remains...\n\nIdara Etim.\n\nI'm a Frontend Developer skilled in HTML, CSS, JavaScript, React.js, TypeScript, Tailwind CSS, and Next.js, with a strong passion for building intuitive, user-focused solutions.`;
//       addBotMessage(intro1, 1500);
//       setCurrentState(STATES.INTRO_2);
//     }, 2500);
//   };

//   // Handle first interaction - triggers intro2
//   const handleIntro1 = (): void => {
//     handleIntro2();
//   };

//   // Handle second interaction - send introduction part 2
//   const handleIntro2 = (): void => {
//     const intro2 = `Currently expanding expertise in backend development and smart contract development, with additional strengths in graphic design and active involvement as a Web3 Ambassador.`;
//     addBotMessage(intro2, 2000);
//     setCurrentState(STATES.INTRO_3);
//   };

//   // Handle third interaction - show menu
//   const handleIntro3 = (): void => {
//     const menuMessage = `What would you like to explore? 👇\n\nA️. About Me \nB️. Projects  \nC️. Contact Information  \n\nPlease type A, B, or C.`;
//     addBotMessage(menuMessage, 1500);
//     setCurrentState(STATES.ASK_CHOICE);
//     setInvalidAttempts(0);
//   };

//   // Handle project click
//   const handleProjectClick = (project: Project): void => {
//     addBotMessage(
//       `🚀 ${project.name}\n\n${project.description}\n\n🔗 Link: ${project.link}\n\nClick the link to visit the project!`,
//       800
//     );
//   };

//   // Handle menu choice input
//   const handleChoiceInput = (choice: string): void => {
//     const normalizedChoice = choice.trim().toUpperCase();

//     // Validate choice (only A, B, or C allowed)
//     if (normalizedChoice === 'A') {
//       handleAboutChoice();
//     } else if (normalizedChoice === 'B') {
//       handleProjectsChoice();
//     } else if (normalizedChoice === 'C') {
//       handleContactChoice();
//     } else {
//       handleInvalidChoice();
//     }
//   };

//   // Handle follow-up after showing content
//   const handleFollowUpChoice = (choice: string): void => {
//     const normalizedChoice = choice.trim().toUpperCase();

//     if (normalizedChoice === 'A') {
//       handleAboutChoice();
//     } else if (normalizedChoice === 'B') {
//       handleProjectsChoice();
//     } else if (normalizedChoice === 'C') {
//       handleContactChoice();
//     } else {
//       handleInvalidChoice();
//     }
//   };

//   // Show About Me section
//   const handleAboutChoice = (): void => {
//     const aboutText = `📖 About Me\n\nI'm a passionate Frontend Developer with expertise in:\n• React & Modern JavaScript\n• Node.js & Express\n• UI/UX Design\n• Cloud Technologies\n\nI love building user-friendly applications that solve real-world problems!\n\n---\n\nWhat else would you like to know?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    
//     addBotMessage(aboutText, 1200);
//     setCurrentState(STATES.SHOW_ABOUT);
//     setInvalidAttempts(0); // Reset counter on valid choice
//   };

//   // Show Projects section
//   const handleProjectsChoice = (): void => {
//     const projectsText = `💼 My Projects\n\nCheck out the projects list in the middle panel! 👈\nClick on any project to learn more about it.\n\nYou can also view:\n\n1. E-Commerce Platform\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and Designed in Figma.\n\n2. ATS Pro – Resume & ATS Checker\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and LocalStorage.\n\n3.  Landing Page Generator\n   Built with React, TypeScript, Tailwind CSS, Framer Motion, and Figma. etc\n\n---\n\nWhat else would you like to know?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    
//     addBotMessage(projectsText, 1200);
//     setCurrentState(STATES.SHOW_PROJECTS);
//     setInvalidAttempts(0); // Reset counter on valid choice
//   };

//   // Show Contact Information section
//   const handleContactChoice = (): void => {
//     const contactText = `📞 Contact Information\n\nYou can find all my social links in the middle panel! 👈\nClick on any platform to connect with me.\n\n📧 Email: idraezynoks@gmail.com\n🔗 LinkedIn: linkedin.com/in/etimidaraubong\n💻 GitHub: github.com/Idraezy\n🌐 Portfolio: idaraetim-portfolio.vercel.app\n📱 WhatsApp: +234 704 525 6955\n\n---\n\nFeel free to reach out! I typically respond within 24 hours\n\nWhat else would you like to explore?\nA️ About Me\nB️ Projects\nC️ Contact Information`;
    
//     addBotMessage(contactText, 1200);
//     setCurrentState(STATES.SHOW_CONTACT);
//     setInvalidAttempts(0); // Reset counter on valid choice
//   };

//   // Handle invalid choice with attempt tracking
//   const handleInvalidChoice = (): void => {
//     const newAttempts = invalidAttempts + 1;
//     setInvalidAttempts(newAttempts);

//     let errorMessage;
    
//     if (newAttempts >= 3) {
//       // After 3 invalid attempts, show stricter message
//       errorMessage = `❌ Invalid choice too many times.\n\nPlease strictly select A, B, or C.\n\nA️ About Me\nB️ Projects\nC️ Contact Information`;
//     } else {
//       // Standard error message
//       errorMessage = `❌ Please choose only A, B, or C.\n\nA️ About Me\nB️ Projects\nC️ Contact Information`;
//     }

//     addBotMessage(errorMessage, 800);
//   };

//   return (
//     <div className="app-container">
//       <div className="whatsapp-layout">
//         {/* Left Sidebar - Navigation Icons */}
//         <Sidebar 
//           activeTab={activeTab} 
//           onTabChange={setActiveTab}
//           userImage={userImage}
//           isOpen={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//         />

//         {/* Middle Panel - Projects, Contact, Collaborations, Skills, Announcement, or Writeup */}
//         {activeTab === 'projects' && (
//           <ProjectsList projects={projects} onProjectClick={handleProjectClick} />
//         )}
//         {activeTab === 'contact' && (
//           <ContactInfo contacts={contactLinks} />
//         )}
//         {activeTab === 'collaborations' && (
//           <Collaborations collaborations={collaborations} />
//         )}
//         {activeTab === 'skills' && (
//           <Skills skills={skills} />
//         )}
//         {activeTab === 'announcement' && (
//           <Announcement />
//         )}
//         {activeTab === 'writeup' && (
//           <Writeup />
//         )}

//         {/* Right Panel - Chat Section */}
//         <div className="chat-wrapper">
//           <ChatHeader
//             botName={botName}
//             userImage={userImage}
//             theme={theme}
//             onToggleTheme={toggleTheme}
//             onMenuClick={() => setIsSidebarOpen(true)}
//           />

//           <div className="messages-container">
//             {messages.map((message) => (
//               <MessageBubble key={message.id} message={message} />
//             ))}

//             {isTyping && <TypingIndicator />}

//             <div ref={messagesEndRef} />
//           </div>

//           <ChatInput
//             onSendMessage={handleUserMessage}
//             onImageUpload={handleImageUpload}
//             disabled={currentState === STATES.ASK_IMAGE}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;






import { useState, useEffect, useRef } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import ProjectsList, { Project } from './components/ProjectsList';
import ContactInfo, { ContactLink } from './components/ContactInfo';
import Collaborations, { Collaboration } from './components/Collaborations';
import Skills, { Skill } from './components/Skills';
import Announcement from './components/Announcement';
import Writeup from './components/Writeup';
import ChatHeader from './components/ChatHeader';
import MessageBubble from './components/MessageBubble';
import TypingIndicator from './components/TypingIndicator';
import ChatInput from './components/ChatInput';
import { Message, STATES, StateType } from './types';

// Import project images
import project1 from './assets/project1.jpg';
import project2 from './assets/project2.jpg';
import project3 from './assets/project3.jpg';
import project4 from './assets/project4.jpg';
import project5 from './assets/project5.jpg';
import project6 from './assets/project6.jpg';
import project7 from './assets/project7.jpg';

// Import collaboration company logos (using project images as placeholders)
// Replace these with your actual company logo files when you have them
import cola from './assets/nft.png';
import colaa from './assets/prof.jpg';
import colaaa from './assets/logo.png';
import flexisafLogo from './assets/logooo.png';

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
  const [activeTab, setActiveTab] = useState<'projects' | 'contact' | 'collaborations' | 'skills' | 'announcement' | 'writeup'>('projects');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Projects data - Using imported images
  const projects: Project[] = [
    {
      id: '1',
      name: "E-Commerce Platform",
      description:
        "A full-featured e-commerce platform with cart functionality, payment integration, and admin dashboard built with React, TypeScript, Tailwind CSS, Framer Motion, and designed in Figma.",
      link: "https://dali-m2rk.vercel.app/",
      icon: project1, // Using image
    },
    {
      id: '2',
      name: "ATS Pro – Resume & ATS Checker",
      description:
        "A frontend application that analyzes resumes against job descriptions and provides intelligent ATS-based suggestions using React, TypeScript, Tailwind CSS, Framer Motion, and LocalStorage.",
      link: "https://at-sify.vercel.app/",
      icon: project2, // Using image
    },
    {
      id: '3',
      name: "Landing Page Generator",
      description:
        "An AI-powered landing page generator with real-time preview and customizable themes built using React, TypeScript, Tailwind CSS, Framer Motion, and Figma.",
      link: "https://landing-page-generator-taupe.vercel.app/",
      icon: project3, // Using image
    },
    {
      id: '4',
      name: "Smart Invoice",
      description:
        "A web application for creating, managing, and exporting professional invoices, built with Next.js, React, Tailwind CSS, and JavaScript.",
      link: "https://smart-invoice-eta.vercel.app/",
      icon: project4, // Using image
    },
    {
      id: '5',
      name: "ClientPilot",
      description:
        "A lightweight client management dashboard for freelancers and small businesses to track clients, statuses, and notes in one place using React, TypeScript, Tailwind CSS, and Framer Motion.",
      link: "https://client-pilot-mini-app.vercel.app/",
      icon: project5, // Using image
    },
    {
      id: '6',
      name: "Portfolio Website",
      description: "Personal portfolio with modern design",
      link: "https://idara-etim-portfolio.vercel.app/",
      icon: project6, // Using image
    },
    {
      id: '7',
      name: "NFT Marketplace",
      description:
        "A decentralized marketplace for trading NFTs with wallet connectivity and smart contract integration built using React, TypeScript, Tailwind CSS, Solidity, Framer Motion, and designed in Figma.",
      link: "https://nft-marketplace-22.vercel.app/",
      icon: project7, // Using image
    },
  ];

  // Contact/Social links - Using Lucide icon names
  const contactLinks: ContactLink[] = [
    {
      id: '1',
      platform: 'GitHub',
      username: '@Idraezy',
      url: 'https://github.com/Idraezy',
      icon: 'Github', // Lucide icon
    },
    {
      id: '2',
      platform: 'LinkedIn',
      username: 'Idara Etim',
      url: 'https://www.linkedin.com/in/etimidaraubong',
      icon: 'Linkedin', // Lucide icon
    },
    {
      id: '3',
      platform: 'Twitter (X)',
      username: '@Idara_etimm',
      url: 'https://twitter.com/Idara_etimm',
      icon: 'Twitter', // Lucide icon
    },
    {
      id: '4',
      platform: 'Facebook',
      username: 'Idara Etim',
      url: 'https://facebook.com/idaraetimm',
      icon: 'Facebook', // Lucide icon
    },
    {
      id: '5',
      platform: 'Instagram',
      username: '@idaraetimm',
      url: 'https://instagram.com/idaraetimm',
      icon: 'Instagram', // Lucide icon
    },
    {
      id: '6',
      platform: 'TikTok',
      username: '@idara_etim',
      url: 'https://tiktok.com/@idara_etim',
      icon: 'Music', // Lucide icon (closest to TikTok)
      type: 'tiktok',
    },
    {
      id: '7',
      platform: 'WhatsApp',
      username: 'Chat on WhatsApp',
      url: 'https://wa.me/2347045256955',
      icon: 'MessageCircle', // Lucide icon
      type: 'whatsapp',
    },
    {
      id: '8',
      platform: 'Email',
      username: 'idraezynoks@gmail.com',
      url: 'mailto:idraezynoks@gmail.com',
      icon: 'Mail', // Lucide icon
    },
  ];

  // Collaborations/Experience data - Using company logo images
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
      period: '2022 - Present',
      description: 'Participated in an intensive internship focused on building production-ready frontend applications.',
      logo: colaa,
    },
    {
      id: '3',
      company: 'FlexiSAF',
      role: 'Senior Frontend Developer',
      period: '2025 - Present',
      description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
      logo: flexisafLogo,
    },
    {
      id: '4',
      company: 'Dali Wears',
      role: 'Full Stack Developer',
      period: '2024 - Present',
      description: 'Building modern, responsive, and animated web interfaces using React.js, TypeScript, Tailwind CSS, and Framer Motion with strong focus on UX and performance.',
      logo: colaaa,
    },
  ];

  // Skills data - Using Lucide icon names
  const skills: Skill[] = [
    // Frontend
    { id: '1', name: 'React.js', category: 'Frontend', level: 95, icon: 'Component' },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 90, icon: 'FileCode' },
    { id: '3', name: 'Next.js', category: 'Frontend', level: 85, icon: 'Triangle' },
    { id: '4', name: 'Tailwind CSS', category: 'Frontend', level: 90, icon: 'Paintbrush' },
    { id: '5', name: 'JavaScript', category: 'Frontend', level: 95, icon: 'Code' },
    { id: '6', name: 'HTML/CSS', category: 'Frontend', level: 98, icon: 'Globe' },
    
    // Backend
    { id: '7', name: 'Node.js', category: 'Backend', level: 80, icon: 'Server' },
    { id: '8', name: 'Express.js', category: 'Backend', level: 75, icon: 'Zap' },
    { id: '9', name: 'MongoDB', category: 'Backend', level: 70, icon: 'Database' },
    
    // Tools & Others
    { id: '10', name: 'Git/GitHub', category: 'Tools', level: 90, icon: 'GitBranch' },
    { id: '11', name: 'Figma', category: 'Design', level: 85, icon: 'Figma' },
    { id: '12', name: 'Smart Contracts', category: 'Web3', level: 65, icon: 'FileText' },
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

  // Handle first interaction - triggers intro2
  const handleIntro1 = (): void => {
    handleIntro2();
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
    const contactText = `📞 Contact Information\n\nYou can find all my social links in the middle panel! 👈\nClick on any platform to connect with me.\n\n📧 Email: idraezynoks@gmail.com\n🔗 LinkedIn: linkedin.com/in/etimidaraubong\n💻 GitHub: github.com/Idraezy\n🌐 Portfolio: idara-etim-portfolio.vercel.app\n📱 WhatsApp: +234 704 525 6955\n\n---\n\nFeel free to reach out!\n\nWhat else would you like to explore?\nA️⃣ About Me\nB️⃣ Projects\nC️⃣ Contact Information`;
    
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

        {/* Middle Panel - Projects, Contact, Collaborations, Skills, Announcement, or Writeup */}
        {activeTab === 'projects' && (
          <ProjectsList 
            projects={projects} 
            onProjectClick={handleProjectClick}
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'projects'}
          />
        )}
        {activeTab === 'contact' && (
          <ContactInfo 
            contacts={contactLinks}
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'contact'}
          />
        )}
        {activeTab === 'collaborations' && (
          <Collaborations 
            collaborations={collaborations}
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'collaborations'}
          />
        )}
        {activeTab === 'skills' && (
          <Skills 
            skills={skills}
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'skills'}
          />
        )}
        {activeTab === 'announcement' && (
          <Announcement 
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'announcement'}
          />
        )}
        {activeTab === 'writeup' && (
          <Writeup 
            onClose={() => setActiveTab('projects')}
            isMobileActive={activeTab === 'writeup'}
          />
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