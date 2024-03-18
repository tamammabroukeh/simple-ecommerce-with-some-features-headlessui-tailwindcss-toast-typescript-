import { IError } from "../interfaces/Interfaces";

const Error = ({ msg }: IError) => {
  return (
    msg && (
      <span className="text-sm block text-red-500 font-semibold">{msg}</span>
    )
  );
};

export default Error;
