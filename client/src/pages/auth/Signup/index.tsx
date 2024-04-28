import { FC } from "react";
import { useNavigate } from "react-router-dom";
// import { yupResolver } from "@hookform/resolvers/yup";
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
    // resolver: yupResolver(SignupSchema as any),
  });

  function onSubmit(values: any) {
    console.log("values", values);
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
        <Header style={{ letterSpacing: "2px", textAlign: "center" }}>
          SIGN UP
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            icon="user"
            iconPosition="left"
            label="Username"
            placeholder="Username"
          />
          <FormInput
            icon="user"
            iconPosition="left"
            label="Full Name"
            placeholder="Full Name"
          />
          <FormInput
            icon="lock"
            iconPosition="left"
            label="Password"
            placeholder="Password"
            type="password"
          />
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
                icon="signup"
                onClick={() => navigate("/signin")}
              />
              <Button content="Sign up" color="olive" icon="signup" />
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
