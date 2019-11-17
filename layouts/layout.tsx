import styled from '@emotion/styled';
import { forTopAndBottom, Constant, withPx } from '../styles';

const bgImage = require('../public/images/bg.jpg?webp&size=1400');

const AppRoot = styled.div({
  minHeight: '100%',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: '100%',
  padding: forTopAndBottom(withPx(Constant.verticalMargin)),
});

const AppLayout = ({ children }) => {
  return <AppRoot>{children}</AppRoot>;
};

export default AppLayout;
