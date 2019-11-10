import { useEffect, useMemo, FormEvent, useState, useRef } from 'react';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import { useMachine } from '@xstate/react';
import { useTheme } from 'emotion-theming';
import { animateScroll as scroll } from "react-scroll";
import { motion } from 'framer-motion';
import _ from 'lodash';
import * as ChatStyles from './chat.styles';
import { createChatMachine, ChatEventType } from './chat.machine';
import { Message, Option } from './chat.types';
import { inputToMessage, getMessagesWithUserMessage, optionToMessage, getPlaceholder } from './chat.utility';
import Button from '../Button';
import { options } from './options';

const ChatComponent = ({chatInit}: Props) => {
  const chatMachine = useMemo(() => createChatMachine(), []);
  const [current, send] = useMachine(chatMachine);
  const [inputValue, setInputValue] = useState('');
  const textInput = useRef(null);
  const theme: any = useTheme();

  useEffect(() => {
    if(chatInit) send(ChatEventType.init);
  }, [chatInit]);

  useEffect(() => {
    if(theme.smallChat){
      scroll.scrollToBottom({
        containerId: "message-continer",
        duration: 100,
        delay: 0
      });
    }
    else{
      scroll.scrollToBottom({duration: 1000, delay: 0});
      setTimeout(() => {
        textInput.current.focus();
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

  
  // animation controls: https://www.framer.com/api/motion/animation/#animation-controls 
  // variants: https://www.framer.com/api/motion/animation/#variants
  return (
    <ChatStyles.Root>
      <motion.div
        id="chat-motion"
        transition={{ duration: .5 }}
        initial={theme.smallChat ? ChatStyles.PageTransition.InitialSmall : ChatStyles.PageTransition.Initial}
        animate={theme.smallChat ? ChatStyles.PageTransition.EnterSmall : ChatStyles.PageTransition.Enter}
        exit={theme.smallChat ? ChatStyles.PageTransition.ExitSmall : ChatStyles.PageTransition.Exit}>
        <ChatStyles.Container>
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
              {options?.map((option: Option) => (
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
        </ChatStyles.Container>
      </motion.div>
    </ChatStyles.Root>
  );
};

interface Props {
  chatInit?: boolean;
}

export default ChatComponent;
