import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Global } from '@emotion/core';
import { GlobalStyles } from '../styles';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Global styles={GlobalStyles} />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700|Rubik:700&display=swap"
          rel="stylesheet"
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
