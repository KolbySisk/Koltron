import _ from 'lodash';
import axios from 'axios';
import io from 'socket.io-client';
import { messages } from './messages';
import { Message, MessageType, ChatTopic, Option } from './chat.types';
import { ChatContext } from './chat.machine';

export const socket = io();

/**
 * Given the context, will return the next message, or undefined if Koltron is waiting for an answer
 * Warning: Has a lot of side effects and should be refactored.
 */

export const getNextMessage = async (context: ChatContext): Promise<Message | undefined> => {
  const lastMessage: Message | undefined = _.last(context.messages);

  // If the last message was sent by the user we need to reply with an AI respone
  if (
    lastMessage &&
    lastMessage.type === MessageType.user &&
    !lastMessage.option &&
    !lastMessage.answer
  ) {
    if (lastMessage.action) lastMessage.action(context);

    return {
      id: 'DEVELOPING-BRAIN',
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

    /**
     * Finally, get and return the next message
     * Next message is based on the topic and last message.order
     */
    const topic: ChatTopic = lastMessage ? lastMessage.topic : ChatTopic.intro;

    let lastMessageOrder: number = lastMessage ? lastMessage.order : 0;
    lastMessageOrder = lastMessageOrder || 0;

    const topicMessages: Message[] = messages.filter(m => m.topic === topic);
    const message: Message | undefined = topicMessages.find(m => m.order === lastMessageOrder + 1);

    // if next message has an action, call it
    if (message?.action) message.action(context);

    return message;
  }
};

export const getCurrentMessagesFromContextOrArray = (context: ChatContext): Message[] => {
  return context && context.messages ? context.messages : [];
};

export const addNewMessageToCurrentContext = (
  context: ChatContext,
  newMessage: Message
): Message[] => {
  const currentMessages: Message[] = getCurrentMessagesFromContextOrArray(context);
  const messages: Message[] = [...currentMessages];
  messages.push(newMessage);
  return messages;
};

export const getMessagesWithNextMessage = (
  context: ChatContext,
  newMessage: Message
): Message[] => {
  const newMessages: Message[] = addNewMessageToCurrentContext(context, newMessage);
  return newMessages;
};

export const getMessagesWithUserMessage = (
  context: ChatContext,
  userMessage: Message
): Message[] => {
  const newMessages: Message[] = addNewMessageToCurrentContext(context, userMessage);
  return newMessages;
};

export const inputToMessage = (context: ChatContext, inputText: string): Message => {
  const lastMessage: Message = _.last(context.messages);

  return {
    id: 'USER-MESSAGE',
    type: MessageType.user,
    answer: !lastMessage.finish ? lastMessage.question : false,
    topic: !lastMessage.finish ? lastMessage.topic : null,
    order: !lastMessage.finish ? lastMessage.order : null,
    logic: !lastMessage.finish ? lastMessage.logic : null,
    content: <p>{inputText}</p>,
    action: context => sendMessageToSlack(context),
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

export const getPlaceholder = (context: ChatContext): string => {
  const lastMessage: Message = _.last(context.messages);
  const defaultPlaceholder: string = 'Send Koltron a message';

  return lastMessage && lastMessage.placeholder ? lastMessage.placeholder : defaultPlaceholder;
};

export const sendMessageToSlack = (context: ChatContext) => {
  const message: Message = _.last(context.messages).content.props.children;
  socket.emit('message', message);
};

export const sendContactMessageToSlack = (context: ChatContext) => {
  const answers: Message[] = context.messages.filter(
    m => m.topic === ChatTopic.contact && m.answer
  );
  const email: string = answers[answers.length - 2].content.props.children;
  const messageText: string = answers[answers.length - 1].content.props.children;

  axios.post('/api/contact', {
    email,
    message: messageText,
  });
};

export const slackMessageToMessage = (slackMessage: string): Message => {
  return {
    id: 'SLACK-MESSAGE',
    topic: ChatTopic.chat,
    type: MessageType.koltron,
    content: <p>{slackMessage}</p>,
  };
};