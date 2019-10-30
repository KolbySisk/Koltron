import { css } from '@emotion/core';

export const ResetStyles = css({
  '*, *:before, *:after': {
    boxSizing: 'inherit',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  html: {
    boxSizing: 'border-box',
  },
  'html body': {
    height: '100%',
    margin: 0,
  },
  'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  'html, #__next': {
    height: '100%',
  },
  'ol, ul': {
    listStyle: 'none',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
  'button, a': {
    cursor: 'pointer',
  },
});
