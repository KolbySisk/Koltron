import Router, { useRouter } from 'next/router';
import { FaCommentDots, FaThLarge } from 'react-icons/fa';
import * as HeroStyles from './hero.styles';
import Button from '../Button';
import { spaced, Color } from '../../styles';

const HeroComponent = ({ updatePage }: Props) => {
  const router = useRouter();

  const chatClicked = () => {
    alert('yo');
  };

  const workClicked = event => {
    event.preventDefault();
    router.push(Router.pathname, `/work/`, { shallow: true });
    updatePage('work');
  };

  const logoClicked = event => {
    event.preventDefault();
    router.push(Router.pathname, `/`);
    updatePage(undefined);
  };

  return (
    <HeroStyles.Root>
      <HeroStyles.Container>
        <HeroStyles.Header>
          <HeroStyles.Logo
            onClick={logoClicked}
            dangerouslySetInnerHTML={{
              __html: require('../../public/images/logo-white.svg?include&size=80'),
            }}
          />
        </HeroStyles.Header>
        <HeroStyles.ContentContainer>
          <HeroStyles.LeftContent>
            <HeroStyles.Intro>Bold Creative Experiences</HeroStyles.Intro>
            <span style={{ marginRight: spaced(2) }}>
              <Button callback={chatClicked} icon={true}>
                Chat with Koltron <FaCommentDots size="1.3em" />
              </Button>
            </span>
            <Button
              callback={workClicked}
              color={Color.white}
              fontColor={Color.primary}
              icon={true}>
              View work <FaThLarge size="1.3em" />
            </Button>
          </HeroStyles.LeftContent>
          <HeroStyles.RightContent>
            <HeroStyles.Koltron>
              <picture>
                <source
                  srcSet={require(`../../public/images/placeholder-robot.png?webp&size=600`)}
                  type="image/webp"
                />
                <img src={require(`../../public/images/placeholder-robot.png?size=600`)} />
              </picture>
            </HeroStyles.Koltron>
          </HeroStyles.RightContent>
        </HeroStyles.ContentContainer>
      </HeroStyles.Container>
    </HeroStyles.Root>
  );
};

interface Props {
  updatePage: Function;
}

export default HeroComponent;
