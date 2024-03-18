import { IButton } from "../interfaces/Interfaces";
const ButtonCard = ({ classes, children, ...rest }: IButton) => {
  // console.log(rest);
  return (
    <button
      className={`${classes} cursor-pointer w-full p-2 rounded-md text-white`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default ButtonCard;
