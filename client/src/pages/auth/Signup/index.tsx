import { FC, useEffect, useState } from "react";
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
  FormGroup,
  FormField,
} from "semantic-ui-react";
import { SignupSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signup } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
import Input from "../../../components/ui/Input";

const Signup: FC = () => {
  const { logIn } = authStore((store) => store);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    setValue,
    trigger,
    register,
    // getValues,
    formState: { errors },
    // setValue,
  } = useForm({
    resolver: yupResolver(SignupSchema as any),
    mode: "onBlur",
  });

  const { mutate: signupMutate } = useMutation(signup);

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
        <Header style={{ letterSpacing: "6px", textAlign: "center" }}>
          SIGN UP
        </Header>

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
