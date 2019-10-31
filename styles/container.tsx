import { css } from '@emotion/core';
import { Constant } from './constant';
import { withPx, forSides } from './utility';

export const ContainerStyles = css({
  width: '100%',
  maxWidth: Constant.containerWidth,
  padding: forSides(withPx(Constant.marginWidth)),
  margin: forSides('auto'),
  boxSizing: 'border-box',
});
