import { useNavigate, useLocation } from "react-router-dom";
import { Container, Icon, Menu, Button } from "semantic-ui-react";
import { authStore } from "../../store/authStore";
import { useEffect, useState } from "react";
import "./style.css";

interface NavigationBarProps {
  children: any;
}

const NavigationBar = ({ children }: NavigationBarProps) => {
  const { isLoggedIn, logOut } = authStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    logOut();
    navigate("/signin");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation Bar */}
      <Menu borderless className="dashboard-navbar" style={{ margin: 0, padding: '10px 0' }}>
        <Container>
          <Menu.Item header className="brand-header transparent-hover" style={{ fontSize: "1.2rem", fontWeight: "bold", paddingLeft: 0 }}>
            <Icon name="rocket" color="teal" size="large" />
            <span style={{ marginLeft: "10px", letterSpacing: "1px" }}>Habitry</span>
          </Menu.Item>

          {isLoggedIn ? (
            <>
              <Menu.Menu position="left" style={{ display: 'flex', gap: '10px' }} >
                <Menu.Item
                  active={location.pathname === "/" || location.pathname === "/home"}
                  onClick={() => navigate("/")}
                  style={{ borderRadius: '10px' }}
                >
                  <Icon name="dashboard" />
                  Dashboard
                </Menu.Item>
                <Menu.Item
                  active={location.pathname === "/calendar"}
                  onClick={() => navigate("/calendar")}
                  style={{ borderRadius: '10px' }}
                >
                  <Icon name="calendar outline" />
                  Calendar
                </Menu.Item>
              </Menu.Menu>

              <Menu.Menu position="right" style={{ alignItems: 'center' }} >
                <Menu.Item onClick={toggleDarkMode} className="transparent-hover">
                  <Icon name={isDarkMode ? "sun" : "moon"} size="large" style={{ margin: 0 }} />
                </Menu.Item>
                <Menu.Item className="transparent-hover">
                  <Button
                    basic
                    // color="red"
                    content="Sign Out"
                    icon="sign-out"
                    onClick={handleLogout}
                    className="transparent-hover"
                    style={{
                      background: 'transparent',
                    }}
                  />
                </Menu.Item>
              </Menu.Menu>
            </>
          ) : (
            <Menu.Menu position="right" style={{ alignItems: 'center', display: 'flex', gap: '10px' }}>
              <Menu.Item onClick={toggleDarkMode}>
                <Icon name={isDarkMode ? "sun" : "moon"} size="large" style={{ margin: 0 }} />
              </Menu.Item>
              <Menu.Item style={{ padding: 0, height: 'fit-content' }}>
                <Button color="teal" onClick={() => navigate("/signin")} style={{ margin: 'auto' }}>Sign In</Button>
              </Menu.Item>
            </Menu.Menu>
          )}
        </Container>
      </Menu>

      {/* Main Content Area */}
      {isLoggedIn ? (
        <div>
          <Container style={{ marginTop: '40px' }}>
            {children}
          </Container>
        </div>
      ) : (
        <div>
          <Container>
            {children}
          </Container>
        </div>
      )}

    </div >
  );
};

export default NavigationBar;
