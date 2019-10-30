import { css } from '@emotion/core';
import { Typography } from './typography';

export const GlobalStyles = css([
  Typography,
  {
    '*': {
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
  },
]);
