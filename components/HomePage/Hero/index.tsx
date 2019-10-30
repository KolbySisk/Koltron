import * as HeroStyles from './hero.styles';
import Image from '../../Image';

const HeroComponent = () => (
  <HeroStyles.Root>
    <HeroStyles.Container>
      <HeroStyles.Header>
        <HeroStyles.Logo
          dangerouslySetInnerHTML={{
            __html: require('../../../public/images/logo-white.svg?include&size=80'),
          }}
        />
      </HeroStyles.Header>
      <HeroStyles.ContentContainer>
        <HeroStyles.LeftContent>
          <HeroStyles.Intro>Bold Creative Experiences</HeroStyles.Intro>
        </HeroStyles.LeftContent>
        <HeroStyles.RightContent>
          <HeroStyles.Koltron>
            <Image imageName="placeholder-robot.png" size={600}></Image>
          </HeroStyles.Koltron>
        </HeroStyles.RightContent>
      </HeroStyles.ContentContainer>
    </HeroStyles.Container>
    {/* <HeroStyles.Background>
      <Image imageName="hero-bg.jpg" size={1400}></Image>
    </HeroStyles.Background> */}
  </HeroStyles.Root>
);

export default HeroComponent;
