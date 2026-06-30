import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodRegister from "../pages/auth/FoodRegister";
import FoodLogin from "../pages/auth/FoodLogin";
import Home from "../general/home";
import Foodcreate from "../food-partner/Foodcreate";
import Profile from "../food-partner/Profile";
import Save from "../general/save";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/" element={<UserLogin />} />
        <Route path="/food/register" element={<FoodRegister />} />
        <Route path="/food/login" element={<FoodLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Create-food" element={<Foodcreate/>}/>
        <Route path="/foodpartner/:id" element={<Profile/>} />
        <Route path="/foodcreate" element={<Foodcreate />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
