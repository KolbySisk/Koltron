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
      fontSize: 60,
      fontWeight: 'bold',
      color: 'white',
      lineHeight: '68px',
    },
  ],
  p: [
    BodyFont,
    {
      fontSize: 16,
    },
  ],
});
