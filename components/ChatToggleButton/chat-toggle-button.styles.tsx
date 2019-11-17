import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Color, Constant } from '../../styles';

const State = {
  hide: { bottom: -70, opacity: 0, transition: { duration: 0.5 } },
  show: { bottom: Constant.verticalMargin, opacity: 1, transition: { delay: 0.1, duration: 0.5 } },
};

const ChatToggleBase: any = styled(motion.button)(() => [
  {
    width: 50,
    height: 50,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
    color: Color.primary,
    position: 'fixed',
    right: Constant.sideMargin,
  },
]);

export const ChatToggleButton = ({ theme, children }) => {
  ChatToggleBase.defaultProps = {
    initial: theme.home ? State.hide : State.show,
    exit: !theme.home ? State.hide : State.show,
  };
  return <ChatToggleBase>{children}</ChatToggleBase>;
};
