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
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Signin: FC = () => {
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
                icon="lock"
                iconPosition="left"
                label="Password"
                placeholder="Password"
                type="password"
              />

              <Button content="Sign In" color="olive" />
            </Form>
          </GridColumn>

          <GridColumn verticalAlign="middle">
            {/* <Divider clearing></Divider> */}
            <Button
              content="Sign Up"
              icon="signup"
              size="big"
              onClick={() => router("/signup")}
            />
          </GridColumn>
        </Grid>
        {/* <Divider vertical>Or</Divider> */}
      </Segment>
    </>
  );
};

export default Signin;
