import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'emotion-theming';
import * as HomePageStyles from './home-page.styles';
import Hero from './Hero';
import Chat from '../Chat';

const HomePageComponent = () => {
  const router = useRouter();
  const { page } = router.query;

  // useEffect(() => {
  //   console.log(page);
  // }, [page]);

  return (
    <HomePageStyles.Root>
      <ThemeProvider
        theme={{
          home: page === undefined,
        }}>
        <Hero />
        <Chat />
      </ThemeProvider>
    </HomePageStyles.Root>
  );
};

export default HomePageComponent;
