import styled from '@emotion/styled';
import { Constant, Color, withPx } from '../../styles';

export const Button: any = styled.button((props: any) => ({
  backgroundColor: props.color,
  padding: `${withPx(Constant.baseSpacing * 1.5)} ${withPx(Constant.baseSpacing * 2)}`,
  borderRadius: Constant.borderRadius,
  fontSize: '12px',
  fontWeight: 600,
  color: props.fontColor,
  boxShadow: `inset 0 -2px 0 0 ${Color.primaryShadow}`,
  transition: 'all 0.2s cubic-bezier(.25,.8,.25,1)',
  ':hover, :focus': {
    boxShadow: `inset 0 -50px 10px 0 ${Color.primaryShadow}`,
  },
}));
