const Image = ({ imageName, size }: Props) => {
  return (
    <picture>
      <source srcSet={require(`../../public/images/${imageName}?webp`)} type="image/webp" />
      <img src={require(`../../public/images/${imageName}`)} />
    </picture>
  );
};

interface Props {
  imageName: string;
  size: number;
}

export default Image;
