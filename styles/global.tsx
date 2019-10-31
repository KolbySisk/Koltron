import { css } from '@emotion/core';
import { Typography } from './typography';
import { ResetStyles } from './reset';
import { Color } from './color';

export const GlobalStyles = css([
  Typography,
  ResetStyles,
  {
    body: {
      backgroundColor: Color.black,
    },
  },
]);
