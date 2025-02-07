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
import { authStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile: FC = () => {
  const [openSetting, setOpenSetting] = useState(false);
  const { fullName, logOut } = authStore((store) => store);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/signin");
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
              {fullName}
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
                  <Icon name="log out" />
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
