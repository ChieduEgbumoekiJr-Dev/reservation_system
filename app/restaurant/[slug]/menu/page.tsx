import React from "react";
import Navbar from "../../../components/Navbar";
import Header from "../components/Header";
import RestaurantNavbar from "../components/RestaurantNavbar";
import Menu from "../components/Menu";

const RestaurantMenu = () => {
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavbar />
        <Menu />
      </div>
    </>
  );
};

export default RestaurantMenu;
