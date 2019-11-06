import { Message } from './chat.types';
import { ChatContext, ChatEventType } from './chat.machine';
import { getNextMessage, getMessagesWithNextMessage } from './chat.utility';

const defaultDelay = 1000;

export const talk = async (context: ChatContext, callback: Function) => {
  const nextMessage: Message | undefined = await getNextMessage(context);

  setTimeout(async () => {
    if (nextMessage) {
      const messages: Message[] = await getMessagesWithNextMessage(context, nextMessage);

      callback({ type: ChatEventType.talk, messages });
    } else {
      callback({ type: ChatEventType.listen });
    }
  }, nextMessage.delay || defaultDelay);
};

export const think = async (context: ChatContext, callback: Function) => {
  const nextMessage: Message | undefined = await getNextMessage(context);

  if (nextMessage) {
    setTimeout(() => {
      callback({ type: ChatEventType.think });
    }, 500);
  } else {
    callback({ type: ChatEventType.listen });
  }
};

export const read = async (context: ChatContext, callback: Function) => {
  callback({ type: ChatEventType.think });
};
