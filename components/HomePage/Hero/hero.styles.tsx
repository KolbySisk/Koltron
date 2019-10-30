import styled from '@emotion/styled';
import { ContainerStyles } from '../../../styles/container';

export const Root = styled.section();

export const Background = styled.picture({
  width: '100%',
  img: {
    width: '100%',
  },
});

export const AbsoluteContainer = styled.div({
  ContainerStyles,
  position: 'absolute',
  top: 32,
  left: 32,
  right: 32,
});

export const Header = styled.header({});

export const Logo = styled.div({ width: 80 });

export const ContentContainer = styled.div({});
export const LeftContent = styled.div({});
export const RightContent = styled.div({});
export const Intro = styled.h1({
  fontSize: 50,
  color: 'white',
  wordSpacing: '100vw',
});
