import React from 'react';
import './ChatHeader.css';
import { Search, Sun, Moon, MoreVertical } from 'lucide-react';


interface ChatHeaderProps {
  botName: string;
  userImage: string | null;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  botName, 
  userImage, 
  theme, 
  onToggleTheme 
}) => {
  return (
    <div className="chat-header">
      <div className="header-left">

        {/* <div className="avatar">
          {userImage ? (
            <img src={userImage} alt="User avatar" />
          ) : (
            <span className="avatar-icon">🤖</span>
          )}
        </div> */}
        <div className="avatar-wrapper">
        <div className="avatar">
         {userImage ? (
         <img src={userImage} alt="User avatar" />
          ) : (
         <span className="avatar-icon">🤖</span>
         )}
        </div>

  <span className="online-indicator" />
</div>


        <div className="header-info">
          <h3 className="header-name">{botName}, your AI</h3>
          <p className="header-status">online</p>
        </div>
      </div>
      <div className="header-actions">
  <button className="icon" aria-label="Search">
    <Search size={20} strokeWidth={1.5} />
  </button>

  <button
    onClick={onToggleTheme}
    className="icon"
    aria-label="Toggle theme"
  >
    {theme === 'light' ? (
      <Moon size={20} strokeWidth={1.5} />
    ) : (
      <Sun size={20} strokeWidth={1.5} />
    )}
  </button>

  <button className="icon" aria-label="More options">
    <MoreVertical size={20} strokeWidth={1.5} />
  </button>
</div>

    </div>
  );
};

export default ChatHeader;


// import React from 'react';
// import './ChatHeader.css';
// import { Search, Sun, Moon, MoreVertical } from 'lucide-react';

// interface ChatHeaderProps {
//   botName: string;
//   userImage: string | null;
//   theme: 'light' | 'dark';
//   onToggleTheme: () => void;
//   onMenuClick: () => void;
// }

// const ChatHeader: React.FC<ChatHeaderProps> = ({ 
//   botName, 
//   userImage, 
//   theme, 
//   onToggleTheme,
//   onMenuClick
// }) => {
//   return (
//     <div className="chat-header">
//       {/* Mobile Menu Button */}
//       <button className="mobile-menu-btn" onClick={onMenuClick}>
//         ☰
//       </button>

//       <div className="avatar">
//            {userImage ? (
//              <img src={userImage} alt="User avatar" />
//            ) : (
//              <span className="avatar-icon">🤖</span>
//            )}
//         </div>}
//          <d className="avatar-wrapper">
//          <div className="avatar">
//           {userImage ? (
//           <img src={userImage} alt="User avatar" />
//            ) : (
//           <span className="avatar-icon">🤖</span>
//           )}
//          </div>

//           <span className="online-indicator" />
//           </div>


//         <div className="header-info">
//           <h3 className="header-name">{botName}, your AI</h3>
//           <p className="header-status">online</p>
//         </div>
//       </div>
//       <div className="header-actions">
//         <span className="icon">🔍</span>
//         <button 
//           className="icon"
//           onClick={onToggleTheme}
//           aria-label="Toggle theme"
//         >
//           {theme === 'light' ? '🌙' : '☀️'}
//         </button>
//         <span className="icon">⋮</span>
//       </div>
//     </div>
//   );
// };

// export default ChatHeader;