import * as ButtonStyles from './button.styles';
import { Color } from '../../styles';

const ButtonComponent = ({
  color = Color.primary,
  fontColor = Color.white,
  callback,
  children,
  type,
}: Props) => {
  return (
    <ButtonStyles.Button color={color} fontColor={fontColor} onClick={callback} type={type}>
      {children}
    </ButtonStyles.Button>
  );
};

interface Props {
  color?: string;
  fontColor?: string;
  callback?: Function;
  children: any;
  type?: string;
}

export default ButtonComponent;
