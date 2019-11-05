import { Message, MessageType, ChatTopic } from './chat.types';

export const messages: Message[] = [];

messages.push({
  id: `${ChatTopic.intro}-1`,
  order: 1,
  topic: ChatTopic.intro,
  type: MessageType.koltron,
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
  content: <p>Click on a topic that I know about, or just hangout and chat with me.</p>,
});

export function getNextMessage() {}
