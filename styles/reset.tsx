import { css } from '@emotion/core';

export const ResetStyles = css({
  html: {
    boxSizing: 'border-box',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  'body, h1, h2, h3, h4, h5, h6, p, ol, ul': {
    margin: 0,
    padding: 0,
    fontWeight: 'normal',
  },
  'ol, ul': {
    listStyle: 'none',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
  },
});
