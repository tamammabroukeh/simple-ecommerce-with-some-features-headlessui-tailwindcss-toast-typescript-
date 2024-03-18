import { IImage } from "../interfaces/Interfaces";
const Image = ({ ImageURL, altText, classes }: IImage) => {
  return <img src={ImageURL} alt={altText} className={classes} />;
};

export default Image;
