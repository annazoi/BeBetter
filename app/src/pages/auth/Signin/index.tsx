import { FC } from "react";
import {
  Button,
  // Divider,
  Form,
  Grid,
  Segment,
  ButtonGroup,
  Image,
  Message,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninSchema } from "../../../validation-schemas/auth";
import Input from "../../../components/ui/Input";
import { authStore } from "../../../store/authStore";
import { signin } from "../../../services/auth";
import { useMutation } from "react-query";
import logo from "../../../assets/logo.png";

const Signin: FC = () => {
  const { logIn } = authStore((store) => store);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SigninSchema as any),
    mode: "onBlur",
  });

  const {
    mutate: signinMutate,
    isLoading: isLoadingSignin,
    isError: isErrorSignin,
  } = useMutation(signin);

  const handleChange = (e: any) => {
    e.persist();
    setValue(e.target.name, e.target.value);
    trigger(e.target.name);
  };

  const onSubmit = (values: any) => {
    signinMutate(values, {
      onSuccess(data: any) {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
        });
        console.log(data);
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
          // gap: "20px",
        }}
      >
        <Image src={logo} size="small" centered />
        <h2
          style={{
            letterSpacing: "6px",
            textAlign: "center",
          }}
        >
          SIGN IN
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
          />
          <Input
            label="Password"
            placeholder="Password"
            name="password"
            type="password"
            onBlur={handleChange}
            icon="lock"
            iconPosition="left"
            error={errors.password}
          />

          <Grid
            style={{
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "40px",
            }}
          >
            <ButtonGroup>
              <Button
                content="Sign up"
                icon="signup"
                onClick={() => navigate("/signup")}
              />
              <Button
                content="Sign in"
                color="olive"
                icon="sign-in"
                type="submit"
                loading={isLoadingSignin}
              />
            </ButtonGroup>
          </Grid>
          {isErrorSignin && (
            <Message
              icon="warning circle"
              negative
              header="Error"
              content="Invalid username or password"
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

export default Signin;
