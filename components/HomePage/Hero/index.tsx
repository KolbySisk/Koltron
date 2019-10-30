import * as HeroStyles from './hero.styles';

const HeroComponent = () => {
  return (
    <HeroStyles.Root>
      <HeroStyles.AbsoluteContainer>
        <HeroStyles.Header>
          <HeroStyles.Logo
            dangerouslySetInnerHTML={{
              __html: require('../../../images/logo-white.svg?include&size=80'),
            }}
          />
        </HeroStyles.Header>
        <HeroStyles.ContentContainer>
          <HeroStyles.LeftContent>
            <HeroStyles.Intro>Bold Creative Experiences</HeroStyles.Intro>
          </HeroStyles.LeftContent>
          <HeroStyles.RightContent></HeroStyles.RightContent>
        </HeroStyles.ContentContainer>
      </HeroStyles.AbsoluteContainer>
      <HeroStyles.Background>
        <source srcSet={require('../../../images/hero-bg.jpg?webp&size=1400')} type="image/webp" />
        <source srcSet={require('../../../images/hero-bg.jpg?size=1400')} type="image/jpeg" />
        <img src={require('../../../images/hero-bg.jpg?size=1400')} />
      </HeroStyles.Background>
    </HeroStyles.Root>
  );
};

export default HeroComponent;
