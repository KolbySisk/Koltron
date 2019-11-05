import _ from 'lodash';
import { messages } from './messages';
import { Message, MessageType, ChatTopic } from './chat.types';
import { ChatContext } from './chat.machine';

export const getNextMessage = async (context: ChatContext): Promise<Message | undefined> => {
  const lastMessage: Message | undefined = _.last(context.messages);

  // If the last message was sent by the user we need to reply with an AI respone
  if (lastMessage && lastMessage.type === MessageType.user) {
    return {
      id: Date.now(),
      type: MessageType.koltron,
      content: (
        <p>
          Sorry, my brain is still developing. While I'm learning, try clicking one of the
          predefined topics.
        </p>
      ),
    };
  }

  // If the last message was sent by Koltron we need to check if Koltron has a follow up message
  // Sometimes Koltron may send more than 1 message at a time
  else {
    const topic = lastMessage ? lastMessage.topic : ChatTopic.intro;
    const lastMessageOrder: string | number = lastMessage ? lastMessage.order : 0;

    const topicMessages: Message[] = await messages.filter(m => m.topic === topic);
    const message: Message | undefined = await topicMessages.find(
      m => m.order === lastMessageOrder + 1
    );

    return message;
  }
};

export const getMessagesWithNextMessage = async (
  context: ChatContext,
  nextMessage: Message
): Promise<Message[]> => {
  const newMessages: Message[] = [...context.messages];
  newMessages.push(nextMessage);

  return newMessages;
};

export const getMessagesWithUserMessage = (
  context: ChatContext,
  userMessage: Message
): Message[] => {
  const newMessages: Message[] = [...context.messages];
  newMessages.push(userMessage);

  return newMessages;
};

export const toMessage = (inputText: string): Message => {
  return {
    id: Date.now(),
    type: MessageType.user,
    content: <p>{inputText}</p>,
  };
};
