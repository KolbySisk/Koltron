import _ from 'lodash';
import { useEffect, useMemo, FormEvent, useState, useRef } from 'react';
import { useMachine } from '@xstate/react';
import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import * as ChatStyles from './chat.styles';
import { createChatMachine, ChatEventType } from './chat.machine';
import { Message, Option, ChatTopic } from './chat.types';
import { inputToMessage, getMessagesWithUserMessage, optionToMessage, getPlaceholder } from './chat.utility';
import Button from '../Button';
import { options } from './options';

const ChatComponent = () => {
  const chatMachine = useMemo(() => createChatMachine(), []);
  const [current, send] = useMachine(chatMachine);
  const [inputValue, setInputValue] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    send(ChatEventType.init);
  }, []);

  useEffect(() => {
    textInput.current.scrollIntoView();
    setTimeout(() => {
      textInput.current.focus();
    });
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

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <ChatStyles.MessagesContainer>
          <ChatStyles.Messages>
            {current?.context?.messages?.map((message: Message, index: number) => (
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
    </ChatStyles.Root>
  );
};

export default ChatComponent;
