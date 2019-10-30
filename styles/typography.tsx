import { css } from '@emotion/core';

export const TitleFont = css({
  fontFamily: `'Rubik', 'Open sans', helvetica, sans-serif`,
});

export const BodyFont = css({
  fontFamily: `'Roboto Condensed', 'Open sans', helvetica, sans-serif`,
});

export const Typography = css({
  h1: [
    TitleFont,
    {
      fontSize: 48,
      fontWeight: 'bold',
      color: 'white',
    },
  ],
  p: [
    BodyFont,
    {
      fontSize: 16,
    },
  ],
});