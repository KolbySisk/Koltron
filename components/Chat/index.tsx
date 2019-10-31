import { MdMoreHoriz, MdArrowUpward } from 'react-icons/md';
import * as ChatStyles from './chat.styles';
import Button from '../Button';

const ChatComponent = () => {
  const optionClicked = () => {
    alert('yo');
  };

  const formSubmit = event => {
    event.preventDefault();
    alert('woop');
  };

  return (
    <ChatStyles.Root>
      <ChatStyles.Container>
        <ChatStyles.MessagesContainer>
          <ChatStyles.Messages>
            <ChatStyles.MessageContainer>
              <ChatStyles.Message type="koltron">
                Hello, I’m Koltron 2020. I’m an AI designed to teach people about Kolby Sisk. It’s
                not a glamorous life, but it’s better than passing butter.
              </ChatStyles.Message>
            </ChatStyles.MessageContainer>
            <ChatStyles.MessageContainer>
              <ChatStyles.Message type="user">Sup</ChatStyles.Message>
            </ChatStyles.MessageContainer>
            <ChatStyles.MessageContainer>
              <ChatStyles.LoadingMessage>
                <MdMoreHoriz size="2.5em" />
              </ChatStyles.LoadingMessage>
            </ChatStyles.MessageContainer>
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
