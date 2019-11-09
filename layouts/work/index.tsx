import { ThemeProvider } from 'emotion-theming';
import * as WorkStyles from './work.styles';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

const WorkLayout = () => {
  return (
    <WorkStyles.Root>
      <ThemeProvider theme={{ home: false }}>
        <Hero />
        <Chat />
      </ThemeProvider>
    </WorkStyles.Root>
  );
};

export default WorkLayout;
