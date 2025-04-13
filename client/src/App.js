import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useMemo } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Toaster } from "react-hot-toast";
import { themeSettings } from "./theme";
import Navbar from "./components/Navbar.jsx";
import Homepage from "./pages/Homepage.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";

import ChatBot from "./pages/ChatBot";


function App() {
  const theme = useMemo(() => createTheme(themeSettings()), []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Toaster />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
         
          <Route path="/chatbot" element={<ChatBot />} />
          
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
