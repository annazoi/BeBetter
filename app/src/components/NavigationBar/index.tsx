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
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

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
      <Menu
        borderless
        className={`dashboard-navbar ${isMenuOpen ? 'mobile-open' : ''}`}
        style={{

          textAlign: "center",
          margin: 0,
          padding: '10px 0',
          position: location.pathname === "/" && !isLoggedIn ? 'absolute' : 'relative',
          width: '100%',
          zIndex: 100,
          background: location.pathname === "/" && !isLoggedIn && !isMenuOpen ? 'transparent' : 'var(--surface-color)',
          borderBottom: (location.pathname === "/" && !isLoggedIn && !isMenuOpen) ? 'none' : '1px solid var(--border-color)',
          boxShadow: (location.pathname === "/" && !isLoggedIn && !isMenuOpen) ? 'none' : 'var(--shadow-sm)',
          transition: 'background 0.3s ease',
        }}
      >
        <Container>
          <Menu.Item header className="brand-header transparent-hover" style={{ fontSize: "1.2rem", fontWeight: "bold", paddingLeft: 0, paddingRight: "20px" }} onClick={() => navigate("/")}>
            <Icon name="rocket" color="teal" size="large" />
            <span style={{ marginLeft: "10px", letterSpacing: "1px" }}>Habitry</span>
          </Menu.Item>

          {/* Mobile Toggle */}
          <Menu.Menu position="right" className="mobile-only">
            <Menu.Item onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Icon name={isMenuOpen ? "close" : "bars"} size="large" />
            </Menu.Item>
          </Menu.Menu>

          {/* Desktop Menu */}
          <div className={`nav-content ${isMenuOpen ? 'show' : ''}`}>
            {isLoggedIn ? (
              <>
                <Menu.Menu position="left" className="nav-items-group" >
                  <Menu.Item
                    active={location.pathname === "/" || location.pathname === "/home"}
                    onClick={() => { navigate("/"); setIsMenuOpen(false); }}
                    className="nav-link-item"
                  >
                    <Icon name="dashboard" />
                    Dashboard
                  </Menu.Item>
                  <Menu.Item
                    active={location.pathname === "/calendar"}
                    onClick={() => { navigate("/calendar"); setIsMenuOpen(false); }}
                    className="nav-link-item"
                  >
                    <Icon name="calendar" />
                    Calendar
                  </Menu.Item>
                </Menu.Menu>

                <Menu.Menu position="right" className="nav-actions-group" >
                  <Menu.Item onClick={toggleDarkMode} className="transparent-hover">
                    <Icon name={isDarkMode ? "sun" : "moon"} size="large" style={{ margin: 0 }} />
                  </Menu.Item>
                  <Menu.Item className="transparent-hover" style={{ padding: '0 10px' }}>
                    <Button
                      basic
                      content="Sign Out"
                      icon="sign-out"
                      onClick={handleLogout}
                      className="transparent-hover sign-out-btn"
                    />
                  </Menu.Item>
                </Menu.Menu>
              </>
            ) : (
              <Menu.Menu position="right" className="nav-actions-group">
                <Menu.Item onClick={toggleDarkMode}>
                  <Icon name={isDarkMode ? "sun" : "moon"} size="large" style={{ margin: 0 }} />
                </Menu.Item>
                <Menu.Item style={{ padding: 0, height: 'fit-content' }}>
                  <Button color="teal" onClick={() => { navigate("/signin"); setIsMenuOpen(false); }} className="signin-btn">Sign In</Button>
                </Menu.Item>
              </Menu.Menu>
            )}
          </div>
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
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {location.pathname === "/" ? (
            children
          ) : (
            <Container style={{ marginTop: '40px' }}>
              {children}
            </Container>
          )}
        </div>
      )}

    </div >
  );
};

export default NavigationBar;
