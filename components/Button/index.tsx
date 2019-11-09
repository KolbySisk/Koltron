import Link from 'next/link';
import * as ButtonStyles from './button.styles';
import { Color } from '../../styles';

const ButtonComponent = ({
  color = Color.primary,
  fontColor = Color.white,
  callback,
  children,
  disabled,
  type,
  icon,
  href,
}: Props) => {
  return (
    <>
      {href ? (
        <Link href={href} passHref>
          <ButtonStyles.AnchorButton
            color={color}
            fontColor={fontColor}
            onClick={callback}
            type={type}
            disabled={disabled}
            icon={icon}>
            {children}
          </ButtonStyles.AnchorButton>
        </Link>
      ) : (
        <ButtonStyles.Button
          color={color}
          fontColor={fontColor}
          onClick={callback}
          type={type}
          disabled={disabled}
          icon={icon}>
          {children}
        </ButtonStyles.Button>
      )}
    </>
  );
};

interface Props {
  color?: string;
  fontColor?: string;
  callback?: Function;
  children: any;
  disabled?: boolean;
  type?: string;
  icon?: boolean;
  href?: string;
}

export default ButtonComponent;
