# WhatsApp-Style Portfolio Chat Bot

A fully functional WhatsApp-style chat application built with React and Vite, featuring a rule-based chatbot for showcasing a portfolio.

## 🚀 Features

- **WhatsApp-like UI**: Authentic chat interface with message bubbles, typing indicators, and responsive design
- **Finite State Machine**: Rule-based chatbot with clear state transitions
- **Input Validation**: Strict choice validation with error tracking (3 invalid attempts limit)
- **Responsive Design**: Mobile-first approach that works on all devices
- **Smooth Animations**: Typing indicators, message animations, and transitions
- **No Backend Required**: Completely frontend-only implementation

## 📋 Tech Stack

- **React 18** (Functional Components with Hooks)
- **TypeScript** (Strict type safety)
- **Vite** (Fast development and build tool)
- **CSS3** (Custom styling, no external UI libraries)

## 🎯 Chatbot Logic Flow

### State Machine Architecture

The chatbot uses a finite state machine with the following states:

```
ASK_NAME → ASK_CHOICE → (SHOW_ABOUT / SHOW_PROJECTS / SHOW_CONTACT)
                ↓              ↓              ↓              ↓
           (loops back based on user choice after displaying content)
```

### State Breakdown

1. **ASK_NAME** (Initial State)
   - Bot asks: "Hello 👋 What is your name?"
   - User inputs their name
   - Transition: → ASK_CHOICE

2. **ASK_CHOICE** (Menu State)
   - Bot shows menu options:
     - A️⃣ About Me
     - B️⃣ Projects
     - C️⃣ Contact Information
   - User must choose A, B, or C
   - Invalid inputs trigger error messages
   - Transition: → SHOW_ABOUT / SHOW_PROJECTS / SHOW_CONTACT

3. **SHOW_ABOUT / SHOW_PROJECTS / SHOW_CONTACT** (Content States)
   - Bot displays the requested information
   - Menu is shown again for further exploration
   - User can choose another option
   - Transition: Loops back based on choice

### Input Validation System

```javascript
// Validation Logic
const normalizedChoice = choice.trim().toUpperCase();

if (normalizedChoice === 'A') {
  // Show About section
} else if (normalizedChoice === 'B') {
  // Show Projects section
} else if (normalizedChoice === 'C') {
  // Show Contact section
} else {
  // Invalid choice - increment error counter
  invalidAttempts++;
  
  if (invalidAttempts >= 3) {
    // Show stricter error message
  } else {
    // Show standard error message
  }
}
```

### Error Handling Rules

- **First 2 invalid attempts**: Standard error message
  - "❌ Please choose only A, B, or C."
  
- **3+ invalid attempts**: Stricter warning
  - "❌ Invalid choice too many times. Please strictly select A, B, or C."
  
- **Error counter reset**: Resets to 0 when user makes a valid choice

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd whatsapp-chat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit: `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
whatsapp-chat/
├── src/
│   ├── components/
│   │   ├── ChatHeader.tsx          # Header with avatar and name
│   │   ├── ChatHeader.css
│   │   ├── MessageBubble.tsx       # Individual message component
│   │   ├── MessageBubble.css
│   │   ├── TypingIndicator.tsx    # Animated typing dots
│   │   ├── TypingIndicator.css
│   │   ├── ChatInput.tsx           # Input field with send button
│   │   └── ChatInput.css
│   ├── App.tsx                     # Main app logic & state management
│   ├── App.css                     # Main app styling
│   ├── types.ts                    # Shared TypeScript types
│   ├── main.tsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── vite.config.ts
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json
├── package.json
└── README.md
```

## 🎨 Key Components

### 1. App.tsx (Main Component)
- **State Management**: Uses `useState` with TypeScript generics for messages, chatbot state, user name, and error tracking
- **Type Safety**: All props and state are strictly typed
- **Effect Hooks**: Uses `useEffect` for auto-scrolling and initial greeting
- **Message Handler**: Central logic for processing user input based on current state
- **Bot Response**: Simulates typing delay before showing bot messages

### 2. types.ts (Shared Types)
- **Message Interface**: Defines the structure of chat messages
- **State Types**: Type-safe state machine constants
- **Type Exports**: Centralized type definitions for consistency

