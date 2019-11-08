import styled from '@emotion/styled';
import { MessageType } from './chat.types';
import {
  ContainerStyles,
  Color,
  Constant,
  withPx,
  forTopAndRight,
  forSides,
  forTopLeftRight,
  forBottomAndLeft,
} from '../../styles';

const bgImage = require('../../public/images/bg.jpg?webp&size=1400');

export const Root: any = styled.section((props: any) => [
  [ContainerStyles],
  {
    backgroundImage: `url(${bgImage})`,
    backgroundSize: '100%',
  },
  !props.theme.home && {
    position: 'fixed',
    maxWidth: '100%',
    width: 500,
    bottom: 16,
    right: 0,
  },
]);

export const Container = styled.section();

export const MessagesContainer = styled.div((props: any) => [
  {
    backgroundColor: Color.white,
    borderRadius: forTopAndRight(withPx(Constant.borderRadius)),
    padding: forTopLeftRight(withPx(Constant.baseSpacing * 3)),
    paddingBottom: withPx(Constant.baseSpacing),
  },
  !props.theme.home && {
    height: 300,
    overflow: 'auto',
  },
]);

export const Messages = styled.div();

export const MessageContainer = styled.div({
  display: 'flex',
});

const GetMessageStyles = (type: string) => ({
  display: 'inline-flex',
  backgroundColor: type === MessageType.koltron ? Color.lightGray : Color.seconday,
  color: type === MessageType.koltron ? Color.black : Color.white,
  marginLeft: type === MessageType.koltron ? 0 : 'auto',
  borderRadius: Constant.borderRadius,
  padding: withPx(Constant.baseSpacing),
  marginBottom: withPx(Constant.baseSpacing * 2),
  maxWidth: '90%',
});

export const Message = styled.div((props: any) => [GetMessageStyles(props.type)]);

export const LoadingMessage = styled.div([GetMessageStyles(MessageType.koltron)], {
  color: Color.darkGray,
  padding: forSides(withPx(Constant.baseSpacing / 2)),
});

export const InputContainer = styled.div({
  backgroundColor: Color.lightGray,
  padding: withPx(Constant.baseSpacing * 3),
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,.12), inset 0 1px 2px rgba(0,0,0,.14)',
  borderRadius: forBottomAndLeft(withPx(Constant.borderRadius)),
});

export const Options = styled.div({
  marginBottom: withPx(Constant.baseSpacing * 2),
  button: {
    marginRight: withPx(Constant.baseSpacing * 1.5),
    textAlign: 'left',
  },
});

export const Form = styled.form({
  display: 'flex',
  alignItems: 'flex-start',
  button: {
    display: 'inline-flex',
    padding: withPx(Constant.baseSpacing / 2),
  },
});

export const Input = styled.input({
  flex: 1,
  borderRadius: Constant.borderRadius,
  border: `solid 1px ${Color.mediumGray}`,
  marginRight: withPx(Constant.baseSpacing),
  fontSize: 14,
  fontWeight: 400,
  padding: withPx(Constant.baseSpacing),
  '::placeholder': {
    color: Color.darkGray,
  },
  ':disabled': {
    background: Color.mediumGray,
    cursor: 'not-allowed',
  },
});

export const Submit = styled.button();
