import { ThemeProvider } from 'emotion-theming';
import * as WorkStyles from './work.styles';
import AppLayout from '../layout';
import Hero from '../../components/Hero';
import Chat from '../../components/Chat';

const WorkLayout = () => {
  return (
    <AppLayout>
      <WorkStyles.Root>
        <ThemeProvider theme={{ smallChat: true, home: false }}>
          <Hero />
          <Chat />
        </ThemeProvider>
      </WorkStyles.Root>
    </AppLayout>
  );
};

export default WorkLayout;
