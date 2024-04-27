import { FC, useState } from "react";
import {
  Button,
  ButtonContent,
  Container,
  Grid,
  GridRow,
  Header,
  Icon,
  Image,
  Segment,
} from "semantic-ui-react";
import user from "../../assets/user.png";
import Modal from "../../components/ui/Modal";

const Profile: FC = () => {
  const [openSetting, setOpenSetting] = useState(false);

  const handleLogout = () => {
    console.log("logout");
  };
  return (
    <>
      <Segment placeholder color="olive">
        <Grid textAlign="center">
          <GridRow>
            <Image src={user} size="small" circular />
          </GridRow>
          <GridRow>
            <Header
              as="h2"
              style={{
                letterSpacing: "2px",
              }}
            >
              username
            </Header>
          </GridRow>
          <GridRow>
            <Grid
              padded
              style={{
                gap: "3px",
              }}
            >
              <Button
                animated="vertical"
                color="olive"
                onClick={() => setOpenSetting(true)}
              >
                <ButtonContent visible>Setting</ButtonContent>
                <ButtonContent hidden>
                  <Icon name="settings" />
                </ButtonContent>
              </Button>
              <Button animated="vertical" color="olive" onClick={handleLogout}>
                <ButtonContent visible>Logout</ButtonContent>
                <ButtonContent hidden>
                  <Icon name="arrow right" />
                </ButtonContent>
              </Button>
            </Grid>
          </GridRow>
        </Grid>
      </Segment>

      <Modal
        onOpen={openSetting}
        onClose={() => setOpenSetting(false)}
        name="Settings"
      >
        <Container></Container>
      </Modal>
    </>
  );
};

export default Profile;
