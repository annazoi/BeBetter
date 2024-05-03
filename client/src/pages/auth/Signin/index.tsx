import { FC } from "react";
import {
  Button,
  Divider,
  Form,
  FormInput,
  Grid,
  GridColumn,
  Segment,
  Card,
  ButtonGroup,
  Header,
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Signin: FC = () => {
  const navigate = useNavigate();
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
          SIGN IN
        </Header>
        <Form>
          <FormInput
            icon="user"
            iconPosition="left"
            label="Username"
            placeholder="Username"
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
                content="Sign up"
                icon="signup"
                onClick={() => navigate("/signup")}
              />
              <Button content="Sign in" color="olive" icon="sign-in" />
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

export default Signin;
