import { Message } from './chat.types';

export const messages: Message[] = [];

messages.push({
  id: 1,
  mode: 'intro',
  content: (
    <p>
      Hello, I’m Koltron 2020. I’m an AI designed to teach people about Kolby Sisk. It’s not a
      glamorous life, but it’s better than passing butter.
    </p>
  ),
});

messages.push({
  id: 2,
  mode: 'intro',
  content: <p>Click on a topic that I know about, or just hangout and chat with me.</p>,
});

export function getNextMessage() {}
