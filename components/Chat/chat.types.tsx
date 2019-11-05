/**
 * Topics:
 * - Intro
 * - Chat
 * - Hire
 * - Contact
 * Topics change the type of message Koltron will return
 * This is used for chaining a conversation together, for example:
 * When in `Contact` topic, Koltron will ask for an Email, and after receiving one, will ask for a message.
 */

export enum ChatTopic {
  intro = 'INTRO',
  chat = 'CHATTING',
  hire = 'HIRE',
  contact = 'CONTACT',
}

export enum MessageType {
  user = 'USER',
  koltron = 'KOLTRON',
}

export interface Message {
  id: string | number;
  order?: number;
  topic?: ChatTopic;
  content: JSX.Element;
  type: MessageType;
}

export interface Option {
  name: string;
  text: string;
}
