import { FC } from "react";
import { FormField, Input } from "semantic-ui-react";

type InputProps = {
  register?: any;
  error?: any;
  icon?: any;
  iconPosition?: string;
  label?: string;
  placeholder?: string;
  name?: any;
  onBlur?: any;
  type?: any;
} & React.ComponentProps<typeof FormField>;

const FormInput: FC<InputProps> = ({
  error,
  icon,
  iconPosition,
  label,
  placeholder,
  name,
  onBlur,
  type,
}) => {
  return (
    <FormField
      control={Input}
      label={label}
      placeholder={placeholder}
      name={name}
      onBlur={onBlur}
      icon={icon}
      iconPosition={iconPosition}
      error={
        error && {
          content: error.message,
          pointing: "below",
        }
      }
      type={type}
    ></FormField>
  );
};
export default FormInput;
