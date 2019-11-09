import { FaCommentDots, FaThLarge } from 'react-icons/fa';
import { motion } from 'framer-motion';
import * as HeroStyles from './hero.styles';
import Button from '../Button';
import { spaced, Color } from '../../styles';

const HeroComponent = () => {
  const chatClicked = () => {
    alert('yo');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <HeroStyles.Root>
        <HeroStyles.Container>
          <HeroStyles.Header>
            <HeroStyles.Logo
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

              <Button color={Color.white} fontColor={Color.primary} icon={true} href="/work">
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
    </motion.div>
  );
};

export default HeroComponent;
