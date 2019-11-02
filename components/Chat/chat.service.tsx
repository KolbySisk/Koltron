import _ from 'lodash';
import { messages } from './messages';
import { Message } from './chat.types';
import { ChatContext } from './chat.machine';

export const getNextMessage = async (context: ChatContext): Promise<Message | undefined> => {
  const { topic } = context;
  const lastMessage: Message | undefined = _.last(context.messages);
  const lastMessageId: number = lastMessage ? lastMessage.id : 0;

  const topicMessages: Message[] = await messages.filter(m => m.topic === topic);
  const message: Message | undefined = await topicMessages.find(m => m.id === lastMessageId + 1);

  return message;
};

export const fetchMessage = async (context: ChatContext): Promise<Message[]> => {
  const message: Message | undefined = await getNextMessage(context);
  if (message && context.messages) context.messages.push(message);

  return context.messages || [];
};

export const talk = async (context: ChatContext, callback: Function) => {
  const stillTalking = await getNextMessage(context);

  setTimeout(async () => {
    if (stillTalking) {
      const messages: Message[] = await fetchMessage(context);

      callback({ type: 'TALK', messages });
    } else {
      callback({ type: 'LISTEN', messages });
    }
  }, 1000);
};

export const think = async (context: ChatContext, callback: Function) => {
  const stillTalking = await getNextMessage(context);

  if (stillTalking) {
    setTimeout(() => {
      callback({ type: 'THINK' });
    }, 1000);
  }
};

//return new Promise<any>((resolve, reject) => {});
