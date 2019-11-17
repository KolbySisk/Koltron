import { useState } from 'react';
import { ThemeProvider } from 'emotion-theming';
import * as HomeStyles from './home.styles';
import AppLayout from '../layout';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

const HomeLayout = () => {
  const [chatInit, setChatInit] = useState(false);

  const initChat = () => {
    setChatInit(true);
  };

  return (
    <AppLayout>
      <HomeStyles.Root>
        <ThemeProvider theme={{ home: true }}>
          <Hero initChat={initChat} />
          <Chat chatInit={chatInit} />
        </ThemeProvider>
      </HomeStyles.Root>
    </AppLayout>
  );
};

export default HomeLayout;
