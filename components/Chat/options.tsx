import { Option, ChatTopic } from './chat.types';

export const options: Option[] = [];

options.push({
  id: `about-option`,
  topic: ChatTopic.about,
  text: `Tell me more about Kolby`,
});

options.push({
  id: `favorite-option`,
  topic: ChatTopic.favorite,
  text: `Tell me about Kolby's favorite project`,
});

options.push({
  id: `contact-option`,
  topic: ChatTopic.contact,
  text: `Send Kolby a message`,
});
