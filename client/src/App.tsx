import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
// import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Signup from "./pages/Auth/Signup";
import Signin from "./pages/Auth/Signin";
import NavigationBar from "./components/NavigationBar";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <NavigationBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </NavigationBar>
      </BrowserRouter>
    </>
  );
}

export default App;
