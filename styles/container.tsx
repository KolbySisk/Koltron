import { css } from '@emotion/core';
import { containerWidth, marginWidth } from './spacing';
import { withPx, forSides } from './utility';

export const ContainerStyles = css({
  width: '100%',
  maxWidth: containerWidth,
  padding: forSides(withPx(marginWidth)),
  margin: forSides('auto'),
  boxSizing: 'border-box',
});
