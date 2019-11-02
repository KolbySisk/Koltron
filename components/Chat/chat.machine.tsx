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
 * THINK - Event sent before Koltron sends a message
 * TALK - Event sent when Koltron sends a message
 * LISTEN - Event sent when Koltron stops sending messages
 * READ - Event sent when a message is sent and read by Koltron
 */

export enum ChatEventType {
  init = 'INIT',
  think = 'THINK',
  talk = 'TALK',
  listen = 'LISTEN',
  read = 'READ',
}

export type ChatEvent =
  | { type: ChatEventType.init }
  | { type: ChatEventType.think }
  | { type: ChatEventType.listen }
  | { type: ChatEventType.talk; messages: Message[] }
  | { type: ChatEventType.read; userMessage: string };

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
