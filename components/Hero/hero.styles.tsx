import styled from '@emotion/styled';
import { ContainerStyles, spaced, withPx, Constant } from '../../styles';
import { motion } from 'framer-motion';

const bgImage = require('../../public/images/hero-bg.jpg?webp&size=1400');
const bgTransitionImage = require('../../public/images/bg-transition.png');

export const Root = styled.section({
  backgroundImage: `url(${bgImage})`,
  backgroundSize: '100%',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  marginTop: -Constant.verticalMargin,
  paddingTop: Constant.verticalMargin,
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
    pointerEvents: 'none',
  },
});

export const Container = styled.div([ContainerStyles]);

export const Header = styled.header();

export const Logo = styled.div({ width: 80 });

export const ContentContainer: any = styled(motion.div)([
  {
    paddingTop: withPx(spaced(4)),
    paddingBottom: withPx(spaced(8)),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
]);

ContentContainer.defaultProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.6 },
};

export const LeftContent = styled.div({
  flex: 0,
});

export const RightContent = styled.div();

export const Koltron = styled.div({
  img: { maxHeight: 350 },
});

export const Intro = styled.h1({
  color: 'white',
  wordSpacing: '100vw',
  marginBottom: spaced(4),
});
