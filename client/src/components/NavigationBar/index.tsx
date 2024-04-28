import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  GridColumn,
  GridRow,
  Menu,
  MenuItem,
  Segment,
} from "semantic-ui-react";
interface NavigationBarProps {
  children: any;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
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
        <GridColumn width={4} color="olive" style={{ height: "100vh" }}>
          <Menu tabular vertical fluid>
            {links.map((link: any) => (
              <MenuItem
                name={link.name}
                onClick={() => navigate(link.path)}
                style={{ marginBottom: "5px" }}
              ></MenuItem>
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
