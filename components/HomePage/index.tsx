import * as HomePageStyles from './home-page.styles';
import Hero from './Hero';
import Chat from '../Chat';

const HomePageComponent = () => {
  return (
    <HomePageStyles.Root>
      <Hero />
      <Chat />
    </HomePageStyles.Root>
  );
};

export default HomePageComponent;
