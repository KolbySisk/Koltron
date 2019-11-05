import { useEffect, useMemo, FormEvent, useState, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import * as ChatStyles from './chat.styles';
import { createChatMachine, ChatEventType } from './chat.machine';
import { Message } from './chat.types';
import { toMessage, getMessagesWithUserMessage } from './chat.utility';
import Button from '../Button';

const ChatComponent = () => {
  const messagesContainer = useRef(null);

  const chatMachine = useMemo(() => {
    return createChatMachine();
  }, []);

  const [current, send] = useMachine(chatMachine);
  const [input, setInput] = useState('');

  useEffect(() => {
    send(ChatEventType.init);
  }, []);

  useEffect(() => {
    messagesContainer.current.scrollIntoView();
  }, [current.context.messages]);

  const optionClicked = () => {
    alert('yo');
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (input.length) {
      const userMessage: Message = toMessage(input);
      send({
        type: ChatEventType.read,
        messages: getMessagesWithUserMessage(current.context, userMessage),
      });
      setInput('');
    }
  };

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <ChatStyles.MessagesContainer>
          <ChatStyles.Messages>
            {current.context.messages &&
              current.context.messages.map((message: Message) => (
                <ChatStyles.MessageContainer key={message.id}>
                  <ChatStyles.Message type={message.type}>{message.content}</ChatStyles.Message>
                </ChatStyles.MessageContainer>
              ))}
            {current.context.typing && (
              <ChatStyles.MessageContainer>
                <ChatStyles.LoadingMessage>
                  <MdMoreHoriz size="2.5em" />
                </ChatStyles.LoadingMessage>
              </ChatStyles.MessageContainer>
            )}
          </ChatStyles.Messages>
        </ChatStyles.MessagesContainer>

        <ChatStyles.InputContainer>
          <ChatStyles.Options>
            <Button callback={optionClicked}>Tell me more about Kolby</Button>
            <Button callback={optionClicked}>Show me Kolby's favorite project</Button>
            <Button callback={optionClicked}>Send Kolby a message</Button>
          </ChatStyles.Options>
          <ChatStyles.Form onSubmit={formSubmit}>
            <ChatStyles.Input
              type="text"
              placeholder="send Koltron a message"
              value={input}
              onChange={(event: any) => setInput(event.target.value)}
              disabled={current.value !== 'listening'}
              ref={messagesContainer}
            />
            <Button type="submit">
              <MdArrowUpward size="2em" />
            </Button>
          </ChatStyles.Form>
        </ChatStyles.InputContainer>
      </ChatStyles.Container>
    </ChatStyles.Root>
  );
};

export default ChatComponent;

/**
 * Ideas:
 * - When a specific question is asked to the user
 *   change placerholder to show what they should enter.
 *   Example, "What's your email?" - Placeholder: "Enter your email address"
 */
