import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./style.css";
import {
  Button,
  Form,
  Segment,
  Image,
  Message,
  Header,
  Divider,
} from "semantic-ui-react";
import { SignupSchema } from "../../../validation-schemas/auth";
import { useMutation } from "react-query";
import { signup } from "../../../services/auth";
import { authStore } from "../../../store/authStore";
import Input from "../../../components/ui/Input";
import logo from "../../../../public/logo.png";

const Signup: FC = () => {
  const { logIn } = authStore((store) => store);
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
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
    signupMutate(values, {
      onSuccess: (data) => {
        logIn({
          ...data.user,
          token: data.token,
          exp: data.exp,
          userId: data.user._id,
        });
        reset();
        navigate("/home");
      },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <Segment
        style={{
          width: "100%",
          maxWidth: "450px",
          padding: "40px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          border: "1px solid var(--border-color)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <Image src={logo} size="tiny" centered style={{ marginBottom: "15px" }} />
          <Header as="h2" style={{ margin: 0, color: "var(--text-primary)" }}>
            Join Habitry
            <Header.Subheader style={{ marginTop: "5px" }}>
              Create an account to start tracking your goals
            </Header.Subheader>
          </Header>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} size="large">
          <Input
            label="Username"
            placeholder="Choose a username"
            name="username"
            onBlur={handleChange}
            icon="user"
            iconPosition="left"
            error={errors.username}
          />
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            onBlur={handleChange}
            icon="id card"
            iconPosition="left"
            error={errors.fullName}
          />
          <Input
            label="Password"
            placeholder="Create a password"
            name="password"
            type="password"
            onBlur={handleChange}
            icon="lock"
            iconPosition="left"
            error={errors.password}
          />

          <Button
            color="teal"
            fluid
            size="large"
            type="submit"
            loading={isLoadingSignup}
            content="Sign Up"
            style={{ marginTop: "20px", padding: "14px" }}
          />

          {isErrorSignup && (
            <Message
              icon="warning circle"
              negative
              header="Registration Failed"
              content="Username already exists. Please choose another."
              size="small"
              style={{ marginTop: "20px" }}
            />
          )}
        </Form>

        <Divider style={{ margin: "25px 0" }} />

        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signin");
            }}
            style={{ color: "var(--primary)", fontWeight: "500", cursor: "pointer" }}
          >
            Sign in instead
          </a>
        </div>
      </Segment>
    </div>
  );
};

export default Signup;
