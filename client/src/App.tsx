import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
// import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import NavigationBar from "./components/NavigationBar";
import Profile from "./pages/profile";
import Calendar from "./pages/calendar";
import { authStore } from "./store/authStore";

function App() {
  const { isLoggedIn } = authStore((store) => store);
  return (
    <>
      <BrowserRouter>
        <NavigationBar>
          <Routes>
            {isLoggedIn && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                {/* <Route path="/profile" element={<Profile />} /> */}
                <Route path="/calendar" element={<Calendar />} />
              </>
            )}

            {!isLoggedIn && (
              <>
                <Route path="/" element={<Signin />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
              </>
            )}
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </>
  );
}

export default App;
