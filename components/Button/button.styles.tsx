import styled from '@emotion/styled';
import { Constant, Color, withPx, spaced, ColorUtil } from '../../styles';

export const Button: any = styled.button((props: any) => [
  {
    display: 'inline-flex',
    alignItems: 'center',
    backgroundColor: props.color,
    padding: `${withPx(Constant.baseSpacing * 1.5)} ${withPx(Constant.baseSpacing * 2)}`,
    borderRadius: Constant.borderRadius,
    fontSize: '12px',
    fontWeight: 600,
    color: props.fontColor,
    position: 'relative',
    boxShadow: `inset 0 -2px 0 0 ${ColorUtil(props.color).darken(0.1)}`,
    transition: 'all 0.2s cubic-bezier(.25,.8,.25,1)',
    ':hover, :focus': {
      boxShadow: `inset 0 -50px 10px 0 ${ColorUtil(props.color).darken(0.1)}`,
    },
    ':disabled': {
      cursor: 'not-allowed',
      ':after': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: Color.mediumGray,
        opacity: 0.7,
      },
    },
  },
  props.icon && {
    svg: {
      marginLeft: spaced(1.5),
    },
  },
]);
