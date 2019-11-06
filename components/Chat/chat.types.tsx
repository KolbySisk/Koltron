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
  about = 'ABOUT',
  favorite = 'FAVORITE',
  contact = 'CONTACT',
}

export enum MessageType {
  user = 'USER',
  koltron = 'KOLTRON',
}

/**
 * Messages are sent based on the current `topic` and `order`.
 * `order` is the order in which Koltron sends the message.
 * `type` determins how the message is styled. (Sent vs Received styles).
 * `delay` is pause before sending the message.
 * `option` indicates that the message was generated from an `Option`.
 * `question` used to tell Koltron to wait for an answer.
 * `answer` indicates that the message is an answer to a previously asked question.
 * `finish` indicates that a chain of questioning has ended.
 * `logic` a function used to determine the next message. Must return a messageId
 * `action` a function that is ran when a message is sent.
 */

export interface Message {
  id: string;
  content: JSX.Element;
  order?: number;
  type: MessageType;
  topic?: ChatTopic;
  delay?: number;
  option?: boolean;
  question?: boolean;
  answer?: boolean;
  finish?: boolean;
  logic?: Function;
  action?: Function;
}

/**
 * Options are buttons that display predefined messages.
 * Options are used to change the topic, or respond to Koltron.
 */

export interface Option {
  id: string;
  topic: ChatTopic;
  text: string;
}
