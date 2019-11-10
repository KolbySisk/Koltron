import Router from 'next/router';
import { ThemeProvider } from 'emotion-theming';
import * as HomeStyles from './home.styles';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';
import { useState, useEffect } from 'react';

const HomeLayout = () => {
  const [chatInit, setChatInit] = useState(false);
  // const [smallChat, setSmallChat] = useState(false);

  // const routeIsHome = route => {
  //   setSmallChat(route === '/');
  // };

  // useEffect(() => {
  //   Router.events.on('routeChangeStart', routeIsHome);

  //   return () => {
  //     Router.events.off('routeChangeStart', routeIsHome);
  //   };
  // });

  const initChat = () => {
    setChatInit(true);
  };

  return (
    <HomeStyles.Root>
      <ThemeProvider theme={{ home: true }}>
        <Hero initChat={initChat} />
        <Chat chatInit={chatInit} />
      </ThemeProvider>
    </HomeStyles.Root>
  );
};

export default HomeLayout;
