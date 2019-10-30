import { css } from '@emotion/core';
import { Typography } from './typography';
import { ResetStyles } from './reset';

export const GlobalStyles = css([
  Typography,
  ResetStyles,
  {
    body: {
      backgroundColor: '#000',
    },
  },
]);
