import { Message, MessageType, ChatTopic } from './chat.types';
import { sendContactMessageToSlack } from './chat.utility';
import { ChatContext } from './chat.machine';

export const messages: Message[] = [];

messages.push({
  id: `${ChatTopic.intro}-1`,
  order: 1,
  topic: ChatTopic.intro,
  type: MessageType.koltron,
  delay: 1000,
  content: (
    <p>
      Hello, I’m Koltron 2020. I’m an AI designed to teach people about Kolby Sisk. It’s not a
      glamorous life, but it’s better than passing butter.
    </p>
  ),
});

messages.push({
  id: `${ChatTopic.intro}-2`,
  order: 2,
  topic: ChatTopic.intro,
  type: MessageType.koltron,
  delay: 600,
  content: <p>Click on a topic that I know about, or just hangout and chat with me.</p>,
});

messages.push({
  id: `${ChatTopic.about}-1`,
  order: 1,
  topic: ChatTopic.about,
  type: MessageType.koltron,
  delay: 200,
  content: <p>Later</p>,
});

messages.push({
  id: `${ChatTopic.favorite}-1`,
  order: 1,
  topic: ChatTopic.favorite,
  type: MessageType.koltron,
  delay: 400,
  content: <p>He's still trying to pick one.</p>,
});

messages.push({
  id: `${ChatTopic.contact}-1`,
  order: 1,
  topic: ChatTopic.contact,
  type: MessageType.koltron,
  question: true,
  delay: 400,
  content: <p>What's your email?</p>,
  placeholder: 'Enter your email',
  logic: async (email: string): Promise<string> => {
    const EmailValidator = await import('email-validator');
    return EmailValidator.validate(email)
      ? `${ChatTopic.contact}-2`
      : `${ChatTopic.contact}-2-failed`;
  },
});

messages.push({
  id: `${ChatTopic.contact}-2`,
  order: 2,
  topic: ChatTopic.contact,
  type: MessageType.koltron,
  question: true,
  delay: 600,
  content: <p>What message would you like to send Kolby?</p>,
  placeholder: 'Enter your message for Kolby',
});

messages.push({
  id: `${ChatTopic.contact}-2-failed`,
  order: 2,
  topic: ChatTopic.contact,
  type: MessageType.koltron,
  question: true,
  delay: 800,
  content: (
    <p>
      That's cool, you don't have to tell me your email. What message would you like to send Kolby?
    </p>
  ),
});

messages.push({
  id: `${ChatTopic.contact}-3`,
  order: 3,
  topic: ChatTopic.contact,
  type: MessageType.koltron,
  question: false,
  finish: true,
  delay: 600,
  content: <p>I sent him your message via Slack.</p>,
  action: (context: ChatContext) => {
    sendContactMessageToSlack(context);
  },
});

export function getNextMessage() {}
