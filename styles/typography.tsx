import { css } from '@emotion/core';

export const TitleFont = css({
  fontFamily: `'Rubik', 'Open sans', helvetica, sans-serif`,
});

export const BodyFont = css({
  fontFamily: `'Roboto Condensed', 'Open sans', helvetica, sans-serif`,
});

export const Typography = css({
  body: [
    BodyFont,
    {
      fontSize: 16,
      lineHeight: '22px',
    },
  ],
  h1: [
    TitleFont,
    {
      fontSize: 60,
      fontWeight: 'bold',
      color: 'white',
      lineHeight: '68px',
    },
  ],
});
