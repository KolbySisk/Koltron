import { useEffect, useMemo, FormEvent, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import { useMachine } from '@xstate/react';
import { useTheme } from 'emotion-theming';
import { animateScroll as scroll } from 'react-scroll';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import { socket } from './chat.utility';
import * as ChatStyles from './chat.styles';
import { createChatMachine, ChatEventType } from './chat.machine';
import { Message, Option } from './chat.types';
import {
  inputToMessage,
  getMessagesWithUserMessage,
  optionToMessage,
  getPlaceholder,
  slackMessageToMessage,
} from './chat.utility';
import Button from '../Button';
import ChatToggleButton from '../ChatToggleButton';
import { options } from './options';

let messages;

const ChatComponent = ({ chatInit }: Props) => {
  const router = useRouter();
  const chatMachine = useMemo(() => createChatMachine(), []);
  const [current, send] = useMachine(chatMachine);
  const [initialRoute, setInitialRoute] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const textInput = useRef(null);
  const theme: any = useTheme();

  useEffect(() => {
    setInitialRoute(router.pathname);

    socket.on('message', async newMessage => {
      const message: Message = slackMessageToMessage(newMessage);
      const newMessages: Message[] = [...messages];
      newMessages.push(message);

      send({
        type: ChatEventType.talk,
        messages: newMessages,
      });
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    messages = current.context.messages;
  }, [current.context.messages]);

  useEffect(() => {
    if (chatInit) send(ChatEventType.init);
  }, [chatInit]);

  useEffect(() => {
    if (theme.smallChat) {
      scroll.scrollToBottom({
        containerId: 'message-continer',
        duration: 100,
        delay: 0,
      });
    } else {
      scroll.scrollToBottom({ duration: 1000, delay: 0 });
      setTimeout(() => {
        textInput?.current?.focus();
      });
    }
  }, [current.context.messages]);

  const optionClicked = (option: Option, event: MouseEvent) => {
    event.preventDefault();

    const userMessage: Message = optionToMessage(option);

    send({
      type: ChatEventType.read,
      messages: getMessagesWithUserMessage(current.context, userMessage),
    });
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue.length) {
      const userMessage: Message = inputToMessage(current.context, inputValue);

      send({
        type: ChatEventType.read,
        messages: getMessagesWithUserMessage(current.context, userMessage),
      });

      setInputValue('');
    }
  };

  const pageExiting = () => router.pathname !== initialRoute;

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <AnimatePresence>
          {!pageExiting() && (
            <ChatToggleButton theme={theme}/>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!pageExiting() && initialRoute === '/' && (
            <ChatStyles.ChatContainer>
              <ChatStyles.MessagesContainer id="message-continer">
                <ChatStyles.Messages>
                  {current.context.messages.map((message: Message, index: number) => (
                    <ChatStyles.MessageContainer key={index}>
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
                  {options.map((option: Option) => (
                    <Button
                      key={option.id}
                      callback={(event: MouseEvent) => optionClicked(option, event)}
                      disabled={current.value !== 'listening'}>
                      {option.text}
                    </Button>
                  ))}
                </ChatStyles.Options>
                <ChatStyles.Form onSubmit={formSubmit}>
                  <ChatStyles.Input
                    type="text"
                    placeholder={getPlaceholder(current.context)}
                    value={inputValue}
                    onChange={(event: any) => setInputValue(event.target.value)}
                    disabled={current.value !== 'listening'}
                    ref={textInput}
                  />
                  <Button type="submit" disabled={current.value !== 'listening'}>
                    <MdArrowUpward size="2em" />
                  </Button>
                </ChatStyles.Form>
              </ChatStyles.InputContainer>
            </ChatStyles.ChatContainer>
          )}
        </AnimatePresence>
      </ChatStyles.Container>
    </ChatStyles.Root>
  );
};

interface Props {
  chatInit?: boolean;
}

export default ChatComponent;
