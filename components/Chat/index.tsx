import { useEffect, useMemo, FormEvent } from 'react';
import { useMachine } from '@xstate/react';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import * as ChatStyles from './chat.styles';
import { createChatMachine, ChatEventType } from './chat.machine';
import { Message } from './chat.types';
import Button from '../Button';

const ChatComponent = () => {
  const chatMachine = useMemo(() => {
    return createChatMachine();
  }, []);

  const [current, send] = useMachine(chatMachine);

  useEffect(() => {
    send(ChatEventType.init);
  }, []);

  const optionClicked = () => {
    alert('yo');
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();
    alert('woop');
  };

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <ChatStyles.MessagesContainer>
          <ChatStyles.Messages>
            {current.context.messages &&
              current.context.messages.map((message: Message) => (
                <ChatStyles.MessageContainer key={message.id}>
                  <ChatStyles.Message type="koltron">{message.content}</ChatStyles.Message>
                </ChatStyles.MessageContainer>
              ))}
            {/* <ChatStyles.MessageContainer>
              <ChatStyles.Message type="user">Sup</ChatStyles.Message>
            </ChatStyles.MessageContainer> */}
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
            <ChatStyles.Input type="text" placeholder="send Koltron a message" />
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
