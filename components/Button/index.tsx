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
}: Props) => {
  return (
    <ButtonStyles.Button
      color={color}
      fontColor={fontColor}
      onClick={callback}
      type={type}
      disabled={disabled}
      icon={icon}>
      {children}
    </ButtonStyles.Button>
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
}

export default ButtonComponent;
