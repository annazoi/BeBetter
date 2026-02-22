import { FC } from "react";
import {
  Button,
  Form,
  Segment,
  Image,
  Message,
  Header,
  Divider,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SigninSchema } from "../../../validation-schemas/auth";
import Input from "../../../components/ui/Input";
import { authStore } from "../../../store/authStore";
import { signin } from "../../../services/auth";
import { useMutation } from "react-query";
import logo from "../../../../public/logo.png";

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
            Welcome back
            <Header.Subheader style={{ marginTop: "5px" }}>
              Sign in to Habitry to continue your journey
            </Header.Subheader>
          </Header>
        </div>

        <Form onSubmit={handleSubmit(onSubmit)} size="large">
          <Input
            label="Username"
            placeholder="Enter your username"
            name="username"
            onBlur={handleChange}
            icon="user"
            iconPosition="left"
            error={errors.username}
          />
          <Input
            label="Password"
            placeholder="Enter your password"
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
            loading={isLoadingSignin}
            content="Sign In"
            style={{ marginTop: "20px", padding: "14px" }}
          />

          {isErrorSignin && (
            <Message
              icon="warning circle"
              negative
              header="Authentication Failed"
              content="Invalid username or password. Please try again."
              size="small"
              style={{ marginTop: "20px" }}
            />
          )}
        </Form>

        <Divider style={{ margin: "25px 0" }} />

        <div style={{ textAlign: "center", color: "var(--text-secondary)" }}>
          Don't have an account?{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup");
            }}
            style={{ color: "var(--primary)", fontWeight: "500", cursor: "pointer" }}
          >
            Create an account
          </a>
        </div>
      </Segment>
    </div>
  );
};

export default Signin;
