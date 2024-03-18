import { IInput } from "../interfaces/Interfaces";

const Input = ({ ...rest }: IInput) => {
  return <input {...rest} />;
};

export default Input;
