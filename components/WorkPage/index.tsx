import * as WorkPageStyles from './work-page.styles';
import Chat from '../Chat';
import { ThemeProvider } from 'emotion-theming';

const WorkPageComponent = () => {
  return (
    <WorkPageStyles.Root>
      <ThemeProvider
        theme={{
          mini: true,
        }}>
        <Chat />
      </ThemeProvider>
    </WorkPageStyles.Root>
  );
};

export default WorkPageComponent;
