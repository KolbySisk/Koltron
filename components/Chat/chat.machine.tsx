import { Machine, assign } from 'xstate';
import { Message, Option } from './chat.types';
import { talk, think } from './chat.service';

// UPDATES STATES

/**
 * States
 * - Idle: State where Koltron is waiting for user input
 * - Talk: State where Koltron is getting the next message
 * - Think: State where Koltron is thinking about the next message to send. (Might not need this)
 * - Failed: An error happened
 */

export interface ChatStateSchema {
  states: {
    idle: {};
    thinking: {};
    talking: {};
    listening: {};
    failed: {};
  };
}
/**
 * Every event that the machine can have.
 * INIT - Tells Koltron to send the first message
 * SEND_MESSAGE - Koltron has sent a message
 * RECEIVE_MESSAGE - The user sent a message
 * RECEIVE_OPTION - The user selected an option
 */
export enum ChatEventType {
  init = 'INIT',
  think = 'THINK',
  talk = 'TALK',
  listen = 'LISTEN',
  sendMessage = 'SEND_MESSAGE',
  receiveMessage = 'RECEIVE_MESSAGE',
  receiveOption = 'RECEIVE_OPTION',
}

export type ChatEvent =
  | { type: ChatEventType.init }
  | { type: ChatEventType.think }
  | { type: ChatEventType.listen }
  | { type: ChatEventType.talk; messages: Message[] }
  | { type: ChatEventType.sendMessage; message: Message }
  | { type: ChatEventType.receiveMessage; userMessage: string }
  | { type: ChatEventType.receiveOption; option: Option };

/**
 * Modes:
 * - Intro
 * - Chat
 * - Hire
 * - Contact
 * Modes change the type of message Koltron will return
 * This is used for chaining a conversation together, for example:
 * When in `Contact` mode, Koltron will ask for an Email, and after receiving one, will ask for a message.
 */

export enum ChatMode {
  Intro = 'intro',
  Chat = 'chatting',
  Hire = 'hire',
  Contact = 'contact',
}

export interface ChatContext {
  messages?: Message[];
  options?: Option[];
  mode?: ChatMode;
  typing: boolean;
}

export const createChatMachine = () =>
  Machine<ChatContext, ChatStateSchema, ChatEvent>({
    id: 'chat',
    initial: 'idle',
    context: {
      messages: [],
      mode: ChatMode.Intro,
      typing: false,
    },
    states: {
      idle: {},

      thinking: {
        invoke: {
          id: 'thinking',
          src: (context, event) => async callback => {
            think(context, callback);
          },
        },
      },

      talking: {
        invoke: {
          id: 'talking',
          src: (context, event) => async callback => {
            talk(context, callback);
          },
        },
      },

      listening: {},

      failed: {},
    },
    on: {
      INIT: { target: 'thinking' },
      TALK: {
        target: 'thinking',
        actions: [
          assign({
            messages: (context, event) => event.messages,
          }),
          assign({
            typing: false,
          }),
        ],
      },
      THINK: {
        target: 'talking',
        actions: [
          assign({
            typing: true,
          }),
        ],
      },
      LISTEN: {
        target: 'listening',
        actions: [
          assign({
            typing: false,
          }),
        ],
      },
    },
  });

/**
 * TODO:
 * - Investigate refactoring to TypeStates when theyre stable: https://xstate.js.org/docs/guides/typescript.html#typestates
 */
