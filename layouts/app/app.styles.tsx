import styled from '@emotion/styled';

const bgImage = require('../../public/images/bg.jpg?webp&size=1400');

export const Root = styled.div({
  height: '100%',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: '100%',
});
