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

export const Root = styled.section([ContainerStyles]);

export const Container = styled.section();

export const MessagesContainer = styled.div({
  backgroundColor: Color.white,
  borderRadius: forTopAndRight(withPx(Constant.borderRadius)),
  padding: forTopLeftRight(withPx(Constant.baseSpacing * 3)),
  paddingBottom: withPx(Constant.baseSpacing),
});

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
  maxWidth: '95%',
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
});

export const Submit = styled.button();
