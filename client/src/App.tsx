import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
// import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import NavigationBar from "./components/NavigationBar";
import Profile from "./pages/profile";
import Calendar from "./pages/calendar";

function App() {
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
