import { css } from '@emotion/core';

export const GlobalStyles = css({
  '*': {
    fontWeight: 400,
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  'html, #__next': {
    height: '100%',
  },
  'html body': {
    height: '100%',
    margin: 0,
  },
  'button, a': {
    cursor: 'pointer',
  },
});
