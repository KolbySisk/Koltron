import { useRouter } from 'next/router';
import { ThemeProvider } from 'emotion-theming';
import * as AppStyles from './app.styles';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

const HomePageComponent = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <AppStyles.Root>
      <ThemeProvider
        theme={{
          home: page === undefined,
        }}>
        <Hero />
        <Chat />
      </ThemeProvider>
    </AppStyles.Root>
  );
};

export default HomePageComponent;
