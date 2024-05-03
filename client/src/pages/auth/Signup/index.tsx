import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css";
import {
  Button,
  Divider,
  Form,
  FormInput,
  Grid,
  GridColumn,
  Segment,
  Card,
  GridRow,
  ButtonGroup,
  Header,
} from "semantic-ui-react";
import { SignupSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signup } from "../../../services/auth";
import Input from "../../../components/ui/Input";

const Signup: FC = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    // getValues,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
  });

  const { mutate: signupMutate, isLoading: signupIsLoading } =
    useMutation(signup);

  function onSubmit(values: any) {
    console.log("values", values);
    signupMutate(values, {
      onSuccess: (data) => {
        console.log("data", data);
        reset();
        navigate("/home");
      },
    });
  }
  return (
    <>
      <Segment
        placeholder
        style={{
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <Header style={{ letterSpacing: "6px", textAlign: "center" }}>
          SIGN UP
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register("username")}
            error={errors.username?.message}
            placeholder="Username"
            label="Username"
            icon="user"
            iconPosition="left"
          ></Input>
          <Input
            register={register("fullName")}
            error={errors.fullName?.message}
            placeholder="Full Name"
            label="Full Name"
            icon="lock"
            iconPosition="left"
          ></Input>
          <Input
            register={register("password")}
            error={errors.password?.message}
            placeholder="Password"
            label="Password"
            icon="user"
            iconPosition="left"
            type="password"
          ></Input>

          <Grid
            style={{
              justifyContent: "center",
              marginTop: "20px",
              marginBottom: "10px",
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
              />
            </ButtonGroup>
          </Grid>
        </Form>
        <Divider horizontal>Or connect with</Divider>
        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <Button icon="google" color="google plus" content="Google" />
          <Button icon="facebook" color="facebook" content="Facebook" />
        </div>
      </Segment>
    </>
  );
};

export default Signup;
