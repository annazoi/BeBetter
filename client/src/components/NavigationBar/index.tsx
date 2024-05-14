import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  GridColumn,
  GridRow,
  Menu,
  MenuItem,
  Segment,
} from "semantic-ui-react";
import { authStore } from "../../store/authStore";
interface NavigationBarProps {
  children: any;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  // const { isLoggedIn } = authStore;
  const navigate = useNavigate();

  const links = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Goals",
      path: "/goals",
    },
    {
      name: "Calendar",
      path: "/calendar",
    },
  ];
  return (
    <>
      <Segment inverted>Be Better</Segment>
      <Grid>
        <GridColumn
          width={4}
          color="olive"
          // style={{ height: "100vh" }}
          style={{
            height: "100vh",
            // backgroundColor: "#9fc95b",
          }}
        >
          <Menu tabular vertical fluid>
            {links.map((link: any, index: number) => (
              <>
                <MenuItem
                  key={index}
                  name={link.name}
                  onClick={() => navigate(link.path)}
                  style={{ marginBottom: "5px" }}
                >
                  <Button
                    fluid
                    style={{
                      backgroundColor: "white",
                      boxShadow: "1px 1px 0px 1px",
                    }}
                  >
                    {link.name}
                  </Button>
                </MenuItem>
              </>
            ))}
          </Menu>
        </GridColumn>

        <GridColumn stretched width={12}>
          <Container>{children}</Container>
        </GridColumn>
      </Grid>
    </>
  );
};

export default NavigationBar;
