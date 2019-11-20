import { Option, ChatTopic } from './chat.types';

export const options: Option[] = [];

options.push({
  id: `ABOUT-OPTION`,
  topic: ChatTopic.about,
  text: `Tell me more about Kolby`,
});

options.push({
  id: `FAVORITE-OPTION`,
  topic: ChatTopic.favorite,
  text: `Tell me about Kolby's favorite project`,
});

options.push({
  id: `CONTACT-OPTION`,
  topic: ChatTopic.contact,
  text: `Send Kolby a message`,
});
