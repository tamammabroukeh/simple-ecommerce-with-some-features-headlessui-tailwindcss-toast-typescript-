import { IColor } from "../interfaces/Interfaces";

const SpanCircle = ({ color, ...rest }: IColor) => {
  return (
    <span
      className={`w-5 h-5 rounded-full mb-1 cursor-pointer`}
      style={{ backgroundColor: color }}
      {...rest}
    />
  );
};
export default SpanCircle;