### 3. ChatHeader.tsx
- Displays bot avatar and name
- Shows online status
- Includes action buttons (search, menu)

### 3. MessageBubble
- Renders individual messages
- Different styling for user vs bot messages
- Displays timestamp
- Supports multi-line text with proper formatting

### 4. TypingIndicator
- Animated three-dot typing indicator
- Shows when bot is "thinking"
- Smooth fade-in animation

### 5. ChatInput
- Text input field
- Send button (disabled when empty)
- Enter key support
- Emoji button for visual appeal

## 💡 Customization

### Modify Bot Content

Edit the content in `App.tsx`:

```typescript
// About Me content
const handleAboutChoice = (): void => {
  const aboutText = `Your custom about text here...`;
  addBotMessage(aboutText, 1200);
};

// Projects content
const handleProjectsChoice = (): void => {
  const projectsText = `Your projects here...`;
  addBotMessage(projectsText, 1200);
};

// Contact content
const handleContactChoice = (): void => {
  const contactText = `Your contact info here...`;
  addBotMessage(contactText, 1200);
};
```

### Adjust Typing Delay

Change the delay parameter in `addBotMessage()`:

```typescript
addBotMessage(text, 1500); // 1500ms = 1.5 seconds
```

### Modify Colors

Edit the CSS files to change the color scheme:

```css
/* WhatsApp green - ChatHeader.css */
.chat-header {
  background: #00a884; /* Change this color */
}

/* User message bubble - MessageBubble.css */
.user-bubble {
  background: #d9fdd3; /* Change this color */
}

/* Bot message bubble - MessageBubble.css */
.bot-bubble {
  background: #ffffff; /* Change this color */
}
```

## 🔑 Key Features Explained

### 1. Type Safety
TypeScript provides compile-time type checking:
- **Message Interface**: Ensures all messages have correct structure
- **State Types**: Prevents invalid state transitions
- **Props Typing**: All component props are strictly typed
- **Function Signatures**: Clear parameter and return types

### 2. State Management
Uses React's `useState` hook with TypeScript generics:
- `messages`: Array<Message> - All chat messages
- `currentState`: StateType - Tracks chatbot's current state
- `userName`: string - Stores user's name
- `invalidAttempts`: number - Counts invalid choice attempts
- `isTyping`: boolean - Controls typing indicator visibility

### 3. Conditional Logic
Implements strict conditional statements:
- State-based message handling
- Input validation (only A, B, C accepted)
- Error counting and threshold checking

### 4. Message Flow
1. User types message → Add to messages array
2. Process input based on current state
3. Show typing indicator
4. After delay, add bot response
5. Update state if necessary

### 5. Auto-Scroll
Uses `useRef` with TypeScript typing and `useEffect` to automatically scroll to the latest message:

```typescript
const messagesEndRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages, isTyping]);
```

## 📱 Responsive Design

- **Desktop**: Max width 900px, centered layout
- **Tablet**: Adaptive width with adjusted padding
- **Mobile**: Full-screen experience, optimized touch targets

## ⚠️ Important Notes

- **No Backend**: This is a purely frontend application
- **No AI APIs**: Uses conditional logic, not machine learning
- **Client-Side Only**: All logic runs in the browser
- **Static Content**: Bot responses are predefined
- **No Data Persistence**: Messages are lost on page refresh

## 🎓 Learning Objectives Demonstrated

✅ React functional components and hooks  
✅ TypeScript type safety and interfaces  
✅ State management with useState and TypeScript generics  
✅ Side effects with useEffect  
✅ Conditional rendering  
✅ Event handling with TypeScript types  
✅ Component composition  
✅ CSS styling and animations  
✅ Responsive design  
✅ Finite state machine pattern  
✅ Input validation  
✅ Error handling  
✅ Type-safe props and function signatures  

## 🚀 Future Enhancements (Optional)

- Add localStorage to persist chat history
- Include more chatbot states/options
- Add emoji picker functionality
- Implement dark mode
- Add sound notifications
- Include file upload simulation
- Add "read receipts" feature

## 📄 License

This project is open-source and available for educational purposes.

---

**Enjoy your WhatsApp-style portfolio chatbot! 🎉**