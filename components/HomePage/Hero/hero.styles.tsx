import styled from '@emotion/styled';
import { ContainerStyles, spaced, withPx, forTopAndBottom } from '../../../styles';

const bgImage = require('../../../public/images/hero-bg.jpg?webp&size=1400');
const bgTransitionImage = require('../../../public/images/bg-transition.png');

export const Root = styled.section({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  ':after': {
    content: '""',
    height: '200px',
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundImage: `url(${bgTransitionImage})`,
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundPositionY: '100%',
  },
});

export const Container = styled.div([ContainerStyles], {
  paddingTop: withPx(spaced(4)),
});

export const Header = styled.header({});

export const Logo = styled.div({ width: 80 });

export const ContentContainer = styled.div({
  padding: forTopAndBottom(withPx(spaced(8))),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const LeftContent = styled.div({
  flex: 0,
  marginTop: withPx(-spaced(8)),
});

export const RightContent = styled.div();

export const Koltron = styled.div({
  img: { maxHeight: 400 },
});

export const Intro = styled.h1({
  color: 'white',
  wordSpacing: '100vw',
});
