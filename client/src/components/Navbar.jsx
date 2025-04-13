import React from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { FaBeer } from "react-icons/fa";
const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));

  //handle logout
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      localStorage.removeItem("authToken");
      toast.success("logout successfully ");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-5 flex justify-between items-center bg-gray-900 ">
      <div className="flex items-center ">
        <img src="/heart-attack.png" className="h-10 drop-shadow-[0_0_10px_#fd5b5b] "></img>
        <div className="text-5xl text-white px-5">HealthMate</div>
      </div>

      {loggedIn ? (
        <div className="text-white">
          <NavLink to="/" className="px-5 text-xl font-medium">Home</NavLink>
          <NavLink to="/login" className="px-5 text-xl cursor-hand" onClick={handleLogout}>
            Logout
          </NavLink>
        </div>
      ) : (
        <div className="text-white">
          <NavLink to="/register" className="px-5 text-xl cursor-hand">Sign Up</NavLink>
          <NavLink to="/login" className="px-5 text-xl cursor-hand">Sign In</NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
