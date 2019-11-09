import { useRouter } from 'next/router';
import { ThemeProvider } from 'emotion-theming';
import * as AppLayoutStyles from './app.styles';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

import { ContextProvider } from './app.context';
import { useState, useEffect } from 'react';

const AppLayout = () => {
  const [isHome, setIsHome] = useState(true);
  const router = useRouter();
  const { page } = router.query;

  useEffect(() => {
    window.onpopstate = e => {
      //console.log(router.query.params);
    };
  }, []);

  useEffect(() => {
    setIsHome(page === undefined);
  }, [page]);

  const updatePage = (page: string | undefined) => {
    setIsHome(page === undefined);
  };

  return (
    <AppLayoutStyles.Root>
      <ThemeProvider theme={{ home: isHome }}>
        <ContextProvider value={{ home: isHome }}>
          <Hero updatePage={updatePage} />
          <Chat />
        </ContextProvider>
      </ThemeProvider>
    </AppLayoutStyles.Root>
  );
};

export default AppLayout;
