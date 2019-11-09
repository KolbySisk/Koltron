import { ThemeProvider } from 'emotion-theming';
import * as HomeStyles from './home.styles';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

const HomeLayout = () => {
  return (
    <HomeStyles.Root>
      <ThemeProvider theme={{ home: true }}>
        <Hero />
        <Chat />
      </ThemeProvider>
    </HomeStyles.Root>
  );
};

export default HomeLayout;
