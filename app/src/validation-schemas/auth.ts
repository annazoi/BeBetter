import * as yup from "yup";

export const SignupSchema = yup.object().shape({
  username: yup.string().required(),
  fullName: yup.string().required(),
  password: yup.string().required(),
});

export const SigninSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});
