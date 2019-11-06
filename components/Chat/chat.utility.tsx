import _ from 'lodash';
import axios from 'axios';
import { messages } from './messages';
import { Message, MessageType, ChatTopic, Option } from './chat.types';
import { ChatContext } from './chat.machine';

export const getNextMessage = async (context: ChatContext): Promise<Message | undefined> => {
  const lastMessage: Message | undefined = _.last(context.messages);

  // If the last message was sent by the user we need to reply with an AI respone
  if (
    lastMessage &&
    lastMessage.type === MessageType.user &&
    !lastMessage.option &&
    !lastMessage.answer
  ) {
    return {
      id: 'developing-brain',
      type: MessageType.koltron,
      delay: 600,
      content: (
        <p>
          Sorry, my brain is still developing. While I'm learning, try clicking one of the
          predefined topics.
        </p>
      ),
    };
  }

  // Last message was a question so Koltron needs to wait for an answer
  else if (lastMessage && lastMessage.question) return;
  // If the last message was sent by Koltron we need to check if Koltron has a follow up message
  // Sometimes Koltron may send more than 1 message at a time
  else {
    // User responded to a question, capture the answer and do w/e with it
    if (lastMessage && lastMessage.answer) {
      if (lastMessage.logic) {
        const nextMessageId = await lastMessage.logic(lastMessage.content.props.children);
        return messages.find(m => m.id === nextMessageId);
      }
    }

    const topic: ChatTopic = lastMessage ? lastMessage.topic : ChatTopic.intro;

    let lastMessageOrder: number = lastMessage ? lastMessage.order : 0;
    lastMessageOrder = lastMessageOrder || 0;

    const topicMessages: Message[] = await messages.filter(m => m.topic === topic);
    const message: Message | undefined = await topicMessages.find(
      m => m.order === lastMessageOrder + 1
    );

    if (!message) return;

    if (message.action) message.action(context);

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

export const inputToMessage = (context: ChatContext, inputText: string): Message => {
  const lastMessage: Message = _.last(context.messages);

  return {
    id: 'user-message',
    type: MessageType.user,
    answer: !lastMessage.finish ? lastMessage.question : false,
    topic: !lastMessage.finish ? lastMessage.topic : null,
    order: !lastMessage.finish ? lastMessage.order : null,
    logic: !lastMessage.finish ? lastMessage.logic : null,
    content: <p>{inputText}</p>,
  };
};

export const optionToMessage = (option: Option): Message => {
  return {
    id: option.id,
    topic: option.topic,
    type: MessageType.user,
    option: true,
    content: <p>{option.text}</p>,
  };
};

export const sendContactMessage = (context: ChatContext) => {
  const answers = context.messages.filter(m => m.topic === ChatTopic.contact && m.answer);
  const email = answers[answers.length - 2].content.props.children;
  const message = answers[answers.length - 1].content.props.children;

  axios.post('/api/contact', {
    email,
    message,
  });
};
