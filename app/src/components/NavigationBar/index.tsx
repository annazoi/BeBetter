import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { authStore } from "../../store/authStore";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { LayoutDashboard, Calendar, Moon, Sun, LogOut, Menu as MenuIcon, X, Sprout } from "lucide-react";
import "./style.css";

interface NavigationBarProps {
  children: any;
}

const MOBILE_MENU_CLOSE_MS = 420;

const NavigationBar = ({ children }: NavigationBarProps) => {
  const { isLoggedIn, logOut } = authStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMenuClosing, setIsMenuClosing] = useState<boolean>(false);
  const prevMenuOpenRef = useRef(isMenuOpen);

  const isMenuClosingAnim = !isMenuOpen && (isMenuClosing || prevMenuOpenRef.current);
  const isMenuVisible = isMenuOpen || isMenuClosingAnim;
  const isLanding = location.pathname === "/" && !isLoggedIn;
  const isTransparent = isLanding && !isMenuVisible;

  const openMenu = () => {
    setIsMenuClosing(false);
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    if (!isMenuOpen || isMenuClosingAnim) return;
    setIsMenuOpen(false);
  };

  useLayoutEffect(() => {
    if (isMenuOpen) {
      setIsMenuClosing(false);
    } else if (prevMenuOpenRef.current) {
      setIsMenuClosing(true);
    }
    prevMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuOpen) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuVisible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuVisible]);

  useEffect(() => {
    if (!isMenuClosing) return;
    const timer = window.setTimeout(() => setIsMenuClosing(false), MOBILE_MENU_CLOSE_MS);
    return () => clearTimeout(timer);
  }, [isMenuClosing]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

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

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/" || location.pathname === "/home";
    }
    return location.pathname === path;
  };

  return (
    <div className="page-wrapper">
      <header className={`site-header ${isMenuVisible ? "mobile-open" : ""} ${isMenuClosingAnim ? "site-header--closing" : ""} ${isTransparent ? "site-header--transparent" : ""}`}>
        <div className="app-shell site-header__inner">
          <button type="button" className="site-brand" onClick={() => navigate("/")}>
            <div className="nav-brand-mark">
              <Sprout size={18} strokeWidth={2.5} />
            </div>
            <span className="nav-brand">Habitry</span>
          </button>

          <button
            type="button"
            className={`site-header__toggle ${isMenuVisible ? "site-header__toggle--active" : ""}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuVisible}
          >
            <span className={`site-header__toggle-icon ${isMenuVisible ? "site-header__toggle-icon--open" : ""}`}>
              {isMenuVisible ? <X size={22} /> : <MenuIcon size={22} />}
            </span>
          </button>

          {isMenuVisible && (
            <button
              type="button"
              className={`site-nav-backdrop ${isMenuClosingAnim ? "site-nav-backdrop--closing" : ""}`}
              onClick={closeMenu}
              aria-label="Close menu"
              tabIndex={-1}
            />
          )}

          <nav
            className={`site-nav ${isMenuVisible ? "site-nav--visible" : ""} ${isMenuOpen ? "site-nav--open" : ""} ${isMenuClosingAnim ? "site-nav--closing" : ""}`}
          >
            <div className="site-nav__panel">
              {isLoggedIn ? (
                <>
                  <p className="site-nav__label">Navigate</p>
                  <div className="site-nav__links">
                    <button
                      type="button"
                      className={`site-nav__link ${isActive("/") ? "site-nav__link--active" : ""}`}
                      onClick={() => { navigate("/"); closeMenu(); }}
                    >
                      <span className="site-nav__link-icon">
                        <LayoutDashboard size={20} />
                      </span>
                      Dashboard
                    </button>
                    <button
                      type="button"
                      className={`site-nav__link ${isActive("/calendar") ? "site-nav__link--active" : ""}`}
                      onClick={() => { navigate("/calendar"); closeMenu(); }}
                    >
                      <span className="site-nav__link-icon">
                        <Calendar size={20} />
                      </span>
                      Calendar
                    </button>
                  </div>

                  <div className="site-nav__actions">
                    <button type="button" className="site-nav__icon-btn" onClick={toggleDarkMode} aria-label="Toggle theme">
                      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button type="button" className="site-nav__utility" onClick={toggleDarkMode} aria-label="Toggle theme">
                      <span className="site-nav__utility-icon">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                      </span>
                      {isDarkMode ? "Light mode" : "Dark mode"}
                    </button>
                    <Button basic onClick={handleLogout} className="site-nav__signout">
                      <LogOut size={15} />
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="site-nav__label">Welcome</p>
                  <p className="site-nav__tagline">Small steps, lasting change.</p>
                  <div className="site-nav__actions site-nav__actions--guest">
                    <button type="button" className="site-nav__icon-btn" onClick={toggleDarkMode} aria-label="Toggle theme">
                      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button type="button" className="site-nav__utility" onClick={toggleDarkMode} aria-label="Toggle theme">
                      <span className="site-nav__utility-icon">
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                      </span>
                      {isDarkMode ? "Light mode" : "Dark mode"}
                    </button>
                    <Button
                      primary
                      onClick={() => { navigate("/signin"); closeMenu(); }}
                      className="btn-primary site-nav__signin"
                    >
                      Sign In
                    </Button>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>
      </header>

      {isLoggedIn ? (
        <main className="main-content main-content--logged-in">
          <div className="app-shell">{children}</div>
        </main>
      ) : (
        <main className="main-content main-content--auth">
          {isLanding ? children : <div className="app-shell" style={{ marginTop: "40px" }}>{children}</div>}
        </main>
      )}
    </div>
  );
};

export default NavigationBar;
