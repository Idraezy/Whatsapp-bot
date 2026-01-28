// Shared TypeScript types for the WhatsApp Chat Bot

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// export const STATES = {
//   ASK_NAME: 'ASK_NAME',
//   ASK_CHOICE: 'ASK_CHOICE',
//   SHOW_ABOUT: 'SHOW_ABOUT',
//   SHOW_PROJECTS: 'SHOW_PROJECTS',
//   SHOW_CONTACT: 'SHOW_CONTACT',
// } as const;

// Shared TypeScript types for the WhatsApp Chat Bot

export interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}



export const STATES = {
  ASK_NAME: 'ASK_NAME',
  ASK_IMAGE: 'ASK_IMAGE',
  ASK_BOT_NAME: 'ASK_BOT_NAME',
  ASK_CHOICE: 'ASK_CHOICE',
  SHOW_ABOUT: 'SHOW_ABOUT',
  SHOW_PROJECTS: 'SHOW_PROJECTS',
  SHOW_CONTACT: 'SHOW_CONTACT',
} as const;



export type StateType = typeof STATES[keyof typeof STATES];