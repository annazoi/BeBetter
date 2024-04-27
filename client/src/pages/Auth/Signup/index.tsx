import { FC } from "react";
import { useNavigate } from "react-router-dom";
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
} from "semantic-ui-react";

const Signup: FC = () => {
  const router = useNavigate();
  return (
    <>
      <Segment placeholder>
        <Grid columns={2} relaxed="very" stackable>
          <GridColumn>
            <Form>
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

              <Button content="Sign Up" color="olive" icon="signup" />
            </Form>
          </GridColumn>
          <GridColumn verticalAlign="middle">
            <Button
              content="Sign In"
              icon="signup"
              size="big"
              onClick={() => router("/signin")}
            />
          </GridColumn>
        </Grid>
        {/* <Divider vertical>OR</Divider> */}
      </Segment>
    </>
  );
};

export default Signup;
