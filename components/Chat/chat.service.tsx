import { Message } from './chat.types';
import { ChatContext } from './chat.machine';
import { getNextMessage, getMessagesWithNextMessage } from './chat.utility';

export const talk = async (context: ChatContext, callback: Function) => {
  const nextMessage: Message | undefined = await getNextMessage(context);

  setTimeout(async () => {
    if (nextMessage) {
      const messages: Message[] = await getMessagesWithNextMessage(context, nextMessage);

      callback({ type: 'TALK', messages });
    } else {
      callback({ type: 'LISTEN' });
    }
  }, 1000);
};

export const think = async (context: ChatContext, callback: Function) => {
  const stillTalking: Message | undefined = await getNextMessage(context);

  if (stillTalking) {
    setTimeout(() => {
      callback({ type: 'THINK' });
    }, 1000);
  } else {
    callback({ type: 'LISTEN' });
  }
};

export const read = async (context: ChatContext, callback: Function) => {
  callback({ type: 'THINK' });
};
