import { useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  Grid,
  Icon,
  Menu,
  MenuItem,
  Sidebar,
  SidebarPusher,
 
} from "semantic-ui-react";
import { authStore } from "../../store/authStore";
import "./style.css";
import { useState } from "react";

interface NavigationBarProps {
  children: any;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  const { isLoggedIn } = authStore((state) => state);
  const [isVisibleMenu, setIsVisibleMenu] = useState<Boolean>(false);
  const navigate = useNavigate();

  const isLoggedInlinks = [
    {
      name: "Home",
      path: "/",
      icon: "home",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "user",
    },
    {
      name: "Goals",
      path: "/goals",
      icon: "tasks",
    },
    {
      name: "Calendar",
      path: "/calendar",
      icon: "calendar",
    },
  ];

  const isLogOutLinks = [
    {
      name: "Sign In",
      path: "/signin",
      icon: "sign-in",
    },
    {
      name: "Sign Up",
      path: "/signup",
      icon: "signup",
    },
  ];

  return (
    <>
      <div
        className="ui color inverted segment"
        style={{
          borderRadius: "5px",
          display: "flex",
          justifyContent: "left",
        }}
      >
        <div className="hide-menu">
          <Icon
            name="bars"
            size="big"
            style={{ marginRight: "20px" }}
            onClick={() => setIsVisibleMenu(true)}
          />
        </div>
        <p
          style={{
            fontSize: "20px",
            letterSpacing: "2px",
            fontWeight: "bold",
            color: "olive",
            textAlign: "center",
          }}
        >
          Be Better
        </p>
      </div>

      <Grid style={{ width: "100%" }}>
        <Grid.Column
          color="olive"
          style={{
            height: "100vh",
          }}
          only="computer"
          computer={4}
        >
          <Menu secondary vertical fluid>
            {isLoggedIn &&
              isLoggedInlinks.map((link: any, index: number) => (
                <div key={index}>
                  <MenuItem
                    style={{ marginBottom: "5px", paddingLeft: "35px" }}
                  >
                    <Button
                      fluid
                      style={{
                        backgroundColor: "white",
                        boxShadow: "1px 1px 0px 1px",
                      }}
                      content={link.name}
                      icon={link.icon}
                      onClick={() => navigate(link.path)}
                    >
                    </Button>
                  </MenuItem>
                </div>
              ))}
            {!isLoggedIn &&
              isLogOutLinks.map((link: any, index: number) => (
                <div key={index}>
                  <MenuItem
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
                      content={link.name}
                      icon={link.icon}
                    >
                    </Button>
                  </MenuItem>
                </div>
              ))}
          </Menu>
        </Grid.Column>

        <Sidebar
          as={Menu}
          animation="overlay"
          direction="left"
          icon="labeled"https://react.semantic-ui.com/modules/checkbox/
          inverted
          vertical
          visible={isVisibleMenu ? true : false}
          width="thin"
          style={{ backgroundColor: "olive" }}
        >
          {isLoggedIn ? (<>
            <MenuItem as="a" onClick={()=>{
              navigate("/home");
              setIsVisibleMenu(false);
            }}>
            <Icon name="home"  />
            Home
          </MenuItem>
          <MenuItem as="a" onClick={()=>{
              navigate("/profile");
              setIsVisibleMenu(false);
            }}>
            <Icon name="user"  />
            Profile
          </MenuItem>
          <MenuItem as="a" onClick={()=> {
            navigate("/calendar");
            setIsVisibleMenu(false);
          }}>
            <Icon name="calendar" />
            Calendar
          </MenuItem>
          <MenuItem as="a">
            <Icon name="tasks" />
            Goals
          </MenuItem>
          <MenuItem as="a" onClick={()=>setIsVisibleMenu(false)}>
            <Icon name="arrow circle left" />
            Cancel
          </MenuItem>
          </>) : (<>
          <MenuItem as="a" onClick={()=>{
              navigate("/signin");
              setIsVisibleMenu(false);
            }}>
            <Icon name="sign in"  />
            Sign In
          </MenuItem>
          <MenuItem as="a" onClick={()=>{
              navigate("/signup");
              setIsVisibleMenu(false);
            }}>
            <Icon name="signup"  />
            Sign Up
          </MenuItem>
          </>)}
        </Sidebar>

        <Grid.Column computer={12} mobile={16} tablet={16}>
          <Container>{children}</Container>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default NavigationBar;
