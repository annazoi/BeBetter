import { FC } from "react";
import { FormInput } from "semantic-ui-react";

type InputProps = {
  register?: any;
  error?: any;
  icon?: any;
  iconPosition?: string;
  label?: string;
  placeholder?: string;
} & React.ComponentProps<typeof FormInput>;

const Input: FC<InputProps> = ({
  register,
  error,
  icon,
  iconPosition,
  label,
  placeholder,
}) => {
  return (
    <input
      {...register}
      {...error}
      placeholder={placeholder}
      label={label}
      icon={icon}
      iconPosition={iconPosition}
    ></input>
  );
};
export default Input;
