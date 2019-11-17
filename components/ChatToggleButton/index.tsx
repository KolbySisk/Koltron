import { ChatToggleButton } from './chat-toggle-button.styles';
import { MdChat } from 'react-icons/md';

const ChatToggleButtonComponent = ({ theme }) => {
  return (
    <ChatToggleButton theme={theme}>
      <MdChat size="2em" />
    </ChatToggleButton>
  );
};

export default ChatToggleButtonComponent;
