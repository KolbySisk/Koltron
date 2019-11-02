import { Machine, assign } from 'xstate';
import { Message, Option, ChatTopic } from './chat.types';
import { talk, think } from './chat.service';

/**
 * States
 * - Idle: State before being inited
 * - Talking: State where Koltron is getting the next message
 * - Thinking: State where Koltron is thinking about the next message to send. Used to show typing indicator.
 * - Listening: State where Koltron is waiting for the user to send a message
 * - Failed: An drror happened
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

export interface ChatContext {
  messages?: Message[];
  options?: Option[];
  topic?: ChatTopic;
  typing: boolean;
}

export const createChatMachine = () =>
  Machine<ChatContext, ChatStateSchema, ChatEvent>({
    id: 'chat',
    initial: 'idle',
    context: {
      messages: [],
      topic: ChatTopic.intro,
      typing: false,
    },
    states: {
      idle: {},

      thinking: {
        invoke: {
          id: 'thinking',
          src: (context: ChatContext) => async callback => {
            think(context, callback);
          },
        },
      },

      talking: {
        invoke: {
          id: 'talking',
          src: (context: ChatContext) => async callback => {
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
            messages: (context: ChatContext, event: any) => event.messages,
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
