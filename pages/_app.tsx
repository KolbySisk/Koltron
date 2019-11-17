import React from 'react';
import { AnimatePresence } from 'framer-motion';

function App({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  );
}
export default App;
