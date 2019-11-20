import { useEffect, FormEvent, useState, useRef, useContext } from 'react';
import { useRouter } from 'next/router';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import { useTheme } from 'emotion-theming';
import { animateScroll as scroll } from 'react-scroll';
import { AnimatePresence } from 'framer-motion';
import _ from 'lodash';
import { socket } from './chat.utility';
import * as ChatStyles from './chat.styles';
import { ChatEventType } from './chat.machine';
import { Message, Option } from './chat.types';
import Button from '../Button';
import ChatToggleButton from '../ChatToggleButton';
import { options } from './options';
import ChatServiceContext from './chat.context';
import {
  inputToMessage,
  getMessagesWithUserMessage,
  optionToMessage,
  getPlaceholder,
  slackMessageToMessage,
} from './chat.utility';

// TODO: Refactor to ref
let messages;

const ChatComponent = ({ chatInit }: Props) => {
  const router = useRouter();
  const [initialRoute, setInitialRoute] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const textInput = useRef(null);
  const theme: any = useTheme();
  const chatService = useContext(ChatServiceContext);
  // TODO: custom hook?
  const { chatMachineState, chatMachineSend } = chatService;

  useEffect(() => {
    setInitialRoute(router.pathname);

    socket.on('message', async newMessage => {
      const message: Message = slackMessageToMessage(newMessage);
      const newMessages: Message[] = [...messages];
      newMessages.push(message);

      chatMachineSend({
        type: ChatEventType.talk,
        messages: newMessages,
      });
    });
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (chatInit) chatMachineSend(ChatEventType.talk);
  }, [chatInit]);

  useEffect(() => {
    messages = chatMachineState.context.messages;

    /**
     * Testing scrolling ux ideas
     * TODO: Move to utility when finalized
     */
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
  }, [chatMachineState.context.messages]);

  const optionClicked = (option: Option, event: MouseEvent) => {
    event.preventDefault();

    const userMessage: Message = optionToMessage(option);

    chatMachineSend({
      type: ChatEventType.read,
      messages: getMessagesWithUserMessage(chatMachineState.context, userMessage),
    });
  };

  const formSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (inputValue.length) {
      const userMessage: Message = inputToMessage(chatMachineState.context, inputValue);

      chatMachineSend({
        type: ChatEventType.read,
        messages: getMessagesWithUserMessage(chatMachineState.context, userMessage),
      });

      setInputValue('');
    }
  };

  const pageExiting = () => router.pathname !== initialRoute;

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <AnimatePresence>{!pageExiting() && <ChatToggleButton theme={theme} />}</AnimatePresence>
        <AnimatePresence>
          {!pageExiting() && initialRoute === '/' && (
            <ChatStyles.ChatContainer>
              <ChatStyles.MessagesContainer id="message-continer">
                <ChatStyles.Messages>
                  {chatMachineState?.context?.messages?.map((message: Message, index: number) => (
                    <ChatStyles.MessageContainer key={index}>
                      <ChatStyles.Message type={message.type}>{message.content}</ChatStyles.Message>
                    </ChatStyles.MessageContainer>
                  ))}
                  {chatMachineState?.context?.typing && (
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
                  {options?.map((option: Option) => (
                    <Button
                      key={option.id}
                      callback={(event: MouseEvent) => optionClicked(option, event)}
                      disabled={chatMachineState.value !== 'listening'}>
                      {option.text}
                    </Button>
                  ))}
                </ChatStyles.Options>
                <ChatStyles.Form onSubmit={formSubmit}>
                  <ChatStyles.Input
                    type="text"
                    placeholder={getPlaceholder(chatMachineState.context)}
                    value={inputValue}
                    onChange={(event: any) => setInputValue(event.target.value)}
                    disabled={chatMachineState.value !== 'listening'}
                    ref={textInput}
                  />
                  <Button type="submit" disabled={chatMachineState.value !== 'listening'}>
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
