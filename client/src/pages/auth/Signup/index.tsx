import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  ButtonGroup,
  Image,
  Message,
} from "semantic-ui-react";
import { SignupSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signup } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
import Input from "../../../components/ui/Input";
import logo from "../../../assets/logo.png";

const Signup: FC = () => {
  const { logIn } = authStore((store) => store);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    setValue,
    trigger,
    // getValues,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
    mode: "onBlur",
  });

  const {
    mutate: signupMutate,
    isLoading: isLoadingSignup,
    isError: isErrorSignup,
  } = useMutation(signup);

  const handleChange = (e: any) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const onSubmit = (values: any) => {
    // console.log("values", values);
    signupMutate(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
        });
        // console.log("data", data);
        reset();
        navigate("/home");
      },
    });
  };

  return (
    <>
      <Segment
        placeholder
        style={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Image src={logo} size="small" centered />
        <h2
          style={{
            letterSpacing: "6px",
            textAlign: "center",
          }}
        >
          SIGN UP
        </h2>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            placeholder="Username"
            name="username"
            onBlur={handleChange}
            icon="user"
            iconPosition="left"
            error={errors.username}
          ></Input>
          <Input
            label="Full Name"
            placeholder="Full Name"
            name="fullName"
            onBlur={handleChange}
            icon="user"
            iconPosition="left"
            error={errors.fullName}
          ></Input>
          <Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            onBlur={handleChange}
            icon="lock"
            iconPosition="left"
            error={errors.password}
          ></Input>
          <Grid
            style={{
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            <ButtonGroup>
              <Button
                content="Sign in"
                icon="sign-in"
                onClick={() => navigate("/signin")}
              />
              <Button
                content="Sign up"
                color="olive"
                icon="signup"
                type="submit"
                loading={isLoadingSignup}
              />
            </ButtonGroup>
          </Grid>
          {isErrorSignup && (
            <Message
              icon="warning circle"
              negative
              header="Error"
              content="Username already exists"
              attached="bottom"
              size="small"
            />
          )}
        </Form>
        {/* <Divider horizontal>Or connect with</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button icon="google" color="google plus" content="Google" />
          <Button icon="facebook" color="facebook" content="Facebook" />
        </div> */}
      </Segment>
    </>
  );
};

export default Signup;
