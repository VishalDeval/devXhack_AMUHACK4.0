import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import {
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Alert,
  Collapse,
} from "@mui/material";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  //media
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  // states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //register ctrl
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://devxhack-amuhack4-0.onrender.com/api/v1/auth/login", { email, password });
      toast.success("Login Successfully");
      localStorage.setItem("authToken", true);
      navigate("/");
    } catch (err) {
      console.log(error);
      if (err.response.data.error) {
        setError(err.response.data.error);
      } else if (err.message) {
        setError(err.message);
      }
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <div className="bg-gray-900 h-screen ">
      <Collapse in={error} className="text-black ">
        <Alert severity="error" className="mb-2">
          {error}
        </Alert>
      </Collapse>
      <form
        onSubmit={handleSubmit}
        className="flex justify-center items-center  "
      >
        <div className="w-1/3 rounded-xl mt-12 !shadow-[0_0_50px_grey] shadow-lg">
          <div className="text-[#fd5b5b] text-4xl drop-shadow-[0_0_15px_#fd5b5b] text-center mt-12 ">
            Sign In
          </div>

          <TextField
            className="!flex !mx-10 !mt-16 !border-white rounded-xl bg-white !text-black "
            label="email"
            type="email"
            required
          
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
          className="!flex !mx-10 !mt-10 !border-white rounded-xl bg-white !text-black"
            label="password"
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              className="!text-white !mt-24 !rounded-xl drop-shadow-[0_0_5px_#fd5b5b]  !w-52 !text-2xl !bg-[#fd5b5b] !hover:bg-[#5376bf]"
            >
              Sign In
            </Button>
          </div>
          <div className="mt-4 mb-12 text-white text-center">
            Dont have an account ? <Link to="/register">Please Register</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
