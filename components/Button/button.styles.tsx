import styled from '@emotion/styled';
import { Constant, Color, withPx } from '../../styles';

export const Button = styled.button((props: any) => ({
  backgroundColor: props.color,
  padding: `${withPx(Constant.baseSpacing * 1.5)} ${withPx(Constant.baseSpacing * 2)}`,
  borderRadius: Constant.borderRadius,
  fontSize: '12px',
  fontWeight: 600,
  color: props.fontColor,
  ':hover, :focus': {
    border: `solid 1px ${Color.lightGray}`,
    boxShadow: '0 1px 2px rgba(0,0,0,0.25), 0 1px 2px rgba(0,0,0,0.22)',
  },
}));
